import React, { useRef } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Tooltip } from "antd";
import { useEnum } from "hook";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import moment from "moment";
import Icon from "@ant-design/icons";
import IcEdit from "assets/svg/ic-edit.svg";
import IcViewImagePacs from "assets/svg/ic-view-pasc.svg";
import IcPdf from "assets/svg/ic-pdf.svg";
import { useLoading } from "hook";
import ChinhSuaDVKyThuat from "pages/chiDinhDichVu/DichVuKyThuat/ChinhSuaDVKyThuat";
import { canEditOrUpdate } from "pages/khamBenh/ChiDinhDichVu/utils";
import IcGroup from "assets/images/template/icGroup.png";

const { Column } = TableWrapper;

const DSDichVu = ({ refreshList }) => {
  const { t } = useTranslation();
  const refSuaThongTin = useRef(null);
  const refSettings = useRef(null);
  const {
    pacs: { getUrl },
    chiDinhKhamBenh: { inPhieuKetQua },
  } = useDispatch();
  const { dsDichVu } = useSelector((state) => state.dvNoiTru);
  const { showLoading, hideLoading } = useLoading();

  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  const onViewPacs = (data) => {
    getUrl({ id: data?.id }).then((res) => {
      window.open(res, "_blank").focus();
    });
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

  const onEdit = (record) => () => {
    refSuaThongTin.current &&
      refSuaThongTin.current.show(record, () => {
        refreshList();
      });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
    }),
    Column({
      title: t("common.tenDichVu"),
      width: "250px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "common.tenDichVu",
    }),
    Column({
      title: t("common.trangThai"),
      width: "100px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: "common.trangThai",
      render: (value) =>
        (listTrangThaiDichVu || []).find((e) => e.id === value)?.ten,
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.thoiGianThucHien"),
      sort_key: "thoiGianThucHien",
      width: "160px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: "quanLyNoiTru.dvNoiTru.thoiGianThucHien",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.ketQua"),
      width: "100px",
      dataIndex: "ketQua",
      key: "ketQua",
      i18Name: "quanLyNoiTru.dvNoiTru.ketQua",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.ketLuan"),
      sort_key: "ketLuan",
      width: "100px",
      dataIndex: "ketLuan",
      key: "ketLuan",
      i18Name: "quanLyNoiTru.dvNoiTru.ketLuan",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.tenPhongThucHien"),
      width: "160px",
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      i18Name: "quanLyNoiTru.dvNoiTru.tenPhongThucHien",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.khongTinhTien"),
      width: "100px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      i18Name: "quanLyNoiTru.dvNoiTru.khongTinhTien",
      render: (item) => <Checkbox checked={item} />,
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.tuTra"),
      width: "100px",
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      i18Name: "quanLyNoiTru.dvNoiTru.tuTra",
      render: (item) => <Checkbox checked={item} />,
    }),
    Column({
      title: t("common.thanhTien"),
      width: "100px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      i18Name: "common.thanhTien",
      render: (value) => value.formatPrice(),
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.tt35"),
      sort_key: "tenMucDich",
      width: "100px",
      dataIndex: "tenMucDich",
      key: "tenMucDich",
      i18Name: "quanLyNoiTru.dvNoiTru.tt35",
    }),
    Column({
      title: t("hsba.bsChiDinh"),
      width: "160px",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      i18Name: "hsba.bsChiDinh",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.tenKhoaChiDinh"),
      sort_key: "tenKhoaChiDinh",
      width: "160px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      i18Name: "quanLyNoiTru.dvNoiTru.tenKhoaChiDinh",
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.thoiGianChiDinh"),
      sort_key: "thoiGianChiDinh",
      width: "160px",
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      i18Name: "quanLyNoiTru.dvNoiTru.thoiGianChiDinh",
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    }),
    Column({
      title: t("quanLyNoiTru.dvNoiTru.manHinhChiDinh"),
      sort_key: "manHinhChiDinh",
      width: "160px",
      dataIndex: "manHinhChiDinh",
      key: "manHinhChiDinh",
      i18Name: "quanLyNoiTru.dvNoiTru.manHinhChiDinh",
    }),
    Column({
      title: (
        <>
          {t("common.tienIch")}{" "}
          <img
            src={IcGroup}
            alt="..."
            onClick={onSettings}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
      width: "100px",
      align: "center",
      fixed: "right",
      ignore: true,
      render: (data, item) => {
        return (
          <div className="ic-action">
            {data.loaiDichVu === LOAI_DICH_VU.CDHA && (
              <Tooltip title={t("hsba.xemKqPacs")} placement="bottom">
                <IcViewImagePacs
                  className="icon"
                  onClick={() => onViewPacs(data)}
                />
              </Tooltip>
            )}
            {[155].includes(data.trangThai) && (
              <Tooltip title={t("hsba.xemKqPdf")} placement="bottom">
                <IcPdf onClick={() => onViewPdf(data)} className="icon" />
              </Tooltip>
            )}

            {canEditOrUpdate(item.trangThai, item.loaiDichVu) && (
              <Tooltip title={"Chỉnh sửa dịch vụ"} placement="bottom">
                <Icon
                  className="ic-action"
                  component={IcEdit}
                  onClick={onEdit(item)}
                ></Icon>
              </Tooltip>
            )}
          </div>
        );
      },
    }),
  ];

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={dsDichVu || []}
        onRow={onRow}
        rowKey={(record) => record.id}
        tableName="table_DVNOITRU_DSDichVu"
        ref={refSettings}
      />

      <ChinhSuaDVKyThuat ref={refSuaThongTin} />
    </Main>
  );
};

export default DSDichVu;
