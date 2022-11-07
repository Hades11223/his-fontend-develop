import React, { useRef } from "react";
import { Page, Button, AuthWrapper } from "components";
import TimKiemNB from "./TimKiemNB";
import DanhSach from "./DanhSach";
import ModalTiepNhanNBKSK from "../../components/ModalTiepNhanNBKSK";
import { useTranslation } from "react-i18next";
import IconList from "assets/svg/iconList.svg";
import { Main } from "./styled";
import { ROLES } from "constants/index";
import { useDispatch } from "react-redux";

const DanhSachNguoiBenh = (props) => {
  const { t } = useTranslation();
  const refTiepNhanNBKSK = useRef(null);

  const { onChangeInputSearch } = useDispatch().danhSachNbTiepDon;

  function showModalTiepNhanNBKSK() {
    refTiepNhanNBKSK.current &&
      refTiepNhanNBKSK.current.show({}, () => {
        onChangeInputSearch({});
      });
  }

  return (
    <Page
      breadcrumb={[
        {
          title: t("tiepDon.quanLyTiepDon"),
          link: "/quan-ly-tiep-don",
        },
        {
          title: t("tiepDon.danhSachNguoiBenhDaTiepDon"),
          link: "/quan-ly-tiep-don/danh-sach-nb-da-tiep-don",
        },
      ]}
      title={
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {t("tiepDon.danhSachNguoiBenhDaTiepDon")} &ensp;
          <IconList />
          &ensp;
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].TIEP_NHAN_NHIEU_KSK]}>
            <Button onClick={showModalTiepNhanNBKSK} type="primary">
              {t("tiepDon.tiepNhanNBKSK")}
            </Button>
          </AuthWrapper>
        </div>
      }
    >
      <Main>
        <TimKiemNB showModalTiepNhanNBKSK={showModalTiepNhanNBKSK} />
        <DanhSach />
      </Main>
      <ModalTiepNhanNBKSK ref={refTiepNhanNBKSK} />
    </Page>
  );
};

export default DanhSachNguoiBenh;
