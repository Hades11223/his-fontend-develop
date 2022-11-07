import React, { useState, useEffect, useRef } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { TitleTable, MainTable } from "../styled";
import CustomPopover from "../../components/CustomPopover";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch } from "react-redux";
import SuaThongTinThuoc from "./ModalThongTinThuoc/SuaThongTinThuoc";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { formatNumber } from "utils";

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
    chiDinhDichVuKho: { onDeleteDichVuThuocKeNgoai },
  } = useDispatch();

  const { listDvThuoc } = props;

  useEffect(() => {
    setState({ dataThuoc: listDvThuoc });
  }, [listDvThuoc]);

  const onDelete = (record) => {
    onDeleteDichVuThuocKeNgoai(record.id).then((s) => {
      setState({
        dataThuoc: state.dataThuoc.filter((item) => item !== record),
        visibleDelete: null,
      });
    });
  };

  const onCancel = () => {
    setState({
      visibleEdit: null,
      visibleDelete: null,
    });
  };
  const handleVisible = (type, idx) => (visible) => {
    const dataType = {
      delete: "visibleDelete",
    };
    setState({
      [dataType[type]]: idx,
    });
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
      title: (
        <HeaderSearch
          title={t("common.stt")}
          sort_key="index"
          // dataSort={dataSortColumn["stt"] || 0}
          // onClickSort={onClickSort}
        />
      ),
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
      title: (
        <HeaderSearch
          title={t("common.soLuong")}
          sort_key="soLuong"
          // dataSort={dataSortColumn["Số lượng"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "116px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "left",
      colSpan: 1,
      render: (item, data) => {
        return `${formatNumber(item || 0)} ${
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
          <div className="action-btn">
            <Tooltip
              title={t("khamBenh.donThuoc.suaThongTinThuoc")}
              placement="bottom"
            >
              <img
                style={{ objectFit: "contain" }}
                src={IconEdit}
                onClick={() => onEdit(record)}
              />
            </Tooltip>
            <Tooltip title={t("khamBenh.donThuoc.xoaThuoc")} placement="bottom">
              <CustomPopover
                icon={IconDelete}
                onSubmit={() => onDelete(record)}
                onCancel={onCancel}
                contentPopover={null}
                visible={state.visibleDelete === index}
                handleVisible={handleVisible("delete", index)}
                title={t("khamBenh.donThuoc.xacNhanXoaBanGhi")}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <MainTable>
      <TitleTable>{props.title}</TitleTable>
      <TableWrapper
        columns={columns}
        dataSource={state.dataThuoc || listDvThuoc}
        scroll={{ x: false, y: false }}
      />
      <SuaThongTinThuoc ref={refSuaThongTinThuoc} />
    </MainTable>
  );
}

export default Table;
