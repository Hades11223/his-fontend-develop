import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import T from "prop-types";
import TextEdit from "components/editor/cores/TextEdit";
import { Main } from "./styled";
import { Button, message, Modal } from "antd";
import Icon from "@ant-design/icons";
import ModalPatientSign from "pages/editor/report/components/ModalPatientSign";
import fileUtils from "utils/file-utils";
import renderHTML from "react-render-html";
import iconRemove from "assets/svg/x-mark.svg";
import { MODE } from "utils/editor-utils";
import moment from "moment";
import ModalEditImage from "../Image/ModalEditImage";
import EMRContext from "pages/editor/context/EMR";
import { useStore } from "hook";
import { useDispatch } from "react-redux";
const ElectronicSignature = forwardRef(({ textTransform, ...props }, ref) => {
  const [state, _setState] = useState({
    disable: false,
    onClickShow: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const context = useContext(EMRContext);
  const signStatus = useStore("files.signStatus", {});
  const {
    component: { init },
    signer: { getUserSignImage },
    files: { setSignStatus, checkAllowSign, checkAllowClearSign },
  } = useDispatch();
  const components = useStore("files.file.components", []);
  const { mode, component, form, formChange, focusing } = props;
  const buttonSign = "Xác nhận ký";
  const buttonSignRef = useRef(null);
  const refModalPatientSign = useRef(null);
  const itemProps = component.props || {};
  const refModalEditImage = useRef(null);
  const getValue = (id) => {
    const elm = document.getElementById(id);
    return elm ? elm.innerHTML : "";
  };
  useEffect(() => {
    setState({
      personSign: itemProps.personSign,
      buttonSignText: itemProps.buttonSignText,
    });
    if (form && form[itemProps.fieldName + "_chuKy"]) {
      let url = form[itemProps.fieldName + "_chuKy"] + "";

      if (
        url?.indexOf("data:") == 0 || //nếu là base64 image hoặc
        (!itemProps.isPatient && itemProps.displayAsUserName) //hiển thị tên tài khoản
      ) {
        setState({
          imageData: form[itemProps.fieldName + "_chuKy"],
        });
      } else {
        fileUtils
          .getFromUrl({
            prefix: "api/html-editor/v1/",
            url: Array.isArray(form[itemProps.fieldName + "_chuKy"])
              ? form[itemProps.fieldName + "_chuKy"][0]
              : form[itemProps.fieldName + "_chuKy"],
          })
          .then((s) => {
            var base64 = btoa(
              new Uint8Array(s).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            setState({
              imageData: "data:image/png;base64," + base64,
            });
          })
          .catch((e) => {
            setState({
              imageData: form[itemProps.fieldName + "_chuKy"]
                ? form[itemProps.fieldName + "_chuKy"]
                : null,
            });
          });
      }
    }
    if (mode !== MODE.config) {
      let sign = {
        componentId: component.key,
        block:
          component.props.disableIfSigned &&
          form &&
          itemProps.fieldName &&
          form[itemProps.fieldName + "_chuKy"]
            ? true
            : false,
        levelSign: itemProps.levelSign,
        chuKy: form ? form[itemProps.fieldName + "_chuKy"] : null || null,
      };
      setSignStatus(sign);
    }
  }, [component, form]);

  useImperativeHandle(ref, () => ({
    collectProps: () => {
      return {
        personSign: getValue(`${component.type}_${component.key}`),
        buttonSignText: getValue(`${component.type}_${component.key}_btn_sign`),
      };
    },
  }));

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };
  const getNewSignLevel = (sign) => {
    let values = {};
    if (formChange.getAllData) values = formChange.getAllData();
    let signComponent = components
      .filter((item) => {
        if (item.type === "electronicSignature") {
          if (sign) {
            if (
              item.key == component.key ||
              values[item.props?.fieldName + "_chuKy"]
            ) {
              return true;
            }
          } else {
            if (
              item.key != component.key &&
              values[item.props?.fieldName + "_chuKy"]
            ) {
              return true;
            }
          }
          return false;
        }
      })
      .sort((a, b) => {
        return a.props?.levelSign > b.props?.levelSign ? -1 : 1;
      });
    if (!signComponent.length) {
      return 0;
    }
    return signComponent[0].props?.levelSign;
  };

  const sendActionAutoSave = () => {
    if (itemProps.autoSave || itemProps.autoSave === undefined) {
      window.postMessage(
        {
          TYPE: "EDITOR-SIGNED",
        },
        window.location.origin
      );
    }
  };

  const onSign = () => {
    if (mode == "config") {
      message.error("Component disable trong config mode");
      return;
    }
    if (!form) return;
    let level = itemProps.levelSign;
    let allData = {};
    if (formChange.getAllData) allData = formChange.getAllData();
    checkAllowSign({
      level,
      values: allData,
      fieldName: itemProps.fieldName,
    })
      .then((s) => {
        if (itemProps.isPatient) {
          if (refModalPatientSign.current) {
            refModalPatientSign.current.show(
              {
                isGetImage: true,
                // ...s?.data,
                // maHoSo: state.maHoSo,
                // soPhieu: state.soPhieu,
              },
              (image) => {
                setState({
                  imageData: image,
                });
                let newData = {};

                if (itemProps.fieldName) {
                  newData = {
                    ...newData,
                    [itemProps.fieldName + "_chuKy"]: image,
                    [itemProps.fieldName + "_ngayKy"]: moment(
                      new Date()
                    ).toISOString(true),
                    ["capKyDienTuHienTai"]: getNewSignLevel(true),
                  };
                }
                if (formChange.setMultiData) {
                  formChange.setMultiData(newData);
                }

                message.success(
                  "Ký " + (itemProps.signer || "") + " thành công"
                );
                let sign = {
                  componentId: component.key,
                  block: component.props.disableIfSigned,
                  levelSign: itemProps.levelSign,
                  chuKy: image,
                };
                setSignStatus(sign);
                sendActionAutoSave();
              }
            );
          }
        } else {
          setState({
            isLoading: true,
          });
          if (itemProps.displayAsUserName) {
            setSign(context.auth?.username);
          } else {
            getUserSignImage(context.auth?.id).then((s) => {
              if (s) {
                setSign("data:image/png;base64," + s);
              } else {
                setState({ isLoading: false });
                message.error("Người dùng chưa khai báo chữ ký");
              }
            });
          }
        }
      })
      .catch((e) => {
        message.error(e || "Bạn chưa thể thực hiện ký vào lúc này");
      });
  };

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const setSign = (s) => {
    setState({
      imageData: s,
    });
    if (itemProps.fieldName) {
      let newData = {};
      if (itemProps.fieldName) {
        newData = {
          ...newData,
          [itemProps.fieldName + "_chuKy"]: s,
          [itemProps.fieldName + "_ngayKy"]: moment(new Date()).toISOString(
            true
          ),
          [itemProps.fieldName + "_hoVaTen"]: context.auth?.full_name,
          [itemProps.fieldName + "_username"]: context.auth?.username,
          ["capKyDienTuHienTai"]: getNewSignLevel(true),
        };
        if (formChange.setMultiData) {
          formChange.setMultiData(newData);
        }
      }
    }
    setState({
      isLoading: false,
      show: false,
    });
    message.success("Ký " + (itemProps.signer || "") + " thành công");
    let sign = {
      componentId: component.key,
      block: component.props.disableIfSigned,
      levelSign: itemProps.levelSign,
      chuKy: s,
    };
    setSignStatus(sign);
    sendActionAutoSave();
  };
  const clearSignature = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có muốn hủy ký điện tử",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: () => {
        let level = itemProps.levelSign;
        let newData = {};
        let allData = {};
        if (formChange.getAllData) allData = formChange.getAllData();

        checkAllowClearSign({
          level,
          values: allData,
          fieldName: itemProps.fieldName,
        })
          .then((s) => {
            setState({
              imageData: "",
            });
            if (itemProps.fieldName && formChange.setMultiData) {
              newData[itemProps.fieldName + "_chuKy"] = "";
              newData[itemProps.fieldName + "_ngayKy"] = "";
              newData[itemProps.fieldName + "_hoVaTen"] = "";
              newData[itemProps.fieldName + "_username"] = "";
              newData["capKyDienTuHienTai"] = getNewSignLevel(false);
              formChange.setMultiData(newData);
            }
            setSignStatus({
              componentId: component.key,
              block: false,
              chuKy: null,
              levelSign: itemProps.levelSign,
            });
            props.onClearSignature && props.onClearSignature();
            sendActionAutoSave();
          })
          .catch((e) => {
            message.error(e);
          });
      },
    });
  };

  useEffect(() => {
    const isDisable = context.isDisable;
    let disable =
      isDisable({
        itemProps,
        signStatus,
        props,
        options: { isSignature: true },
      }) || itemProps.disabled;
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
  const handleChangeImageSign = () => {
    if (itemProps.isPatient && refModalEditImage.current) {
      refModalEditImage.current.show(
        { imgSrc: state.imageData, isSign: true },
        (e) => {
          setSign(e);
        }
      );
    }
  };
  return (
    <Main
      className="signature"
      onClick={handleFocus}
      focusing={focusing}
      itemProps={itemProps}
      mode={mode}
      hadLabel={!!itemProps.personSign}
    >
      <div className="sign-body">
        {mode === "config" ? (
          <TextEdit
            id={`${component.type}_${component.key}_btn_sign`}
            className={"text-field-label"}
            defaultValue={itemProps.buttonSignText || buttonSign}
            ref={buttonSignRef}
            mode={mode}
            onChange={onChangeValue("buttonSignText")}
            textTransform={textTransform}
          />
        ) : mode === "editing" ? (
          state.imageData ? (
            <>
              <div
                className="image-sign-area"
                onClick={() =>
                  setState({
                    onClickShow: !state.onClickShow,
                  })
                }
                onDoubleClick={handleChangeImageSign}
              >
                {(itemProps.isPatient || !itemProps.displayAsUserName) &&
                (state.imageData?.endsWith(".png") ||
                  state.imageData.indexOf("data:") == 0) ? (
                  <img src={`${state.imageData}`} />
                ) : (
                  <div>{state.imageData}</div>
                )}
              </div>
              {itemProps.allowReset && !state.disable && state.onClickShow && (
                <Button
                  className="btn-reset-signature"
                  onClick={clearSignature}
                  size={"small"}
                >
                  <Icon component={iconRemove} />
                </Button>
              )}
            </>
          ) : (
            !state.disable && (
              <Button
                className="btn-signature"
                loading={state.isLoading}
                onClick={onSign}
              >
                {renderHTML(itemProps.buttonSignText || buttonSign)}
              </Button>
            )
          )
        ) : (
          <div></div>
        )}
      </div>
      <ModalPatientSign ref={refModalPatientSign} />
      <ModalEditImage ref={refModalEditImage} footer={null} />
    </Main>
  );
});

ElectronicSignature.defaultProps = {
  mode: "editing",
  labelText: "",
  form: {},
  formChange: {},
  component: {},
  line: {},
};

ElectronicSignature.propTypes = {
  mode: T.oneOf(["config", "editing"]),
  form: T.shape({}),
  formChange: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  labelText: T.string,
};

export default ElectronicSignature;
