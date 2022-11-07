import { Checkbox, Form, Input, InputNumber } from "antd";
import { Select, TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import { ROLES } from "constants/index";
import useListAll from "hook/useListAll";
import React from "react";
import { Main } from "../styled";

const { ColumnInput } = TableWrapper;

const PhanLoaiBmi = ({}) => {
  const [listAllKhoa] = useListAll("khoa", { active: true });
  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Giá trị nhỏ nhất",
      dataIndex: "giaTriToiThieu",
      ...rest,
    }),
    ColumnInput({
      title: "Giá trị lớn nhất",
      dataIndex: "giaTriToiDa",
      ...rest,
    }),
    ColumnInput({
      title: "Mô tả",
      dataIndex: "moTa",
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã đánh giá"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã đánh giá!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã đánh giá không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã đánh giá!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã đánh giá"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Tên đánh giá"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đánh giá!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên đánh giá không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên đánh giá!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Nhập tên đánh giá" />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Giá trị nhỏ nhất"
          name="giaTriToiThieu"
        >
          <InputNumber className="input-option" placeholder="Nhập giá trị" />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Giá trị lớn nhất"
          name="giaTriToiDa"
          rules={[
            {
              validator: (rules, value, callback) => {
                if (value < form.getFieldValue("giaTriToiThieu")) {
                  callback("Giá trị lớn nhất phải > giá trị nhỏ nhất");
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <InputNumber className="input-option" placeholder="Nhập giá trị" />
        </Form.Item>
        <Form.Item className="w100" label="Mô tả" name="moTa">
          <Input className="input-option" placeholder="Nhập mô tả" />
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
    <Main>
      <BaseDmWrap
        titleTable="Danh mục phân loại đánh giá BMI"
        titleMain="đánh giá"
        getColumns={getColumns}
        renderForm={renderForm}
        roleSave={ROLES["DANH_MUC"].CHI_SO_SONG_THEM}
        roleEdit={ROLES["DANH_MUC"].CHI_SO_SONG_SUA}
        classNameForm={"form-custom--one-line"}
        storeName="phanLoaiBmi"
      />
    </Main>
  );
};

export default PhanLoaiBmi;
