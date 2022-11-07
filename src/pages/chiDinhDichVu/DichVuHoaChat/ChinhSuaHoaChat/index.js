import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import { Col, Input, message, Row, Form, Checkbox } from "antd";
import Button from "pages/kho/components/Button";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "components";
import moment from "moment";
import { useSelector } from "react-redux";

const ChinhSuaHoaChat = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [form] = Form.useForm();
  const [state, _setState] = useState({ data: [] });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  const {
    chiDinhHoaChat: { getListDichVuHoaChat, themThongTin },
    phieuNhapXuat: { getDetail },
  } = useDispatch();

  const {
    thongTinPhieu: { soPhieu },
  } = useSelector((state) => state.phieuNhapXuat);

  useEffect(() => {
    form.setFieldsValue({
      ...state?.record,
      soPhieu: soPhieu,
      thoiGianThucHien: moment(state.record?.thoiGianThucHien),
    });
  }, [soPhieu]);

  useImperativeHandle(ref, () => ({
    show: (record = {}, callback) => {
      setState({ data: [], show: true, record: record });
      record.phieuLinhId && getDetail({ id: record.phieuLinhId });
      form.setFieldsValue({
        ...record,
        soPhieu: "" || soPhieu,
        thoiGianThucHien: moment(state.record?.thoiGianThucHien),
      });
      refModal.current && refModal.current.show();
      refCallback.current = callback;
    },
  }));
  const onCancel = () => {
    setState({ show: false, disabledButton: false });
    form.resetFields();
    refModal.current && refModal.current.hide();
  };
  const onSave = () => {
    form.submit();
  };

  const onHandledSubmit = (values) => {
    if (values.nbDichVu?.soLuong) {
      message.error(t("khamBenh.donThuoc.truongBatBuocDienSoLuong"));
      return;
    }
    if ((values.ghiChu || "").length > 1000) {
      message.error(t("khamBenh.donThuoc.nhapLuuYKhongQua1000KyTu"));
      return;
    }
    setState({ disabledButton: true });
    let payload = {
      id: state?.record?.id,
      nbDotDieuTriId: state?.record?.nbDotDieuTriId,
      nbDichVu: {
        ghiChu: values?.ghiChu,
        soLuong: values?.soLuong,
        dichVuId: state?.record?.dichVuId,
        tuTra: values?.tuTra,
        khongTinhTien: values?.khongTinhTien,
        chiDinhTuDichVuId: state?.record?.chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu: state?.record?.chiDinhTuLoaiDichVu,
        khoaChiDinhId: state?.record?.khoaChiDinhId,
        thoiGianThucHien: moment(values.thoiGianThucHien).format(
          "YYYY/MM/DD HH:mm:ss"
        ),
      },
    };
    themThongTin([payload])
      .then((s) => {
        getListDichVuHoaChat({
          nbDotDieuTriId: state?.record.nbDotDieuTriId,
          chiDinhTuDichVuId: state?.record?.chiDinhTuDichVuId,
          dsTrangThaiHoan: [0, 10, 20],
        }).then((res) => {});
        if (refCallback.current) refCallback.current();
        onCancel();
      })
      .catch(() => {});
  };
  const onTick = (key) => (e) => {
    if (key === "tuTra" && e) {
      form.setFieldsValue({ khongTinhTien: false });
    } else if (key === "khongTinhTien" && e) {
      form.setFieldsValue({ tuTra: false });
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      title={t("quanLyNoiTru.toDieuTri.thongTinHoaChat")}
      onCancel={onCancel}
      width={650}
      actionLeft={
        <Button.Text type="default" minWidth={100} onClick={onCancel}>
          {t("common.huy")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          disabled={state?.disabledButton}
          onClick={onSave}
        >
          <span> {t("common.dongY")}</span>
        </Button>
      }
    >
      <Main>
        <div className="info-content">
          <Form form={form} layout="vertical" onFinish={onHandledSubmit}>
            <Row>
              <Col span={12}>
                <Form.Item label={t("vatTu.tenVatTu")} name="ten">
                  <Input disabled></Input>
                </Form.Item>
                <Form.Item
                  label={t("vatTu.thoiGianThucHien")}
                  name="thoiGianThucHien"
                >
                  <DateTimePicker></DateTimePicker>
                </Form.Item>
                <Form.Item label={t("vatTu.luuY")} name="ghiChu">
                  <Input.TextArea></Input.TextArea>
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Row>
                  <Col span={12}>
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
                      <Input type="number"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item label={t("vatTu.dvt")} name="tenDonViTinh">
                      <Input disabled></Input>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label={t("vatTu.phieuLinh")} name="soPhieu">
                  <Input disabled></Input>
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item label=" " name="tuTra" valuePropName="checked">
                      <Checkbox onChange={onTick("tuTra")}>
                        {t("vatTu.tuTra")}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item
                      label=" "
                      name="khongTinhTien"
                      valuePropName="checked"
                    >
                      <Checkbox onChange={onTick("khongTinhTien")}>
                        {t("vatTu.khongTinhTien")}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ChinhSuaHoaChat);
