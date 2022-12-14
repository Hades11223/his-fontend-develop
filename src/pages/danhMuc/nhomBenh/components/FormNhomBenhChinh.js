import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { Checkbox, Input, Form } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import Select from "components/Select";
import { connect } from "react-redux";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
import { useDispatch } from "react-redux";
const Index = (props, ref) => {
  const [form] = Form.useForm();
  const { dataSearch, layerId } = props;
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
  }, []);
  useEffect(() => {
    form.setFieldsValue({ chuongBenhId: dataSearch["chuongBenhId"] });
  }, [dataSearch]);
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
          .createOrEdit({ ...values, id: dataEdit?.id, loaiNhomBenh: 10 })
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
    onResetDataSearch();
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
      chuongBenhId: dataSearch["chuongBenhId"],
    });
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
            label="M?? nh??m b???nh ch??nh"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? nh??m b???nh ch??nh!",
              },
              {
                max: 20,
                message: "Vui l??ng nh???p m?? nh??m b???nh ch??nh kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? nh??m b???nh ch??nh!",
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui l??ng nh???p m?? nh??m b???nh ch??nh"
            />
          </Form.Item>
          <Form.Item
            label="T??n nh??m b???nh ch??nh"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n nh??m b???nh ch??nh!",
              },
              {
                max: 1000,
                message:
                  "Vui l??ng nh???p t??n nh??m b???nh ch??nh kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n nh??m b???nh ch??nh!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n nh??m b???nh ch??nh"
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

const mapDispatchToProps = ({ nhomBenh: { createOrEdit } }) => ({
  createOrEdit,
});

export default connect(
  (state) => {
    const {
      chuongBenh: { listAllData: listAllChuongBenh },
      nhomBenh: { dataSearch },
    } = state;
    return { listAllChuongBenh, dataSearch };
  },
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(forwardRef(Index));
