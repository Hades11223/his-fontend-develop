import { Select } from "components";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import { Main } from "./styled";
import { Form } from "antd";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import Button from "pages/kho/components/Button";

import { useSelector } from "react-redux";
const ModalChonKho = forwardRef((props, ref) => {
  const { listKhoUser } = useSelector((state) => state.kho);

  const refModal = useRef(null);
  const refOk = useRef(null);
  const [form] = Form.useForm();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({ title = "Chọn kho", label = "Chọn kho" }, onOk) => {
      setState({ title, label, value: "" });
      refOk.current = onOk;
      refModal.current && refModal.current.show();
      form.setFieldsValue({ kho: "" });
      form.resetFields();
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
              label={state.label}
              name="kho"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn kho!",
                },
              ]}
              initialValue={state.value}
            >
              <Select
                style={{ width: "100%" }}
                data={listKhoUser}
                onSelect={(e) => {
                  setState({ value: e });
                }}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="footer-btn">
          <Button className="btn-cancel" onClick={onCancel}>
            Hủy bỏ
          </Button>
          <div class="f1"></div>
          <Button className="btn-ok" onClick={onOk} type={"primary"}>
            Đồng ý
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
});

export default ModalChonKho;
