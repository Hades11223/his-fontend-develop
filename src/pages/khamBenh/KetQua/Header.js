import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import IconPrinter from "assets/images/khamBenh/printer.png";
import { HeaderWrapper } from "./styled";
import IcViewImagePacs from "assets/svg/ic-view-pasc.svg";
import { TRANG_THAI_DICH_VU, LOAI_DICH_VU } from "constants/index";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

const Header = ({ isCollapsed, title, dataSource, onViewPacs, onPrint }) => {
  const { t } = useTranslation();
  const onHiddenPacs = () =>
    dataSource &&
    dataSource.find(
      (x) =>
        x.loaiDichVu === LOAI_DICH_VU.CDHA &&
        TRANG_THAI_DICH_VU.DA_CO_KET_QUA === x.trangThai
    );

  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      <div className="info">
        <CaretRightOutlined className="collapse-arrow" />
        <span className="info__name">{title}</span>
        <Tooltip title={t("khamBenh.ketQua.inKetQua")} placement="bottom">
          <img
            src={IconPrinter}
            alt="IconEdit"
            onClick={(e) => {
              e.stopPropagation();
              onPrint && onPrint();
            }}
          />
        </Tooltip>
        {onHiddenPacs() && (
          <IcViewImagePacs
            className="icon"
            onClick={onViewPacs}
            title={t("khamBenh.ketQua.xemKQPacs")}
          />
        )}
      </div>
    </HeaderWrapper>
  );
};
export default Header;
