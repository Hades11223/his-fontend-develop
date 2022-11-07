import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import { ROLES } from "constants/index";
import React from "react";

const NhomChiPhi = ({}) => {
  const getColumns = ({ baseColumns = [] }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    baseColumns.moTa,
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã nhóm chi phí"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã nhóm chi phí!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã nhóm chi phí không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã nhóm chi phí!",
            },
          ]}
        >
          <Input
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã nhóm chi phí"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên nhóm chi phí"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nhóm chi phí!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập nhóm chi phí không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập nhóm chi phí!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập nhóm chi phí"
          />
        </Form.Item>
        <Form.Item label="Mô tả" name="moTa">
          <Input className="input-option" placeholder="Vui lòng nhập mô tả" />
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
      titleMain="nhóm chi phí"
      getColumns={getColumns}
      renderForm={renderForm}
      roleSave={ROLES["DANH_MUC"].NHOM_CHI_PHI_THEM}
      roleEdit={ROLES["DANH_MUC"].NHOM_CHI_PHI_SUA}
      classNameForm={"form-custom--one-line"}
      storeName="nhomChiPhi"
    />
  );
};

export default NhomChiPhi;
