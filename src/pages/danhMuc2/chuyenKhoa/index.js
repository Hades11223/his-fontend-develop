import { Checkbox, Form, Input } from "antd";
import React from "react";
import { ListImage } from "components";
import BaseDmWrap from "components/BaseDmWrap";

const screenName = "chuyên khoa";

const ChuyenKhoa = ({}) => {
  const getColumns = ({ baseColumns }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    baseColumns.ghiChu,
    baseColumns.active,
  ];

  const renderForm = ({
    editStatus,
    autoFocus,
    refAutoFocus,
    checkChangeField,
  }) => {
    return (
      <>
        <Form.Item
          label={"Mã " + screenName}
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã " + screenName,
            },
            {
              max: 20,
              message:
                "Vui lòng nhập mã " + screenName + " không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã " + screenName,
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder={"Vui lòng nhập mã " + screenName}
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item
          label={"Tên " + screenName}
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên " + screenName,
            },
            {
              max: 1000,
              message:
                "Vui lòng nhập tên " + screenName + " không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên " + screenName,
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder={"Vui lòng nhập tên " + screenName}
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu">
          <Input.TextArea
            row={4}
            className="input-option"
            placeholder="Vui lòng nhập ghi chú"
            style={{ height: "105px" }}
          />
        </Form.Item>
        <Form.Item label="Logo" name="logo" valuePropName="files">
          <ListImage
            uploadImage={checkChangeField("logo")}
            provider="chuyenKhoa"
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
      titleMain={screenName}
      getColumns={getColumns}
      renderForm={renderForm}
      roleName={"CHUYEN_KHOA"}
      storeName="chuyenKhoa"
    />
  );
};

export default ChuyenKhoa;
