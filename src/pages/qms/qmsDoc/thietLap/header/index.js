import { HOST } from "client/request";
import React, { memo } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { StyledHeader } from "./styled";

const Header = (props) => {
  const { onOpenPopup, getBenhVien, benhVien } = props;

  useEffect(() => {
    getBenhVien();
  }, []);

  return (
    <StyledHeader>
      <div className="logo" onClick={onOpenPopup}>
        <img src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`} alt="..." />
      </div>
      <div className="title-header">
        <span className="title-header__first">{benhVien?.ten}</span>
      </div>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    benhVien: state.thietLap.benhVien || {},
  };
};

const mapDispatchToProps = ({ thietLap: { getBenhVien } }) => ({
  getBenhVien,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
