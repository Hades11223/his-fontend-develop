import { Checkbox, Form, Input } from "antd";
import React from "react";
import { Main } from "../styled";
import { useTranslation } from "react-i18next";
import BaseDmWrap from "components/BaseDmWrap";
import useListAll from "hook/useListAll";
import { TableWrapper } from "components";

const { ColumnSelect } = TableWrapper;

const LoaiHinhThanhToan = () => {
  const { t } = useTranslation();
  const [listAllLoaiDoiTuong] = useListAll("loaiDoiTuong");
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnSelect({
      title: t("danhMuc.loaiDoiTuong"),
      dataIndex: "dsLoaiDoiTuong",
      searchKey: "loaiDoiTuongId",
      dataSelect: listAllLoaiDoiTuong,
      width: 250,
      align: "left",
      render: (item, data) => (item || []).map((x) => x.ten)?.join(", "),
      ...rest,
    }),
    // baseColumns.colMulSelect({
    //   title: t("danhMuc.loaiDoiTuong"),
    //   fieldName: "dsLoaiDoiTuong",
    //   fieldSearch: "loaiDoiTuongId",
    //   data: listAllLoaiDoiTuong,
    //   width: 250,
    //   align: "left",
    //   render: (item, data) => (item || []).map((x) => x.ten)?.join(", "),
    // }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label={t("danhMuc.maLoaiHinhThanhToan")}
          name="ma"
          rules={[
            {
              required: true,
              message: t("danhMuc.vuiLongNhapMaLoaiHinhThanhToan"),
            },
          ]}
        >
          <Input
            className="input-option"
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item
          label={t("danhMuc.tenLoaiHinhThanhToan")}
          name="ten"
          rules={[
            {
              required: true,
              message: t("danhMuc.ten"),
            },
          ]}
        >
          <Input className="input-option" placeholder={t("danhMuc.ten")} />
        </Form.Item>
        <Form.Item
          label={t("danhMuc.loaiDoiTuong")}
          name="dsLoaiDoiTuong"
          style={{ width: "100%" }}
        >
          <Input.TextArea
            className="input-option"
            placeholder={t("danhMuc.loaiDoiTuong")}
            disabled
          />
        </Form.Item>
        {editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>{t("danhMuc.coHieuLuc")}</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  const onShowUpdate = ({ form }, data) => {
    form.setFieldsValue({
      dsLoaiDoiTuong: (data?.dsLoaiDoiTuong || [])
        .map((x) => x.ten)
        ?.join(", "),
    });
  };
  const beforeSubmit = (data) => ({
    ...data,
    dsLoaiDoiTuong: null,
  });
  return (
    <Main>
      <BaseDmWrap
        titleTable={t("danhMuc.danhMucLoaiHinhThanhToan")}
        titleMain={t("danhMuc.loaiHinhThanhToan")}
        getColumns={getColumns}
        renderForm={renderForm}
        storeName="loaiHinhThanhToan"
        onShowUpdate={onShowUpdate}
        beforeSubmit={beforeSubmit}
      />
    </Main>
  );
};

export default LoaiHinhThanhToan;
