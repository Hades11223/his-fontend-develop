import React, { useEffect, useRef, useState } from "react";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import { Main, MainPage, GlobalStyle } from "./styled";
import DanhSachPhieuThuNB from "./danhSachPhieuThuNB";
import ThongTinSoTien from "./thongTinSoTien";
import { Row, Col, message } from "antd";
import { Button, Card, Tabs } from "components";
import MainHeaderSearch from "../timKiemBenhNhan/HeaderSearch";
import ThongTinBenhNhan from "./thongTinBenhNhan";
import ThongTinPhieuThu from "./thongTinPhieuThu";
import DanhSachDichVu from "./danhSachDichVu";
import ModalTaoMienGiam from "./ModalTaoMienGiam";
import ChuyenPhieu from "./chuyenPhieu";
import IconMienGiam from "assets/images/thuNgan/icMienGiam.png";
import IconChuyenPhieu from "assets/images/thuNgan/icChuyenPhieu.png";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import cacheUtils from "utils/cache-utils";
import DanhSachPhieuThuTamUng from "pages/thuNgan/quanLyTamUng/chiTietQuanLyTamUng/ThuTamUng";
import DanhSachPhieuHoanTamUng from "pages/thuNgan/quanLyTamUng/chiTietQuanLyTamUng/HoanTamUng";
import IcSetting from "assets/svg/ic-setting.svg";
const ChiTietPhieuThu = (props) => {
  const { t } = useTranslation();

  const [hienThiThanhToan, setHienThiThanhToan] = useState(true);
  const refLayerHotKey = useRef(stringUtils.guid());
  const refDanhSachDichVu = useRef(null);
  const refSinhPhieuChi = useRef({});

  const {
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    danhSachPhieuThu: { onSearch: getDSPhieuThu },
    danhSachDichVu: {
      searchAll: getAllListServices,
      onSizeChange: getListServices,
    },
    thuNgan: { getThongTinPhieuThu },
    nbDotDieuTri: { tongTienDieuTri },
    thietLap: { getThietLap },
  } = useDispatch();

  const refModalTaoMienGiam = useRef(null);
  const refChuyenPhat = useRef(null);
  const { phieuThuId, nbDotDieuTriId } = useParams();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getAllListServices({ nbDotDieuTriId, phieuThuId });
  }, [nbDotDieuTriId, phieuThuId]);

  useEffect(() => {
    async function fetchData() {
      let nhaTamUng = await cacheUtils.read(
        "DATA_NHA_TAM_UNG",
        "",
        null,
        false
      );
      if (!!nhaTamUng) {
        setState({ nhaTamUng });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!phieuThuId) return;
    Promise.all([
      getThongTinPhieuThu(phieuThuId),
      tongTienDieuTri({ id: nbDotDieuTriId }),
    ]).then(([res1, res2] = []) => {
      /**
       * res1: {code:0,data: {...content}}
       * res2: (data trong res)
       */
      if (res1?.code === 0 && res2) {
        /**
         * hiển thị button thanh toán
         * nhoHonMucCungChiTra: true, phieuThuNhoHonMucCungChiTra: true => Hiển thị
         * nhoHonMucCungChiTra: true, phieuThuNhoHonMucCungChiTra: false => Hiển thị
         * nhoHonMucCungChiTra: false, phieuThuNhoHonMucCungChiTra: false => Hiển thị
         * nhoHonMucCungChiTra: false, phieuThuNhoHonMucCungChiTra: true, loaiPhieuThu: 1 => hiển thị
         * nhoHonMucCungChiTra: false, phieuThuNhoHonMucCungChiTra: true, loaiPhieuThu khác 1 => ẩn
         * đã xác nhận với Lê Thị Hải
         */
        setHienThiThanhToan(
          res1.data?.nhoHonMucCungChiTra ||
            !res2?.phieuThuNhoHonMucCungChiTra ||
            res1.data?.loaiPhieuThu == 1
        );

        if (res1.data?.nhoHonMucCungChiTra) {
          message.error(
            t("thuNgan.tongChiPhiBaoHiemNhoHon15PhanTramThangLuong")
          );
        } else if (
          res2?.phieuThuNhoHonMucCungChiTra &&
          refConfirm.current &&
          res1.data?.loaiPhieuThu != 1
        ) {
          refConfirm.current.show(
            {
              showBtnOk: true,
              title: t("common.canhBao"),
              content: t(
                "thuNgan.xacNhanTongChiPhiBaoHiemNhoHon15PhanTramThangLuong"
              ),
              cancelText: t("common.quayLai"),
              okText: t("thuNgan.sinhPhieuChi"),
              typeModal: "warning",
            },
            () => {
              if (refSinhPhieuChi.current) {
                refSinhPhieuChi.current();
              }
            },
            () => {}
          );
          // message.error(
          //   `Người bệnh phát sinh chi phí BHYT lớn hơn 15% tháng lương cơ sở. Vui lòng sinh phiếu chi cho phiếu thu đã thanh toán và thực hiện thanh toán lại. 15% tháng lương cơ sở: 223.500 đồng.`
          // );
        }
      }
    });
  }, [phieuThuId]);

  const onClickTaoMienGiam = () => {
    if (refModalTaoMienGiam.current) {
      refModalTaoMienGiam.current.show({ phieuThuId });
    }
  };

  const onClickChiaPhieuThu = () => {
    if (refChuyenPhat.current) {
      refChuyenPhat.current.show({ phieuThuId }, handleAfterSubmit);
    }
  };
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    getThietLap({ ma: "PHAT_HANH_HOA_DON_KHI_THANH_TOAN" });
    getThietLap({ ma: "IN_PHIEU_THU_KHI_THANH_TOAN" });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        // {
        //   keyCode: 121, //F10
        //   onEvent: () => {
        //     onClickChiaPhieuThu();
        //   },
        // },
        // {
        //   keyCode: 122, //F11
        //   onEvent: () => {
        //     onClickTaoMienGiam();
        //   },
        // },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const handleAfterSubmit = () => {
    getListServices({ size: 10, nbDotDieuTriId, phieuThuId });
    getThongTinPhieuThu(phieuThuId);
    getAllListServices({ nbDotDieuTriId, phieuThuId });
    getDSPhieuThu({
      dataSearch: { nbDotDieuTriId },
      nbDotDieuTriId,
    });
    tongTienDieuTri({ id: nbDotDieuTriId });
  };

  const onSettings = () => {
    refDanhSachDichVu.current && refDanhSachDichVu.current.showTableSettings();
  };

  const onChangeSelect = (e) => {
    cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
    setState({ nhaTamUng: e });
  };

  const listPanel = [
    {
      title: t("thuNgan.dsDichVu").toUpperCase(),
      component: (
        <DanhSachDichVu
          ref={refDanhSachDichVu}
          layerId={refLayerHotKey.current}
        />
      ),
    },
    {
      title: t("thuNgan.dsPhieuThuTamUng").toUpperCase(),
      component: <DanhSachPhieuThuTamUng hiddenHeader={true} />,
    },
    {
      title: t("thuNgan.dsPhieuHoanTamUng").toUpperCase(),
      component: <DanhSachPhieuHoanTamUng hiddenHeader={true} />,
    },
  ];

  return (
    <MainPage
      breadcrumb={[
        { title: t("thuNgan.thuNgan"), link: "/thu-ngan" },
        {
          title: t("thuNgan.chiTietPhieuThu"),
          link: "#",
        },
      ]}
    >
      <Main>
        <GlobalStyle />
        <MainHeaderSearch
          history={props.history}
          layerId={refLayerHotKey.current}
          nhaTamUng={state?.nhaTamUng}
          onChangeSelect={onChangeSelect}
        />
        <Row gutter={[8, 8]} className="info-partient">
          <Col className="gutter-row" xl={15} md={15} xs={24}>
            <ThongTinBenhNhan />
          </Col>
          <Col className="gutter-row" xl={9} md={9}>
            <Row gutter={[8, 8]} className="info-partient__right">
              <Col xl={12} md={24} xs={24}>
                <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DS_KHOAN_TIEN]}>
                  <ThongTinSoTien nbDotDieuTriId={nbDotDieuTriId} />
                </AuthWrapper>
              </Col>
              <Col xl={12} md={24} xs={24}>
                <AuthWrapper
                  accessRoles={[ROLES["THU_NGAN"].DS_TONG_HOP_PHIEU_THU]}
                >
                  <DanhSachPhieuThuNB history={props.history} />
                </AuthWrapper>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="bottom-content">
          <Col
            xxl={19}
            lg={16}
            xl={17}
            md={19}
            xs={12}
            className="bottom-content__right"
          >
            <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DS_DICH_VU]}>
              <div className="bottom-content__wrapper-table">
                <Card className="tab-content" noPadding={true} bottom={0}>
                  <Tabs
                    defaultActiveKey="1"
                    activeKey={state.activeKeyTab}
                    tabBarExtraContent={
                      <div className="bottom-content__btn-right">
                        <AuthWrapper
                          accessRoles={[ROLES["THU_NGAN"].CHIA_PHIEU_THU]}
                        >
                          <Button
                            onClick={onClickChiaPhieuThu}
                            rightIcon={
                              <img
                                src={IconChuyenPhieu}
                                alt="IconChuyenPhieu"
                              />
                            }
                            minWidth={100}
                            type="primary"
                            borderColor={"#ffffff20"}
                            iconHeight={15}
                          >
                            {t("thuNgan.chiaPhieuThu")}
                          </Button>
                        </AuthWrapper>

                        <AuthWrapper
                          accessRoles={[ROLES["THU_NGAN"].MIEN_GIAM]}
                        >
                          <Button
                            onClick={onClickTaoMienGiam}
                            rightIcon={
                              <img src={IconMienGiam} alt="icontaomiengiam" />
                            }
                            minWidth={100}
                            type="primary"
                            borderColor={"#ffffff20"}
                            iconHeight={15}
                          >
                            {t("thuNgan.taoMienGiam")}
                          </Button>
                        </AuthWrapper>
                      </div>
                    }
                  >
                    {listPanel.map((item, index) => {
                      return (
                        <Tabs.TabPane
                          tab={
                            <div className="header-panel">
                              {item.title}
                              {index === 0 && (
                                <IcSetting
                                  className="icon"
                                  onClick={onSettings}
                                />
                              )}
                            </div>
                          }
                          key={index + 1 + ""}
                        >
                          {item.component}
                        </Tabs.TabPane>
                      );
                    })}
                  </Tabs>
                </Card>
              </div>
            </AuthWrapper>
          </Col>
          <Col xxl={5} lg={8} xl={7} md={5} xs={12}>
            <AuthWrapper accessRoles={[ROLES["THU_NGAN"].THONG_TIN_PHIEU_THU]}>
              <ThongTinPhieuThu
                phieuThuId={phieuThuId}
                nbDotDieuTriId={nbDotDieuTriId}
                layerId={refLayerHotKey.current}
                refSinhPhieuChi={refSinhPhieuChi}
                hienThiThanhToan={hienThiThanhToan}
                handleAfterSubmit={handleAfterSubmit}
                nhaTamUngId={state?.nhaTamUng}
              />
            </AuthWrapper>
          </Col>
        </Row>
        <ModalTaoMienGiam ref={refModalTaoMienGiam} />
        <ChuyenPhieu ref={refChuyenPhat} />
      </Main>
    </MainPage>
  );
};

export default ChiTietPhieuThu;
