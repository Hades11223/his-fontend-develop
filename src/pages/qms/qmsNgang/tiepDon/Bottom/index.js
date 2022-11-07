import React, { memo } from "react";
import { Wrapper } from "./styled";
import { HOST } from "client/request";
import { useSelector } from "react-redux";

function Bottom(props) {
  const application = useSelector((state) => state.application);
  return (
    <Wrapper>
      <div className="qr-box__content">
        <span>Bản quyền thuộc về</span>
        <img
          src={`${HOST}/api/his/v1/files/${application.logoThuongHieu}`}
          alt="..."
        />
      </div>
    </Wrapper>
  );
}

export default memo(Bottom);
