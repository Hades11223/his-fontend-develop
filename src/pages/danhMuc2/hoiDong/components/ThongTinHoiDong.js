import { Checkbox, Form, Input } from "antd";
import Select from "components/Select";
import React from "react";
import { connect } from "react-redux";
import FormElement from "../../../../components/common/ElementForm";
import { ROLES } from "constants/index";
const ThongTinHoiDong = ({
  _dataSearch,
  _createOrEdit,
  _dataEdit,
  _getList,
  updateData,
  listLoaiHoiDongKiemKe,
  ...props
}) => {
  const renderForm = ({ form }) => {
    return (
      <>
        <Form.Item
          label="Mã hội đồng"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã Hội đồng!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã Hội đồng không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã hội đồng!",
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
          label="Tên hội đồng"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên hội đồng!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên hội đồng!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tên hội đồng"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="Loại hội đồng"
          name="loai"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại hội đồng!",
            },
          ]}
        >
          <Select
            data={listLoaiHoiDongKiemKe}
            placeholder="Chọn loại hội đồng"
          />
        </Form.Item>

        {_dataEdit?.id && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <FormElement
      {...props}
      title="Thông tin hội đồng"
      renderForm={renderForm}
      createOrEdit={_createOrEdit}
      dataEdit={_dataEdit}
      updateData={updateData}
      getData={_getList}
      dataSearch={_dataSearch}
      roleSave={[ROLES["DANH_MUC"].HOI_DONG_THEM]}
      roleEdit={[ROLES["DANH_MUC"].HOI_DONG_SUA]}
    />
  );
};

export default connect(
  ({
    hoiDongKiemKe: { _dataEdit, _dataSearch },
    utils: { listLoaiHoiDongKiemKe },
  }) => ({
    listLoaiHoiDongKiemKe,
    _dataEdit,
    _dataSearch,
  }),
  ({ hoiDongKiemKe: { _createOrEdit, _getList, updateData } }) => ({
    _createOrEdit,
    updateData,
    _getList,
  })
)(ThongTinHoiDong);
