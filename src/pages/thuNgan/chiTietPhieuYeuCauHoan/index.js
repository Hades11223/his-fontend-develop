import React, { useEffect, useRef, useState } from "react";
import { MainPage, InputSearch } from "./styled";
import ThongTinBenhNhan from "./thongTinBenhNhan";
import ThongTinPhieu from "./thongTinPhieu";
import BangThongTin from "./bangThongTin";
import { Col, Input, Row, message, Tooltip } from "antd";
import Icon from "@ant-design/icons";
import IconSeacrh from "assets/svg/iconSearch.svg";
import IconList from "assets/svg/iconList.svg";
import ThongTinSoTien from "./thongTinSoTien";
import { useDispatch } from "react-redux";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import IconQrCode from "assets/images/thuNgan/qrCode.png";
import { useHistory } from "react-router";
import printProvider from "data-access/print-provider";
import IcPrint from "assets/svg/ic-print.svg";
import { Button, ModalChonToaNha } from "components";
import { useTranslation } from "react-i18next";
import { checkRole, checkRoleOr } from "utils/role-utils";
import { ROLES } from "constants/index";
import { refConfirm } from "app";
import { useStore } from "hook";
import { useParams } from "react-router-dom";
import cacheUtils from "utils/cache-utils";
import IcLocation from "assets/images/thuNgan/icLocation.png";
import IconEdit from "assets/images/khamBenh/edit.png";

