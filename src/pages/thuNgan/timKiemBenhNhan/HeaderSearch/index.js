import React, { useState, useRef, useEffect } from "react";
import { Main, TitleSearch } from "./styled";
import { Input, Col, Row, message, Tooltip, Dropdown, Menu } from "antd";
import Button from "pages/kho/components/Button";
import { useHistory } from "react-router-dom";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import IconQrCode from "assets/images/thuNgan/qrCode.png";
import IconList from "assets/images/thuNgan/icList.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Select } from "components";
import IcLocation from "assets/images/thuNgan/icLocation.png";
import IcDanhSach from "assets/svg/thuNgan/icDanhSach.svg";
import { useParams } from "react-router-dom";
import IcTamUng from "assets/svg/thuNgan/icTamUng.svg";
import IcBaoCao from "assets/svg/tiep-don/iconDanhSachDaTiepDon.svg";
import { ListBaoCao } from "pages/home/layout/configData";
import { checkRole } from "utils/role-utils";

const TimKiemBenhNhan = (props) => {
  const { t } = useTranslation();
  const { onRegisterHotkey } = useDispatch().phimTat;
  const { titleBack, backLink, icon, layerId, nhaTamUng, onChangeSelect } =
    props;
  const refInput = useRef(null);
  const history = useHistory();
  const [valueSearch, setValueSearch] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const onClickDsPhieuThu = () => {
    history.push(backLink || "/thu-ngan/danh-sach-phieu-thu");
  };
  const { searchNBDotDieuTriTongHop } = useDispatch().nbDotDieuTri;
  const { onSearch } = useDispatch().danhSachPhieuThu;
  const { listNhaTheoTaiKhoan } = useSelector((state) => state.toaNha);
  const { nbDotDieuTriId } = useParams();

  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.focus();
    }
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refInput.current.focus();
          },
        },
        {
          keyCode: titleBack ? 27 : 113, //F2
          onEvent: () => {
            if (titleBack) {
            }
            onClickDsPhieuThu();
          },
        },
        {
          keyCode: 112, //F1
          onEvent: () => {},
        },
      ],
    });
  }, []);

  const onKeyDown = (e) => {
    let param = {};
    if (e.key === "Enter") {
      let check = valueSearch?.trim();
      if (check) {
        if (/^[0-9]+$/.test(check)) {
          param = { maHoSo: Number(check) };
        } else {
          const value = e.target.value || "";
          if (
            value.indexOf("NB|") == "0" &&
            value.indexOf("$") == value.length - 1
          ) {
            let array = value.split("|");
            param = { maHoSo: array[3] };
          } else {
            let arr = e.target.value.split(",");
            let checkMaHS = arr.filter((el) => {
              let convertEl = el.includes("”") ? el.split("”") : el.split('"');
              return convertEl.some((et) => et === "maHoSo");
            });
            checkMaHS = (checkMaHS.length && checkMaHS[0]) || "";
            let paramRes = checkMaHS
              ? checkMaHS.includes("”")
                ? checkMaHS.split("”")
                : checkMaHS.split('"')
              : [];
            paramRes = paramRes.filter((et) => /^[0-9]+$/.test(et));
            if (paramRes.length) {
              param = { maHoSo: Number(paramRes[0]) };
            }
          }
        }
        submit(param);
      } else {
        return;
      }
    }
  };
  const submit = (param) => {
    if (param.maHoSo) {
      searchNBDotDieuTriTongHop(param).then((s) => {
        if (s.code === 0) {
          const { data } = s;
          if (data.length && data[0].id) {
            onSearch({
              nbDotDieuTriId: data?.length && data[0].id,
              dataSearch: {
                nhaThuoc: false,
                tuThoiGianVaoVien: null,
                denThoiGianVaoVien: null,
              },
            }).then((s) => {
              if (s.code === 0) {
                if (s.data?.length) {
                  history.push(
                    `/thu-ngan/chi-tiet-phieu-thu/${data[0].maHoSo}/${s.data[0].id}/${data[0].id}`
                  );
                } else {
                  message.error(
                    `${t("thuNgan.khongTimThayThongTinPhieuThu")} ${
                      data.length && data[0].khoa?.ten
                        ? `${t("thuNgan.oKhoa")} ` + data[0].khoa?.ten
                        : ""
                    }`
                  );
                }
              }
            });
          } else {
            message.error(
              `${t("thuNgan.khongTimThayThongTinPhieuThu")} ${
                data.length && data[0].khoa?.ten
                  ? `${t("thuNgan.oKhoa")} ` + data[0].khoa?.ten
                  : ""
              }`
            );
          }
        }
      });
    } else {
      message.error(t("thuNgan.khongTimThayThongTinPhieuThu"));
    }
    setValueSearch("");
  };
  const onChangeCode = (e) => {
    setValueSearch(e.target.value);
  };

  const onFocus = () => {
    if (refInput.current) {
      setFocusInput(true);
    }
  };
  const onBlur = () => {
    if (refInput.current) {
      setFocusInput(false);
    }
  };

  const onViewTamUng = () => {
    if (nbDotDieuTriId) {
      history.push(
        `/thu-ngan/quan-ly-tam-ung/${nbDotDieuTriId}?nhaTamUngId=${nhaTamUng}`
      );
    } else {
      window.open("/thu-ngan/quan-ly-tam-ung");
    }
  };

  const menu = () => {
    let dsMaQuyenBaoCao = [
      ROLES.BAO_CAO.TONG_HOP_THU_TIEN_NB,
      ROLES.BAO_CAO.TC02,
      ROLES.BAO_CAO.TC03,
      ROLES.BAO_CAO.TC06,
      ROLES.BAO_CAO.TC09,
      ROLES.BAO_CAO.TC11,
      ROLES.BAO_CAO.TC12,
      ROLES.BAO_CAO.TC13,
    ];
    let data = ListBaoCao.filter((options) => {
      if (
        options.accessRoles[0] &&
        dsMaQuyenBaoCao.includes(options.accessRoles[0]) &&
        checkRole(options.accessRoles)
      )
        return true;
      return false;
    });
    return (
      <Menu
        items={data.map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={() => window.open(`${item.link}`)}>
              {item.title}
            </a>
          ),
        }))}
      ></Menu>
    );
  };

  return (
    <Main focusInput={focusInput}>
      <TitleSearch>{t("thuNgan.timNguoiBenh")}</TitleSearch>
      <Row align="middle">
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].TIM_NB]}>
          <Col md={6} sm={12} xs={24}>
            <div className="input-search">
              <Input
                placeholder={t("thuNgan.quetQRHoacNhapMaHoSo")}
                onChange={onChangeCode}
                onKeyDown={onKeyDown}
                ref={refInput}
                onFocus={onFocus}
                onBlur={onBlur}
                value={valueSearch}
              />
              <img src={IconQrCode} alt="IconQrCode" />
            </div>
          </Col>
        </AuthWrapper>
        <Col md={12} sm={12} xs={24} className="button-gopage">
          {icon && (
            <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]}>
              <Button
                onClick={onClickDsPhieuThu}
                type={"default"}
                rightIcon={<img src={icon} alt="" />}
                iconHeight={15}
              >
                {titleBack}
              </Button>
            </AuthWrapper>
          )}
        </Col>
        <Col md={6} sm={8} xs={24} className="next-partient">
          <div className="boLoc">
            <img src={IcLocation} alt={IcLocation} />
            <Select
              data={listNhaTheoTaiKhoan}
              onChange={onChangeSelect}
              value={nhaTamUng}
            />
          </div>
          {nbDotDieuTriId && (
            <div
              className="item"
              onClick={() => history.push("/thu-ngan/danh-sach-phieu-thu")}
            >
              <Tooltip title={t("thuNgan.danhSachPhieuThu")} placement="bottom">
                <IcDanhSach />
              </Tooltip>
            </div>
          )}
          <div className="item" onClick={onViewTamUng}>
            <Tooltip
              title={
                nbDotDieuTriId
                  ? t("thuNgan.xemChiTietTamUng")
                  : t("thuNgan.danhSachNbTamUng")
              }
              placement="bottom"
            >
              <IcTamUng />
            </Tooltip>
          </div>
          <div className="item">
            <Tooltip
              title={t("thuNgan.xemBaoCaoThuNgan")}
              placement="bottomLeft"
            >
              <Dropdown overlay={menu} trigger="click" placement="left">
                <IcBaoCao />
              </Dropdown>
            </Tooltip>
          </div>
        </Col>
      </Row>
    </Main>
  );
};

export default TimKiemBenhNhan;
