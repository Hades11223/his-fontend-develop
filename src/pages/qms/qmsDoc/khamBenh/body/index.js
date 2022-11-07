import React, { memo } from "react";
import { StyleBody } from "./bodyStyles";
import TopContent from "./TopContent";
import MiddleContent from "./MiddleContent";
import BottomContent from "./BottomContent";
import { TRANG_THAI_HIEN_THI } from "../../config";

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
      /> 
      {(currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.DA_XAC_NHAN) || 
      currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.CHO_XAC_NHAN)) &&
      <BottomContent
        dsDaXacNhan={dsDaXacNhan}
        dsChoXacNhan={dsChoXacNhan}
        currentKiosk={currentKiosk}
      />
      }
    </StyleBody>
  );
}

export default memo(Body);