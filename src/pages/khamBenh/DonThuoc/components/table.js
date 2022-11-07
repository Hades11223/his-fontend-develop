import React, { useState, useEffect, useRef } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { TitleTable, MainTable } from "../styled";
import CustomPopover from "../../components/CustomPopover";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch } from "react-redux";
import SuaThongTinThuoc from "./ModalThongTinThuoc/SuaThongTinThuoc";
import { Tooltip, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { DOI_TUONG } from "constants/index";
import { useStore } from "hook";
import { formatNumber } from "utils";

function Table(props) {
  const { t } = useTranslation();
  const {
    chiDinhDichVuKho: { onDeleteDichVu },
  } = useDispatch();

  const [state, _setState] = useState({
    visibleDelete: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const thongTinNguoiBenh = useStore(
    "chiDinhKhamBenh.configData.thongTinNguoiBenh"
  );

  const refSuaThongTinThuoc = useRef(null);
  const { listDvThuoc, isTuTruc } = props;

  useEffect(() => {
    setState({ dataThuoc: listDvThuoc });
  }, [listDvThuoc]);

  const onDelete = (record) => {
    onDeleteDichVu(record.id).then((s) =>
      setState({
        dataThuoc: state.dataThuoc.filter((item) => item !== record),
        visibleDelete: null,
      })
    );
  };

  const onCancel = () => {
    setState({
      visibleDelete: null,
    });
  };
  const handleVisible = (type, idx) => (visible) => {
    const dataType = {
      edit: "visibleEdit",
      delete: "visibleDelete",
      info: "visibleInfo",
    };
    setState({
      [dataType[type]]: idx,
    });
  };

  const onEdit = (record) => () => {
    refSuaThongTinThuoc.current &&
      refSuaThongTinThuoc.current.show({ newTable: Array(record), isTuTruc });
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
        const ten =
          record?.tenDichVu || record?.thuocChiDinhNgoai.tenDichVu || "";
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
              {`${content1} `}
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
      colSpan: 1,
      render: (item, list) => {
        return (
          formatNumber(item || 0) +
          ` ${list?.tenDonViTinh ? list?.tenDonViTinh : ""}`
        );
      },
    },
    {
      title: <HeaderSearch title={"Tự trả"} />,
      hidden: !isTuTruc,
      dataIndex: "tuTra",
      width: 50,
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: <HeaderSearch title={"Không tính tiền"} />,
      hidden: !isTuTruc,
      width: 80,
      dataIndex: "khongTinhTien",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: <HeaderSearch title="TT30" />,
      width: 100,
      dataIndex: "tenMucDich",
      key: "tenMucDich",
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
                onClick={onEdit(record)}
              />
            </Tooltip>
            <Tooltip title={t("khamBenh.donThuoc.xoaThuoc")} placement="bottom">
              <div>
                <CustomPopover
                  icon={IconDelete}
                  onSubmit={() => onDelete(record)}
                  onCancel={onCancel}
                  contentPopover={null}
                  visible={state.visibleDelete === index}
                  handleVisible={handleVisible("delete", index)}
                  title={t("khamBenh.donThuoc.xacNhanXoaBanGhi")}
                />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const setRowClassName = (record) => {
    if (
      record?.tenMucDich &&
      thongTinNguoiBenh?.doiTuong === DOI_TUONG.BAO_HIEM
    )
      return "row-tt35";
  };
  return (
    <MainTable>
      <TitleTable>{props.title}</TitleTable>
      <TableWrapper
        columns={columns}
        dataSource={state.dataThuoc || listDvThuoc}
        scroll={{ x: false, y: false }}
        rowClassName={setRowClassName}
      />
      <SuaThongTinThuoc ref={refSuaThongTinThuoc} />
    </MainTable>
  );
}

export default React.memo(Table);
