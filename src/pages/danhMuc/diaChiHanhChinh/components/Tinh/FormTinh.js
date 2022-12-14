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
import { connect } from "react-redux";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useDispatch } from "react-redux";
const FormTinh = (
  { handleSubmit, dataSearch, onCancel, editStatus, layerId, ...props },
  ref
) => {
  const [form] = Form.useForm();
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
  useEffect(() => {
    form.setFieldsValue({ quocGiaId: dataSearch.quocGiaId || null });
  }, [dataSearch]);
  const [dataEdit, setdataEdit] = useState(null);
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
        form.setFieldsValue({
          quocGiaId: data?.data["quocGiaId"] || null,
        });
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
    setdataEdit({});
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };
  const onUpdateData = (e, type) => {
    form.setFieldsValue({ [type]: e.toLowerCase().replaceAll(" ", "") });
  };
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
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label="M?? t???nh/tp"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? t???nh/tp!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? t???nh/tp kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? t???nh/tp!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: "M?? ph???i c?? ??t nh???t m???t k?? t??? l?? ch???!",
                // },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p m?? t???nh/tp"
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label="T??n t???nh/tp"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n t???nh/tp!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p t??n t???nh/tp kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n t???nh/tp!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t???nh/tp"
              />
            </Form.Item>
            <Form.Item
              label="T??n vi???t t???t"
              name="vietTat"
              rules={[
                {
                  pattern: new RegExp(/^.{1,2}$/),
                  message: "Vui l??ng nh???p t??n vi???t t???t kh??ng qu?? 2 k?? t???!",
                },
              ]}
            >
              <Input
                className="input-option"
                onChange={(e) => onUpdateData(e.target.value, "vietTat")}
                placeholder="Vui l??ng nh???p t??n vi???t t???t"
              />
            </Form.Item>
            <Form.Item
              label="Qu???c gia"
              name="quocGiaId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ch???n qu???c gia!",
                },
              ]}
            >
              <Select data={props.listAllQuocGia} placeholder="Ch???n qu???c gia" />
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

const mapStateToProps = (state) => {
  return {
    listAllQuocGia: state.ttHanhChinh.listAllQuocGia,
  };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  forwardRef(FormTinh)
);
