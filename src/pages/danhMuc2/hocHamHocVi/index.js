import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const { ColumnInput } = TableWrapper;
const screenName = "học hàm học vị";

const HocHamHocVi = ({}) => {
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    ColumnInput({
      title: "Tên viết tắt",
      dataIndex: "vietTat",
      width: 150,
      ...rest,
    }),
    baseColumns.ten,
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus }) => {
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
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên viết tắt học hàm học vị"
          name="vietTat"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên viết tắt học hàm học vị!",
            },
            {
              max: 20,
              message:
                "Vui lòng nhập tên viết tắt học hàm học vị không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên viết tắt học hàm học vị!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên viết tắt học hàm học vị"
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
        {editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
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
      roleName={"HOC_HAM"}
      storeName="hocHamHocVi"
      classNameForm={"form-custom--one-line"}
    />
  );
};

export default HocHamHocVi;
