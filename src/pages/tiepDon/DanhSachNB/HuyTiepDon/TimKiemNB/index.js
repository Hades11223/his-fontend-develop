import { Button } from "components";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import ModalHuyTiepDon from "pages/tiepDon/DanhSachNB/HuyTiepDon/ModalHuyTiepDon";
import IcCreate from "assets/images/kho/IcCreate.png";
import { BaseSearch } from "components";
import { useTranslation } from "react-i18next";

const TimKiemNB = (props) => {
  const { t } = useTranslation();
  useEffect(() => {}, []);
  const refHuyTiepDon = useRef(null);

  const {
    danhSachNbHuyTiepDon: { onChangeInputSearch },
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();

  useEffect(() => {
    getListNhanVienTongHop({});
  }, []);

  const onCreate = () => {
    refHuyTiepDon.current && refHuyTiepDon.current.show();
  };
  return (
    <>
      <BaseSearch
        dataInput={[
          {
            widthInput: "212px",
            placeholder: t("tiepDon.timHoTenNguoiBenh"),
            keyValueInput: "tenNb",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "212px",
            placeholder: t("tiepDon.timSoDienThoai"),
            keyValueInput: "soDienThoai",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "389px",
            placeholder: t("tiepDon.nhapMaNb"),
            keyValueInput: "maNb",
            functionChangeInput: onChangeInputSearch,
          },
        ]}
        componentRight={
          <Button
            type="success"
            onClick={onCreate}
            rightIcon={<img src={IcCreate} alt="IcCreate" />}
            iconHeight={20}
          >
            {t("common.themMoi")}
          </Button>
        }
      />
      <ModalHuyTiepDon ref={refHuyTiepDon} />
    </>
  );
};

export default TimKiemNB;
