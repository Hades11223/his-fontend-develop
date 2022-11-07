import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  memo,
  useMemo,
} from "react";
import T from "prop-types";
import { Main } from "./styled";
import QRCodeCom from "react-qr-code";
import { useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";
import { isNumber } from "lodash";

const QRcode = forwardRef((props, ref) => {
  const {
    component: { init },
  } = useDispatch();
  const { mode, component, form, focusing } = props;
  const label = mode == MODE.config ? "Label" : "";
  const [state, _setState] = useState({
    qrcode: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const itemProps = component.props || {};
  useImperativeHandle(ref, () => ({
    collectLabel: () => {
      return itemProps.label;
    },
  }));
  useEffect(() => {
    if (form && form[itemProps.fieldName]) {
      setState({
        qrcode: form[itemProps.fieldName],
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
      ? itemProps.fieldName || "QRcode Component"
      : state.qrcode || (itemProps.fromEMR ? itemProps.defaultValue || "" : "");

  const size = useMemo(() => {
    if (isNumber(+itemProps.size)) {
      return Number(itemProps.size);
    } else return 100;
  }, [itemProps.size]);

  return (
    <Main
      data-type="qrcode"
      onClick={handleFocus}
      focusing={focusing}
      qrCodeSize={size}
      contentAlign={itemProps.contentAlign}
      itemProps={itemProps}
    >
      <div className={"qrcode-component"}>
        <div className={"qrcode-container"}>
          <div className="qrcode-area">
            <div className="qrcode-wrapper">
              {value && (
                <QRCodeCom id={"qrcode"} value={value} margin={0} size={size} />
              )}
            </div>
          </div>
          {!itemProps.noLabel && (
            <div className="qrcode-label">
              &nbsp;
              {`${itemProps.label ? itemProps.label + " " : label}${
                state.qrcode ||
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

QRcode.defaultProps = {
  component: {},
  mode: MODE.editing,
};

QRcode.propTypes = {
  component: T.shape({}),
  mode: T.oneOf([MODE.config, MODE.editing]),
};

export default memo(QRcode);
