import { Checkbox, Form, Input } from "antd";
import { DatePicker, TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import { ROLES } from "constants/index";
import React from "react";
import moment from "moment";
import { Main } from "../styled";

const { ColumnDate } = TableWrapper;

const ChiSoSong = ({}) => {
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnDate({
      title: "Ngày",
      dataIndex: "ngay",
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã ngày nghỉ"
          name="ma"
          className="w100"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã ngày nghỉ!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã ngày nghỉ không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã ngày nghỉ!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã ngày nghỉ"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Tên ngày nghỉ"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên ngày nghỉ!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên ngày nghỉ không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên ngày nghỉ!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên ngày nghỉ"
          />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Ngày"
          name="ngay"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày!",
            },
          ]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            className="input-option"
            placeholder="Chọn ngày"
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

  const mapToForm = ({ ngay, ...rest }) => ({
    ...rest,
    ngay: ngay ? moment(ngay) : "",
  });

  return (
    <Main>
      <BaseDmWrap
        titleMain="ngày nghỉ"
        getColumns={getColumns}
        renderForm={renderForm}
        roleSave={ROLES["DANH_MUC"].NGAY_NGHI_LE_THEM}
        roleEdit={ROLES["DANH_MUC"].NGAY_NGHI_LE_SUA}
        classNameForm={"form-custom--one-line"}
        storeName="ngayNghiLe"
        mapToForm={mapToForm}
      />
    </Main>
  );
};

export default ChiSoSong;
