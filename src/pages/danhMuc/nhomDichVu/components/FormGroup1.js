import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, Input, Form, InputNumber } from "antd";
import { CreatedWrapper, Select } from "components";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useDispatch } from "react-redux";
const CreateOrUpdateGroupService1 = (
  {
    handleSubmit,
    onCancel,
    listtrangThaiHoanThanh,
    listtrangThaiKhongHoanThanh,
    listtrangThaiDichVu,
    editStatus,
    layerId,
  },
  ref
) => {
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;

  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setdataEdit] = useState(null);
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
    setdataEdit(null);
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };
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

  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.editGroupService1Id) {
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
  const refAutoFocus = useRef(null);
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
        roleSave={[ROLES["DANH_MUC"].NHOM_DICH_VU_THEM]}
        roleEdit={[ROLES["DANH_MUC"].NHOM_DICH_VU_SUA]}
        editStatus={editStatus}
      >
        <fieldset
          disabled={
            !checkRole([ROLES["DANH_MUC"].NHOM_DICH_VU_THEM]) && !editStatus
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
              label="M?? nh??m dv c???p 1"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? nh??m dv c???p 1!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? nh??m dv c???p 1 kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? nh??m dv c???p 1!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: 'M?? ph???i c?? ??t nh???t m???t k?? t??? l?? ch???!'
                // }
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? nh??m dv c???p 1"
              />
            </Form.Item>
            <Form.Item
              label="T??n nh??m dv c???p 1"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n nh??m dv c???p 1!",
                },
                {
                  max: 1000,
                  message:
                    "Vui l??ng nh???p t??n nh??m dv c???p 1 kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n nh??m dv c???p 1!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n nh??m dv c???p 1"
              />
            </Form.Item>
            <Form.Item
              label="STT Tr??n b???ng k??"
              name="sttBangKe"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p STT Tr??n b???ng k??!",
                },
              ]}
            >
              <InputNumber
                className="input-option"
                placeholder="Vui l??ng nh???p STT Tr??n b???ng k??"
              />
            </Form.Item>
            <Form.Item
              label="Tr???ng th??i ho??n th??nh dv"
              name="trangThaiHoanThanh"
            >
              <Select
                data={[...listtrangThaiHoanThanh]}
                placeholder="Ch???n tr???ng th??i ho??n th??nh dv"
              />
            </Form.Item>
            <Form.Item
              label="Tr???ng th??i kh??ng ho??n th??nh dv"
              name="dsTrangThaiKhongDuocHoanThanh"
            >
              <Select
                mode="multiple"
                showArrow={true}
                data={listtrangThaiKhongHoanThanh}
                placeholder="Ch???n tr???ng th??i kh??ng ho??n th??nh dv"
              />
            </Form.Item>
            <Form.Item label="Tr???ng th??i sinh s??? th??? t???" name="trangThaiLayStt">
              <Select
                showArrow={true}
                data={listtrangThaiDichVu}
                placeholder="Ch???n tr???ng th??i sinh s??? th??? t???"
              />
            </Form.Item>
            <Form.Item label=" " name="boQuaKetQuaLau" valuePropName="checked">
              <Checkbox>B??? qua k???t qu??? l??u</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttUuTien" valuePropName="checked">
              <Checkbox>Sinh s??? ri??ng cho NB ??u ti??n</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttNoiTru" valuePropName="checked">
              <Checkbox>Sinh s??? ri??ng cho NB N???i tr??</Checkbox>
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

export default forwardRef(CreateOrUpdateGroupService1);
