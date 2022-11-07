import { Checkbox, Form, Input, InputNumber } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";
import TableWrapper from "components/TableWrapper";

const { ColumnDm, ColumnInput } = TableWrapper;
const screenName = "đường dùng";

const DuongDung = ({}) => {
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      ...rest,
      title: "Thứ tự hiển thị",
      dataIndex: "stt",
    }),
    // baseColumns.thuTuHienThi,
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
        <Form.Item label="Thứ tự hiển thị" name="stt" style={{ width: "100%" }}>
          <InputNumber
            className="input-option"
            placeholder="Nhập thứ tự hiển thị"
            type="number"
            min={0}
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
      roleName="DUONG_DUNG"
      storeName="duongDung"
    />
  );
};

export default DuongDung;
