import { Checkbox, Form, Image, Input, Tooltip } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ElementFormTable from "../../../../components/common/ElementFormTable";
import { StyledChiTiet } from "../styled";

const ChiTietHoiDong = ({
  listVaiTroKiemKe,
  listAllNhanVien,
  _page,
  _size,
  _totalElements,
  _listData,
  _dataEdit,
  _dataSelect,
  _dataSort,
  _dataSearch,
  _createOrEdit,
  _onDelete,
  updateData,
  getUtils,
  _getList,
  ...props
}) => {
  useEffect(() => {
    getUtils({ name: "doiTuong" });
  }, []);

  const getColumns = ({
    onClickSort,
    onChange,
    onDelete,
    onSearchInput,
    dataSort,
  }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => _page * _size + index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Họ và tên"
          sort_key="hoVaTen"
          onClickSort={onClickSort}
          dataSort={dataSort.hoVaTen}
          searchSelect={
            <Select
              placeholder="Tìm họ và tên"
              data={listAllNhanVien}
              onChange={onSearchInput("hoVaTen")}
            />
          }
        />
      ),
      width: 250,
      dataIndex: "hoVaTen",
      key: "hoVaTen",
      render: (item, data) => {
        if (data?.id === _dataSelect?.id) {
          return (
            <Form.Item
              name="hoVaTen"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn họ và tên",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                // value={_dataSelect?.hoVaTen}
                placeholder="Chọn họ tên"
                data={listAllNhanVien}
                onChange={onChange("hoVaTen")}
              />
            </Form.Item>
          );
        } else return listAllNhanVien.find((nv) => `${nv.id}` === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Vai trò"
          sort_key="vaiTro"
          onClickSort={onClickSort}
          dataSort={dataSort.vaiTro}
          searchSelect={
            <Select
              placeholder="Tìm vai trò"
              data={listVaiTroKiemKe}
              onChange={onSearchInput("vaiTro")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "vaiTro",
      key: "vaiTro",
      render: (item, data) => {
        if (data?.id === _dataSelect?.id) {
          return (
            <Form.Item
              name="vaiTro"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vai trò",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Chọn vai trò"
                data={listVaiTroKiemKe}
                onChange={onChange("vaiTro")}
              />
            </Form.Item>
          );
        } else return listVaiTroKiemKe.find((vt) => vt.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Chức vụ"
          sort_key="chucVu"
          onClickSort={onClickSort}
          dataSort={dataSort.chucVu}
          search={
            <Input
              placeholder="Tìm mã chức vụ"
              onChange={onSearchInput("chucVu")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "chucVu",
      key: "chucVu",
      render: (item, data) => {
        if (data?.id === _dataSelect?.id) {
          return (
            <Form.Item
              name="chucVu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn họ và tên",
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập chức vụ"
                onChange={onChange("chucVu")}
              />
            </Form.Item>
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort.active}
          title="Có hiệu lực"
        />
      ),
      width: 90,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, data) => {
        if (data?.id === _dataSelect?.id) {
          return (
            <Form.Item
              name="active"
              initialValue={true}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn họ và tên",
                },
              ]}
              valuePropName="checked"
            >
              <Checkbox checked={item} onChange={onChange("active")} />
            </Form.Item>
          );
        } else return <Checkbox checked={item} />;
      },
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: 70,
      key: "actions",
      align: "center",
      render: (_, item) => {
        return (
          <Tooltip title="Xóa">
            <Image
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                onDelete(item);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  const customCreateOrEdit = (values, { resetField }) => {
    const dataSubmit = { ...values, hoiDongKiemKeId: _dataEdit?.id };
    return _createOrEdit(dataSubmit);
  };
  return (
    <ElementFormTable
      dataEdit={_dataEdit}
      title="Chi tiết hội đồng"
      getColumns={getColumns}
      dataSort={_dataSort}
      dataSource={_listData}
      updateData={updateData}
      page={_page}
      size={_size}
      totalElements={_totalElements}
      dataSelect={_dataSelect}
      dataSearch={_dataSearch}
      createOrEdit={customCreateOrEdit}
      getData={_getList}
      roleSave={[ROLES["DANH_MUC"].HOI_DONG_THEM]}
      roleEdit={[ROLES["DANH_MUC"].HOI_DONG_SUA]}
      onDelete={_onDelete}
      {...props}
    />
  );
};

export default connect(
  ({
    hoiDongKiemKe: { _dataEdit },
    hoiDongChiTiet: {
      _page,
      _size,
      _totalElements,
      _dataSelect,
      _dataSort,
      _dataSearch,
      _listData,
    },
    nhanVien: { listAllNhanVien },
    utils: { listVaiTroKiemKe },
  }) => ({
    _page,
    _size,
    _totalElements,
    _dataSelect,
    _listData,
    _dataEdit,
    _dataSort,
    _dataSearch,
    listVaiTroKiemKe,
    listAllNhanVien,
  }),
  ({
    hoiDongChiTiet: { _getList, _createOrEdit, updateData, _onDelete },
    utils: { getUtils },
  }) => ({
    _getList,
    updateData,
    _createOrEdit,
    getUtils,
    _onDelete,
  })
)(ChiTietHoiDong);
