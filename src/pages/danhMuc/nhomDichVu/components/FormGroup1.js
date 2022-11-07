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
        title="Thông tin chi tiết"
        onCancel={onCancel}
        cancelText="Hủy"
        onOk={handleAddNew}
        okText="Lưu [F4]"
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
              label="Mã nhóm dv cấp 1"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã nhóm dv cấp 1!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập mã nhóm dv cấp 1 không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã nhóm dv cấp 1!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: 'Mã phải có ít nhất một ký tự là chữ!'
                // }
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui lòng nhập mã nhóm dv cấp 1"
              />
            </Form.Item>
            <Form.Item
              label="Tên nhóm dv cấp 1"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm dv cấp 1!",
                },
                {
                  max: 1000,
                  message:
                    "Vui lòng nhập tên nhóm dv cấp 1 không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên nhóm dv cấp 1!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên nhóm dv cấp 1"
              />
            </Form.Item>
            <Form.Item
              label="STT Trên bảng kê"
              name="sttBangKe"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập STT Trên bảng kê!",
                },
              ]}
            >
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập STT Trên bảng kê"
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái hoàn thành dv"
              name="trangThaiHoanThanh"
            >
              <Select
                data={[...listtrangThaiHoanThanh]}
                placeholder="Chọn trạng thái hoàn thành dv"
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái không hoàn thành dv"
              name="dsTrangThaiKhongDuocHoanThanh"
            >
              <Select
                mode="multiple"
                showArrow={true}
                data={listtrangThaiKhongHoanThanh}
                placeholder="Chọn trạng thái không hoàn thành dv"
              />
            </Form.Item>
            <Form.Item label="Trạng thái sinh số thứ tự" name="trangThaiLayStt">
              <Select
                showArrow={true}
                data={listtrangThaiDichVu}
                placeholder="Chọn trạng thái sinh số thứ tự"
              />
            </Form.Item>
            <Form.Item label=" " name="boQuaKetQuaLau" valuePropName="checked">
              <Checkbox>Bỏ qua kết quả lâu</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttUuTien" valuePropName="checked">
              <Checkbox>Sinh số riêng cho NB Ưu tiên</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttNoiTru" valuePropName="checked">
              <Checkbox>Sinh số riêng cho NB Nội trú</Checkbox>
            </Form.Item>
            {dataEdit && (
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>Có hiệu lực</Checkbox>
              </Form.Item>
            )}
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(CreateOrUpdateGroupService1);
