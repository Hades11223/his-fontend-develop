import React, { forwardRef, useEffect, useRef, useState } from "react";
import T from "prop-types";
import { Button, Spin, message } from "antd";
import { Main } from "./styled";
import "react-html5-camera-photo/build/css/index.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useTranslation } from "react-i18next";
import { TIME_CLOSE_MODAL, DURATION_MESSAGE } from "./configs";
import IconSwitchCamre from "assets/svg/switch-camera.svg";

const ModalWebcam = forwardRef(
  (
    {
      image,
      modalActions,
      title,
      show,
      onClose,
      propSelect,
      onChangeCamera,
      releaseWebcame,
      onreTakePhoto,
      ...props
    },
    ref
  ) => {
    const webcamRef = useRef(null);
    const refImage = useRef(null);
    const [state, _setState] = useState({
      crop: {
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      },
    });

    const setState = (data = {}) => {
      _setState((state) => {
        return { ...state, ...data };
      });
    };
    const handleUploadFile = (event) => {
      event.preventDefault();
      return refImage.current.click();
    };
    const { t } = useTranslation();
    useEffect(() => {
      setState({
        urlPreview: image,
        checkFormatImage: false,
      });
    }, [image]);
    const dataURLtoFile = (dataurl, filename) => {
      if (dataurl) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      }
    };

    const handleCancel = () => {
      if (navigator.getUserMedia)
        navigator.getUserMedia(
          { audio: false, video: true },
          function (stream) {
            var track = stream.getTracks()[0];
            track.stop();
            onClose(false);
            setState({
              urlPreview: "",
              fileUpload: "",
              fileName: "",
            });
          },
          function (error) {
            message.error({
              content:
                error?.message || "Lỗi không xác định, xin vui lòng thử lại!",
              duration: DURATION_MESSAGE,
            });

            setTimeout(() => onClose(false), TIME_CLOSE_MODAL);
          }
        );
      else {
        onClose(false);
        setState({
          urlPreview: "",
          fileUpload: "",
          fileName: "",
        });
      }
    };
    const selectImage = (data, isCapture, upload) => {
      releaseWebcame();
      let type =
        data.target &&
        data.target.files &&
        data.target.files[0] &&
        data.target.files[0].type;
      if (
        type === "image/png" ||
        type === "image/jpeg" ||
        type === "image/gif" ||
        upload
      ) {
        let file = "";
        let fileUpload = "";
        let urlPreview = "";
        let fileName = "";
        if (isCapture) {
          const base64regex =
            /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g;
          const isbase64 = base64regex.test(data);
          if (isbase64) {
            const imageSrc = data;
            file = dataURLtoFile(imageSrc, "image.jpg");
            urlPreview = imageSrc;
            fileUpload = file;
            fileName = "";
          }
        } else {
          fileUpload = data.target.files[0] || {};
          fileName = fileUpload.name;
          urlPreview = URL.createObjectURL(fileUpload);
        }
        setState({
          fileName,
          fileUpload,
          urlPreview,
          isSelectImage: true,
          crop: {
            x: 0,
            y: 0,
            width: 200,
            height: 200,
          },
          allowUpload: true,
          imageFile: null,
          checkFormatImage: false,
        });
      } else {
        setState({ checkFormatImage: true });
      }
    };

    const getCroppedImg = (image, crop, fileName) => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      return new Promise((resolve, reject) => {
        resolve(canvas.toDataURL());
      });
    };

    const uploadImage = () => {
      if (!state.imageFile) {
        message.error("Vui lòng chọn ảnh");
        return;
      }
      getCroppedImg(
        state.imageFile,
        state.crop,
        "422651_345735872182381_369553123_n.png"
      ).then((s) => {
        modalActions(dataURLtoFile(s, "image.jpg"), s);
      });
    };

    const reTakePhoto = () => {
      setState({
        urlPreview: "",
        fileUpload: "",
        fileName: "",
        isSelectImage: false,
        allowUpload: false,
      });

      onreTakePhoto();
    };
    const handleOnChangeCamera = () => {
      if (!state.urlPreview) {
        onChangeCamera();
      }
    };
    const onTakePhoto = () => {
      if (webcamRef.current) {
        let canvas = document.createElement("canvas");
        canvas.width = webcamRef.current.videoWidth;
        canvas.height = webcamRef.current.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height);
        selectImage(canvas.toDataURL(), true, true);
      }
    };
    return (
      <Main
        visible={show}
        title={
          <div>
            <img src={require("assets/images/web-cam/camera.png")} />
            <span>{title}</span>
          </div>
        }
        onCancel={handleCancel}
        style={{ minWidth: 768, height: "calc(100vh - 100px)" }}
        footer={
          <div
            style={{
              display: "flex",
              padding: "5px",
              justifyContent: "space-between",
            }}
          >
            <div className={"selectImage"}>
              <input
                style={{ display: "none" }}
                accept="image/*"
                type="file"
                onChange={(e) => selectImage(e)}
                ref={refImage}
              />
              <Button
                onClick={handleUploadFile}
                size={"small"}
                style={{ height: 35 }}
                type="dashed"
              >
                <img src={require("assets/images/web-cam/image.png")} /> Tải ảnh
                lên
              </Button>
              <span className={"name-image"} style={{ marginLeft: 12 }}>
                {state.checkFormatImage ? (
                  <div className="error">
                    Vui lòng chọn đúng định dạng ảnh !
                  </div>
                ) : null}
              </span>
            </div>
            <div className="action">
              {state.isSelectImage && propSelect && (
                <Button
                  type={propSelect.type || "purple"}
                  className="btn-create"
                  onClick={
                    propSelect.onClick && propSelect.onClick({ uploadImage })
                  }
                  size="large"
                >
                  {propSelect.title}
                </Button>
              )}
              <IconSwitchCamre
                className="switch-camera"
                onClick={handleOnChangeCamera}
              ></IconSwitchCamre>
              <Button
                type="danger"
                className="btn-create"
                onClick={reTakePhoto}
                size="large"
              >
                Chụp lại
              </Button>
              <Button
                type="primary"
                className="btn-create"
                htmlType="submit"
                size="large"
                onClick={uploadImage}
              >
                {t("common.luu")}
              </Button>
            </div>
          </div>
        }
      >
        <Spin spinning={false}>
          <div className="image-preview">
            {state.urlPreview ? (
              state.isSelectImage ? (
                <ReactCrop
                  src={state.urlPreview}
                  crop={state.crop}
                  onChange={(newCrop) => setState({ crop: newCrop })}
                  onImageLoaded={(image) => {
                    let width = Math.min(image.width, image.height);
                    setState({
                      crop: {
                        width: width,
                        height: width,
                        x: (image.width - width) / 2,
                        y: (image.height - width) / 2,
                      },
                      imageFile: image,
                    });
                    return false;
                  }}
                />
              ) : (
                <img src={state.urlPreview} />
              )
            ) : (
              <div className="camera">
                <video
                  ref={webcamRef}
                  autoPlay={true}
                  id="videoElement"
                ></video>
                <div className="outer-circle">
                  <div className="btn-take" onClick={onTakePhoto}></div>
                </div>
              </div>
            )}
          </div>
        </Spin>
      </Main>
    );
  }
);
ModalWebcam.defaultProps = {
  visible: false,
  data: {},
};

ModalWebcam.propTypes = {
  visible: T.bool,
  data: T.shape({}),
};
export default ModalWebcam;
