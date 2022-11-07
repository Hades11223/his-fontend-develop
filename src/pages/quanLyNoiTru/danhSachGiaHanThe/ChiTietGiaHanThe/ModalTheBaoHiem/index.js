import { Checkbox, Col, Form, Input, message, Row } from "antd";
import {
  Button,
  DateTimePicker,
  ModalTemplate,
  Select,
  LazyLoad,
  InputTimeout,
} from "components";
import useStore from "hook/useStore";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { hexToUtf8 } from "utils";
import { refConfirm } from "app";
import { useLoading } from "hook";
import IconSave from "assets/images/thuNgan/icSave.png";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";

const format = "DD/MM/YYYY";
const ModalTheBaoHiem = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const [state, _setState] = useState({ show: false });
  const listAllBenhVien = useStore("benhVien.listAllBenhVien", []);
  const listAllTheBaoHiem = useStore("theBaoHiem.listAllTheBaoHiem", []);
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const auth = useStore("auth.auth", {});

  const {
    benhVien: { getListAllBenhVien },
    theBaoHiem: { getListAllTheBaoHiem },
    giaHanTheChuyenDoiTuong: {
      giamDinhThe,
      updateData,
      createOrEditAssurance,
      getDanhSachThe,
    },
  } = useDispatch();

  const { onUpdate, getById } = useDispatch().nbDotDieuTri;

  const [listkhuVucBHYT] = useEnum(ENUM.KHU_VUC_BHYT);
  const refModalCheckBaoHiem = useRef(null);
  const { hideLoading, showLoading } = useLoading();

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ show: true, data: data });
      let info = {};
      if (data?.tenNb) {
        info = {
          ...data,
          tuNgay: data?.tuNgay && moment(data?.tuNgay),
          tuNgayApDung: data?.tuNgayApDung && moment(data?.tuNgayApDung),
          tuNgayMienCungChiTra:
            data?.tuNgayMienCungChiTra && moment(data?.tuNgayMienCungChiTra),
          denNgay: data?.denNgay && moment(data?.denNgay),
          denNgayApDung: data?.denNgayApDung && moment(data?.denNgayApDung),
          denNgayMienCungChiTra:
            data?.denNgayMienCungChiTra && moment(data?.denNgayMienCungChiTra),
          thoiGianDu5Nam: data?.thoiGianDu5Nam && moment(data?.thoiGianDu5Nam),
        };
      } else {
        info = { tenNb: infoPatient?.tenNb };
      }
      form.setFieldsValue(info);
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      getListAllBenhVien({ page: "", size: "" });
      getListAllTheBaoHiem({ page: "", size: "" });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onBlurMaTheBaoHiem = (e) => {
    const value = e.target.value;
    if (
      value.length === 10 ||
      value.length === 15 //và mã thẻ 10 hoặc 15 ký tự thì check cổng
    ) {
      checkMaTheBhyt(value.toUpperCase(), "maThe");
    }
  };

  const onCheckCardInsurance = (data, item, checkCong) => {
    onGiamDinhThe({ data, tenNb: item?.tenNb, diaChi: item?.diaChi });
  };
  const onGiamDinhThe = ({ data, tenNb, diaChi }) => {
    const { ngaySinh } = data;
    data.ngaySinh = ngaySinh && moment(ngaySinh)?.format("YYYY-MM-DD"); // sửa vấn đề gửi bị lùi 1 ngày
    showLoading();
    giamDinhThe(data)
      .then((data) => {
        hideLoading();
        updateData({ theBaoHiem: data?.data });
        refModalCheckBaoHiem.current.show(
          {
            show: true,
            data: data,
            hoTen: tenNb,
            diaChi: diaChi,
          },
          (item) => {
            if (item?.hoTen) {
              let gtTheTu = item?.gtTheTu && item?.gtTheTu.split("/");
              let gtTheDen = item?.gtTheDen && item?.gtTheDen.split("/");
              const newState = {
                tuNgay:
                  gtTheTu?.length === 3 &&
                  moment(`${gtTheTu[2]}/${gtTheTu[1]}/${gtTheTu[0]}`),
                denNgay:
                  gtTheDen?.length === 3 &&
                  moment(`${gtTheDen[2]}/${gtTheDen[1]}/${gtTheDen[0]}`),
                tuNgayApDung:
                  gtTheTu?.length === 3 &&
                  moment(`${gtTheTu[2]}/${gtTheTu[1]}/${gtTheTu[0]}`),
                denNgayApDung:
                  gtTheDen?.length === 3 &&
                  moment(`${gtTheDen[2]}/${gtTheDen[1]}/${gtTheDen[0]}`),
                noiDangKyId: item?.noiDangKy?.id,
                noiDangKy: item?.noiDangKy,
                maThe: item?.maThe,
                thoiGianDu5Nam: item?.thoiGianDu5Nam
                  ? moment(item?.thoiGianDu5Nam)
                  : "",
                noiGioiThieuId: item?.noiGioiThieuId,
                diaChi: item?.diaChi,
              };
              form.setFieldsValue(newState);
            }
          }
        );
      })
      .catch((e) => {
        updateData({ verifingCongBaoHiem: false });
        hideLoading();
      });
  };
  const checkMaTheBhyt = (value, variables, nameDetail) => {
    onGiamDinhThe({
      data: {
        hoTen: infoPatient?.tenNb || "",
        maThe: infoPatient?.maTheBhyt || "",
        ngaySinh: moment(infoPatient?.ngaySinh) || "",
        [variables]: value,
      },
      tenNb: infoPatient?.tenNb || "",
      diaChi: "",
    });
  };

  const onSearchMaThe = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      const data = e.target.value;
      if (data) {
        if (data.indexOf("$") == data.length - 1) {
          searchMaThe(data);
        }
      }
    }
  };

  const searchMaThe = (value = "") => {
    let array = value.split("|");
    let day = array[2]?.split("/") || [];
    let dayLate = `${day[2]}/${day[1]}/${day[0]}`;
    let date = {
      str: array[2],
      date: new Date(moment(new Date(dayLate)).format("YYYY-MM-DD")),
    };
    let day5nam = (array[12] && array[12].split("/")) || [];
    let ten = hexToUtf8(array[1]);
    let mucHuong = array[0]?.substr(0, 3);
    let dataCheck = listAllTheBaoHiem?.find(
      (item) => item?.ma?.toLowerCase() === mucHuong.toLowerCase()
    );
    let info = {
      maThe: array[0],
      tenNb: ten,
      ngaySinh: date,
      gioiTinh: array[3] && Number(array[3]),
      doiTuong: 2,
      mucHuong: dataCheck?.mucHuong,
      thoiGianDu5Nam: moment(`${day5nam[2]}/${day5nam[1]}/${day5nam[0]}`),
    };
    form.setFieldsValue(info);
    if (ten && ten.length && date?.date) {
      onCheckCardInsurance(
        {
          hoTen: ten,
          maThe: array[0],
          ngaySinh: date?.date,
        },
        { ten }
      );
    }
  };

  const onCancel = () => {
    setState({ show: false });
    form.resetFields();
  };

  const onSubmit = () => {
    form.submit();
  };
  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      nbDotDieuTriId: infoPatient?.id,
      loaiDoiTuongId: infoPatient?.loaiDoiTuongId,
      tuNgay: values?.tuNgay && moment(values?.tuNgay).format("YYYY-MM-DD"),
      tuNgayApDung:
        values?.tuNgayApDung &&
        moment(values?.tuNgayApDung).format("YYYY-MM-DD"),
      tuNgayMienCungChiTra:
        values?.tuNgayMienCungChiTra &&
        moment(values?.tuNgayMienCungChiTra).format("YYYY-MM-DD"),
      denNgay: values?.denNgay && moment(values?.denNgay).format("YYYY-MM-DD"),
      denNgayApDung:
        values?.denNgayApDung &&
        moment(values?.denNgayApDung).format("YYYY-MM-DD"),
      denNgayMienCungChiTra:
        values?.denNgayMienCungChiTra &&
        moment(values?.denNgayMienCungChiTra).format("YYYY-MM-DD"),
      thoiGianDu5Nam:
        values?.thoiGianDu5Nam &&
        moment(values?.thoiGianDu5Nam).format("YYYY-MM-DD"),
      maThe: values.maThe.toUpperCase(),
      id: state?.data?.id,
    };
    const getTenNb = (tenNb = "") => {
      return tenNb.split(" ").pop().toLowerCase();
    };
    const tenBanDau = infoPatient?.tenNb;
    if (tenBanDau && getTenNb(values?.tenNb) !== getTenNb(tenBanDau)) {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("common.thongBao"),
            content: `${t("tiepDon.xacNhanDoiTenNguoiBenh")
              .replace("{0}", tenBanDau)
              .replace("{1}", values?.tenNb?.toUpperCase())}`,
            cancelText: t("common.huy"),
            okText: t("common.dongY"),
            showImg: true,
            showBtnOk: true,
          },
          () => {
            createOrEditAssurance(payload).then((s) => {
              getDanhSachThe({ nbDotDieuTriId: infoPatient?.id });
              onUpdate({
                tenNb: payload?.tenNb,
                id: infoPatient?.id,
              }).then(() => {
                getById(infoPatient?.id);
              });
              onCancel();
              if (state?.data?.id === s?.data.id) {
                message.success(t("common.capNhatThanhCong"));
              } else {
                message.success(t("common.themMoiThanhCongDuLieu"));
              }
            });
          }
        );
    } else {
      createOrEditAssurance(payload).then((s) => {
        getDanhSachThe({ nbDotDieuTriId: infoPatient?.id });
        onCancel();
        if (state?.data?.id === s?.data.id) {
          message.success(t("common.capNhatThanhCong"));
        } else {
          message.success(t("common.themMoiThanhCongDuLieu"));
        }
      });
    }
  };
  const onChangeThongTinBH = (e) => {
    if (/^[a-zA-Z0-9]+$/i.test(e)) {
      const mucHuong = listAllTheBaoHiem?.find(
        (item) => item?.ma?.toLowerCase() === e?.substr(0, 3).toLowerCase()
      )?.mucHuong;
      form.setFieldsValue({ mucHuong: mucHuong });
    }
  };
  const onChangeFieldsDate = (key) => (e) => {
    if (key === "tuNgay") {
      form.setFieldsValue({ tuNgayApDung: e });
    }
    if (key === "denNgay") {
      form.setFieldsValue({ denNgayApDung: e });
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      width={600}
      title={
        state?.data?.id
          ? t("quanLyNoiTru.giaHanThe.capNhatTheBaoHiem")
          : t("quanLyNoiTru.giaHanThe.themMoiTheBaoHiem")
      }
      onCancel={onCancel}
      closable={false}
      actionLeft={
        <Button.Text
          type="primary"
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          iconHeight={25}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.luu")} [F4]
        </Button>
      }
    >
      <Main>
        <Form
          layout="vertical"
          form={form}
          className="form-custom"
          onFinish={onHandleSubmit}
        >
          <Col>
            <Form.Item
              label={t("quanLyNoiTru.giaHanThe.quetTheBaoHiem")}
              name="quetThe"
            >
              <Input
                placeholder={t("quanLyNoiTru.giaHanThe.quetMaQrTheBaoHiem")}
                onKeyDown={onSearchMaThe}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label={t("common.tenNb")} name="tenNb">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Row>
            <Col span={12}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.soBaoHiem")}
                name="maThe"
                rules={[
                  {
                    required: true,
                    message: t(
                      "quanLyNoiTru.giaHanThe.vuiLongNhapSoTheBaoHiem"
                    ),
                  },
                  {
                    max: 15,
                    message: t(
                      "quanLyNoiTru.giaHanThe.soTheBaoHiemVuotQua15KyTu"
                    ),
                  },
                ]}
              >
                <InputTimeout
                  onBlur={onBlurMaTheBaoHiem}
                  placeholder={t("quanLyNoiTru.giaHanThe.nhapSoThe")}
                  onChange={onChangeThongTinBH}
                  style={{ textTransform: "uppercase" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.mucHuong")}
                name="mucHuong"
                rules={[
                  {
                    required: true,
                    message: t("quanLyNoiTru.giaHanThe.vuiLongNhapMucHuong"),
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.baoHiemTuNgay")}
                name="tuNgay"
                rules={[
                  {
                    required: true,
                    message: t(
                      "quanLyNoiTru.giaHanThe.vuiLongNhapBaoHiemTuNgay"
                    ),
                  },
                ]}
              >
                <DateTimePicker
                  showTime={false}
                  format={format}
                  placeholder={t("common.chonNgay")}
                  onChange={onChangeFieldsDate("tuNgay")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.baoHiemDenNgay")}
                name="denNgay"
                rules={[
                  {
                    required: true,
                    message: t(
                      "quanLyNoiTru.giaHanThe.vuiLongNhapBaoHiemDenNgay"
                    ),
                  },
                ]}
              >
                <DateTimePicker
                  showTime={false}
                  format={format}
                  placeholder={t("common.chonNgay")}
                  onChange={onChangeFieldsDate("denNgay")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.baoHiemApDungTuNgay")}
                name="tuNgayApDung"
                rules={[
                  {
                    required: true,
                    message: t(
                      "quanLyNoiTru.giaHanThe.vuiLongNhapBaoHiemApDungTuNgay"
                    ),
                  },
                ]}
              >
                <DateTimePicker
                  showTime={false}
                  format={format}
                  placeholder={t("common.chonNgay")}
                  disabledDate={(date) =>
                    moment(date).isBefore(form.getFieldValue("tuNgay"))
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.baoHiemApDungDenNgay")}
                name="denNgayApDung"
                rules={[
                  {
                    required: true,
                    message: t(
                      "quanLyNoiTru.giaHanThe.vuiLongNhapBaoHiemApDungTuNgay"
                    ),
                  },
                ]}
              >
                <DateTimePicker
                  showTime={false}
                  format={format}
                  placeholder={t("common.chonNgay")}
                  disabledDate={(date) =>
                    moment(date).isAfter(form.getFieldValue("denNgay"))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Col>
            <Row>
              <Col span={12}>
                <Form.Item
                  label={t("quanLyNoiTru.giaHanThe.noiDangKy")}
                  name="noiDangKyId"
                  rules={[
                    {
                      required: true,
                      message: t("quanLyNoiTru.giaHanThe.vuiLongChonNoiDangKy"),
                    },
                    () => ({
                      validator(rule, value) {
                        if (
                          auth?.benhVien?.id !== value &&
                          !infoPatient?.noiTru
                        ) {
                          setState({ checkNoiGioiThieu: true });
                          return Promise.resolve();
                        } else {
                          setState({ checkNoiGioiThieu: false });
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                >
                  <Select
                    data={listAllBenhVien}
                    placeholder={t("quanLyNoiTru.giaHanThe.chonNoiDangKy")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("quanLyNoiTru.giaHanThe.noiGioiThieu")}
                  name="noiGioiThieuId"
                  rules={[
                    {
                      required: state?.checkNoiGioiThieu,
                      message: t("quanLyNoiTru.giaHanThe.vuiLongChonNoiDangKy"),
                    },
                  ]}
                >
                  <Select
                    data={listAllBenhVien}
                    placeholder={t("quanLyNoiTru.giaHanThe.chonNoiGioiThieu")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Row>
            <Col span={8}>
              <Form.Item
                label={t("tiepDon.thoiGianDu5NamLienTuc")}
                name="thoiGianDu5Nam"
              >
                <DateTimePicker
                  showTime={false}
                  format={format}
                  placeholder={t("common.chonNgay")}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.mienCttCungNgay")}
                name="tuNgayMienCungChiTra"
              >
                <DateTimePicker
                  showTime={false}
                  format={format}
                  placeholder={t("common.chonNgay")}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.mienCttDenNgay")}
                name="denNgayMienCungChiTra"
              >
                <DateTimePicker
                  showTime={false}
                  format={format}
                  placeholder={t("common.chonNgay")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.diaChiTheBHYT")}
                name="diaChi"
              >
                <Input placeholder={t("common.nhapDiaChi")} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t("quanLyNoiTru.giaHanThe.maKhuVuc")}
                name="khuVuc"
              >
                <Select data={listkhuVucBHYT} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item valuePropName="checked" name="ktc">
                <Checkbox> {t("quanLyNoiTru.giaHanThe.100Ktc")}</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Main>
      <LazyLoad
        component={import(
          "pages/tiepDon/components/ThongTinTiepDon/ModalCheckBaoHiem"
        )}
        ref={refModalCheckBaoHiem}
      />
    </ModalTemplate>
  );
};

export default forwardRef(ModalTheBaoHiem);
