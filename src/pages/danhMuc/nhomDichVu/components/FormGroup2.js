import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { Checkbox, Input, Form } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import Select from "components/Select";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useDispatch } from "react-redux";
const CreateOrUpdateGroupService1 = (
  {
    handleSubmit,
    listAllNhomDichVuCap1,
    onCancel,
    listtrangThaiHoanThanh,
    listtrangThaiKhongHoanThanh,
    dataSearch,
    nhomDichVuCap1Id,
    listtrangThaiDichVu,
    listAllBaoCao,
    getListAllBaoCao,
    editStatus,
    layerId,
  },
  ref
) => {
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  const [form] = Form.useForm();
  const [dataEdit, setdataEdit] = useState(null);
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      nhomDichVuCap1Id: dataSearch?.nhomDichVuCap1Id || null,
    });

    if (!listAllBaoCao?.length) {
      getListAllBaoCao({ page: "", size: "" });;
    }
  }, [dataSearch]);
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.editGroup2Id) {
          form.setFieldsValue(data?.info);
          setdataEdit(data?.info?.id);
        } else {
          form.resetFields();
          setdataEdit(null);
        }
      },
      resetFields: () => {
        form.resetFields();
        setdataEdit(null);
      },
    }),
    []
  );

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit({ ...values });
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
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label="Mã nhóm dv cấp 2"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã nhóm dv cấp 2!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập mã nhóm dv cấp 2 không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã nhóm dv cấp 2!",
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
                placeholder="Vui lòng nhập mã nhóm dv cấp 2"
              />
            </Form.Item>
            <Form.Item
              label="Tên nhóm dv cấp 2"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm dv cấp 2!",
                },
                {
                  max: 1000,
                  message:
                    "Vui lòng nhập tên nhóm dv cấp 2 không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên nhóm dv cấp 2!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập nhóm dv cấp 2"
              />
            </Form.Item>
            <Form.Item
              label="Tên nhóm nhóm dv cấp 1"
              name="nhomDichVuCap1Id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm nhóm dv cấp 1!",
                },
              ]}
            >
              <Select
                data={listAllNhomDichVuCap1}
                placeholder="Chọn nhóm dv cấp 1"
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
              label="Tên báo cáo"
              name="phieuChiDinhId"
              rules={[
                {
                  required: true,
                  message: "Tên báo cáo bắt buộc điền",
                },
              ]}
            >
              <Select data={listAllBaoCao} placeholder="Chọn báo cáo" />
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
            <Form.Item></Form.Item>
            <Form.Item name="tiepDonCls" valuePropName="checked">
              <Checkbox>Tiếp đón CLS</Checkbox>
            </Form.Item>
            <Form.Item name="boQuaKetQuaLau" valuePropName="checked">
              <Checkbox>Bỏ qua kết quả lâu</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttUuTien" valuePropName="checked">
              <Checkbox>Sinh số riêng cho NB Ưu tiên</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttNoiTru" valuePropName="checked">
              <Checkbox>Sinh số riêng cho NB Nội trú</Checkbox>
            </Form.Item>
            <Form.Item name="theoYeuCau" valuePropName="checked">
              <Checkbox>Dv theo yêu cầu</Checkbox>
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
