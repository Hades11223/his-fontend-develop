import React, { useRef } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Checkbox, Tooltip } from "antd";
import moment from "moment";
import Icon from "@ant-design/icons";
import IcEdit from "assets/svg/ic-edit.svg";
import ChinhSuaHoaChat from "pages/chiDinhDichVu/DichVuHoaChat/ChinhSuaHoaChat";
import IcGroup from "assets/images/template/icGroup.png";

const { Column } = TableWrapper;

const HoaChat = ({ refreshList }) => {
  const { t } = useTranslation();
  const refSuaThongTin = useRef(null);
  const refSettings = useRef(null);
  const { hoaChat } = useSelector((state) => state.dvNoiTru);

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
      title: t("quanLyNoiTru.dvNoiTru.tenHoaChat"),
      sort_key: "tenDichVu",
      width: "250px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "quanLyNoiTru.dvNoiTru.tenHoaChat",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.thoiGianThucHien"),
      sort_key: "thoiGianThucHien",
      width: "160px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: "quanLyNoiTru.dvNoiTru.thoiGianThucHien",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("hsba.slKe"),
      width: "80px",
      dataIndex: "soLuongYeuCau",
      key: "soLuongYeuCau",
      align: "right",
      i18Name: "hsba.slKe",
    }),
    Column({
      title: t("hsba.slDung"),
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
      i18Name: "hsba.slDung",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.soLuongTra"),
      width: "80px",
      dataIndex: "soLuongTra",
      key: "soLuongTra",
      i18Name: "quanLyNoiTru.dvNoiTru.soLuongTra",
    }),
    // Column({
    //   title: t("quanLyNoiTru.dvNoiTru.kho"),
    //   width: "160px",
    //   dataIndex: "tenKho",
    //   key: "tenKho",
    //   i18Name: "quanLyNoiTru.dvNoiTru.kho",
    // }),
    Column({
      title: t("common.daPhat"),
      width: "100px",
      dataIndex: "phat",
      key: "phat",
      align: "center",
      i18Name: "common.daPhat",
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
      title: t("common.thanhTien"),
      sort_key: "thanhTien",
      width: "100px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      i18Name: "common.thanhTien",
      render: (value) => value.formatPrice(),
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.tenBacSiChiDinh"),
      width: "160px",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      i18Name: "quanLyNoiTru.dvNoiTru.tenBacSiChiDinh",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.tenKhoaChiDinh"),
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
                component={IcEdit}
                onClick={onEdit(item)}
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
        dataSource={hoaChat || []}
        onRow={onRow}
        rowKey={(record) => record.id}
        tableName="table_DVNOITRU_HoaChat"
        ref={refSettings}
      />

      <ChinhSuaHoaChat ref={refSuaThongTin} />
    </Main>
  );
};

export default HoaChat;
