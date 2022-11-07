import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import { useEnum } from "hook";
import useListAll from "hook/useListAll";
import React from "react";
import { openInNewTab } from "utils";

const { ColumnSelect, ColumnInput } = TableWrapper;
const screenName = "loa gọi số";

const LoaGoiSo = ({}) => {
  const [listAllKhoa] = useListAll("khoa", { active: true });
  const [listloaiLoaGoiSo] = useEnum("loaiLoaGoiSo", []);

  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnSelect({
      title: "Loại loa gọi số",
      dataSelect: [{ id: "", ten: "Tất cả" }, ...listloaiLoaGoiSo],
      dataIndex: "loaiLoaGoiSo",
      width: 180,
      render: (item) => {
        let res = listloaiLoaGoiSo.filter((val) => {
          return +item === +val.id;
        });
        return res.length ? res[0].ten : {};
      },
      ...rest,
    }),
    ColumnInput({
      title: "Khoa",
      dataIndex: "khoa",
      searchKey: "khoa.ten",
      sortKey: "khoa.ten",
      width: 180,
      render: (item) => item.ten,
      ...rest,
    }),
    baseColumns.active,
  ];
  const renderForm = ({ editStatus }) => {
    return (
      <>
        <Form.Item
          label={"Mã " + screenName}
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã " + screenName,
            },
            {
              max: 20,
              message:
                "Vui lòng nhập mã " + screenName + " không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã " + screenName,
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder={"Vui lòng nhập mã " + screenName}
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label={"Tên " + screenName}
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên " + screenName,
            },
            {
              max: 1000,
              message:
                "Vui lòng nhập tên " + screenName + " không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên " + screenName,
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder={"Vui lòng nhập tên " + screenName}
          />
        </Form.Item>
        <Form.Item label="Loại tiếp đón" name="loaiLoaGoiSo">
          <Select placeholder={"Chọn loại tiếp đón"} data={listloaiLoaGoiSo} />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/khoa")}
            >
              Khoa
            </div>
          }
          name="khoaId"
        >
          <Select placeholder={"Chọn khoa"} data={listAllKhoa} />
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
      roleName={"LOA_GOI_SO"}
      storeName="loaGoiSo"
    />
  );
};

export default LoaGoiSo;
