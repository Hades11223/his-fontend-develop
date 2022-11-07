import React, { useState, memo, useEffect } from "react";
import {
  Button as AntButton,
  Slider,
  Input,
  Popover,
  Col,
  Row,
  message,
} from "antd";
import { Button, Select } from "components";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  PrinterOutlined,
  DownloadOutlined,
  SettingOutlined,
  SaveOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { printJS } from "data-access/print-provider";
import { Main, PopupTool, GlobalStyle } from "./styled";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import { pdfGenerator } from "utils/editor-utils";
import * as command from "components/editor/config/EditorTool/utils";
import pdfUtils from "utils/pdf-utils";
import fileUtils from "utils/file-utils";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HOST } from "client/request";
import moment from "moment";
import { useLoading, useStore } from "hook";
import { t } from "i18next";
import { cloneDeep } from "lodash";
import { refConfirm } from "app";
import { refValues } from "../File";
import { detectMob } from "utils";
const Toolbar = ({
  onSaveData,
  fileOnShow,
  patientDocument,
  zoomValue,
  setZoomValue,
  changeFileOnshow,
  // onChangeNameDocument = () => {},
  ...props
}) => {
  const { showLoading, hideLoading } = useLoading();
  const listTemplate = useStore("files.templateBieuMau", []);
  const fileData = useStore("files.fileData", {});
  const file = useStore("files.file", {});
  const pathName = window.location.pathname;
  const isPreview = pathName.includes("preview");
  const isTemplate = pathName.includes("template");
  const { baoCaoId } = useParams();
  const {
    // fileDataHIS,
    isSaveFormLoading = false,
    // savedId,
    // fileData,
    // signStatus = {},
    // showModalSign,
    // quickSign,
  } = useSelector((state) => state.files);
  // const history = useHistory();
  // const { patient } = useSelector((state) => state.patient);
  const { width: windowWidth } = useSelector((state) => state.application);
  // const { files } = useSelector((state) => state.documents);
  // const { auth } = useSelector((state) => state.auth);
  // const { signDigital, getHistorySigned } = useDispatch().signer;
  // const isAdmin = useDispatch().auth.isAdmin;
  // const { getCommonConfig } = useDispatch().common;
  // const { commonConfig } = useSelector((state) => state.common);
  // const updateDataDocument = useDispatch().documents.updateData;
  // const refFileSigned = useRef({});
  const [state, _setState] = useState({
    fontSize: "2",
    fontFamily: "timesNewRoman",
    idx: 0,
    isSigning: false,
    isAdmin: false,
    bieuMauTemplate: null,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  // const refModalSignPdf = useRef(null);
  const dispatch = useDispatch();
  const { updateData } = dispatch.application;
  const { deleteTemplateBieuMua } = useDispatch().files;
  const updateFileData = useDispatch().files.updateData;
  const handleChangeFontSize = (value) => {
    setState({
      fontSize: value,
    });
    command.setFontSize(value);
  };
  const handleChangeZoom = (value) => {
    setZoomValue(value);
  };
  const width = window.screen.width;
  useEffect(() => {
    if (width > 1000 && width <= 1200) {
      setZoomValue(90);
    } else if (width > 768 && width <= 1000) {
      setZoomValue(80);
    } else if (width > 500 && width <= 768) {
      setZoomValue(60);
    } else if (width < 500) {
      setZoomValue(40);
    } else if (width > 1200) {
      setZoomValue(100);
    }
  }, [width]);
  // useEffect(() => {
  //   isAdmin().then((s) => {
  //     setState({ isAdmin: s });
  //   });
  // }, [auth]);
  useEffect(() => {
    if (props.layoutType !== "default" && width > 1300) {
      updateData({ therapyRightToolCollapse: true });
    } else if (props.layoutType == "default" && width > 1300) {
      updateData({ therapyRightToolCollapse: false });
    }
  }, [props.layoutType]);
  // const onSignForm = async () => {
  // if (fileOnShow?.soPhieu) {
  //   let khoaChiDinhId = "";
  //   const khoaChiDinh = auth.departmentIds?.find((e) => e == patient?.khoaId);
  //   if (khoaChiDinh) {
  //     khoaChiDinhId = khoaChiDinh;
  //   } else {
  //     khoaChiDinhId = department?.id;
  //   }
  //   if (
  //     fileOnShow?.formId ||
  //     fileOnShow?.type == "xnhis" ||
  //     fileOnShow?.type == "cdhahis"
  //   ) {
  //     setState({
  //       isSigning: true,
  //     });
  //     pdfGenerator(fileOnShow, props.layoutType)
  //       .then(({ pdfUrls }) => {
  //         if (refModalSignPdf.current || pdfUrls?.length) {
  //           setState({
  //             isSigning: false,
  //           });
  //           refModalSignPdf.current.show({
  //             formId: fileOnShow?.formId,
  //             maHoSo: patientDocument,
  //             urlFile: pdfUrls[0],
  //             soPhieu: fileOnShow?.soPhieu,
  //             maBieuMau: fileOnShow?.maBieuMau,
  //             tenBieuMau: fileOnShow?.ten,
  //             nbHoSoBaId: fileOnShow?.nbHoSoBaId,
  //             khoaChiDinhId: fileOnShow?.khoaChiDinhId || khoaChiDinhId,
  //             ngayThucHien: fileOnShow?.ngayThucHien || moment().format(),
  //           });
  //         } else {
  //           setState({
  //             isSigning: false,
  //           });
  //         }
  //       })
  //       .catch((e) => {
  //         setState({
  //           isSigning: false,
  //         });
  //       });
  //   } else {
  //     let urlFile = "";
  //     if (fileUtils.isExternalUrl(fileOnShow.api)) {
  //       urlFile = pdfUtils.getExtenalPdfUrl(fileOnShow.api);
  //     } else {
  //       let blob = await fileUtils.getFromUrl({
  //         url: `${HOST}${fileOnShow.api}`,
  //       });
  //       blob = new Blob([new Uint8Array(blob)], {
  //         type: "application/pdf",
  //       });
  //       urlFile = window.URL.createObjectURL(blob);
  //     }
  //     refModalSignPdf.current.show(
  //       {
  //         formId: fileOnShow?.formId,
  //         maHoSo: patientDocument,
  //         urlFile: urlFile,
  //         soPhieu: fileOnShow?.soPhieu || 1,
  //         maBieuMau: fileOnShow?.maBieuMau,
  //         tenBieuMau: fileOnShow?.ten,
  //         ngayThucHien: fileOnShow?.ngayThucHien || moment().format(),
  //         khoaChiDinhId: fileOnShow?.khoaChiDinhId || khoaChiDinhId,
  //       },
  //       changeFileOnshow
  //     );
  //   }
  // } else {
  //   onSaveData(true, false);
  // }
  // };
  // const refTimeout = useRef(null);
  // const refTimeoutQuickSign = useRef(null);
  // useEffect(() => {
  //   if (showModalSign && fileOnShow?.patientDocument && !isSaveFormLoading) {
  //     refTimeout.current = setTimeout(() => {
  //       onSignForm();
  //     }, 1000);
  //   }
  // }, [showModalSign, fileOnShow]);
  // useEffect(() => {
  //   if (quickSign && fileOnShow?.patientDocument && !isSaveFormLoading) {
  //     refTimeoutQuickSign.current = setTimeout(() => {
  //       onSign();
  //     }, 1000);
  //   }
  // }, [quickSign, fileOnShow]);
  // useEffect(() => {
  //   getCommonConfig();
  //   return () => {
  //     if (refTimeout.current) {
  //       clearTimeout(refTimeout.current);
  //       clearTimeout(refTimeoutQuickSign.current);
  //     }
  //   };
  // }, []);
  // const checkDisableDelete = () => {
  //   let checkSign = false;
  //   Object.keys(signStatus).find((item) => {
  //     checkSign = signStatus[item].block;
  //   });
  //   if (!checkSign && fileOnShow?.maBieuMau === "EMR_HSDD067") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const onClickSaveData = () => {
    onSaveData(false);
  };
  const onPrintForm = async () => {
    if (
      !fileOnShow ||
      fileOnShow?.ma ||
      fileOnShow?.type == "xnhis" ||
      fileOnShow?.type == "cdhahis"
    ) {
      try {
        showLoading();
        const { pdfUrls } = await pdfGenerator(props.layoutType);
        let blobUrl = null;
        if (pdfUrls.length > 1) {
          blobUrl = await pdfUtils.mergePdf(pdfUrls);
          if (!blobUrl) blobUrl = pdfUrls[0];
        } else {
          blobUrl = pdfUrls[0];
        }
        if (detectMob()) {
          window.open(blobUrl);
        } else {
          printJS({
            printable: blobUrl,
            type: "pdf",
          });
        }
      } catch (error) {
      } finally {
        hideLoading();
      }
    } else {
      if (fileOnShow?.api) {
        if (fileUtils.isExternalUrl(fileOnShow?.sign?.api || fileOnShow?.api)) {
          printJS({
            printable: pdfUtils.getExtenalPdfUrl(
              fileOnShow?.sign?.api || fileOnShow?.api
            ),
            type: "pdf",
          });
        } else
          fileUtils
            .getFromUrl({ url: `${HOST}${fileOnShow?.api}` })
            .then((s) => {
              const blob = new Blob([new Uint8Array(s)], {
                type: "application/pdf",
              });
              const blobUrl = window.URL.createObjectURL(blob);
              printJS({
                printable: blobUrl,
                type: "pdf",
              });
            });
      }
    }
  };
  const onDownload = async () => {
    if (
      !fileOnShow ||
      fileOnShow?.ma ||
      fileOnShow?.type == "xnhis" ||
      fileOnShow?.type == "cdhahis"
    ) {
      try {
        showLoading();
        const { pdfUrls } = await pdfGenerator(props.layoutType);
        if (pdfUrls?.length) {
          if (pdfUrls?.length > 1) {
            const blobUrl = await pdfUtils.mergePdf(pdfUrls);
            exportFile(blobUrl);
          } else {
            exportFile(pdfUrls);
          }
        }
      } catch (error) {
      } finally {
        hideLoading();
      }
    } else {
      if (fileOnShow?.api) {
        if (fileUtils.isExternalUrl(fileOnShow?.sign?.api || fileOnShow?.api)) {
          const url = getUrlFile(fileOnShow?.sign?.api || fileOnShow?.api);
          fileUtils
            .getFromUrl({
              url,
            })
            .then((s) => {
              const blob = new Blob([new Uint8Array(s)], {
                type: "application/pdf",
              });
              const urlFile = window.URL.createObjectURL(blob);
              exportFile(urlFile);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          fileUtils
            .getFromUrl({ url: `${HOST}${fileOnShow?.api}` })
            .then((s) => {
              const blob = new Blob([new Uint8Array(s)], {
                type: "application/pdf",
              });
              const urlFile = window.URL.createObjectURL(blob);
              exportFile(urlFile);
            });
        }
      }
    }
  };

  const exportFile = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = fileOnShow
      ? `${fileOnShow?.ma}.pdf`
      : `file_${moment(new Date()).format("DD/MM/YYYY")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUrlFile = (url = "") => {
    return fileUtils.isExternalUrl(url)
      ? pdfUtils.getExtenalPdfUrl(url)
      : HOST + url;
  };
  // const renderSelectFont = () => {
  //   return (
  // <Popover
  //   trigger="click"
  //   placement="bottom"
  //   overlayClassName="popover-fontfamily"
  //   content={<AntButton>{state.fontFamily}</AntButton>}
  // >
  //   <AntButton onClick={}>{state.fontFamily}</AntButton>
  // </Popover>
  // <Select
  //   unselectable="on"
  //   className="unselectable"
  //   style={{ width: 150 }}
  //   placeholder={"font-family"}
  //   size={"small"}
  //   value={state.fontFamily}
  //   dropdownClassName
  //   onChange={(value) => {
  //     setState({
  //       fontFamily: value,
  //     });
  //   }}
  // >
  //   {Object.keys(fontFamilies).map((key) => (
  //     <Select.Option key={key} value={key}>
  //       {fontFamilies[key]}
  //     </Select.Option>
  //   ))}
  // </Select>
  //   );
  // };
  // useEffect(() => {
  //   getHistorySigned({
  //     maHoSo: patientDocument,
  //     soPhieu: fileOnShow?.soPhieu,
  //     maBieuMau: fileOnShow?.maBieuMau,
  //   })
  //     .then((s) => {
  //       refFileSigned.current = s[0][0];
  //     })
  //     .catch(() => {
  //       refFileSigned.current = {};
  //     });
  // }, [fileOnShow]);
  // const onSign = async () => {
  // if (!fileOnShow?.isNew) {
  //   let khoaChiDinhId = "";
  //   const khoaChiDinh = auth.departmentIds?.find((e) => e == patient?.khoaId);
  //   if (khoaChiDinh) {
  //     khoaChiDinhId = khoaChiDinh;
  //   } else {
  //     khoaChiDinhId = department?.id;
  //   }
  //   setState({
  //     isSigningDigital: true,
  //   });
  //   let data = {
  //     maBieuMau: fileOnShow?.maBieuMau,
  //     maHoSo: patientDocument,
  //     sequenceNo: 1,
  //     soPhieu: fileOnShow?.soPhieu,
  //     type: 1,
  //     formId: fileOnShow?.formId,
  //     nbHoSoBaId: fileOnShow.nbHoSoBaId,
  //     fileSignId: refFileSigned.current?.id,
  //     chuKySo: refFileSigned.current?.chuKySo || 1,
  //     signWithUSBToken:
  //       state.signWithUSBToken !== undefined
  //         ? state.signWithUSBToken
  //         : commonConfig["KY_SO_USB_TOKEN"]?.giaTri == "Y",
  //     tenBieuMau: fileOnShow?.ten,
  //     ngayThucHien: fileOnShow?.ngayThucHien || moment().format(),
  //     khoaChiDinhId: fileOnShow?.khoaChiDinhId || khoaChiDinhId,
  //   };
  //   if (
  //     fileOnShow?.formId ||
  //     fileOnShow?.type == "xnhis" ||
  //     fileOnShow?.type == "cdhahis"
  //   ) {
  //     pdfGenerator(fileOnShow, props.layoutType)
  //       .then(({ pdfUrls }) => {
  //         if (refModalSignPdf.current || pdfUrls?.length) {
  //           onSignDigital({ ...data, urlFile: pdfUrls[0] });
  //         } else {
  //           setState({
  //             isSigningDigital: false,
  //           });
  //         }
  //       })
  //       .catch((e) => {
  //         setState({
  //           isSigningDigital: false,
  //         });
  //       });
  //   } else {
  //     let urlFile = "";
  //     if (fileUtils.isExternalUrl(fileOnShow.api)) {
  //       urlFile = pdfUtils.getExtenalPdfUrl(fileOnShow.api);
  //     } else {
  //       let blob = await fileUtils.getFromUrl({
  //         url: `${HOST}${fileOnShow.api}`,
  //       });
  //       blob = new Blob([new Uint8Array(blob)], {
  //         type: "application/pdf",
  //       });
  //       urlFile = window.URL.createObjectURL(blob);
  //     }
  //     onSignDigital({ ...data, urlFile: urlFile });
  //   }
  // } else {
  //   onSaveData(false, true);
  // }
  // };

  // const onSignDigital = (data) => {
  //   fileUtils
  //     .urltoFile(data.urlFile, "file.pdf", "application/pdf")
  //     .then(function (file) {
  //       signDigital({ ...data, file })
  //         .then((s) => {
  //           s.type = "signed";
  //           s.title =
  //             s.soPhieu + " - " + moment(s.ngayThucHien).format("DD/MM/YYYY");
  //           s.new = true;
  //           s.key = files.length + 1;
  //           s.api = "/api/signer/v1/files/" + s.fileSauKy;
  //           s.formName = s.maBieuMau + " _ " + s.ten;
  //           const newData = [...files, s];
  //           updateDataDocument({
  //             files: newData,
  //           });
  //           setState({
  //             isSigningDigital: false,
  //           });
  //           if (fileOnShow.type === "emr") {
  //             let file = cloneDeep(fileOnShow);
  //             file.sign = s;
  //             changeFileOnshow(file);
  //           } else {
  //             changeFileOnshow(s);
  //           }
  //         })
  //         .catch(() => {
  //           setState({
  //             isSigningDigital: false,
  //           });
  //         });
  //     })
  //     .catch(() => {
  //       setState({
  //         isSigningDigital: false,
  //       });
  //     });
  // };

  const renderSelectFontSize = () => {
    return (
      <FontSizeConfig
        value={state.fontSize || "12 pt"}
        onChange={handleChangeFontSize}
        style={{ width: "auto", minWidth: "70px" }}
      />

      // <Popover
      //   trigger="click"
      //   placement="bottom"
      //   overlayClassName="popover-fontfamily"
      //   content={Object.keys(fontSizes).map((item) => (
      //     <AntButton onClick={handleChangeFontSize(item)} key={item}>
      //       {fontSizes[item]} {" pt"}
      //     </AntButton>

      //     // <Select.Option key={item} value={item}>
      //     //   {fontSizes[item]}
      //     //   {" pt"}
      //     // </Select.Option>
      //   ))}
      // >
      //   <AntButton className="select-font-size">
      //     {fontSizes[state.fontSize]} {" pt"}
      //   </AntButton>
      // </Popover>

      // <Select
      //   size={"small"}
      //   style={{ width: 70 }}
      //   placeholder={"font-size"}
      //   className={"item-tool"}
      //   value={state.fontSize}
      //   onChange={handleChangeFontSize}
      // >
      //   {Object.keys(fontSizes).map((item) => (
      //     <Select.Option key={item} value={item}>
      //       {fontSizes[item]}
      //       {" pt"}
      //     </Select.Option>
      //   ))}
      // </Select>
    );
  };
  const renderButtonBold = () => {
    return (
      <AntButton
        icon={<BoldOutlined />}
        size={"small"}
        onClick={command.bold}
        className={"item-tool"}
      />
    );
  };
  const renderButtonItalic = () => {
    return (
      <AntButton
        icon={<ItalicOutlined />}
        size={"small"}
        onClick={command.italic}
        className={"item-tool"}
      />
    );
  };
  const renderButtonUnderline = () => {
    return (
      <AntButton
        icon={<UnderlineOutlined />}
        size={"small"}
        onClick={command.underline}
        className={"item-tool"}
      />
    );
  };
  const renderButtonPrint = () => {
    return (
      <AntButton
        icon={<PrinterOutlined />}
        size={"small"}
        onClick={onPrintForm}
        className={"item-tool btn-print"}
      >
        <label>In</label>
      </AntButton>
    );
  };
  const renderButtonDowload = () => {
    return (
      <AntButton
        size={"small"}
        onClick={onDownload}
        icon={<DownloadOutlined />}
        className={"item-tool btn-print"}
      >
        <label>Tải file</label>
      </AntButton>
    );
  };
  // const renderButtonPrintMultiForms = () => {
  //   return (
  //     !props.previewMode && (
  //       <Popover
  //         trigger="click"
  //         placement="bottom"
  //         onVisibleChange={(state) => {
  //           setState({
  //             isVisible: state,
  //           });
  //         }}
  //         content={
  //           <ListForm
  //             patientDocument={patientDocument}
  //             fileOnShow={fileOnShow}
  //             isVisible={state.isVisible}
  //           />
  //         }
  //       >
  //         {/* <AntButton size={"small"} className={"item-tool  btn-print"}>
  //           <IconMultiPrint /> <label>In nhiều phiếu</label>
  //         </AntButton> */}
  //       </Popover>
  //     )
  //   );
  // };
  const onShowConfigForm = () => {
    // if (["emr", "form"].includes(file?.type)) {
    window.open("/editor/config/" + fileOnShow?.id);
    // }
  };
  const renderConfigForm = () => {
    // if (state.isAdmin && fileOnShow && !isEmpty(fileOnShow))
    return (
      <AntButton
        icon={<SettingOutlined />}
        size={"small"}
        className={"item-tool btn-print"}
        onClick={onShowConfigForm}
      >
        <label>Config form</label>
      </AntButton>
    );
  };
  const renderZoomTool = () => {
    return (
      <div className={"zoom-tool"}>
        <span>{"Zoom"}</span>
        <Slider
          className={"slider-tool"}
          onChange={handleChangeZoom}
          value={zoomValue}
        />
        <Input
          style={{ marginLeft: 6, width: 66 }}
          value={zoomValue}
          size={"small"}
          suffix={"%"}
          onChange={(e) => {
            handleChangeZoom(e.target.value);
          }}
        />
      </div>
    );
  };
  // const renderButtonDelete = () => {
  //   return (
  //     <AntButton
  //       icon={"delete"}
  //       size={"small"}
  //       className={"item-tool btn-print"}
  //       onClick={onDeleteData}
  //     >
  //       <label>Xóa dữ liệu</label>
  //     </AntButton>
  //   );
  // };
  // const isShowChangeNameDocument = () => {
  //   if (
  //     process.env.REACT_APP_SHOW_CHANGE_NAME_DOCUMENT === "true" &&
  //     fileOnShow?.taoNhieuMau &&
  //     fileOnShow?.bieuMau?.editor &&
  //     fileOnShow?.formId
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const renderActionAntButton = () => {
    return (
      fileOnShow &&
      !isPreview && (
        <div className={"file-system-tool"}>
          {/* {(fileOnShow?.formValue === "BA049" ||
            fileOnShow?.maBieuMau === "BA049") && (
            <AntButton
              size={"small"}
              icon={"file-text"}
              type={"primary"}
              className={"item-tool text-btn"}
              onClick={exportXml}
            >
              {"Xuất HL7"}
            </AntButton>
          )} */}
          {/* {isShowChangeNameDocument() && (
            <AntButton
              size={"small"}
              icon={"edit"}
              type={"primary"}
              className={"item-tool text-btn"}
              // loading={state.isSigning}
              onClick={onChangeNameDocument}
            >
              {"Đổi tên phiếu"}
            </AntButton>
          )} */}
          {/* {process.env.REACT_APP_HIDE_SIGNER === "false" && (
            <>
              <AntButton
                size={"small"}
                icon={"file-done"}
                type={"primary"}
                className={"item-tool text-btn btn-quick-sign"}
                loading={state.isSigningDigital}
                onClick={onSign}
                disabled={
                  refFileSigned.current?.trangThai === 0 ||
                  !fileOnShow.maBieuMau
                }
              >
                {"Ký số/ Ký điện tử"}
              </AntButton>
              <AntButton
                size={"small"}
                icon={"file-done"}
                type={"primary"}
                className={"item-tool text-btn"}
                loading={state.isSigning}
                onClick={onSignForm}
              >
                {"File ký"}
              </AntButton>
            </>
          )} */}
          {
            <Button
              type="primary"
              size={"small"}
              rightIcon={<SaveOutlined />}
              iconHeight={15}
              height={30}
              minWidth={120}
              loading={isSaveFormLoading}
              onClick={onClickSaveData}
              // type={"primary"}
              className={"item-tool text-btn"}
            >
              lưu
              {/* {fileOnShow?.sign &&
              !fileOnShow?.editMode &&
              savedId != fileOnShow?.nbHoSoBaId
                ? "Chỉnh sửa"
                : "Lưu"} */}
            </Button>
          }
        </div>
      )
    );
  };

  const renderStyleButtonTool = () => {
    return (
      <div className={"editor-tool"}>
        {windowWidth <= 450 ? (
          <>
            {renderButtonPrint()}
            {/* {renderButtonPrintMultiForms()} */}
            {renderConfigForm()}
            {renderButtonDowload()}
            <Popover
              placement="topRight"
              content={
                <PopupTool>
                  {renderSelectFontSize()}
                  {renderButtonBold()}
                  {renderButtonItalic()}
                  {renderButtonUnderline()}
                </PopupTool>
              }
              trigger="click"
              style={{ alignItems: "flex-end" }}
            >
              <div
                style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}
              >
                <AntButton
                  icon={<MoreOutlined />}
                  size={"small"}
                  className={"item-tool"}
                />
              </div>
            </Popover>
          </>
        ) : (
          <>
            {renderSelectFontSize()}
            {renderButtonBold()}
            {renderButtonItalic()}
            {renderButtonUnderline()}
            {renderButtonPrint()}
            {/* {renderButtonPrintMultiForms()} */}
            {renderConfigForm()}
            {renderButtonDowload()}
          </>
        )}
      </div>
    );
  };

  const content = () => {
    const handleSelectTemplate = (template) => {
      setState({
        bieuMauTemplate: template,
      });
    };
    const handleEditTemplate = (item) => {
      window.open(
        `/editor/template/${item?.baoCaoId || file?.id}?templateId=${item?.id}`
      );
    };
    const handleDeleteTemplate = (item) => {
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("editor.xacNhanXoaMauBieuMau")} ${item?.ten}?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          deleteTemplateBieuMua({ api: file?.api, id: item.id }).then((s) => {
            console.log("success");
          });
        }
      );
    };
    const handleClick = (type) => () => {
      switch (type) {
        case 1:
          if (!state.bieuMauTemplate) {
            message.error(t("editor.vuiLongChonDuLieuMau"));
            return;
          }
          let bieuMauTemplateClone = cloneDeep(state.bieuMauTemplate);
          let fileDataClone = cloneDeep(fileData);
          Object.keys(bieuMauTemplateClone).forEach((key) => {
            if (!bieuMauTemplateClone[key] || key === "id") {
              delete bieuMauTemplateClone[key];
            }
          });
          Object.keys(bieuMauTemplateClone).forEach((key) => {
            fileDataClone[key] = bieuMauTemplateClone[key];
          });
          updateFileData({
            fileData: fileDataClone,
          });
          break;
        case 2:
          if (!state.bieuMauTemplate) {
            message.error(t("editor.vuiLongChonDuLieuMau"));
            return;
          }
          let bieuMauTemplate = cloneDeep(state.bieuMauTemplate);
          const refValuesClone = cloneDeep(refValues.current);
          Object.keys(refValuesClone).forEach((key) => {
            if (!refValuesClone[key] && bieuMauTemplate[key]) {
              refValuesClone[key] = bieuMauTemplate[key];
            }
          });
          updateFileData({
            fileData: refValuesClone,
          });
          break;
        case 3:
          setState({
            bieuMauTemplate: null,
          });
          break;
        default:
          break;
      }
    };
    return (
      <div className="box">
        <div className="name-bieu-mau">{file?.ten}</div>
        <div className="list-template">
          {listTemplate.map((item, index) => {
            return (
              <div className="template" key={index}>
                <div
                  className="name"
                  onClick={() => handleSelectTemplate(item)}
                >
                  {item?.ten}
                </div>
                <div className="action-item">
                  <span className="edit">
                    <Button
                      width={100}
                      height={30}
                      style={{ zIndex: 100 }}
                      onClick={() => handleEditTemplate(item)}
                    >
                      {t("common.sua")}
                    </Button>
                  </span>
                  <span className="delete" style={{ zIndex: 100 }}>
                    <Button
                      height={30}
                      type="error"
                      onClick={() => handleDeleteTemplate(item)}
                    >
                      {t("common.xoa")}
                    </Button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Row className="action" gutter={10}>
          <Col span={6}>
            <Button style={{ width: "100%" }} onClick={handleClick(3)}>
              {t("common.huy")}
            </Button>
          </Col>
          <Col span={8}>
            <Button style={{ width: "100%" }} onClick={handleClick(1)}>
              {t("editor.apToanBoBieuMau")}
            </Button>
          </Col>
          <Col span={10}>
            <Button style={{ width: "100%" }} onClick={handleClick(2)}>
              {t("editor.apNhungTruongChuaCoNoiDung")}
            </Button>
          </Col>
          {/* <Col span={16}>
            <Button style={{ width: "100%" }} onClick={handleClick(4)}>
              {t("editor.chiApNhungTruongTrenMau")}
            </Button>
          </Col> */}
        </Row>
      </div>
    );
  };
  const renderOptionRight = () => {
    const createTemplate = () => {
      if (file?.id) {
        window.open(`/editor/template/${file?.id}`);
      }
    };
    return (
      <div className="editor-tool-right">
        <div className="title">{t("editor.mauNoiDung")}</div>
        <div>
          <Popover
            overlayClassName="popover-template"
            style={{ width: "400px" }}
            placement="bottomRight"
            content={content}
          >
            <Button iconHeight={15} height={30} width={150}>
              <div>
                {state.bieuMauTemplate
                  ? state.bieuMauTemplate?.ten
                  : t("editor.chonDuLieuMau")}
              </div>
            </Button>
          </Popover>
        </div>
        <Button
          type="primary"
          size={"small"}
          height={30}
          minWidth={120}
          onClick={createTemplate}
          className={"item-tool text-btn"}
        >
          {t("editor.taoMauMoi")}
        </Button>
      </div>
    );
  };
  return (
    <Main>
      <GlobalStyle />
      <div className="toolbar">
        {windowWidth >= 650 ? (
          <div style={{ display: "flex" }}>
            <div
              className={"toolbar-left"}
              style={{ borderRightWidth: 0, width: "100%" }}
            >
              <div style={{ display: "flex" }}>
                {renderZoomTool()}
                {renderActionAntButton()}
              </div>
            </div>
          </div>
        ) : (
          <>
            {renderActionAntButton()}
            {renderZoomTool()}
          </>
        )}

        <div className={"toolbarStyle1"}>
          <div style={{ marginTop: 0, width: "100%", display: "flex" }}>
            {renderStyleButtonTool()}
            {!isPreview && !isTemplate && renderOptionRight()}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default memo(Toolbar);
