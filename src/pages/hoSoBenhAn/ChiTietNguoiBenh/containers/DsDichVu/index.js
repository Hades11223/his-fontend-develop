import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Tooltip, Checkbox } from "antd";
import { TableWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import IcViewImagePacs from "assets/svg/ic-view-pasc.svg";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { TRANG_THAI } from "./config";
import IcPdf from "assets/svg/ic-pdf.svg";
import { useLoading, useStore } from "hook";
import { useEnum } from "hook";
import IcSetting from "assets/svg/ic-setting.svg";
import IcView from "assets/images/kho/icView.png";
import ModalChiTietDichVu from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/DvNgoaiTru/ModalChiTietDichVu";

const { Column } = TableWrapper;

const DsDichVu = forwardRef(({ tableName = "TABLE_HSBA_DSDV" }, ref) => {
  const refSettings = useRef(null);
  const modalRefThongTinDichVu = useRef(null);

  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const { listDichVuKyThuat, dataSortColumn } = useSelector(
    (state) => state.dsDichVuKyThuat
  );
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan", {});
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listTrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);
  const {
    dsDichVuKyThuat: { onSortChange },
    chiDinhKhamBenh: { inPhieuKetQua },
    pacs: { getUrl },
  } = useDispatch();

  const onViewPacs = (data) => {
    getUrl({ id: data?.id }).then((res) => {
      window.open(res, "_blank").focus();
    });
  };

  useImperativeHandle(ref, () => ({
    onSettings,
  }));
  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const onViewPdf = async (data) => {
    const { nbDotDieuTriId, soPhieuId, loaiDichVu, soKetNoi } = data;
    try {
      showLoading();

      const obj = {
        nbDotDieuTriId,
        loaiDichVu,
      };

      switch (loaiDichVu) {
        case LOAI_DICH_VU.XET_NGHIEM:
          obj.dsSoPhieuId = soPhieuId ? [soPhieuId] : null;
          break;
        case LOAI_DICH_VU.CDHA:
          obj.dsSoKetNoi = soKetNoi ? [soKetNoi] : null;
          break;
        default:
          break;
      }

      await inPhieuKetQua(obj);
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "80px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
    }),
    Column({
      title: t("common.tenDichVu"),
      sort_key: "tenDichVu",
      dataSort: dataSortColumn["tenDichVu"] || "",
      onClickSort: onClickSort,
      width: "250px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "common.tenDichVu",
    }),
    Column({
      title: t("common.trangThai"),
      sort_key: "trangThai",
      dataSort: dataSortColumn["trangThai"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      i18Name: "common.trangThai",
      render: (value) =>
        (listTrangThaiDichVu || []).find((e) => e.id === value)?.ten,
    }),
    Column({
      title: t("common.thanhTien"),
      sort_key: "thanhTien",
      dataSort: dataSortColumn["thanhTien"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      i18Name: "common.thanhTien",
      render: (value) => value.formatPrice(),
    }),
    Column({
      title: t("hsba.ttThanhToan"),
      sort_key: "thanhToan",
      dataSort: dataSortColumn["thanhToan"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "thanhToan",
      key: "thanhToan",
      i18Name: "hsba.ttThanhToan",
      align: "center",
      render: (value) => <Checkbox checked={value} />,
    }),
    Column({
      title: t("hsba.ttHoan"),
      sort_key: "trangThaiHoan",
      dataSort: dataSortColumn["trangThaiHoan"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "trangThaiHoan",
      key: "trangThaiHoan",
      align: "center",
      i18Name: "hsba.ttHoan",
      render: (value) =>
        (listTrangThaiHoan || []).find((element) => element.id === value)?.ten,
    }),
    Column({
      title: t("hsba.tuVanVien"),
      sort_key: "tenTuVanVien",
      dataSort: dataSortColumn["tenTuVanVien"] || "",
      onClickSort: onClickSort,
      width: "170px",
      dataIndex: "tenTuVanVien",
      key: "tenTuVanVien",
      i18Name: "hsba.tuVanVien",
    }),
    Column({
      title: t("hsba.bsChiDinh"),
      sort_key: "tenBacSiChiDinh",
      dataSort: dataSortColumn["tenBacSiChiDinh"] || "",
      onClickSort: onClickSort,
      width: "170px",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      align: "center",
      i18Name: "hsba.bsChiDinh",
    }),
    Column({
      title: t("hsba.bsThucHien"),
      sort_key: "tenNguoiThucHien",
      dataSort: dataSortColumn["tenNguoiThucHien"] || "",
      onClickSort: onClickSort,
      width: "170px",
      dataIndex: "tenNguoiThucHien",
      key: "tenNguoiThucHien",
      align: "center",
      i18Name: "hsba.bsThucHien",
    }),
    Column({
      title: t("hsba.khoaChiDinh"),
      sort_key: "tenKhoaChiDinh",
      dataSort: dataSortColumn["tenKhoaChiDinh"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      align: "center",
      i18Name: "hsba.khoaChiDinh",
    }),
    Column({
      title: t("hsba.thoiGianChiDinh"),
      sort_key: "thoiGianChiDinh",
      dataSort: dataSortColumn["thoiGianChiDinh"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      align: "center",
      i18Name: "hsba.thoiGianChiDinh",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("hsba.thoiGianThucHien"),
      sort_key: "thoiGianThucHien",
      dataSort: dataSortColumn["thoiGianThucHien"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      align: "center",
      i18Name: "hsba.thoiGianThucHien",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("hsba.thoiGianKetLuan"),
      sort_key: "thoiGianKetLuan",
      dataSort: dataSortColumn["thoiGianKetLuan"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "thoiGianKetLuan",
      key: "thoiGianKetLuan",
      align: "center",
      i18Name: "hsba.thoiGianKetLuan",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("hsba.thoiGianCoKetQua"),
      sort_key: "thoiGianCoKetQua",
      dataSort: dataSortColumn["thoiGianCoKetQua"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "thoiGianCoKetQua",
      key: "thoiGianCoKetQua",
      align: "center",
      i18Name: "hsba.thoiGianCoKetQua",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("hsba.phongThucHien"),
      sort_key: "tenPhongThucHien",
      dataSort: dataSortColumn["tenPhongThucHien"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      align: "center",
      i18Name: "hsba.phongThucHien",
    }),
    Column({
      title: "TT35",
      sort_key: "tenMucDich",
      dataSort: dataSortColumn["tenMucDich"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenMucDich",
      key: "tenMucDich",
      i18Name: "TT35",
    }),
    Column({
      title: t("hsba.tuTra"),
      sort_key: "tuTra",
      dataSort: dataSortColumn["tuTra"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tuTra",
      key: "tuTra",
      i18Name: "hsba.tuTra",
      align: "center",
      render: (value) => <Checkbox checked={value} />,
    }),
    Column({
      title: t("hsba.khongTinhTien"),
      sort_key: "khongTinhTien",
      dataSort: dataSortColumn["khongTinhTien"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "khongTinhTien",
      key: "tuTra",
      i18Name: "hsba.khongTinhTien",
      align: "center",
      render: (value) => <Checkbox checked={value} />,
    }),
    Column({
      title: t("hsba.thanhToanSau"),
      sort_key: "thanhToanSau",
      dataSort: dataSortColumn["thanhToanSau"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "thanhToanSau",
      key: "tuTra",
      i18Name: "hsba.thanhToanSau",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    }),
    Column({
      title: (
        <>
          {t("common.thaoTac")}{" "}
          <IcSetting onClick={onSettings} className="icon" />
        </>
      ),
      width: "100px",
      key: "thaoTac",
      align: "center",
      fixed: "right",
      ignore: true,
      render: (data, item) => {
        if (item.isParent) return null;
        return (
          <div className="row-action">
            <Tooltip title="Xem chi tiết">
              <img
                src={IcView}
                alt={IcView}
                onClick={() =>
                  modalRefThongTinDichVu.current &&
                  modalRefThongTinDichVu.current.show({
                    ttDichVu: item,
                    ttNb: thongTinBenhNhan,
                  })
                }
              />
            </Tooltip>

            {data.loaiDichVu === LOAI_DICH_VU.CDHA && (
              <Tooltip title={t("hsba.xemKqPacs")} placement="bottom">
                <IcViewImagePacs
                  className="icon"
                  onClick={() => onViewPacs(data)}
                />
              </Tooltip>
            )}
            {TRANG_THAI.DA_CO_KET_QUA.includes(data.trangThai) && (
              <Tooltip title={t("hsba.xemKqPdf")} placement="bottom">
                <IcPdf onClick={() => onViewPdf(data)} className="icon" />
              </Tooltip>
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <Main>
      <TableWrapper
        columns={columns}
        dataSource={listDichVuKyThuat}
        rowKey={(record) => record.id}
        tableName={tableName}
        ref={refSettings}
      />

      <ModalChiTietDichVu ref={modalRefThongTinDichVu} />
    </Main>
  );
});

export default DsDichVu;
