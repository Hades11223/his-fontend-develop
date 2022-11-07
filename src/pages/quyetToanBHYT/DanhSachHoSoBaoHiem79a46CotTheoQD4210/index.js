import React from "react";
import { Main } from "./styled";
import TimKiem from "./TimKiem";
import { connect } from "react-redux";
import DanhSach from "./DanhSach";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Page } from "components";
const DanhSachNguoiBenhChoTaoHoSoBHYT = (props) => {
  return (
    <Page
      breadcrumb={[
        { title: "Quyết toán BHYT", link: "/quyet-toan-bhyt" },
        {
          title: "Mẫu 79A 46 cột QĐ4210",
          link: "/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210",
        },
      ]}
      title={"Danh sách hồ sơ giám định BH mẫu 79A 46 cột QĐ4210"}
    >
      <Spin
        spinning={props.loadingXoaHoSoHangLoat}
        indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
      >
        <Main>
          <TimKiem />
          <DanhSach />
        </Main>
      </Spin>
    </Page>
  );
};

const mapStateToProps = (state) => {
  const {
    danhSachHoSoBaoHiem79A46QD4201: { loadingXoaHoSoHangLoat },
  } = state;
  return {
    loadingXoaHoSoHangLoat,
  };
};
export default connect(mapStateToProps, null)(DanhSachNguoiBenhChoTaoHoSoBHYT);
