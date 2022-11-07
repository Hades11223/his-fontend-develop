import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Input, Form } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
const ThongTinChiTietQuyenKy = ({
  stateParent,
  setStateParent,
  refCallbackSave = {},
}) => {
  const {
    quyenKy: { dataEditDefault },
  } = useSelector((state) => state);
  const {
    quyenKy: { onSizeChange, createOrEdit },
    utils: { getUtils },
  } = useDispatch();

  const [form] = Form.useForm();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (dataEditDefault) {
      setState({ ...stateParent });
      if (
        !stateParent.editStatus &&
        stateParent.mauBaoCao === null &&
        stateParent.defaultFileList?.length === 0 &&
        !stateParent.invalidMauBaoCao
      ) {
        form.resetFields();
      } else {
        // console.log("dataEditDefault: ", dataEditDefault);
        form.setFieldsValue({
          ...dataEditDefault,
        });
      }
    }
  }, [dataEditDefault, stateParent]);

  useEffect(() => {
    onSizeChange({ size: 10 });
    getUtils({ name: "huongGiay" });
    getUtils({ name: "khoGiay" });
    getUtils({ name: "DinhDangBaoCao" });
  }, []);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        console.log("values: ", values);
        // if (!state.mauBaoCao) {
        //     setState({
        //         invalidMauBaoCao: true,
        //     });
        //     return;
        // }
        let formattedData = {
          ...values,
          ma: values?.ma?.trim(),
          ten: values?.ten?.trim(),
          chieuDoc: values.chieuDoc || null,
          chieuNgang: values.chieuNgang || null,
          mauBaoCao: state.mauBaoCao,
          dinhDang: values.dinhDang || null,
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }

        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
          setState({
            mauBaoCao: null,
            defaultFileList: [],
          });
          setStateParent({
            isSelected: false,
          });
        });
      })
      .catch((error) => {
        if (!state.mauBaoCao) {
          setState({
            invalidMauBaoCao: true,
          });
          return;
        }
      });
  };
  refCallbackSave.current = handleAdded;

  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [stateParent]);
  const onChangeKhoGiay = (val) => {
    setState({
      isRequiredKichThuoc: val === 200,
    });
    form.validateFields();
  };
  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
    setStateParent({
      isSelected: true,
    });
  };
  const handleHiddenCancel = () => {
    let roleSave = [ROLES["DANH_MUC"].QUYEN_KY_THEM];
    let roleEdit = [ROLES["DANH_MUC"].QUYEN_KY_SUA];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };

  return (
    <CreatedWrapper
      title="Thông tin chi tiết"
      onCancel={handleCancel}
      cancelText="Hủy"
      onOk={handleAdded}
      okText="Lưu [F4]"
      roleSave={[ROLES["DANH_MUC"].QUYEN_KY_THEM]}
      roleEdit={[ROLES["DANH_MUC"].QUYEN_KY_SUA]}
      editStatus={state.editStatus}
    >
      <FormWraper
        disabled={
          state.editStatus
            ? !checkRole([ROLES["DANH_MUC"].QUYEN_KY_SUA])
            : !checkRole([ROLES["DANH_MUC"].QUYEN_KY_THEM])
        }
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        className="form-custom"
      >
        <Form.Item
          label="Mã quyền ký"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã quyền ký!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã quyền ký!",
            },
          ]}
        >
          <Input
            autoFocus={true}
            className="input-option"
            placeholder="Vui lòng nhập mã quyền ký"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên quyền ký"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên quyền ký!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên quyền ký!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên quyền ký"
          />
        </Form.Item>
        {state.editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </FormWraper>
    </CreatedWrapper>
  );
};

export default ThongTinChiTietQuyenKy;
