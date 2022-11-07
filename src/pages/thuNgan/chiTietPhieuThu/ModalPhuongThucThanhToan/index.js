import React, {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Row, Checkbox, Col, Input } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import IconMoney from "assets/images/thuNgan/icMoney.svg";
import { firstLetterWordUpperCase } from "utils";
import { useTranslation } from "react-i18next";
import cacheUtils from "utils/cache-utils";
import printProvider from "data-access/print-provider";
import { useEnum, useLoading, useStore, useThietLap } from "hook";
import {
  ENUM,
  HOTKEY,
  THIET_LAP_CHUNG,
  TRANG_THAI_NB_GOI_DV,
} from "constants/index";
import { ModalTemplate, Button, Select } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import PhuongThucThanhToan from "pages/goiDichVu/ChiTietNguoiBenhSuDungGoi/ModalThemMoiPhieuThuThanhToan/PhuongThucThanhToan";
const ModalPhuongThucThanhToan = (props, ref) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const { listAllPhuongThucThanhToan } = useSelector(
    (state) => state.phuongThucTT
  );
  const { listNbGoiDv } = useSelector((state) => state.nbGoiDv);
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan");
  const { tienTamUng, tienHoanUng } = useStore("nbDotDieuTri.data");

  const [state, _setState] = useState({
    isTamUng: false,
    dsPhuongThucTt: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    dsHoaDonDienTu: { getFileHoaDon },
    thuNgan: { thanhToanPhieuThu },
    phuongThucTT: { getListAllPhuongThucThanhToan },
  } = useDispatch();

  useEffect(() => {
    if (tienTamUng - tienHoanUng > 0 && state?.show) {
      setState({ isTamUng: true });
    }
  }, [tienTamUng, tienHoanUng, state?.show]);

  useEffect(() => {
    //NB thuộc 1 trong các loại đối tượng KCB: Điều trị ngoại trú, điều trị nội trú, điều trị nội trú ban ngày
    //Có tồn tại bản ghi tạm ứng chưa hoàn tạm ứng
    //Loại phiếu thu khác thu ngoài ( giá trị:5)
    if (
      tienTamUng - tienHoanUng > 0 &&
      state.loaiPhieuThu != 5 &&
      [2, 3, 4].includes(state.doiTuongKcb) &&
      state?.show
    ) {
      setState({ isTamUng: true });
    }
  }, [
    tienTamUng,
    tienHoanUng,
    state.loaiPhieuThu,
    state.doiTuongKcb,
    state?.show,
  ]);

  const tienMatObj = useMemo(
    () => listAllPhuongThucThanhToan.find((item) => item?.tienMat),
    [listAllPhuongThucThanhToan]
  );

  const dsNbGoiDv = useMemo(() => {
    return listNbGoiDv.filter(
      (item) =>
        ![
          TRANG_THAI_NB_GOI_DV.DUNG_SU_DUNG,
          TRANG_THAI_NB_GOI_DV.KET_THUC,
        ].includes(item.trangThai)
    );
  }, [listNbGoiDv]);
  useEffect(() => {
    setState({ nbGoiDvId: dsNbGoiDv[0]?.id });
  }, [dsNbGoiDv]);

  const [dataInPhieuHoanKhiThanhToan] = useThietLap(
    THIET_LAP_CHUNG.IN_PHIEU_HOAN_KHI_THANH_TOAN
  );
  const [dataPhatHanhHoaDonKhiThanhToan] = useThietLap(
    THIET_LAP_CHUNG.PHAT_HANH_HOA_DON_KHI_THANH_TOAN
  );
  const [dataInPhieuThuKhiThanhToan] = useThietLap(
    THIET_LAP_CHUNG.IN_PHIEU_THU_KHI_THANH_TOAN
  );

  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const gioiTinh = useMemo(() => {
    return (
      listGioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {}
    );
  }, [listGioiTinh, thongTinBenhNhan]);

  useEffect(() => {
    if (state.show) getListAllPhuongThucThanhToan({ page: "", size: "" });
  }, [state.show]);

  useImperativeHandle(ref, () => ({
    show: (
      {
        tongTien,
        phieuThuId,
        nbDotDieuTriId,
        maChuanChi,
        nhaTamUngId,
        loaiPhieuThu,
        doiTuongKcb,
      },
      callback
    ) => {
      setState({
        phieuThuId,
        nbDotDieuTriId,
        maChuanChi,
        tongTien,
        dsPhuongThucTt: {},
        isTamUng: false,
        show: true,
        tamUngLieuTrinh: false,
        nhaTamUngId,
        loaiPhieuThu,
        doiTuongKcb,
      });
      refCallback.current = callback;
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOk = (isOk) => async () => {
    if (isOk) {
      let tongTienPTTT = tienPTTT; // Tổng tiền các PTTT
      if (tongTienPTTT >= state.tongTien) {
        try {
          showLoading();
          let tongTien2 = 0;
          const payload = Object.keys(state.dsPhuongThucTt).map((key) => {
            let tienPhuongThucTT = 0;
            if (key == tienMatObj?.id) {
              let tongTienPTTKhac =
                tongTienPTTT - state.dsPhuongThucTt[key].tongTien;
              tienPhuongThucTT =
                state.tongTien < tongTienPTTKhac
                  ? 0
                  : state.tongTien - tongTienPTTKhac || 0;
            } else {
              tienPhuongThucTT = state.dsPhuongThucTt[key].tongTien || 0;
            }
            if (state.tamUngLieuTrinh) {
              if (tongTien2 + tienPhuongThucTT > state.tongTien) {
                tienPhuongThucTT = state.tongTien - tongTien2;
                tongTien2 = state.tongTien;
              } else {
                tongTien2 += tienPhuongThucTT;
              }
            }
            return {
              phuongThucTtId: key,
              tongTien: tienPhuongThucTT,
              maChuanChi: state.dsPhuongThucTt[key].maChuanChi,
            };
          });
          const res = await thanhToanPhieuThu({
            id: state.phieuThuId,
            dsPhuongThucTt: payload,
            nbDotDieuTriId: state.nbDotDieuTriId,
            nhaThuNganId: state.nhaTamUngId,
            hoanUng: state.isTamUng ? true : null,
            tongTien: state.tongTien,
            tongTienPTTT,
            nbGoiDvId: state.nbGoiDvId,
            tamUngLieuTrinh: state.tamUngLieuTrinh,
            inPhieuHoanKhiThanhToan:
              (dataInPhieuHoanKhiThanhToan || "").toLowerCase() === "true",
            inPhieuThuKhiThanhToan:
              (dataInPhieuThuKhiThanhToan || "").toLowerCase() === "true",
          });

          if (res) {
            if (dataPhatHanhHoaDonKhiThanhToan === "true") {
              getFileHoaDon({ id: res.hoaDonId }).then((s) => {
                var w = window.open(
                  "",
                  "",
                  "_blank visible=none width=1000, height=600,left=300,top=100 menubar=no, status=no, location=no, resizable=yes, scrollbars=yes"
                );
                w.document.write(s);
                setTimeout(() => {
                  w.print();
                }, 1000);
              });
            }
          }
        } catch (error) {
          return;
        } finally {
          hideLoading();
        }
      }
      refCallback.current &&
        refCallback.current({
          tienDaNhan: isTamUngVaThieuTamUng
            ? tongTienPTTT + tienTamUngConLai
            : tongTienPTTT,
          tongTien: state.tongTien,
          dsPhuongThucTt: state.dsPhuongThucTt,
          hoanUng: state.isTamUng ? true : null,
        });
      onOk(false)();
    } else {
      setState({ show: false });
    }
  };
  useEffect(() => {
    if (state.tongTien && state.show) {
      const id = listAllPhuongThucThanhToan.find((item) => item.tienMat)?.id;
      setState({ dsPhuongThucTt: { [id]: { tongTien: state.tongTien } } });
    }
  }, [state.tongTien, listAllPhuongThucThanhToan, state.show]);

  const tienPTTT = useMemo(() => {
    let total = 0;
    Object.keys(state.dsPhuongThucTt).forEach((ifp) => {
      total += state.dsPhuongThucTt[ifp].tongTien || 0;
    });
    return Math.round(total * 100) / 100;
  }, [state.dsPhuongThucTt]);

  const tienNbDua = useMemo(() => {
    if (state.isTamUng && tienTamUng - tienHoanUng - state.tongTien > 0) {
      return 0;
    } else {
      return tienPTTT;
    }
  }, [state.isTamUng, tienTamUng, tienHoanUng, state.tongTien, tienPTTT]);

  const tongTienTamUng = useMemo(() => {
    return tienNbDua + (tienTamUng - tienHoanUng) - state.tongTien;
  }, [tienNbDua, tienTamUng, tienHoanUng, state.tongTien]);

  const tienTraLaiNb = useMemo(() => {
    if (state.tamUngLieuTrinh) return 0;
    if (state.isTamUng) return tongTienTamUng;
    let amountReturn = 0;
    let tongTienPhuongThucTT = tienPTTT;
    amountReturn =
      state.tongTien < tongTienPhuongThucTT
        ? tongTienPhuongThucTT - state.tongTien
        : 0;

    return Math.round(amountReturn * 100) / 100;
  }, [tienPTTT, state.tamUngLieuTrinh, state.isTamUng, tongTienTamUng]);

  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOk(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOk(true)();
      },
    },
  ];
  const nbGoiDv = useMemo(() => {
    return dsNbGoiDv.find((item) => item.id == state.nbGoiDvId);
  }, [state.tamUngLieuTrinh, state.nbGoiDvId, dsNbGoiDv]);

  const tienSauGiamGia = useMemo(() => {
    return (
      (nbGoiDv?.tongTien || 0) -
      (nbGoiDv?.tienMienGiamDichVu || 0) -
      (nbGoiDv?.tienMienGiamGoiDv || 0) -
      (nbGoiDv?.tienGiamGia || 0)
    );
  }, [nbGoiDv]);

  const soTienPhaiGoiThanhToan = useMemo(() => {
    return tienSauGiamGia - (nbGoiDv?.tienDaThanhToan || 0);
  }, [tienSauGiamGia, nbGoiDv]);

  const onChangePhuongThucThanhToan = (dsPhuongThucTt) => {
    setState({ dsPhuongThucTt: { ...dsPhuongThucTt } });
  };
  const soTienTTGoi = useMemo(() => {
    return tienPTTT - state.tongTien;
  }, [tienPTTT, state.tongTien]);

  const tienTamUngConLai = useMemo(() => {
    return !state.isTamUng ? tienTamUng || 0 : tienTamUng - tienHoanUng || 0;
  }, [state.isTamUng, tienTamUng, tienHoanUng]);

  const tienHoanUngThanhToan = useMemo(() => {
    return !state.isTamUng ? tienTamUng || 0 : tienTamUng - tienHoanUng || 0;
  }, [state.isTamUng, tienTamUng, tienHoanUng]);

  const tienThuThemNb = useMemo(() => {
    return (state.tongTien || 0) - (tienTamUngConLai || 0);
  }, [state.tongTien, tienTamUngConLai]);

  const isTamUngVaThieuTamUng = useMemo(() => {
    return (
      state.isTamUng &&
      (state.tongTien || 0) - (tienTamUng - tienHoanUng || 0) >= 0
    );
  }, [state.isTamUng, state.tongTien, tienTamUng]);

  const onChangeGoi = (value) => {
    setState({ nbGoiDvId: value });
  };
  return (
    <ModalTemplate
      width={800}
      ref={refModal}
      title={t("thuNgan.phuongThucThanhToan")}
      onCancel={onOk(false)}
      closable={false}
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {thongTinBenhNhan.tuoi && (
            <span className="normal-weight">
              - {thongTinBenhNhan?.tuoi} {t("common.tuoi")}
            </span>
          )}
        </>
      }
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
        >
          {t("common.quayLai")} [ESC]
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<IconMoney className="btn-checkout__icon" />}
          iconHeight={15}
          onClick={onOk(true)}
        >
          {t("common.xacNhan")} [F4]
        </Button>
      }
      hotKeys={hotKeys}
    >
      <Main>
        <div className="thong-tin-phieu-thu">
          <div className="box-left">
            {isTamUngVaThieuTamUng ? (
              <>
                <div className="info-price">
                  <div className="info-price__title">
                    {"Số tiền cần thu thêm"}
                  </div>
                  <div className="info-price__detail">
                    {(tienThuThemNb || 0).formatPrice()}đ
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="info-price">
                  <div className="info-price__title">
                    {t("thuNgan.tienNbDua")}
                  </div>
                  <div className="info-price__detail">
                    {tienNbDua.formatPrice()} đ
                  </div>
                </div>
                <div className="info-price">
                  <div className="info-price__title">
                    {t("thuNgan.tienMatTraLai")}
                  </div>
                  <div className="info-price__detail">
                    {tienTraLaiNb.formatPrice()}đ
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="box-right">
            <div className="info-price">
              <div className="info-price__title">
                {t("thuNgan.soTienPhieuThu")}
              </div>
              <div className="info-price__detail">
                {(state.tongTien || 0).formatPrice()} đ
              </div>
            </div>
            <div className="info-price">
              <div className="info-price__title">
                {t("thuNgan.tienTamUngConLai")}
              </div>
              <div className="info-price__detail">
                {tienTamUngConLai.formatPrice()}đ
              </div>
            </div>
            {!isTamUngVaThieuTamUng && (
              <div className="info-price">
                <div className="info-price__title">
                  {t("thuNgan.tienHoanTamUng")}
                </div>
                <div className="info-price__detail">
                  {tienHoanUngThanhToan.formatPrice()}đ
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          {!!dsNbGoiDv?.length && (
            <div>
              <Checkbox
                style={{ paddingTop: "15px" }}
                onChange={() =>
                  setState({ tamUngLieuTrinh: !state.tamUngLieuTrinh })
                }
                checked={state.tamUngLieuTrinh}
              >
                {t("thuNgan.tamUngGoiLieuTrinh")}
              </Checkbox>
              {state.tamUngLieuTrinh && (
                <Row className="row-box" gutter={[8, 8]}>
                  <Col span={12}>
                    <div className="row-label">{`${t("thuNgan.chonGoi")}`}</div>

                    <Select
                      placeholder={t("thuNgan.chonGoi")}
                      data={dsNbGoiDv}
                      ten={"tenGoiDv"}
                      value={state.nbGoiDvId}
                      onChange={onChangeGoi}
                    ></Select>
                  </Col>
                  <Col span={12}>
                    {t("thuNgan.tongTienGoiPhaiNop")}:{" "}
                    {soTienPhaiGoiThanhToan?.formatPrice()}đ
                  </Col>
                  <Col span={12}>
                    <div className="row-label">{`${t(
                      "thuNgan.soTienTTGoi"
                    )}`}</div>

                    <Input
                      disabled={true}
                      className="soTienThanhToanGoi"
                      value={soTienTTGoi?.formatPrice()}
                    />
                  </Col>
                  <Col span={12}>
                    {t("thuNgan.tongTienPhaiNop")}:{" "}
                    {(soTienPhaiGoiThanhToan + state.tongTien)?.formatPrice()}đ
                  </Col>
                </Row>
              )}
            </div>
          )}
        </div>
        <div className="text-note">
          <b>{t("common.luuY")}:</b> {t("thuNgan.qrPayMoMoKhongTheThanhToan")}
        </div>
        <PhuongThucThanhToan
          onChange={onChangePhuongThucThanhToan}
          dsPhuongThucTt={state.dsPhuongThucTt}
        />
        <Checkbox
          style={{ paddingTop: "15px" }}
          onChange={() => setState({ isTamUng: !state.isTamUng })}
          checked={state.isTamUng}
        >
          {t("thuNgan.coHoanTamUng")}
        </Checkbox>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalPhuongThucThanhToan);
