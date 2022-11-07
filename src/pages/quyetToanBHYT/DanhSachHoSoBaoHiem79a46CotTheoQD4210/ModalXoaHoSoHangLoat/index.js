import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { Row, Form, TimePicker, DatePicker } from "antd";
import { Main } from "./styled";
import moment from "moment";
import { ModalTemplate, Button } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useTranslation } from "react-i18next";

const ModalXoaHoSoHangLoat = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const { xoaHoSoHangLoat, onSortChange } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201;

  const [form] = Form.useForm();
  const [state, _setState] = useState({ show: false });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
      form.setFieldsValue({
        tuThoiGianTaoHoSo: moment(),
        tuThoiGianTaoHoSoTime: moment()
          .utcOffset(0)
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
        denThoiGianTaoHoSo: moment(),
        denThoiGianTaoHoSoTime: moment()
          .utcOffset(0)
          .set({ hour: 23, minute: 59, second: 59, millisecond: 59 }),
      });
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOk = (isOk) => () => {
    if (isOk) {
      const exportTime = (date, time) => {
        const dateFormat = moment(date).format("YYYY-MM-DD");
        const timeFormat = moment(time).format("HH:mm:ss");
        const res = moment(dateFormat + " " + timeFormat);
        return res.format();
      };
      form.validateFields().then(async (values) => {
        const valuesCustom = {
          tuThoiGianTaoHoSo:
            values?.tuThoiGianTaoHoSo &&
            exportTime(
              values?.tuThoiGianTaoHoSo,
              values?.tuThoiGianTaoHoSoTime
            ),
          denThoiGianTaoHoSo:
            values?.denThoiGianTaoHoSo &&
            exportTime(
              values?.denThoiGianTaoHoSo,
              values?.denThoiGianTaoHoSoTime
            ),
        };
        setState({ show: false });
        await xoaHoSoHangLoat(valuesCustom);
        await onSortChange({});
      });
    } else {
      setState({
        show: false,
      });
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      width={500}
      onCancel={onOk(false)}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button minWidth={100} type="primary" onClick={onOk(true)}>
          {t("common.xacNhan")}
        </Button>
      }
      title={t("quyetToanBhyt.xoaHoSoQuyetToanBHYTHangLoat")}
    >
      <Main>
        <div style={{ marginBottom: 16 }}>
          {t("quyetToanBhyt.chonNgayTaoHoSo")}
        </div>
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Row align="middle" justify="space-between">
            <Form.Item label={t("common.tuNgay")} name="tuThoiGianTaoHoSo">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label={<div style={{ visibility: "hidden" }}>hidden</div>}
              name="tuThoiGianTaoHoSoTime"
            >
              <TimePicker
                suffixIcon={false}
                placeholder="00:00:00"
                className="item-time"
                // value={ngaySinhTime}
                format="HH:mm:ss"
                // onChange={(e) => onChange(e, "ngaySinhTime")}
              />
            </Form.Item>
          </Row>
          {/* ---------------------------------------------------------------- */}
          <Row align="middle" justify="space-between">
            <Form.Item label={t("common.denNgay")} name="denThoiGianTaoHoSo">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label={<div style={{ visibility: "hidden" }}>hidden</div>}
              name="denThoiGianTaoHoSoTime"
            >
              <TimePicker
                suffixIcon={false}
                placeholder="00:00:00"
                className="item-time"
                // value={ngaySinhTime}
                format="HH:mm:ss"
                // onChange={(e) => onChange(e, "ngaySinhTime")}
              />
            </Form.Item>
          </Row>
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalXoaHoSoHangLoat);
