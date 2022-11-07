import React, { memo, useRef } from "react";
import { StyledHeader } from "./styled";
import { Row, Col } from "antd";
import Modal from "pages/qms/qmsNgang/thietLap/Modal";
import SlideText from "pages/qms/components/SlideText";
import { HOST } from "client/request";
import { useStore } from "hook";
import { useDispatch } from "react-redux";
const Header = (props) => {
  const { currentKiosk } = props;
  const auth = useStore("auth.auth", {});
  const refInfo = useRef(null);

  const {
    quayTiepDon: { getListTongHop },
  } = useDispatch();

  const onOpenPopup = () => {
    getListTongHop({
      khoaId: currentKiosk?.khoaId,
      active: true,
      page: "",
      size: "",
    });
    if (currentKiosk) refInfo.current && refInfo.current.show(currentKiosk);
  };
  return (
    <StyledHeader>
      <Row>
        <Col span={12}>
          <Row>
            <div className="header">
              <div className="logo" onClick={onOpenPopup}>
                <img
                  src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
                  alt="..."
                />
              </div>
              <div className="title-header">
                <SlideText className="title-header__first">
                  <span>{auth?.benhVien?.ten}</span>
                </SlideText>
              </div>
            </div>
          </Row>
        </Col>
        <Col span={12}>
          <div className="content">{currentKiosk.quayTiepDon?.ten}</div>
        </Col>
      </Row>
      <Modal ref={refInfo}></Modal>
    </StyledHeader>
  );
};

export default memo(Header);
