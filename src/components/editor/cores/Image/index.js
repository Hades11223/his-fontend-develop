import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useContext,
} from "react";
import T from "prop-types";
import { message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import defaultPicture from "assets/img/default-image.jpg";
import fileUtils from "utils/file-utils";
import { Button } from "antd";
import ModalEditImage from "./ModalEditImage";
import stringUtils from "mainam-react-native-string-utils";
import fileProvider from "data-access/file-provider";
import ListImage from "./ListImage";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { MODE } from "utils/editor-utils";
import { refConfirm } from "app";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";
const FILE_PREFIX = "api/his/v1";

const ImageUpload = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { component, mode, focusing, formChange, form } = props;
  const signStatus = useStore("files.signStatus", {});
  const logoAnh = useSelector((state) => state.application.logo);
  const api = useSelector((state) => state.files.file?.api);
  const {
    component: { init },
  } = useDispatch();

  const itemProps = component.props || {};
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

  const context = useContext(EMRContext);

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

  const loadFile = async (prefix, url = "", key) => {
    let base64Image = null;
    if (url.indexOf("data:image") == 0) {
      base64Image = url;
    } else {
      const s = await fileUtils.getFromUrl({
        prefix: prefix,
        url: Array.isArray(url) ? url[0] : url,
      });
      var base64 = btoa(
        new Uint8Array(s).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      base64Image = "data:image/png;base64," + base64;
    }
    if (key) {
      setState({ [key]: base64Image });
    }
    return base64Image;
  };
  useEffect(() => {
    if (itemProps.countImageOnRow) {
      let countImageOnRow = `${itemProps.width}px`;
      for (let i = 0; i < itemProps.countImageOnRow - 1; i++) {
        countImageOnRow += ` ${itemProps.width}px`;
      }
      setState({
        countImageOnRow,
      });
    }
  }, [itemProps.countImageOnRow]);
  useEffect(() => {
    if ((itemProps.isLogo || itemProps.fieldName === "logoAnh") && logoAnh) {
      loadFile("", logoAnh, "file");
    }
  }, [logoAnh]);
  const getImage = async (listImage) => {
    const arrayImage = [];
    for (let i = 0; i < listImage?.length; i++) {
      const linkImage = listImage[i];
      if (linkImage) {
        const image = await loadFile(FILE_PREFIX, linkImage, "");
        arrayImage.push({ linkImage, image });
      }
    }
    return arrayImage;
  };
  useEffect(() => {
    if (itemProps.defaultImageUpload && itemProps.fieldName !== "logoAnh") {
      if (itemProps.selectMultilImage) {
        getImage(itemProps.defaultImageUpload).then((values) => {
          if (values.length) {
            setState({ fileDefault: values });
          }
        });
      } else {
        loadFile(FILE_PREFIX, itemProps.defaultImageUpload[0], "fileDefault");
      }
    }
  }, [itemProps.defaultImageUpload]);
  useEffect(() => {
    if (itemProps.fieldName != "logoAnh") {
      if (form) {
        if (form[itemProps.fieldName]) {
          if (itemProps.selectMultilImage) {
            getImage(form[itemProps.fieldName]).then((values) => {
              setState({ file: values });
            });
          } else {
            const getImage = async () => {
              const image = await loadFile(
                FILE_PREFIX,
                form[itemProps.fieldName],
                "file"
              );
            };
            getImage();
          }
        }
      }
    }
  }, [component, form]);
  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };
  const handleChange = (data, image) => {
    debugger;
    if (itemProps.selectMultilImage) {
      if (!api) {
        message.error(t("editor.chuaCauHinhApi"));
        return;
      }
      if (!itemProps.fieldName) {
        message.error(t("editor.chuaKhaiBaoThongTinTruongDuLieu"));
        return;
      }
      fileProvider.uploadImage({ file: data, api }).then(async (s) => {
        if (formChange && formChange[itemProps.fieldName]) {
          let index = 0;
          let listFile = [];
          const imageBase64 = await loadFile(FILE_PREFIX, s.data, "image");
          const newImage = {
            linkImage: s.data[0],
            image: imageBase64,
          };

          if (Array.isArray(state.file)) {
            index = state.file.findIndex((item) => {
              return item.linkImage == image.linkImage;
            });
            listFile = [...state.file];
          } else if (Array.isArray(state.fileDefault)) {
            index = state.fileDefault.findIndex((item) => {
              return item.linkImage == image.linkImage;
            });
            listFile = [...state.fileDefault];
          }
          listFile.splice(index, 1, newImage);
          setState({
            file: listFile,
          });
          formChange[itemProps.fieldName](listFile.map((e) => e.linkImage));
        }
      });
    } else {
      if (!api) {
        message.error(t("editor.chuaCauHinhApi"));
        return;
      }
      if (!itemProps.fieldName) {
        message.error(t("editor.chuaKhaiBaoThongTinTruongDuLieu"));
        return;
      }
      fileProvider.uploadImage({ file: data, api }).then(async (s) => {
        if (formChange && formChange[itemProps.fieldName]) {
          const imageBase64 = await loadFile(FILE_PREFIX, s.data, "file");
          setState({
            file: imageBase64,
          });
          formChange[itemProps.fieldName]([s.data]);
        }
      });
    }
    return false;
  };
  const handleClickedEdit = (link) => {
    const imgElm = imgRef.current?.src;
    if (refModalEditImage.current?.show)
      refModalEditImage.current.show({ imgSrc: imgElm }, (base64) => {
        if (!api) {
          message.error(t("editor.chuaCauHinhApi"));
          return;
        }
        if (!itemProps.fieldName) {
          message.error(t("editor.chuaKhaiBaoThongTinTruongDuLieu"));
          return;
        }

        let file = fileUtils.base64ToFile(base64, stringUtils.guid() + ".png");
        fileProvider.uploadImage({ file, api }).then(async (s) => {
          if (formChange && formChange[itemProps.fieldName]) {
            if (!itemProps.selectMultilImage) {
              if (state.file) {
                setState({
                  file: base64,
                });
              } else {
                setState({
                  fileDefault: base64,
                });
              }
              formChange[itemProps.fieldName]([s.data]);
            } else {
              let index = 0;
              let listFile = [];
              if (state.file) {
                index = state.file.findIndex((item) => item.linkImage == link);
                listFile = [...state.file];
              } else if (state.fileDefault) {
                index = state.fileDefault.findIndex(
                  (item) => item.linkImage == link
                );
                listFile = [...state.fileDefault];
              }
              const imageBase64 = await loadFile(FILE_PREFIX, s.data, "image");
              const newImage = {
                linkImage: s.data,
                image: imageBase64,
              };

              listFile.splice(index, 1, newImage);
              if (state.file) {
                setState({
                  file: listFile,
                });
              } else {
                setState({
                  fileDefault: listFile,
                });
              }
              formChange[itemProps.fieldName](listFile.map((e) => e.linkImage));
            }
          }
        });
      });
  };
  const handleDelete = (link) => {
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
          if (itemProps.selectMultilImage) {
            let newList = [];
            if (state.file?.length) {
              newList = state.file.filter((image) => image?.linkImage !== link);
              setState({
                file: newList,
              });
            } else {
              newList = state.fileDefault.filter(
                (image) => image?.linkImage !== link
              );
              setState({
                fileDefault: newList,
              });
            }
            if (itemProps.fieldName) {
              formChange[itemProps.fieldName](
                newList.map((image) => image.linkImage)
              );
            }
          }
        }
      );
  };
  const handleAddImage = (info, fileList) => {
    if (!itemProps.fieldName) {
      message.error(t("editor.chuaKhaiBaoThongTinTruongDuLieu"));
      return;
    }
    const countImage =
      fileList.length + state.file
        ? state.file.length
        : state.fileDefault.length;
    if (countImage >= itemProps.totalImage) {
      message.error(
        t("editor.soLuongAnhPhaiNhoHon").replace("{0}", itemProps.totalImage)
      );
    } else {
      setState({
        fileList: fileList,
      });
    }
    return false;
  };
  useEffect(() => {
    if (state.fileList && state.fileList.length) {
      fileProvider
        .uploadMultilImage({ files: state.fileList, api: api })
        .then((s) => {
          getImage(s.data.map((item) => item.data)).then((arrayImage) => {
            if (arrayImage.length === s.data.length) {
              if (state.file) {
                setState({
                  file: [...state.file, ...arrayImage],
                  fileList: [],
                });
                formChange[itemProps.fieldName](
                  [...state.file, ...arrayImage].map((image) => image.linkImage)
                );
              } else if (state.fileDefault) {
                setState({
                  fileDefault: [...state.fileDefault, ...arrayImage],
                  fileList: [],
                });
                formChange[itemProps.fieldName](
                  [...state.fileDefault, ...arrayImage].map(
                    (image) => image.linkImage
                  )
                );
              } else {
                setState({
                  file: [...arrayImage],
                  fileList: [],
                });
                formChange[itemProps.fieldName](
                  [...arrayImage].map((image) => image.linkImage)
                );
              }
            }
          });
        });
    }
  }, [state.fileList]);
  useEffect(() => {
    if (itemProps.selectMultilImage) {
      if (state?.file?.length >= itemProps.totalImage) {
        setState({
          showBtnAdd: false,
        });
      } else if (state?.fileDefault?.length >= itemProps.totalImage) {
        setState({
          showBtnAdd: false,
        });
      } else {
        setState({
          showBtnAdd: true,
        });
      }
    }
  }, [itemProps, state.file, state.fileDefault]);
  const renderFile = () => {
    if (state.file) {
      if (itemProps.selectMultilImage) {
        if (!!state.file.length) {
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `${state.countImageOnRow}`,
                gridGap: "10px",
              }}
            >
              {Array.isArray(state.file) &&
                state.file
                  .slice(0, itemProps.totalImage)
                  .map((image, key) => (
                    <ListImage
                      key={key}
                      disable={state.disable || mode == MODE.config}
                      itemProps={itemProps}
                      imgRef={imgRef}
                      onHandleClickedEdit={handleClickedEdit}
                      image={image}
                      onHandleDelete={handleDelete}
                      onHandleChange={handleChange}
                    />
                  ))}
            </div>
          );
        } else {
        }
      } else {
        return (
          <>
            <Upload
              disabled={
                state.disable ||
                itemProps.allowSelectImage === false ||
                mode == MODE.config
              }
              showUploadList={false}
              // onChange={handleChange}
              beforeUpload={handleChange}
              accept=".png,.jpg,.jpeg,.bmp"
              customRequest={({ onSuccess }) => {
                onSuccess(null, {});
              }}
            >
              <img
                className={"img-view"}
                ref={imgRef}
                src={state.file}
                width={itemProps.width}
                height={itemProps.height}
                alt={"default"}
              />
            </Upload>
            {mode != MODE.config && !state.disable && (
              <div className="group-btn1">
                <Button
                  className="icon btn-edit"
                  onClick={handleClickedEdit}
                  icon={<EditOutlined />}
                  title={t("editor.chinhSuaHinhAnh")}
                />
              </div>
            )}
          </>
        );
      }
    } else if (state.fileDefault) {
      if (itemProps.selectMultilImage) {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `${state.countImageOnRow}`,
              gridGap: "10px",
            }}
          >
            {Array.isArray(state.fileDefault) &&
              state.fileDefault
                .slice(0, itemProps.totalImage)
                .map((image, key) => (
                  <ListImage
                    disabled={
                      state.disable ||
                      itemProps.allowSelectImage === false ||
                      mode == MODE.config
                    }
                    key={key}
                    itemProps={itemProps}
                    imgRef={imgRef}
                    onHandleClickedEdit={handleClickedEdit}
                    image={image}
                    onHandleDelete={handleDelete}
                    onHandleChange={handleChange}
                  />
                ))}
          </div>
        );
      } else {
        return (
          <>
            <Upload
              disabled={
                state.disable ||
                itemProps.allowSelectImage === false ||
                mode == MODE.config
              }
              // disabled={false}
              showUploadList={false}
              // onChange={handleChange}
              beforeUpload={handleChange}
              accept=".png,.jpg,.jpeg,.bmp"
              customRequest={({ onSuccess }) => {
                onSuccess(null, {});
              }}
            >
              <img
                className={"img-view"}
                ref={imgRef}
                src={state.fileDefault}
                width={itemProps.width}
                height={itemProps.height}
                alt={"default"}
              />
            </Upload>
            {mode != MODE.config && !state.disable && (
              <div className="group-btn1">
                <Button
                  className="btn-edit"
                  onClick={handleClickedEdit}
                  icon={<EditOutlined />}
                  title={t("editor.chinhSuaHinhAnh")}
                />
              </div>
            )}
          </>
        );
      }
    } else {
      return (
        <>
          <Upload
            disabled={
              state.disable ||
              itemProps.allowSelectImage === false ||
              mode == MODE.config
            }
            showUploadList={false}
            // onChange={handleChange}
            beforeUpload={handleChange}
            accept=".png,.jpg,.jpeg,.bmp"
            customRequest={({ onSuccess }) => {
              onSuccess(null, {});
            }}
          >
            <img
              className={"img-view"}
              ref={imgRef}
              src={defaultPicture}
              width={itemProps.width}
              height={itemProps.height}
              alt={"default"}
            />
          </Upload>
          {mode != MODE.config && !state.disable && (
            <div className="group-btn1">
              <Button
                className="btn-edit"
                onClick={handleClickedEdit}
                icon={<EditOutlined />}
                title={t("editor.chinhSuaHinhAnh")}
              />
            </div>
          )}
        </>
      );
    }
  };
  return (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      data-type="image"
      itemProps={itemProps}
      hideOnPrint={itemProps.removeOnPrint && !state.file ? true : false}
    >
      {renderFile()}
      {state.showBtnAdd && itemProps.selectMultilImage && mode !== MODE.config && (
        <Upload
          // onChange={handleAddImage}
          beforeUpload={handleAddImage}
          showUploadList={false}
          multiple={true}
          fileList={state.fileList}
          customRequest={({ onSuccess }) => {
            onSuccess(null, {});
          }}
          accept=".png,.jpg,.jpeg,.bmp"
        >
          <Button size={"small"} className="btn-add-image">
            {t("editor.themAnh")}
            <UploadOutlined />
          </Button>
        </Upload>
      )}
      <ModalEditImage ref={refModalEditImage} footer={null} />
    </Main>
  );
});

ImageUpload.defaultProps = {
  component: {
    props: {
      width: 64,
      height: 64,
    },
  },
  formChange: {},
};

ImageUpload.propTypes = {
  formChange: T.shape({}),
};

export default ImageUpload;
