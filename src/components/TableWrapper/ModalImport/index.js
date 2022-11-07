import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  memo,
} from "react";
import {
  Wrapper,
  ModalStyled,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "./styled";
import { Upload, InputNumber } from "antd";
import uploadImg from "assets/images/his-core/import.png";
import { useDispatch } from "react-redux";
import { Button } from "components";
import { useTranslation } from "react-i18next";

const ModalImport = ({ onImport }, ref) => {
  const { t } = useTranslation();
  const {
    dichVuKyThuat: { postImport },
  } = useDispatch();
  const refOk = useRef(null);
  const [state, _setState] = useState({
    isModalVisible: false,
    sheet: 1,
    dong: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (options, onOk) => {
      setState({
        isModalVisible: true,
      });
      refOk.current = onOk;
    },
    close: () => {
      setState({
        isModalVisible: false,
        dong: 1,
        sheet: 1,
        file: [],
      });
    },
  }));
  const cancelHandler = () => {
    ref.current.close();
  };
  const submitHandler = () => {
    if (state?.file?.length === 0 || !state?.file) {
      return null;
    } else {
      const { isModalVisible, ...rest } = state;
      if (onImport) {
        onImport(rest);
      } else postImport(rest);
      refOk.current && refOk.current({ value: rest });
      ref.current.close();
    }
  };

  const onChange = (key) => (value, e) => {
    setState({ [key]: value });
  };
  return (
    <Wrapper>
      <ModalStyled
        width={500}
        visible={state.isModalVisible}
        closable={false}
        footer={null}
      >
        <ModalHeader className="modal-header">Chi tiết file</ModalHeader>

        <div className="modal-wrap-content">
          <ModalContent className="modal-content">
            <div className="image">
              <Upload
                fileList={state.file}
                customRequest={({ onSuccess, onError, file }) => {
                  onSuccess(null, {});
                  setState({
                    file: [file],
                  });
                }}
                accept=".xls,.xlsx"
                onRemove={(file) => {
                  setState({
                    file: [],
                  });
                }}
              >
                <img
                  src={uploadImg}
                  alt="importImg"
                  style={{ marginRight: 10 }}
                />
                import file{" "}
              </Upload>
              {(state?.file?.length === 0 || !state?.file) && (
                <div className="err-msg" style={{ color: "#ff4d4f" }}>
                  Vui lòng import file (excel)!
                </div>
              )}
            </div>
          </ModalContent>
          <div style={{ background: "#ffffff", padding: "0px 15px" }}>
            <div>
              <div>Chọn sheet</div>
              <InputNumber
                min={0}
                value={state?.sheet}
                style={{ width: "100%" }}
                onChange={onChange("sheet")}
              />
            </div>
            <div>
              <div>Chọn dòng</div>
              <InputNumber
                min={0}
                value={state?.dong}
                style={{ width: "100%" }}
                onChange={onChange("dong")}
              />
            </div>
          </div>
        </div>
        <ModalFooter className="modal-footer">
          <Button onClick={cancelHandler} type="default" minWidth={100}>
            {t("common.huy")}
          </Button>
          <Button type="primary" onClick={submitHandler} minWidth={100}>
            {t("common.luu")}
          </Button>
        </ModalFooter>
      </ModalStyled>
    </Wrapper>
  );
};

export default memo(forwardRef(ModalImport));
