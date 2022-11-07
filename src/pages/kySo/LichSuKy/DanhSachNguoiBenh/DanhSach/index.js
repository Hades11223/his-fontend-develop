import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import {  useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GIOI_TINH_BY_VALUE } from "constants/index";
import moment from "moment";
import {  useStore } from "hook";

const DanhSach = (props) => {
  const {phieuNhapXuatId} = props;
  const { listKhoUser } = useStore("kho", []);
  const { dsKhoId, dsTrangThai, listData } = useStore(
    "lichSuKyDanhSachNguoiBenh",
    []
  );
  const { dataSortColumn } = useStore("lichSuKyDanhSachNguoiBenh", []);

  const { totalElements, page, size } = useStore(
    "lichSuKyDanhSachNguoiBenh",
    []
  );
  const {
    lichSuKyDanhSachNguoiBenh: {
      getListTongHop,
      updateData,
      onSizeChange,
      onSortChangeTongHop,
    },
    utils: { getUtils },
  } = useDispatch();

  useEffect(() => {
    let obj = {
      dsTrangThai,
      dsKhoId,
      tongHop: true,
    };
    for (let i in obj) {
      // xóa param search bằng null hoặc không có
      if (!obj[i] || obj[i]?.length === 0) {
        delete obj[i];
      }
    }
    onSizeChange(obj);
    getUtils({ name: "TrangThaiPhieuNhapXuat" });
  }, []);
  useEffect(() => {
    if (listKhoUser.length > 0) {
      // random kho khi render lần đầu
      const list = listKhoUser.map((item) => item.id);
      const randomId = list[~~(Math.random() * list.length)]; // random
      updateData({
        dsKhoId: [randomId],
      });
      let obj = {
        dsTrangThai,
        dsKhoId,
        tongHop: true,
      };
      for (let i in obj) {
        // xóa param search bằng null hoặc không có
        if (!obj[i] || obj[i]?.length === 0) {
          delete obj[i];
        }
      }
      onSizeChange(obj);
    }
  }, [listKhoUser]);
  const onClickSort = (key, value) => {
    onSortChangeTongHop({ [key]: value });
  };
  const onChangePage = (page) => {
    getListTongHop({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size, tongHop: true });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push(
          "/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/" + id
        );
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
      width: "22px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maHoSo"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã người bệnh"
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maNb"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNb"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày sinh"
          sort_key="ngaySinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngaySinh"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (item) => {
        return (item && moment(item).format("DD/MM/YYYY")) || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giới tính"
          sort_key="gioiTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["gioiTinh"] || ""}
        />
      ),
      width: "30px",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      render: (item) => {
        return item && GIOI_TINH_BY_VALUE[item];
      },
    },
    {
      title: <HeaderSearch title="Địa chỉ" />,
      width: "150px",
      dataIndex: "diaChi",
      key: "diaChi",
      // dataIndex: "nbDiaChi",
      // key: "nbDiaChi",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Xem danh sách phiếu" />,
      width: "60px",
      align: "center",
      render: (item) => {
        return (
          <img
            src={require("assets/images/utils/eye.png")}
            alt=""
            onClick={() =>
              history.push(
                "/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/" +
                  item.id
              )
            }
          />
        );
      },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listData}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          rowClassName={setRowClassName}
        />
        <Pagination
          listData={listData}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};

export default (DanhSach);
