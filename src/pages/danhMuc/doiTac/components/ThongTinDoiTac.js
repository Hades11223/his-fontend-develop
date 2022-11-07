import React, { useState, useEffect, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import { Form, Input, Checkbox, Button } from "antd";
import { connect } from "react-redux";
import CreatedWrapper from "components/CreatedWrapper";
import FormWraper from "components/FormWraper";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";

function FormServiceInfo(props, ref) {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { listPartnerType, currentItem, refCallbackSave } = props;
  useEffect(() => {
    loadCurrentItem(currentItem);
  }, [currentItem]);

  const [form] = Form.useForm();

  const loadCurrentItem = (doiTac) => {
    if (doiTac) {
      const { ma, ten, diaChi, loaiDoiTac, id, maSoThue, soTaiKhoan, active } =
        doiTac || {};
      const data = {
        ma,
        ten,
        diaChi,
        loaiDoiTac,
        id,
        maSoThue,
        soTaiKhoan,
        active,
      };
      form.setFieldsValue(doiTac);
      setState({
        data: data,
      });
    } else {
      form.resetFields();
      setState({
        data: null,
      });
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
  };

  const onCancel = () => {
    loadCurrentItem(props.currentItem);
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        values = {
          ...values,
          id: state.data?.id,
        };

        props.createOrEdit(values).then(() => {});
      })
      .catch((error) => {});
  };
  refCallbackSave.current = onSave;
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  return (
    <CreatedWrapper
      title="Thông tin chi tiết"
      onCancel={onCancel}
      onOk={onSave}
      okText="Lưu [F4]"
      cancelText="Hủy"
      roleSave={[ROLES["DANH_MUC"].DOI_TAC_THEM]}
      roleEdit={[ROLES["DANH_MUC"].DOI_TAC_SUA]}
      editStatus={currentItem?.id}
    >
      <FormWraper
        disabled={
          currentItem?.id
            ? !checkRole([ROLES["DANH_MUC"].DOI_TAC_SUA])
            : !checkRole([ROLES["DANH_MUC"].DOI_TAC_THEM])
        }
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        className="form-custom"
      >
        <Form.Item
          label="Mã đối tác"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã đối tác!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã đối tác không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã đối tác!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã đối tác"
            // ref={refAutoFocus}
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên đối tác"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đối tác!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên đối tác không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên đối tác!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên đối tác"
          />
        </Form.Item>
        <Form.Item
          label="Mã số thuế"
          name="maSoThue"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã số thuế!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã số thuế!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã số thuế"
          />
        </Form.Item>
        <Form.Item label="Số tài khoản" name="soTaiKhoan">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập số tài khoản ngân hàng"
          />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="diaChi">
          <Input className="input-option" placeholder="Vui lòng nhập địa chỉ" />
        </Form.Item>
        <Form.Item
          label="Loại đối tác"
          name="loaiDoiTac"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại đối tác",
            },
          ]}
        >
          <Select data={listPartnerType} placeholder="Chọn loại đối tác" />
        </Form.Item>
        <Form.Item label="Người đại diện" name="nguoiDaiDien">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên người đại diện"
          />
        </Form.Item>
        <Form.Item label="Chức vụ người đại diện" name="chucVuNguoiDaiDien">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập chức vụ người đại diện"
          />
        </Form.Item>
        <Form.Item label="SĐT người đại diện" name="sdtNguoiDaiDien">
          <Input
            type="number"
            className="input-option"
            placeholder="Vui lòng nhập SĐT người đại diện"
          />
        </Form.Item>
        <Form.Item label="Tên người đầu mối" name="nguoiDauMoi">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên người đầu mối"
          />
        </Form.Item>
        <Form.Item label="SĐT người đầu mối" name="sdtNguoiDauMoi">
          <Input
            type="number"
            className="input-option"
            placeholder="Vui lòng nhập SĐT người đầu mối"
          />
        </Form.Item>
        <Form.Item label="Email người đầu mối" name="emailNguoiDauMoi">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập email người đầu mối"
          />
        </Form.Item>

        <Form.Item label="Tên ngân hàng" name="tenNganHang">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên ngân hàng"
          />
        </Form.Item>

        <Form.Item label="Chủ tài khoản ngân hàng" name="chuTaiKhoan">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập Chủ tài khoản ngân hàng"
          />
        </Form.Item>
        <Form.Item label="Người chi cộng tác" name="nguoiChiCongTac">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập người chi cộng tác"
          />
        </Form.Item>
        <Form.Item label="SĐT người chi cộng tác" name="sdtNguoiChiCongTac">
          <Input
            type="number"
            className="input-option"
            placeholder="Vui lòng nhập SĐT người cộng tác"
          />
        </Form.Item>
        {currentItem?.id ? (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        ) : null}
      </FormWraper>
    </CreatedWrapper>
  );
}

const mapDispatchToProps = ({ doiTac: { createOrEdit } }) => ({ createOrEdit });

export default connect(() => ({}), mapDispatchToProps)(FormServiceInfo);
