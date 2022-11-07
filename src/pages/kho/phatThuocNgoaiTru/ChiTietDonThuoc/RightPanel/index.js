import React from "react";
import ThongTinDonThuoc from "./ThongTinDonThuoc";
import { Main } from "./styled";
const RightPanel = (props) => {
  return (
    <Main>
      <ThongTinDonThuoc {...props} />
    </Main>
  );
};

export default RightPanel;
