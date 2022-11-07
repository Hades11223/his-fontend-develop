import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import fileProvider from "data-access/file-provider";
import { message, Tooltip } from "antd";
import Pdf from "components/Pdf";
import IcRemove from "assets/svg/tiep-don/remove.svg";
import IcSave from "assets/svg/ic-save.svg";
import Image from "components/Image";
import { useTranslation } from "react-i18next";
import { Button, ModalTemplate } from "components";
import { useCamera } from "hook";
const ModalUploadGiayTo = (props, ref) => {
  const { t } = useTranslation();
  const refCallback = useRef(null);
  const refModal = useRef(null);
  const refImage = useRef();
  const { onShowCamera } = useCamera();
  const [state, _setState] = useState({
    dataView: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      setState({
        show: item.show,
        dataView: item.dataView || [],
        typeFile: item.type,
        title: item.title,
      });
      refCallback.current = callback;
    },
  }));
  const { type, dataView, typeFile, title } = state;
  const onOK = () => {
    onCancel();
    if (refCallback.current)
      refCallback.current({ data: dataView, type: typeFile });
  };
  const handleUploadFile = (event) => {
    event.preventDefault();
    return refImage.current.click();
  };
  const onSelectFile = (file, type) => {
    fileProvider
      .uploadImage({ file, type })
      .then((s) => {
        if (s?.code === 0) {
          let data = [];
          let image = s.data;
          data = dataView?.concat(image);
          setState({ dataView: data });
        } else {
          message.error(s.message);
        }
      })
      .catch(() => {});
  };

  const onCancel = () => {
    setState({ show: false });
  };
  const onDeleteIndex = (index) => {
    dataView.splice(index, 1);
    setState({ dataView: [...dataView] });
  };
  const onTakePicture = () => {
    onShowCamera(
      {
        title: t("common.chupAnh"),
      },
      async (file) => {
        const res = await fileProvider.uploadImage({ file, type: typeFile });
        if (res?.code === 0) return res.data[0];
        return null;
      },
      (image) => {
        if (image) {
          let data = dataView?.concat(image);
          setState({ dataView: data });
        }
      }
    );
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  return (
    <ModalTemplate
      title={`${t("common.thongTin")} ${title}`}
      ref={refModal}
      closable={false}
      width={700}
    >
      <Main>
        <div span={24} className="header">
          <img
            className="info"
            src={require("assets/images/welcome/info.png")}
            alt=""
          />
          <div className="info">
            <span className="title">
              {t("tiepDon.taiLenGiay")} {title}
            </span>
            <br />
            <span className="content">
              {t("tiepDon.nhanVaoIconMayAnhDeChupAnh")}
              <br />
              {t("tiepDon.nhanVaoIconDeTaiTepTuMay")}
              <br />
              {t("tiepDon.nhanVaoDauXDeXoaDuLieu")}
            </span>
          </div>
        </div>
        <div className="body-camera">
          <div className="camera">
            {dataView?.map((item, index) => {
              return (
                <div className="item" key={index}>
                  {item?.substr(item.length - 3, 3) === "pdf" ? (
                    <Pdf src={item} width={150} height={100} />
                  ) : (
                    <Image src={item} alt="" />
                  )}
                  <div className="file-overlay" />
                  <IcRemove
                    className="icon-close"
                    //   src={require("assets/images/welcome/closeImage.png")}
                    onClick={() => onDeleteIndex(index)}
                    //   alt=""
                  />
                </div>
              );
            })}
          </div>
          <div className="camera-icon">
            <Tooltip title={t("common.chupAnh")} placement="bottom">
              <img
                onClick={onTakePicture}
                src={require("assets/images/web-cam/camera2.png")}
                alt=""
                style={{ marginRight: 10 }}
              />
              <input
                style={{ display: "none" }}
                accept="file_extension"
                type="file"
                onChange={(e) => onSelectFile(e.target.files[0], typeFile)}
                ref={refImage}
              />
            </Tooltip>
            <Tooltip title={t("tiepDon.taiTepLen")} placement="bottom">
              <img
                onClick={handleUploadFile}
                src={require("assets/images/web-cam/dammay.png")}
                alt=""
              />
            </Tooltip>
          </div>
        </div>
        <div className="bottom-action">
          <Button onClick={onCancel} minWidth={100}>
            {t("common.quayLai")}
          </Button>
          <Button
            type="primary"
            minWidth={100}
            onClick={onOK}
            rightIcon={<IcSave />}
            iconHeight={15}
          >
            {t("common.luuThongTin")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalUploadGiayTo);
