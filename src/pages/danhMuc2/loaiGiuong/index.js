import { Checkbox, Form, Input, InputNumber } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React from "react";
import { useDispatch } from "react-redux";

const { ColumnInput } = TableWrapper;
const screenName = "loại giường";

const LoaiGiuong = () => {
  const {
    loaiGiuong: { onDelete },
  } = useDispatch();

  const handleDeleteItem = (item, e) => {
    e.stopPropagation();
    onDelete(item?.id);
  };
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Tỉ lệ thanh toán dịch vụ",
      dataIndex: "tyLeTtDv",
      width: 120,
      ...rest,
    }),
    ColumnInput({
      title: "Tỉ lệ thanh toán bảo hiểm",
      dataIndex: "tyLeBhTt",
      width: 150,
      ...rest,
    }),
    baseColumns.active,
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: 60,
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      render: (item, data) => {
        return (
          <div className="support">
            <img
              onClick={(e) => handleDeleteItem(data, e)}
              src={require("assets/images/his-core/iconDelete.png")}
              alt="..."
            ></img>
          </div>
        );
      },
    },
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item label="Mã loại giường" name="ma">
          <Input className="input-option" disabled />
        </Form.Item>
        <Form.Item
          label="Tên loại giường"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên loại giường!",
            },
            {
              max: 255,
              message: "Vui lòng nhập tên không quá 255 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên loại giường!",
            },
          ]}
        >
          <Input
            autoFocus
            ref={refAutoFocus}
            className="input-option"
            placeholder="Vui lòng nhập tên"
          />
        </Form.Item>
        <Form.Item
          label="Tỉ lệ thanh toán dịch vụ"
          name="tyLeTtDv"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tỉ lệ thanh toán dịch vụ!",
            },
          ]}
        >
          <InputNumber
            type="number"
            min={1}
            max={100}
            className="input-option"
            placeholder="Vui lòng nhập tỉ lệ thanh toán dịch vụ"
          />
        </Form.Item>
        <Form.Item label="Tỉ lệ thanh toán bảo hiểm" name="tyLeBhTt">
          <InputNumber
            type="number"
            min={1}
            max={100}
            className="input-option"
            placeholder="Vui lòng nhập tỉ lệ thanh toán bảo hiểm"
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
      titleMain={screenName}
      getColumns={getColumns}
      renderForm={renderForm}
      storeName="loaiGiuong"
    />
  );
};

export default LoaiGiuong;
