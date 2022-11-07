import { Select } from "antd";
import IcChietKhau from "assets/svg/kho/chiet-khau.svg";
import React, { useState } from "react";
import { useRef, useMemo } from "react";
import { Main } from "./styled";
import { formatNumber } from "utils";
import ModalChietKhau from "pages/kho/components/ModalChietKhau";
import { useSelector } from "react-redux";
const { Option } = Select;

const ThongTinTongHop = ({ ...props }) => {
  const refModalChietKhau = useRef(null);
  const {
    phieuNhapXuat: { thongTinPhieu, dsNhapXuatChiTiet },
  } = useSelector((state) => state);

  const thongTinTongHop = useMemo(() => {
    let soLuongSoCap = 0,
      tongTien = 0;
    (dsNhapXuatChiTiet || []).forEach((item) => {
      soLuongSoCap += item.soLuongSoCap;
      tongTien += (item?.loNhap?.giaNhapSauVat || 0) * (item?.soLuongSoCap || 0) ;
    });
    return { soLuongSoCap, tongTien };
  }, [dsNhapXuatChiTiet]);

  const chietKhauHangHoa = useMemo(() => {
    let chietKhau = 0;
    const data = dsNhapXuatChiTiet || [];
    chietKhau = data?.reduce((acc, item) => {
      const ck =
        item?.loNhap?.tienChietKhau != null
          ? parseFloat(item?.loNhap?.tienChietKhau || 0)
          : parseFloat(item?.loNhap?.giaNhapTruocVat || 0) *
            parseFloat(item?.soLuongSoCap || 0) *
            parseFloat((item?.loNhap?.tyLeChietKhau || 0) / 100);
      acc = parseFloat(acc || 0) + parseFloat(ck || 0);
      return acc;
    }, 0);
    return chietKhau;
  }, [dsNhapXuatChiTiet]);

  const onShowChietKhau = () => {
    refModalChietKhau.current &&
      refModalChietKhau.current.show({
        isReadOnly: true,
      });
  };
  return (
    <Main>
      <div>
        <div className="item-line">
          <div className="line-label">Tổng số lượng:</div>
          <div className="line-value">
            {formatNumber(thongTinTongHop.soLuongSoCap || 0)}
          </div>
        </div>
        <div className="item-line">
          <div className="line-label">Tổng tiền:</div>
          <div className="line-value">
            {formatNumber(thongTinTongHop.tongTien || 0)}
          </div>
        </div>
        <div className="item-line">
          <div
            className="line-label pointer chiet-khau"
            onClick={onShowChietKhau}
          >
            <IcChietKhau /> Chiết khấu:
          </div>
          <div className="line-value">
            {formatNumber(
              (thongTinPhieu?.tienChietKhau || 0) + chietKhauHangHoa
            )}
          </div>
        </div>
        <div className="item-line">
          <div className="line-label">Thành tiền:</div>
          <div className="line-value">
            {formatNumber(thongTinPhieu?.thanhTien || 0)}
          </div>
        </div>
        <div className="item-line">
          <div className="line-label">Thành tiền sửa đổi:</div>
          <div className="line-value">
            {formatNumber(thongTinPhieu?.thanhTienSuaDoi || 0)}
          </div>
        </div>
      </div>
      <ModalChietKhau ref={refModalChietKhau} />
    </Main>
  );
};

export default ThongTinTongHop;
