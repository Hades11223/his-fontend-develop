import React, { useEffect, memo, useCallback, useState, useRef } from "react";
import { Col, Row } from "antd";
import { Main } from "./styled";
import ThongTinBenhNhan from "pages/thuNgan/quanLyTamUng/chiTietQuanLyTamUng/ThongTinBenhNhan";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import ModalChuyenKhoa from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/Modal/ModalChuyenKhoa";
import ThongTinSoTien from "./ThongTinSoTien";
import ThuTamUng from "./ThuTamUng";
import HoanTamUng from "./HoanTamUng";
import DeNghiTamUng from "./DeNghiTamUng";
import HuyTamUng from "./HuyTamUng";
import { useTranslation } from "react-i18next";
import cacheUtils from "utils/cache-utils";
import { checkRoleOr } from "utils/role-utils";
import { ROLES } from "constants/index";
import { Page, Card, Tabs } from "components";
import { useQueryString, useStore } from "hook";

const ChiTietNguoiBenhNoiTru = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams();
  const refChuyenKhoa = useRef(null);
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan");
  const [nhaTamUngId] = useQueryString("nhaTamUngId", null);

  const {
    lyDoTamUng: { _getListTongHop: getListAllLyDoTamUng },
    nbDotDieuTri: { tongTienDieuTri, getById },
    maBenh: { getListAllMaBenh },
    phuongThucTT: { getListAllPhuongThucThanhToan },
  } = useDispatch();

  // -------------------------------------------------------------------------
  const listTabs = [
    ...(checkRoleOr([ROLES["THU_NGAN"].XEM_DS_DE_NGHI_TAM_UNG])
      ? [
          {
            name: t("thuNgan.quanLyTamUng.deNghiTamUng"),
            iconTab: (
              <img
                src={require("assets/images/utils/heal-care.png")}
                alt=""
                className="icon-tab"
              />
            ),
            component: <DeNghiTamUng />,
            routeTab: "chiTietDeNghiTamUng",
          },
        ]
      : []),
    ...(checkRoleOr([ROLES["THU_NGAN"].XEM_DS_THU_TAM_UNG])
      ? [
          {
            name: t("thuNgan.quanLyTamUng.thuTamUng"),
            iconTab: (
              <img
                src={require("assets/images/utils/heal-care.png")}
                alt=""
                className="icon-tab"
              />
            ),
            component: <ThuTamUng />,
            routeTab: "chiTietThuTamUng",
          },
        ]
      : []),
    ...(checkRoleOr([ROLES["THU_NGAN"].XEM_DS_HOAN_TAM_UNG])
      ? [
          {
            name: t("thuNgan.quanLyTamUng.hoanTamUng"),
            iconTab: (
              <img
                src={require("assets/images/utils/heal-care.png")}
                alt=""
                className="icon-tab"
              />
            ),
            component: <HoanTamUng />,
            routeTab: "chiTietHoanTamUng",
          },
        ]
      : []),
    ...(checkRoleOr([ROLES["THU_NGAN"].XEM_DS_HUY_TAM_UNG])
      ? [
          {
            name: t("thuNgan.quanLyTamUng.huyTamUng"),
            iconTab: (
              <img
                src={require("assets/images/utils/heal-care.png")}
                alt=""
                className="icon-tab"
              />
            ),
            routeTab: "chiTietHuyTamUng",
            component: <HuyTamUng />,
          },
        ]
      : []),
  ];
  // ------------------------------------------------------
  const [state, _setState] = useState({ titleTab: listTabs[0]?.routeTab });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListAllMaBenh({});
    getListAllLyDoTamUng({ page: "", size: "" });
    getListAllPhuongThucThanhToan({ page: "", size: "", active: true });
  }, []);

  useEffect(() => {
    if (!nhaTamUngId) {
      async function fetchData() {
        let nhaTamUng = await cacheUtils.read(
          "DATA_NHA_TAM_UNG",
          "",
          null,
          false
        );
        if (nhaTamUng)
          history.push(`${window.location.pathname}?nhaTamUngId=${nhaTamUng}`);
      }
      fetchData();
    }
  }, [nhaTamUngId]);

  useEffect(() => {
    if (id) {
      tongTienDieuTri({ id });
      getById(id);
    }
  }, [id]);

  const onTabClick = useCallback((key) => {
    setState({ titleTab: key });
  }, []);
  const renderContent = useCallback(() => {
    return (
      <>
        <Card className="content">
          <Tabs.Left
            defaultActiveKey="chiTietDeNghiTamUng"
            tabPosition={"left"}
            type="card"
            moreIcon={<CaretDownOutlined />}
            onTabClick={onTabClick}
            className="tab-main"
          >
            {[...listTabs].map((obj, i) => {
              return (
                <Tabs.TabPane
                  key={obj?.routeTab}
                  tab={
                    <div>
                      {obj?.iconTab}
                      <span className="text-tab">{obj?.name}</span>
                    </div>
                  }
                >
                  {obj?.component}
                </Tabs.TabPane>
              );
            })}
          </Tabs.Left>
        </Card>
      </>
    );
  }, [id, thongTinBenhNhan]);
  return (
    <Page
      breadcrumb={[
        { link: "/thu-ngan", title: t("thuNgan.thuNgan") },
        {
          link: `/thu-ngan/quan-ly-tam-ung`,
          title: t("thuNgan.quanLyTamUng.quanLyTamUng"),
        },
        {
          link: `/thu-ngan/quan-ly-tam-ung/${id}`,
          title: t("thuNgan.quanLyTamUng.chiTietDeNghiTamUng"),
        },
      ]}
    >
      <Main>
        <Row>
          <h1>{t(`thuNgan.quanLyTamUng.${state.titleTab}`)}</h1>
          <span style={{ flex: 1, textAlign: "right" }}>
            <img src={require("assets/images/utils/location.png")} alt="" />
            {thongTinBenhNhan?.maKhoaNb && thongTinBenhNhan?.tenKhoaNb && (
              <b>
                {thongTinBenhNhan?.maKhoaNb} - {thongTinBenhNhan?.tenKhoaNb}
              </b>
            )}
          </span>
        </Row>
        <Row>
          <Col className="header-left" lg={{ span: 16 }} xl={{ span: 19 }}>
            <ThongTinBenhNhan />
          </Col>
          <Col
            className="header-right"
            lg={{ span: 8 }}
            xl={{ span: 5 }}
            style={{ paddingLeft: "20px" }}
          >
            <ThongTinSoTien />
          </Col>
        </Row>
        {renderContent()}
        <ModalChuyenKhoa refChuyenKhoa={refChuyenKhoa} />
      </Main>
    </Page>
  );
};

export default memo(ChiTietNguoiBenhNoiTru);
