import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const { ColumnCheckbox } = TableWrapper;
const screenName = "lời dặn";

const LoiDan = ({}) => {
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnCheckbox({
      title: "Dành cho thuốc",
      dataSearch: ["Dành cho thuốc", "Không dành cho thuốc"],
      dataIndex: "danhChoThuoc",
      width: 100,
      render: (item) => (item != null ? <Checkbox checked={item} /> : ""),
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã lời dặn"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã lời dặn!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã lời dặn không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã lời dặn!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã lời dặn"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên lời dặn"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên lời dặn!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên lời dặn không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên lời dặn!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên lời dặn"
          />
        </Form.Item>
        <Form.Item name="danhChoThuoc" valuePropName="checked">
          <Checkbox>Dành cho thuốc</Checkbox>
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
      roleName="LOI_DAN"
      classNameForm={"form-custom--one-line"}
      storeName="loiDan"
    />
  );
};

export default LoiDan;
