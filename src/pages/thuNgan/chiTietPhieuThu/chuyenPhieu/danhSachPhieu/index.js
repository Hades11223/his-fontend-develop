import React, { useEffect } from "react";
import { Main } from "./styled";
import Select from "components/Select";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const DanhSachPhieuThuChuyen = (props) => {
  const { t } = useTranslation();

  const { getAll, listAllData, getPhieuThu, thongTinPhieuThu } = props;
  const { nbDotDieuTriId, phieuThuId } = useParams();
  useEffect(() => {
    getAll({ page: 0, size: 9999, nbDotDieuTriId });
  }, [phieuThuId]);

  return (
    <Main>
      <Select
        disabled={thongTinPhieuThu?.thanhToan}
        data={listAllData
          .filter((item) => !item.thanhToan && item.id !== +phieuThuId)
          .map((item) => {
            return {
              id: item.id,
              ten: `${t("thuNgan.phieuThu")} ${item.thanhTien?.formatPrice()}`,
            };
          })}
        placeholder={t("thuNgan.chonPhieuThu")}
        onChange={getPhieuThu}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    danhSachPhieuThu: { listAllData = [] },
    thuNgan: { thongTinPhieuThu },
  } = state;
  return {
    listAllData,
    thongTinPhieuThu,
  };
};

const mapDispatchToProps = ({ danhSachPhieuThu: { getAll } }) => ({
  getAll,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhSachPhieuThuChuyen);
