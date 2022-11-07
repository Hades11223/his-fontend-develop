import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSearch from "../../../../components/BaseSearch";
import { useTranslation } from "react-i18next";
const TimKiemPhieu = (props) => {
  const { t } = useTranslation();

  const {
    nbGoiDv: { onChangeInputSearch },
    utils: { getUtils },
  } = useDispatch();
  const { listTrangThaiNbGoiDv } = useSelector((state) => state.utils);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getUtils({ name: "TrangThaiNbGoiDv" });
  }, []);

  return (
    <BaseSearch
      dataInput={[
        {
          widthInput: "232px",
          placeholder: t("goiDichVu.timMaNguoiBenhQRNguoiBenh"),
          functionChangeInput: onChangeInputSearch,
          isScanQR: true,
          qrGetValue: "maNb",
          keysFlexible: [
            {
              key: "tenNb",
              type: "string",
            },
            {
              key: "maNb",
              type: "number",
            },
          ],
        },
        {
          widthInput: "232px",
          placeholder: t("goiDichVu.timTenNguoiBenh"),
          keyValueInput: "tenNb",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("goiDichVu.timTenGoiApDung"),
          keyValueInput: "tenGoiDv",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "180px",
          placeholder: t("common.trangThai"),
          keyValueInput: "trangThai",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          listSelect: listTrangThaiNbGoiDv,
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        data: [],
      }}
    />
  );
};

export default TimKiemPhieu;
