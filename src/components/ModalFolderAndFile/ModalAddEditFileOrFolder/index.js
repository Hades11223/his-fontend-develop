import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { InboxOutlined } from "@ant-design/icons";
import { Input, message, Upload } from "antd";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import { Button } from "components";
import { useDispatch } from "react-redux";
import PdfView from "components/Pdf";
const { Dragger } = Upload;
const ModalAddEditFileOrFolder = (props, ref) => {
  const [state, _setState] = useState({
    name: "",
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const {
    hoSoBenhAn: { uploadImage, createFileOrFolder, editFileOrFolder },
  } = useDispatch();
  const refCallback = useRef(null);
  const { t } = useTranslation();
  const propsDragger = {
    maxCount: 1,
    showUploadList: false,
    multiple: false,
    accept: ".png,.jpg,.jpeg,.bmp",
    beforeUpload: async (file) => {
      try {
        const data = await uploadImage({ file });
        setState({
          ten: file.name,
          src: URL.createObjectURL(file),
          duongDan: data,
        });
      } catch (error) {
        setState({
          src: "",
        });
      }

      return false;
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const refModal = useRef(null);
  useImperativeHandle(ref, () => ({
    show: (data, callback) => {
      console.log("data", data);
      setState({
        loai: data.loai,
        ten: data.ten || "",
        file: data.file,
        src: data.src,
        item: data.item,
        fileChaId: data.fileChaId,
        duongDan: data.duongDan,
        nbThongTinId: data.nbThongTinId,
        data: data.data,
      });
      refModal.current.show();
      refCallback.current = callback;
    },
    hide: () => {
      refModal.current.hide();
    },
  }));
  const onChangeName = (e) => {
    setState({
      ten: e.target.value,
    });
  };
  const onOk = () => {
    let data = {};
    if (!state.ten) {
      message.error("Tên không được để trống");
      return;
    }
    if ((state.data || []).some((item) => item.ten == state.ten)) {
      message.error(`Tên ${state.loai == 10 ? "thư mục" : "file"} đã tồn tại`);
      return;
    }
    if (state.loai === 20 && !state.duongDan) {
      message.error("Xin vui lòng chọn ảnh");
      return;
    }
    if (state.item?.id) {
      data = {
        id: state.item?.id,
        duongDan: state.duongDan,
        ten: state.ten,
      };
      refCallback.current(data);
    } else {
      data = {
        nbThongTinId: state.nbThongTinId,
        loai: state.loai,
        ten: state.ten,
        duongDan: state.duongDan,
        fileChaId: state.fileChaId,
      };
      refCallback.current(data);
    }
  };
  return (
    <ModalTemplate
      title={t("hsba.nhapThongTin")}
      width={500}
      ref={refModal}
      closable={true}
      wrapClassName={"modal-folder-and-file"}
      actionLeft={
        <Button
          className="btn-cancel"
          onClick={() => {
            setState({});
            refModal.current && refModal.current.hide();
          }}
        >
          {t("common.huy")}
        </Button>
      }
      actionRight={
        <Button onClick={onOk} type="success">
          {t("common.dongY")}
        </Button>
      }
    >
      <Main>
        <div className="name">
          <div className="field">
            {t(state.loai !== 20 ? "hsba.tenThuMuc" : "hsba.tenFile")}
          </div>
          <Input value={state?.ten} onChange={onChangeName}></Input>
        </div>
        {state.loai === 20 ? (
          <>
            <Dragger {...propsDragger}>
              {state.src ? (
                <div style={{ overflowY: "scroll", maxHeight: 500 }}>
                  {state.ten.includes(".pdf") ? (
                    <PdfView src={state?.duongDan} width={450} />
                  ) : (
                    <img style={{ width: "100%" }} src={state.src}></img>
                  )}
                </div>
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {t("hsba.chonHoacKeoFileVaoDay")}
                  </p>
                </>
              )}
            </Dragger>
          </>
        ) : (
          <></>
        )}
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalAddEditFileOrFolder);
