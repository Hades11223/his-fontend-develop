import { Radio, InputNumber } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import IcSave from "assets/images/kho/ic-save.svg";
import { formatterNumber, parserNumber } from "utils";
import { Main } from "./styled";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import Button from "pages/kho/components/Button";
import { set } from "lodash";

const ModalChietKhau = ({ ...props }, ref) => {
  const [state, _setState] = useState({ validate: false });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const refModal = useRef(null);

  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);

  const {
    phieuNhapXuat: { updateData },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: ({ isReadOnly = false }) => {
      setState({
        isReadOnly,
        type: 0,
      });
      refModal.current && refModal.current.show();
    },
  }));

  const onCancel = () => {
    refModal.current && refModal.current.hide();
  };
  const onSave = () => {
    if (!state.validate) {
      updateData({
        thongTinPhieu: {
          ...thongTinPhieu,
          phanTramChietKhau: state.phanTramChietKhau,
          tienChietKhau: state.tienChietKhau,
        },
      });
      refModal.current && refModal.current.hide();
      setState({validate : false});
    }
  };
  const onChange = (e) => {
    if (state.isReadOnly) return;
    setState({ type: e.target.value });
  };

  const onChangeChietKhau = (e) => {
    let validate = false;
    if (state.type === 0) {
      if (e < 0 || e > 100) {
        validate = true;
        setState({ validate });
      } else {
        setState({ phanTramChietKhau: e });
      }
    } else if (state.type === 1) {
      setState({ tienChietKhau: e });
    }
  };
  return (
    <ModalTemplate ref={refModal} title="Chiết khấu" width={376}>
      <Main>
        <div className="info-content">
          <Radio.Group onChange={onChange} value={state.type}>
            <Radio value={0}>Theo %</Radio>
            <Radio value={1}>Theo VNĐ</Radio>
          </Radio.Group>

          <div style={{ marginTop: "15px" }}>
            <label>Giá trị</label>
            {state.isReadOnly ? (
              <InputNumber
                style={{
                  width: "100%",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                }}
                disabled={state.isReadOnly}
                formatter={(value) => formatterNumber(value)}
                parser={(value) => parserNumber(value)}
              />
            ) : (
              <div>
                <InputNumber
                  style={{
                    width: "100%",
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                  }}
                  min={0}
                  value={state?.type === 0 ? thongTinPhieu.phanTramChietKhau : thongTinPhieu.tienChietKhau}
                  onChange={(e) => {
                    onChangeChietKhau(e);
                  }}
                />
                {state?.validate && state?.type === 0 && (
                  <label style={{ color: "red" }}>
                    Giá trị chỉ từ 1 - 100!
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="footer-btn">
          <Button className="btn-cancel" onClick={onCancel} minWidth={100}>
            Quay lại
          </Button>
          <div class="f1"></div>
          {!state.isReadOnly && (
            <Button
              minWidth={100}
              className="btn-ok"
              onClick={onSave}
              type={"primary"}
              rightIcon={<IcSave />}
            >
              Lưu
            </Button>
          )}
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChietKhau);
