import React, { useEffect, useRef } from "react";
import { TableWrapper, Pagination } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ENUM } from "constants/index";
import { Checkbox } from "antd";
import IcSetting from "assets/svg/ic-setting.svg";
import { useEnum } from "hook";

const { Column } = TableWrapper;
const DanhSach = (props) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);
  const { dataSortColumn, listDvDaSuDung, totalElements, page, size } =
    useSelector((state) => state.dichVuDaSuDung);
  const { thongTinNbGoiDv } = useSelector((state) => state.nbGoiDv);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  const {
    dichVuDaSuDung: { onSizeChange, onSortChange, onSearch },
  } = useDispatch();

  useEffect(() => {
    if (thongTinNbGoiDv?.nbThongTinId) {
      onSearch({
        page: 0,
        size: 10,
        dataSearch: {
          nbThongTinId: thongTinNbGoiDv?.nbThongTinId,
          nbGoiDvId: thongTinNbGoiDv.id,
        },
      });
    }
  }, [thongTinNbGoiDv?.nbThongTinId]);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: "common.stt",
    }),
    Column({
      title: t("common.maHoSo"),
      sort_key: "maHoSo",
      dataSort: dataSortColumn["maHoSo"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      i18Name: "common.maHoSo",
    }),
    Column({
      title: t("common.maDv"),
      sort_key: "maDichVu",
      dataSort: dataSortColumn["maDichVu"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "maDichVu",
      key: "maDichVu",
      i18Name: "common.maDv",
      align: "left",
    }),
    Column({
      title: t("common.tenDichVu"),
      sort_key: "tenDichVu",
      dataSort: dataSortColumn["tenDichVu"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
      i18Name: "common.tenDichVu",
    }),
    Column({
      title: t("common.soLuong"),
      sort_key: "soLuong",
      dataSort: dataSortColumn["soLuong"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      i18Name: "common.soLuong",
    }),
    Column({
      title: t("common.ngayThucHien"),
      sort_key: "thoiGianThucHien",
      dataSort: dataSortColumn["thoiGianThucHien"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      align: "left",
      i18Name: "common.ngayThucHien",
      render: (value) => value?.toDateObject().format("dd/MM/yyyy HH:mm:ss"),
    }),
    Column({
      title: t("goiDichVu.trangThaiDv"),
      sort_key: "trangThai",
      dataSort: dataSortColumn["trangThai"] || "",
      onClickSort: onClickSort,
      width: "130px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "left",
      i18Name: "goiDichVu.trangThaiDv",
      render: (value) =>
        listTrangThaiDichVu?.find((item) => item.id == value)?.ten || "",
    }),
    Column({
      title: t("goiDichVu.soPhieuThu"),
      sort_key: "soPhieuThu",
      dataSort: dataSortColumn["soPhieuThu"] || "",
      onClickSort: onClickSort,
      width: "130px",
      dataIndex: "soPhieuThu",
      key: "soPhieuThu",
      i18Name: "goiDichVu.soPhieuThu",
      align: "left",
    }),
    Column({
      title: t("common.daTT"),
      sort_key: "thanhToan",
      dataSort: dataSortColumn["thanhToan"] || "",
      onClickSort: onClickSort,
      width: "130px",
      dataIndex: "thanhToan",
      key: "thanhToan",
      i18Name: "common.daTT",
      align: "center",
      render: (value) => <Checkbox checked={value} />,
    }),
  ];

  const onShowSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  return (
    <>
      <Main noPadding={true}>
        <div className="tab-content-header header-setting">
          {t("goiDichVu.danhSachDichVuDaSuDung")}
          <div>
            {t("common.thaoTac")}
            <IcSetting onClick={onSettings} className="icon" />
          </div>
        </div>
        <TableWrapper
          columns={columns}
          dataSource={listDvDaSuDung}
          rowKey={(record) => `${record.id}`}
          scroll={{ x: 1200 }}
          tableName="table_GOIDV_DichVuDaSuDung"
          ref={refSettings}
        />
        {!!totalElements && (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listDvDaSuDung}
            total={totalElements}
            onShowSizeChange={onShowSizeChange}
          />
        )}
      </Main>
    </>
  );
};

export default DanhSach;
