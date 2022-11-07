import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useContext,
} from "react";
import T from "prop-types";
import TextEdit from "components/editor/cores/TextEdit";
import ContentEditable from "components/editor/config/ContentEditable";
import MultipleLine from "components/editor/config/MultipleLine";
import { Main } from "./styled";
import { connect, useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";
import EMRContext from "pages/editor/context/EMR";
import { useStore } from "hook";

const ArrayConverter = forwardRef((props, ref) => {
  const {
    mode,
    component,
    updateContent,
    form,
    formChange,
    focusing,
    other,
    textTransform,
    blockWidth,
  } = props;

  const labelRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [labelWidth, setLabelWidth] = useState(0);
  const label = mode === MODE.config ? "label" : "";
  const context = useContext(EMRContext);
  const {
    component: { init },
  } = useDispatch();
  const signStatus = useStore("files.signStatus", {});

  const itemProps = component.props || {};
  const [state, _setState] = useState({
    disable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
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

  useEffect(() => {
    if (labelRef.current) {
      setWidth(blockWidth - labelRef.current.node.clientWidth - 6);
      setLabelWidth(labelRef.current.node.clientWidth);
    }
  }, [component, blockWidth]);

  const handleChangeLabel = (valueHTML) => {
    const timer = 500;
    const timeout = setTimeout(() => {
      updateContent({
        ...component,
        props: {
          ...itemProps,
          labelValue: valueHTML,
          height: itemProps.line * 24,
        },
      });

      clearTimeout(timeout);
    }, timer);
  };

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const handleOnChange = (value) => {
    if (itemProps.fieldName && formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](
        value.htmlValue.split(itemProps.rule || ",").map((item) => item.trim())
      );
    }
  };

  let htmlValue = (form[itemProps.fieldName || ""] || []).join(
    itemProps.rule + " " || ", "
  );

  return mode === "editing" ? (
    <Main onClick={handleFocus}>
      <MultipleLine
        label={!itemProps.noLabel ? itemProps.label : ""}
        onChange={handleOnChange}
        value={htmlValue}
        extentLine={itemProps.line - 1}
        disabled={state.disable}
        width={blockWidth}
        min={itemProps.line}
        size={itemProps.size || 1000}
      />
    </Main>
  ) : (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      style={{ height: itemProps.line ? itemProps.line * 24 : "" }}
      hadLabel={!!itemProps.label}
    >
      {!itemProps.noLabel && (
        <TextEdit
          onChange={handleChangeLabel}
          className={"text-field-label"}
          defaultValue={itemProps.label || label}
          ref={labelRef}
          mode={mode}
          textTransform={textTransform}
        />
      )}

      <ContentEditable
        labelWidth={labelWidth}
        htmlValue={htmlValue}
        size={itemProps.size || 500}
        width={width}
        onChange={handleOnChange}
        disabled={!!state.disable}
        type={itemProps.line > 1 ? "multiple" : "single"}
        extentLine={itemProps.line - 1 || 0}
        {...other}
      />
    </Main>
  );
});

ArrayConverter.defaultProps = {
  mode: MODE.editing,
  labelText: "",
  form: {},
  formChange: {},
  component: {},
  line: {},
};

ArrayConverter.propTypes = {
  mode: T.oneOf([MODE.config, MODE.editing]),
  form: T.shape({}),
  formChange: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  labelText: T.string,
};

export default ArrayConverter;
