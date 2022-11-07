import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "components";
import { useTranslation } from "react-i18next";
import DanhSachNbRaVien from "../components/DanhSachNbRaVien";
import TimKiemNbRaVien from "../components/TimKiemNbRaVien";
import { ModalChiTietRaVien } from "../modals";

const NbRaVien = (props) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refCreate = useRef();
  const refModalChiTietRaVien = useRef(null);

  const { page, size } = useSelector((state) => state.nbRaVien);
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const { onSizeChange } = useDispatch().nbRaVien;

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

  const onShowModalThongTinRaVien = (item) => () => {
    if (refModalChiTietRaVien.current) {
      refModalChiTietRaVien.current.show(
        {
          nbDotDieuTriId: item?.id,
        },
        () => {
          onSizeChange({ page, size });
        }
      );
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
          title: t("giayDayCong.danhSachNbRaVien"),
          link: "/giay-day-cong/nb-ra-vien",
        },
      ]}
      title={t("giayDayCong.danhSachNbRaVien")}
    >
      <Main>
        <TimKiemNbRaVien layerId={refLayerHotKey.current} />
        <DanhSachNbRaVien onShowTTRaVien={onShowModalThongTinRaVien} />

        <ModalChiTietRaVien ref={refModalChiTietRaVien} />
      </Main>
    </Page>
  );
};

export default NbRaVien;
