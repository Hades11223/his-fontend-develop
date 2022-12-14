import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { Col, Input, message, Row, Form, Checkbox } from "antd";
import Button from "pages/kho/components/Button";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { useTranslation } from "react-i18next";
import { DateTimePicker, Select } from "components";
import moment from "moment";
import IcSave from "assets/svg/ic-save.svg";
import { useStore } from "hook";

const ChinhSuaSuatAn = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [form] = Form.useForm();
  const [state, _setState] = useState({ data: [] });
  const listAllLoaiBuaAn = useStore("loaiBuaAn.listAllLoaiBuaAn", []);
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  console.log("state?.record", state?.record);

  const { getDsSuatAn, themThongTin } = useDispatch().chiDinhSuatAn;

  useImperativeHandle(ref, () => ({
    show: (record = {}, callback) => {
      setState({ data: [], show: true, record: record });
      form.setFieldsValue({
        ...record,
        thoiGianThucHien: moment(record?.thoiGianThucHien),
      });

      refCallback.current = callback;
      refModal.current && refModal.current.show();
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
      dotXuat: values?.dotXuat,
      loaiBuaAnId: values?.loaiBuaAnId,
      nbDichVu: {
        ghiChu: values?.ghiChu,
        soLuong: values?.soLuong,
        tuTra: values?.tuTra,
        khongTinhTien: values?.khongTinhTien,
        thoiGianThucHien: moment(values.thoiGianThucHien).format(
          "YYYY/MM/DD HH:mm:ss"
        ),
        dichVuId: state?.record?.dichVuId,
        chiDinhTuDichVuId: state?.record?.chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu: state?.record?.chiDinhTuLoaiDichVu,
        khoaChiDinhId: state?.record?.khoaChiDinhId,
      },
    };
    themThongTin([payload])
      .then((s) => {
        getDsSuatAn({
          nbDotDieuTriId: state?.record.nbDotDieuTriId,
          chiDinhTuDichVuId: state?.record?.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: 210,
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
      title={"Ch???nh s???a th??ng tin su???t ??n"}
      onCancel={onCancel}
      width={850}
    >
      <Main>
        <div className="info-content">
          <Row>
            <Col span={24} className="title-dv">
              T??n d???ch v???
            </Col>
            <Col span={24} className="name-dv">
              {state.record?.tenDichVu}
            </Col>
          </Row>
          <br />
          <Form form={form} layout="vertical" onFinish={onHandledSubmit}>
            <Row>
              <Col span={6}>
                <div className="form-item">
                  <Form.Item label={"Lo???i b???a ??n"} name="loaiBuaAnId">
                    <Select data={listAllLoaiBuaAn || []} />
                  </Form.Item>
                </div>
                <div className="form-item">
                  {/* <Form.Item label={"S??? phi???u l??nh"} name="loaiBuaSang">
                    <Select disabled />
                  </Form.Item> */}
                  <Form.Item label={"S??? phi???u l??nh"} name="soPhieuLinh">
                    <Input type="number" disabled></Input>
                  </Form.Item>
                </div>
              </Col>
              <Col span={6}>
                <div className="form-item">
                  <Form.Item label={"Tr???ng th??i"} name="trangThai">
                    <Input disabled></Input>
                  </Form.Item>
                </div>
                <div className="form-item">
                  <Form.Item label={"S??? phi???u tr???"} name="soPhieuTra">
                    <Input value={""} disabled></Input>
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <div className="form-item">
                      <Form.Item label={t("common.soLuong")} name="soLuong">
                        <Input type="number"></Input>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-item">
                      <Form.Item label={t("vatTu.dvt")} name="tenDonViTinh">
                        <Input defaultValue={"L???n"} disabled></Input>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <div className="form-item">
                      <Form.Item label="Ng??y th???c hi???n" name="thoiGianThucHien">
                        <DateTimePicker placeholder="Ch???n th???i gian"></DateTimePicker>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <div className="form-item">
                  <Form.Item label={t("vatTu.luuY")} name="ghiChu">
                    <Input.TextArea placeholder="N???i dung"></Input.TextArea>
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={8}>
                    <div className="form-item">
                      <Form.Item
                        label=" "
                        name="dotXuat"
                        valuePropName="checked"
                      >
                        <Checkbox onChange={onTick("dotXuat")}>
                          {"?????t xu???t"}
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="form-item">
                      <Form.Item label=" " name="tuTra" valuePropName="checked">
                        <Checkbox onChange={onTick("tuTra")}>
                          {"T??? tr???"}
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="form-item">
                      <Form.Item
                        label=" "
                        name="khongTinhTien"
                        valuePropName="checked"
                      >
                        <Checkbox onChange={onTick("khongTinhTien")}>
                          {"Kh??ng t??nh ti???n"}
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="footer-btn">
          <Button type={"default"} onClick={onCancel} minWidth={100}>
            {t("common.huy")}
          </Button>
          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            rightIcon={<IcSave />}
            disabled={state?.disabledButton}
          >
            {t("common.luu")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ChinhSuaSuatAn);
