import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import { Main } from "./styled";
import BarcodeCom from "react-barcode";
import { connect, useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";

const Barcode = forwardRef((props, ref) => {
  const { mode, component, form, focusing } = props;
  const label = mode == MODE.config ? "Label" : "";
  const [state, _setState] = useState({
    barcode: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    component: { init },
  } = useDispatch();
  const itemProps = component.props || {};
  useImperativeHandle(ref, () => ({
    collectLabel: () => {
      return itemProps.label;
    },
  }));
  useEffect(() => {
    if (form && form[itemProps.fieldName]) {
      setState({
        barcode: form[itemProps.fieldName],
      });
    }
  }, [component, form]);

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const value =
    mode === MODE.config
      ? itemProps.fieldName || "Barcode Component"
      : state.barcode ||
        (itemProps.fromEMR ? itemProps.defaultValue || "" : "");

  return (
    <Main
      data-type="barcode"
      onClick={handleFocus}
      focusing={focusing}
      barcodeWidth={itemProps.width}
      barcodeHeight={itemProps.height}
      contentAlign={itemProps.contentAlign}
    >
      <div className={"barcode-component"}>
        <div className={"barcode-container"}>
          <div className="barcode-area">
            <div className="barcode-wrapper">
              {value && (
                <BarcodeCom
                  id={"barcode"}
                  fontSize={14}
                  width={1}
                  value={value}
                  displayValue={false}
                  margin={0}
                />
              )}
            </div>
          </div>
          {!itemProps.noLabel && (
            <div className="barcode-label">
              &nbsp;
              {`${itemProps.label ? itemProps.label + " " : label}${
                state.barcode ||
                (itemProps.fromEMR && mode !== MODE.config
                  ? itemProps.defaultValue || ""
                  : "")
              }`}
              &nbsp;
            </div>
          )}
        </div>
      </div>
    </Main>
  );
});

Barcode.defaultProps = {
  component: {},
  mode: MODE.editing,
};

Barcode.propTypes = {
  component: T.shape({}),
  mode: T.oneOf([MODE.config, MODE.editing]),
};

export default Barcode;
