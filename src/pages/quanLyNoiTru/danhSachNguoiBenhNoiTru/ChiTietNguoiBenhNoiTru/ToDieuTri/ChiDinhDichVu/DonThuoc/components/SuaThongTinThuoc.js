import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { DatePicker, Input, message, Row, Checkbox, Form, Col } from "antd";
import Button from "pages/kho/components/Button";
import { MainModal } from "../styled";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import ModalThemLieuDung from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ToDieuTri/ChiDinhDichVu/DonThuoc/ModalThemLieuDung";
import moment from "moment";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { DateTimePicker } from "components";

const { RangePicker } = DatePicker;

const SuaThongTinThuoc = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
    data: [],
  });
  const [form] = Form.useForm();
  const refCallback = useRef(null);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { chiDinhTuLoaiDichVu, dataNb, isReadonly = false } = props;
  const refPopupThemLieuDung = useRef(null);
  const refModal = useRef(null);
  const {
    lieuDungThuoc: { createOrEdit: createOrEditLieuDungThuoc },
    mucDichSuDung: { onSearch },
    chiDinhDichVuThuoc: { chinhSuaChiDinhDichVuKho, getListDichVuThuoc },
    lieuDung: { createOrEdit: createOrEditLieuDung, _getListTongHop },
  } = useDispatch();

  const listDataLieuDung = useStore("lieuDung._listDataTongHop", []);
  const listMucDichSuDung = useStore("mucDichSuDung.listMucDichSuDung", []);
  const [listDonViTocDoTruyen] = useEnum(ENUM.DON_VI_TOC_DO_TRUYEN);

  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);

  useImperativeHandle(ref, () => ({
    show: async (options = {}, callback) => {
      const { data } = options;
      const item = {
        ...data,
        ngayThucHien: [
          data?.ngayThucHienTu && moment(data?.ngayThucHienTu),
          data?.ngayThucHienDen && moment(data?.ngayThucHienDen),
        ],
        dienGiaiLieuDung: data?.tenDuongDung,
        thoiGianBatDau: data?.thoiGianBatDau && moment(data.thoiGianBatDau),
      };
      _getListTongHop({ bacSiId: nhanVienId, dichVuId: data.dichVuId });
      onSearch({ dataSearch: { dichVuId: data.dichVuId } });
      form.setFieldsValue(item);
      setState({ show: true, data: item });

      refCallback.current = callback;
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
      form.resetFields();
    }
  }, [state?.show]);

  const onCancel = () => {
    setState({ show: false });
    refModal.current && refModal.current.hide();
  };

  const onOK = (isOk) => () => {
    if (isOk) {
      form.submit();
    } else {
      setState({ show: false });
    }
  };

  const onHandleSubmit = (values) => {
    let payload = {
      id: state?.data?.id,
      nbDichVu: {
        ghiChu: values?.ghiChu,
        soLuong: values?.soLuong,
        tuTra: values?.tuTra,
        khongTinhTien: values?.khongTinhTien,
        mucDichId: values?.mucDichId,
      },
      lieuDungId: values?.lieuDungId,
      dotDung: values?.dotDung,
      ngayThucHienTu: moment(values?.ngayThucHien[0]).format("YYYY-MM-DD"),
      ngayThucHienDen: moment(values?.ngayThucHien[1]).format("YYYY-MM-DD"),
      tocDoTruyen: values?.tocDoTruyen,
      donViTocDoTruyen: values?.donViTocDoTruyen,
      soGiot: values?.soGiot,
      cachGio: values?.cachGio,
      thoiGianBatDau: moment(values?.thoiGianBatDau).format("YYYY-MM-DD"),
    };
    chinhSuaChiDinhDichVuKho([payload])
      .then((s) => {
        if (s?.code === 0) {
          if (dataNb) {
            getListDichVuThuoc({
              nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
              chiDinhTuDichVuId: dataNb?.id,
              chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
              dsTrangThaiHoan: [0, 10, 20],
            });
          }

          if (refCallback.current) refCallback.current();
          onCancel();
        } else {
          message.error(s?.[0]?.message || s?.message);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <ModalTemplate
      ref={refModal}
      title={t("khamBenh.donThuoc.thongTinThuoc")}
      onCancel={onCancel}
      width={800}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        !isReadonly && (
          <Button
            type="primary"
            minWidth={100}
            iconHeight={15}
            onClick={onOK(true)}
          >
            {t("common.luu")}
          </Button>
        )
      }
    >
      <fieldset disabled={isReadonly} style={{ width: "100%" }}>
        <MainModal>
          <Form form={form} layout="vertical" onFinish={onHandleSubmit}>
            <Row gutter={16}>
              <Col xs={12}>
                <Form.Item label={t("common.tenThuoc")} name="tenDichVu">
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label={t("quanLyNoiTru.toDieuTri.dienGiaiLieuDung")}
                  name="dienGiaiLieuDung"
                >
                  <Input disabled />
                </Form.Item>
                <Row gutter={8}>
                  <Col xs={12}>
                    <Form.Item
                      label={t("quanLyNoiTru.toDieuTri.tocDoTruyen")}
                      name="tocDoTruyen"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      label={t("quanLyNoiTru.toDieuTri.dvTocDoTruyen")}
                      name="donViTocDoTruyen"
                    >
                      <Select data={listDonViTocDoTruyen} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col xs={12}>
                    <Form.Item
                      label={t("quanLyNoiTru.toDieuTri.gioBatDau")}
                      name="thoiGianBatDau"
                    >
                      <DateTimePicker format="YYYY-MM-DD" showTime={false} />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      label={t("khamBenh.donThuoc.dotDung")}
                      name="dotDung"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label={t("common.luuY")} name="ghiChu">
                  <Input />
                </Form.Item>
                <Row gutter={8}>
                  <Col xs={12}>
                    <Form.Item name="tuTra" valuePropName="checked">
                      <Checkbox disabled={listMucDichSuDung.length}>
                        {t("common.tuTra")}{" "}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item name="khongTinhTien" valuePropName="checked">
                      <Checkbox disabled={listMucDichSuDung.length}>
                        {t("common.khongTinhTien")}{" "}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row gutter={8}>
                  <Col xs={12}>
                    <Form.Item
                      label={t("common.soLuong")}
                      name="soLuong"
                      rules={[
                        {
                          validator: (rules, value, callback) => {
                            if (value < 0) {
                              callback(
                                t("quanLyNoiTru.vuiLongNhapSoLuongLonHon0")
                              );
                            } else {
                              callback();
                            }
                          },
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      label={t("quanLyNoiTru.toDieuTri.dvt")}
                      name="tenDonViTinh"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label={t("quanLyNoiTru.toDieuTri.lieuDungCachDung")}
                  name="lieuDungId"
                >
                  <Select
                    data={listDataLieuDung}
                    onSearch={(value) =>
                      setState({ searchLieuDungWord: value || "" })
                    }
                    disabled={isReadonly}
                    notFoundContent={
                      <div>
                        <div style={{ color: "#7A869A", textAlign: "center" }}>
                          <small>{t("common.khongCoDuLieuPhuHop")}</small>
                        </div>
                        <Row justify="center">
                          <Button
                            trigger="click"
                            style={{
                              border: "1px solid",
                              borderRadius: "10px",
                              width: "215px",
                              margin: "auto",
                              lineHeight: 0,
                              // boxShadow: "-1px 3px 1px 1px #d9d9d9",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              refPopupThemLieuDung &&
                              refPopupThemLieuDung.current.show(
                                {
                                  tenLieuDung: state.searchLieuDungWord,
                                  data: state?.data,
                                },
                                (res) => {
                                  const { values } = res;
                                  values.bacSiId = nhanVienId;
                                  createOrEditLieuDung(values).then(
                                    async (s) => {
                                      const dataCustom = {
                                        lieuDung: {
                                          ...s,
                                        },
                                        lieuDungId: s.id,
                                        dichVuId: state?.data?.dichVuId,
                                      };
                                      await createOrEditLieuDungThuoc(
                                        dataCustom
                                      );
                                      _getListTongHop({
                                        bacSiId: nhanVienId,
                                        dichVuId: state?.data?.dichVuId,
                                      });
                                    }
                                  );
                                }
                              )
                            }
                          >
                            {t("khamBenh.donThuoc.themNhanhLieuDungBS")}
                          </Button>
                        </Row>
                      </div>
                    }
                  ></Select>
                </Form.Item>

                <Row gutter={8}>
                  <Col xs={12}>
                    <Form.Item
                      label={t("quanLyNoiTru.toDieuTri.soGiot/ml")}
                      name="soGiot"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      label={t("quanLyNoiTru.toDieuTri.cachGio")}
                      name="cachGio"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label={t("quanLyNoiTru.toDieuTri.thoiGianDung")}
                  name="ngayThucHien"
                >
                  <RangePicker
                    placeholder={[t("common.tuNgay"), t("common.denNgay")]}
                    disabled={isReadonly}
                    format="YYYY-MM-DD"
                  ></RangePicker>
                </Form.Item>
                <Form.Item label="TT30" name="mucDichId">
                  <Select data={listMucDichSuDung} placeholder="TT30" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </MainModal>
      </fieldset>
      <ModalThemLieuDung ref={refPopupThemLieuDung} />
    </ModalTemplate>
  );
};

export default forwardRef(SuaThongTinThuoc);
