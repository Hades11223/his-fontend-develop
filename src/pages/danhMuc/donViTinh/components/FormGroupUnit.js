import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Checkbox, Input, Form } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useDispatch } from "react-redux";
const CreateOrUpdateGroupUnit = (
  { handleSubmit, onCancel, editStatus, layerId },
  ref
) => {
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;

  const [showBox, setShowBox] = useState(false);
  const [form] = Form.useForm();
  const [currentItem, setCurrentItem] = useState({});
  const formRef = React.useRef();
  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values);
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAddNew;
  refClickBtnAdd.current = () => {
    setCurrentItem({});
    form.resetFields();
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        setCurrentItem(data);
        setShowBox(true);
        form.setFieldsValue(data);
      },
      resetFields: () => {
        setCurrentItem({});
        form.resetFields();
      },
    }),
    []
  );
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);
  return (
    <>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={onCancel}
        cancelText="Hủy"
        onOk={handleAddNew}
        okText="Lưu [F4]"
        roleSave={[ROLES["DANH_MUC"].DON_VI_TINH_THEM]}
        roleEdit={[ROLES["DANH_MUC"].DON_VI_TINH_SUA]}
        editStatus={editStatus}
      >
        <fieldset
          disabled={
            !checkRole([ROLES["DANH_MUC"].DON_VI_TINH_THEM]) && !editStatus
          }
        >
          <Form
            ref={formRef}
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label="Mã nhóm đơn vị tính"
              name="ma"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã nhóm đơn vị tính!",
                },
                {
                  max: 20,
                  message:
                    "Vui lòng nhập mã nhóm đơn vị tính không quá 20 ký tự!",
                },
                {
                  pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                  message: "Mã phải có ít nhất một ký tự là chữ!",
                },
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui lòng nhập mã nhóm đơn vị tính"
              />
            </Form.Item>
            <Form.Item
              label="Tên nhóm đơn vị tính"
              name="ten"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm đơn vị tính!",
                },
                {
                  max: 1000,
                  message:
                    "Vui lòng nhập tên đơn vị tính không quá 1000 ký tự!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên nhóm đơn vị tính"
              />
            </Form.Item>
            {showBox && (
              <Form.Item label=" " name="active" valuePropName="checked">
                <Checkbox>Có hiệu lực</Checkbox>
              </Form.Item>
            )}
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(CreateOrUpdateGroupUnit);
