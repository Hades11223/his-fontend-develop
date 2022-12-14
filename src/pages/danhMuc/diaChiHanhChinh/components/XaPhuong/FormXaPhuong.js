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
const FormXaPhuong = (
  {
    handleSubmit,
    listAllTinh1,
    listAllQuanHuyen,
    onCancel,
    dataSearch,
    editStatus,
    layerId,
    ...props
  },
  ref
) => {
  const [form] = Form.useForm();
  const [dataEdit, setdataEdit] = useState(null);
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
      tinhThanhPhoId: dataSearch["tinhThanhPhoId"] || null,
      quocGiaId: dataSearch["quocGiaId"] || null,
      quanHuyenId: dataSearch["quanHuyenId"] || null,
    });
  }, [dataSearch]);
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.info?.id) {
          form.setFieldsValue({
            ...data?.info,
            tinhThanhPhoId: data?.info?.tinhThanhPho?.id,
            quocGiaId: data?.info?.quocGia?.id,
            quanHuyenId: data?.info?.quanHuyen?.id,
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
          quanHuyenId: data?.data["quanHuyenId"] || null,
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
              label="M?? x??/ph?????ng"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? x??/ph?????ng!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? x??/ph?????ng kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? x??/ph?????ng!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: "M?? ph???i c?? ??t nh???t m???t k?? t??? l?? ch???!",
                // },
              ]}
            >
              <Input
                autoFocus={true}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? x??/ph?????ng"
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label="T??n x??/ph?????ng"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n x??/ph?????ng!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p t??n x??/ph?????ng kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n x??/ph?????ng!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p x??/ph?????ng"
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
                placeholder="Vui l??ng nh???p t??n vi???t t???t"
                onChange={(e) => onUpdateData(e.target.value, "vietTat")}
              />
            </Form.Item>
            <Form.Item
              label="Qu???n/huy???n"
              name="quanHuyenId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ch???n qu???n/huy???n!",
                },
              ]}
            >
              <Select data={listAllQuanHuyen} placeholder="Ch???n qu???n/huy???n" />
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
    listAllQuanHuyen: state.ttHanhChinh.listAllQuanHuyen,
  };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  forwardRef(FormXaPhuong)
);
