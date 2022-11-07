import { Col } from "antd";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import TTCoBan from "./containers/TTCoBan";
import Content from "./Content";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button, Page } from "components";
import { useStore } from "hook";
import { TRANG_THAI_NB, LOAI_DICH_VU } from "constants/index";
import PhatHanhThe from "pages/tiepDon/components/PhatHanhThe";

const ChiTiet = () => {
  const { t } = useTranslation();
  const {
    nbDotDieuTri: { getById, getThongTinNb },
    dsDichVuKyThuat: { onChangeInputSearch: onChangeInputSearchDvKt },
    danhSachNguoiBenhNoiTru: { ketThucDieuTri, choVaoVienLai },
  } = useDispatch();
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan", {});
  const listDichVuKyThuat = useStore("dsDichVuKyThuat.listDichVuKyThuat", []);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getById(id);
      onChangeInputSearchDvKt({ nbDotDieuTriId: id });
    }
  }, [id]);

  useEffect(() => {
    if (thongTinBenhNhan?.nbThongTinId) {
      getThongTinNb({ nbThongTinId: thongTinBenhNhan?.nbThongTinId });
    }
  }, [thongTinBenhNhan]);

  const isCheckDvKham = useMemo(() => {
    return (
      !listDichVuKyThuat.length ||
      !listDichVuKyThuat.find((x) => x.loaiDichVu === LOAI_DICH_VU.KHAM)
    );
  }, [listDichVuKyThuat]);

  const onDongHoSo = () => {
    ketThucDieuTri({
      id,
      huongDieuTri: thongTinBenhNhan?.huongDieuTri,
      ketQuaDieuTri: thongTinBenhNhan?.ketQuaDieuTri,
      thoiGianRaVien: thongTinBenhNhan?.thoiGianRaVien,
    }).then(() => {
      getById(id);
    });
  };

  const onMoHoSo = () => {
    choVaoVienLai({ id }).then(() => {
      getById(id);
    });
  };
  return (
    <Page
      height={12}
      breadcrumb={[
        { title: t("hsba.hoSoBenhAn"), link: "/ho-so-benh-an" },
        {
          title: t("hsba.danhSachNguoiBenh"),
          link: "/ho-so-benh-an/danh-sach-nguoi-benh",
        },
        {
          title: t("hsba.lichSuKhamBenh"),
          link: `/ho-so-benh-an/chi-tiet-nguoi-benh/${id}`,
        },
      ]}
      title={t("hsba.lichSuKhamBenh")}
      titleRight={
        <>
          <PhatHanhThe />
          {thongTinBenhNhan?.trangThaiNb !== TRANG_THAI_NB.DA_RA_VIEN && (
            <Button type="primary" minWidth={100} onClick={onDongHoSo}>
              {t("common.hoanThanh")}
            </Button>
          )}
          {thongTinBenhNhan?.trangThaiNb === TRANG_THAI_NB.DA_RA_VIEN && (
            <Button minWidth={100} onClick={onMoHoSo}>
              {t("common.huyHoanThanh")}
            </Button>
          )}
        </>
      }
    >
      <Col span={24}>
        <div className="header-screen"></div>
        <TTCoBan />
        <Content nbDotDieuTriId={id} />
      </Col>
    </Page>
  );
};

export default ChiTiet;
