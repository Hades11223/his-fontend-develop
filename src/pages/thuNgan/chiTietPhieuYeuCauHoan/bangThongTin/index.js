import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const BangThongTin = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, _setState] = useState({
    dsDichVuHoan: [],
    dsDichVuMoi: [],
    tongThanhTienDvHoan: 0,
    slDsDichVuHoan: 0,
    tongThanhTienDvMoi: 0,
    slDsDichVuMoi: 0,
    showDsDichVuHoan: true,
    showDsDichVuMoi: true,
    tongChiPhiHoanThuoc: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { chiTietPhieuDoiTra } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );
  const [listTrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);

  const changeShowDvHoan = () => {
    setState({
      showDsDichVuHoan: !state.showDsDichVuHoan,
    });
  };
  const changeShowDvMoi = () => {
    setState({
      showDsDichVuMoi: !state.showDsDichVuMoi,
    });
  };
  const renderTrangThai = (maTrangThai) => {
    if (listTrangThaiHoan?.length) {
      const trangThai = listTrangThaiHoan.find(
        (trangThai) => trangThai.id == maTrangThai
      );
      return trangThai ? trangThai.ten : "";
    }
  };
  return (
    <Main>
      <div className="thead">
        <div className="notborderL center w60">{t("common.stt")}</div>
        <div className="w120">{t("thuNgan.maDv")}</div>
        <div className="w250">{t("thuNgan.tenDv")}</div>
        <div className="w250">{t("thuNgan.ngayPhatThuoc")}</div>
        <div className="w120">{t("thuNgan.sl")}</div>
        <div className="w150">{t("common.thanhTien")}</div>
        <div className="w150">{t("thuNgan.chiPhiHoanThuoc")}</div>
        <div className="w150">{t("thuNgan.donGiaKbh")}</div>
        <div className="w150">{t("thuNgan.donGiaBH")}</div>
        <div className="w150">{t("thuNgan.phuThu")}</div>
        <div className="w150">{t("thuNgan.tongTienMienGiam")}</div>
        <div className="w150">{t("thuNgan.trangThaiHoan")}</div>
        <div className="w150">{t("common.tuTra")}</div>
        <div className="notborderR w150">{t("thuNgan.khongTinhTien")}</div>
      </div>
      <div className="tbody">
        <div style={{ display: "flex" }}>
          <div
            className="notborderL notborderR bgTitle w60"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            span={1}
          >
            {state.showDsDichVuHoan ? (
              <span className="triangle-up" onClick={changeShowDvHoan}></span>
            ) : (
              <span className="triangle-down" onClick={changeShowDvHoan}></span>
            )}
          </div>
          <div className="title-dich-vu bold bgTitle w370">
            {t("thuNgan.danhSachDichVuHoan")}
          </div>
          <div className="title-dich-vu bold bgTitle w250"></div>
          <div className="bold bgTitle right w120"></div>
          <div className="bold bgTitle right w150">
            {chiTietPhieuDoiTra?.tongThanhTienDvHoan?.formatPrice()}
          </div>
          <div className="bold bgTitle right w150">
            {chiTietPhieuDoiTra?.tongChiPhiHoanThuoc?.formatPrice()}
          </div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="notborderL bgTitle w150"></div>
        </div>
        {state.showDsDichVuHoan &&
          chiTietPhieuDoiTra &&
          chiTietPhieuDoiTra.dsDichVuHoan.map((item, index) => (
            <div key={index} style={{ display: "flex" }}>
              <div
                className="notborderL w60"
                style={{ textAlign: "center" }}
                span={1}
              >
                {index + 1}
              </div>
              <div className="w120">{item.maDichVu}</div>
              <div className="w250">{item.tenDichVu}</div>
              <div className="w250">
                {item?.thoiGianDuyetXuatKho
                  ? moment(item?.thoiGianDuyetXuatKho).format(
                      "HH:mm:ss DD-MM-YYYY"
                    )
                  : ""}
              </div>
              <div className="right w120">
                {chiTietPhieuDoiTra?.loai === 40
                  ? item.soLuongTra
                  : item.soLuong}
              </div>
              <div className="right w150">
                {chiTietPhieuDoiTra?.loai === 40
                  ? item?.thanhTienCu && item?.thanhTienCu?.formatPrice()
                  : item?.thanhTien && item?.thanhTien?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.tienPhiTra && item?.tienPhiTra?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.giaKhongBaoHiem && item?.giaKhongBaoHiem?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.giaBaoHiem && item?.giaBaoHiem?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.giaKhongBaoHiem && item?.giaKhongBaoHiem?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.tienMienGiam && item?.tienMienGiam?.formatPrice()}
              </div>
              <div className="left w150">
                {renderTrangThai(item?.trangThaiHoan)}
              </div>
              <div className="w150 center">
                <Checkbox disabled={true} checked={item.tuTra} />
              </div>
              <div className="notborderR center w150">
                <Checkbox checked={item.khongTinhTien} disabled={true} />
              </div>
            </div>
          ))}
        <div style={{ display: "flex" }}>
          <div
            className="notborderL notborderR bgTitle w60"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            span={1}
          >
            {state.showDsDichVuMoi ? (
              <span className="triangle-up" onClick={changeShowDvMoi}></span>
            ) : (
              <span className="triangle-down" onClick={changeShowDvMoi}></span>
            )}
          </div>
          <div className="bgTitle title-dich-vu bold w370">
            {t("thuNgan.danhSachDichVuMoi")}
          </div>
          <div className="title-dich-vu bold bgTitle w250"></div>
          <div className="bold bgTitle right w120" span={1}>
            {chiTietPhieuDoiTra?.slDsDichVuMoi?.formatPrice()}
          </div>
          <div className="bold bgTitle right w150">
            {chiTietPhieuDoiTra?.thanhTienMoi?.formatPrice()}
          </div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
        </div>
        {state.showDsDichVuMoi &&
          chiTietPhieuDoiTra &&
          chiTietPhieuDoiTra.dsDichVuMoi.map((item, index) => (
            <div key={index} style={{ display: "flex" }}>
              <div
                className="notborderL center w60"
                style={{ textAlign: "center" }}
                span={1}
              >
                {index + 1}
              </div>
              <div className="w120">{item?.maDichVu}</div>
              <div className="w250">{item?.tenDichVu}</div>
              <div className="w250">
                {item?.thoiGianDuyetXuatKho
                  ? moment(item?.thoiGianDuyetXuatKho).format(
                      "HH:mm:ss DD-MM-YYYY"
                    )
                  : null}
              </div>
              <div className="right w120">{item?.soLuong?.formatPrice()}</div>
              <div className="right w150">{item?.thanhTien?.formatPrice()}</div>
              <div className="right w150">
                {item?.tienPhiTra?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.giaKhongBaoHiem?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.giaBaoHiem?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.giaKhongBaoHiem?.formatPrice()}
              </div>
              <div className="right w150">
                {item?.tienMienGiam?.formatPrice()}
              </div>
              <div className="left w150">
                {renderTrangThai(item?.trangThaiHoan)}
              </div>
              <div className="w150 center">
                <Checkbox disabled={true} checked={item.tuTra} />
              </div>
              <div className="notborderR center w150">
                <Checkbox checked={item?.khongTinhTien} disabled={true} />
              </div>
            </div>
          ))}
      </div>
    </Main>
  );
};

export default BangThongTin;
