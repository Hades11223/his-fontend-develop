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
      title={"Chỉnh sửa thông tin suất ăn"}
      onCancel={onCancel}
      width={850}
    >
      <Main>
        <div className="info-content">
          <Row>
            <Col span={24} className="title-dv">
              Tên dịch vụ
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
                  <Form.Item label={"Loại bữa ăn"} name="loaiBuaAnId">
                    <Select data={listAllLoaiBuaAn || []} />
                  </Form.Item>
                </div>
                <div className="form-item">
                  {/* <Form.Item label={"Số phiếu lĩnh"} name="loaiBuaSang">
                    <Select disabled />
                  </Form.Item> */}
                  <Form.Item label={"Số phiếu lĩnh"} name="soPhieuLinh">
                    <Input type="number" disabled></Input>
                  </Form.Item>
                </div>
              </Col>
              <Col span={6}>
                <div className="form-item">
                  <Form.Item label={"Trạng thái"} name="trangThai">
                    <Input disabled></Input>
                  </Form.Item>
                </div>
                <div className="form-item">
                  <Form.Item label={"Số phiếu trả"} name="soPhieuTra">
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
                        <Input defaultValue={"Lần"} disabled></Input>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <div className="form-item">
                      <Form.Item label="Ngày thực hiện" name="thoiGianThucHien">
                        <DateTimePicker placeholder="Chọn thời gian"></DateTimePicker>
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
                    <Input.TextArea placeholder="Nội dung"></Input.TextArea>
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
                          {"Đột xuất"}
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="form-item">
                      <Form.Item label=" " name="tuTra" valuePropName="checked">
                        <Checkbox onChange={onTick("tuTra")}>
                          {"Tự trả"}
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
                          {"Không tính tiền"}
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
