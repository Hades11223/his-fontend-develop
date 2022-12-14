import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Checkbox, Input, Form } from "antd";
import { CreatedWrapper, Select } from "components";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import {useDispatch} from "react-redux";
const CreateOrUpdate = ({ handleSubmit, onCancel, editStatus, layerId }, ref) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setdataEdit] = useState(null);
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onRegisterHotkey } = useDispatch().phimTat;
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
    form.resetFields();
    setdataEdit({});
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.info?.id) {
          form.setFieldsValue(data?.info);
          setdataEdit(data?.info?.id);
        } else {
          form.resetFields();
          setdataEdit(null);
        }
      },
      resetFields: (data) => {
        form.resetFields();
        setdataEdit(null);
      },
    }),
    []
  );
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEdit]);
  return (
    <>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onCancel}
        cancelText="H???y"
        onOk={handleAddNew}
        okText="L??u [F4]"
        roleSave={[ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH_THEM]}
        roleEdit={[ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH_SUA]}
        editStatus={editStatus}
      >
        <fieldset
          disabled={
            !checkRole([ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH_THEM]) &&
            !editStatus
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
              label="M?? qu???c gia"
              name="ma"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? qu???c gia!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? qu???c gia kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? qu???c gia!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: "M?? ph???i c?? ??t nh???t m???t k?? t??? l?? ch???!",
                // },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p m?? qu???c gia"
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label="T??n qu???c gia"
              name="ten"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n qu???c gia!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p t??n qu???c gia kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n qu???c gia!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n qu???c gia"
              />
            </Form.Item>
            {dataEdit && (
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>C?? hi???u l???c</Checkbox>
              </Form.Item>
            )}
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(CreateOrUpdate);
