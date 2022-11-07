import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import DanhSachHopDong from "../components/DanhSachHopDong";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import TimKiemHopDong from "../components/TimKiemHopDong";
import ModalThemMoiHopDong from "../modals/ModalThemMoiHopDong";
import { Button } from "components";
import { Page } from "components";
import { useTranslation } from "react-i18next";
import { PlusCircleOutlined } from "@ant-design/icons";

const HopDongKhamSucKhoe = (props) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  const refCreate = useRef();

  //ref
  const refModalThemMoiHopDong = useRef(null);

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  //function
  function onAddHopDong() {
    refModalThemMoiHopDong.current && refModalThemMoiHopDong.current.show();
  }

  return (
    <Page
      breadcrumb={[
        {
          title: t("khamSucKhoe.quanLyKhamSucKhoe"),
          link: "/kham-suc-khoe",
        },
        {
          title: t("khamSucKhoe.danhSachHopDong"),
          link: "/kham-suc-khoe/hop-dong",
        },
      ]}
      title={t("khamSucKhoe.hopDongKhamSucKhoe")}
      titleRight={
        <Button
          type="success"
          onClick={onAddHopDong}
          iconHeight={15}
          rightIcon={<PlusCircleOutlined />}
        >
          {t("common.themMoi")} [F1]
        </Button>
      }
    >
      <Main>
        <TimKiemHopDong layerId={refLayerHotKey.current} />

        <DanhSachHopDong />

        <ModalThemMoiHopDong ref={refModalThemMoiHopDong} />
      </Main>
    </Page>
  );
};

export default HopDongKhamSucKhoe;
