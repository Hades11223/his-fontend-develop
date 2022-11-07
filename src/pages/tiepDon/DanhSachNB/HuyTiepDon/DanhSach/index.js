import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import IcDelete from "assets/images/utils/delete-blue.png";
import ModalDichVu from "pages/tiepDon/components/ModalDichVu";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

const DanhSach = (props) => {
  const { t } = useTranslation();
  const refDichVu = useRef(null);
  const {
    danhSachNbHuyTiepDon: {
      getListNguoiBenhTiepDon,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      huyTiepDon,
    },
  } = useDispatch();
  const {
    danhSachNbHuyTiepDon: {
      dataSortColumn,
      listNguoiBenhTiepDon,
      totalElements,
      page,
      size,
    },
  } = useSelector((state) => state);
  useEffect(() => {
    onChangeInputSearch({ size: 10, active: false });
  }, []);

  const onChangePage = (page) => {
    getListNguoiBenhTiepDon({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        // history.push("/ho-so-benh-an/chi-tiet-nguoi-benh/" + id);
      },
    };
  };

  const onEdit = (record) => {
    history.push("/tiep-don/" + record?.id);
  };

  const onView = (data) => {
    if (refDichVu.current) refDichVu.current.show(data);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.ngayDangKy")}
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.hoTenNguoiBenh")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ngaySinh")}
          sort_key="ngaySinh"
          dataSort={dataSortColumn["ngaySinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (field, item, index) =>
        field
          ? moment(field).format(item.chiNamSinh ? "YYYY" : "DD / MM / YYYY")
          : "",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.diaChi")}
          // sort_key="diaChi"
          // dataSort={dataSortColumn["diaChi"] || ""}
          // onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soDienThoai")}
          sort_key="soDienThoai"
          dataSort={dataSortColumn["soDienThoai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: <HeaderSearch title={t("common.tienIch")} />,
      width: "50px",
      dataIndex: "",
      key: "",
      align: "center",
      render: (item, data) => {
        return (
          <Tooltip title={t("tiepDon.hoanTacHuyTiepDon")}>
            <div className="icon">
              <img
                src={IcDelete}
                alt="..."
                onClick={() => {
                  huyTiepDon({ dsId: [item.id], active: true });
                }}
              ></img>
              {/* <img src={IcList} alt="..." onClick={() => onView(data)}></img> */}
            </div>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listNguoiBenhTiepDon}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        listData={listNguoiBenhTiepDon}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
      <ModalDichVu ref={refDichVu} />
    </Main>
  );
};

export default DanhSach;
