import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, Input, Form } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import Select from "components/Select";
import nhomDonViTinhProvider from "data-access/categories/dm-nhom-don-vi-tinh-provider";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useDispatch } from "react-redux";
const CreateOrUpdateGroupUnit = (
  { handleSubmit, onCancel, editStatus, layerId },
  ref
) => {
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const [showBox, setShowBox] = useState(false);
  const [form] = Form.useForm();
  const [listGroupUnit, setGroupUnit] = useState();
  const [currentItem, setCurrentItem] = useState({});
  useEffect(() => {
    getListDepartment();
  }, []);

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

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        const nhomDonViTinh = listGroupUnit.find(
          (item) => item.id === values.nhomDonViTinhId
        );
        if (nhomDonViTinh?.action) {
          delete nhomDonViTinh["action"];
        }
        handleSubmit({ ...values, nhomDonViTinh });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAddNew;
  refClickBtnAdd.current = () => {
    setCurrentItem({});
    form.resetFields();
    if (refAutofocus.current) {
      refAutofocus.current.focus();
    }
  };

  const getListDepartment = () => {
    return nhomDonViTinhProvider
      .search({ page: 0, active: true, sort: "ten,asc", size: 500 })
      .then((response) => {
        setGroupUnit(response.data);
      });
  };
  const refAutofocus = useRef(null);
  useEffect(() => {
    if (refAutofocus.current) {
      refAutofocus.current.focus();
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
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label="Mã đơn vị tính"
              style={{ width: "100%" }}
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã đơn vị tính!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập mã đơn vị tính không quá 20 ký tự!",
                },
                {
                  pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                  message: "Mã phải có ít nhất một ký tự là chữ!",
                },
              ]}
            >
              <Input
                ref={refAutofocus}
                className="input-option"
                placeholder="Vui lòng nhập mã đơn vị tính"
              />
            </Form.Item>
            <Form.Item
              label="Tên đơn vị tính"
              name="ten"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đơn vị tính!",
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
                placeholder="Vui lòng nhập tên đơn vị tính"
              />
            </Form.Item>
            <Form.Item
              label="Tên nhóm đơn vị tính"
              name="nhomDonViTinhId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm đơn vị tính!",
                },
              ]}
            >
              <Select
                data={listGroupUnit}
                placeholder="Chọn tên nhóm đơn vị tính"
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
