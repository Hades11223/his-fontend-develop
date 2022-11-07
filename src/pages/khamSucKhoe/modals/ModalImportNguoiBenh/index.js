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
import { Upload, InputNumber, message } from "antd";
import uploadImg from "assets/images/his-core/import.png";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select } from "components";
import { useTranslation } from "react-i18next";
import { useLoading } from "hook";

const ModalImport = (props, ref) => {
  const { t } = useTranslation();
  const {
    nbKSK: { postImport, getKhoaImport },
  } = useDispatch();
  const { dsKhoaNb } = useSelector((state) => state.nbKSK);
  const { showLoading, hideLoading } = useLoading();

  const refOk = useRef(null);
  const [state, _setState] = useState({
    isModalVisible: false,
    hopDongKskId: null,
    khoaId: null,
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
        hopDongKskId: options?.hopDongKskId,
        khoaId: null,
      });
      refOk.current = onOk;
      getKhoaImport({ active: true, dsTinhChatKhoa: 80 });
    },
    close: () => {
      setState({
        isModalVisible: false,
        hopDongKskId: null,
        khoaId: null,
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
      message.error("Vui lòng chọn file");
      return null;
    }
    if (!state?.khoaId) {
      message.error("Vui lòng chọn khoa người bệnh");
      return null;
    }

    showLoading();
    const { isModalVisible, ...rest } = state;
    postImport(rest)
      .then(() => {
        props.refreshList();
        hideLoading();
        message.success("Import thành công dữ liệu!");
        refOk.current && refOk.current({ value: rest });
        ref.current.close();
      })
      .catch(() => {
        hideLoading();
      });
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
              <div>Chọn Khoa NB</div>
              <Select
                data={dsKhoaNb || []}
                value={state?.khoaId}
                style={{ width: "100%" }}
                placeholder={"Chọn khoa Nb"}
                onChange={onChange("khoaId")}
              />
            </div>
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
