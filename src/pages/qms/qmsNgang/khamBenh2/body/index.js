import React, { memo } from "react";
import { StyleBody } from "./bodyStyles";
import MiddleContent from "./MiddleContent";
import BottomContent from "./BottomContent";

function Body(props) {
  const {
    dsDangThucHien,
    dsTiepTheo,
    dsGoiNho,
    currentKiosk
  } = props;
  return (
    <StyleBody
    currentKiosk={currentKiosk}
    >
      <MiddleContent
        dsDangThucHien={dsDangThucHien}
      />
      <BottomContent
        dsTiepTheo={dsTiepTheo}
        dsGoiNho={dsGoiNho}
        currentKiosk={currentKiosk}
      />
    </StyleBody>
  );
}

export default memo(Body);