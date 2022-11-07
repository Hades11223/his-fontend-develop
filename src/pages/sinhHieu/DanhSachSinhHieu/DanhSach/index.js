import React, { useEffect, useRef } from "react";
import { TableWrapper, Pagination } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import IcEdit from "assets/images/khamBenh/edit.png";
import IcSetting from "assets/svg/ic-setting.svg";
import moment from "moment";
import { ModalChiTietNb } from "pages/sinhHieu/modals";
import { TRANG_THAI_DO_SINH_HIEU } from "constants/index";
import { Tooltip } from "antd";

const { Column } = TableWrapper;
const DanhSach = (props) => {
  const { t } = useTranslation();
  const refModalChiTietNb = useRef(null);
  const { dataSortColumn, listData, totalElements, page, size } = useSelector(
    (state) => state.sinhHieu
  );

  const {
    sinhHieu: { onSizeChange, onSortChange, onSearch, searchSinhHieuByParams },
  } = useDispatch();
  const refSettings = useRef(null);

  useEffect(() => {
    searchSinhHieuByParams({});
  }, []);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onRow = (record) => {
    return {
      onClick: onChiTietNb(record),
    };
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const onChiTietNb = (item) => () => {
    refModalChiTietNb.current && refModalChiTietNb.current.show(item);
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
    }),
    Column({
      title: t("sinhHieu.ngayDangKy"),
      sort_key: "thoiGianVaoVien",
      dataSort: dataSortColumn["thoiGianVaoVien"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      i18Name: "sinhHieu.ngayDangKy",
      align: "left",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    }),
    Column({
      title: t("common.maHs"),
      sort_key: "maHoSo",
      dataSort: dataSortColumn["maHoSo"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "left",
      i18Name: "common.maHs",
    }),
    Column({
      title: t("common.tenNb"),
      sort_key: "tenNb",
      dataSort: dataSortColumn["tenNb"] || "",
      onClickSort: onClickSort,
      width: "250px",
      dataIndex: "tenNb",
      key: "tenNb",
      i18Name: "common.tenNb",
      render: (field, item, index) => {
        return <div>{item?.tenNb}</div>;
      },
    }),
    Column({
      title: t("common.maNb"),
      sort_key: "maNb",
      dataSort: dataSortColumn["maNb"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maNb",
      key: "maNb",
      i18Name: "common.maNb",
      render: (field, item, index) => {
        return <div>{item?.maNb}</div>;
      },
    }),
    Column({
      title: t("common.ngaySinh"),
      sort_key: "ngaySinh",
      dataSort: dataSortColumn["ngaySinh"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      align: "left",
      i18Name: "common.ngaySinh",
      render: (field, item) => {
        const _ngaySinh = field
          ? moment(field).format(item.chiNamSinh ? "YYYY" : "DD/MM/YYYY")
          : "";
        const _tuoi = item.tuoi2 || "";

        return <div>{`${_ngaySinh}${_tuoi && ` - ${_tuoi}`}`}</div>;
      },
    }),
    Column({
      title: t("common.diaChi"),
      sort_key: "diaChi",
      dataSort: dataSortColumn["diaChi"] || "",
      onClickSort: onClickSort,
      width: "250px",
      dataIndex: "diaChi",
      key: "diaChi",
      i18Name: "common.diaChi",
    }),
    Column({
      title: t("common.soDienThoai"),
      sort_key: "soDienThoai",
      dataSort: dataSortColumn["soDienThoai"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      i18Name: "common.soDienThoai",
    }),
    Column({
      title: t("sinhHieu.maTheBhyt"),
      sort_key: "maTheBhyt",
      dataSort: dataSortColumn["maTheBhyt"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maTheBhyt",
      key: "maTheBhyt",
      i18Name: "sinhHieu.maTheBhyt",
    }),
    Column({
      title: t("sinhHieu.trangThai"),
      sort_key: "trangThai",
      dataSort: dataSortColumn["trangThai"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: "sinhHieu.trangThai",
      render: (item) => TRANG_THAI_DO_SINH_HIEU.find((x) => x.id === item)?.ten,
    }),
    Column({
      title: (
        <>
          {t("common.tienIch")}
          <IcSetting onClick={onSettings} className="icon" />
        </>
      ),
      width: "100px",
      align: "center",
      fixed: "right",
      ignore: true,
      render: (item) => {
        return (
          <Tooltip title="Nhập chỉ số">
            <img onClick={onChiTietNb(item)} src={IcEdit} alt="..." />
          </Tooltip>
        );
      },
    }),
  ];

  const onShowSizeChange = (size) => {
    onSizeChange({ size });
  };

  const refreshList = () => {
    searchSinhHieuByParams({});
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listData}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        tableName="table_SINHHIEU_DSNGUOIBENH"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listData}
          total={totalElements}
          onShowSizeChange={onShowSizeChange}
        />
      )}

      <ModalChiTietNb
        ref={refModalChiTietNb}
        refreshList={refreshList}
        {...props}
      />
    </Main>
  );
};

export default DanhSach;
