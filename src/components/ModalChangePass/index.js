import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form, Input } from "antd";
import { Main, InputSearch } from "./styled";
import IconPass from "assets/svg/iconPass.svg";
import Icon from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ModalTemplate, Button } from "components";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IcSave from "assets/svg/ic-save.svg";
import { useLoading } from "hook";

const ModalChangePass = ({}, ref) => {
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  const refModal = useRef(null);
  const {
    auth: { onChangePassword, onLogout },
  } = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [state, _setState] = useState({
    show: false,
  });
  const [form] = Form.useForm();
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);
  const refOldPassword = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
        confirmPassworderror: false,
        matKhauMoierror: false,
        successPassword: false,
      });
      form.resetFields();
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onBlurConfirm = () => {
    setState({
      focusConfirm: false,
    });
  };
  const onBlurPass = () => {
    setState({
      focusPass: false,
    });
  };
  const onFocusPass = () => {
    setState({
      focusPass: true,
    });
  };
  const onFocusConfirm = () => {
    setState({
      focusConfirm: true,
    });
  };
  const handleChangeNewPass = (e) => {
    if (e?.target?.value?.length >= 6) {
      setState({
        successPassword: true,
        newPass: e.target.value,
        matKhauMoierror: false,
      });
    } else {
      setState({
        matKhauMoierror: true,
        successPassword: false,
        newPass: e.target.value,
      });
    }
  };
  const handleChangeOldPass = (e) => {
    if (!e.target.value?.length) {
      setState({ oldPassErrors: true });
    } else {
      setState({ oldPassErrors: false });
    }
  };
  const hanldeChangeConfirmPass = (e) => {
    if (state?.newPass?.length > 5 && state.newPass === e.target.value) {
      setState({
        passConfirm: e.target.value,
        confirmPassworderror: false,
      });
    } else {
      setState({
        confirmPassworderror: true,
        passConfirm: e.target.value,
      });
    }
  };

  const onfocusOldPassword = () => {
    setState({ focusOldPassword: true });
  };
  const onBlurOldPassWord = () => {
    setState({ focusOldPassword: false });
  };
  const onOK = (isOk) => async () => {
    if (isOk) {
      try {
        showLoading();
        const values = await form.validateFields();
        const convertData = {
          matKhauCu: values.matKhauCu.toMd5(),
          matKhauMoi: values.matKhauMoi.toMd5(),
          taiKhoan: auth?.username,
        };
        await onChangePassword(convertData);
        onOK(false);
        setTimeout(() => {
          onLogout({});
        }, 1000);
      } catch (error) {
      } finally {
        hideLoading();
      }
    } else {
      setState({ show: false });
      form.resetFields();
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      closable={false}
      width={"480px"}
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
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<IcSave />}
          iconHeight={15}
          onClick={onOK(true)}
        >
          {t("common.luuThayDoi")}
        </Button>
      }
      title={t("common.doiMatKhau")}
    >
      <Main>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="M???t kh???u c??"
            name="matKhauCu"
            rules={[{ required: true, message: "Vui l??ng nh???p m???t kh???u c??!" }]}
          >
            <InputSearch
              focus={state.focusOldPassword}
              error={state.oldPassErrors}
            >
              <Icon component={IconPass} className="icon-pass"></Icon>
              <Input.Password
                autoFocus={true}
                ref={refOldPassword}
                onChange={handleChangeOldPass}
                onFocus={onfocusOldPassword}
                onBlur={onBlurOldPassWord}
              />
            </InputSearch>
          </Form.Item>
          <Form.Item
            label="M???t kh???u m???i"
            name="matKhauMoi"
            rules={[
              { required: true, message: "Vui l??ng nh???p m???t kh???u m???i!" },
              {
                min: 6,
                message: "M???t kh???u ph???i c?? ??t nh???t 6 k?? t???!",
              },
            ]}
          >
            <InputSearch focus={state.focusPass} error={state.matKhauMoierror}>
              <Icon component={IconPass} className="icon-pass"></Icon>
              <Input.Password
                ref={refPassword}
                onBlur={onBlurPass}
                onFocus={onFocusPass}
                onChange={handleChangeNewPass}
              />
            </InputSearch>
          </Form.Item>

          <Form.Item
            label="Nh???p l???i m???t kh???u m???i"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui l??ng nh???p l???i m???t kh???u!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("matKhauMoi") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("M???t kh???u m???i kh??ng tr??ng kh???p!");
                },
              }),
            ]}
          >
            <InputSearch
              focus={state.focusConfirm}
              error={state.confirmPassworderror}
            >
              <Icon component={IconPass} className="icon-pass"></Icon>
              <Input.Password
                ref={refConfirmPassword}
                onBlur={onBlurConfirm}
                onFocus={onFocusConfirm}
                onChange={hanldeChangeConfirmPass}
              />
            </InputSearch>
          </Form.Item>
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChangePass);
