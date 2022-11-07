import React, { memo, useState, useRef, useEffect, useMemo } from "react";
import { Main, GlobalStyle } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Select as SelectAntd, Popover, DatePicker } from "antd";
import ModalPayment from "../ModalPayment";
import ModalDiscount from "../ModalDiscount";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import IcPrint from "assets/images/utils/print-white.png";
import ModalCancleSubmit from "../ModalCancleSubmit";
import ModalCanclePayment from "../ModalCanclePayment";
import { Card, Button, Select, AuthWrapper } from "components";
import ModalHoanThuoc from "../ModalHoanThuoc";
import { useEnum, useListAll } from "hook";
import { ENUM, ROLES } from "constants/index";
import { useTranslation } from "react-i18next";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import printProvider from "data-access/print-provider";
import { useLoading } from "hook";

const { Option } = SelectAntd;
const ThongTinDonThuoc = ({ isThemMoi, layerId, className }) => {
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  //ref
  const refModalNotification = useRef(null);
  const refModalDiscount = useRef(null);
  const refWarningHuyPhat = useRef(null);
  const refWarningHuyThanhToan = useRef(null);
  const refHoanThuoc = useRef(null);
  // get
  const { listKhoUser } = useSelector((state) => state.kho);
  const {
    isAdvised,
    nguoiBenhId,
    selectedDonThuoc,
    infoPatient,
    dsThuocTamThoi,
    dsThuocEdit,
  } = useSelector((state) => state.thuocChiTiet);
  const [listTrangThaiDonThuocNhaThuoc] = useEnum(
    ENUM.TRANG_THAI_DON_THUOC_NHA_THUOC
  );
  const [listTrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);
  const [listAllNhanVien] = useListAll("nhanVien");
  // dispatch
  const {
    kho: { getTheoTaiKhoan },
    thuocChiTiet: {
      onSaveDonThuoc,
      updateData,
      postThanhToan,
      updateGhiChuDonThuocById,
      inDonThuoc,
      inPhieuThuNhaThuoc,
      postHuyDuyet,
      postHuyThanhToan,
      searchDonThuoc,
      updateThoiGianPhat,
    },
    phimTat: { onRegisterHotkey },
    nbDvHoan: { inPhieuHoanDoiTra },
  } = useDispatch();
  const { phieuXuat } = infoPatient || {};

  const refF4 = useRef();
  const refF12 = useRef();

  const [state, _setState] = useState({
    editTimeThanhToan: false,
    editTimeDuyet: false,
    editNguoiDuyet: false,
    editThuNgan: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const tongTien = useMemo(() => {
    let data = isThemMoi ? dsThuocTamThoi : dsThuocEdit;
    return (
      data.length &&
      data.reduce(
        (total, item) => (total = total + (item?.nbDichVu?.tienNbTuTra || 0)),
        0
      )
    );
  }, [isThemMoi, dsThuocTamThoi, dsThuocEdit]);

  const isVangLai = useMemo(() => {
    return !phieuXuat?.bacSiChiDinhId;
  }, [phieuXuat]);

  useEffect(() => {
    getTheoTaiKhoan({ nhaThuoc: true });

    // đăng ký phím tắt
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: () => {
            refF4.current && refF4.current();
          },
        },
        {
          keyCode: 123, //F12
          onEvent: () => {
            if (refF12.current) refF12.current();
          },
        },
      ],
    });
  }, []);

  refF12.current = () => {
    if (
      !infoPatient?.phieuThu?.thanhToan &&
      (infoPatient?.phieuXuat?.trangThai === 10 ||
        infoPatient?.phieuXuat?.trangThai === 15 ||
        infoPatient?.phieuXuat?.trangThai === 20) &&
      refModalNotification.current
    )
      refModalNotification.current.show();
  };

  useEffect(() => {
    if (listKhoUser?.length === 1) {
      // default khoId , nếu kho chỉ có 1 giá trị
      setState({ khoId: listKhoUser[0].id });
      updateData({ khoId: listKhoUser[0].id });
    }
  }, [listKhoUser]);

  const onThanhToan = () => {
    onSaveDonThuoc({ history, isThemMoi, isVangLai }).then(() => {
      refModalNotification.current.show();
    });
  };
  const onTuVanDon = () => {
    updateData({ isAdvised: true });
  };
  const onSave = async () => {
    showLoading();

    onSaveDonThuoc({ history, isThemMoi, isVangLai })
      .then((resId) => {
        hideLoading();
        if (id || resId) {
          searchDonThuoc(id || resId);
        }
      })
      .catch((err) => {
        hideLoading();
      });
  };
  refF4.current = onSave;
  const onChange = (key) => (e) => {
    const value = (e?.target && e.target.value) || e;
    setState({ [key]: value });
    if (key === "khoId") {
      updateData({ khoId: value });
    }
  };
  const onHoanThuoc = (e) => {
    refHoanThuoc.current &&
      refHoanThuoc.current.show(infoPatient?.dsThuoc, null, (e) => {});
  };
  const onHuyHoanThuoc = (data) => {
    refHoanThuoc.current &&
      refHoanThuoc.current.show(data, null, (e) => {}, null, {
        type: "huyHoan",
      });
  };
  const onHuyPhat = (e) => {
    refWarningHuyPhat.current &&
      refWarningHuyPhat.current.show({}, (e) => {
        postHuyDuyet({ id: nguoiBenhId, lyDo: e.valueInput }).then(() => {
          window.location.href = window.location.href;
        });
      });
  };
  const onHuyThanhToan = () => {
    refWarningHuyThanhToan.current.show({}, (e) => {
      postHuyThanhToan({
        id: nguoiBenhId,
        lyDo: e.valueInput,
      }).then(() => {
        window.location.href = window.location.href;
      });
    });
  };
  const onPhat = () => {
    let list = infoPatient?.phieuThu?.dsPhuongThucTt?.reduce((init, item) => {
      return Object.assign(init, {
        phuongThucTtId: item.phuongThucTtId,
        tongTien: item.tongTien,
      });
    }, []);
    postThanhToan(
      { id: nguoiBenhId, dsPhuongThucTt: list },
      state.infoPrice
    ).then((res) => {});
  };
  const renderButton = () => {
    if (
      //-----------------------------------------------------------------------------------------------------------------------------
      infoPatient?.phieuXuat?.trangThai <= 15 &&
      infoPatient?.phieuThu?.thanhToan
    ) {
      // TT đơn = Tạo mới & TT thanh toán = Đã thanh toán => Hiển thị button Phát
      return (
        <Row className="select-row-last">
          <Col span={11}>
            <Button
              type="primary"
              onClick={onHuyThanhToan}
              rightIcon={
                <img
                  style={{ marginLeft: 5 }}
                  src={require("assets/images/kho/pay.png")}
                  alt=""
                ></img>
              }
              iconHeight={15}
              minWidth={100}
            >
              {t("nhaThuoc.huyThanhToan")}
            </Button>
          </Col>
          <Col span={11}>
            <Button
              type="primary"
              onClick={onPhat}
              rightIcon={
                <img
                  style={{ marginLeft: 5 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              }
              iconHeight={15}
              minWidth={100}
            >
              {t("nhaThuoc.phat")}
            </Button>
          </Col>
        </Row>
      );
    } else if (
      //-----------------------------------------------------------------------------------------------------------------------------
      infoPatient?.phieuThu?.thanhToan &&
      infoPatient?.phieuXuat?.trangThai == 30
    ) {
      // đã phát và đã thanh toán
      let listChoHoan = infoPatient?.dsThuoc?.filter(
        (itemThuoc) => itemThuoc?.nbDichVu?.trangThaiHoan === 10
      ); // chờ hoàn
      let isDaHoan = infoPatient?.dsThuoc?.every(
        (itemThuoc) => itemThuoc?.nbDichVu?.trangThaiHoan === 30
      ); // đã hoàn
      let isHienThiBtnHoanThuoc = infoPatient?.dsThuoc?.every(
        (itemThuoc) => itemThuoc?.nbDichVu?.trangThaiHoan === 0
      ); // thường
      const renderHoanThuocButton = () => {
        if (isDaHoan) {
          // đã hoàn thành ko hiện cả 2 button hoàn và hủy hoàn
          return null;
        } else if (isHienThiBtnHoanThuoc) {
          // trạng thái hoàn = thường => hiển thị hoàn thuốc
          return (
            <Button
              type="primary"
              onClick={onHoanThuoc}
              rightIcon={
                <img
                  style={{ marginLeft: 5 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              }
              iconHeight={15}
              minWidth={"100px"}
            >
              {t("nhaThuoc.hoanThuoc")}
            </Button>
          );
        } else if (listChoHoan?.length > 0) {
          // hủy hoàn
          return (
            <Button
              type="primary"
              onClick={() => onHuyHoanThuoc(listChoHoan)}
              rightIcon={
                <img
                  style={{ marginLeft: 5 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              }
              iconHeight={15}
              minWidth={"100px"}
            >
              {t("nhaThuoc.huyHoanThuoc")}
            </Button>
          );
        } else {
          return null;
        }
      };
      return (
        <Row className="select-row-last">
          {renderHoanThuocButton()}
          <Button
            type="primary"
            onClick={onHuyPhat}
            rightIcon={
              <img
                style={{ marginLeft: 5 }}
                src={require("assets/images/kho/save.png")}
                alt=""
              ></img>
            }
            iconHeight={15}
            minWidth={"100px"}
          >
            {t("nhaThuoc.huyPhat")}
          </Button>
        </Row>
      );
    } else {
      // ----------------------------------------------------------------
      if (isThemMoi || isAdvised) {
        // thêm mới hoặc nhấn button tư vấn
        return (
          <Row className="select-row-last">
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
              {t("common.luu")} [F4]
            </Button>
          </Row>
        );
      } else if (
        //-----------------------------------------------------------------------------------------------------------------------------
        !infoPatient?.phieuThu?.thanhToan &&
        (infoPatient?.phieuXuat?.trangThai === 10 ||
          infoPatient?.phieuXuat?.trangThai === 15 ||
          infoPatient?.phieuXuat?.trangThai === 20)
      ) {
        // TT đơn = Tạo mới & TT thanh toán = chưa thanh toán => Hiển thị button Thanh toán , Tư vấn đơn

        return (
          <Row className="select-row-last">
            {isVangLai && (
              <Col span={10}>
                <Button
                  type="primary"
                  onClick={onSave}
                  rightIcon={
                    <img
                      style={{ marginLeft: 5 }}
                      src={require("assets/images/kho/save.png")}
                      alt=""
                    ></img>
                  }
                  iconHeight={15}
                  minWidth={"100%"}
                >
                  {t("common.luu")} [F4]
                </Button>
              </Col>
            )}
            <Col span={isVangLai && isThemMoi ? 24 : 13}>
              <Button
                type="primary"
                onClick={onThanhToan}
                rightIcon={
                  <img
                    style={{ marginLeft: 5 }}
                    src={require("assets/images/kho/pay.png")}
                    alt=""
                  ></img>
                }
                iconHeight={15}
                minWidth={"100%"}
              >
                {t("nhaThuoc.thanhToan")} [F12]
              </Button>
            </Col>
            {!isVangLai && ( // người bệnh nội trú (không phải vãng lai) mới hiện UI
              <Col span={10}>
                <Button
                  type="primary"
                  onClick={onTuVanDon}
                  rightIcon={
                    <img
                      style={{ marginLeft: 5 }}
                      src={require("assets/images/kho/advise.png")}
                      alt=""
                    ></img>
                  }
                  iconHeight={15}
                  minWidth={"100%"}
                >
                  {t("nhaThuoc.tuVanDon")}
                </Button>
              </Col>
            )}
          </Row>
        );
      }
    }
  };
  const onPrintDonThuoc = () => {
    inDonThuoc({
      nbDotDieuTriId:
        infoPatient?.nbDotDieuTriId || infoPatient?.nbDotDieuTri?.id,
      phieuNhapXuatId: infoPatient?.phieuXuat?.id,
    });
  };
  const onPrintPhieuThu = () => {
    inPhieuThuNhaThuoc({ id: nguoiBenhId });
  };

  const onPrintPhieuHoan = () => {
    inPhieuHoanDoiTra({
      nbDotDieuTriId: infoPatient?.nbDotDieuTriId,
      phieuThuId: infoPatient?.phieuThu?.id,
    }).then((s) => {
      printProvider.printPdf(s);
    });
  };
  const contentPrint = () => {
    return (
      <div className="">
        <p className="title-child" onClick={onPrintDonThuoc}>
          {t("nhaThuoc.inDonThuoc")}
        </p>
        <p className="title-child" onClick={onPrintPhieuThu}>
          {t("nhaThuoc.inPhieuThu")}
        </p>
        <p className="title-child" onClick={onPrintPhieuHoan}>
          {t("phieuIn.inPhieuHoan")}
        </p>
      </div>
    );
  };
  let khoOption = useMemo(() => {
    let options = listKhoUser?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listKhoUser]);

  const onChangeThoiGian = (key) => (e) => {
    let value = "";
    if (e?._d) {
      value = e?._d;
    } else {
      value = e;
    }
    setState({ [key]: value });
  };

  const onSaveThoiGian = () => {
    updateThoiGianPhat({
      id: id,
      thoiGianThanhToan:
        state?.thoiGianThanhToan &&
        moment(state?.thoiGianThanhToan).format("DD-MM-YYYY HH:mm:ss"),
      thoiGianDuyet:
        state?.thoiGianDuyet &&
        moment(state?.thoiGianDuyet).format("DD-MM-YYYY"),
      nguoiDuyetId: state?.nguoiDuyetId,
      thuNganId: state?.thuNganId,
    }).then(() => {
      setState({
        editTimeDuyet: false,
        editTimeThanhToan: false,
        editNguoiDuyet: false,
        editThuNgan: false,
      });
      searchDonThuoc(id);
    });
  };

  return (
  <>
    <Card className={`${className}`}>
      <Main
        md={24}
        xl={24}
        xxl={24}
        className="container"
        isThemMoi={isThemMoi}
        id="nha-thuoc-chi-tiet-right-container"
      >
        <div className="info">
          <GlobalStyle />
          <div className="title">{t("nhaThuoc.thongTinDonThuoc")}</div>
          <div
            style={{
              display: !isThemMoi ? "flex" : "unset",
              alignItems: !isThemMoi ? "center" : "unset",
              justifyContent: !isThemMoi ? "space-between" : "unset",
            }}
          >
            <div
              className={
                infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
              }
            >
              {t("nhaThuoc.khoBan")}
            </div>
            <Row
              className="select-row-1"
              style={{ marginBottom: !isThemMoi ? 0 : "unset" }}
            >
              {isThemMoi ? (
                <SelectAntd
                  onChange={onChange("khoId")}
                  value={state.khoId}
                  // value={state.loaiDichVu}
                  placeholder={"Chọn kho bán thuốc"}
                  // data={listDataNhanVienKhoCustom}
                  // value={state.khoId || listKhoUser[0]?.id}
                >
                  {khoOption}
                </SelectAntd>
              ) : (
                infoPatient && infoPatient?.phieuXuat?.kho?.ten
              )}
            </Row>
          </div>

          <Row className="select-row-2">
            <div className="title-item" style={{ fontSize: 20 }}>
              <b>{t("nhaThuoc.tongTien")}</b>
            </div>
            <div className="title-item" style={{ fontSize: 20 }}>
              <b>{tongTien && tongTien?.formatPrice()}</b>
            </div>
          </Row>

          <Row className="select-row-2">
            <div
              className="title-item"
              style={{ color: "#0762F7" }}
              onClick={() => {
                refModalDiscount.current.show();
              }}
            >
              <img src={require("assets/images/kho/discount.png")} alt=""></img>
              <span style={{ marginLeft: 6 }}>{t("nhaThuoc.chietKhau")}</span>
            </div>
            <div className="title-item">
              {infoPatient?.phieuThu?.tienMienGiam?.formatPrice()}
            </div>
          </Row>

          <Row className="select-row-2">
            <div className="title-item" style={{ fontSize: 20 }}>
              <b>{t("nhaThuoc.thanhTien")}</b>
            </div>
            <div className="title-item" style={{ fontSize: 20 }}>
              <b>
                {infoPatient?.phieuThu?.thanhTien &&
                  infoPatient?.phieuThu?.thanhTien?.formatPrice()}
              </b>
            </div>
          </Row>

          <Row>
            <div
              xxl={24}
              className={
                infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
              }
            >
              {t("nhaThuoc.ghiChu")}
            </div>
            <textarea
              className="textarea"
              // defaultValue={selectedDonThuoc?.nbDichVu?.ghiChu}
              onChange={onChange("ghiChu")}
              defaultValue={infoPatient?.phieuXuat?.ghiChu}
              onBlur={(e) => {
                if (isThemMoi) {
                } else {
                  updateGhiChuDonThuocById({
                    id: nguoiBenhId,
                    phieuXuatId: nguoiBenhId,
                    phieuXuat: { ghiChu: e.target.value },
                  });
                }
              }}
            ></textarea>
          </Row>

          <Row>
            <div
              className={
                infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
              }
            >
              {t("nhaThuoc.trangThaiDon")}:
              {` ${
                infoPatient?.phieuXuat?.trangThai
                  ? listTrangThaiDonThuocNhaThuoc?.find(
                      (item) => item.id === infoPatient?.phieuXuat?.trangThai
                    )?.ten
                  : ""
              }`}
            </div>
          </Row>
          {!infoPatient?.phieuThu?.thanhToan && (
            <Row>
              <div
                className={
                  infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
                }
              >
                {t("nhaThuoc.trangThaiThanhToan")}:
                <span
                  style={{
                    color: !infoPatient?.phieuThu?.thanhToan
                      ? "red"
                      : "#049254",
                  }}
                >
                  {` ${
                    !infoPatient?.phieuThu?.thanhToan
                      ? t("nhaThuoc.chuaThanhToan")
                      : t("nhaThuoc.daThanhToan")
                  }`}
                </span>
              </div>
            </Row>
          )}
          <Row>
            <div
              className={
                infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
              }
            >
              {t("nhaThuoc.ngayPhat")}:{" "}
              <span>
                {state?.editTimeDuyet ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <DatePicker
                      showTime
                      placeholder="Chọn ngày"
                      format="DD/MM/YYYY"
                      value={moment(state?.thoiGianDuyet)}
                      onChange={onChangeThoiGian("thoiGianDuyet")}
                    />
                    &emsp;
                    <SaveOutlined onClick={onSaveThoiGian} />
                  </div>
                ) : (
                  infoPatient?.phieuXuat?.thoiGianDuyet &&
                  moment(infoPatient?.phieuXuat?.thoiGianDuyet).format(
                    "DD/MM/YYYY"
                  )
                )}
                {infoPatient?.phieuXuat?.thoiGianDuyet &&
                  !state?.editTimeDuyet && (
                    <AuthWrapper
                      accessRoles={[ROLES["NHA_THUOC"].SUA_THOI_GIAN_DUYET]}
                    >
                      &emsp;
                      <EditOutlined
                        onClick={() => {
                          setState({
                            thoiGianDuyet:
                              infoPatient?.phieuXuat?.thoiGianDuyet,
                            editTimeDuyet: true,
                          });
                        }}
                      />
                    </AuthWrapper>
                  )}
              </span>
            </div>
          </Row>
          <Row>
            <div
              className={
                infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
              }
            >
              {t("nhaThuoc.nguoiPhat")}:{" "}
              <div>
                {state?.editNguoiDuyet ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Select
                      value={state?.nguoiDuyetId}
                      onChange={onChangeThoiGian("nguoiDuyetId")}
                      data={listAllNhanVien}
                    />
                    &emsp;
                    <SaveOutlined onClick={onSaveThoiGian} />
                  </div>
                ) : (
                  infoPatient?.phieuXuat?.nguoiDuyet?.ten &&
                  infoPatient?.phieuXuat?.nguoiDuyet?.ten
                )}
                {infoPatient?.phieuXuat?.nguoiDuyetId &&
                  !state?.editNguoiDuyet && (
                    <AuthWrapper
                      accessRoles={[ROLES["NHA_THUOC"].SUA_THOI_GIAN_DUYET]}
                    >
                      &emsp;
                      <EditOutlined
                        onClick={() => {
                          setState({
                            nguoiDuyetId: infoPatient?.phieuXuat?.nguoiDuyetId,
                            editNguoiDuyet: true,
                          });
                        }}
                      />
                    </AuthWrapper>
                  )}
              </div>
            </div>
          </Row>
          <Row>
            <div
              className={
                infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
              }
            >
              {t("nhaThuoc.soPhieu")}: {infoPatient?.phieuXuat?.soPhieu}
            </div>
          </Row>
          <Row>
            <div
              className={
                infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
              }
            >
              {t("nhaThuoc.trangThaiHoan")}:
              {
                listTrangThaiHoan?.find(
                  (item) =>
                    item.id === selectedDonThuoc?.nbDichVu?.trangThaiHoan
                )?.ten
              }
            </div>
          </Row>
          {infoPatient?.phieuThu?.thanhToan && (
            <div>
              <hr className="hr" />
              <Row className="row_paid">
                <div
                  className={
                    infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
                  }
                >
                  {t("nhaThuoc.trangThaiThanhToan")}:
                  <span
                    style={{
                      color: !infoPatient?.phieuThu?.thanhToan
                        ? "red"
                        : "#049254",
                    }}
                  >
                    {` ${
                      !infoPatient?.phieuThu?.thanhToan
                        ? t("nhaThuoc.chuaThanhToan")
                        : t("nhaThuoc.daThanhToan")
                    }`}
                  </span>
                </div>
              </Row>
              <Row className="row_paid">
                <div
                  className={
                    infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
                  }
                >
                  {t("nhaThuoc.tenThuNgan")}:
                </div>
                <div>
                  {state?.editThuNgan ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Select
                        value={state?.thuNganId}
                        onChange={onChangeThoiGian("thuNganId")}
                        data={listAllNhanVien}
                      />
                      &emsp;
                      <SaveOutlined onClick={onSaveThoiGian} />
                    </div>
                  ) : (
                    infoPatient?.phieuThu?.tenThuNgan
                  )}
                  {infoPatient?.phieuThu?.thuNganId && !state?.editThuNgan && (
                    <AuthWrapper
                      accessRoles={[ROLES["NHA_THUOC"].SUA_THOI_GIAN_DUYET]}
                    >
                      &emsp;
                      <EditOutlined
                        onClick={() => {
                          setState({
                            thuNganId: infoPatient?.phieuThu?.thuNganId,
                            editThuNgan: true,
                          });
                        }}
                      />
                    </AuthWrapper>
                  )}
                </div>
              </Row>
              <div className="row_paid">
                <div
                  className={
                    infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
                  }
                >
                  {t("nhaThuoc.tgThanhToan")}:
                </div>
                <div>
                  {state?.editTimeThanhToan ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <DatePicker
                        showTime
                        placeholder="Chọn ngày"
                        format="hh:mm - DD/MM/YYYY"
                        value={moment(state?.thoiGianThanhToan)}
                        onChange={onChangeThoiGian("thoiGianThanhToan")}
                      />
                      &emsp;
                      <SaveOutlined onClick={onSaveThoiGian} />
                    </div>
                  ) : (
                    infoPatient?.phieuThu?.thoiGianThanhToan &&
                    moment(infoPatient?.phieuThu?.thoiGianThanhToan).format(
                      "hh:mm - DD/MM/YYYY"
                    )
                  )}
                  {infoPatient?.phieuThu?.thoiGianThanhToan &&
                    !state?.editTimeThanhToan && (
                      <AuthWrapper
                        accessRoles={[ROLES["NHA_THUOC"].SUA_THOI_GIAN_DUYET]}
                      >
                        &emsp;
                        <EditOutlined
                          onClick={() => {
                            setState({
                              thoiGianThanhToan:
                                infoPatient?.phieuThu?.thoiGianThanhToan,
                              editTimeThanhToan: true,
                            });
                          }}
                        />
                      </AuthWrapper>
                    )}
                </div>
              </div>
              <Row className="row_paid">
                <div
                  className={
                    infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
                  }
                >
                  {t("nhaThuoc.soPhieuThu")}:
                </div>
                <span>{infoPatient?.phieuThu?.soPhieu}</span>
              </Row>
              {infoPatient?.phieuThu?.dsPhuongThucTt?.map((item) => {
                return (
                  <Row className="row_paid">
                    <div
                      className={
                        infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"
                      }
                    >
                      <div>{item?.phuongThucTt?.ten}</div>
                      {item.maChuanChi && (
                        <div className="maChuanChi">
                          {t("nhaThuoc.maChuanChi")}
                        </div>
                      )}
                    </div>
                    <div className="row_paid_right">
                      <span>{item?.tongTien?.formatPrice()} đ</span>
                      {item.maChuanChi && (
                        <div className="maChuanChi">{item.maChuanChi}</div>
                      )}
                    </div>
                  </Row>
                );
              })}
            </div>
          )}
          <ModalDiscount ref={refModalDiscount} />
          <ModalPayment modalCheckoutRef={refModalNotification} />
          <ModalCancleSubmit ref={refWarningHuyPhat} />
          <ModalCanclePayment ref={refWarningHuyThanhToan} />
          <ModalHoanThuoc ref={refHoanThuoc} />
        </div>
      </Main>
    </Card>
    {renderButton()}
    {!isThemMoi && (
      <Popover
        content={contentPrint}
        overlayClassName="nha-thuoc-print-popover"
      >
        <div className="wrap-button">
          <div>
            <Button
              type="primary"
              iconHeight={15}
              minWidth={"100px"}
              // onClick={onPrint}
              rightIcon={
                <img 
                  style={{ marginLeft: 6 }} 
                  src={IcPrint} alt="" 
                />
              }
            >
              <span>{t("nhaThuoc.inGiayTo")}</span>
            </Button>
          </div>
        </div>
      </Popover>
    )}
  </>
  );
};

export default memo(ThongTinDonThuoc);
