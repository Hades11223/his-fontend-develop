import React from "react";
import { HeaderWrapper } from "../../ChiDinhDichVu/DichVuDaChiDinh/DanhSachChiDinh/Header/styled";
import { CaretRightOutlined } from "@ant-design/icons";

const Header = ({ isCollapsed, title }) => {
  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      <div className="header-info">
        <CaretRightOutlined className="collapse-arrow" />
        <span className="header-info__name">{title}</span>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
