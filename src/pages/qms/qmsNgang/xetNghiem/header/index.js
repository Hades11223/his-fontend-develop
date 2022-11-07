import React, { memo, useState, useEffect, useRef } from "react";
import { StyledHeader } from "./headerStyles";
import Logo from "assets/images/welcome/avatar.png";
import { Row, Col, Carousel } from "antd";
import IcTroLy from "assets/images/qms/icTroLy.png";
import Modal from "pages/qms/qmsNgang/thietLap/Modal";
import SlideText from "pages/qms/components/SlideText";
import fileUtils from "utils/file-utils";
import { HOST } from "client/request";
import moment from "moment";

const Header = (props) => {
  const formatHour = "HH:mm";
  const format = "HH:mm:ss";
  const {
    onClick,
    tenPhong,
    tenKhoa,
    currentKiosk,
    listNhanVien = [],
    iconChuyenKhoa,
  } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refInfo = useRef(null);
  const onOpenPopup = () => {
    if (currentKiosk) refInfo.current && refInfo.current.show({ item: currentKiosk });
  };

  useEffect(() => {
    let bacSi = listNhanVien?.filter((x) =>
      currentKiosk?.dsBacSiId?.includes(x.id)
    );
    let dieuDuong = listNhanVien.find((x) => x.id == currentKiosk.dieuDuongId);
    let hoTro = listNhanVien.find((x) => x.id == currentKiosk.hoTroId);
    setState({ bacSi, dieuDuong, hoTro });
  }, [currentKiosk, listNhanVien]);

  const openFullScreen = () => {
    var elem = document.documentElement;
    elem.requestFullscreen();
  };

  const formatTime = (time) => {
    return time && moment(time, format).format(formatHour);
  };

  const checkWorkTime = () => {
    if (
      !currentKiosk?.thoiGianSangTu &&
      !currentKiosk?.thoiGianSangDen &&
      !currentKiosk?.thoiGianChieuDen &&
      !currentKiosk?.thoiGianChieuTu
    )
      return;
    const timeNow = Number(moment().format("HHmm"));
    const thoiGianSangTu = Number(
      moment(currentKiosk?.thoiGianSangTu, "HH:mm:ss").format("HHmm")
    );
    const thoiGianSangDen = Number(
      moment(currentKiosk?.thoiGianSangDen, "HH:mm:ss").format("HHmm")
    );
    const thoiGianChieuDen = Number(
      moment(currentKiosk?.thoiGianChieuDen, "HH:mm:ss").format("HHmm")
    );
    const thoiGianChieuTu = Number(
      moment(currentKiosk?.thoiGianChieuTu, "HH:mm:ss").format("HHmm")
    );
    return timeNow < thoiGianSangTu ||
      (timeNow > thoiGianSangDen && timeNow < thoiGianChieuTu) ||
      timeNow > thoiGianChieuDen ? (
      <span className="grey">Không làm việc</span>
    ) : (
      <span>Đang làm việc</span>
    );
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
              <div
                className="sub-logo"
                onClick={onClick}
                // onClick={openFullScreen}
              >
                <img
                  className="sub-logo__icon"
                  alt=""
                  src={`${fileUtils.absoluteFileUrl(iconChuyenKhoa)}`}
                />
              </div>
            </div>
          </Row>
          <Row>
            <div className="work-time">
              <div className="work-time__left">
                <div className="work-time__title">Thời gian làm việc</div>
                <div className="work-time__display">
                  {formatTime(currentKiosk?.thoiGianSangTu)} -{" "}
                  {formatTime(currentKiosk?.thoiGianSangDen)} |{" "}
                  {formatTime(currentKiosk?.thoiGianChieuTu)} -{" "}
                  {formatTime(currentKiosk?.thoiGianChieuDen)}
                </div>
                <div className="work-time__right">{checkWorkTime()}</div>
              </div>
            </div>
          </Row>
        </Col>
        <Col span={12}>
          <div className="content">
            <Carousel autoplay autoplaySpeed={10000}>
              {(state?.bacSi || []).map((item) => {
                return (
                  <div className="top-content__infor" key={item}>
                    <div className="infor-right">
                      <div className="infor-right__box">
                        <img
                          className="infor-right__img"
                          alt=""
                          src={`${fileUtils.absoluteFileUrl(item.anhDaiDien)}`}
                        />
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
            <div className="top-content__sub-infor">
              <div className="sub-box">
                <div className="sub-image">
                  <img alt="" className="sub-image__img" src={IcTroLy} />
                </div>
                <div className="sub-infor">
                  <SlideText className="sub-infor__name">
                    <span>{state.dieuDuong?.ten}</span>
                  </SlideText>
                  <div className="sub-infor__job">Trợ lý - Y tá</div>
                </div>
              </div>
              <div className="sub-box">
                <div className="sub-image">
                  <img className="sub-image__img" alt="" src={IcTroLy} />
                </div>
                <div className="sub-infor">
                  <SlideText className="sub-infor__name">
                    <span>{state.hoTro?.ten}</span>
                  </SlideText>
                  <div className="sub-infor__job">Hỗ trợ - Hướng dẫn</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Modal ref={refInfo}></Modal>
    </StyledHeader>
  );
};

export default memo(Header);
