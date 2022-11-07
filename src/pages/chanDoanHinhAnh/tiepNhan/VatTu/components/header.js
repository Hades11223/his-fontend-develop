import React from "react";
import { HeaderWrapper } from "../styled";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { connect } from "react-redux";
import { message } from "antd";
import { useTranslation } from "react-i18next";
function Header(props) {
  const { t } = useTranslation();
  const { listDvVatTu, onDeleteAll, getListDichVuVatTu, nbDotDieuTriId, chiDinhTuDichVuId } = props;

  const onDelete = (e) => {
    const payload = listDvVatTu.map((item) => {
      return item.id;
    });
    onDeleteAll(payload).then((s) => {
      let data = (s?.data || []).filter((item) => {
        return item.code !== 0 
      })
      if (data.length) {
        message.error(`${t("khamBenh.donThuoc.khongTheXoaDichVu")} :  ${data}`);
      } else {
        message.success(t("cdha.xoaDonVatTuThanhCong"));
        getListDichVuVatTu({ nbDotDieuTriId, chiDinhTuDichVuId });
      }
    })
  };
  return (
    <HeaderWrapper>
      {props.title && `${props.title} - ${props?.listDvVatTu ? props?.listDvVatTu[0]?.soPhieu : ""}`}
      <img
        src={IconPrinter}
        alt="IconEdit"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
    </HeaderWrapper>
  );
}
const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = ({
  chiDinhDichVuVatTu: { onDeleteAll, getListDichVuVatTu },
}) => ({
  onDeleteAll,
  getListDichVuVatTu,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
