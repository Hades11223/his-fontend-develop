import React, { useEffect, useRef } from "react";
import { Main, MainPage, WrapButtonRight } from "./styled";
import DanhSachLienThongGPP from "./DanhSachLienThongGPP";
import TimKiemLienThongGPP from "./TimKiemLienThongGPP";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import ModalDayLienThongGPP from "./ModalDayLienThongGPP";
import Button from "pages/kho/components/Button";
import { useTranslation } from "react-i18next";
import NhaThuoc from "../DonThuoc";

const LienThongGPP = (props) => {
  const refModalDayLienThongGPP = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  const { t } = useTranslation();

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  //function
  function onShowDayLienThongGPP() {
    refModalDayLienThongGPP.current && refModalDayLienThongGPP.current.show();
  }

  return (
    <MainPage
      breadcrumb={[
        { title: t("nhaThuoc.nhaThuoc"), link: "/quan-ly-nha-thuoc" },
        {
          title: t("nhaThuoc.lienThongGPP"),
          link: "/nha-thuoc/lien-thong-gpp",
        },
      ]}
      title={
        <div className="title">
          <label>{t("nhaThuoc.danhSachLienThongGPP")}</label>
        </div>
      }
      titleRight={
        <WrapButtonRight>
          <Button
            type="primary"
            iconHeight={15}
            onClick={onShowDayLienThongGPP}
          >
            {t("nhaThuoc.dayLienThongHangLoat")}
          </Button>
        </WrapButtonRight>
      }
    >
      <Main>
        <TimKiemLienThongGPP
          layerId={refLayerHotKey.current}
          onShowDayLienThongGPP={onShowDayLienThongGPP}
        />

        <DanhSachLienThongGPP />

        <ModalDayLienThongGPP ref={refModalDayLienThongGPP} />
      </Main>
    </MainPage>
  );
};

export default LienThongGPP;
