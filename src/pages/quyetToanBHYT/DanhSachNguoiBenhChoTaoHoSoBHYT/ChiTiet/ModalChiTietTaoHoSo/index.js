import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Row, Input, Col, Form, TimePicker, DatePicker } from "antd";
import { Main, GlobalStyles } from "./styled";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ModalTemplate, Button } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useTranslation } from "react-i18next";

const ModalChiTietTaoHoSo = (props, ref) => {
  const { t } = useTranslation();

  const refModal = useRef(null);

  const { dataCurrent } = useSelector(
    (state) => state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT
  );
  const { postTaoHoSoDuyet } =
    useDispatch().danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT;
  const [form] = Form.useForm();
  const [state, _setState] = useState({ show: false });
  const history = useHistory();
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    form.setFieldsValue({
    });
  }, []);
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
      form.setFieldsValue({
        thoiGianTaoHoSo: moment(),
        thoiGianTaoHoSoTime: moment(),
        namQt: dataCurrent?.thoiGianThanhToan
          ? moment(dataCurrent?.thoiGianThanhToan).year()
          : moment().year(),
        thangQt: dataCurrent?.thoiGianThanhToan
          ? moment(dataCurrent?.thoiGianThanhToan).month() + 1
          : moment().month() + 1,
      });
      // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOk = (isOk) => (e) => {
    if (isOk) {
      const exportTime = (date, time) => {
        const dateFormat = moment(date).format("YYYY-MM-DD");
        const timeFormat = moment(time).format("HH:mm:ss");
        const res = moment(dateFormat + " " + timeFormat);
        return res.format();
      };
      form.validateFields().then(async (values) => {
        const valuesCustom = {
          namQt: values?.namQt,
          thangQt: values?.thangQt,
          thoiGianTaoHoSo:
            values?.thoiGianTaoHoSo &&
            exportTime(values?.thoiGianTaoHoSo, values?.thoiGianTaoHoSoTime),
        };
        valuesCustom.nbDotDieuTriId = props.id;
        let res = await postTaoHoSoDuyet(valuesCustom);
        onOk(false)();
        history.push(
          `/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210/chi-tiet/${
            res?.id || res?.[0]?.id
          }`
        );
      });
    } else {
      setState({ show: false });
    }
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={500}
      title={t("quyetToanBhyt.taoHoSoQuyetToan")}
      onCancel={onOk(false)}
      actionLeft={
        <Button.Text
          type="primary"
          leftIcon={<IcArrowLeft />}
          onClick={onOk(false)}
          iconHeight={15}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button type="primary" onClick={onOk(true)} minWidth={100}>
          {t("common.xacNhan")}
        </Button>
      }
    >
      <GlobalStyles />
      <Main>
        <Row>
          <Col span={24} className="right-box">
            <Form
              form={form}
              layout="vertical"
              style={{ width: "100%" }}
              className="form-custom"
            >
              <Form.Item
                label="NAM_QT"
                name="namQt"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập NAM_QT!",
                  },
                ]}
              >
                <Input placeholder="Nhập NAM_QT" className="input-option" />
              </Form.Item>
              <Form.Item
                label="THANG_QT"
                name="thangQt"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập THANG_QT!",
                  },
                ]}
              >
                <Input placeholder="Nhập THANG_QT" className="input-option" />
              </Form.Item>
              <Row align="middle" justify="space-between">
                <Form.Item
                  label="Ngày tạo hồ sơ XML"
                  name="thoiGianTaoHoSo"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ngày!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Giờ sinh" name="thoiGianTaoHoSoTime">
                  <TimePicker
                    popupClassName="time-picker-danh-sach-nguoi-benh"
                    suffixIcon={false}
                    // placeholder="00:00:00"
                    className="item-time"
                    // value={ngaySinhTime}
                    format="HH:mm:ss"
                    onSelect={(e) =>
                      form.setFieldsValue({ thoiGianTaoHoSoTime: e })
                    }
                  />
                </Form.Item>
              </Row>
            </Form>
          </Col>
        </Row>
      </Main>
    </ModalTemplate>
  );
};

export default (forwardRef(ModalChiTietTaoHoSo));
