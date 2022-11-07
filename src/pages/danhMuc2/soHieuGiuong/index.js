import { Checkbox, Form, Input } from "antd";
import BaseDm from "components/BaseDm";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC } from "constants/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../styled";

// tododanhmuc

const SoHieuGiuong = () => {
  const {
    soHieuGiuong: { onSearch, createOrEdit, onDelete, updateData },
    khoa: { getListAllKhoa },
    phong: { getListPhongTongHop },
    loaiGiuong: { getListAllLoaiGiuong },
  } = useDispatch();
  const {
    soHieuGiuong: {
      listSoHieuGiuong,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    khoa: { listAllKhoa },
    phong: { listAllPhong, listRoom },
    loaiGiuong: { listAllLoaiGiuong },
  } = useSelector((state) => state);

  const handleDeleteItem = (item) => {
    onDelete(item?.id);
  };

  useEffect(() => {
    getListAllKhoa({ page: "", size: "", acitve: true });
    getListPhongTongHop({ page: "", size: "", active: true });
    getListAllLoaiGiuong({ page: "", size: "", active: true });
  }, []);

  useEffect(() => {
    if (dataEditDefault) {
      getListPhongTongHop({
        page: "",
        size: "",
        active: true,
        khoaId: dataEditDefault?.phong?.khoaId,
        dsLoaiPhong: [50, 60],
      });
    }
  }, [dataEditDefault]);
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
          title="Số hiệu giường"
          sort_key="soHieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soHieu || 0}
          search={
            <Input
              placeholder="Tìm sô hiệu giường"
              onChange={(e) => {
                onSearchInput(e.target.value, "soHieu");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "soHieu",
      key: "soHieu",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên loại giường"
          sort_key="dsLoaiGiuongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsLoaiGiuongId || 0}
          searchSelect={
            <Select
              placeholder="Chọn lọai giường"
              data={listAllLoaiGiuong}
              onChange={(e) => {
                onSearchInput(e, "dsLoaiGiuongId");
              }}
            />
          }
        />
      ),
      width: 260,
      dataIndex: "dsLoaiGiuong",
      key: "dsLoaiGiuong",
      render: (item) => (item || []).map((x) => x.ten).join(","),
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          searchSelect={
            <Select
              placeholder="Chọn khoa"
              data={listAllKhoa}
              onChange={(e) => {
                onSearchInput(e, "khoaId");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "phong",
      key: "phong",
      render: (item) => item?.khoa,
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
          sort_key="phongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.phongId || 0}
          searchSelect={
            <Select
              placeholder="Chọn phòng"
              data={listRoom}
              onChange={(e) => {
                onSearchInput(e, "phongId");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "phong",
      key: "phong",
      render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 100,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: 50,
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      render: (item, data) => {
        return (
          <div className="support">
            <img
              onClick={() => handleDeleteItem(data)}
              src={require("assets/images/his-core/iconDelete.png")}
              alt="..."
            ></img>
          </div>
        );
      },
    },
  ];
  const onChageKhoa = (e) => {
    getListPhongTongHop({
      khoaId: e,
      dsLoaiPhong: [50, 60],
      page: "",
      size: "",
    });
  };
  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Số hiệu giường"
          name="soHieu"
          rules={[
            {
              required: true,
              message: "Vui lòng số hiệu giường!",
            },
            {
              max: 255,
              message: "Vui lòng nhập tên xuất xứ không quá 255 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập số hiệu giường!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập số hiệu giường"
          />
        </Form.Item>
        <Form.Item
          label="Tên loại giường"
          name="dsLoaiGiuongId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại giường!",
            },
          ]}
        >
          <Select
            className="input-option"
            placeholder="Vui lòng chọn loại giường"
            data={listAllLoaiGiuong}
            mode="multiple"
          />
        </Form.Item>
        <Form.Item
          label="Khoa"
          name="khoaId"
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
            data={listAllKhoa}
            onChange={onChageKhoa}
          />
        </Form.Item>
        <Form.Item label="Phòng" name="phongId">
          <Select
            className="input-option"
            placeholder="Vui lòng chọn phòng"
            data={listRoom}
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
  const customShowUpdate =
    ({ callback }) =>
    (data) => {
      callback({ ...data, khoaId: data?.phong?.khoaId });
    };

  return (
    <Main>
      <BaseDm
        titleTable="Danh mục số hiệu giường"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={onSearch}
        listData={listSoHieuGiuong}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        customShowUpdate={customShowUpdate}
      />
    </Main>
  );
};

export default SoHieuGiuong;
