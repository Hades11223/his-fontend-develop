import React, { memo, useEffect } from "react";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import { Col } from "antd";
import { Main } from "./styled";
import ThongTinCaNhan from "pages/tiepDon/components/ThongTinCaNhan";
import ThongTinBaoHiem from "pages/tiepDon/components/ThongTinBaoHiem";
import ThongTinBoSung from "pages/tiepDon/components/ThongTinBoSung";

const Info = ({
  layerId,
  onChange,
  onCheckTrungThongTin,
  checkMaTheBhyt,
  id,
  isEdit,
  ...props
}) => {
  return (
    <Main>
      <Col md={24} xl={8} xxl={8}>
        <AuthWrapper accessRoles={[ROLES["TIEP_DON"].THONG_TIN_CA_NHAN]}>
          <ThongTinCaNhan
            id={id}
            layerId={layerId}
            onChange={onChange}
            onCheckTrungThongTin={onCheckTrungThongTin}
            checkMaTheBhyt={checkMaTheBhyt}
          />
        </AuthWrapper>
      </Col>
      <Col md={24} xl={8} xxl={8}>
        <AuthWrapper accessRoles={[ROLES["TIEP_DON"].BHYT]}>
          <ThongTinBaoHiem
            id={id}
            layerId={layerId}
            onChange={onChange}
            onCheckTrungThongTin={onCheckTrungThongTin}
            checkMaTheBhyt={checkMaTheBhyt}
            isEdit={isEdit}
          />
        </AuthWrapper>
      </Col>
      <Col md={24} xl={8} xxl={8}>
        <AuthWrapper accessRoles={[ROLES["TIEP_DON"].THONG_TIN_BO_SUNG]}>
          <ThongTinBoSung
            layerId={layerId}
            onCheckTrungThongTin={onCheckTrungThongTin}
          />
        </AuthWrapper>
      </Col>
    </Main>
  );
};
export default memo(Info);
