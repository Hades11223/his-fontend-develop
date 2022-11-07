import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import DatePicker from "components/DatePicker";
import Select from "components/Select";
import { BIRTHDAY_FORMAT } from "constants/index";
import useListAll from "hook/useListAll";
import moment from "moment";
import React from "react";
import { openInNewTab } from "utils";

const { ColumnInput, ColumnSelect, ColumnDate } = TableWrapper;

const NguoiDaiDien = ({}) => {
  const [listAllDonVi] = useListAll("donVi", { active: true });

  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: 150,
      ...rest,
    }),
    ColumnDate({
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      width: 200,
      ...rest,
    }),
    ColumnInput({ title: "Địa chỉ", dataIndex: "diaChi", width: 200, ...rest }),
    ColumnInput({
      title: "Số tài khoản",
      dataIndex: "soTaiKhoan",
      width: 200,
      ...rest,
    }),
    ColumnInput({
      title: "Mã số thuế",
      dataIndex: "maSoThue",
      width: 150,
      ...rest,
    }),
    ColumnSelect({
      title: "Đơn vị",
      dataIndex: "donViId",
      dataSelect: listAllDonVi,
      width: 200,
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã người đại diện"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã người đại diện!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã người đại diện không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã người đại diện!",
            },
          ]}
        >
          <Input
            autoFocus={true}
            className="input-option"
            placeholder="Nhập mã người đại diện"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên người đại diện!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên người đại diện không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên người đại diện!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tên người đại diện"
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="soDienThoai">
          <Input
            className="input-option hidden-arrow"
            type="number"
            placeholder="Nhập số điện thoại"
          />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="ngaySinh">
          <DatePicker format={BIRTHDAY_FORMAT} placeholder="Nhập ngày sinh" />
        </Form.Item>
        <Form.Item label="Số tài khoản" name="soTaiKhoan">
          <Input
            className="input-option hidden-arrow"
            type="number"
            placeholder="Nhập số tài khoản"
          />
        </Form.Item>
        <Form.Item label="Mã số thuế" name="maSoThue">
          <Input
            className="input-option hidden-arrow"
            type="number"
            placeholder="Nhập mã số thuế"
          />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="diaChi">
          <Input className="input-option" placeholder="Nhập địa chỉ" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/co-quan-don-vi")}
            >
              Đơn vị
            </div>
          }
          name="donViId"
        >
          <Select data={listAllDonVi} placeholder="Nhập đơn vị" />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" label=" " valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  const mapToForm = (data = {}) => ({
    ...data,
    ngaySinh: data.ngaySinh ? moment(data.ngaySinh) : "",
  });

  return (
    <BaseDmWrap
      titleMain={"người đại diện"}
      roleName="NGUOI_DAI_DIEN"
      // classNameForm={"form-custom--one-line"}
      storeName="nguoiDaiDien"
      getColumns={getColumns}
      renderForm={renderForm}
      mapToForm={mapToForm}
    />
  );
};

export default NguoiDaiDien;
