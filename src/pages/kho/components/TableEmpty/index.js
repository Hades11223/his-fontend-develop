import { Button } from "antd";
import { Main } from "./styled";
import empty from "assets/images/kho/empty.png";
import React from "react";
const TableEmpty = (
  {
    showButton,
    emptyText = "Chưa có hàng hóa",
    buttonText = "Thêm mới ngay",
    onClickButton,
    ...props
  },
  ref
) => {
  return (
    <Main div style={{ padding: "100px 0" }}>
      <img src={empty} />
      <div style={{ padding: "10px 0" }}>{emptyText}</div>
      {showButton && (
        <Button className="btn-action" onClick={onClickButton}>
          {buttonText}
        </Button>
      )}
    </Main>
  );
};

export default TableEmpty;
