import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, Input, Form } from "antd";
import { CreatedWrapper } from "components";
import { connect, useDispatch } from "react-redux";
import FormWraper from "components/FormWraper";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
const Index = (props, ref) => {
  const { createOrEdit, layerId } = props;
  const [form] = Form.useForm();
  const formRef = React.useRef();
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
  const [dataEdit, setdataEdit] = useState({});
  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        createOrEdit({ ...values, id: dataEdit?.id })
          .then(() => {
            if (!dataEdit?.id) {
              form.resetFields();
            }
          })
          .catch((err) => console.error(err));
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
        form.setFieldsValue(data);
        setdataEdit(data);
      },
      resetFields: () => {
        form.resetFields();
        setdataEdit({});
      },
    }),
    []
  );
  const onCancel = () => {
    if (dataEdit?.id) {
      form.setFieldsValue(dataEdit);
    } else {
      form.resetFields();
    }
  };
  const refAutofocus = useRef(null);
  useEffect(() => {
    if (refAutofocus.current) {
      refAutofocus.current.focus();
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
        roleSave={[ROLES["DANH_MUC"].BENH_TAT_THEM]}
        roleEdit={[ROLES["DANH_MUC"].BENH_TAT_SUA]}
        editStatus={dataEdit?.id}
      >
        <FormWraper
          disabled={
            dataEdit?.id
              ? !checkRole([ROLES["DANH_MUC"].BENH_TAT_SUA])
              : !checkRole([ROLES["DANH_MUC"].BENH_TAT_THEM])
          }
          ref={formRef}
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="STT ch????ng b???nh"
            name="stt"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p stt ch????ng b???nh!",
              },
            ]}
          >
            <Input
              ref={refAutofocus}
              placeholder="Nh??p s??? l?????ng h??ng ?????i"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="M?? ch????ng b???nh"
            name="ma"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? ch????ng b???nh!",
              },
              {
                max: 20,
                message: "Vui l??ng nh???p m?? ch????ng b???nh kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? ch????ng b???nh!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? ch????ng b???nh"
            />
          </Form.Item>
          <Form.Item
            label="T??n ch????ng b???nh"
            name="ten"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n ch????ng b???nh!",
              },
              {
                max: 1000,
                message: "Vui l??ng nh???p t??n ch????ng b???nh kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n ch????ng b???nh!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n ch????ng b???nh"
            />
          </Form.Item>
          {dataEdit?.id && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>C?? hi???u l???c</Checkbox>
            </Form.Item>
          )}
        </FormWraper>
      </CreatedWrapper>
    </>
  );
};
const mapDispatchToProps = ({ chuongBenh: { createOrEdit } }) => ({
  createOrEdit,
});

export default connect(
  (state) => {
    return {};
  },
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(forwardRef(Index));
