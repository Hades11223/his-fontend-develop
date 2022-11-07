import React, { memo } from "react";
import { StyleBody } from "./bodyStyles";
import MiddleContent from "./MiddleContent";
import BottomContent from "./BottomContent";

function Body(props) {
  const {
    dsDangThucHien,
    dsDaXacNhan,
    dsTiepTheo,
    dsChoXacNhan,
    dsGoiNho,
    currentKiosk
  } = props;
  return (
    <StyleBody
    >
      <MiddleContent
        dsDangThucHien={dsDangThucHien}
        dsTiepTheo={dsTiepTheo}
      />
      <BottomContent
        dsDaXacNhan={dsDaXacNhan}
        dsChoXacNhan={dsChoXacNhan}
        dsGoiNho={dsGoiNho}
        currentKiosk={currentKiosk}
      />
    </StyleBody>
  );
}

export default memo(Body);