import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Main } from "./styled";
import { Card, Pagination, TableWrapper, HeaderSearch } from "components";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const DanhSachPhieuXuat = (props) => {
  const history = useHistory();
  const [listTrangThaiPhieuNhapXuat] = useEnum(ENUM.TRANG_THAI_PHIEU_NHAP_XUAT);
  const [listLoaiNhapXuat] = useEnum(ENUM.LOAI_NHAP_XUAT, []);

  const { phieuNhapXuatId } = useSelector((state) => state.nhapKhoChiTiet);
  const {
    sort = {},
    listPhieuXuat,
    totalElements,
    page,
    size,
  } = useSelector((state) => state.phieuXuat);

  const {
    phieuXuat: { getListPhieuXuat, onSizeChange },
    nhapKhoChiTiet: { updateData: updateDataNhapKho },
  } = useDispatch();

  const onClickSort = (key, value) => {
    getListPhieuXuat({ sort: { key, value } });
  };
  const onChangePage = (page) => {
    getListPhieuXuat({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        if (record.loaiNhapXuat === 80) {
          history.push("/kho/xuat-kho/chi-tiet-linh-bu/" + id);
        } else if (record.loaiNhapXuat === 85) {
          history.push("/kho/chi-tiet-phieu-linh/" + id);
        } else {
          history.push("/kho/xuat-kho/chi-tiet/" + id);
        }
        updateDataNhapKho({
          phieuNhapXuatId: id,
          currentItem: { ...record },
        });
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    idDiff = phieuNhapXuatId;
    return record.id === idDiff ? "row-actived" : "";
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={sort.key === "soPhieu" ? sort.value : 0}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Kho nhập"
          sort_key="kho"
          onClickSort={onClickSort}
          dataSort={sort.key === "kho" ? sort.value : 0}
        />
      ),
      width: "150px",
      dataIndex: "tenKho",
      key: "tenKho",
      render: (item, data) =>
        data?.loaiNhapXuat === 85 ? data.tenKhoDoiUng : item,
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={sort.key === "trangThai" ? sort.value : 0}
        />
      ),
      width: "70px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (item) => {
        return listTrangThaiPhieuNhapXuat.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại xuất"
          sort_key="loaiNhapXuat"
          onClickSort={onClickSort}
          dataSort={sort.key === "loaiNhapXuat" ? sort.value : 0}
        />
      ),
      width: "70px",
      key: "loaiNhapXuat",
      align: "center",
      dataIndex: "loaiNhapXuat",
      render: (item) => listLoaiNhapXuat?.find((i) => i.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Tháng dự trù"
          sort_key="thangDuTru"
          onClickSort={onClickSort}
          dataSort={sort.key === "thangDuTru" ? sort.value : 0}
        />
      ),
      width: "70px",
      dataIndex: "thangDuTru",
      align: "center",
      key: "thangDuTru",
      render: (item) => (item ? "Tháng " + item : ""),
    },
    {
      title: (
        <HeaderSearch
          title="Kho xuất"
          sort_key="khoDoiUng.ten"
          onClickSort={onClickSort}
          dataSort={sort.key === "khoDoiUng.ten" ? sort.value : 0}
        />
      ),
      width: "100px",
      dataIndex: "tenKhoDoiUng",
      key: "tenKhoDoiUng",
      render: (item, data) => (data.loaiNhapXuat === 85 ? data.tenKho : item),
    },
  ];
  return (
    <Main noPadding={true} top={8}>
      <TableWrapper
        columns={columns}
        dataSource={listPhieuXuat}
        onRow={onRow}
        scroll={{ x: 2000 }}
        rowKey={(record) => `${record.id}`}
        rowClassName={setRowClassName}
      />
      {!!totalElements && (
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        listData={listPhieuXuat}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
        stylePagination={{ justifyContent: "flex-start" }}
      />
      )}
    </Main>
  );
};

export default DanhSachPhieuXuat;
