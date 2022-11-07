import { Checkbox, Form, Input } from "antd";
import { ROLES } from "constants/index";
import React from "react";
import { connect } from "react-redux";
import FormElement from "components/common/ElementForm";

const FormChiTietKichCo = ({
  _dataSearch,
  _createOrEdit,
  _dataEdit,
  _dataFilter,
  _getList,
  updateData,
  listLoaiHoiDongKiemKe,
  ...props
}) => {
  const validator = (maxLength, content) => (rule, value, callback) => {
    if (value) {
      if (value.length > maxLength) {
        callback(new Error(content));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  const renderForm = ({ form }) => {
    return (
      <>
        <Form.Item
          label="Mã"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã!",
            },
            {
              validator: validator(23),
              message: "Quá độ dài. Độ dài quy định từ 1-23 kí tự",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã hội đồng"
            autoFocus
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên!",
            },
            {
              validator: validator(1024),
              message: "Quá độ dài. Độ dài quy định từ 1-1024 kí tự",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tên"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="Mã tương đương"
          name="maTuongDuong"
          rules={[
            {
              validator: validator(255),
              message: "Quá độ dài. Độ dài quy định từ 0-255 kí tự",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="Tên kích cỡ trúng thầu"
          name="tenTrungThau"
          rules={[
            {
              validator: validator(1024),
              message: "Quá độ dài. Độ dài quy định từ 0-1024 kí tự",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tên"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item initialValue={true} name="active" valuePropName="checked">
          <Checkbox>Có hiệu lực</Checkbox>
        </Form.Item>
      </>
    );
  };
  const mapToBody = (values) => {
    return { ...values, dichVuId: _dataEdit.id, id: _dataFilter.id };
  };
  return (
    <FormElement
      {...props}
      title="Thông tin hội đồng"
      renderForm={renderForm}
      createOrEdit={_createOrEdit}
      dataEdit={_dataFilter}
      updateData={updateData}
      getData={_getList}
      dataSearch={_dataSearch}
      roleSave={[ROLES["DANH_MUC"].VAT_TU_SUA]}
      roleEdit={[ROLES["DANH_MUC"].VAT_TU_THEM]}
      mapToBody={mapToBody}
    />
  );
};

export default connect(
  ({
    kichCo: { _dataSearch, _dataFilter },
    danhMucVatTu: { currentItem: _dataEdit },
  }) => ({
    _dataFilter,
    _dataEdit,
    _dataSearch,
  }),
  ({ kichCo: { _createOrEdit, _getList, updateData } }) => ({
    _createOrEdit,
    updateData,
    _getList,
  })
)(FormChiTietKichCo);
