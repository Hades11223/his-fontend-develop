import { Checkbox, Form, Input, InputNumber } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const { ColumnInput } = TableWrapper;

const LieuDung = ({}) => {
  const getColumns = ({ baseColumns = [], ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Số lần/ ngày",
      dataIndex: "soLan1Ngay",
      ...rest,
    }),
    ColumnInput({
      title: "Số viên/ lần",
      dataIndex: "soVien1Lan",
      ...rest,
    }),
    baseColumns.active,
  ];

  const onUpdateData = (e, item, form) => {
    if (+e <= 0) {
      form.setFieldsValue({ [item]: null });
    } else {
      form.setFieldsValue({ [item]: e });
    }
  };

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã liều dùng"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã liều dùng!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã liều dùng không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã liều dùng!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã liều dùng"
            ref={refAutoFocus}
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên liều dùng"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên liều dùng!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên liều dùng không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên liều dùng!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên liều dùng"
          />
        </Form.Item>
        <Form.Item label="Số lần/ ngày" name="soLan1Ngay">
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập số lần/ ngày"
            onChange={(e) => {
              onUpdateData(e, "soLan1Ngay", form);
            }}
            type="number"
          />
        </Form.Item>
        <Form.Item label="Số viên/ lần" name="soVien1Lan">
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập số viên/ lần"
            onChange={(e) => {
              onUpdateData(e, "soVien1Lan", form);
            }}
            type="number"
          />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  return (
    <BaseDmWrap
      titleMain="liều dùng"
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="LIEU_DUNG"
      classNameForm={"form-custom--one-line"}
      storeName="lieuDung"
    />
  );
};

export default LieuDung;
