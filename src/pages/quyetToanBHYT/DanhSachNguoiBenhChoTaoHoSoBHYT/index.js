import React from "react";
import { Main } from "./styled";
import TimKiem from "./TimKiem";
import { useSelector } from "react-redux";
import DanhSach from "./DanhSach";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Page } from "components";
const DanhSachNguoiBenhChoTaoHoSoBHYT = (props) => {
  const { loadingTaoHoSoHangLoat } = useSelector(
    (state) => state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT
  );
  return (
    <Page
      breadcrumb={[
        { title: "Quyết toán BHYT", link: "/quyet-toan-bhyt" },
        {
          title: "Danh sách NB chờ tạo hồ sơ quyết toán BHYT",
          link: "/quyet-toan-bhyt/danh-sach-nguoi-benh-cho-tao-ho-so-quyet-toan-bhyt",
        },
      ]}
      title={"Danh sách NB chờ tạo hồ sơ quyết toán BHYT"}
    >
      <Spin
        spinning={loadingTaoHoSoHangLoat}
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
export default DanhSachNguoiBenhChoTaoHoSoBHYT;
