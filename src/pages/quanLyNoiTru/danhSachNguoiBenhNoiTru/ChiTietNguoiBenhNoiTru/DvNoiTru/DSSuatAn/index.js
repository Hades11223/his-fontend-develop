import React, { useRef } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Checkbox, Tooltip } from "antd";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import moment from "moment";
import Icon from "@ant-design/icons";
import IcEdit from "assets/svg/ic-edit.svg";
import ChinhSuaSuatAn from "pages/chiDinhDichVu/DichVuSuatAn/ChinhSuaSuatAn";
import IcGroup from "assets/images/template/icGroup.png";

const { Column } = TableWrapper;

const DSSuatAn = ({ refreshList }) => {
  const { t } = useTranslation();
  const { dsSuatAn } = useSelector((state) => state.dvNoiTru);
  const refSuaThongTin = useRef(null);
  const refSettings = useRef(null);

  const [listTrangThai] = useEnum(ENUM.TRANG_THAI_PHIEU_LINH_SUAT_AN);

  const onEdit = (record) => () => {
    refSuaThongTin.current &&
      refSuaThongTin.current.show(record, () => {
        refreshList();
      });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
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
      title: t("common.tenDichVu"),
      width: "250px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "common.tenDichVu",
    }),
    Column({
      title: t("quanLyNoiTru.suatAn.loaiBuaAn"),
      width: "100px",
      dataIndex: "tenLoaiBuaAn",
      key: "tenLoaiBuaAn",
      i18Name: "quanLyNoiTru.suatAn.loaiBuaAn",
    }),
    // Column({
    //   title: t("quanLyNoiTru.suatAn.sl"),
    //   width: "50px",
    //   dataIndex: "soLuong",
    //   key: "soLuong",
    //   i18Name: "quanLyNoiTru.suatAn.sl",
    // }),
    Column({
      title: t("quanLyNoiTru.suatAn.dvt"),
      width: "100px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      i18Name: "quanLyNoiTru.suatAn.dvt",
    }),
    Column({
      title: t("common.trangThai"),
      width: "100px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: "common.trangThai",
      render: (value) => listTrangThai.find((x) => x.id === value)?.ten,
    }),
    Column({
      title: t("quanLyNoiTru.suatAn.thoiGianThucHien"),
      width: "160px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: "quanLyNoiTru.suatAn.thoiGianThucHien",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("quanLyNoiTru.suatAn.soPhieuLinh"),
      width: "100px",
      dataIndex: "soPhieuLinh",
      key: "soPhieuLinh",
      i18Name: "quanLyNoiTru.suatAn.soPhieuLinh",
    }),
    Column({
      title: t("quanLyNoiTru.suatAn.dotXuat"),
      width: "100px",
      dataIndex: "dotXuat",
      key: "dotXuat",
      align: "center",
      i18Name: "quanLyNoiTru.suatAn.dotXuat",
      render: (item) => <Checkbox checked={item} />,
    }),

    Column({
      title: t("hsba.khongTinhTien"),
      width: "100px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      i18Name: "hsba.khongTinhTien",
      render: (item) => <Checkbox checked={item} />,
    }),
    Column({
      title: t("common.tuTra"),
      width: "100px",
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      i18Name: "common.tuTra",
      render: (item) => <Checkbox checked={item} />,
    }),
    Column({
      title: t("hsba.bsChiDinh"),
      width: "160px",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      i18Name: "hsba.bsChiDinh",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.tenKhoaChiDinh"),
      sort_key: "tenKhoaChiDinh",
      width: "160px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      i18Name: "quanLyNoiTru.dvNoiTru.tenKhoaChiDinh",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.thoiGianChiDinh"),
      sort_key: "thoiGianChiDinh",
      width: "160px",
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      i18Name: "quanLyNoiTru.dvNoiTru.thoiGianChiDinh",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.thoiGianPhat"),
      sort_key: "thoiGianDuyet",
      width: "160px",
      dataIndex: "thoiGianDuyet",
      key: "thoiGianDuyet",
      i18Name: "quanLyNoiTru.dvNoiTru.thoiGianPhat",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.manHinhChiDinh"),
      sort_key: "manHinhChiDinh",
      width: "160px",
      dataIndex: "manHinhChiDinh",
      key: "manHinhChiDinh",
      i18Name: "quanLyNoiTru.dvNoiTru.manHinhChiDinh",
    }),
    Column({
      title: (
        <>
          {t("common.tienIch")}{" "}
          <img
            src={IcGroup}
            alt="..."
            onClick={onSettings}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
      width: "100px",
      align: "center",
      fixed: "right",
      ignore: true,
      render: (list, item, index) => {
        return (
          <div className="ic-action">
            <Tooltip title={"Chỉnh sửa dịch vụ"} placement="bottom">
              <Icon
                className="ic-action"
                onClick={onEdit(item)}
                component={IcEdit}
              ></Icon>
            </Tooltip>
          </div>
        );
      },
    }),
  ];

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={dsSuatAn || []}
        onRow={onRow}
        rowKey={(record) => record.id}
        tableName="table_DVNOITRU_DSSuatAn"
        ref={refSettings}
      />

      <ChinhSuaSuatAn ref={refSuaThongTin} />
    </Main>
  );
};

export default DSSuatAn;
