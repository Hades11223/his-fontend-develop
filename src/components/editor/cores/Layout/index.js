import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { useDispatch } from "react-redux";
import T from "prop-types";
import Grid from "components/editor/config/Grid";
import { fontSizes } from "components/editor/config/EditorTool/TextTool/constants";
import { Main } from "./styled";
import { MODE } from "utils/editor-utils";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";

const Layout = forwardRef((props, ref) => {
  const {
    component,
    block,
    updateContent,
    mode,
    formId,
    form,
    formChange,
    verticalLine,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    valuesHIS,
    fileConfig,
    fileTemplate,
    level,
  } = props;
  const [state, _setState] = useState({
    localLines: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const context = useContext(EMRContext);
  const {
    component: { init },
    config: { updateComponents },
  } = useDispatch();

  const configComponents = useStore("config.components", []);
  const configProps = useStore("config.props", {});
  const signStatus = useStore("files.signStatus", {});

  const itemProps = component.props || {};
  const gridRef = useRef(null);
  const refComponent = useRef();
  useEffect(() => {
    if (JSON.stringify(component) !== refComponent.current) {
      refComponent.current = JSON.stringify(component);
      setState({
        localLines: itemProps.lines || [],
      });
    }
  }, [component]);

  useEffect(() => {
    const isDisable = context.isDisable;
    let disable =
      isDisable({ itemProps, signStatus, props }) || itemProps.disabled;
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [
    signStatus,
    itemProps,
    props.valuesHIS, //[dataFromHis]
    props.disable,
  ]);

  useImperativeHandle(ref, () => ({
    collectComponent: () => gridRef.current.collect().components,
    collectLines: () => gridRef.current.collect().lines,
  }));

  useEffect(() => {
    if (mode == MODE.config) {
      setState({
        component,
      });
    }
  }, [mode]);

  const getComponent = () => {
    if (mode == MODE.config) {
      return configComponents;
    }
    return props.fileConfig?.components ?? [];
  };

  const getFontSize = () => {
    if (itemProps.fontSize) return itemProps.fontSize;
    if (props.fontSize) return props.fontSize;
    if (mode === MODE.config) {
      return configProps.fontSize ? fontSizes[configProps.fontSize] : 12;
    }
    const formX = props.fileConfig;
    if (formX) {
      return formX.config && formX.config.fontSize
        ? fontSizes[formX.config.fontSize]
        : 12;
    }
  };

  const addLine = (res) => {
    const defaultLines = component.props.lines || [];
    const lines = [...defaultLines, res];
    updateContent({ ...component, props: { ...component.props, lines } });
  };

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };
  const onMouse = (layout, type) => () => {
    if (layout == "layout") {
      if (state.layoutFocus == (type === "move")) return;
      setState({
        layoutFocus: type === "move",
      });
    } else {
      if (state.hover == (type === "move")) return;
      setState({
        hover: type === "move",
      });
    }
  };

  const getBlockWidth = (itemProps, block) => {
    let marginRight = itemProps?.marginRight || 0;
    let marginLeft = itemProps?.marginLeft || 0;
    let paddingRight = itemProps.paddingRight || 0;
    let paddingLeft = itemProps.paddingLeft || 0;
    return (
      (!!itemProps.border ? block.width - 6 : block.width) -
      marginRight -
      marginLeft -
      paddingRight -
      paddingLeft
    );
  };
  return (
    <Main
      itemProps={itemProps}
      data-type="layout"
      data-level={level}
      mode={mode}
      className={state.hover ? "active" : ""}
      minHeight={itemProps.rowHeight || props.rowHeight || 24} //dùng trong tính năng set rowHeight của component page và layout
      lineHeightText={itemProps.lineHeightText || props.lineHeightText || 1.5} //dùng trong tính năng set line height của văn bản, mặc định lineHeight 1.5
      fontSize={getFontSize()}
    >
      {mode == MODE.config && (
        <div>
          <div
            onClick={handleFocus}
            className={"mark-focus"}
            onMouseMove={onMouse("top", "move")}
            onMouseLeave={onMouse("top", "leave")}
          />
        </div>
      )}
      <Grid
        ref={gridRef}
        lines={state.localLines}
        verticalLine={verticalLine}
        components={getComponent() || []}
        mode={mode}
        width={getBlockWidth(itemProps, block)}
        addLine={addLine}
        updateComponents={updateComponents}
        formId={formId}
        //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
        //values = valueEMR khi không nằm trong replication row
        valueEMR={valueEMR}
        values={form}
        valuesHIS={valuesHIS} //[dataFromHis]
        fileConfig={fileConfig}
        fileTemplate={fileTemplate}
        formChange={formChange}
        fontSize={getFontSize()}
        level={level}
        disable={state.disable} //sử dụng trong trường hợp khoá component layout theo cấp ký
        rowHeight={itemProps.rowHeight || props.rowHeight || 24} //dùng trong tính năng set rowHeight của component page và layout
        lineHeightText={itemProps.lineHeightText || props.lineHeightText || 1.5} //dùng trong tính năng set line height của văn bản
      />
    </Main>
  );
});

Layout.defaultProps = {
  component: {},
  form: {},
  formChange: {},
};

Layout.propTypes = {
  files: T.shape({}),
  form: T.shape({}),
  formChange: T.shape({}),
};

export default Layout;
