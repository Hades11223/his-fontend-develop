import { Checkbox, Form, Input, InputNumber } from "antd";
import { Select, TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import { ROLES } from "constants/index";
import useListAll from "hook/useListAll";
import React from "react";
import { Main } from "../styled";

const { ColumnInput, ColumnSelect } = TableWrapper;

const ChiSoSong = ({}) => {
  const [listAllKhoa] = useListAll("khoa", { active: true });
  const getColumns = ({ baseColumns = [], ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Đơn vị tính",
      dataIndex: "donVi",
      ...rest,
    }),
    ColumnInput({
      title: "Giá trị tối thiểu",
      dataIndex: "giaTriToiThieu",
      ...rest,
    }),
    ColumnInput({
      title: "Giá trị tối đa",
      dataIndex: "giaTriToiDa",
      ...rest,
    }),
    ColumnSelect({
      title: "Khoa áp dụng",
      dataIndex: "dsKhoa",
      searchKey: "dsKhoaId",
      dataSelect: listAllKhoa,
      width: 250,
      render: (_, data) => data?.dsKhoa?.map((i) => i.ten).join(", "),
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã chỉ số sống"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã chỉ số sống!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã chỉ số sống không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã chỉ số sống!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã chỉ số sống"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Tên chỉ số sống"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên chỉ số sống!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên chỉ số sống không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên chỉ số sống!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên chỉ số sống"
          />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Đơn vị"
          name="donVi"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đơn vị!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui lòng nhập đơn vị" />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Giá trị tối thiểu"
          name="giaTriToiThieu"
        >
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập giá trị"
          />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Giá trị tối đa"
          name="giaTriToiDa"
          rules={[
            {
              validator: (rules, value, callback) => {
                if (value < form.getFieldValue("giaTriToiThieu")) {
                  callback("Giá trị tối đa phải > giá trị tối thiểu");
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập giá trị"
          />
        </Form.Item>
        <Form.Item
          className="w100"
          label="Khoa áp dụng"
          name="dsKhoaId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn khoa!",
            },
          ]}
        >
          <Select
            className="input-option"
            placeholder="Vui lòng chọn khoa"
            mode="multiple"
            data={listAllKhoa}
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
    <Main>
      <BaseDmWrap
        titleMain="chỉ số sống"
        getColumns={getColumns}
        renderForm={renderForm}
        roleSave={ROLES["DANH_MUC"].CHI_SO_SONG_THEM}
        roleEdit={ROLES["DANH_MUC"].CHI_SO_SONG_SUA}
        classNameForm={"form-custom--one-line"}
        storeName="chiSoSong"
      />
    </Main>
  );
};

export default ChiSoSong;
