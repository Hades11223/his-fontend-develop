import { Checkbox, Form, Input } from "antd";
import BaseDm from "components/BaseDm";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import { number } from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
import { Main } from "../styled";

// tododanhmuc

const Index = ({
  listRoom,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListPhong,
  createOrEdit,
  listAllKhoa,
  listAllChuyenKhoa,
  getListAllKhoa,
  listloaiPhong,
  getUtils,
  getListAllToaNha,
  listAllToaNha,
  getListAllChuyenKhoa,
}) => {
  const setDefaultForm = ({ form }) => {
    form.setFieldsValue({ macDinh: true, checkIn: true });
  };
  useEffect(() => {
    getListAllChuyenKhoa({ page: 0, size: 500, active: true });
    getListAllKhoa();
    // getListToaNha({ page: 0, size: 500, active: true });
    getUtils({ name: "loaiPhong" });
    getListAllToaNha();
  }, []);

  const getlistloaiPhong = (item) => {
    let res = (listloaiPhong || []).filter((el) => el.id === item);
    return (res.length && res[0]) || {};
  };

  const getColumns = ({
    baseColumns = {},
    onClickSort,
    dataSortColumn,
    onSearchInput,
  }) => [
    baseColumns.stt,
    {
      title: (
        <HeaderSearch
          title="Mã phòng"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã phòng"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên phòng"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên phòng"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Loại phòng"
          sort_key="loaiPhong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiPhong || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listloaiPhong]}
              placeholder="Chọn loại phòng"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "loaiPhong");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiPhong",
      key: "loaiPhong",
      render: (item) => {
        return getlistloaiPhong(item).ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaId || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllKhoa]}
              placeholder="Tìm tên khoa"
              onChange={(e) => {
                onSearchInput(e, "khoaId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "khoa",
      key: "khoa",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Chuyên khoa"
          sort_key="chuyenKhoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.chuyenKhoaId || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllChuyenKhoa]}
              placeholder="Tìm tên chuyên khoa"
              onChange={(e) => {
                onSearchInput(e, "chuyenKhoaId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "chuyenKhoa",
      key: "chuyenKhoa",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Địa điểm"
          sort_key="diaDiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.diaDiem || 0}
          search={
            <Input
              placeholder="Tìm địa điểm"
              onChange={(e) => {
                onSearchInput(e.target.value, "diaDiem");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "diaDiem",
      key: "diaDiem",
    },
    {
      title: (
        <HeaderSearch
          title="Nhà"
          sort_key="toaNhaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.toaNhaId || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...(listAllToaNha || [])]}
              placeholder="Tìm tên nhà"
              onChange={(e) => {
                onSearchInput(e, "toaNhaId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "toaNha",
      key: "toaNha",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ghi chú"
          sort_key="ghiChu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ghiChu || 0}
          search={
            <Input
              placeholder="Tìm ghi chú"
              onChange={(e) => {
                onSearchInput(e.target.value, "ghiChu");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian thực hiện trung bình"
          sort_key="thoiGianThucHienTrungBinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianThucHienTrungBinh || 0}
          search={
            <Input
              placeholder="Tìm thời gian thực hiện trung bình"
              onChange={(e) => {
                onSearchInput(e.target.value
                  , "thoiGianThucHienTrungBinh");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "thoiGianThucHienTrungBinh",
      key: "thoiGianThucHienTrungBinh",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn nội tru"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "noiTru");
              }}
            />
          }
          sort_key="noiTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.noiTru || 0}
          title="Nội trú"
        />
      ),
      width: 90,
      dataIndex: "noiTru",
      key: "noiTru",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn ngoại trú"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "ngoaiTru");
              }}
            />
          }
          sort_key="ngoaiTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngoaiTru || 0}
          title="Ngoại trú"
        />
      ),
      width: 90,
      dataIndex: "ngoaiTru",
      key: "ngoaiTru",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={[
                { id: "", ten: "Tất cả" },
                { id: "true", ten: "Có mặc định" },
                { id: "false", ten: "Không mặc định" },
              ]}
              placeholder="Chọn mặc định"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "macDinh");
              }}
            />
          }
          sort_key="macDinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.macDinh || 0}
          title="Mặc định"
        />
      ),
      width: 110,
      dataIndex: "macDinh",
      key: "macDinh",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={[
                { id: "", ten: "Tất cả" },
                { id: "true", ten: "Có mặc định" },
                { id: "false", ten: "Không mặc định" },
              ]}
              placeholder="Chọn mặc định"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "checkIn");
              }}
            />
          }
          sort_key="checkIn"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.macDinh || 0}
          title="Checkin vào QMS phòng"
        />
      ),
      width: 110,
      dataIndex: "checkIn",
      key: "checkIn",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      sortIndex: 12,
      title: (
        <HeaderSearch
          sort_key="ngoaiVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngoaiVien || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={(value) => onSearchInput(value, "ngoaiVien")}
            />
          }
          title="Ngoại viện"
        />
      ),
      width: "100px",
      dataIndex: "ngoaiVien",
      key: "ngoaiVien",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      sortIndex: 13,
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={(value) => onSearchInput(value, "active")}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: "100px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã phòng"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã phòng!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã phòng không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã phòng!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã phòng"
          />
        </Form.Item>
        <Form.Item
          label="Tên phòng"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phòng!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên phòng không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên phòng!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên phòng"
          />
        </Form.Item>
        <Form.Item
          label="Loại phòng"
          name="loaiPhong"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại phòng!",
            },
          ]}
        >
          <Select
            placeholder={"Chọn loại phòng"}
            data={[{ id: "", ten: "Tất cả" }, ...listloaiPhong]}
          />
        </Form.Item>
        <Form.Item label="Khoa" name="khoaId">
          <Select placeholder={"Chọn khoa"} data={listAllKhoa} />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
            >
              Chuyên khoa
            </div>
          }
          name="chuyenKhoaId"
        >
          <Select placeholder={"Chọn chuyên khoa"} data={listAllChuyenKhoa} />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/toa-nha")}
            >
              Nhà
            </div>
          }
          name="toaNhaId"
        >
          <Select placeholder={"Chọn nhà"} data={listAllToaNha} />
        </Form.Item>
        <Form.Item
          label="Địa điểm"
          name="diaDiem"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa điểm!",
            },
          ]}
        >
          <Input.TextArea
            row={4}
            style={{ height: "auto" }}
            className="input-option"
            placeholder="Vui lòng nhập địa điểm"
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu">
          <Input.TextArea
            row={4}
            style={{ height: "auto" }}
            className="input-option"
            placeholder="Vui lòng nhập ghi chú"
          />
        </Form.Item>
        <Form.Item
          label="Thời gian thực hiện trung bình"
          name="thoiGianThucHienTrungBinh"
          style={{ width: "100%" }}
        >
          <Input
            type={"number"}
            className="input-option"
            placeholder="Vui lòng nhập thời gian thực hiện trung bình"
          />
        </Form.Item>
        <Form.Item
          name="noiTru"
          valuePropName="checked"
          style={{ width: "33.33%" }}
        >
          <Checkbox>Nội trú</Checkbox>
        </Form.Item>
        <Form.Item
          name="ngoaiTru"
          valuePropName="checked"
          style={{ width: "33.33%" }}
        >
          <Checkbox>Ngoại trú</Checkbox>
        </Form.Item>
        <Form.Item
          name="macDinh"
          valuePropName="checked"
          style={{ width: "33.33%" }}
        >
          <Checkbox>Mặc định</Checkbox>
        </Form.Item>
        <Form.Item
          name="checkIn"
          valuePropName="checked"
          style={{ width: "33.33%" }}
        >
          <Checkbox>Checkin vào QMS phòng</Checkbox>
        </Form.Item>
        <Form.Item
          name="ngoaiVien"
          valuePropName="checked"
          style={{ width: "33.33%" }}
        >
          <Checkbox>Ngoại viện</Checkbox>
        </Form.Item>
        <Form.Item
          name="online"
          valuePropName="checked"
          style={{ width: "33.33%" }}
        >
          <Checkbox>Đặt khám online</Checkbox>
        </Form.Item>
        {editStatus && (
          <Form.Item
            name="active"
            valuePropName="checked"
            style={{ width: "33.33%" }}
          >
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  return (
    <Main>
      <BaseDm
        titleTable="Danh mục phòng"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListPhong}
        listData={listRoom}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].PHONG_THEM]}
        roleEdit={[ROLES["DANH_MUC"].PHONG_SUA]}
        setDefaultForm={setDefaultForm}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    phong: {
      listRoom = [],
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    utils: { listloaiPhong = [] },
    khoa: { listAllKhoa },
    chuyenKhoa: { listAllChuyenKhoa },
    toaNha: { listToaNha, listAllToaNha },
  } = state;

  return {
    listloaiPhong,
    listToaNha,
    listAllChuyenKhoa,
    listAllKhoa,
    listRoom,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    listAllToaNha,
  };
};
const mapDispatchToProps = ({
  phong: { getListPhong, createOrEdit, onDelete, updateData },
  khoa: { getListAllKhoa },
  chuyenKhoa: { getListAllChuyenKhoa },
  toaNha: { getListToaNha, getListAllToaNha },
  utils: { getUtils },
}) => ({
  getUtils,
  getListToaNha,
  getListAllKhoa,
  getListPhong,
  createOrEdit,
  onDelete,
  updateData,
  getListAllToaNha,
  getListAllChuyenKhoa,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
