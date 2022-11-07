import React, { useState, useRef, useEffect, useMemo } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { MainTable } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Checkbox } from "antd";
import SuaThongTinThuoc from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ToDieuTri/ChiDinhDichVu/DonThuoc/components/SuaThongTinThuoc";
import IcCreate from "assets/images/kho/add-blue.png";
import IcExpandDown from "assets/images/noiTru/icExpandDown.png";
import IcExpandRight from "assets/images/noiTru/icExpandRight.png";
import ChiDinhDichVuThuoc from "pages/chiDinhDichVu/DichVuThuoc";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import IcSetting from "assets/svg/ic-setting.svg";
import { useStore } from "hook";
import { DOI_TUONG } from "constants/index";

function Table(props) {
  const {
    chiDinhDichVuKho: { onDeleteDichVu },
  } = useDispatch();
  const refSettings = useRef(null);
  const { currentToDieuTri } = useSelector((state) => state.toDieuTri);
  const { getListDichVuThuoc } = useDispatch().chiDinhDichVuThuoc;
  const listDataLieuDung = useStore("lieuDung._listDataTongHop", []);
  const { t } = useTranslation();
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});

  const [state, _setState] = useState({
    dataThuoc: [],
    expanDown: false,
  });
  const { listDvThuoc, listLoaiDonThuoc, isReadonly } = props;
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
    const data = (listDvThuoc || [])
      .filter((x) => !x.dungKemId)
      .map((item) => {
        return {
          ...item,
          thuocDungKem: listThuocDungKem.filter((x) => x.dungKemId === item.id),
        };
      });
    return data;
  }, [listDvThuoc]);

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
              nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
              chiDinhTuDichVuId: currentToDieuTri?.id,
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
        loaiDonThuoc: record.nhaThuoc ? 10 : record.khoId ? 20 : "",
        khoId: record.khoId,
        dungKemId: record.id,
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
        <HeaderSearch
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
          sort_key="ten"
        />
      ),
      width: "362px",
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
            <div className="item">
              {!!record.thuocDungKem.length && (
                <img
                  className="expand"
                  src={state?.expanDown ? IcExpandDown : IcExpandRight}
                  alt={state?.expanDown ? IcExpandDown : IcExpandRight}
                  onClick={() => setState({ expanDown: !state?.expanDown })}
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
            {state?.expanDown &&
              (record.thuocDungKem || []).map((item) => {
                const ten =
                  item?.tenDichVu || item?.thuocChiDinhNgoai.tenDichVu || "";
                return (
                  <div className="thuocDungKem">
                    <div
                      className="thuocDungKem__item"
                      style={{ padding: "5px 30px" }}
                    >
                      {`${ten} ${
                        item.tenHoatChat ? " (" + item.tenHoatChat + ")" : " "
                      } ${item.hamLuong ? " - " + item.hamLuong : ""}`}
                    </div>
                  </div>
                );
              })}
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
      width: "90px",
      dataIndex: "soLuongYeuCau",
      key: "soLuongYeuCau",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.slChiDinh"),
      show: true,
      render: (item, record) => {
        return (
          <div>
            <div className="item">
              {item + ` ${record?.tenDonViTinh ? record?.tenDonViTinh : ""}`}
            </div>
            <div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((x) => {
                  return (
                    <div className="thuocDungKem">
                      <div className="thuocDungKem__item">
                        {x.soLuong +
                          ` ${x?.tenDonViTinh ? x?.tenDonViTinh : ""}`}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
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
      i18Name: t("khamBenh.donThuoc.slTra"),
      show: true,
      render: (item, record) => {
        return (
          <div>
            <div className="item">{item}</div>
            <div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((x) => {
                  return (
                    <div className="thuocDungKem">
                      <div className="thuocDungKem__item"> {x.soLuongTra}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title={t("khamBenh.donThuoc.slThucDung")} />,
      width: "90px",
      dataIndex: "soLuong",
      key: "soLuong",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.slThucDung"),
      show: true,
      render: (item, record) => {
        return (
          <div>
            <div className="item">{item}</div>
            <div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((x) => {
                  return (
                    <div className="thuocDungKem">
                      <div className="thuocDungKem__item">
                        {x?.soLuong - x?.soLuongTra}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
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
      render: (item, record) => {
        return (
          <div>
            <div className="item">{item}</div>
            <div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((x) => {
                  return (
                    <div className="thuocDungKem">
                      <div className="thuocDungKem__item">{x.tenKho}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
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
      render: (item, record) => {
        return (
          <div>
            <div className="item">{item}</div>
            <div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((x) => {
                  return (
                    <div className="thuocDungKem">
                      <div className="thuocDungKem__item">
                        {x.tenBacSiChiDinh}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.lieuDungCachDung")}
          sort_key="lieuDungId"
        />
      ),
      width: "150px",
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      colSpan: 1,
      i18Name: t("khamBenh.donThuoc.lieuDungCachDung"),
      show: true,
      render: (item, record) => {
        return (
          <div>
            <div className="item">
              {(listDataLieuDung || []).find((x) => x.id === item)?.ten}
            </div>
            <div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((item1) => {
                  return (
                    <div className="thuocDungKem">
                      <div className="thuocDungKem__item">
                        {
                          (listDataLieuDung || []).find(
                            (x) => x.id === item1?.lieuDungId
                          )?.ten
                        }
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.soPhieuLinh")}
          sort_key="soPhieuLinh"
        />
      ),
      width: "100px",
      dataIndex: "soPhieuLinh",
      key: "soPhieuLinh",
      colSpan: 1,
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
      title: (
        <HeaderSearch
          title={t("khamBenh.donThuoc.daDuyetPhat")}
          sort_key="phat"
        />
      ),
      width: "100px",
      dataIndex: "phat",
      key: "phat",
      colSpan: 1,
      align: "center",
      i18Name: t("khamBenh.donThuoc.daDuyetPhat"),
      show: true,
      render: (item, record) => {
        return (
          <div>
            <div className="item">
              <Checkbox checked={item} />{" "}
            </div>
            <div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((x) => {
                  return (
                    <div className="thuocDungKem">
                      <div className="thuocDungKem__item">
                        <Checkbox checked={x.phat} />
                      </div>
                    </div>
                  );
                })}
            </div>
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
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: 90,
      dataIndex: "action",
      key: "action",
      align: "center",
      colSpan: 1,
      fixed: "right",
      render: (item, record, index) => {
        return (
          !isReadonly && (
            <div>
              <div className="item">
                <div className="action-btn">
                  <Tooltip title="Thuốc dùng kèm" placement="bottom">
                    <img
                      src={IcCreate}
                      alt="..."
                      onClick={() => onCreate(record)}
                    />
                  </Tooltip>
                  <Tooltip title="Sửa thông tin thuốc" placement="bottom">
                    <img src={IconEdit} alt="..." onClick={onEdit(record)} />
                  </Tooltip>
                  <Tooltip title="Xóa thuốc" placement="bottom">
                    <img
                      src={IconDelete}
                      alt="..."
                      onClick={() => onDelete(record)}
                    />
                  </Tooltip>
                </div>
              </div>
              {state?.expanDown &&
                (record.thuocDungKem || []).map((x) => {
                  return (
                    <div
                      className="thuocDungKem"
                      style={{ paddingLeft: "30px" }}
                    >
                      <div className="action-btn">
                        <Tooltip title="Sửa thông tin thuốc" placement="bottom">
                          <img src={IconEdit} alt="..." onClick={onEdit(x)} />
                        </Tooltip>
                        <Tooltip title="Xóa thuốc" placement="bottom">
                          <img
                            src={IconDelete}
                            alt="..."
                            onClick={() => onDelete(x)}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
            </div>
          )
        );
      },
    },
  ];

  const setRowClassName = (record) => {
    if (record?.tenMucDich && infoPatient?.doiTuong === DOI_TUONG.BAO_HIEM)
      return "row-tt35";
  };

  return (
    <MainTable>
      <TableWrapper
        columns={columns}
        dataSource={dataSource}
        tableName="table_ChiDinhDichVuToDieuTri_Thuoc"
        ref={refSettings}
        rowClassName={setRowClassName}
      />
      <SuaThongTinThuoc
        ref={refSuaThongTinThuoc}
        dataNb={currentToDieuTri}
        chiDinhTuLoaiDichVu={210}
        isReadonly={isReadonly}
      />
      <ChiDinhDichVuThuoc
        ref={refThuocDungKem}
        dataNb={currentToDieuTri}
        chiDinhTuLoaiDichVu={210}
        listLoaiDonThuoc={listLoaiDonThuoc}
      />
    </MainTable>
  );
}

export default React.memo(Table);
