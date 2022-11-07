import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import { useEnum } from "hook";
import React from "react";

const { ColumnSelect, ColumnCheckbox } = TableWrapper;

const Index = ({}) => {
  const [listloaiDonThuoc] = useEnum("loaiDonThuoc", []);

  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnSelect({
      title: "Loại đơn thuốc",
      dataIndex: "loaiDonThuoc",
      dataSelect: listloaiDonThuoc,
      width: 150,
      ...rest,
    }),
    ColumnCheckbox({
      title: "Yêu cầu đợt dùng",
      dataIndex: "nhapDotDung",
      textSearch: ["Có yêu cầu", "Không yêu cầu"],
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã phân loại thuốc"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã phân loại thuốc!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã phân loại thuốc không quá 20 ký tự!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã phân loại thuốc"
          />
        </Form.Item>
        <Form.Item
          label="Tên phân loại thuốc"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phân loại thuốc!",
            },
            {
              max: 1000,
              message:
                "Vui lòng nhập tên phân loại thuốc không quá 1000 ký tự!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên phân loại thuốc"
          />
        </Form.Item>
        <Form.Item label="Loại đơn thuốc" name="loaiDonThuoc">
          <Select data={listloaiDonThuoc} placeholder="Chọn loại đơn thuốc" />
        </Form.Item>
        <Form.Item label=" " name="nhapDotDung" valuePropName="checked">
          <Checkbox>Yêu cầu đợt dùng</Checkbox>
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
      titleMain="phân loại thuốc"
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="PHAN_LOAI_THUOC"
      storeName="phanLoaiThuoc"
    />
  );
};

export default Index;
