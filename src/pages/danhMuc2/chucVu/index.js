import { Checkbox, Form, Input } from "antd";
import React from "react";
import BaseDmWrap from "components/BaseDmWrap";

const screenName = "chức vụ";

const ChucVu = ({}) => {
  const getColumns = ({ baseColumns = {} }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    baseColumns.ghiChu,
    baseColumns.active,
  ];

  const renderForm = ({ editStatus }) => {
    return (
      <>
        <Form.Item
          label={"Mã " + screenName}
          name="ma"
          style={{ width: "100%" }}
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
            placeholder="Vui lòng nhập mã"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label={"Tên " + screenName}
          name="ten"
          style={{ width: "100%" }}
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
          <Input className="input-option" placeholder="Vui lòng nhập tên" />
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu" style={{ width: "100%" }}>
          <Input.TextArea
            row={4}
            placeholder="Vui lòng nhập ghi chú"
            style={{ height: "auto" }}
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
      titleMain={screenName}
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="CHUC_VU"
      storeName="chucVu"
    />
  );
};

export default ChucVu;
