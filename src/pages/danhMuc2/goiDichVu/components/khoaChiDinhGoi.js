import { Checkbox, Form, Image, Input, InputNumber, Tooltip } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ElementFormTable from "../../../../components/common/ElementFormTable/v2";
import SelectLoadMore from "components/SelectLoadMore";
import dmKhoaProvider from "data-access/categories/dm-khoa-provider";

const KhoaChiDinhGoi = ({
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
  roleEdit,
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
    dataSelect,
    form,
  }) => {
    const onChangeCheckbox = (key) => (e) => {
      if (
        key === "tuTra" &&
        e.target.checked &&
        form.getFieldValue("khongTinhTien")
      ) {
        form.setFieldsValue({ khongTinhTien: false, tuTra: true });
      } else if (
        key === "khongTinhTien" &&
        e.target.checked &&
        form.getFieldValue("tuTra")
      ) {
        form.setFieldsValue({ tuTra: false, khongTinhTien: true });
      }
    };
    return [
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
            title="Khoa chỉ định"
            sort_key="khoaChiDinh.ten"
            onClickSort={onClickSort}
            dataSort={dataSort["khoaChiDinh.ten"]}
            searchSelect={
              <Input
                placeholder="Tìm khoa chỉ định"
                onChange={onSearchInput("khoaChiDinh.ten")}
              />
            }
          />
        ),
        width: 250,
        dataIndex: "khoaChiDinh",
        key: "khoaChiDinh",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item
                name="khoaChiDinhId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn dịch vụ",
                  },
                ]}
              >
                <SelectLoadMore
                  api={dmKhoaProvider.searchAll}
                  mapData={(i) => ({
                    value: i.id,
                    label: i.ten,
                  })}
                  onChange={onChange("khoaChiDinhId")}
                  // value={_state.dsNhomDvKhoCap1Id}
                  keySearch={"ten"}
                  placeholder={"Chọn khoa chỉ định"}
                  className="input-filter"
                  // addParam={{ dsLoaiDichVu: _dataEdit.dsLoaiDichVu }}
                  blurReset={true}
                />
              </Form.Item>
            );
          } else return data.khoaChiDinh?.ten;
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
        width: 150,
        dataIndex: "active",
        key: "active",
        align: "center",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item
                name="active"
                initialValue={true}
                valuePropName="checked"
              >
                <Checkbox onChange={onChange("active")} />
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
          return dataSelect?.id === "" ? (
            <></>
          ) : (
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
  };

  const customCreateOrEdit = (values, { dataEdit, resetField, prevent }) => {
    if (prevent) return;
    const dataSubmit = { ...values, id: dataEdit?.id, goiDvId: _dataEdit?.id };
    return _createOrEdit(dataSubmit);
  };

  return (
    <ElementFormTable
      title="Khoa chỉ định gói"
      dataEdit={_dataEdit}
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
      // roleSave={[ROLES["DANH_MUC"].HOI_DONG_THEM]}
      roleEdit={roleEdit}
      onDelete={_onDelete}
      {...props}
    />
  );
};

export default connect(
  ({
    goiDV: { _dataEdit },
    khoaChiDinh: {
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
    khoaChiDinh: { _getList, _createOrEdit, updateData, _onDelete },
    utils: { getUtils },
  }) => ({
    _getList,
    updateData,
    _createOrEdit,
    getUtils,
    _onDelete,
  })
)(KhoaChiDinhGoi);
