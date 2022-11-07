import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import SelectLoadMore from "components/SelectLoadMore";
import HeaderSearch from "components/TableWrapper/headerSearch";
import dmDacTinhDuocLyProvider from "data-access/categories/dm-dac-tinh-duoc-ly-provider";
import { useEnum } from "hook";
import React from "react";

const screenName = "hoạt chất";

const HoatChat = ({}) => {
  const [listloaiDichVuKho] = useEnum("loaiDichVuKho", []);

  const getlistloaiDichVuKho = (item) => {
    let res = listloaiDichVuKho.filter((val) => {
      return +item === +val.id || +val.value;
    });
    return res.length ? res[0] : {};
  };
  const getColumns = ({
    baseColumns = {},
    onClickSort,
    dataSortColumn,
    onSearchInput,
  }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    {
      title: (
        <HeaderSearch
          title="Loại DV"
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiDichVu || 0}
          searchSelect={
            <Select
              onChange={onSearchInput("loaiDichVu")}
              defaultValue=""
              placeholder={"Chọn loại dịch vụ"}
              data={[{ id: "", ten: "Tất cả" }, ...listloaiDichVuKho]}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "loaiDichVu",
      key: "loaiDichVu",
      render: (item) => {
        return getlistloaiDichVuKho(item).ten;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <SelectLoadMore
              api={dmDacTinhDuocLyProvider.searchTongHop}
              onChange={(value) => {
                onSearchInput(value, "dacTinhDuocLyId");
              }}
            />
          }
          sort_key="dacTinhDuocLy.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dacTinhDuocLyId || 0}
          title="Đặc tính dược lý"
        />
      ),
      width: 100,
      dataIndex: "dacTinhDuocLy",
      key: "dacTinhDuocLyId",
      align: "center",
      render: (item) => item?.ten,
    },
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
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
        <Form.Item label="Loại DV" name="loaiDichVu" style={{ width: "100%" }}>
          <Select placeholder={"Chọn Loại DV"} data={[...listloaiDichVuKho]} />
        </Form.Item>
        <Form.Item
          label="Đặc tính dược lý"
          name="dacTinhDuocLyId"
          style={{ width: "100%" }}
        >
          <SelectLoadMore api={dmDacTinhDuocLyProvider.searchTongHop} />
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
      roleName={"HOAT_CHAT"}
      storeName="hoatChat"
      classNameForm={"form-custom--one-line"}
    />
  );
};
export default HoatChat;
