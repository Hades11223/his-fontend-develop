import React, { useRef, useState } from "react";
import { Card, HomePageStyled, GlobalStyle } from "./styled";
import { useHistory } from "react-router-dom";
import Icons from "assets/images/dashboard";
import { Badge, Popover } from "antd";
import IcLogout from "assets/svg/ic-logout.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import IcChangePassword from "assets/svg/ic-change-password.svg";
import { HOST } from "client/request";
import ModalChangePass from "components/ModalChangePass";

const dataMenu = [
  {
    key: "so_lieu_benh_vien",
    title: "Số liệu bệnh viện",
    rightImage: <Icons.IconDashboard_1 className="dashboard__icon" />,
    bg: " rgba(26, 182, 157, 0.1)",
    url: `so-lieu-benh-vien`,
  },
  {
    key: "so_lieu_cap_cuu",
    title: "Số liệu cấp cứu",
    rightImage: <Icons.IconDashboard_2 className="dashboard__icon" />,
    bg: " rgba(238, 74, 98, 0.1)",
    url: "",
  },
  {
    key: "so_lieu_phau_thuat",
    title: "Số liệu phẫu thuật",
    rightImage: <Icons.IconDashboard_3 className="dashboard__icon" />,
    bg: " rgba(88, 102, 235, 0.1)",
    url: "",
  },
  {
    key: "dieu_tri_noi_tru",
    title: "Điều trị nội trú",
    rightImage: <Icons.IconDashboard_4 className="dashboard__icon" />,
    bg: " rgba(248, 184, 31, 0.1)",
    url: "",
  },
  {
    key: "dieu_tri_noi_tru_toan_vien",
    title: "Điều trị nội trú toàn viện",
    rightImage: <Icons.IconDashboard_5 className="dashboard__icon" />,
    bg: " rgba(142, 86, 255, 0.1)",
    url: "",
  },
  {
    key: "so_lieu_ngoai_tru",
    title: "Số liệu ngoại trú",
    rightImage: <Icons.IconDashboard_6 className="dashboard__icon" />,
    bg: "  rgba(218, 4, 248, 0.1)",
    url: "",
  },
  {
    key: "so_lieu_doanh_thu",
    title: "Số liệu doanh thu",
    rightImage: <Icons.IconDashboard_7 className="dashboard__icon" />,
    bg: "rgba(57, 192, 250, 0.1)  ",
    url: "",
  },
  {
    key: "canh_bao_thuoc_vat_tu",
    title: "Cảnh báo Thuốc - Vật tư",
    rightImage: <Icons.IconDashboard_8 className="dashboard__icon" />,
    bg: " rgba(132, 204, 22, 0.1)",
    url: "",
  },
];

const TrinhChieuTv = () => {
  const [error, setError] = useState(false);
  const {
    auth: { onLogout },
  } = useDispatch();
  const { t } = useTranslation();
  const refModalChangePass = useRef(null);
  const history = useHistory();
  const { auth } = useSelector((state) => state.auth);
  const { anhDaiDien } = auth || {};

  const onShowModalChangePass = () => {
    refModalChangePass.current && refModalChangePass.current.show();
  };

  const handleChangeRoute = (data) => () => {
    data.url &&
      history.push({
        pathname: window.location.pathname + "/" + data.url,
        state: { prevPath: window.location.pathname },
      });
  };

  const makeCard = (data = {}) => {
    return (
      <div onClick={handleChangeRoute(data)} className="card">
        <Card bg={data.bg}>{data.rightImage}</Card>
        <h1 className="card__title">{data.title}</h1>
      </div>
    );
  };
  const content = (
    <div>
      <div
        className="item-action"
        style={{ cursor: "pointer" }}
        onClick={() => onShowModalChangePass()}
      >
        <IcChangePassword size={25} />
        <span>{t("common.doiMatKhau")}</span>
      </div>
      <div
        className="item-action help"
        style={{ cursor: "pointer" }}
        onClick={() => onLogout({})}
      >
        <IcLogout size={25} />
        <span>{t("common.dangXuat")}</span>
      </div>
    </div>
  );

  const gotoPage = (value) => {
    history.push(value);
  };
  return (
    <>
      <GlobalStyle />
      <HomePageStyled
        style={{
          background: `url(${require("assets/images/dashboard/bgDashboard.png")})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <>
          <div className="header">
            <div className="header__left">
              {auth?.benhVien?.ten ? (
                <img
                  onClick={() => gotoPage("/")}
                  className="isofh"
                  src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
                  alt=""
                />
              ) : (
                <span
                  onClick={() => gotoPage("/")}
                  className="isofh-white"
                ></span>
              )}
            </div>
            <div className="header__middle">
              <span>TRUNG TÂM ĐIỀU HÀNH BỆNH VIỆN </span>
              <span>HOSPITAL COMMAND CENTER</span>
            </div>
            <div className="header__right">
              <Icons.IcSetting className="header__right__icon" />
              <Icons.IcNotification className="header__right__icon" />
              <Popover
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px !important",
                }}
                placement="bottomRight"
                overlayClassName={"popover-header"}
                content={content}
                trigger="click"
              >
                <div className="header-icon badge-status">
                  {anhDaiDien && !error ? (
                    <img
                      className="avatar-img"
                      src={
                        anhDaiDien
                          ? `${HOST}/api/his/v1/files/${anhDaiDien}`
                          : require("assets/images/his-core/avatar-an-danh.png")
                      }
                      alt="..."
                      onError={() => setError(true)}
                    />
                  ) : (
                    <Icons.IcPerson className="header__right__icon" />
                  )}
                  <Badge></Badge>
                </div>
              </Popover>
            </div>
          </div>
          <div className="content__container">
            <div className="content__header">
              <h1>TRÌNH CHIẾU TIVI</h1>
              <span>
                Các biểu đồ, dữ liệu tình hình hoạt động của bệnh viện được sắp
                xếp, bố trí để hiển thị một cách tối ưu trên tivi tường
              </span>
            </div>
            <div className="content">
              {dataMenu.map((card) => {
                return card.isMain || !card.menu ? (
                  <React.Fragment key={card.key}>
                    {makeCard(card)}
                  </React.Fragment>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
          <div className="footer">
            <img
              src={require("assets/images/login/img-product.png")}
              style={{ width: "150px" }}
            />
          </div>
        </>
      </HomePageStyled>
      <ModalChangePass ref={refModalChangePass} />
    </>
  );
};

export default TrinhChieuTv;
