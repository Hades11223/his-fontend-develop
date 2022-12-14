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
import { connect, useDispatch } from "react-redux";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
const Index = (props, ref) => {
  const { layerId } = props;
  const [form] = Form.useForm();
  const [dataEdit, setdataEdit] = useState({});
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
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
    return () => {
      if (layerId) {
        onRemoveLayer({ layerId });
      }
    };
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      chuongBenhId: props.dataSearch["chuongBenhId"],
      nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"],
    });
  }, [props.dataSearch]);
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        form.setFieldsValue(data);
        setdataEdit(data);
      },
      resetFields: () => {
        onResetDataSearch();
        setdataEdit({});
      },
    }),
    []
  );

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        props
          .createOrEdit({ ...values, id: dataEdit?.id, loaiNhomBenh: 20 })
          .then(() => {
            if (!dataEdit?.id) {
              onResetDataSearch();
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
  const onCancel = () => {
    if (dataEdit?.id) {
      form.setFieldsValue(dataEdit);
    } else {
      onResetDataSearch();
    }
  };
  const onResetDataSearch = () => {
    form.resetFields();
    form.setFieldsValue({
      chuongBenhId: props.dataSearch["chuongBenhId"] || null,
      nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"] || null,
    });
  };
  const onUpdate = (key) => (e) => {
    if (key === "chuongBenhId") {
      props.getAllNhomBenh({ loaiNhomBenh: 10, [key]: e });
    }
    form.setFieldsValue({ [key]: e });
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
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="M?? nh??m b???nh ph??? I"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? nh??m b???nh ph??? I!",
              },
              {
                max: 20,
                message: "Vui l??ng nh???p m?? nh??m b???nh ph??? I kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? nh??m b???nh ph??? I!",
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui l??ng nh???p m?? nh??m b???nh ph??? I"
            />
          </Form.Item>
          <Form.Item
            label="T??n nh??m b???nh ph??? I"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n nh??m b???nh ph??? I!",
              },
              {
                max: 1000,
                message:
                  "Vui l??ng nh???p t??n nh??m b???nh ph??? I kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n nh??m b???nh ph??? I!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n nh??m b???nh ph??? I"
            />
          </Form.Item>
          <Form.Item
            label="Ch????ng b???nh"
            name="chuongBenhId"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ch????ng b???nh!",
              },
            ]}
          >
            <Select
              data={props.listAllChuongBenh}
              placeholder="Ch???n ch????ng b???nh"
              onChange={onUpdate("chuongBenhId")}
            />
          </Form.Item>
          <Form.Item
            label="Nh??m b???nh ch??nh"
            name="nhomBenhChinhId"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m b???nh ch??nh!",
              },
            ]}
          >
            <Select
              data={props.listAllNhomBenhChinh}
              placeholder="Ch???n nh??m b???nh ch??nh"
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

const mapDispatchToProps = ({
  nhomBenh: { createOrEdit, getAllNhomBenh },
}) => ({
  createOrEdit,
  getAllNhomBenh,
});

export default connect(
  (state) => {
    const {
      chuongBenh: { listAllData: listAllChuongBenh },
      nhomBenh: { dataSearch, listAllNhomBenhChinh },
    } = state;
    return { listAllChuongBenh, dataSearch, listAllNhomBenhChinh };
  },
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(forwardRef(Index));
