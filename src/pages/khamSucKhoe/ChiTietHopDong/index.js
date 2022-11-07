import React, { useRef, useMemo, useEffect, useState } from "react";
import { message, Row, Tooltip, Dropdown, Menu, Col } from "antd";
import { Main, MainPage } from "./styled";
import ThongTinHopDong from "./ThongTinHopDong";
import TabContent from "./TabContent";
import { Button, ModalChonToaNha, Select } from "components";
import { useDispatch, useSelector } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";
import { useHistory, useParams } from "react-router-dom";
import {
  PrinterOutlined,
  PlusCircleOutlined,
  DollarCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ModalThanhToanHopDong from "../modals/ModalThanhToanHopDong";
import ModalBaoGiaThatBai from "../modals/ModalBaoGiaThatBai";
import ModalSetupHopDong from "../modals/ModalSetupHopDong";
import IconList from "assets/svg/iconList.svg";
import Icon from "@ant-design/icons";
import { every, some } from "lodash";
import ModalChinhSuaHopDong from "../modals/ModalChinhSuaHopDong";
import ModalTaoMienGiam from "../modals/ModalTaoMienGiam";
import ModalLenLichKham from "../modals/ModalLenLichKham";
import { useTranslation } from "react-i18next";
import ModalInPhieuKhamSucKhoe from "../modals/ModalInPhieuKhamSucKhoe";
import { refConfirm } from "app";
import { useLoading } from "hook";
import printJS from "print-js";
import IcLocation from "assets/images/thuNgan/icLocation.png";
import cacheUtils from "utils/cache-utils";
import { LIST_PHIEU_KSK_HOP_DONG } from "./config";

const ChiTietHopDong = (props) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const history = useHistory();
  const { id } = useParams();
  const refModalThanhToanHopDong = useRef(null);
  const refModalFail = useRef(null);
  const refModalSetupHopDong = useRef(null);
  const refModalChinhSuaHopDong = useRef(null);
  const refModalTaoMienGiam = useRef(null);
  const refModalLenLichKham = useRef(null);
  const refModalInPhieuKhamSucKhoe = useRef(null);
  const refModalChonToaNha = useRef(null);
  const { showLoading, hideLoading } = useLoading();

  const {
    hopDongKSK: {
      validateTTHopdong,
      getHopDong,
      taoMoiHopDong,
      taoMoiHopDongTuDS,
      clearData: clearDataHopDong,
      thanhLyHD,
      xacNhanThanhLyHD,
      huyThanhLyHD,
    },
    dichVuKSK: { clearData: clearDataDichVu },
    phieuIn: { getFilePhieuIn },
    toaNha: { getNhaTheoTaiKhoan },
  } = useDispatch();

  const { auth } = useSelector((state) => state.auth);
  const { ttHopDong, chiTietHopDong, dsPhieuThu } = useSelector(
    (state) => state.hopDongKSK
  );
  const { listNhaTheoTaiKhoan } = useSelector((state) => state.toaNha);

  const [state, _setState] = useState({
    listPhieu: LIST_PHIEU_KSK_HOP_DONG,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const isThemMoi = useMemo(() => {
    return id === undefined;
  }, [id]);

  const onSave = async () => {
    validateTTHopdong().then(() => {
      taoMoiHopDongTuDS(ttHopDong).then((data) => {
        history.push(`/kham-suc-khoe/hop-dong/chi-tiet/${data.id}`);
      });
    });
  };

  const onTaoHopDong = () => {
    taoMoiHopDong({
      id,
    }).then(() => {
      getHopDong(id);
    });
  };

  useEffect(() => {
    if (id) {
      getHopDong(id);
    }
  }, [id]);

  useEffect(() => {
    getNhaTheoTaiKhoan({});

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
  }, []);

  const onThanhToanHopDong = () => {
    refModalThanhToanHopDong.current && refModalThanhToanHopDong.current.show();
  };

  function onClickThemMoi() {
    clearDataHopDong();
    clearDataDichVu();
    history.push("/kham-suc-khoe/hop-dong/them-moi");
  }

  function onClickThietLap() {
    refModalSetupHopDong.current && refModalSetupHopDong.current.show();
  }

  function onEditHopDong() {
    if (chiTietHopDong?.trangThai === 50) {
      message.error("Không thể chỉnh sửa hợp đồng đã thanh lý");
      return;
    }

    if (some(dsPhieuThu, { thanhToan: true })) {
      message.error("Không thể chỉnh sửa hợp đồng đã thanh toán");
      return;
    }

    refModalChinhSuaHopDong.current && refModalChinhSuaHopDong.current.show();
  }

  function onTaoMienGiam() {
    refModalTaoMienGiam.current && refModalTaoMienGiam.current.show();
  }

  const onLenLichKham = () => {
    refModalLenLichKham.current && refModalLenLichKham.current.show({});
  };

  function onThanhLyHD() {
    thanhLyHD(id).then(({ message, code }) => {
      if (code == 0) {
        getHopDong(id);
        return;
      }

      refConfirm.current &&
        refConfirm.current.show(
          {
            title: "Xác nhận thanh lý hợp đồng",
            content: message || "Bạn có chắc chắn muốn Thanh lý hợp đồng?",
            cancelText: "Quay lại",
            okText: "Đồng ý",
            classNameOkText: "button-error",
            showImg: true,
            showBtnOk: true,
          },
          () => {
            xacNhanThanhLyHD(id).then(() => {
              getHopDong(id);
            });
          },
          () => {}
        );
    });
  }

  function onHuyThanhLyHD() {
    huyThanhLyHD(id).then(() => {
      getHopDong(id);
    });
  }

  const onPrintPhieu = (item) => () => {
    refModalInPhieuKhamSucKhoe.current &&
      refModalInPhieuKhamSucKhoe.current.show(
        {
          title: item.ten || item.tenBaoCao,
        },
        async (data) => {
          try {
            showLoading();
            const { finalFile } = await getFilePhieuIn({
              listPhieus: [item],
              showError: true,
              hopDongKskId: id,
              tuSo: data?.tuSo,
              denSo: data?.denSo,
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
      );
  };

  const menu = useMemo(() => {
    return (
      <Menu
        items={(state?.listPhieu || []).map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={onPrintPhieu(item)}>
              {item.ten || item.tenBaoCao}
            </a>
          ),
        }))}
      />
    );
  }, [state?.listPhieu, id, state.valuePhieuChiDinh, state.popoverVisible]);

  const onChangeSelect = (e) => {
    cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
    setState({ nhaTamUng: e });
  };

  return (
    <MainPage
      breadcrumb={[
        {
          link: "/kham-suc-khoe",
          title: t("khamSucKhoe.quanLyKhamSucKhoe"),
        },
        {
          link: "/kham-suc-khoe/hop-dong",
          title: t("khamSucKhoe.danhSachHopDong"),
        },
        {
          link: "",
          title: isThemMoi
            ? t("khamSucKhoe.themMoiHopDong")
            : t("khamSucKhoe.chiTietHopDong"),
        },
      ]}
    >
      <Main>
        <Row>
          <Col span={18}>
            <h1 className="title">
              {t("khamSucKhoe.chiTietHopDong")}
              <div className="header-action">
                <div className="action-btn" onClick={onClickThemMoi}>
                  <Tooltip title={`Tạo mới hợp đồng`}>
                    <PlusCircleOutlined />
                  </Tooltip>
                </div>

                <div className="action-btn">
                  <Tooltip title={`Danh sách hợp đồng`}>
                    <Icon
                      className="icon-list"
                      onClick={() => {
                        history.push("/kham-suc-khoe/hop-dong");
                      }}
                      component={IconList}
                    />
                  </Tooltip>
                </div>

                <div className="action-btn" onClick={onClickThietLap}>
                  <Tooltip title="Thiết lập hợp đồng">
                    <SettingOutlined />
                  </Tooltip>
                </div>
              </div>
            </h1>
          </Col>

          <Col span={6} className="nhaTamUng">
            <div className="boLoc">
              <img src={IcLocation} alt={IcLocation} />
              <Select
                data={listNhaTheoTaiKhoan}
                onChange={onChangeSelect}
                value={state.nhaTamUng}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <ThongTinHopDong
            layerId={refLayerHotKey.current}
            onEditHopDong={onEditHopDong}
          />
        </Row>
        <TabContent />
        <Row className="action-bottom">
          {isThemMoi ? (
            <>
              <div className="button-left"></div>
              <div className="button-right">
                <Button
                  type="primary"
                  onClick={onSave}
                  rightIcon={
                    <img
                      style={{ marginLeft: 6 }}
                      src={require("assets/images/kho/save.png")}
                      alt=""
                    ></img>
                  }
                  iconHeight={15}
                  minWidth={"100px"}
                >
                  Lưu [F4]
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="button-left">
                <Dropdown overlay={menu}>
                  <Button
                    rightIcon={<PrinterOutlined />}
                    iconHeight={15}
                    minWidth={"100px"}
                    // onClick={onInGiayTo}
                  >
                    In giấy tờ
                  </Button>
                </Dropdown>

                {chiTietHopDong?.trangThai === 40 && (
                  <Button
                    iconHeight={15}
                    minWidth={"100px"}
                    onClick={onThanhLyHD}
                  >
                    Thanh lý hợp đồng
                  </Button>
                )}

                {chiTietHopDong?.trangThai === 50 && (
                  <Button
                    iconHeight={15}
                    minWidth={"100px"}
                    onClick={onHuyThanhLyHD}
                  >
                    Hủy thanh lý hợp đồng
                  </Button>
                )}
              </div>

              <div className="button-right">
                <Button
                  onClick={onTaoMienGiam}
                  iconHeight={15}
                  minWidth={"100px"}
                  disabled={[30, 50].includes(chiTietHopDong?.trangThai)}
                >
                  {t("khamSucKhoe.taoMienGiam")}
                </Button>

                {chiTietHopDong?.trangThai === 40 && (
                  <Button
                    type="primary"
                    onClick={onThanhToanHopDong}
                    rightIcon={<DollarCircleOutlined />}
                    iconHeight={15}
                    minWidth={"100px"}
                    className="btn-success"
                  >
                    {t("khamSucKhoe.thanhToanHopDong")}
                  </Button>
                )}

                {chiTietHopDong?.trangThai === 20 && (
                  <Button
                    type="primary"
                    onClick={onTaoHopDong}
                    rightIcon={<PlusCircleOutlined />}
                    iconHeight={15}
                    minWidth={"100px"}
                    className="btn-success"
                  >
                    {t("khamSucKhoe.taoHopDong")}
                  </Button>
                )}
                <Button
                  type="primary"
                  onClick={onLenLichKham}
                  iconHeight={15}
                  minWidth={"100px"}
                  className="btn-success"
                >
                  {t("khamSucKhoe.lenLichKhamLayMau")}
                </Button>
              </div>
            </>
          )}
        </Row>
      </Main>
      <ModalThanhToanHopDong modalCheckoutRef={refModalThanhToanHopDong} />
      <ModalBaoGiaThatBai ref={refModalFail} />
      <ModalSetupHopDong ref={refModalSetupHopDong} />
      <ModalChinhSuaHopDong ref={refModalChinhSuaHopDong} />
      <ModalTaoMienGiam ref={refModalTaoMienGiam} />
      <ModalLenLichKham ref={refModalLenLichKham} />
      <ModalInPhieuKhamSucKhoe ref={refModalInPhieuKhamSucKhoe} />
      <ModalChonToaNha ref={refModalChonToaNha} />
    </MainPage>
  );
};
//

export default ChiTietHopDong;
