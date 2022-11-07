import React, { useRef, useState } from "react";
import { Row, Popover, Tooltip, message } from "antd";
import { Main, GlobalStyle } from "./styled";
import { HOST } from "client/request";
import { useDispatch, useSelector } from "react-redux";
import {
  ListContentLeftHome,
  ListContentLeftFunc,
  ListDanhMucXN,
  ListQuanTriHeThong,
  ListThietLap,
  ListKho,
  ListChanDoanHinhAnh,
  ListHoSoBenhAn,
  ListKySo,
  ListPhieuTheoDoiDieuTri,
  ListBaoCao,
  ListTiepDon,
  ListGoiDichVu,
  ListKhamSucKhoe,
  ListDanhMucTN,
  ListQuanLyNoiTru,
} from "pages/home/layout/configData";
import { Select } from "antd";
import ModalReduxViewer from "components/ModalReduxViewer";
import IcLogout from "assets/svg/ic-logout.svg";
import IcChangePassword from "assets/svg/ic-change-password.svg";
import IconLanguage from "assets/svg/ic-lang.svg";
import IconHelp from "assets/svg/ic-help.svg";
import IconVideo from "assets/svg/ic-video.svg";
import IconDocument from "assets/svg/ic-document.svg";
import IconQuestion from "assets/svg/ic-question.svg";
import IconSycn from "assets/svg/ic-sync.svg";
import IconNotification from "assets/svg/ic-notification.svg";
import IconAvatar from "assets/svg/ic-avatar.svg";
import ModalHome from "./ModalHome";
import ModalChangePass from "components/ModalChangePass";
import { checkRole } from "utils/role-utils";
import ModalInfoSystem from "components/ModalInfoSystem";
import { useTranslation } from "react-i18next";
import Badge from "./Badge";
const { Option } = Select;
const Header = (props) => {
  const [isSync, setSync] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const refModalReduxViewer = useRef(null);
  const refModalChangePass = useRef(null);
  const refModalInfoSystem = useRef(null);
  const refModalHome = useRef();
  const {
    application: { onChangeLanguage },
    auth: { onLogout, onRefreshToken },
  } = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { anhDaiDien } = auth || {};
  const { history } = props;

  const onShowModalChangePass = () => {
    refModalChangePass.current && refModalChangePass.current.show();
  };

  const onSync = () => {
    if (isSync) return;
    setSync(true);
    localStorage.setItem("TIME_RELOAD", new Date().getTime());
    onRefreshToken()
      .then((s) => {
        message.success(t("layout.dongBoDanhMucThanhCong"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        message.success(t("layout.dongBoDanhMucThanhCong"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
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
  const contentLang = (
    <div>
      <div
        className="item-action"
        style={{ cursor: "pointer" }}
        onClick={() => onChangeLanguage({ language: "vi" })}
      >
        <span>{t("tiengViet")}</span>
      </div>
      <div
        className="item-action"
        style={{ cursor: "pointer" }}
        onClick={() => onChangeLanguage({ language: "en" })}
      >
        <span>{t("tiengAnh")}</span>
      </div>
    </div>
  );

  const helpContent = (
    <div>
      <div
        className="item-action help"
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/tro-giup/tro-giup-hdsd");
        }}
      >
        <IconDocument size={25} />
        <span>{t("layout.taiLieuHuongDan")}</span>
      </div>
      <div
        className="item-action help"
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/tro-giup/video");
        }}
      >
        <IconVideo size={25} />
        <span>{t("layout.videoHuongDan")}</span>
      </div>
      <div
        className="item-action help"
        style={{ cursor: "pointer" }}
        onClick={() => {}}
      >
        <IconQuestion size={25} />
        <span>{t("layout.cauHoiThuongGap")}</span>
      </div>
      <div
        className="item-action help"
        style={{ cursor: "pointer" }}
        onClick={onSync}
      >
        <IconSycn size={25} />
        <span>{t("layout.dongBoDanhMuc")}</span>
      </div>
    </div>
  );
  const data = [
    ...ListContentLeftHome,
    ...ListContentLeftFunc,
    ...ListChanDoanHinhAnh,
    ...ListDanhMucXN,
    ...ListHoSoBenhAn,
    ...ListKho,
    ...ListKySo,
    ...ListQuanTriHeThong,
    ...ListThietLap,
    ...ListPhieuTheoDoiDieuTri,
    ...ListBaoCao,
    ...ListTiepDon,
    ...ListGoiDichVu,
    ...ListKhamSucKhoe,
    ...ListDanhMucTN,
    ...ListQuanLyNoiTru,
  ];
  // const goPage = () => {
  //   return setTimeout(() => {
  //     history.go();
  //   }, 300);
  // };

  const gotoPage = (value) => {
    history.push(value);
    // goPage();
  };
  const onShowModalHome = () => {
    refModalHome.current.show(
      {
        show: true,
      },
      (data = {}) => {}
    );
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };
  const childrenSearch = data
    .filter((options) => {
      if (!checkRole(options.accessRoles)) return false;
      return true;
    })
    .map((item, index) => {
      return (
        <Option key={index} value={item.link + ""}>{`${item?.title}`}</Option>
      );
    });
  const onDoubleClick = () => {
    refModalReduxViewer.current && refModalReduxViewer.current.show();
  };

  const onDoubleClickInfoSystem = () => {
    refModalInfoSystem.current && refModalInfoSystem.current.show();
  };
  return (
    <Main>
      <GlobalStyle />
      <div className="container">
        <Row className="header">
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
            <div
              className="name-hospital"
              onDoubleClick={onDoubleClickInfoSystem}
              style={{ cursor: "pointer" }}
            >
              {auth?.benhVien?.ten}
            </div>
            <Tooltip title="Menu">
              <img
                className="menu"
                onClick={() => onShowModalHome()}
                src={require("assets/images/his-core/menuheader.png")}
                alt=""
              />
            </Tooltip>
            <div className="search">
              <img
                src={require("assets/images/his-core/iconSearch.png")}
                alt="..."
              ></img>
              <Select
                id="nh-select-tim-kiem-ten-man-hinh"
                onSelect={gotoPage}
                showSearch
                className="select"
                placeholder={t("common.timKiemManHinh")}
                // id={"link"}
                ten={"title"}
                filterOption={filterOption}
                style={{ overflow: "hidden" }}
              >
                {childrenSearch}
              </Select>
            </div>
          </div>
          <div className="header__right">
            <Tooltip title={t("common.thongBao")}>
              <div className="header-icon">
                <IconNotification width={24} height={24} />
              </div>
            </Tooltip>
            <Tooltip title={t("common.troGiup")}>
              <Popover
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px !important",
                }}
                placement="bottom"
                overlayClassName={"popover-header"}
                content={helpContent}
                trigger="click"
              >
                <div className="header-icon">
                  <IconHelp width={24} height={24} />
                </div>
              </Popover>
            </Tooltip>
            <Tooltip title={t("language")}>
              <Popover
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px !important",
                }}
                placement="bottomRight"
                overlayClassName={"popover-header"}
                content={contentLang}
                trigger="click"
              >
                <div className="header-icon">
                  <IconLanguage width={24} height={24} />
                </div>
              </Popover>
            </Tooltip>
            <Tooltip title={t("common.taiKhoan")}>
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
                    <IconAvatar width={32} height={32} />
                  )}
                  <Badge></Badge>
                </div>
              </Popover>
            </Tooltip>
            <div className="username">{auth?.full_name}</div>
            <div className="logo-isofh" onDoubleClick={onDoubleClick}>
              <img
                src={require("assets/images/his-core/logoIsofh.png")}
                alt=""
              />
            </div>
          </div>
        </Row>
      </div>
      <ModalHome ref={refModalHome} />
      <ModalReduxViewer ref={refModalReduxViewer} />
      <ModalInfoSystem ref={refModalInfoSystem} />
      <ModalChangePass ref={refModalChangePass} />
    </Main>
  );
};

export default Header;
