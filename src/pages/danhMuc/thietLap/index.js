import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import TableWrapper from "components/TableWrapper";
import { HIEU_LUC, ROLES } from "constants/index";
import React from "react";
import { useTranslation } from "react-i18next";

const { ColumnDm, ColumnInput } = TableWrapper;

const ThietLap = ({}) => {
  const { t } = useTranslation();

  const getColumns = ({ baseColumns = {}, handleDeleteItem, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    ColumnInput({
      ...rest,
      title: "Giá trị",
      dataIndex: "giaTri",
    }),
    ColumnInput({
      ...rest,
      title: "Mô tả",
      dataIndex: "ten",
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã thiết lập"
          style={{ width: "100%" }}
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã thiết lập!",
            },
            {
              max: 50,
              message: "Vui lòng nhập mã thiết lập không quá 50 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã thiết lập!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã thiết lập"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Giá trị"
          name="giaTri"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá trị!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập giá trị!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui lòng nhập giá trị" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              max: 1000,
              message: "Vui lòng nhập giá trị không quá 1000 ký tự!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui lòng nhập mô tả" />
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
      list={[
        { title: t("thietLap.thietLap"), link: "/thiet-lap" },
        {
          title: t("thietLap.thietLapChung"),
          link: "/thiet-lap/thiet-lap-chung",
        },
      ]}
      titleTable={"Danh mục thiết lập chung"}
      titleMain={"thiết lập"}
      getColumns={getColumns}
      renderForm={renderForm}
      roleSave={ROLES["THIET_LAP"].THIET_LAP_CHUNG_THEM}
      roleEdit={ROLES["THIET_LAP"].THIET_LAP_CHUNG_SUA}
      storeName="thietLap"
    />
  );
};

export default ThietLap;
