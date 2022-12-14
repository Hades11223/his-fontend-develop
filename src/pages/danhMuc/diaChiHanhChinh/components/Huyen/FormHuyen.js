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

const FormHuyen = (
  { handleSubmit, listAllTinh1, onCancel, dataSearch, editStatus, layerId, ...props },
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
    form.setFieldsValue({
      quocGiaId: dataSearch["quocGiaId"] || null,
      tinhThanhPhoId: dataSearch["tinhThanhPhoId"] || null,
    });
  }, [dataSearch]);
  const [dataEdit, setdataEdit] = useState(null);
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.info?.id) {
          form.setFieldsValue({
            ...data?.info,
            quocGiaId: data?.info?.quocGia?.id,
            tinhThanhPhoId: data?.info?.tinhThanhPho?.id,
          });
          setdataEdit(data?.info?.id);
        } else {
          form.resetFields();
          setdataEdit(null);
        }
      },
      resetFields: (data) => {
        form.resetFields();
        form.setFieldsValue({
          tinhThanhPhoId: data?.data["tinhThanhPhoId"] || null,
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
              label="M?? qu???n/huy???n"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? qu???n/huy???n!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? qu???n/huy???n kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? qu???n/huy???n!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: "M?? ph???i c?? ??t nh???t m???t k?? t??? l?? ch???!",
                // },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p m?? qu???n/huy???n"
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label="T??n qu???n/huy???n"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n qu???n/huy???n!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p t??n qu???n/huy???n kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n qu???n/huy???n!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p qu???n/huy???n"
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
              label="T???nh/Tp"
              name="tinhThanhPhoId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ch???n t???nh/tp!",
                },
              ]}
            >
              <Select data={listAllTinh1} placeholder="Ch???n t???nh/tp" />
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
    listAllTinh1: state.ttHanhChinh.listAllTinh1,
  };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  forwardRef(FormHuyen)
);
