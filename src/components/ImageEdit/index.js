import React, { useState, useEffect, useRef, forwardRef } from "react";
import T from "prop-types";
import { Upload } from "antd";
import { Main } from "./styled";
import fileUtils from "utils/file-utils";
import { Button } from "antd";
import ModalEditImage from "components/editor/cores/Image/ModalEditImage";
import stringUtils from "mainam-react-native-string-utils";
import fileProvider from "data-access/file-provider";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useCamera } from "hook";
import IcCircleClose from "assets/svg/pttt/close-circle.svg";
import { refConfirm } from "app";

const ImageEdit = forwardRef(({ placeholder, src, typeApi, afterSave }) => {
  const { t } = useTranslation();
  const { onShowCamera } = useCamera();
  const [state, _setState] = useState({
    disable: false,
    file: "",
    showBtnAdd: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalEditImage = useRef();
  const imgRef = useRef();

  useEffect(() => {
    if (src) {
      fileUtils.getImg({ src }).then((path) => {
        setState({ path });
        if (state.showEdit) {
          handleClickedEdit();
          setState({ showEdit: false });
        }
      });
    } else {
      setState({ path: null });
    }
  }, [src]);

  const handleChange = (data) => {
    fileProvider
      .uploadImage({ file: data.file.originFileObj, type: typeApi })
      .then(async (s) => {
        afterSave(s.data);
      });
  };
  const handleClickedDelete = () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("editor.xoaAnhDaChon")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          afterSave(null);
          setState({ path: null });
        }
      );
  };
  const handleClickedEdit = () => {
    const imgElm = imgRef.current?.src;
    if (refModalEditImage.current?.show)
      refModalEditImage.current.show({ imgSrc: imgElm }, (base64) => {
        let file = fileUtils.base64ToFile(base64, stringUtils.guid() + ".png");
        fileProvider.uploadImage({ file, type: typeApi }).then(async (s) => {
          afterSave(s.data);
        });
      });
  };

  return (
    <Main data-type="image">
      <Upload
        disabled={state.disable}
        showUploadList={false}
        onChange={handleChange}
        accept=".png,.jpg,.jpeg,.bmp"
      >
        <img
          className={`img-view ${state.path ? "" : "img-default"}`}
          ref={imgRef}
          src={state.path || require("assets/images/pttt/default-image.jpg")}
          alt={"default"}
        />
      </Upload>
      {!!state.path && (
        <Button
          className="icon close-icon"
          onClick={handleClickedDelete}
          icon={<IcCircleClose />}
          title={t("editor.xoaAnhDaChon")}
        />
      )}
      {!state.disable && (
        <div className="group-btn1">
          <Button
            className="icon btn-edit"
            onClick={handleClickedEdit}
            icon={<EditOutlined />}
            title={t("editor.chinhSuaHinhAnh")}
          />
        </div>
      )}
      <img
        className={`btn-camera`}
        onClick={() => {
          onShowCamera(
            {
              title: "Chụp ảnh",
              propSelect: {
                title: "Chỉnh sửa",
                onClick:
                  ({ uploadImage }) =>
                  () => {
                    setState({ showEdit: true });
                    uploadImage();
                  },
              },
            },
            async (file) => {
              const res = await fileProvider.uploadImage({
                file,
                type: "ptttLuocDo",
              });
              return res;
            },
            (image) => {
              afterSave(image.data);
            }
          );
        }}
        src={require("assets/images/web-cam/camera3.png")}
        alt=""
      ></img>
      {!src && <span className="text-placeholder">{placeholder}</span>}
      <ModalEditImage ref={refModalEditImage} footer={null} />
    </Main>
  );
});

ImageEdit.defaultProps = {
  component: {
    props: {
      width: "100%",
      height: "100%",
    },
  },
  formChange: {},
};

ImageEdit.propTypes = {
  formChange: T.shape({}),
};

export default ImageEdit;
