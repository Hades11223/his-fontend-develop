import React, { useEffect, useMemo, useRef, useState } from "react";
import { Main } from "./styled";
import empty from "assets/images/kho/empty.png";
import { Button, HeaderSearch, Pagination } from "components";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import moment from "moment";
import IcView from "assets/images/kho/icView.png";
import IconEdit from "assets/images/noiTru/icEdit.png";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import IcCreate from "assets/images/kho/IcCreate.png";
import IconDelete from "assets/images/utils/delete-blue.png";
import printProvider from "data-access/print-provider";
import { ModalNotification2 } from "components/ModalConfirm";
import { useTranslation } from "react-i18next";
import IcSetting from "assets/svg/ic-setting.svg";
import { useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import { ROLES, TRANG_THAI_NB } from "constants/index";
import { checkRole } from "utils/role-utils";

const DieuTriSoKet = () => {
  const { listDsPhieuSoKet, dataSortColumn, totalElements, page, size } =
    useSelector((state) => state.nbDieuTriSoKet);
  const {
    nbDieuTriSoKet: {
      onSearch,
      onSizeChange,
      onSortChange,
      onDelete,
      phieuSoKet,
    },
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
  } = useDispatch();
  const refModalConfirm = useRef(null);
  const refSettings = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});

  const [state, _setState] = useState();

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (id) {
      onSearch({ dataSearch: { nbDotDieuTriId: id } });
      getNbNoiTruById(id);
    }
  }, [id]);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onDeleteItem = (item) => {
    onDelete(item.id).then(() => {
      onSearch({ dataSearch: { nbDotDieuTriId: id } });
    });
  };

  const onInPhieu = (id) => {
    phieuSoKet(id).then((s) => {
      printProvider.printMergePdf([s.file.pdf]);
    });
  };

  useEffect(() => {
    async function fetchData() {
      let khoaLamViec = await cacheUtils.read(
        "DATA_KHOA_LAM_VIEC",
        "",
        null,
        false
      );
      setState({ khoaLamViec });
    }
    fetchData();
  }, []);

  const isReadonly = useMemo(() => {
    return (
      (infoPatient?.khoaNbId !== state?.khoaLamViec?.id ||
        [
          TRANG_THAI_NB.DANG_CHUYEN_KHOA,
          TRANG_THAI_NB.HEN_DIEU_TRI,
          TRANG_THAI_NB.DA_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_HEN_DIEU_TRI,
        ].includes(infoPatient?.trangThai)) &&
      !checkRole([ROLES["QUAN_LY_NOI_TRU"].THAO_TAC_NB_KHAC_KHOA])
    );
  }, [infoPatient, state?.khoaLamViec]);

  const showModaConfirmRemove = (item) => {
    refModalConfirm.current &&
      refModalConfirm.current.show(
        {
          title: t("common.canhBao"),
          content: `${t("quanLyNoiTru.banCoChacChanXoaPhieuKhoiHeThong")}?`,
          cancelText: t("common.huy"),
          okText: t("common.xacNhan"),
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          onDeleteItem(item);
        },
        () => {}
      );
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.dienBienLamSang")}
          sort_key="dienBien"
          dataSort={dataSortColumn["dienBien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "dienBien",
      key: "dienBien",
      i18Name: t("quanLyNoiTru.dienBienLamSang"),
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.xetNghiemCls")}
          sort_key="canLamSang"
          dataSort={dataSortColumn["canLamSang"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "canLamSang",
      key: "canLamSang",
      i18Name: t("quanLyNoiTru.xetNghiemCls"),
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.quaTrinhDieuTri")}
          sort_key="quaTrinhDieuTri"
          dataSort={dataSortColumn["quaTrinhDieuTri"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "quaTrinhDieuTri",
      key: "quaTrinhDieuTri",
      i18Name: t("quanLyNoiTru.quaTrinhDieuTri"),
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.danhGiaKetQua")}
          sort_key="danhGiaKetQua"
          dataSort={dataSortColumn["danhGiaKetQua"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "danhGiaKetQua",
      key: "danhGiaKetQua",
      i18Name: t("quanLyNoiTru.danhGiaKetQua"),
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.huongDieuTriTiep")}
          sort_key="huongDieuTri"
          dataSort={dataSortColumn["huongDieuTri"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "110px",
      dataIndex: "huongDieuTri",
      key: "huongDieuTri",
      i18Name: t("quanLyNoiTru.huongDieuTriTiep"),
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.ngayTao")}
          sort_key="thoiGianTao"
          dataSort={dataSortColumn["thoiGianTao"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "thoiGianTao",
      key: "thoiGianTao",
      i18Name: t("quanLyNoiTru.ngayTao"),
      show: true,
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tuNgay")}
          sort_key="tuNgay"
          dataSort={dataSortColumn["tuNgay"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tuNgay",
      key: "tuNgay",
      i18Name: t("common.tuNgay"),
      show: true,
      render: (item) => (
        <div className="item">
          {item && moment(item).format("DD/MM/YYYY HH:mm:ss")}
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.denNgay")}
          sort_key="denNgay"
          dataSort={dataSortColumn["denNgay"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "denNgay",
      key: "denNgay",
      i18Name: t("common.denNgay"),
      show: true,
      render: (item) => (
        <div className="item">
          {item && moment(item).format("DD/MM/YYYY HH:mm:ss")}
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.bacSiDieuTri")}
          sort_key="tenBacSiDieuTri"
          dataSort={dataSortColumn["tenBacSiDieuTri"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenBacSiDieuTri",
      key: "tenBacSiDieuTri",
      i18Name: t("quanLyNoiTru.bacSiDieuTri"),
      show: true,
      render: (item) => <div className="item">{item}</div>,
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.thaoTac")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "100px",
      align: "right",
      fixed: "right",
      render: (item, data) => {
        return (
          <div className="image">
            <img
              src={IcView}
              alt={IcView}
              onClick={() =>
                history.push(
                  `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/phieu-so-ket/chi-tiet/${data.id}`
                )
              }
            />
            {!isReadonly && (
              <img
                src={IconEdit}
                alt={IconEdit}
                onClick={() =>
                  history.push(
                    `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/phieu-so-ket/chinh-sua/${data.id}`
                  )
                }
              />
            )}
            {!isReadonly && (
              <img
                src={IconDelete}
                alt={IconDelete}
                onClick={() => showModaConfirmRemove(item)}
              />
            )}
            {!isReadonly && (
              <img
                src={require("assets/images/utils/print-blue.png")}
                alt="..."
                onClick={() => onInPhieu(item?.id)}
              />
            )}
          </div>
        );
      },
    },
  ];
  const onCreate = () => {
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/phieu-so-ket/them-moi?nbDotDieuTriId=${id}`
    );
  };
  return (
    <Main>
      <div className="title">
        <div className="left">
          <h1>{t("quanLyNoiTru.phieuSoKetDieuTri15Ngay")}</h1>
        </div>
        {!!listDsPhieuSoKet.length && !isReadonly && (
          <div className="right">
            <Button
              type="success"
              iconHeight={30}
              rightIcon={<img src={IcCreate} alt={IcCreate} />}
              onClick={() => onCreate()}
            >
              {t("common.themMoi")} [F1]
            </Button>{" "}
          </div>
        )}
      </div>

      {!listDsPhieuSoKet.length && !isReadonly && (
        <div className="dieuTriSoKet">
          <img src={empty} alt="..." />
          <div style={{ padding: "10px 0" }}>
            {t("quanLyNoiTru.chuaTaoPhieuSoKet")}
          </div>
          <Button type="primary" onClick={() => onCreate()}>
            {t("quanLyNoiTru.taoPhieuSoKet")}
          </Button>
        </div>
      )}
      {!!listDsPhieuSoKet.length && (
        <div>
          <TableWrapper
            columns={columns}
            dataSource={listDsPhieuSoKet}
            rowKey={(record) => record?.id}
            tableName="table_NoiTru_Dashboard"
            ref={refSettings}
            scroll={{ x: 1500 }}
          />

          {!!totalElements && (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listDsPhieuSoKet}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              stylePagination={{ flex: 1, justifyContent: "flex-start" }}
            />
          )}
        </div>
      )}
      <ModalNotification2 ref={refModalConfirm} />
    </Main>
  );
};

export default DieuTriSoKet;
