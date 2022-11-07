import React from "react";
import { useTranslation } from "react-i18next";
import { InputTimeout } from "components";

const DiscountOnReceipt = ({
  onUpdateReceipt = () => {},
  phanTramMienGiam,
  validateNumber,
  tienMienGiam,
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
          <InputTimeout
            type="number"
            placeholder={t("thuNgan.nhapSoPhanTram")}
            onChange={(value) => onUpdateReceipt("phanTramMienGiam", value)}
            defaultValue={phanTramMienGiam}
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
          <InputTimeout
            type="number"
            formatPrice={true}
            placeholder={t("thuNgan.nhapSoTien")}
            onChange={(value) => onUpdateReceipt("tienMienGiam", value || 0)}
            defaultValue={tienMienGiam}
          />
        </div>
      </div>
    </>
  );
};

export default DiscountOnReceipt;
