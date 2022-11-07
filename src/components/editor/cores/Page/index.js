import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { connect } from "react-redux";
import T from "prop-types";
import Grid from "components/editor/config/Grid";
import { fontSizes } from "components/editor/config/EditorTool/TextTool/constants";
import { Main } from "./styled";

const Page = forwardRef((props, ref) => {
  const {
    component,
    block,
    updateContent,
    mode,
    init,
    updateComponents,
    formId,
    form,
    formChange,
    verticalLine,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    valuesHIS,
    fileTemplate,
    fileConfig,
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

  const itemProps = component.props || {};
  const gridRef = useRef(null);
  const refComponent = useRef();
  useEffect(() => {
    if (JSON.stringify(refComponent.current) !== JSON.stringify(component)) {
      refComponent.current = component;
      setState({
        localLines: itemProps.lines || [],
      });
    }
  }, [component]);

  useImperativeHandle(ref, () => ({
    collectComponent: () => gridRef.current.collect().components,
    collectLines: () => gridRef.current.collect().lines,
  }));

  const getComponent = () => {
    if (mode == "config") {
      return props.configComponents;
    }
    return props.fileConfig?.components ?? [];
  };
  const getFontSize = () => {
    if (itemProps.fontSize) return itemProps.fontSize;
    if (props.fontSize) return props.fontSize;
    if (mode === "config") {
      return props.configProps.fontSize
        ? fontSizes[props.configProps.fontSize]
        : 12;
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
    if (mode === "config") {
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
      data-type="page"
      data-level={level}
      mode={mode}
      className={`${state.hover ? "active" : ""} component-page`}
      layoutType={props.layoutType}
      lineHeightText={itemProps.lineHeightText || 1.5} //dùng trong tính năng set line height của văn bản, mặc định lineHeight 1.5
      fontSize={getFontSize()}
      data-page-top={itemProps?.paddingTop || 0}
      data-page-bottom={itemProps.paddingBottom || 0}
      data-page-left={itemProps.paddingLeft || 0}
      data-page-right={itemProps.paddingRight || 0}
    >
      {mode == "config" && (
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
        fileTemplate={fileTemplate}
        fileConfig={fileConfig}
        formChange={formChange}
        fontSize={getFontSize()}
        level={level}
        rowHeight={itemProps.rowHeight || props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
        lineHeightText={itemProps.lineHeightText || props.lineHeightText} //dùng trong tính năng set line height của văn bản
      >
        {props.children}
      </Grid>
    </Main>
  );
});

Page.defaultProps = {
  component: {},
  form: {},
  formChange: {},
};

Page.propTypes = {
  files: T.shape({}),
  form: T.shape({}),
  formChange: T.shape({}),
};

const mapState = (state) => ({
  configComponents: state.config.components,
  configProps: state.config.props,
});

const mapDispatch = ({
  config: { updateComponents },
  component: { init },
}) => ({ updateComponents, init });

export default connect(mapState, mapDispatch, null, { forwardRef: true })(Page);
