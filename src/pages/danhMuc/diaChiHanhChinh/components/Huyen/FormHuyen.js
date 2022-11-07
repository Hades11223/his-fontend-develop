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
        title="Thông tin chi tiết"
        onCancel={onCancel}
        cancelText="Hủy"
        onOk={handleAddNew}
        okText="Lưu [F4]"
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
              label="Mã quận/huyện"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã quận/huyện!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập mã quận/huyện không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã quận/huyện!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: "Mã phải có ít nhất một ký tự là chữ!",
                // },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập mã quận/huyện"
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label="Tên quận/huyện"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên quận/huyện!",
                },
                {
                  max: 1000,
                  message: "Vui lòng nhập tên quận/huyện không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên quận/huyện!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập quận/huyện"
              />
            </Form.Item>
            <Form.Item
              label="Tên viết tắt"
              name="vietTat"
              rules={[
                {
                  pattern: new RegExp(/^.{1,2}$/),
                  message: "Vui lòng nhập tên viết tắt không quá 2 ký tự!",
                },
              ]}
            >
              <Input
                className="input-option"
                onChange={(e) => onUpdateData(e.target.value, "vietTat")}
                placeholder="Vui lòng nhập tên viết tắt"
              />
            </Form.Item>
            <Form.Item
              label="Tỉnh/Tp"
              name="tinhThanhPhoId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập chọn tỉnh/tp!",
                },
              ]}
            >
              <Select data={listAllTinh1} placeholder="Chọn tỉnh/tp" />
            </Form.Item>
            <Form.Item
              label="Quốc gia"
              name="quocGiaId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập chọn quốc gia!",
                },
              ]}
            >
              <Select data={props.listAllQuocGia} placeholder="Chọn quốc gia" />
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

const mapStateToProps = (state) => {
  return {
    listAllQuocGia: state.ttHanhChinh.listAllQuocGia,
    listAllTinh1: state.ttHanhChinh.listAllTinh1,
  };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  forwardRef(FormHuyen)
);
