import React, {
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import T from "prop-types";
import moment from "moment";
import { Button } from "antd";
import { Main } from "./styled";
import Block from "components/editor/config/Block";
import Resizeable from "components/editor/config/Block/Resizeable";
import { MODE } from "utils/editor-utils";
import { PlusOutlined, PauseOutlined, VerticalAlignTopOutlined, CloseOutlined, UpSquareOutlined, DownSquareOutlined} from "@ant-design/icons";


const Line = forwardRef((props, ref) => {
  const {
    line,
    removeLine,
    components,
    updateComponents,
    width,
    mode,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    values,
    valuesHIS,
    fileTemplate,
    fileConfig,
    formChange,
    formId,
    verticalLine,
    level,
    layoutType,
  } = props;

  const [state, _setState] = useState({
    localLine: { items: [] },
    localComponents: [],
    actionFocus: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const lineRef = useRef();
  const arrayRef = useRef([]);

  useEffect(() => {}, []);

  useEffect(() => {
    setState({ localComponents: components });
  }, [components]);

  useEffect(() => {
    lineRef.current = state.localLine;
  }, [state.localLine]);

  useEffect(() => {
    setState({
      localLine: line,
    });
  }, [line]);

  const combineData = () => ({
    ...state.localLine,
    items: state.localLine.items.map((item, index) =>
      arrayRef.current[`item_${index}`]
        ? arrayRef.current[`item_${index}`].collect().item
        : {}
    ),
    components: state.localLine.items.reduce((res, next, index) => {
      const arr = arrayRef.current[`item_${index}`]
        ? [
            arrayRef.current[`item_${index}`].collect().component,
            ...arrayRef.current[`item_${index}`].collect().components,
          ]
        : [];

      return [...res, ...arr];
    }, []),
  });

  useImperativeHandle(ref, () => ({
    collect: () => combineData(),
  }));

  const onHandleInsertLine = () => {
    if (props.onHandleInsertLine) {
      props.onHandleInsertLine();
    }
  };

  const onHandleMove = (line) => () => {
    if (props.onHandleMove) {
      props.onHandleMove(line);
    }
  };

  const resizeable = (currentItem, nextItem) => {
    const listItem = lineRef.current.items;

    const items = listItem.map((item) => {
      if (item.key === currentItem.key) {
        return currentItem;
      }

      if (item.key === nextItem.key) {
        return nextItem;
      }

      return item;
    });

    state.localComponents.forEach((item) => {
      // duyệt qua các component trong line
      if (item.parent === currentItem.key) {
        //lấy ra các item con của current block
        item.props.lines = item.props.lines.map((line) => {
          //duyệt qua các line của item đó
          let sum = line.items //tính tổng chiều dài của các component trong line
            .reduce(
              (total, comp) => total + (isNaN(comp.width) ? 0 : comp.width),
              0
            );

          let diffSize = currentItem.width - sum; // tính ra kích thước lệch sau khi thay đổi

          if (line.items?.length) {
            let lastComp = line.items[line.items.length - 1]; //thực hiện tăng giảm size của component cuối cùng
            lastComp.width = lastComp.width + diffSize;
          }
          return line;
        });
      }
    });

    setState({
      localLine: { ...lineRef.current, items },
    });
  };

  const addBlock = () => {
    const block = {
      width: width / (state.localLine.items.length + 1),
      parent: line.key,
      key: moment().valueOf(),
    };

    const items = state.localLine.items.map((item) => ({
      ...item,
      width: width / (state.localLine.items.length + 1),
    }));

    setState({
      localLine: { ...state.localLine, items: [...items, block] },
      localComponents: components.map((c) => ({ ...c, width: block.width })),
    });
  };

  const remove = () => {
    removeLine(line);
  };

  const handleActionFocus = (focus) => () => {
    setState({
      actionFocus: focus,
    });
  };

  const getWidth = (item, index) => {
    let itemWidth = item.width;
    if (state.localLine.items.length > 1) {
      let currentWidth = state.localLine.items.reduce((total, b) => {
        return (total += b.width);
      }, 0);

      if (width && index == state.localLine.items.length - 1) {
        if (currentWidth < width) itemWidth += width - currentWidth;
        else {
          itemWidth -= Math.max(currentWidth - width, 0);
        }
      }
    } else {
      itemWidth = width;
    }
    if (((!itemWidth && itemWidth !== 0) || itemWidth > width) && width)
      itemWidth = width;
    return itemWidth;
  };

  const onRemove = (item, component) => () => {
    let localLine = state.localLine || {};
    let localComponents = state.localComponents || [];
    localLine.items = localLine.items?.filter((item1) => item1 != item) || [];
    localComponents =
      localComponents?.filter((item) => item != component) || [];
    setState({
      localLine: { ...localLine },
      localComponents: [...localComponents],
    });
  };
  const onMoveBlock = (i, index) => () => {
    let localLine = state.localLine || {};
    let item = (localLine.items || [])[index];
    (localLine.items || []).splice(index, 1);
    (localLine.items || []).splice(index + i, 0, item);
    setState({
      localLine: { ...localLine },
    });
  };

  const allowSplitLine = () => {
    if (state.localLine.items?.length > 1) return true;
    if (state.localLine.items?.length == 1) {
      let component =
        state.localComponents.find(
          (item) => item.parent === state.localLine.items[0].key
        ) || {};
      if (component.type === "page") return false;
    }

    return true;
  };
  const addNewLine = () => {
    if (props.onAddNewLine) props.onAddNewLine();
  };
  const getComponent = (item) => {
    let component = state.localComponents.find((c) => c.parent === item.key);
    return component;
  };
  return (
    <Main
      data-type="line"
      data-level={level}
      mode={mode}
      minHeight={props.rowHeight}
      className={`layout-line-item line-style ${
        mode === MODE.config && state.actionFocus ? "active" : ""
      }`}
      data-component={
        props.dataComponent
          ? props.dataComponent
          : state.localLine.items?.length > 1
          ? "multi-block"
          : getComponent(state.localLine.items[0])?.name
      }
    >
      {props.children
        ? props.children
        : state.localLine.items.map((item, index) => {
            item.width = getWidth(item, index);
            let component = state.localComponents.find(
              (c) => c.parent === item.key
            );
            return (
              <Block
                level={level}
                ref={(ref) => {
                  arrayRef.current[`item_${index}`] = ref;
                }}
                key={item.key}
                item={item}
                mode={mode}
                resizeable={resizeable}
                component={component}
                //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
                //values = valueEMR khi không nằm trong replication row
                valueEMR={valueEMR}
                values={values}
                valuesHIS={valuesHIS} //[dataFromHis]
                fileTemplate={fileTemplate}
                fileConfig={fileConfig}
                formChange={formChange}
                updateComponents={updateComponents}
                formId={formId}
                verticalLine={verticalLine}
                capKyDienTuHienTai={props.capKyDienTuHienTai}
                layoutType={layoutType}
                disable={!!props.disable} //sử dụng trong trường hợp khoá component layout theo cấp ký
                allowShowAction={
                  state.localLine.items.length > 1 && mode == MODE.config
                }
                onRemove={onRemove(item, component)}
                onMoveLeft={onMoveBlock(-1, index)}
                onMoveRight={onMoveBlock(1, index)}
                allowMoveLeft={index > 0}
                allowMoveRight={index < state.localLine.items.length - 1}
                allowRemove={state.localLine.items.length > 1}
                totalBlockInLine={state.localLine.items?.length || 0} //sử dụng để kiểm tra xem line nó được chia thành bao nhiêu phần
                rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
                lineHeightText={props.lineHeightText} //dùng trong tính năng set line height của văn bản
                fontSize={props.fontSize} //parrent font size
              >
                {mode == MODE.config &&
                  index !== state.localLine.items.length - 1 && (
                    <Resizeable
                      verticalLine={verticalLine}
                      resizeable={resizeable}
                      currentItemProps={item}
                      nextItemProps={state.localLine.items[index + 1]}
                    />
                  )}
              </Block>
            );
          })}
      {mode === MODE.config && (
        <div
          className={"line-action"}
          onMouseMove={handleActionFocus(true)}
          onMouseLeave={handleActionFocus(false)}
        >
          <Button.Group>
            {props.showButtonAddLine && (
              <Button
                icon={<PlusOutlined/>}
                size={"small"}
                onClick={addNewLine}
                title="Thêm mới dòng"
              />
            )}
            {allowSplitLine() && (
              <Button
                icon={<PauseOutlined/>}
                size={"small"}
                onClick={addBlock}
                title="Chia nhỏ khối"
              />
            )}
            <Button
              icon={<VerticalAlignTopOutlined/>}
              size={"small"}
              title="Thêm 1 dòng phía trên"
              onClick={onHandleInsertLine}
            />
            <Button
              title="Di chuyển dòng lên trên"
              icon={<UpSquareOutlined/>}
              size={"small"}
              onClick={onHandleMove(-1)}
            />
            <Button
              title="Di chuyển dòng xuống dưới"
              icon={<DownSquareOutlined/>}
              size={"small"}
              onClick={onHandleMove(1)}
            />
            <Button
              icon={<CloseOutlined/>}
              size={"small"}
              onClick={remove}
              title="Xoá dòng"
            />
          </Button.Group>
        </div>
      )}
    </Main>
  );
});

Line.defaultProps = {
  components: [],
  line: {},
};

Line.propTypes = {
  components: T.arrayOf(T.shape({})),
  line: T.shape({}),
};

export default memo(Line);
