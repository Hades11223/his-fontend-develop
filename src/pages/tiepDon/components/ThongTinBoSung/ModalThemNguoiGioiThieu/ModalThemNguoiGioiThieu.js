import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Form, Input, message } from "antd";
import { ModalTemplate, Button, Select } from "components";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { Main } from "./styled";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ModalThemNguoiGioiThieu = (props, ref) => {
  const refModal = useRef(null);
  const [form] = Form.useForm();

  const { listAllNguonNguoiBenh } = useSelector(
    (state) => state.nguonNguoiBenh
  );

  const { nbNguonNb } = useSelector((state) => state.tiepDon);
  const { nguonNbId } = nbNguonNb || {};

  const {
    nguoiGioiThieu: { createOrEdit },
    tiepDon: { updateThongTinNb },
  } = useDispatch();

  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      form.setFieldsValue({ ten: "" });
      setState({ show: true });
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
      form.submit();
      message.success("Bạn đã nhấn Lưu");
      onOk(false)();
    } else {
      setState({
        show: false,
      });
    }
  };

  let dsNguonNb = useMemo(() => {
    return listAllNguonNguoiBenh.find((item) => item.id === state.dsNguonNbId);
  }, [listAllNguonNguoiBenh, state.dsNguonNbId]);

  useEffect(() => {
    form.setFieldsValue({ dsNguonNbId: nguonNbId });
  }, [form, nguonNbId]);

  const onFinish = async (values) => {
    let res = await createOrEdit({
      ...values,
      dsNguonNbId: [state.dsNguonNbId],
      dsNguonNb: [dsNguonNb],
      active: true,
    });
    updateThongTinNb(
      { nguonNbId: state.dsNguonNbId, nguoiGioiThieuId: res.id },
      "nbNguonNb"
    );
  };

  const onValuesChange = (changedValues, allValues) => {
    setState(allValues);
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={props.width}
      title={props.title}
      rightTitle={props.rightTitle}
      closable={props.closable}
      onCancel={onOk(false)}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onOk(false)}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button type="primary" minWidth={100} onClick={onOk(true)}>
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={onValuesChange}
        >
          <Form.Item label="Nguồn người bệnh" name="dsNguonNbId">
            <Select
              className="select"
              placeholder={t("tiepDon.chonNguoiGioiThieu")}
              data={listAllNguonNguoiBenh || []}
            />
          </Form.Item>
          <Form.Item label="Người giới thiệu" name="ten">
            <Input />
          </Form.Item>
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThemNguoiGioiThieu);
