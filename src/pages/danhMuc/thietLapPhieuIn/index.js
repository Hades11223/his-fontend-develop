import React, { useEffect } from "react";
import MainBox from "pages/danhMuc/thietLapPhieuIn/components/MainBox";
import { Main, MainPage } from "./styled";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
const ThietLapPhieuIn = (props) => {
  const { getUtils, getDanhSachPhieuIn } = props;
  const { t } = useTranslation();
  useEffect(() => {
    getUtils({ name: "LoaiPhongHangDoi" });
    getUtils({ name: "DoiTuongHangDoi" });
    getDanhSachPhieuIn({});
  }, []);

  return (
    <MainPage
      breadcrumb={[
        { title: t("thietLap.thietLap"), link: "/thiet-lap" },
        {
          title: t("thietLap.thietLapPhieuIn"),
          link: "/thiet-lap/thiet-lap-phieu-in",
        },
      ]}
      title={t("thietLap.thietLapPhieuTaiCacManHinh")}
    >
      <Main>
        <MainBox></MainBox>
      </Main>
    </MainPage>
  );
};

const mapStateToProps = (state) => {
  const {
    utils: { listLoaiPhongHangDoi = [], listDoiTuongHangDoi = [] },
  } = state;

  return {
    listLoaiPhongHangDoi,
    listDoiTuongHangDoi,
  };
};
const mapDispatchToProps = ({
  utils: { getUtils },
  thietLapPhieuIn: { getDanhSachPhieuIn },
}) => ({
  getUtils,
  getDanhSachPhieuIn,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThietLapPhieuIn);
