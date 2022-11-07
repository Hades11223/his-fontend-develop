import { Checkbox, Form, Input, InputNumber } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import { useEnum } from "hook";
import React from "react";
import { handleBlurInput, handleKeypressInput } from "utils";

const { ColumnInput, ColumnSelect, ColumnCheckbox } = TableWrapper;

const PTTT = ({}) => {
  const [listPhuongThucTt] = useEnum("PhuongThucTt", []);
  const [listLoaiPhuongThucTt] = useEnum("LoaiPhuongThucTt");

  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Mã nhà cung cấp PTTT",
      dataIndex: "maNhaCungCap",
      width: 200,
      ...rest,
    }),
    ColumnSelect({
      title: "Mã gửi hóa đơn",
      dataIndex: "phuongThucTt",
      width: 200,
      dataSearch: listPhuongThucTt,
      render: (item) => {
        const data = (listPhuongThucTt || []).find((el) => el.id === item);
        return data?.id + "-" + data?.ten;
      },
      ...rest,
    }),
    ColumnInput({
      title: "Tên nhà cung cấp PTTT",
      dataIndex: "tenNhaCungCap",
      width: 200,
      ...rest,
    }),
    ColumnSelect({
      title: "Loại phương thức TT",
      dataIndex: "loaiPhuongThucTt",
      dataSelect: listLoaiPhuongThucTt,
      width: 150,
      ...rest,
    }),
    ColumnCheckbox({
      title: "NCC khác BV",
      dataIndex: "nccKhacBv",
      ...rest,
    }),
    baseColumns.active,
    ColumnCheckbox({
      title: "Tiền mặt",
      dataIndex: "tienMat",
      ...rest,
    }),
    ColumnInput({
      title: "Mức độ ưu tiên",
      dataIndex: "uuTien",
      hideSearch: true,
      width: 150,
      ...rest,
    }),
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã PTTT"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã PTTT!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã PTTT không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã PTTT!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã PTTT"
          />
        </Form.Item>
        <Form.Item
          label="Tên PTTT"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên PTTT!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên PTTT không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên PTTT!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên PTTT"
          />
        </Form.Item>
        <Form.Item
          label="Mã nhà cung cấp PTTT"
          name="maNhaCungCap"
          rules={[
            {
              required: true,
              message: "Vui lòng mã nhà cung cấp PTTT!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã nhà cung cấp PTTT"
          />
        </Form.Item>
        <Form.Item
          label="Tên nhà cung cấp thanh toán"
          name="tenNhaCungCap"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhà cung cấp thanh toán!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên nhà cung cấp thanh toán"
          />
        </Form.Item>
        <Form.Item label="Mã gửi hóa đơn" name="phuongThucTt">
          <Select
            data={(listPhuongThucTt || []).map((item) => ({
              ...item,
              ten: item.id + "-" + item.ten,
            }))}
            id="id"
            placeholder="Mã gửi hóa đơn"
          />
        </Form.Item>
        <Form.Item
          label="Mức độ ưu Tiên"
          name="uuTien"
          rules={[
            {
              validator: (rule, value, callback) => {
                if (value) {
                  if (Number(value) > 2147483647) {
                    callback(
                      new Error("Vui lòng nhập ưu tiên nhỏ hơn 2147483648!")
                    );
                  } else {
                    callback();
                  }
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập mức độ ưu tiên"
            onKeyDown={handleKeypressInput}
            onBlur={handleBlurInput}
          />
        </Form.Item>
        <Form.Item label="Loại phương thức TT" name="loaiPhuongThucTt">
          <Select
            data={(listLoaiPhuongThucTt || []).map((item) => ({
              ...item,
            }))}
            id="id"
            placeholder="Loại phương thức TT"
          />
        </Form.Item>
        <Form.Item name="nccKhacBv" label=" " valuePropName="checked">
          <Checkbox>NCC khác BV</Checkbox>
        </Form.Item>

        <Form.Item name="tienMat" valuePropName="checked">
          <Checkbox>Tiền mặt</Checkbox>
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
      titleMain="phương thức thanh toán"
      roleName="PTTT"
      storeName="phuongThucTT"
      renderForm={renderForm}
      getColumns={getColumns}
    />
  );
};

export default PTTT;
