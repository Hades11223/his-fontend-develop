import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import Button from "pages/kho/components/Button";
import { Main } from "./styled";
import { Input, Form } from "antd";
const { TextArea } = Input;
const ModalNhapLyDo = forwardRef((props, ref) => {
  const refOk = useRef(null);
  const refModal = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (
      {
        title = "Lý do từ chối",
        message = "Điền lý do từ chối duyệt",
        buttonCancelText = "Hủy",
        buttonOkText = "Đồng ý",
        value,
      },
      onOk
    ) => {
      setState({ title, message, buttonCancelText, buttonOkText, value });
      form.setFieldsValue({ lyDo: "" });
      setTimeout(() => {
        form.resetFields();
      }, 500);
      refOk.current = onOk;
      refModal.current && refModal.current.show();
    },
  }));
  const onCancel = () => {
    refModal.current && refModal.current.hide();
  };

  const onOk = () => {
    form.validateFields().then((s) => {
      refOk.current && refOk.current(state.value);
      refModal.current && refModal.current.hide();
    });
  };
  const onChange = (e) => {
    setState({ value: e.target.value });
  };
  const [form] = Form.useForm();

  return (
    <ModalTemplate ref={refModal} width={376} title={state.title}>
      <Main>
        <div className="info-content">
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label={state.message}
              name="lyDo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lý do!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập lý do!",
                },
              ]}
              initialValue={state.value}
            >
              <TextArea rows={5} placeholder="" onChange={onChange} />
            </Form.Item>
          </Form>
        </div>
        <div className="footer-btn">
          <Button className="btn-cancel" onClick={onCancel}>
            Hủy bỏ
          </Button>
          <div className="f1"></div>
          <Button className="btn-ok" onClick={onOk} type={"primary"}>
            Đồng ý
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
});

export default ModalNhapLyDo;
