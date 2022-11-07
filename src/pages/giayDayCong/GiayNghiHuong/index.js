import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { Page } from "components";
import { useTranslation } from "react-i18next";
import TimKiemGiayNghiHuong from "../components/TimKiemGiayNghiHuong";
import DanhSachGiayNghiHuong from "../components/DanhSachGiayNghiHuong";

const GiayNghiHuong = (props) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refCreate = useRef();

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

  return (
    <Page
      breadcrumb={[
        {
          title: t("giayDayCong.danhSachGiayDayCong"),
          link: "/danh-sach-giay-day-cong",
        },
        {
          title: t("giayDayCong.dsGiayNghiHuong"),
          link: "/giay-day-cong/giay-nghi-huong",
        },
      ]}
      title={t("giayDayCong.dsGiayNghiHuong")}
    >
      <Main>
        <TimKiemGiayNghiHuong layerId={refLayerHotKey.current} />
        <DanhSachGiayNghiHuong />
      </Main>
    </Page>
  );
};

export default GiayNghiHuong;
