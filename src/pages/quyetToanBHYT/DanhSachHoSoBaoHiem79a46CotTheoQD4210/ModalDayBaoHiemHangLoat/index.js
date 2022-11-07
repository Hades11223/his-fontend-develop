import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Main } from "./styled";
import { Row, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ModalTemplate, Button, Select, DateTimePicker } from "components";
import { useLoading } from "hook";
const ModalDayBaoHiemHangLoat = (props, ref) => {
  const { listTrangThaiQuyetToan } = props;
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  const { dayHoSoBaoHiemHangLoat } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201;
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: (data, callback) => {
      setState({ show: true });
      refCallback.current = callback;
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onHandleSubmit = (values) => {
    showLoading();
    dayHoSoBaoHiemHangLoat(values).then((s) => {
      let total = s?.data?.length;
      let totalSuccess = s?.data?.filter((x) => x.trangThai === 40)?.length;
      let totalError = s?.data?.filter((x) => x.trangThai === 30)?.length;
      if(!!totalError) {
        message.error(
          t("quyetToanBhyt.tongSoHoDayQuyetToan")
            .replace("{0}", total)
            .replace("{1}", totalSuccess)
            .replace("{2}", totalError)
        );
      } else {
        message.success(
          t("quyetToanBhyt.tongSoHoDayQuyetToan")
            .replace("{0}", total)
            .replace("{1}", totalSuccess)
            .replace("{2}", totalError)
        );
      }
   
      hideLoading();
      refCallback.current && refCallback.current();
      onOK(false)();
    }).catch(() => {
      hideLoading();
    });
  };
  const onOK = (isOk) => () => {
    if (isOk) {
      form.submit();
    } else {
      setState({ show: false });
      form.resetFields();
    }
  };

  return (
    <ModalTemplate
      width={500}
      ref={refModal}
      title={t("quyetToanBhyt.guiGiamDinhBhTheoThoiGianDuyet")}
      onCancel={onOK(false)}
      closable={false}
      actionRight={
        <>
          <Button minWidth={100} onClick={onOK(false)}>
            {t("common.huy")}
          </Button>

          <Button type="primary" minWidth={100} onClick={onOK(true)}>
            {t("common.dongY")}
          </Button>
        </>
      }
    >
      <Main>
        <Row style={{ background: "#fff", padding: "20px" }}>
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            style={{ width: "100%" }}
            onFinish={onHandleSubmit}
          >
            <Form.Item label={t("common.tuNgay")} name="tuThoiGianTaoHoSo">
              <DateTimePicker showTime />
            </Form.Item>

            <Form.Item label={t("common.denNgay")} name="denThoiGianTaoHoSo">
              <DateTimePicker showTime />
            </Form.Item>

            <Form.Item label={t("common.trangThai")} name="dsTrangThai">
              <Select mode="multiple" data={listTrangThaiQuyetToan} showArrow />
            </Form.Item>
          </Form>
        </Row>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDayBaoHiemHangLoat);
