import React, { forwardRef, useRef, useImperativeHandle } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { TableWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import { useTranslation } from "react-i18next";
import IcSetting from "assets/svg/ic-setting.svg";
const { Column } = TableWrapper;

const VatTuHoSoBenhAn = forwardRef(
  ({ tableName = "TABLE_HSBA_THUOC" }, ref) => {
    const refSettings = useRef(null);
    const { t } = useTranslation();

    const { listDsVatTu, dataSortColumn } = useSelector(
      (state) => state.dsVatTu
    );
    const {
      dsVatTu: { onSortChange },
    } = useDispatch();

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
        title: t("hsba.tenVatTu"),
        sort_key: "ten",
        dataSort: dataSortColumn["ten"] || "",
        onClickSort: onClickSort,
        width: "250px",
        dataIndex: "ten",
        key: "ten",
        i18Name: "hsba.tenVatTu",
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
        render: (value) => value && value.formatPrice(),
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

    return (
      <Main>
        <TableWrapper
          columns={columns}
          dataSource={listDsVatTu}
          //   onRow={onRow}
          rowKey={(record) => record.id}
          //   rowClassName={setRowClassName}
          tableName={tableName}
          ref={refSettings}
        />
      </Main>
    );
  }
);

export default VatTuHoSoBenhAn;
