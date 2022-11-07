import React, { useRef } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { MainTable } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import ChinhSuaHoaChat from "pages/chiDinhDichVu/DichVuHoaChat/ChinhSuaHoaChat";
import IcSetting from "assets/svg/ic-setting.svg";
import { refConfirm } from "app";
import { useStore } from "hook";

function Table(props) {
  const {
    chiDinhHoaChat: { onDeleteDichVu, getListDichVuHoaChat },
  } = useDispatch();
  const currentToDieuTri = useStore("toDieuTri.currentToDieuTri", {});

  const refSettings = useRef(null);

  const { listDvHoaChat } = props;
  const { t } = useTranslation();

  const refSuaThongTin = useRef(null);

  const onDelete = (record) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content:
            t("common.banCoChacMuonXoa") + (record?.tenDichVu || "") + "?",
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu(record.id).then((s) =>
            getListDichVuHoaChat({
              nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
              chiDinhTuDichVuId: currentToDieuTri?.id,
              dsTrangThaiHoan: [0, 10, 20],
            })
          );
        }
      );
  };

  const onEdit = (record) => () => {
    refSuaThongTin.current && refSuaThongTin.current.show(record);
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" sort_key="index" />,
      width: "64px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, row, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.toDieuTri.tenHoaChat")}
          sort_key="ten"
        />
      ),
      width: "362px",
      dataIndex: "ten",
      key: "ten",
      colSpan: 1,
      i18Name: t("quanLyNoiTru.toDieuTri.tenHoaChat"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.slChiDinh")}
          sort_key="soLuong"
        />
      ),
      width: "90px",
      dataIndex: "soLuong",
      key: "soLuong",
      colSpan: 1,
      align: "center",
      i18Name: t("khamBenh.donThuoc.slChiDinh"),
      show: true,
      render: (item, list) => {
        return item + ` ${list?.tenDonViTinh ? list?.tenDonViTinh : ""}`;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.slTra")}
          sort_key="soLuongTra"
        />
      ),
      width: "90px",
      dataIndex: "soLuongTra",
      key: "soLuongTra",
      colSpan: 1,
      align: "center",
      i18Name: t("khamBenh.donThuoc.slTra"),
      show: true,
      render: (item, list) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title={t("khamBenh.donThuoc.slThucDung")} />,
      width: "90px",
      dataIndex: "soLuong",
      key: "soLuong",
      colSpan: 1,
      align: "center",
      i18Name: t("khamBenh.donThuoc.slThucDung"),
      show: true,
      render: (item, list) => {
        return (list?.soLuong || 0) - (list?.soLuongTra || 0);
      },
    },
    {
      title: (
        <HeaderSearch title={t("khamBenh.donThuoc.kho")} sort_key="tenKho" />
      ),
      width: "150px",
      dataIndex: "tenKho",
      key: "tenKho",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.kho"),
      show: true,
      render: (item, list) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.khac")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: 110,
      dataIndex: "action",
      key: "action",
      align: "center",
      colSpan: 1,
      render: (item, record, index) => {
        return (
          <div className="action-btn">
            <Tooltip title={t("tiepDon.suaThongTin")} placement="bottom">
              <img
                style={{ objectFit: "contain" }}
                src={IconEdit}
                alt="..."
                onClick={onEdit(record)}
              />
            </Tooltip>
            <Tooltip title={t("tiepDon.xoaDichVu")} placement="bottom">
              <img
                style={{ objectFit: "contain" }}
                src={IconDelete}
                alt="..."
                onClick={() => onDelete(record)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <MainTable>
      <TableWrapper
        columns={columns}
        dataSource={listDvHoaChat}
        scroll={{ x: false, y: false }}
        tableName="table_ChiDinhDichVuToDieuTri_HoaChat"
        ref={refSettings}
      />
      <ChinhSuaHoaChat ref={refSuaThongTin} />
    </MainTable>
  );
}

export default React.memo(Table);
