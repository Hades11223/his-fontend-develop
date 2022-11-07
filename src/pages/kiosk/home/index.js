import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkRole } from "utils/role-utils";

const Home = ({ auth }) => {
  // if (checkRole(["kiosk_dangKy_uuTien"], auth.authorities))
    // return <Redirect to="/kiosk/doi-tuong-uu-tien" />;
  return <Redirect to="/kiosk/lua-chon-hinh-thuc-kham" />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapStateToProps, null)(Home);
