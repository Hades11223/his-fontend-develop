import React from "react";
import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import useListAll from "hook/useListAll";
import { useTranslation } from "react-i18next";
import { TableWrapper } from "components";

const { ColumnSelect } = TableWrapper;

const BacSiNgoaiVien = () => {
  const [listAllBenhVien] = useListAll("benhVien", { active: true });
  const { t } = useTranslation();

  const getColumns = ({ baseColumns, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnSelect({
      title: t("danhMuc.coQuanCongTac"),
      dataIndex: "coQuanId",
      dataSelect: listAllBenhVien,
      width: 200,
      render: (_, item) => item?.coQuan?.ten,
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item label={t("danhMuc.ma")} name="ma">
          <Input className="input-option" disabled={true} />
        </Form.Item>
        <Form.Item
          label={t("danhMuc.ten")}
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder={t("danhMuc.ten")}
          />
        </Form.Item>
        <Form.Item label={t("danhMuc.coQuanCongTac")} name="coQuanId">
          <Select
            className="input-option"
            placeholder={t("danhMuc.coQuanCongTac")}
            data={listAllBenhVien}
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
      titleMain={"bác sĩ ngoại viện"}
      roleName="BAC_SI_NGOAI_VIEN"
      classNameForm={"form-custom--one-line"}
      storeName="bacSiNgoaiVien"
      renderForm={renderForm}
      getColumns={getColumns}
    />
  );
};

export default BacSiNgoaiVien;
