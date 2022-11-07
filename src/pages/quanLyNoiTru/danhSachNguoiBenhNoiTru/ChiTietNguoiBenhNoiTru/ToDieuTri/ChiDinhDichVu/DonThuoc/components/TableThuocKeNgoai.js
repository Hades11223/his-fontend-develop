import React, { useState, useEffect, useRef } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { MainTable } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch } from "react-redux";
import SuaThongTinThuoc from "pages/khamBenh/DonThuoc/components/ModalThongTinThuoc/SuaThongTinThuoc";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";
import { useStore } from "hook";

function Table(props) {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    visibleDelete: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const refSuaThongTinThuoc = useRef(null);

  const {
    chiDinhDichVuThuoc: {
      getListDichVuThuocKeNgoai,
      onDeleteDichVuThuocKeNgoai,
    },
  } = useDispatch();
  const currentToDieuTri = useStore("toDieuTri.currentToDieuTri", {});

  const { listDvThuoc } = props;

  useEffect(() => {
    setState({ dataThuoc: listDvThuoc });
  }, [listDvThuoc]);

  const onDelete = (record) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content:
            t("common.banCoChacMuonXoa") +
            (record?.tenDichVu || record?.tenThuocChiDinhNgoai || "") +
            "?",
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVuThuocKeNgoai(record.id).then((s) =>
            getListDichVuThuocKeNgoai({
              nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
              chiDinhTuDichVuId: currentToDieuTri?.id,
              dsTrangThaiHoan: [0, 10, 20],
            })
          );
        }
      );
  };

  const onEdit = (record) => {
    const newRecord = [...Array(record)];
    let newList = newRecord.map((item) => {
      item.ten = item?.ten;
      return item;
    });
    refSuaThongTinThuoc.current &&
      refSuaThongTinThuoc.current.show({ newTable: newList, isKeNgoai: true });
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
        <HeaderSearch
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
          sort_key="ten"
          // dataSort={dataSortColumn["tenThuoc"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "562px",
      dataIndex: "",
      key: "",
      colSpan: 1,
      render: (item, record) => {
        const ten = record?.tenDichVu || record?.tenThuocChiDinhNgoai;
        const tenLieuDung = `${
          record?.tenLieuDung || record?.lieuDung?.ten || ""
        }`;
        const tenDuongDung = `${
          record?.tenDuongDung ? " - " + record?.tenDuongDung : ""
        }`;
        const content1 = `${tenLieuDung}${tenDuongDung}${
          tenLieuDung || tenDuongDung ? `. ` : ""
        }`;
        return (
          <div>
            <span>{`${ten} ${
              record.tenHoatChat ? " (" + record.tenHoatChat + ")" : " "
            } ${record.hamLuong ? " - " + record.hamLuong : ""}`}</span>
            <br />
            <span style={{ fontSize: "12px" }}>
              {`${content1}`}
              {record.ghiChu ? `${t("common.luuY")}: ${record.ghiChu}` : ""}
            </span>
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} sort_key="soLuong" />,
      width: "116px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "left",
      colSpan: 1,
      render: (item, data) => {
        return `${item} ${
          data?.thuocChiDinhNgoai?.tenDonViTinh
            ? data?.thuocChiDinhNgoai?.tenDonViTinh
            : ""
        }`;
      },
    },
    {
      title: <HeaderSearch title={t("common.khac")} />,
      width: 110,
      dataIndex: "action",
      key: "action",
      align: "center",
      colSpan: 1,
      render: (item, record, index) => {
        return (
          <div className="item">
            <div className="action-btn">
              <Tooltip
                title={t("khamBenh.donThuoc.suaThongTinThuoc")}
                placement="bottom"
              >
                <img
                  style={{ objectFit: "contain" }}
                  src={IconEdit}
                  alt={IconEdit}
                  onClick={() => onEdit(record)}
                />
              </Tooltip>
              <Tooltip
                title={t("khamBenh.donThuoc.xoaThuoc")}
                placement="bottom"
              >
                <img
                  src={IconDelete}
                  alt="..."
                  onClick={() => onDelete(record)}
                />
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <MainTable>
      <TableWrapper
        columns={columns}
        dataSource={listDvThuoc}
        scroll={{ x: false, y: false }}
      />
      <SuaThongTinThuoc ref={refSuaThongTinThuoc} />
    </MainTable>
  );
}

export default Table;
