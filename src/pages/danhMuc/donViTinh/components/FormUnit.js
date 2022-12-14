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
        title="Th??ng tin chi ti???t"
        onCancel={onCancel}
        cancelText="H???y"
        onOk={handleAddNew}
        okText="L??u [F4]"
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
              label="M?? ????n v??? t??nh"
              style={{ width: "100%" }}
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? ????n v??? t??nh!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? ????n v??? t??nh kh??ng qu?? 20 k?? t???!",
                },
                {
                  pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                  message: "M?? ph???i c?? ??t nh???t m???t k?? t??? l?? ch???!",
                },
              ]}
            >
              <Input
                ref={refAutofocus}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? ????n v??? t??nh"
              />
            </Form.Item>
            <Form.Item
              label="T??n ????n v??? t??nh"
              name="ten"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n ????n v??? t??nh!",
                },
                {
                  max: 1000,
                  message:
                    "Vui l??ng nh???p t??n ????n v??? t??nh kh??ng qu?? 1000 k?? t???!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n ????n v??? t??nh"
              />
            </Form.Item>
            <Form.Item
              label="T??n nh??m ????n v??? t??nh"
              name="nhomDonViTinhId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n nh??m ????n v??? t??nh!",
                },
              ]}
            >
              <Select
                data={listGroupUnit}
                placeholder="Ch???n t??n nh??m ????n v??? t??nh"
              />
            </Form.Item>
            {showBox && (
              <Form.Item label=" " name="active" valuePropName="checked">
                <Checkbox>C?? hi???u l???c</Checkbox>
              </Form.Item>
            )}
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(CreateOrUpdateGroupUnit);
