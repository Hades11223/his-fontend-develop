import React, { memo, useState, useEffect, useRef } from "react";
import { StyledHeader } from "./headerStyles";
import { Row, Col, Carousel } from "antd";
import Modal from "pages/qms/qmsNgang/thietLap/Modal";
import SlideText from "pages/qms/components/SlideText";
import fileUtils from "utils/file-utils";
import { HOST } from "client/request";
import IcView from "assets/images/qms/icView.png";
const Header = (props) => {
  const { onClick, tenPhong, tenKhoa, currentKiosk, listNhanVien = [] } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refInfo = useRef(null);
  const onOpenPopup = () => {
    if (currentKiosk)
      refInfo.current && refInfo.current.show({ item: currentKiosk });
  };
  useEffect(() => {
    let bacSi = listNhanVien?.filter((x) =>
      currentKiosk?.dsBacSiId?.includes(x.id)
    );
    let dieuDuong = listNhanVien.find(
      (x) => x.id === currentKiosk?.dieuDuongId
    );
    let hoTro = listNhanVien.find((x) => x.id === currentKiosk?.hoTroId);
    setState({ bacSi, dieuDuong, hoTro });
  }, [currentKiosk, listNhanVien]);

  const openFullScreen = () => {
    var elem = document.documentElement;
    elem.requestFullscreen();
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
                  <span>{tenPhong}</span>
                </SlideText>
                <SlideText className="title-header__second">
                  <span>{tenKhoa}</span>
                </SlideText>
              </div>
            </div>
          </Row>
        </Col>
        <Col span={12}>
          <div className="content">
            <Carousel autoplay autoplaySpeed={10000}>
              {(state?.bacSi || []).map((item) => {
                return (
                  <div className="top-content__infor" key={item?.id}>
                    <div className="infor-right">
                      <div style={{ borderRight: "2px solid #659efc" }}>
                        <div className="infor-right__box">
                          <img
                            className="infor-right__img"
                            alt=""
                            src={`${
                              item.anhDaiDien
                                ? fileUtils.absoluteFileUrl(item.anhDaiDien)
                                : require("assets/images/his-core/avatar-an-danh.png")
                            }`}
                          />
                        </div>
                      </div>
                      <div className="infor-description">
                        <span className="infor-description__first">
                          {item.vietTatHocHamHocVi} {item.ten}
                        </span>
                        <br />
                        <span className="infor-description__second">
                          {item.tenChuyenKhoa}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Col>
      </Row>
      <Modal ref={refInfo}></Modal>
    </StyledHeader>
  );
};

export default memo(Header);
