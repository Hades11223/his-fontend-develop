import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import { Button, Col, Row, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ThongTinHoaDon from "../component/thongTinHoaDon/ThongTinHoaDon";
import TableDsDichVu from "../component/TableDsDichVu";
import Icon from "@ant-design/icons";
import IconList from "assets/svg/iconList.svg";
import IconXuatHd from "assets/svg/thuNgan/iconXuatHd.svg";
import IconDelete from "assets/svg/kho/delete.svg";
import ModalDeleteHoaDon from "../component/ModalDeleteHoaDon";
import { TRANG_THAI_HOA_DON } from "constants/index";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { useParams } from "react-router-dom";
import { Page } from "components";

const TaoHoaDonDienTu = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const refModalDeleteHoaDon = useRef(null);
  const [state, _setState] = useState({
    phatHanhHdCongTy: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { maHoSo, hoaDonId, nbDotDieuTriId } = useParams();
  const {
    dsHoaDonDienTu: {
      getDsDichVuChiTiet,
      deleteHoaDon,
      getChiTietHoaDon,
      xuatHoaDonNhap,
      updateData,
      dieuChinhHoaDon,
    },
  } = useDispatch();
  useEffect(() => {
    getDsDichVuChiTiet({ hoaDonId }).then((s) => {
      setState({ dsDichVu: s });
      let price = 0;
      (s || []).forEach((e) => {
        price += e.thanhTien;
      });
      updateData({ price });
    });
    getChiTietHoaDon({
      id: hoaDonId,
    }).then((s) => {
      setState({
        thongTinHoaDon: s,
      });
    });
  }, []);
  const handleRedirect = () => {
    history.push("/thu-ngan/ds-hoa-don-dien-tu");
  };
  const handleXuatHoaDon = () => {
    setState({
      isLoadingXuatHd: true,
    });
    xuatHoaDonNhap({ id: hoaDonId })
      .then((s) => {
        setState({
          thongTinHoaDon: { ...state?.thongTinHoaDon, ...s.data },
          isLoadingXuatHd: true,
        });
      })
      .catch(() => {
        setState({
          isLoadingXuatHd: false,
        });
      });
  };

  const handleDieuChinhHoaDon = () => {
    dieuChinhHoaDon({ id: hoaDonId }).then((s) => {
      setState({
        thongTinHoaDon: { ...state?.thongTinHoaDon, ...s.data },
      });
    });
  };

  const onSuaHoaDon = () => {
    history.push(
      `/thu-ngan/chinh-sua-hoa-don-dien-tu/${maHoSo}/${hoaDonId}/${nbDotDieuTriId}`
    );
  };

  const onDelete = () => {
    if (refModalDeleteHoaDon.current) {
      refModalDeleteHoaDon.current.show(state?.thongTinHoaDon, handleDelete);
    }
  };
  const handleDelete = (lyDo) => {
    deleteHoaDon({ id: hoaDonId, lyDo: lyDo }).then((s) => {
      setState({
        thongTinHoaDon: {
          ...state.thongTinHoaDon,
          trangThai: 40,
        },
      });
    });
  };
  return (
    <Page
      breadcrumb={[
        { title: t("thuNgan.thuNgan"), link: "/thu-ngan" },
        {
          title: t("thuNgan.hoaDonDienTu"),
          link: "/thu-ngan/ds-hoa-don-dien-tu",
        },
        {
          title: t("thuNgan.chiTietHoaDon"),
          link: `/thu-ngan/chi-tiet-hoa-don/${maHoSo}/${hoaDonId}/${nbDotDieuTriId}`,
        },
      ]}
      title={
        <div className="title">
          <span>{t("thuNgan.chiTietHoaDon")}</span>{" "}
          <Tooltip title={t("thuNgan.danhSachHDDT")} placement="bottom">
            <Icon component={IconList} onClick={handleRedirect}></Icon>
          </Tooltip>
          {(state.thongTinHoaDon?.trangThai === TRANG_THAI_HOA_DON.HD_TAO_MOI ||
            state.thongTinHoaDon?.trangThai ===
              TRANG_THAI_HOA_DON.HD_DA_PHAT_HANH ||
            state.thongTinHoaDon?.trangThai ===
              TRANG_THAI_HOA_DON.HD_CHO_XOA_BO) &&
            checkRole([ROLES["THU_NGAN"].XOA_HOA_DON]) && (
              <Tooltip
                placement="topLeft"
                title={
                  state.thongTinHoaDon?.trangThai ===
                  TRANG_THAI_HOA_DON.HD_TAO_MOI
                    ? t("thuNgan.xoaBoHoaDonTaoMoi")
                    : state.thongTinHoaDon?.trangThai ===
                      TRANG_THAI_HOA_DON.HD_DA_PHAT_HANH
                    ? t("thuNgan.xoaBoHoaDonDaPhatHanh")
                    : t("thuNgan.xoaBoHoaDonChoXoa")
                }
              >
                <Icon component={IconDelete} onClick={onDelete}></Icon>
              </Tooltip>
            )}
        </div>
      }
    >
      <Main>
        <Col span={24}>
          <Row gutter={10}>
            <Col lg={{ span: 16 }} xl={{ span: 18 }} className="ds-dich-vu">
              <TableDsDichVu
                nbDotDieuTriId={nbDotDieuTriId}
                dsDichVu={state.dsDichVu}
                isChiTiet={true}
              ></TableDsDichVu>
            </Col>
            <Col lg={{ span: 8 }} xl={{ span: 6 }} className="info">
              <ThongTinHoaDon
                thongTinHoaDon={state.thongTinHoaDon}
                isChiTiet={true}
                setStateParent={setState}
                phatHanhHdCongTy={state.phatHanhHdCongTy}
                isNhieuNB={nbDotDieuTriId === "null" ? true : false}
              ></ThongTinHoaDon>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="footer-button">
            {state?.thongTinHoaDon?.trangThai ===
            TRANG_THAI_HOA_DON.HD_TAO_MOI ? (
              <Button className="btn-cancel" onClick={onSuaHoaDon}>
                {t("thuNgan.suaHoaDon")}
              </Button>
            ) : null}
            {state?.thongTinHoaDon?.trangThai ===
            TRANG_THAI_HOA_DON.HD_CHO_DIEU_CHINH ? (
              <Button className="btn-ok" onClick={handleDieuChinhHoaDon}>
                {t("thuNgan.dieuChinhHoaDon")}
              </Button>
            ) : null}
            {(state?.thongTinHoaDon?.trangThai ===
              TRANG_THAI_HOA_DON.HD_PHAT_HANH_LOI ||
              state?.thongTinHoaDon?.trangThai ===
                TRANG_THAI_HOA_DON.HD_TAO_MOI) && (
              <Button
                loading={state?.isLoadingXuatHd}
                className="btn-ok"
                onClick={handleXuatHoaDon}
              >
                {t("thuNgan.xuatHoaDon")} <Icon component={IconXuatHd}></Icon>
              </Button>
            )}
          </div>
        </Col>
        <ModalDeleteHoaDon ref={refModalDeleteHoaDon}></ModalDeleteHoaDon>
      </Main>
    </Page>
  );
};

export default TaoHoaDonDienTu;
