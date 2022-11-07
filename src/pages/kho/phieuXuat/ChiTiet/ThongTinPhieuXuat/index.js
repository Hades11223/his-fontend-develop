import { Col } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import Header1 from "pages/kho/components/Header1";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
const ThongTinPhieuXuat = ({ isEdit, ...props }, ref) => {
  const [state, _setState] = useState({
    nhaCungCap: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();
  const {
    phieuNhapXuat: { thongTinPhieu },
    hinhThucNhapXuat: { listHinhThucNhapXuat },
  } = useSelector((state) => {
    return state;
  });

  const {
    phieuNhapXuat: { updateData },
    hinhThucNhapXuat: { getListHinhThucNhapXuat },
    nhaSanXuat: { getDetail: getDetailNhaSanXuat },
  } = useDispatch();

  useEffect(() => {
    getListHinhThucNhapXuat({ active: true });
  }, []);
  useEffect(() => {
    if (thongTinPhieu?.nhaCungCap?.id)
      getDetailNhaSanXuat(thongTinPhieu?.nhaCungCap?.id)
        .then((s) => {
          setState({ nhaCungCap: s || {} });
        })
        .catch((e) => {
          setState({ nhaCungCap: {} });
        });
  }, [thongTinPhieu?.nhaCungCap]);
  const onChange = (type) => (e) => {
    const value = e?.target ? e.target?.value : e;
    updateData({
      thongTinPhieu: { ...thongTinPhieu, [type]: value },
    });
  };

  const renderNhaCungCap = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.nhaCungCap")}:</label>
        <div className="content">{thongTinPhieu.nhaCungCap?.ten}</div>
      </Col>
    ),
    [thongTinPhieu.nhaCungCap]
  );
  const renderDiaChiNhaCungCap = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.diaChiNcc")}:</label>
        <div className="content">{state.nhaCungCap?.diaChi}</div>
      </Col>
    ),
    [thongTinPhieu.nhaCungCap, state.nhaCungCap]
  );
  const renderLoaiXuat = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.loaiXuat")}:</label>
        <div className="content">
          {!isEdit ? (
            thongTinPhieu.hinhThucNhapXuat?.ten
          ) : (
            <Select
              placeholder="Loại xuất"
              bordered={false}
              data={listHinhThucNhapXuat}
              showArrow
              value={thongTinPhieu.hinhThucNhapXuatId}
              onChange={onChange("hinhThucNhapXuatId")}
            />
          )}
        </div>
      </Col>
    ),
    [thongTinPhieu.hinhThucNhapXuatId, listHinhThucNhapXuat, isEdit]
  );
  const renderKhoNhap = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.khoNhap")}:</label>
        <div className="content">{thongTinPhieu.khoDoiUng?.ten}</div>
      </Col>
    ),
    [thongTinPhieu.khoDoiUng]
  );

  const renderKhoNhapDuTru = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.khoNhap")}:</label>
        <div className="content">{thongTinPhieu.kho?.ten}</div>
      </Col>
    ),
    [thongTinPhieu.kho]
  );

  const renderKhoXuatDuTru = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.khoXuat")}:</label>
        <div className="content">{thongTinPhieu.khoDoiUng?.ten}</div>
      </Col>
    ),
    [thongTinPhieu.khoDoiUng]
  );

  const renderThangDuTru = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.thangDuTru")}:</label>
        <div className="content">
          {thongTinPhieu.thangDuTru && "Tháng " + thongTinPhieu.thangDuTru}
        </div>
      </Col>
    ),
    [thongTinPhieu.thangDuTru]
  );

  const renderSoPhieu = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.soPhieu")}:</label>
        <div className="content">{thongTinPhieu.soPhieu}</div>
      </Col>
    ),
    [thongTinPhieu.soPhieu]
  );
  const renderSoPhieuNhap = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.soPhieuNhap")}:</label>
        <div className="content">{thongTinPhieu.phieuNhap?.soPhieu}</div>
      </Col>
    ),
    [thongTinPhieu.phieuNhap]
  );
  const renderSoHoaDon = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.soHoaDon")}:</label>
        <div className="content">{thongTinPhieu.phieuNhap?.soHoaDon}</div>
      </Col>
    ),
    [thongTinPhieu.phieuNhap]
  );
  const renderNguoiTaoPhieu = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.nguoiTaoPhieu")}:</label>
        <div className="content">{thongTinPhieu.nguoiTaoPhieu?.ten}</div>
      </Col>
    ),
    [thongTinPhieu.nguoiTaoPhieu]
  );
  const renderGhiChu = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.ghiChu")}:</label>
        <div className="content">{thongTinPhieu.ghiChu}</div>
      </Col>
    ),
    [thongTinPhieu.ghiChu]
  );
  const renderKhoXuat = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.khoXuat")}:</label>
        <div className="content">{thongTinPhieu.kho?.ten}</div>
      </Col>
    ),
    [thongTinPhieu.kho]
  );
  const renderThanhTien = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.thanhTien")}:</label>
        <div className="content">{thongTinPhieu.thanhTien?.formatPrice()}</div>
      </Col>
    ),
    [thongTinPhieu.thanhTien]
  );
  const renderNguoiDuyetPhat = useMemo(
    () => (
      <Col span={6}>
        <label className="label">{t("kho.nguoiDuyetPhat")}:</label>
        <div className="content">{thongTinPhieu.nguoiDuyet?.ten}</div>
      </Col>
    ),
    [thongTinPhieu.nguoiGuiDuyet]
  );

  const renderLyDo = useMemo(
    () => (
      <Col span={[30].includes(thongTinPhieu.loaiNhapXuat) ? 24 : 6}>
        <label className="label">{t("kho.lyDo")}:</label>
        <div className="content">{thongTinPhieu.lyDo}</div>
      </Col>
    ),
    [thongTinPhieu.lyDo, thongTinPhieu.loaiNhapXuat]
  );

  return (
    <>
      <Header1 title={"Thông tin phiếu"} noPadding={true} bottom={9}></Header1>
      <Main>
        {thongTinPhieu?.loaiNhapXuat === 30 ? (
          <>
            {renderLoaiXuat}
            {renderKhoNhap}
            {renderSoPhieu}
            {renderNguoiTaoPhieu}
            {renderGhiChu}
            {renderKhoXuat}
            {renderThanhTien}
            {renderNguoiDuyetPhat}
            {renderLyDo}
          </>
        ) : thongTinPhieu?.loaiNhapXuat === 40 ? (
          <>
            {renderLoaiXuat}
            {renderNhaCungCap}
            {renderSoPhieu}
            {renderNguoiTaoPhieu}
            {renderGhiChu}
            {renderDiaChiNhaCungCap}
            {renderSoPhieuNhap}
            {renderNguoiDuyetPhat}
            {renderLyDo}
            {renderKhoXuat}
            {renderSoHoaDon}
            {renderThanhTien}
          </>
        ) : thongTinPhieu?.loaiNhapXuat === 20 ? (
          <>
            {renderKhoNhapDuTru}
            {renderKhoXuatDuTru}
            {renderThangDuTru}
            {renderSoPhieu}
            {renderNguoiTaoPhieu}
            {renderNguoiDuyetPhat}
            {renderGhiChu}
            {renderLyDo}
          </>
        ) : (
          <>
            {renderLoaiXuat}
            {renderKhoXuat}
            {renderSoPhieu}
            {renderNguoiTaoPhieu}
            {renderGhiChu}
            {renderLyDo}
            {renderThanhTien}
            {renderNguoiDuyetPhat}
          </>
        )}
      </Main>
    </>
  );
};

export default ThongTinPhieuXuat;
