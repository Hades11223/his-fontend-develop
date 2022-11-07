import { Checkbox, Form, Input } from "antd";
import Select from "components/Select";
import React, { useMemo } from "react";
import { useEnum } from "hook";
import BaseDmWrap from "components/BaseDmWrap";
import { TableWrapper } from "components";
const { ColumnCheckbox, ColumnSelect } = TableWrapper;

const StorageImport = ({}) => {
  const [listLoaiDichVu] = useEnum("LoaiDichVu", []);

  const listDV = useMemo(() => {
    return (listLoaiDichVu || []).filter((dv) =>
      [90, 100, 110].includes(dv.id)
    );
  }, [listLoaiDichVu]);

  const listDV2 = useMemo(() => {
    return [{ id: "", ten: "Tất cả" }, ...listDV];
  }, [listLoaiDichVu]);

  const getColumns = ({ baseColumns, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnSelect({
      title: "Loại dịch vụ",
      dataIndex: "loaiDichVu",
      dataSelect: listDV2,
      width: 100,
      ...rest,
    }),
    ColumnCheckbox({
      title: "Thầu",
      dataIndex: "thau",
      textSearch: ["Có thầu", "Không thầu"],
      ...rest,
    }),
    ColumnCheckbox({
      title: "Hiệu lực",
      dataIndex: "active",
      ...rest,
    }),
    // baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã nguồn nhập"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã nguồn nhập!",
            },
            {
              max: 50,
              message: "Vui lòng nhập mã nguồn nhập không quá 50 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã nguồn nhập!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã nguồn nhập"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên nguồn nhập"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nguồn nhập!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên nguồn nhập không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên nguồn nhập!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên nguồn nhập"
          />
        </Form.Item>
        <Form.Item label="Loại DV" name="loaiDichVu">
          <Select data={listDV} placeholder="Loại dịch vụ" />
        </Form.Item>
        <Form.Item
          label=" "
          name="thau"
          valuePropName="checked"
          defaultValue="false"
        >
          <Checkbox>Thầu</Checkbox>
        </Form.Item>
        <Form.Item label=" " name="active" valuePropName="checked">
          <Checkbox>Có hiệu lực</Checkbox>
        </Form.Item>
      </>
    );
  };

  return (
    <BaseDmWrap
      titleMain={"nguồn nhập kho"}
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="NGUON_NHAP_KHO"
      storeName="nguonNhapKho"
    />
  );
};

export default StorageImport;
