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
import { connect, useDispatch } from "react-redux";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
const Index = (props, ref) => {
  const { layerId } = props;
  const [form] = Form.useForm();
  const [dataEdit, setdataEdit] = useState(null);
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
    props.getListAllLoaiBenh({ page: "", size: "" });
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      chuongBenhId: props.dataSearch["chuongBenhId"],
      nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"],
      nhomBenhPhu1Id: props.dataSearch["nhomBenhPhu1Id"],
      nhomBenhPhu2Id: props.dataSearch["nhomBenhPhu2Id"],
      loaiBenhId: props.dataSearch["loaiBenhId"],
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
        setdataEdit(null);
      },
    }),
    []
  );

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        props
          .createOrEdit({ ...values, id: dataEdit?.id })
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
      nhomBenhPhu1Id: props.dataSearch["nhomBenhPhu1Id"] || null,
      nhomBenhPhu2Id: props.dataSearch["nhomBenhPhu2Id"] || null,
      loaiBenhId: props.dataSearch["loaiBenhId"] || null,
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
            label="M?? t??n b???nh"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? t??n b???nh!",
              },
              {
                max: 20,
                message: "Vui l??ng nh???p m?? t??n b???nh kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? t??n b???nh!",
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui l??ng nh???p m?? t??n b???nh"
            />
          </Form.Item>
          <Form.Item
            label="T??n t??n b???nh"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n t??n b???nh!",
              },
              {
                max: 1000,
                message: "Vui l??ng nh???p t??n t??n b???nh kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n t??n b???nh!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n t??n b???nh"
            />
          </Form.Item>
          <Form.Item label="Nh??m b???nh ch??nh" name="nhomBenhChinhId">
            <Select
              data={props.listAllNhomBenhChinh}
              placeholder="Ch???n nh??m b???nh ch??nh"
            />
          </Form.Item>
          <Form.Item label="Ch????ng b???nh" name="chuongBenhId">
            <Select
              data={props.listAllChuongBenh}
              placeholder="Ch???n ch????ng b???nh"
            />
          </Form.Item>
          <Form.Item label="Nh??m b???nh ph??? I" name="nhomBenhPhu1Id">
            <Select
              data={props.listAllNhomBenhPhu1}
              placeholder="Ch???n nh??m b???nh ph??? I"
            />
          </Form.Item>
          <Form.Item label="Nh??m b???nh ph??? II" name="nhomBenhPhu2Id">
            <Select
              data={props.listAllNhomBenhPhu2}
              placeholder="Ch???n nh??m b???nh ph??? II"
            />
          </Form.Item>
          <Form.Item label="Lo???i b???nh" name="loaiBenhId">
            <Select data={props.listAllLoaiBenh} placeholder="Ch???n lo???i b???nh" />
          </Form.Item>
          <Form.Item label="M?? nh??m BC BYT" name="maNhomByt">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? nh??m BC BYT"
            />
          </Form.Item>
          <Form.Item label="M?? nh??m chi ti???t" name="maNhomChiTiet">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? nh??m chi ti???t"
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
  maBenh: { createOrEdit },
  loaiBenh: { getListAllLoaiBenh },
}) => ({
  createOrEdit,
  getListAllLoaiBenh,
});

export default connect(
  (state) => {
    const {
      chuongBenh: { listAllData: listAllChuongBenh },
      nhomBenh: {
        listAllNhomBenhChinh,
        listAllNhomBenhPhu1,
        listAllNhomBenhPhu2,
      },
      loaiBenh: { listAllLoaiBenh },
      maBenh: { dataSearch },
    } = state;
    return {
      listAllChuongBenh,
      dataSearch,
      listAllNhomBenhChinh,
      listAllNhomBenhPhu1,
      listAllNhomBenhPhu2,
      listAllLoaiBenh,
    };
  },
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(forwardRef(Index));
