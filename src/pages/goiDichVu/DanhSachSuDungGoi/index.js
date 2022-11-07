import React, { useRef } from "react";
import { Main } from "./styled";
import DanhSach from "./DanhSach";
import TimKiemNb from "./TimKiemNb";
import { Page } from "components";
import Button from "pages/kho/components/Button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ModalThemMoiNguoiBenh from "./ModalThemMoiNguoiBenh";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";

const DanhSachNguoiBenhSuDungGoi = ({ history }) => {
  const { t } = useTranslation();
  const refModalThemMoiNguoiBenh = useRef(null);

  const onCreate = () => {
    refModalThemMoiNguoiBenh.current &&
      refModalThemMoiNguoiBenh.current.show({}, (data) => {});
  };

  return (
    <Page
      breadcrumb={[
        { link: "/goi-dich-vu", title: t("goiDichVu.goiDichVu") },
        {
          link: "/goi-dich-vu/danh-sach-su-dung-goi",
          title: t("goiDichVu.danhSachNguoiBenhSuDungGoi"),
        },
      ]}
      title={t("goiDichVu.danhSachNguoiBenhSuDungGoi")}
      titleRight={
        checkRole([ROLES["GOI_DICH_VU"].THEM_MOI_GOI_CHO_NB]) ? (
          <Button
            type={"success"}
            onClick={onCreate}
            rightIcon={<PlusCircleOutlined />}
            iconHeight={15}
          >
            <span>{t("common.themMoi")}</span>
          </Button>
        ) : (
          ""
        )
      }
    >
      <Main>
        <TimKiemNb />
        <DanhSach />
        <ModalThemMoiNguoiBenh ref={refModalThemMoiNguoiBenh} />
      </Main>
    </Page>
  );
};

export default DanhSachNguoiBenhSuDungGoi;
