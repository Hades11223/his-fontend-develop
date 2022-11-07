import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useEnum } from "hook";
import React, { useEffect } from "react";

// tododanhmuc

const screenName = "hình thức nhập/Loại xuất";

const HinhThucNhapXuat = ({}) => {
  const [listHinhThucNhapXuatKho] = useEnum("HinhThucNhapXuatKho", []);
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
          title="Hình thức"
          // sort_key="hinhThuc"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn.dsHinhThucNhapXuat || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={
                listHinhThucNhapXuatKho
                  ? [{ id: "", ten: "Tất cả" }, ...listHinhThucNhapXuatKho]
                  : []
              }
              onChange={onSearchInput("dsHinhThucNhapXuat")}
              defaultValue=""
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsHinhThucNhapXuat",
      key: "dsHinhThucNhapXuat",
      render: (item, list, index) => {
        if (listHinhThucNhapXuatKho?.length) {
          let list =
            item
              ?.map((e, index) => {
                let x = listHinhThucNhapXuatKho.find((i) => i.id === e);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];
          return list.join(", ");
        }
        return "";
      },
    },
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
        <Form.Item label="Hình thức" name="dsHinhThucNhapXuat">
          <Select
            mode="multiple"
            showArrow={true}
            placeholder="Chọn hình thức nhập xuất"
            data={listHinhThucNhapXuatKho}
          />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" label=" " valuePropName="checked">
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
      roleName={"HINH_THUC_NHAP_XUAT_LOAI_XUAT"}
      storeName="hinhThucNhapXuat"
      classNameForm={"form-custom--one-line"}
    />
  );
};

export default HinhThucNhapXuat;
