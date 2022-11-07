import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { Row, Input, Form, TimePicker, DatePicker, Radio, Space } from "antd";
import { Main, GlobalStyles } from "./styled";
import Select from "components/Select";
import moment from "moment";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { ModalTemplate, Button } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useTranslation } from "react-i18next";

const ModalTaoHoSoHangLoat = (props, ref) => {
  const { t } = useTranslation();
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const refModal = useRef(null);

  const { postTaoHangLoat, onSizeChange } =
    useDispatch().danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT;

  const [form] = Form.useForm();
  const [state, _setState] = useState({ show: false, theoNgayThanhToan: true });
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
        tuThoiGian: moment(),
        tuThoiGianTime: moment()
          .utcOffset(0)
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
        denThoiGian: moment(),
        denThoiGianTime: moment()
          .utcOffset(0)
          .set({ hour: 23, minute: 59, second: 59, millisecond: 59 }),
        thoiGianTaoHoSo: moment(),
        thoiGianTaoHoSoTime: moment(),
        dsDoiTuongKcb: ["Tất cả"],
        namQt: moment().year(),
        thangQt: moment().month() + 1,
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

  const onSelectRadio = (e) => {
    setState({ theoNgayThanhToan: e.target.value });
  };
  const onOk = (isOk) => () => {
    if (isOk) {
      const exportTime = (date, time) => {
        const dateFormat = moment(date).format("YYYY-MM-DD");
        const timeFormat = moment(time).format("HH:mm:ss");
        const res = moment(dateFormat + " " + timeFormat);
        return res.format();
      };
      form.validateFields().then(async (values) => {
        console.log("values: ", values);
        const valuesCustom = {
          dsDoiTuongKcb: values?.dsDoiTuongKcb?.includes("Tất cả")
            ? null
            : values?.dsDoiTuongKcb,
          theoNgayThanhToan: state?.theoNgayThanhToan,
          namQt: values?.namQt,
          thangQt: values?.thangQt,
          thoiGianTaoHoSo:
            values?.thoiGianTaoHoSo &&
            exportTime(values?.thoiGianTaoHoSo, values?.thoiGianTaoHoSoTime),
          tuThoiGian:
            values?.tuThoiGian &&
            exportTime(values?.tuThoiGian, values?.tuThoiGianTime),
          denThoiGian:
            values?.denThoiGian &&
            exportTime(values?.denThoiGian, values?.denThoiGianTime),
        };
        setState({ show: false });
        await postTaoHangLoat(valuesCustom);
        await onSizeChange({});
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
          {t("quyetToanBhyt.taoHoSoHangLoat")}
        </Button>
      }
      title={t("quyetToanBhyt.taoHoSoQuyetToanBHYTHangLoat")}
    >
      <GlobalStyles />
      <Main>
        <Radio.Group
          onChange={onSelectRadio}
          value={state?.theoNgayThanhToan}
          defaultValue={1}
          style={{ marginBottom: 16 }}
        >
          <Space direction="vertical">
            <Radio value={true}>{t("quyetToanBhyt.taoHoSoTheoNgayThanhToan")}</Radio>
            <Radio value={false}>
              {t("quyetToanBhyt.taoHoSoTheoNgayDangKy")}
            </Radio>
          </Space>
        </Radio.Group>
        <Form
          onValuesChange={(changedValues, allValues) => {
            if (
              changedValues?.["dsDoiTuongKcb"]?.includes("Tất cả") &&
              changedValues?.["dsDoiTuongKcb"]?.length > 1
            ) {
              // khi chọn giá trị khác sẽ xóa trường tất cả
              let dsDoiTuongKcbValue = form.getFieldValue("dsDoiTuongKcb");
              let index = dsDoiTuongKcbValue.findIndex(
                (item) => item === "Tất cả"
              );
              dsDoiTuongKcbValue.splice(index, 1);
              form.setFieldsValue({
                dsDoiTuongKcb: dsDoiTuongKcbValue,
              });
            }
          }}
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Row align="middle" justify="space-between">
            <Form.Item label="Từ ngày" name="tuThoiGian">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label={<div style={{ visibility: "hidden" }}>hidden</div>}
              name="tuThoiGianTime"
            >
              <TimePicker
                popupClassName="time-picker-tao-ho-so-hang-loat"
                suffixIcon={false}
                placeholder="00:00:00"
                className="item-time"
                // value={ngaySinhTime}
                format="HH:mm:ss"
                onSelect={(e) => form.setFieldsValue({ tuThoiGianTime: e })}
                // onChange={(e) => onChange(e, "ngaySinhTime")}
              />
            </Form.Item>
          </Row>
          {/* ---------------------------------------------------------------- */}
          <Row align="middle" justify="space-between">
            <Form.Item label="Đến ngày" name="denThoiGian">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label={<div style={{ visibility: "hidden" }}>hidden</div>}
              name="denThoiGianTime"
            >
              <TimePicker
                popupClassName="time-picker-tao-ho-so-hang-loat"
                suffixIcon={false}
                placeholder="00:00:00"
                className="item-time"
                // value={ngaySinhTime}
                format="HH:mm:ss"
                onSelect={(e) => form.setFieldsValue({ denThoiGianTime: e })}
              />
            </Form.Item>
          </Row>
          {/* ---------------------------------------------------------------- */}
          <Row align="middle" justify="space-between">
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
          </Row>
          {/* ---------------------------------------------------------------- */}
          <Row align="middle" justify="space-between">
            <Form.Item label="Ngày tạo hồ sơ XML" name="thoiGianTaoHoSo">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label={<div style={{ visibility: "hidden" }}>hidden</div>}
              name="thoiGianTaoHoSoTime"
            >
              <TimePicker
                popupClassName="time-picker-tao-ho-so-hang-loat"
                suffixIcon={false}
                placeholder="00:00:00"
                className="item-time"
                // value={ngaySinhTime}
                format="HH:mm:ss"
                onSelect={(e) =>
                  form.setFieldsValue({ thoiGianTaoHoSoTime: e })
                }
              />
            </Form.Item>
          </Row>
          {/* ---------------------------------------------------------------- */}
          <Form.Item label="Đối tượng KCB" name="dsDoiTuongKcb">
            <Select
              defaultValue={["Tất cả"]}
              mode="multiple"
              className="input-option"
              data={listDoiTuongKcb}
            />
          </Form.Item>
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTaoHoSoHangLoat);
