import React, { forwardRef, useRef, useImperativeHandle } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { TableWrapper } from "components";
import { useDispatch } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { FORMAT_DATE_TIME, ENUM } from "constants/index";
import IcSetting from "assets/svg/ic-setting.svg";
const { Column } = TableWrapper;

const DanhSachSuatAn = forwardRef(
  ({ tableName = "TABLE_HSBA_SUAT_AN" }, ref) => {
    const refSettings = useRef(null);
    const { t } = useTranslation();

    const listDvSuatAn = useStore("chiDinhSuatAn.listDvSuatAn", []);
    const dataSortColumn = useStore("chiDinhSuatAn.dataSortColumn", {});
    const [listTrangThai] = useEnum(ENUM.TRANG_THAI_PHIEU_LINH_SUAT_AN);

    const {
      chiDinhSuatAn: { onSortChange },
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
        render: (value, row, index) => {
          return index + 1;
        },
      }),
      Column({
        title: t("common.tenDichVu"),
        sort_key: "tenDichVu",
        dataSort: dataSortColumn["tenDichVu"] || "",
        onClickSort: onClickSort,
        width: "250px",
        dataIndex: "tenDichVu",
        key: "tenDichVu",
        i18Name: "common.tenDichVu",
      }),
      Column({
        title: t("quanLyNoiTru.suatAn.loaiBuaAn"),
        sort_key: "tenLoaiBuaAn",
        dataSort: dataSortColumn["tenLoaiBuaAn"] || "",
        onClickSort: onClickSort,
        width: "150px",
        dataIndex: "tenLoaiBuaAn",
        key: "tenLoaiBuaAn",
        i18Name: "quanLyNoiTru.suatAn.loaiBuaAn",
      }),
      Column({
        title: t("quanLyNoiTru.suatAn.sl"),
        sort_key: "soLuong",
        dataSort: dataSortColumn["soLuong"] || "",
        onClickSort: onClickSort,
        width: "80px",
        dataIndex: "soLuong",
        key: "soLuong",
        i18Name: "quanLyNoiTru.suatAn.sl",
      }),
      Column({
        title: t("quanLyNoiTru.suatAn.dvt"),
        sort_key: "tenDonViTinh",
        dataSort: dataSortColumn["tenDonViTinh"] || "",
        onClickSort: onClickSort,
        width: "90px",
        dataIndex: "tenDonViTinh",
        key: "tenDonViTinh",
        i18Name: "quanLyNoiTru.suatAn.dvt",
      }),
      Column({
        title: t("common.trangThai"),
        sort_key: "trangThai",
        dataSort: dataSortColumn["trangThai"] || "",
        onClickSort: onClickSort,
        width: "100px",
        dataIndex: "trangThai",
        key: "trangThai",
        i18Name: "common.trangThai",
        align: "center",
        render: (value) => listTrangThai.find((x) => x.id === value)?.ten,
      }),
      Column({
        title: t("quanLyNoiTru.suatAn.thoiGianThucHien"),
        sort_key: "thoiGianThucHien",
        dataSort: dataSortColumn["thoiGianThucHien"] || "",
        onClickSort: onClickSort,
        width: "200px",
        dataIndex: "thoiGianThucHien",
        key: "thoiGianThucHien",
        i18Name: "quanLyNoiTru.suatAn.thoiGianThucHien",
        render: (value) => value && moment(value).format(FORMAT_DATE_TIME),
      }),
      Column({
        title: t("quanLyNoiTru.suatAn.soPhieuLinh"),
        sort_key: "soPhieuLinh",
        dataSort: dataSortColumn["soPhieuLinh"] || "",
        onClickSort: onClickSort,
        width: "120px",
        dataIndex: "soPhieuLinh",
        key: "soPhieuLinh",
        i18Name: "quanLyNoiTru.suatAn.soPhieuLinh",
        align: "center",
      }),
      Column({
        title: t("quanLyNoiTru.suatAn.dotXuat"),
        sort_key: "dotXuat",
        dataSort: dataSortColumn["dotXuat"] || "",
        onClickSort: onClickSort,
        width: "90px",
        dataIndex: "dotXuat",
        key: "dotXuat",
        i18Name: "quanLyNoiTru.suatAn.dotXuat",
        align: "center",
        render: (value) => <Checkbox checked={value} />,
      }),
      Column({
        title: t("common.tuTra"),
        sort_key: "tuTra",
        dataSort: dataSortColumn["tuTra"] || "",
        onClickSort: onClickSort,
        width: "80px",
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
        width: "130px",
        dataIndex: "khongTinhTien",
        key: "khongTinhTien",
        i18Name: "hsba.khongTinhTien",
        align: "center",
        render: (value) => <Checkbox checked={value} />,
      }),
      Column({
        title: <IcSetting onClick={onSettings} className="icon" />,
        width: "40px",
        key: "index",
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
          dataSource={listDvSuatAn}
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

export default DanhSachSuatAn;
