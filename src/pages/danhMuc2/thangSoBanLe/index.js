import React from "react";
import { Checkbox, Form, InputNumber } from "antd";
import Select from "components/Select";
import useListAll from "hook/useListAll";
import { openInNewTab } from "utils";
import BaseDmWrap from "components/BaseDmWrap";
import { TableWrapper } from "components";

const { ColumnInput, ColumnSelect } = TableWrapper;

const ThangSoBanLe = ({}) => {
  const [listAllKho] = useListAll("kho", { active: true });

  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    ColumnInput({
      title: "Thặng số bán lẻ",
      dataIndex: "thangSoBanLe",
      align: "right",
      type: "number",
      ...rest,
    }),
    ColumnInput({
      title: "Giá nhập sau VAT nhỏ nhất",
      dataIndex: "giaNhapNhoNhat",
      align: "right",
      formatPrice: true,
      ...rest,
    }),
    ColumnInput({
      title: "Giá nhập sau VAT lớn nhất",
      dataIndex: "giaNhapLonNhat",
      align: "right",
      formatPrice: true,
      ...rest,
    }),
    ColumnSelect({
      title: "Kho",
      dataSelect: listAllKho,
      dataIndex: "khoId",
      width: 180,
      render: (_, item) => item.kho?.ten,
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, autoFocus, refAutoFocus }) => {
    return (
      <>
        <Form.Item
          label="Thặng số bán lẻ(%)"
          name="thangSoBanLe"
          style={{ width: "50%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thặng số bán lẻ",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]*$/),
              message: "Giá trị phải là số nguyên dương",
            },
          ]}
        >
          <InputNumber
            type="number"
            className="input-option"
            placeholder="Nhập thặng số bán lẻ"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/kho/quan-tri-kho")}
            >
              Kho
            </div>
          }
          name="khoId"
          style={{ width: "50%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn kho",
            },
          ]}
        >
          <Select
            className="input-option"
            data={listAllKho}
            placeholder="Chọn kho"
          />
        </Form.Item>
        <Form.Item
          label="Giá nhập sau VAT nhỏ nhất"
          name="giaNhapNhoNhat"
          style={{ width: "50%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá sau VAT nhỏ nhất",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]*$/),
              message: "Giá trị phải là số nguyên dương",
            },
          ]}
        >
          <InputNumber
            type="number"
            className="input-option"
            placeholder="Nhập giá nhập sau VAT nhỏ nhất"
          />
        </Form.Item>
        <Form.Item
          label="Giá nhập sau VAT lớn nhất"
          name="giaNhapLonNhat"
          style={{ width: "50%" }}
          rules={[
            {
              required: true,

              message: "Vui lòng nhập giá sau VAT lớn nhất",
            },
            {
              pattern: new RegExp(/^[0-9]*$/),
              message: "Giá trị phải là số nguyên dương",
            },
          ]}
        >
          <InputNumber
            type="number"
            className="input-option"
            placeholder="Nhập giá nhập sau VAT lớn nhất"
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
      titleMain="thặng số bán lẻ"
      roleName="DINH_MUC_THANG_SO"
      storeName="thangSoBanLe"
      renderForm={renderForm}
      getColumns={getColumns}
    />
  );
};

export default ThangSoBanLe;
