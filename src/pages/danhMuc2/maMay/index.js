import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React from "react";

const nameScreen = "mã máy";

const PTTT = ({}) => {
  const getColumns = ({
    baseColumns = {},
    onClickSort,
    dataSortColumn,
    onSearchInput,
  }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    {
      title: (
        <HeaderSearch
          title="Mã máy gửi BHYT"
          sort_key="maBhyt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maBhyt || 0}
          search={
            <Input
              placeholder="Tìm mã máy gửi BHYT"
              onChange={onSearchInput("maBhyt")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "maBhyt",
      key: "maBhyt",
    },
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã máy"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã máy!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã  máy không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập  mã máy!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã máy"
          />
        </Form.Item>
        <Form.Item
          label="Tên mã máy"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên mã máy!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên mã máy không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên mã máy!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên mã máy"
          />
        </Form.Item>
        <Form.Item
          label="Mã máy gửi BHYT"
          name="maBhyt"
          rules={[
            {
              required: true,
              message: "Vui lòng mã máy gửi BHYT!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã máy gửi BHYT"
          />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox className="active-checkbox">Có hiệu lực</Checkbox>
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
      roleName="MA_MAY"
      classNameForm={"form-custom--one-line"}
      storeName="maMay"
    />
  );
};
export default PTTT;
