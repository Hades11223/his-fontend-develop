import React from "react";
import { Input, InputNumber } from "antd";
import { InputNumberFormat } from "components/common";
import { useTranslation } from "react-i18next";

const DiscountOnReceipt = ({
  onUpdateReceipt,
  thongTinPhieuThu,
  phanTramMienGiam,
  validateNumber,
  tienMienGiamPhieuThu,
  ghiChu,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="item-row text-bold">{t("thuNgan.soTienMienGiam")}</div>
      <div className="item-row">
        <div className="title text-bold">
          {t("thuNgan.dienPhanTramMienGiamApDung")}
        </div>{" "}
        <div className="num">
          <InputNumber
            type="number"
            placeholder={t("thuNgan.nhapSoPhanTram")}
            onChange={(value) => onUpdateReceipt("phanTramMienGiam", value)}
            defaultValue={thongTinPhieuThu?.phanTramMienGiam}
            disabled={thongTinPhieuThu.thanhToan}
          />{" "}
          <span>%</span>
          {phanTramMienGiam && !validateNumber(phanTramMienGiam) ? (
            <div className="error">{t("common.duLieuKhongHopLe")}</div>
          ) : null}
        </div>
      </div>
      {t("common.hoac")}
      <div className="item-row">
        <div className="title text-bold">
          {t("thuNgan.dienSoTienMienGiam")}:
        </div>{" "}
        <div className="num">
          <InputNumberFormat
            width="240px"
            placeholder={t("thuNgan.nhapSoTien")}
            onValueChange={(value) => {
              onUpdateReceipt("tienMienGiamPhieuThu", value?.floatValue || 0);
            }}
            disabled={thongTinPhieuThu.thanhToan}
            value={tienMienGiamPhieuThu}
          />
        </div>
      </div>
      <div className="item-row">
        <div className="title text-bold">
          {t("thuNgan.quanLyTamUng.ghiChu")}:
        </div>{" "}
        <div className="num">
          <Input
            width="240px"
            placeholder={t("thuNgan.nhapNoiDungGhiChu")}
            onChange={(e) => {
              onUpdateReceipt("ghiChu", e?.target?.value);
            }}
            value={ghiChu}
          />
        </div>
      </div>
    </>
  );
};

export default DiscountOnReceipt;
