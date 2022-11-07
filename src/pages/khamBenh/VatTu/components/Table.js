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
import IcSetting from "assets/svg/ic-setting.svg";
import { refConfirm } from "app";
import { useStore } from "hook";

function Table(props) {
  const {
    chiDinhVatTu: { onDeleteDichVu, getListDichVuVatTu },
  } = useDispatch();
  const currentToDieuTri = useStore("toDieuTri.currentToDieuTri", {});
  const [state, _setState] = useState({
    dataVatTu: [],
  });
  const refSettings = useRef(null);

  const { listDvVatTu, isReadonly } = props;
  const { t } = useTranslation();

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refSuaThongTin = useRef(null);
  useEffect(() => {
    if (listDvVatTu.length) {
      setState({ dataVatTu: listDvVatTu });
    }
  }, [listDvVatTu]);

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
            getListDichVuVatTu({
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
      width: "50px",
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
      width: "320px",
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
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: 80,
      dataIndex: "action",
      key: "action",
      align: "center",
      colSpan: 1,
      render: (item, record, index) => {
        return (
          !isReadonly && (
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
          )
        );
      },
    },
  ];
  return (
    <MainTable>
      <TableWrapper
        columns={columns}
        dataSource={state?.dataVatTu}
        scroll={{ x: false, y: false }}
        tableName="table_ChiDinhDichVuToDieuTri_VatTu"
        ref={refSettings}
      />
      <ChinhSuaVatTu ref={refSuaThongTin} />
    </MainTable>
  );
}

export default React.memo(Table);
