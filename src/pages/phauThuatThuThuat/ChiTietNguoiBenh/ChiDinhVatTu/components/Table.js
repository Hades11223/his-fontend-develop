import React, { useState, useRef, useEffect } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { MainTable } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch } from "react-redux";
import { Checkbox, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import ChinhSuaVatTu from "pages/chiDinhDichVu/DichVuVatTu/ChinhSuaVatTu";
import { ModalNotification2 } from "components/ModalConfirm";
import IcChangeService from "assets/images/xetNghiem/icChangeService.png";
import ModalChuyenDichVu from "pages/phauThuatThuThuat/ChiTietNguoiBenh/ModalChuyenDichVu";
import IcGroup from "assets/images/template/icGroup.png";
import { LOAI_DICH_VU } from "constants/index";

function Table(props) {
  const refSuaThongTin = useRef(null);
  const refNotification = useRef();
  const refChuyenDichVu = useRef(null);
  const refSettings = useRef(null);
  const { onDeleteDichVu, getListDichVuVatTu, themThongTin } =
    useDispatch().chiDinhVatTu;

  const { listDvVatTu, disabledAll, chiDinhTuDichVuId, nbDotDieuTriId } = props;
  const { t } = useTranslation();

 


  const onDelete = (record) => {
    if (refNotification.current)
      refNotification.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: t("common.banCoChacMuonXoa") + record.ten + "?",
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu(record.id).then((s) =>
            getListDichVuVatTu({
              nbDotDieuTriId: nbDotDieuTriId,
              chiDinhTuDichVuId: chiDinhTuDichVuId,
              dsTrangThaiHoan: [0, 10, 20],
              chiDinhTuLoaiDichVu: LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
            })
          );
        },
        () => {}
      );
  };

  const onEdit = (record) => () => {
    refSuaThongTin.current && refSuaThongTin.current.show(record);
  };

  const onChuyenVatTu = (data) => {
    refChuyenDichVu.current &&
      refChuyenDichVu.current.show(data, () => {
        getListDichVuVatTu({
          nbDotDieuTriId: data?.nbDotDieuTriId,
          chiDinhTuDichVuId: data?.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: data?.chiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
        });
      });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} sort_key="index" />,
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
        <HeaderSearch title={t("khamBenh.donThuoc.tenVatTu")} sort_key="ten" />
      ),
      width: "362px",
      dataIndex: "ten",
      key: "ten",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.tenVatTu"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.slChiDinh")}
          sort_key="soLuongYeuCau"
        />
      ),
      width: "90px",
      dataIndex: "soLuongYeuCau",
      key: "soLuongYeuCau",
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
    },
    {
      title: <HeaderSearch title={t("pttt.kho")} sort_key="tenKho" />,
      width: "150px",
      dataIndex: "tenKho",
      key: "tenKho",
      colSpan: 1,
      i18Name: t("pttt.kho"),
      show: true,
      render: (item, list) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.bacSiChiDinh")}
          sort_key="tenBacSiChiDinh"
        />
      ),
      width: "150px",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.bacSiChiDinh"),
      show: true,
    },

    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.soPhieuLinh")}
          sort_key="soPhieuLinh"
        />
      ),
      width: "120px",
      dataIndex: "soPhieuLinh",
      key: "soPhieuLinh",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.soPhieuLinh"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.daDuyetPhat")}
          sort_key="phat"
        />
      ),
      width: "120px",
      dataIndex: "phat",
      key: "phat",
      colSpan: 1,
      align: "center",
      i18Name: t("khamBenh.donThuoc.daDuyetPhat"),
      show: true,
      render: (item, record) => {
        return <Checkbox checked={item} />
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.khac")}
              <img
                src={IcGroup}
                alt="..."
                onClick={onSettings}
                style={{ cursor: "pointer" }}
              />
            </>
          }
        />
      ),
      width: 110,
      dataIndex: "action",
      key: "action",
      align: "center",
      colSpan: 1,
      fixed: "right",
      render: (item, record, index) => {
        return disabledAll ? (
          <></>
        ) : (
          <div className="action-btn">
            <Tooltip title={t("tiepDon.suaThongTin")} placement="bottom">
              <img
                style={{ objectFit: "contain" }}
                src={IconEdit}
                alt="..."
                onClick={onEdit(record)}
              />
            </Tooltip>
            <Tooltip title={t("pttt.chuyenDichVu")} placement="bottom">
              <img
                style={{ objectFit: "contain" }}
                src={IcChangeService}
                alt="..."
                onClick={() => onChuyenVatTu(record)}
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
        dataSource={listDvVatTu}
        scroll={{ x: 1000 }}
        tableName="table_PhauThuatThuThuat_VatTu"
        ref={refSettings}
      />
      <ChinhSuaVatTu ref={refSuaThongTin} />
      <ModalNotification2 ref={refNotification} />
      <ModalChuyenDichVu ref={refChuyenDichVu} chinhSuaDichVu={themThongTin} />
    </MainTable>
  );
}

export default React.memo(Table);
