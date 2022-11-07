import React, {  useRef } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { MainTable } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import ChinhSuaHoaChat from "pages/chiDinhDichVu/DichVuHoaChat/ChinhSuaHoaChat";
import { ModalNotification2 } from "components/ModalConfirm";
import ModalChuyenDichVu from "pages/phauThuatThuThuat/ChiTietNguoiBenh/ModalChuyenDichVu";
import IcGroup from "assets/images/template/icGroup.png";
import { LOAI_DICH_VU } from "constants/index";

function Table(props) {
  const refSuaThongTin = useRef(null);
  const refNotification = useRef();
  const refChuyenDichVu = useRef(null);
  const refSettings = useRef(null);
  const { onDeleteDichVu, getListDichVuHoaChat, themThongTin } =
    useDispatch().chiDinhHoaChat;

  const { listDvHoaChat, disabledAll, nbDotDieuTriId, chiDinhTuDichVuId } = props;
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
            getListDichVuHoaChat({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
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
        <HeaderSearch title={t("quanLyNoiTru.toDieuTri.tenHoaChat")} sort_key="ten" />
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
        tableName="table_PhauThuatThuThuat_HoaChat"
        ref={refSettings}
      />
      <ChinhSuaHoaChat ref={refSuaThongTin} />
      <ModalNotification2 ref={refNotification} />
      <ModalChuyenDichVu ref={refChuyenDichVu} chinhSuaDichVu={themThongTin} />
    </MainTable>
  );
}

export default React.memo(Table);
