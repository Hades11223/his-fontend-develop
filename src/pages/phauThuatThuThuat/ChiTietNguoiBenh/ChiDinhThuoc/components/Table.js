import React, { useState, useRef, useEffect, useMemo } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { MainTable } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Tooltip } from "antd";
import SuaThongTinThuoc from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ToDieuTri/ChiDinhDichVu/DonThuoc/components/SuaThongTinThuoc";
import IcCreate from "assets/images/kho/add-blue.png";
import ChiDinhDichVuThuoc from "pages/chiDinhDichVu/DichVuThuoc";
import IcExpandDown from "assets/images/noiTru/icExpandDown.png";
import IcExpandRight from "assets/images/noiTru/icExpandRight.png";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import IcChangeService from "assets/images/xetNghiem/icChangeService.png";
import ModalChuyenDichVu from "pages/phauThuatThuThuat/ChiTietNguoiBenh/ModalChuyenDichVu";
import IcGroup from "assets/images/template/icGroup.png";
import { DOI_TUONG } from "constants/index";
import useThongTinNb from "../../hook/useThongTinNb";

const Table = (props) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);

  const { onDeleteDichVu } = useDispatch().chiDinhDichVuThuoc;
  const { dataDetail } = useSelector((state) => state.pttt);
  const { getListDichVuThuoc, chinhSuaChiDinhDichVuKho } =
    useDispatch().chiDinhDichVuThuoc;

  const { listAllLieuDung } = useStore("lieuDung", []);
  const refChuyenDichVu = useRef(null);
  const [state, _setState] = useState({
    dataThuoc: [],
    expanDown: false,
  });
  const { listDvThuoc, listLoaiDonThuoc, disabledAll } = props;
  const [thongTinBenhNhan] = useThongTinNb();

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refSuaThongTinThuoc = useRef(null);
  const refThuocDungKem = useRef(null);
  useEffect(() => {
    if (listDvThuoc.length) {
      setState({ dataThuoc: listDvThuoc });
    }
  }, [listDvThuoc]);

  const dataSource = useMemo(() => {
    const listThuocDungKem = listDvThuoc.filter((x) => x.dungKemId);
    const listThuocCha = listDvThuoc.filter((x) => !x.dungKemId);
    let data = [];
    (listThuocCha || []).map((item, index) => {
      let thuocDungKem = (listThuocDungKem || []).filter(
        (x) => x.dungKemId === item.id
      );
      data.push({
        ...item,
        isParent: true,
        index: index + 1,
        expanDown: !!thuocDungKem.length,
      });
      if (state?.expanDown) {
        data.push(...thuocDungKem);
      }
    });
    return data;
  }, [listDvThuoc, state?.expanDown]);
  const onDelete = (record) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content:
            t("common.banCoChacMuonXoa") +
            (record?.tenDichVu || record?.thuocChiDinhNgoai.tenDichVu || "") +
            "?",
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu(record.id).then((s) =>
            getListDichVuThuoc({
              nbDotDieuTriId: dataDetail.nbDotDieuTriId,
              chiDinhTuDichVuId: dataDetail?.id,
              dsTrangThaiHoan: [0, 10, 20],
            })
          );
        }
      );
  };

  const onEdit = (record) => () => {
    refSuaThongTinThuoc.current &&
      refSuaThongTinThuoc.current.show({ data: record });
  };

  const onCreate = (record) => {
    refThuocDungKem.current &&
      refThuocDungKem.current.show({
        loaiDonThuoc: record.khoId ? 20 : "",
        khoId: record.khoId,
        dungKemId: record.id,
      });
  };

  const onChuyenThuoc = (data) => {
    refChuyenDichVu.current &&
      refChuyenDichVu.current.show(data, () => {
        getListDichVuThuoc({
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

  const renderStt = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (row.isParent) {
      obj.props.rowSpan = row.rowSpan;
      obj.children = value;
    }
    return obj;
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} sort_key="index" />,
      width: "64px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: renderStt,
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
          sort_key="ten"
        />
      ),
      width: "220px",
      dataIndex: "",
      key: "",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.tenThuocHamLuong"),
      show: true,
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
            {record.expanDown && (
              <img
                src={state?.expanDown ? IcExpandDown : IcExpandRight}
                alt={state?.expanDown ? IcExpandDown : IcExpandRight}
                onClick={() => setState({ expanDown: !state?.expanDown })}
                style={{ marginRight: "8px" }}
              />
            )}
            <span>{`${ten} ${
              record.tenHoatChat ? " (" + record.tenHoatChat + ")" : " "
            } ${record.hamLuong ? " - " + record.hamLuong : ""}`}</span>
            <br />
            <span style={{ fontSize: "12px" }}>
              {`${content1} `}
              {record.ghiChu ? `Lưu ý: ${record.ghiChu}` : ""}
            </span>
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.slChiDinh")}
          sort_key="soLuongYeuCau"
        />
      ),
      width: 80,
      dataIndex: "soLuongYeuCau",
      key: "soLuongYeuCau",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.slChiDinh"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.slTra")}
          sort_key="soLuongTra"
        />
      ),
      width: 80,
      dataIndex: "soLuongTra",
      key: "soLuongTra",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.slTra"),
      show: true,
    },
    {
      title: <HeaderSearch title={t("khamBenh.donThuoc.slThucDung")} />,
      width: 80,
      dataIndex: "soLuong",
      key: "soLuong",
      // colSpan: 1,
      i18Name: t("khamBenh.donThuoc.slThucDung"),
      show: true,
    },
    {
      title: <HeaderSearch title={t("pttt.kho")} sort_key="tenKho" />,
      width: 150,
      dataIndex: "tenKho",
      key: "tenKho",
      // colSpan: 1,
      i18Name: t("khamBenh.donThuoc.kho"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.bacSiChiDinh")}
          sort_key="tenBacSiChiDinh"
        />
      ),
      width: 150,
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      // colSpan: 1,
      i18Name: t("khamBenh.donThuoc.bacSiChiDinh"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.lieuDungCachDung")}
          sort_key="lieuDungId"
        />
      ),
      width: 150,
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      // colSpan: 1,
      i18Name: t("khamBenh.donThuoc.lieuDungCachDung"),
      show: true,
      render: (item, record) => {
        return (
          <div> {(listAllLieuDung || []).find((x) => x.id === item)?.ten}</div>
        );
      },
    },
    {
      title: (
        <HeaderSearch title={t("khamBenh.donThuoc.soPhieuLinh")} sort_key="" />
      ),
      width: 80,
      dataIndex: "soPhieuLinh",
      key: "soPhieuLinh",
      i18Name: t("khamBenh.donThuoc.soPhieuLinh"),
      show: true,
    },
    {
      title: <HeaderSearch title="TT30" />,
      width: 100,
      dataIndex: "tenMucDich",
      key: "tenMucDich",
      i18Name: "TT30",
      show: true,
    },
    {
      title: <HeaderSearch title={t("pttt.daDuyetPhat")} sort_key="phat" />,
      width: 100,
      dataIndex: "phat",
      key: "phat",
      // colSpan: 1,
      align: "center",
      i18Name: t("khamBenh.donThuoc.daDuyetPhat"),
      show: true,
      render: (item, record) => {
        return (
          <div>
            {" "}
            <Checkbox checked={item} />{" "}
          </div>
        );
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
      width: 100,
      dataIndex: "action",
      key: "action",
      align: "center",
      fixed: "right",
      colSpan: 1,
      render: (item, record, index) => {
        return disabledAll ? (
          <></>
        ) : (
          <div>
            <div className="item">
              <div className="action-btn">
                {record?.isParent && (
                  <Tooltip title={t("pttt.thuocDungKem")} placement="bottom">
                    <img
                      style={{ objectFit: "contain" }}
                      src={IcCreate}
                      alt="..."
                      onClick={() => onCreate(record)}
                    />
                  </Tooltip>
                )}
                <Tooltip title={t("pttt.suaThongTinThuoc")} placement="bottom">
                  <img
                    style={{ objectFit: "contain" }}
                    src={IconEdit}
                    alt="..."
                    onClick={onEdit(record)}
                  />
                </Tooltip>
                {record?.isParent && (
                  <Tooltip title={t("pttt.chuyenDichVu")} placement="bottom">
                    <img
                      style={{ objectFit: "contain" }}
                      src={IcChangeService}
                      alt="..."
                      onClick={() => onChuyenThuoc(record)}
                    />
                  </Tooltip>
                )}
                <Tooltip title={t("pttt.xoaThuoc")} placement="bottom">
                  <img
                    style={{ objectFit: "contain" }}
                    src={IconDelete}
                    alt="..."
                    onClick={() => onDelete(record)}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const setRowClassName = (record) => {
    if (record?.tenMucDich && thongTinBenhNhan?.doiTuong === DOI_TUONG.BAO_HIEM)
      return "row-tt35";
  };

  return (
    <MainTable>
      <TableWrapper
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 500, y: "auto" }}
        tableName="table_PhauThuatThuThuat_Thuoc"
        ref={refSettings}
        rowClassName={setRowClassName}
      />
      <SuaThongTinThuoc
        ref={refSuaThongTinThuoc}
        dataNb={dataDetail}
        chiDinhTuLoaiDichVu={40}
      />
      <ChiDinhDichVuThuoc
        ref={refThuocDungKem}
        dataNb={dataDetail}
        chiDinhTuLoaiDichVu={40}
        listLoaiDonThuoc={listLoaiDonThuoc}
      />
      <ModalChuyenDichVu
        ref={refChuyenDichVu}
        chinhSuaDichVu={chinhSuaChiDinhDichVuKho}
      />
    </MainTable>
  );
};

export default React.memo(Table);
