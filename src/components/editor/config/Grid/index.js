import React, {
  memo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import T from "prop-types";
import moment from "moment";
import { Button, Row, Col } from "antd";
import { Main } from "./styled";
import Line from "../Line";
import { LINE_HEIGHT } from "components/constanst";
import { MODE } from "utils/editor-utils";
import { PlusOutlined } from "@ant-design/icons";

const Grid = forwardRef((props, ref) => {
  const refArray = useRef([]);
  const refGrid = useRef(null);
  const {
    lines,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    values,
    valuesHIS,
    fileConfig,
    fileTemplate,
    formId,
    verticalLine,
    updateComponents,
    width,
    mode,
    formChange,
    components,
    level,
    layoutType,
  } = props;
  const [state, _setState] = useState({
    localLines: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState({
      localLines: lines || [],
    });
  }, [lines]);

  const combineData = () => {
    let components = [];
    state.localLines.forEach((item, index) => {
      components = components.concat(
        refArray.current[`line_${index}`].collect().components || []
      );
    });

    let data = {
      lines: state.localLines.map((line, index) => ({
        ...line,
        items: refArray.current[`line_${index}`].collect().items,
      })),
      components: components,
    };

    return data;
  };

  useImperativeHandle(ref, () => ({
    collect: () => combineData(),
  }));

  const onAddNewLine = () => {
    onHandleInsertLine(state.localLines.length)();
  };

  const onHandleInsertLine = (index) => () => {
    const key = moment().valueOf();
    const block = { width: width, parent: key, key: moment().valueOf() };
    const obj = {
      key: key,
      items: [block],
      height: props.rowHeight || LINE_HEIGHT,
    };
    const newLines = [...state.localLines];
    newLines.insert(index, obj);
    setState({
      localLines: newLines,
    });
  };

  const onHandleMove = (item) => (line) => {
    let localLines = state.localLines;
    let index = localLines.findIndex((x) => x === item);
    if (index >= 0) {
      if (index + line >= 0) {
        localLines.splice(index, 1);
        localLines.splice(index + line, 0, item);
        setState({
          localLines: [...localLines],
        });
      }
    }
  };

  const handleRemoveLine = (line) => {
    const newLines = state.localLines.filter((item) => item.key !== line.key);
    setState({
      localLines: newLines,
    });
  };
  const getWidth = () => {
    return width || refGrid.current?.clientWidth;
  };
  return (
    <Main data-type="grid" ref={refGrid} data-level={level}>
      {props.children ? (
        props.children
      ) : (
        <>
          {state.localLines.map((item, index) => (
            <Line
              ref={(ref) => {
                refArray.current[`line_${index}`] = ref;
              }}
              level={level}
              verticalLine={verticalLine}
              key={item.key}
              line={item}
              showButtonAddLine={
                index == state.localLines.length - 1 && getWidth() < 140
              }
              width={getWidth()}
              formId={formId}
              updateComponents={updateComponents}
              mode={mode}
              components={components.filter((c) => c.lineKey === item.key)}
              //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
              //values = valueEMR khi không nằm trong replication row
              valueEMR={valueEMR}
              values={values}
              valuesHIS={valuesHIS} //[dataFromHis]
              fileConfig={fileConfig}
              fileTemplate={fileTemplate}
              onHandleInsertLine={onHandleInsertLine(index)}
              onHandleMove={onHandleMove(item)}
              onAddNewLine={onAddNewLine}
              formChange={formChange}
              removeLine={handleRemoveLine}
              capKyDienTuHienTai={props.capKyDienTuHienTai}
              layoutType={layoutType}
              disable={props.disable} //sử dụng trong trường hợp khoá component layout theo cấp ký
              rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
              lineHeightText={props.lineHeightText} //dùng trong tính năng set line height của văn bản
              fontSize={props.fontSize} //parrent font size
            />
          ))}

          {mode === MODE.config && (
            <div
              className={"action-line"}
              style={
                level == 1
                  ? {
                      display: "block",
                      height: "auto",
                      visibility: "visible",
                      opacity: 1,
                    }
                  : {}
              }
            >
              <Row gutter={12}>
                <Col span={24}>
                  <Button
                    onClick={onAddNewLine}
                    icon={<PlusOutlined />}
                    size={"small"}
                    title="Thêm mới 1 dòng"
                  />
                </Col>
              </Row>
            </div>
          )}
        </>
      )}
    </Main>
  );
});

Grid.defaultProps = {
  lines: [],
};

Grid.propTypes = {
  lines: T.arrayOf(T.shape({})),
};

export default memo(Grid);
