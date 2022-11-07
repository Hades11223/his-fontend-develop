import React from "react";
import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";

const { TextArea } = Input;

const NhomChiSo = ({}) => {
  const getColumns = ({ baseColumns = {} }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    baseColumns.moTa,
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, autoFocus, refAutoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã nhóm chỉ số"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã nhóm chỉ số!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã nhóm chỉ số không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã nhóm chỉ số!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã nhóm chỉ số"
          />
        </Form.Item>
        <Form.Item
          label="Tên nhóm chỉ số"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhóm chỉ số!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên nhóm chỉ số không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên nhóm chỉ số!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên nhóm chỉ số"
          />
        </Form.Item>
        <Form.Item label="Mô tả" name="moTa">
          <TextArea
            rows={4}
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
      titleMain="nhóm chỉ số"
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="NHOM_CHI_SO"
      storeName="nhomChiSo"
    />
  );
};

export default NhomChiSo;
