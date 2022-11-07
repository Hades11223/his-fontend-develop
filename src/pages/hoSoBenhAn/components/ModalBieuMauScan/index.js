import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { ModalTemplate, Select } from "components";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "pages/kho/components/Button";
import FormWraper from "components/FormWraper";
import {
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Upload,
} from "antd";
import uploadImg from "assets/images/his-core/import.png";
import IcAddImage from "assets/svg/hoSoBenhAn/ic-add-image.svg";
import { Main } from "./styled";
import { useCamera, useStore } from "hook";
import IcSave from "assets/svg/ic-save.svg";
import IcDelete from "assets/svg/ic-delete.svg";
import IconSucces from "assets/svg/hoSoBenhAn/ic-success.svg";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import { ENUM, HOTKEY } from "constants/index";
import moment from "moment";
import fileUtils from "utils/file-utils";
import { firstLetterWordUpperCase } from "utils";
const ModalBieuMauScan = (props, ref) => {
  const { onShowCamera } = useCamera();
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
    title: "themMoi",
    type: 2,
    fileList: [],
    isLoading: false,
  });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  const refFileDelete = useRef([]);
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan", {});

  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refDsDuongDan = useRef([]);
  const refModalScan = useRef();
  const {
    hoSoBenhAn: { uploadMultilImage, uploadScan },
    baoCao: { onSearch },
  } = useDispatch();

  const {
    hoSoBenhAn: { listPhieuScan = [] },
  } = useSelector((state) => state);

  useImperativeHandle(ref, () => ({
    show: async ({ refModalScanPrint = {}, item = {} }, callBack) => {
      let file = [];
      if (item.id) {
        file = item.dsDuongDan.map((item) => {
          let name = item.split("/");
          name = name[name.length - 1];
          return fileUtils.urltoFile(
            fileUtils.absoluteFileUrl(item),
            `${name}`,
            "application/pdf"
          );
        });
        refDsDuongDan.current = item.dsDuongDan;
        file = await Promise.all(file);
      }
      refModalScan.current = refModalScanPrint;
      setState({
        item,
        id: item?.id,
        isEdit: !!item,
        show: true,
        title: item.id ? "chinhSua" : "themMoi",
        fileList: file,
      });
      try {
        form.setFieldsValue({
          baoCaoId: item?.baoCaoId ? item.baoCaoId : null,
          thoiGianCoKetQua: item?.thoiGianCoKetQua
            ? moment(item.thoiGianCoKetQua)
            : moment(new Date()),
          moTa: item ? item.moTa : null,
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  }));
  const onOk = (isOk, isSave) => async () => {
    if (isOk) {
      if (state.fileList.length) {
        form.validateFields().then(async (values) => {
          try {
            if (
              new Date(values.thoiGianCoKetQua).getTime() <
              new Date(thongTinBenhNhan.thoiGianVaoVien).getTime()
            ) {
              message.error(t("hsba.ngayThucHienPhaiLonHonNgayDangKy"));
              return;
            }
            setState({ isLoading: true });
            const data = await uploadScan({
              id: state.id,
              isPdf: state.type === 1 ? false : true,
              nbDotDieuTriId: thongTinBenhNhan.id,
              baoCaoId: values.baoCaoId,
              thoiGianKetQua: moment(values.thoiGianCoKetQua).format(),
              file: !state.id
                ? state.fileList
                : state.fileList.filter((item) => {
                    return !refDsDuongDan.current.some((item2) => {
                      return item2.includes(item.name);
                    });
                  }),
              moTa: values.moTa || "",
              duongDanXoa: refFileDelete.current,
            });
            resetForm(isSave);
            if (isSave) {
              refModalScan.current &&
                refModalScan.current.show(data.dsDuongDan);
              setState({
                isLoading: false,
                show: false,
              });
            } else {
              setState({ isLoading: false });
            }
          } catch (error) {
            setState({ isLoading: false });
          }
        });
      } else {
        message.error("Vui lòng chọn file scan");
      }
    } else {
      setState({ show: false });
    }
  };
  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOk(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOk(true)();
      },
    },
  ];
  useEffect(() => {
    if (state.show) {
      refModal.current.show();
    } else {
      form.setFieldsValue({
        baoCaoId: null,
        thoiGianThucHien: null,
      });
      setState({
        baoCaoId: null,
        thoiGianThucHien: null,
      });
      refModal.current.hide();
      refFileDelete.current = [];
    }
  }, [state.show]);

  const onChange = (key) => (e) => {
    if (e?.target?.value) {
      setState({
        [key]: e.target.value,
        fileList: [],
      });
    } else {
      setState({
        [key]: e,
      });
    }
  };
  const onChangeDate = (date) => {
    setState({
      thoiGianThucHien: date,
    });
  };
  const resetForm = (isSave) => {
    if (!isSave) {
      form.setFieldsValue({
        baoCaoId: null,
        thoiGianCoKetQua: moment(new Date()),
        moTa: "",
      });
      setState({
        fileList: [],
        id: null,
        title: "themMoi",
        item: null,
      });
    }
  };
  const showCamera = (e) => {
    onShowCamera(
      { title: t("common.chupAnh") },
      async (file, base64) => {
        setState({
          fileList: [...state.fileList, file],
        });
        return base64;
      },
      (image) => {
        // setState({
        //   imgSrc: image,
        // });
      }
    );
  };
  const removeFile = (file) => () => {
    const indexDelete = refDsDuongDan.current.findIndex((item) => {
      return item.includes(file.name);
    });
    if (indexDelete !== -1) {
      refFileDelete.current = [
        ...refFileDelete.current,
        refDsDuongDan.current[indexDelete],
      ];
    }
    const fileList = state.fileList.filter((item) => item.uid !== file.uid);
    setState({
      fileList,
    });
  };
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOk(false)}
      title={t(`hsba.${state.title}`)}
      rightTitle={
        <span style={{ marginRight: "10px" }}>
          <span className="normal-weight">
            {firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)}{" "}
          </span>{" "}
          -{" "}
          {thongTinBenhNhan?.tuoi && (
            <span className="normal-weight">
              {thongTinBenhNhan?.tuoi} {t("common.tuoi")}
            </span>
          )}
        </span>
      }
      hotKeys={hotKeys}
      width={900}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
        >
          {t("common.quayLai")} [ESC]
        </Button.Text>
      }
      actionRight={
        <>
          <Button
            minWidth={100}
            onClick={onOk(true)}
            rightIcon={<IconSucces></IconSucces>}
          >
            <span> {t("hsba.luuVaThemMoi")}</span>
          </Button>
          <Button
            type="primary"
            minWidth={100}
            onClick={onOk(true, true)}
            rightIcon={<IcSave></IcSave>}
            loading={state.isLoading}
          >
            <span> {t("common.luu")}</span>
          </Button>
        </>
      }
    >
      <Main>
        <FormWraper
          form={form}
          style={{ width: "100%" }}
          labelAlign={"left"}
          layout="vertical"
        >
          <Row gutter={10}>
            <Col span={24} className="thong-tin-benh-nhan">
              Mã hồ sơ : {thongTinBenhNhan.maHoSo}, ngày đăng ký :{" "}
              {thongTinBenhNhan.thoiGianVaoVien
                ? moment(thongTinBenhNhan.thoiGianVaoVien).format(
                    "DD/MM/YYYY hh:mm:ss"
                  )
                : ""}{" "}
            </Col>
            <Col span={24}>
              <Form.Item
                label={t("hsba.tenBieuMau")}
                name="baoCaoId"
                rules={[
                  {
                    required: !state.id ? true : false,
                    message: "Vui lòng chọn biểu mẫu !",
                  },
                ]}
              >
                {state?.item?.id ? (
                  <span>{state.item.tenBaoCao}</span>
                ) : (
                  <Select
                    disabled={state.id ? true : false}
                    data={listPhieuScan}
                    // value={state.baoCaoId || ""}
                    onChange={onChange("baoCaoId")}
                    placeholder={t("hsba.tenBieuMau")}
                  ></Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("hsba.thoiGianThucHien")}
                name="thoiGianCoKetQua"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian thực hiện !",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  // value={state.thoiGianThucHien || new Date()}
                  placeholder={t("hsba.chonNgay")}
                  format="DD/MM/YYYY HH:mm:ss"
                  style={{ width: "100%" }}
                  onChange={onChangeDate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("hsba.ghiChu")} name="moTa">
                <Input.TextArea rows={1} />
              </Form.Item>
            </Col>
          </Row>
        </FormWraper>
        <div className="action">
          <Button
            rightIcon={<IcAddImage className="ic-chup-anh"></IcAddImage>}
            onClick={showCamera}
          >
            {t("common.chupAnh")}
          </Button>
          <Upload
            multiple={true}
            showUploadList={false}
            fileList={state.fileList}
            customRequest={({ onSuccess, onError, file }) => {
              onSuccess(null, {});
              setState({
                fileList: [...state.fileList, file],
              });
            }}
            accept=".png,.jpg,.jpeg,.bmp,.pdf"
          >
            <div className="action"></div>
            <Button
              rightIcon={
                <img
                  src={uploadImg}
                  alt="importImg"
                  style={{ marginRight: 10, maxHeight: "unset" }}
                />
              }
            >
              {t("hsba.taiTepCoSan")}
            </Button>
          </Upload>
        </div>
        {state.fileList.map((item, index) => {
          return (
            <div className="file-info" key={index}>
              {<span style={{ marginRight: 5 }}>File: </span>}
              <span className="file-name">{item.name}</span>
              <IcDelete
                className="remove"
                style={{ fill: "red" }}
                onClick={removeFile(item)}
              />
            </div>
          );
        })}
      </Main>
    </ModalTemplate>
  );
};
//
export default forwardRef(ModalBieuMauScan);
