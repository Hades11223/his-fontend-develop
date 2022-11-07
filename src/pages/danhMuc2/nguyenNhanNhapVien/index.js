import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const { ColumnInput } = TableWrapper;
const nameScreen = "nguyên nhân nhập viện";

const NguyenNhanNhapVien = ({}) => {
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    ColumnInput({
      title: "Mã đẩy BHYT",
      dataIndex: "maBhyt",
      ...rest,
      // render: (_, data) => data.maBhyt,
    }),
    baseColumns.ten,
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã nguyên nhân"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã nguyên nhân!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã nguyên nhân không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã nguyên nhân!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã nguyên nhân"
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Mã đẩy BHYT"
          name="maBhyt"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã"
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên nguyên nhân"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nguyên nhân!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên nguyên nhân không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên nguyên nhân!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên nguyên nhân"
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
      titleMain={nameScreen}
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="NGUYEN_NHAN_NHAP_VIEN"
      classNameForm={"form-custom--one-line"}
      storeName="nguyenNhanNhapVien"
    />
  );
};

export default NguyenNhanNhapVien;
