import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const { ColumnCheckbox } = TableWrapper;
const nameScreen = "lý do tạm ứng";

const LyDoTamUng = ({}) => {
  const getColumns = ({ baseColumns = [], ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnCheckbox({
      title: "Lý do hoàn",
      dataIndex: "hoanUng",
      dataSearch: ["Có hoàn", "Không hoàn"],
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label={`Mã ${nameScreen}`}
          name="ma"
          rules={[
            {
              required: true,
              message: `Vui lòng nhập mã ${nameScreen}!`,
            },
            {
              max: 20,
              message: `Vui lòng nhập mã ${nameScreen} không quá 20 ký tự!`,
            },
            {
              whitespace: true,
              message: `Vui lòng nhập mã ${nameScreen}!`,
            },
          ]}
        >
          <Input
            autoFocus={autoFocus}
            className="input-option"
            placeholder={`Vui lòng nhập mã ${nameScreen}`}
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label={`Tên ${nameScreen}`}
          name="ten"
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${nameScreen}!`,
            },
            {
              max: 1000,
              message: `Vui lòng nhập ${nameScreen} không quá 1000 ký tự!`,
            },
            {
              whitespace: true,
              message: `Vui lòng nhập ${nameScreen}!`,
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder={`Vui lòng nhập ${nameScreen}`}
          />
        </Form.Item>
        <Form.Item name="hoanUng" valuePropName="checked">
          <Checkbox>Lý do hoàn</Checkbox>
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
      roleName="LY_DO_TAM_UNG"
      classNameForm={"form-custom--one-line"}
      storeName="lyDoTamUng"
    />
  );
};

export default LyDoTamUng;
