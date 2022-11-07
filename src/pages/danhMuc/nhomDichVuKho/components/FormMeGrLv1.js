import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Checkbox, Input, Form } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import { combineSort } from "utils";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
const FormMeGrLv1 = (
  {
    page,
    size,
    dataSort,
    dataEditDefault,
    getListMeGrLv1,
    createOrEdit,
    editStatus,
    dataEdit,
    dataSearch,
    onCancel,
    editStatus2,
  },
  ref
) => {
  const [form] = Form.useForm();
  let editStatusMemo = useMemo(() => editStatus, [editStatus]);

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        values = { ...values, loaiDichVu: 90 };
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }
        createOrEdit(values)
          .then(() => {
            getListMeGrLv1({
              page: dataEditDefault.id ? page : 0,
              size,
              sort: combineSort(
                dataEditDefault.id ? dataSort : { createdAt: 2 }
              ),
              ...dataSearch,
              loaiDichVu: 90,
            }).then(() => {
              if (!editStatus) {
                form.resetFields();
              }
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {});
  };

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValue: (data) => {
        form.setFieldsValue(data);
      },
      resetFields: () => {
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
  }, [dataEditDefault]);
  return (
    <>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={handleCancel}
        cancelText="Hủy"
        onOk={handleAddNew}
        okText="Lưu"
        roleSave={[ROLES["DANH_MUC"].NHOM_THUOC_THEM]}
        roleEdit={[ROLES["DANH_MUC"].NHOM_THUOC_SUA]}
        editStatus={editStatusMemo}
      >
        <fieldset
          disabled={
            (checkRole([ROLES["DANH_MUC"].NHOM_THUOC_SUA]) &&
              Object.keys(dataEditDefault)?.length > 0) ||
            checkRole([ROLES["DANH_MUC"].NHOM_THUOC_THEM])
              ? false
              : true
          }
          style={{ width: "100%" }}
        >
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom form-custom--one-line"
          >
            <Form.Item
              label="Mã nhóm thuốc cấp 1"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã nhóm thuốc cấp 1!",
                },
                {
                  max: 20,
                  message:
                    "Vui lòng nhập mã nhóm thuốc cấp 1 không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã nhóm thuốc cấp 1!",
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui lòng nhập mã nhóm thuốc cấp 1"
              />
            </Form.Item>
            <Form.Item
              label="Tên nhóm thuốc cấp 1"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm thuốc cấp 1!",
                },
                {
                  max: 1000,
                  message:
                    "Vui lòng nhập tên nhóm thuốc cấp 1 không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên nhóm thuốc cấp 1!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên nhóm thuốc cấp 1"
              />
            </Form.Item>

            {editStatus && (
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

export default forwardRef(FormMeGrLv1);
