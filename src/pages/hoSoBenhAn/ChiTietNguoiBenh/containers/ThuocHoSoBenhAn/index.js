import React, { forwardRef, useRef, useImperativeHandle } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { TableWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import { useTranslation } from "react-i18next";
import IcSetting from "assets/svg/ic-setting.svg";
import { DOI_TUONG } from "constants/index";
const { Column } = TableWrapper;

const ThuocHoSoBenhAn = forwardRef(
  ({ tableName = "TABLE_HSBA_THUOC", thongTinBenhNhan  }, ref) => {
    const refSettings = useRef(null);

    const { t } = useTranslation();
    const { dataSortColumn, listDsThuoc } = useSelector(
      (state) => state.dsThuoc
    );
    const { onSortChange } = useDispatch().dsThuoc;

    useImperativeHandle(ref, () => ({
      onSettings,
    }));

    const onSettings = () => {
      refSettings && refSettings.current.settings();
    };
    const onClickSort = (key, value) => {
      onSortChange({ [key]: value });
    };

    const columns = [
      Column({
        title: t("common.stt"),
        width: "80px",
        dataIndex: "index",
        key: "index",
        align: "center",
        ignore: true,
      }),
      Column({
        title: t("hsba.tenThuoc"),
        sort_key: "ten",
        dataSort: dataSortColumn["ten"] || "",
        onClickSort: onClickSort,
        width: "250px",
        dataIndex: "ten",
        key: "ten",
        i18Name: "hsba.tenThuoc",
        render: (item, data) => {
          return (
            <div>{`${data?.tenDichVu || data?.ten || ""} - ${
              data?.tenHoatChat
            } - ${data?.hamLuong}`}</div>
          );
        },
      }),
      Column({
        title: t("hsba.slKe"),
        sort_key: "soLuongYeuCau",
        dataSort: dataSortColumn["soLuongYeuCau"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "soLuongYeuCau",
        key: "soLuongYeuCau",
        align: "right",
        i18Name: "hsba.slKe",
      }),
      Column({
        title: t("hsba.slDung"),
        sort_key: "soLuong",
        dataSort: dataSortColumn["soLuong"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "soLuong",
        key: "soLuong",
        align: "right",
        i18Name: "hsba.slDung",
      }),
      Column({
        title: t("common.thanhTien"),
        sort_key: "thanhTien",
        dataSort: dataSortColumn["thanhTien"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "thanhTien",
        key: "thanhTien",
        align: "right",
        i18Name: "common.thanhTien",
        render: (value) => value.formatPrice(),
      }),
      Column({
        title: t("common.daPhat"),
        sort_key: "phat",
        dataSort: dataSortColumn["phat"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "phat",
        key: "phat",
        i18Name: "common.daPhat",
        align: "center",
        render: (value) => <Checkbox checked={value} />,
      }),
      Column({
        title: t("common.ttThanhToan"),
        sort_key: "thanhToan",
        dataSort: dataSortColumn["thanhToan"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "thanhToan",
        key: "thanhToan",
        i18Name: "common.ttThanhToan",
        align: "center",
        render: (value) => <Checkbox checked={value} />,
      }),
      Column({
        title: t("hsba.lieuDungCachDung"),
        sort_key: "tenLieuDung",
        dataSort: dataSortColumn["tenLieuDung"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "tenLieuDung",
        key: "tenLieuDung",
        i18Name: "hsba.lieuDungCachDung",
        align: "center",
      }),
      Column({
        title: t("hsba.phongThucHien"),
        sort_key: "tenPhongThucHien",
        dataSort: dataSortColumn["tenPhongThucHien"] || "",
        onClickSort: onClickSort,
        width: "200px",
        dataIndex: "tenPhongThucHien",
        key: "tenPhongThucHien",
        i18Name: "hsba.phongThucHien",
        align: "center",
      }),
      Column({
        title: t("hsba.bsChiDinh"),
        sort_key: "tenBacSiChiDinh",
        dataSort: dataSortColumn["tenBacSiChiDinh"] || "",
        onClickSort: onClickSort,
        width: "200px",
        dataIndex: "tenBacSiChiDinh",
        key: "tenBacSiChiDinh",
        i18Name: "hsba.bsChiDinh",
        align: "center",
      }),
      Column({
        title: t("hsba.khoaChiDinh"),
        sort_key: "tenKhoaChiDinh",
        dataSort: dataSortColumn["tenKhoaChiDinh"] || "",
        onClickSort: onClickSort,
        width: "200px",
        dataIndex: "tenKhoaChiDinh",
        key: "tenKhoaChiDinh",
        i18Name: "hsba.khoaChiDinh",
        align: "center",
      }),
      Column({
        title: t("hsba.tgChiDinh"),
        sort_key: "thoiGianChiDinh",
        dataSort: dataSortColumn["thoiGianChiDinh"] || "",
        onClickSort: onClickSort,
        width: "200px",
        dataIndex: "thoiGianChiDinh",
        key: "thoiGianChiDinh",
        i18Name: "hsba.tgChiDinh",
        align: "center",
        render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
      }),
      Column({
        title: t("hsba.tgPhat"),
        sort_key: "thoiGianDuyet",
        dataSort: dataSortColumn["thoiGianDuyet"] || "",
        onClickSort: onClickSort,
        width: "200px",
        dataIndex: "thoiGianDuyet",
        key: "thoiGianDuyet",
        i18Name: "hsba.tgPhat",
        align: "center",
        render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
      }),
      Column({
        title: "TT30",
        sort_key: "tenMucDich",
        dataSort: dataSortColumn["tenMucDich"] || "",
        onClickSort: onClickSort,
        width: "200px",
        dataIndex: "tenMucDich",
        key: "tenMucDich",
        i18Name: "TT30",
      }),
      Column({
        title: t("common.tuTra"),
        sort_key: "tuTra",
        dataSort: dataSortColumn["tuTra"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "tuTra",
        key: "tuTra",
        i18Name: "common.tuTra",
        align: "center",
        render: (value) => <Checkbox checked={value} />,
      }),
      Column({
        title: t("hsba.khongTinhTien"),
        sort_key: "khongTinhTien",
        dataSort: dataSortColumn["khongTinhTien"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "khongTinhTien",
        key: "khongTinhTien",
        i18Name: "hsba.khongTinhTien",
        align: "center",
        render: (value) => <Checkbox checked={value} />,
      }),
      Column({
        title: <IcSetting onClick={onSettings} className="icon" />,
        width: "40px",
        key: "setting",
        dataIndex: "setting",
        align: "center",
        fixed: "right",
        ignore: true,
      }),
    ];
    const setRowClassName = (record) => {
      if (
        record?.tenMucDich &&
        thongTinBenhNhan?.doiTuong === DOI_TUONG.BAO_HIEM
      )
        return "row-tt35";
    };
    return (
      <Main>
        <TableWrapper
          columns={columns}
          dataSource={listDsThuoc}
          //   onRow={onRow}
          rowKey={(record) => record.id}
          rowClassName={setRowClassName}
          tableName={tableName}
          ref={refSettings}
        />
      </Main>
    );
  }
);

export default ThuocHoSoBenhAn;
