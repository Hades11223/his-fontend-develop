import { Checkbox, Form, Input } from "antd";
import { Select } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useEnum } from "hook";
import React from "react";

const nameScreen = "mẫu QMS";

const MauQms = ({}) => {
  const [listloaiQms] = useEnum("loaiQms", []);

  const getColumns = ({
    baseColumns,
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
          title="Loại QMS"
          sort_key="loaiQms"
          dataSort={dataSortColumn["loaiQms"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...(listloaiQms || [])]}
              placeholder="Nhập loại QMS"
              onChange={onSearchInput("loaiQms")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiQms",
      key: "loaiQms",
      align: "left",
      render: (item) => {
        return listloaiQms?.find((x) => x.id == item)?.ten;
      },
    },
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã mẫu QMS"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã mẫu QMS",
            },
          ]}
        >
          <Input
            className="input-option"
            autoFocus={autoFocus}
            ref={refAutoFocus}
            placeholder="Vui lòng nhập mã mẫu QMS"
          ></Input>
        </Form.Item>
        <Form.Item
          label="Tên mẫu QMS"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên mẫu QMS",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên mẫu QMS"
          ></Input>
        </Form.Item>
        <Form.Item
          label="Loại QMS"
          name="loaiQms"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại QMS",
            },
          ]}
        >
          <Select data={listloaiQms} placeholder="Chọn loại QMS"></Select>
        </Form.Item>
        <Form.Item
          label="Link mẫu QMS"
          name="url"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập link mẫu QMS",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập link mẫu QMS"
          ></Input>
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
      roleName="MAU_QMS"
      classNameForm={"form-custom--one-line"}
      storeName="template"
    />
  );
};

export default MauQms;
