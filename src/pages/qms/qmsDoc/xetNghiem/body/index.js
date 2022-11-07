import React, { memo } from "react";
import { StyleBody } from "./bodyStyles";
import TopContent from "./TopContent";
import MiddleContent from "./MiddleContent";
import BottomContent from "./BottomContent";

function Body(props) {
  const {
    currentKiosk,
    dsDangThucHien,
    dsDaXacNhan,
    dsTiepTheo,
    dsChoXacNhan,
    isUpdateNBCurrent,
    isUpdateNBNext,
    choThucHien,
    choXacNhan,
    linkRoom,
    onExit,
    listNhanVien,
  } = props;
  return (
    <StyleBody
      slideBottom={dsTiepTheo && dsTiepTheo.length ? "212px" : "188px"}
      slideBottom750={dsTiepTheo && dsTiepTheo.length ? "144px" : "127px"}
    >
      <TopContent
        currentKiosk={currentKiosk}
        listNhanVien= {listNhanVien}
        onExit={onExit}
      />
      <MiddleContent
        dsDangThucHien={dsDangThucHien}
        dsTiepTheo={dsTiepTheo}
        // thoiGianTb={thoiGianTb * 1000}
        // isUpdateNBCurrent={isUpdateNBCurrent}
        // isUpdateNBNext={isUpdateNBNext}
        // linkRoom={linkRoom}
      />
      <BottomContent
        dsDaXacNhan={dsDaXacNhan}
        dsChoXacNhan={dsChoXacNhan}
      />
    </StyleBody>
  );
}

export default memo(Body);