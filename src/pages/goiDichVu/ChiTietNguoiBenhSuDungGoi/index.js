import React, { useEffect, memo, useState, useRef, useMemo } from "react";
import { Col, Dropdown, Menu, Row } from "antd";
import { Main, MainPage } from "./styled";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import ThongTinGoiApDung from "./ThongTinGoiApDung";
import DvDaSuDung from "./DvDaSuDung";
import ThanhToanGoi from "./ThanhToanGoi";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Tabs, Card, Button } from "components";
import IcThongTin from "assets/svg/goiDv/ic-thong-tin.svg";
import IcDvDaSuDung from "assets/svg/goiDv/ic-dv-da-su-dung.svg";
import PrintIcon from "assets/svg/hoSoBenhAn/print.svg";
import ModalHuySuDungGoi from "./ModalHuySuDungGoi";
import ModalThemMoiPhieuThuThanhToan from "./ModalThemMoiPhieuThuThanhToan";
import { TRANG_THAI_NB_GOI_DV, ROLES } from "constants/index";
import IconList from "assets/images/thuNgan/icList.png";
import { checkRole } from "utils/role-utils";
import { useStore, useLoading } from "hook";
import ModalMienGiam from "./ModalMienGiam";
import { printJS } from "data-access/print-provider";

const ChiTietNguoiBenhSuDungGoi = (props) => {
  const { showLoading, hideLoading } = useLoading();
  const refModalHuySuDungGoi = useRef(null);
  const refModalKetThucSuDungGoi = useRef(null);
  const refModalMienGiam = useRef(null);

  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const thongTinNbGoiDv = useStore("nbGoiDv.thongTinNbGoiDv", {});
  const {
    nbGoiDv: { getById, onKetThucGoi, onChotChiPhi },
    thanhToanGoi: { onSearch },
    phieuIn: { getPhieuIn, showFileEditor, getFilePhieuIn },
  } = useDispatch();

  const [state, _setState] = useState({ activeKey: "0" });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const listTabs = [
    {
      name: t("goiDichVu.thongTinGoiApDung"),
      component: <ThongTinGoiApDung />,
      iconTab: <IcThongTin />,
    },
    {
      name: t("goiDichVu.dvDaSuDung"),
      component: <DvDaSuDung />,
      iconTab: <IcDvDaSuDung />,
    },
    {
      name: t("goiDichVu.thanhToanGoi"),
      component: (
        <ThanhToanGoi
          isSave={[ROLES["GOI_DICH_VU"].THEM_MOI_PHIEU_THU_THANH_TOAN_GOI]}
          isCancelPayment={[ROLES["GOI_DICH_VU"].HUY_THANH_TOAN_PHIEU_THU_GOI]}
        />
      ),
      iconTab: <IcDvDaSuDung />,
    },
  ];

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  const onChange = (tab) => {
    setState({ activeKey: tab });
  };
  const onHuySuDungGoi = () => {
    refModalHuySuDungGoi.current &&
      refModalHuySuDungGoi.current.show(
        {
          type: 0,
          nbGoiDvId: id,
          nbDotDieuTriId: thongTinNbGoiDv.nbDotDieuTriId,
        },
        () => {
          getById(id);
          onSearch({
            dataSearch: { nbDotDieuTriId: thongTinNbGoiDv?.nbDotDieuTriId },
          });
        }
      );
  };

  const onDungGoi = () => {
    refModalHuySuDungGoi.current &&
      refModalHuySuDungGoi.current.show(
        {
          type: 1,
          nbGoiDvId: id,
          nbDotDieuTriId: thongTinNbGoiDv.nbDotDieuTriId,
        },
        () => {
          getById(id);
        }
      );
  };

  const onDungSuDungGoi = () => {
    const { tienDaThanhToan, tienDaSuDung } = thongTinNbGoiDv;
    if ((tienDaSuDung || 0) <= (tienDaThanhToan || 0)) {
      onDungGoi();
    } else {
      refModalKetThucSuDungGoi.current &&
        refModalKetThucSuDungGoi.current.show({ isOnDungGoi: true }, () => {
          onDungGoi();
        });
    }
  };

  const onTaoMienGiam = () => {
    refModalMienGiam.current &&
      refModalMienGiam.current.show(
        {
          type: 0,
          nbGoiDvId: id,
          nbDotDieuTriId: thongTinNbGoiDv.nbDotDieuTriId,
        },
        () => {
          getById(id);
        }
      );
  };
  useEffect(() => {
    if (thongTinNbGoiDv?.nbDotDieuTriId) {
      getPhieuIn({
        nbDotDieuTriId: thongTinNbGoiDv.nbDotDieuTriId,
        maManHinh: "010",
        maViTri: "01001",
      }).then((listPhieu) => {
        setState({ listPhieu: listPhieu });
      });
    }
  }, [thongTinNbGoiDv]);
  const onPrintPhieu = (item) => async () => {
    if (item.key == 0) {
      // onPrintPhieuThu();
    } else {
      if (item.type == "editor") {
        showFileEditor({
          phieu: item,
          nbDotDieuTriId: thongTinNbGoiDv.nbDotDieuTriId,
          nbThongTinId: thongTinNbGoiDv.nbThongTinId,
        });
      } else {
        try {
          showLoading();
          const { finalFile, dsPhieu } = await getFilePhieuIn({
            listPhieus: [item],
            nbGoiDvId: thongTinNbGoiDv.id,
            showError: true,
          });
          printJS({
            printable: finalFile,
            type: "pdf",
          });
        } catch (error) {
        } finally {
          hideLoading();
        }
      }
    }
  };
  const menu = useMemo(() => {
    const phieus = [
      // { key: 0, ten: t("phieuIn.inTatCa") },
      ...(state.listPhieu || []),
    ];
    return (
      <Menu
        items={phieus.map((item, index) => ({
          key: index,
          label: (
            <a onClick={onPrintPhieu(item)}>{item.ten || item.tenBaoCao}</a>
          ),
        }))}
      />
    );
  }, [state.listPhieu]);
  const tongTienGoiSauGiam = useMemo(() => {
    return (
      (thongTinNbGoiDv?.tongTien || 0) -
      (thongTinNbGoiDv?.tienGiamGia || 0) -
      (thongTinNbGoiDv?.tienMienGiamDichVu || 0) -
      (thongTinNbGoiDv?.tienMienGiamGoiDv || 0)
    ).formatPrice();
  }, [thongTinNbGoiDv]);

  const onKetThucSuDungGoi = () => {
    if (
      tongTienGoiSauGiam ===
      (thongTinNbGoiDv?.tienDaThanhToan || 0).formatPrice()
    ) {
      onKetThucGoi(id);
    } else {
      refModalKetThucSuDungGoi.current &&
        refModalKetThucSuDungGoi.current.show({}, () => {
          onKetThucGoi(id);
          onSearch({
            dataSearch: { nbGoiDvId: thongTinNbGoiDv?.id },
          });
        });
    }
  };
  const onChotChiPhiGoi = async () => {
    try {
      showLoading();
      await onChotChiPhi({ id });
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  return (
    <MainPage
      breadcrumb={[
        { link: "/goi-dich-vu", title: "Gói dịch vụ" },
        {
          link: "/goi-dich-vu/danh-sach-su-dung-goi",
          title: t("goiDichVu.danhSachNguoiBenhSuDungGoi"),
        },
        {
          link: `/goi-dich-vu/danh-sach-su-dung-goi/chi-tiet-nguoi-benh-su-dung-goi/${id}`,
          title: t("goiDichVu.chiTietNguoiBenhSuDungGoi"),
        },
      ]}
    >
      <Main>
        <Row>
          <h1>{t("goiDichVu.chiTietNguoiBenhSuDungGoi")}</h1>
          <span
            style={{ flex: 1, marginLeft: "10px", cursor: "pointer" }}
            onClick={() => history.push("/goi-dich-vu/danh-sach-su-dung-goi")}
          >
            <img src={IconList} alt="" />
          </span>
        </Row>
        <Row>
          <Col className="header-left" span={24}>
            <ThongTinBenhNhan />
          </Col>
        </Row>
        <Card className="content">
          <Tabs.Left
            defaultActiveKey={state.activeKey}
            tabPosition={"left"}
            tabWidth={220}
            type="card"
            moreIcon={<CaretDownOutlined />}
            onChange={onChange}
            className="tab-main"
          >
            {listTabs.map((obj, i) => {
              return (
                <Tabs.TabPane
                  key={i}
                  tab={
                    <div>
                      {obj?.iconTab}
                      {obj?.name}
                    </div>
                  }
                >
                  {obj?.component}
                </Tabs.TabPane>
              );
            })}
          </Tabs.Left>
        </Card>

        <Row className="action-bottom">
          <div className="button-left"></div>
          <div className="button-right">
            <Dropdown overlay={menu} placement="top">
              <Button type="default" minWidth={100} rightIcon={<PrintIcon />}>
                <span>{t("khamBenh.inGiayTo")}</span>
              </Button>
            </Dropdown>
            {[
              TRANG_THAI_NB_GOI_DV.TAO_MOI,
              TRANG_THAI_NB_GOI_DV.DANG_SU_DUNG,
            ].includes(thongTinNbGoiDv?.trangThai) && (
              <Button type="default" minWidth={100} onClick={onTaoMienGiam}>
                {t("goiDichVu.taoMienGiam")}
              </Button>
            )}
            {thongTinNbGoiDv?.trangThai == TRANG_THAI_NB_GOI_DV.TAO_MOI &&
              checkRole([ROLES["GOI_DICH_VU"].HUY_SU_DUNG_GOI]) && (
                <Button type="default" minWidth={100} onClick={onHuySuDungGoi}>
                  {t("goiDichVu.huySuDungGoi")}
                </Button>
              )}
            {thongTinNbGoiDv?.trangThai == TRANG_THAI_NB_GOI_DV.DANG_SU_DUNG &&
              checkRole([ROLES["GOI_DICH_VU"].DUNG_SU_DUNG_GOI]) && (
                <Button type="default" minWidth={100} onClick={onDungSuDungGoi}>
                  {t("goiDichVu.dungSuDungGoi")}
                </Button>
              )}
            {/* {thongTinNbGoiDv?.trangThai ==
              TRANG_THAI_NB_GOI_DV.DANG_SU_DUNG && ( */}
            {checkRole([ROLES["GOI_DICH_VU"].KET_THUC_SU_DUNG_GOI]) && (
              <Button
                type="default"
                minWidth={100}
                onClick={onKetThucSuDungGoi}
              >
                {t("goiDichVu.ketThucSuDungGoi")}
              </Button>
            )}
            {[
              TRANG_THAI_NB_GOI_DV.TAO_MOI,
              TRANG_THAI_NB_GOI_DV.DANG_SU_DUNG,
            ].includes(thongTinNbGoiDv.trangThai) && (
              <Button type="default" minWidth={100} onClick={onChotChiPhiGoi}>
                {t("goiDichVu.chotChiPhiGoi")}
              </Button>
            )}
            {/* )} */}
          </div>
        </Row>
      </Main>
      <ModalHuySuDungGoi ref={refModalHuySuDungGoi} />
      <ModalThemMoiPhieuThuThanhToan ref={refModalKetThucSuDungGoi} />
      <ModalMienGiam ref={refModalMienGiam} />
    </MainPage>
  );
};

export default memo(ChiTietNguoiBenhSuDungGoi);