const ChiTietPhieuYeuCauHoan = (props) => {
  const { t } = useTranslation();
  const refModalChonToaNha = useRef(null);
  const [state, _setState] = useState({
    showSearch: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const history = useHistory();
  let timer = null;
  const {
    danhSachPhieuYeuCauHoan: {
      getChiTietPhieuDoiTra,
      confirmPhieuYeuCauHoan,
      onSearchChiTietPhieuHoan,
      phieuChi,
    },
    thuNgan: { getThongTinPhieuThu },
  } = useDispatch();
  const chiTietPhieuDoiTra = useStore(
    "danhSachPhieuYeuCauHoan.chiTietPhieuDoiTra",
    {}
  );
  const thongTinPhieuThu = useStore("thuNgan.thongTinPhieuThu", {});
  const { phieuHoanTraId, maHoSo, soPhieu, nbDotDieuTriId } = useParams();
  const listNhaTheoTaiKhoan = useStore("toaNha.listNhaTheoTaiKhoan", []);
  const auth = useStore("auth.auth", {});

  useEffect(() => {
    getChiTietPhieuDoiTra({ id: phieuHoanTraId }).then((res) => {
      if (res.dsDichVuHoan) {
        getThongTinPhieuThu(res.dsDichVuHoan[0]?.phieuThuId);
      }
    });
  }, [phieuHoanTraId]);

  useEffect(() => {
    async function fetchData() {
      let nhaTamUng = await cacheUtils.read(
        "DATA_NHA_TAM_UNG",
        "",
        null,
        false
      );
      if (!nhaTamUng) {
        if (auth?.dsToaNha?.length === 1) {
          cacheUtils.save("DATA_NHA_TAM_UNG", "", auth?.dsToaNha[0]?.id, false);
          setState({ nhaTamUng: auth?.dsToaNha[0]?.id });
        } else {
          refModalChonToaNha.current &&
            refModalChonToaNha.current.show({}, (e) => {
              setState({ nhaTamUng: e });
              cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
            });
        }
      } else {
        setState({ nhaTamUng });
      }
    }
    fetchData();
  }, [auth?.dsToaNha]);

  const handleSubmit = () => {
    if (
      (checkRole([ROLES["THU_NGAN"].XAC_NHAN_HOAN_DICH_VU]) &&
        !thongTinPhieuThu.phatHanhHoaDon) ||
      (checkRole([ROLES["THU_NGAN"].XAC_NHAN_HOAN_DICH_VU_DA_XUAT_HDDT]) &&
        thongTinPhieuThu.phatHanhHoaDon) ||
      (checkRole([ROLES["THU_NGAN"].CHI_HOAN_NHA_THUOC]) &&
        chiTietPhieuDoiTra.loai === 40)
    ) {
      setState({ isLoading: true });
      confirmPhieuYeuCauHoan({ id: phieuHoanTraId })
        .then((s) => {
          phieuChi(phieuHoanTraId).then((s) => {
            if (s.file.pdf) printProvider.printMergePdf([s.file.pdf]);
          });
        })
        .finally(() => {
          setState({ isLoading: false });
        });
    } else if (thongTinPhieuThu.phatHanhHoaDon) {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("common.canhBao"),
            content: "Phiếu yêu cầu hoàn đã xuất hóa đơn điện tử",
            cancelText: t("common.troLai"),
            showBtnOk: false,
            typeModal: "warning",
          },
          () => {},
          () => {
            message.error(
              "Tài khoản không có quyền hoàn với phiếu yêu cầu hoàn đã xuất hóa đơn điện tử"
            );
          }
        );
    } else {
      message.error("Tài khoản không có quyền");
    }
  };

  const onInPhieuChi = () => {
    phieuChi(phieuHoanTraId).then((s) => {
      if (s.file.pdf) printProvider.printMergePdf([s.file.pdf]);
    });
  };

  const handleSearch = (e) => {
    clearTimeout(timer);
    timer = setTimeout(
      (s) => {
        if (s.value) {
          onSearchChiTietPhieuHoan({
            soPhieu: s.value,
          }).then((res) => {
            if (res.length) {
              history.push(
                `/thu-ngan/chi-tiet-phieu-hoan-tra/${res[0]?.maHoSo}/${res[0]?.id}/${res[0]?.nbDotDieuTriId}/${res[0]?.soPhieu}`
              );
            } else {
              message.error(`${t("thuNgan.khongTonTaiSoPhieu")} ${s.value}`);
            }
          });
        }
      },
      500,
      e.target
    );
  };
  const handleClick = () => {
    history.push("/thu-ngan/ds-phieu-yeu-cau-hoan");
  };

  const onEdit = () => {
    refModalChonToaNha.current &&
      refModalChonToaNha.current.show(state?.nhaTamUng, (e) => {
        setState({ nhaTamUng: e });
        cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
      });
  };

  return (
    <MainPage
      breadcrumb={[
        { title: t("thuNgan.thuNgan"), link: "/thu-ngan" },
        {
          title: t("thuNgan.danhSachPhieuYeuCauHoan"),
          link: "/thu-ngan/ds-phieu-yeu-cau-hoan",
        },
        {
          title: t("thuNgan.chiTietYeuCauPhieuHoan"),
          link: `/thu-ngan/chi-tiet-phieu-hoan-tra/${maHoSo}/${phieuHoanTraId}/${nbDotDieuTriId}/${soPhieu}`,
        },
      ]}
      title={
        <div className="header">
          <p className="title">{t("thuNgan.chiTietYeuCauPhieuHoan")}</p>
          {!state.showSearch && (
            <Tooltip
              placement="topLeft"
              title={t("thuNgan.timKiemPhieuYeuCauHoan")}
            >
              <Icon
                className="icon-search"
                component={IconSeacrh}
                onClick={() => {
                  setState({
                    showSearch: true,
                  });
                }}
              />
            </Tooltip>
          )}
          {state.showSearch && (
            <InputSearch focus={state.focus}>
              <SearchOutlined />
              <Input
                placeholder={t("thuNgan.nhapSoPhieu")}
                onBlur={() => {
                  setState({
                    focus: false,
                  });
                }}
                onFocus={() => {
                  setState({
                    focus: true,
                  });
                }}
                onChange={handleSearch}
                onPressEnter={handleSearch}
                style={{ width: "250px" }}
              />
              <img src={IconQrCode} alt="..." />
            </InputSearch>
          )}

          <Tooltip
            placement="topLeft"
            title={t("thuNgan.danhSachPhieuYeuCauHoan")}
          >
            <Icon
              className="icon-list"
              onClick={handleClick}
              component={IconList}
            />
          </Tooltip>
        </div>
      }
      titleRight={
        <>
          <img src={IcLocation} alt={IcLocation} />{" "}
          <span
            style={{ fontWeight: "bold", padding: "0px 5px", fontSize: "16px" }}
          >
            {" "}
            {listNhaTheoTaiKhoan.find((x) => x.id === state?.nhaTamUng)?.ten}
          </span>
          <img
            src={IconEdit}
            alt={IconEdit}
            style={{ cursor: "pointer" }}
            onClick={onEdit}
          />
        </>
      }
    >
      <Col span={24}>
        <Row gutter="40" style={{ width: "100%", marginTop: "15px" }}>
          <Col span={17} className="thong-tin-benh-nhan">
            <ThongTinBenhNhan maHoSo={maHoSo} soPhieu={soPhieu} />
          </Col>
          <Col span={7} className="thong-tin-so-tien">
            <ThongTinSoTien />
          </Col>
          <Col span={17} className="bang-thong-tin">
            <BangThongTin soPhieu={phieuHoanTraId} />
          </Col>
          <Col span={7} className="thong-tin-phieu">
            <ThongTinPhieu />
          </Col>
        </Row>
      </Col>
      {chiTietPhieuDoiTra?.trangThai !== 40 &&
        checkRoleOr([
          ROLES["THU_NGAN"].XAC_NHAN_HOAN_DICH_VU,
          ROLES["THU_NGAN"].XAC_NHAN_HOAN_DICH_VU_DA_XUAT_HDDT,
          ROLES["THU_NGAN"].CHI_HOAN_NHA_THUOC,
        ]) && (
          <div className="button-footer">
            <Button
              loading={state.isLoading}
              type="primary"
              onClick={handleSubmit}
              rightIcon={<CheckOutlined />}
              iconHeight={15}
            >
              <span>{t("thuNgan.xacNhanHoan")}</span>
            </Button>
          </div>
        )}
      {chiTietPhieuDoiTra?.trangThai === 40 && (
        <div className="button-footer">
          <Button
            type="primary"
            onClick={onInPhieuChi}
            rightIcon={<IcPrint />}
            iconHeight={15}
          >
            <span>{t("thuNgan.inPhieuChi")}</span>
          </Button>
        </div>
      )}
      <ModalChonToaNha ref={refModalChonToaNha} />
    </MainPage>
  );
};

export default ChiTietPhieuYeuCauHoan;
