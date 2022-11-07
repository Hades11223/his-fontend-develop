import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { Page } from "components";
import { useTranslation } from "react-i18next";
import DanhSachNbTuVong from "../components/DanhSachNbTuVong";
import TimKiemNbTuVong from "../components/TimKiemNbTuVong";
import ModalThongTinTuVong from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ThongTinVaoVien/ModalThongTinTuVong";

const NbTuVong = (props) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refCreate = useRef();
  const modalThongTinTuVongRef = useRef(null);

  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  useEffect(() => {
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refCreate.current && refCreate.current.click();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const onShowModalThongTinTuVong = (item) => () => {
    if (modalThongTinTuVongRef.current) {
      modalThongTinTuVongRef.current.show({
        nbDotDieuTriId: item?.nbDotDieuTriId,
      });
    }
  };

  return (
    <Page
      breadcrumb={[
        {
          title: t("giayDayCong.danhSachGiayDayCong"),
          link: "/danh-sach-giay-day-cong",
        },
        {
          title: t("giayDayCong.danhSachNbTuVong"),
          link: "/giay-day-cong/nb-tu-vong",
        },
      ]}
      title={t("giayDayCong.danhSachNbTuVong")}
    >
      <Main>
        <TimKiemNbTuVong layerId={refLayerHotKey.current} />
        <DanhSachNbTuVong onShowTTTuVong={onShowModalThongTinTuVong} />

        <ModalThongTinTuVong ref={modalThongTinTuVongRef} />
      </Main>
    </Page>
  );
};

export default NbTuVong;
