import React from "react";
import ThongTinNguoiBenh from "./ThongTinNguoiBenh";
import DanhSach from "./DanhSach";
import { Main } from "./styled";

const LeftPanel = (props) => {
  return (
    <Main>
      <ThongTinNguoiBenh {...props} />
      <DanhSach {...props} />
    </Main>
  );
};

export default LeftPanel;
