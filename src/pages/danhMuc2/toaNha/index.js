import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const { ColumnInput } = TableWrapper;

const ToaNha = ({}) => {
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Mô tả",
      dataIndex: "ghiChu",
      width: 200,
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã tòa nhà"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã tòa nhà!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã tòa nhà không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã tòa nhà!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã tòa nhà"
          />
        </Form.Item>
        <Form.Item
          label="Tên tòa nhà"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tòa nhà!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên tòa nhà không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên tòa nhà!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên tòa nhà"
          />
        </Form.Item>
        <Form.Item label="Mô tả" name="ghiChu" style={{ width: "100%" }}>
          <Input.TextArea
            style={{ height: 120 }}
            placeholder="Nhập mô tả"
            showCount
            maxLength={1000}
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
      titleMain="tòa nhà"
      roleName="NHA"
      storeName="toaNha"
      classNameForm={"form-custom--one-line"}
      renderForm={renderForm}
      getColumns={getColumns}
    />
  );
};

export default ToaNha;
