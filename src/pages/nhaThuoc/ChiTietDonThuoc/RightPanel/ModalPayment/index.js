import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalCheckout from "components/ModalCheckout";
import { formatDecimal } from "utils";
import { Main, ButtonWrapper } from "./styled";
import { Col, Row, Input, message, Form } from "antd";
import NumberFormat from "react-number-format";
import { GIOI_TINH_BY_VALUE } from "constants/index";
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";
import cacheUtils from "utils/cache-utils";

const ModalPayment = ({ modalCheckoutRef }) => {
  const [form] = Form.useForm();
  const { dsPhuongThucTt, infoPatient, nguoiBenhId } = useSelector(
    (state) => state.thuocChiTiet
  );
  const { phieuThu } = infoPatient || {};
  const { thanhTien } = phieuThu || {};
  const {
    thuocChiTiet: { postThanhToan, inPhieuThuNhaThuoc },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const refLayerHotKey = useRef(stringUtils.guid());
  const refF4 = useRef();

  const [state, _setState] = useState({
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    async function fetchData() {
      let nhaTamUng = await cacheUtils.read(
        "DATA_NHA_THUOC_NHA_TAM_UNG",
        "",
        null,
        false
      );
      setState({ nhaTamUngId: nhaTamUng });
    }
    fetchData();
    // đăng ký phím tắt
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: () => {
            refF4.current && refF4.current();
          },
        },
        {
          keyCode: 27, //ESC
          onEvent: () => {
            if (modalCheckoutRef.current) modalCheckoutRef.current.close();
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
 
  const [infoPrice, setInfoPrice] = useState({});

  const tienMatObj = useMemo(() => {
    if (dsPhuongThucTt && thanhTien) {
      let item = dsPhuongThucTt?.find((item) => item?.tienMat);
      setInfoPrice({
        [item.id]: {
          tongTien: thanhTien,
        },
      });
      return item;
    }
    return null;
  }, [dsPhuongThucTt, thanhTien]);
  //handle
  const cancelHandler = () => {
    modalCheckoutRef.current.close();
  };
  const submitHandler = () => {
    let tongTienPTTT = totalPatientPayment(); // Tổng tiền các PTTT
    // if (isReturn) {
    //   tongTienPTTT += tienTamUng;
    // }
    // modalPayMethodRef.current.close();

    if (tongTienPTTT >= thanhTien) {
      const payload = Object.keys(infoPrice).map((key) => {
        let tienPhuongThucTT = 0;
        if (key == tienMatObj?.id) {
          let tongTienPTTKhac = tongTienPTTT - infoPrice[key].tongTien;
          tienPhuongThucTT =
            thanhTien < tongTienPTTKhac ? 0 : thanhTien - tongTienPTTKhac;
        } else {
          tienPhuongThucTT = infoPrice[key].tongTien || 0;
        }
        return {
          phuongThucTtId: key,
          tongTien: tienPhuongThucTT,
          maChuanChi: infoPrice[key].maChuanChi,
        };
      });
      const filterPayload = payload.filter((itemO) => {
        return itemO.tongTien || itemO.tongTien === 0;
      });
      postThanhToan(
        { id: nguoiBenhId, dsPhuongThucTt: filterPayload, nhaThuNganId: state?.nhaTamUngId },
        infoPrice
      ).then((res) => {
        modalCheckoutRef.current.close();
        inPhieuThuNhaThuoc({
          id: infoPatient?.phieuXuatId || infoPatient?.phieuXuat?.id,
        });
      });
    } else {
      message.error("Số tiền NB đưa nhỏ hơn Tiền phải trả.");
      // updateData({
      //   tienThanhToanDv: tongTien,
      //   tienDaNhan: tongTienPTTT,
      //   infoPrice,
      // });
      // modalPayServiceRef.current.show();
    }
  };
  refF4.current = submitHandler;

  const totalPatientPayment = () => {
    let total = 0;
    Object.keys(infoPrice).forEach((ifp) => {
      total += infoPrice[ifp].tongTien || 0;
    });
    return Math.round(total * 100) / 100;
  };

  const calcalatorPriceOfPatient = () => {
    return totalPatientPayment();
  };
  const handleChange = (ds, key) => (value) => {
    let data = infoPrice[ds.id] || {};
    setInfoPrice({
      ...infoPrice,
      [ds.id]: {
        ...data,
        [key]: key === "tongTien" ? value?.floatValue : value.target.value,
      },
    });
  };

  const calculatorPatientPay = () => {
    // return (tongTien - tienTamUng);
    return thanhTien;
  };

  const calculatorPriceReturn = () => {
    let amountReturn = 0;
    let tongTienPhuongThucTT = totalPatientPayment();
    // if (isReturn) {
    //   if (tienTamUng >= tongTien) {
    //     return tienTamUng - tongTien;
    //   } else {
    //     amountReturn = tongTienPhuongThucTT - tongTien + tienTamUng >= 0
    //       ? tongTienPhuongThucTT - tongTien + tienTamUng
    //       : 0;
    //   }
    // } else {
    amountReturn =
      thanhTien < tongTienPhuongThucTT ? tongTienPhuongThucTT - thanhTien : 0;
    // }
    return Math.round(amountReturn * 100) / 100;
  };

  return (
    <ModalCheckout
      titleHeader="Phương thức thanh toán"
      subTitleHeader={
        <>
          <span style={{ fontSize: 14, fontWeight: "normal" }}>
            {infoPatient?.nbDotDieuTri?.tenNb}
            {`- ${
              infoPatient?.nbDotDieuTri?.gioiTinh
                ? GIOI_TINH_BY_VALUE[infoPatient?.nbDotDieuTri?.gioiTinh]
                : ""
            }
            - ${
              infoPatient?.nbDotDieuTri?.tuoi
                ? `${infoPatient?.nbDotDieuTri?.tuoi} tuổi`
                : ""
            }`}
          </span>
        </>
      }
      ref={modalCheckoutRef}
      // disabledBtnNext={thongTinPhieuThu.thanhToan || state.disabledBtnNext}
      borderButtonBack={"1px solid gray"}
      titleBtnNext={
        <ButtonWrapper>
          Xác nhận thanh toán{" "}
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/pay.png")}
            alt=""
          ></img>
        </ButtonWrapper>
      }
      width={800}
      // className={"main_custom"}
      // destroyOnClose
      onClickBack={cancelHandler}
      onClickNext={submitHandler}
    >
      <Main>
        <Row>
          <Col xs={{ span: 11 }}>
            <div className="box-right">
              {/* <div className="info-price">
                <div className="info-price__title">Tiền hoàn ứng</div>
                <div className="info-price__detail">
                  {isReturn && tienTamUng ? tienTamUng.formatPrice() : 0} đ
                </div>
              </div> */}
              {/* <div className="info-price">
                <div className="info-price__title">Tiền NB phải trả</div>
                <div className="info-price__detail">
                  {formatDecimal(calculatorPatientPay())} đ
                </div>
              </div> */}

              <div className="info-price">
                <div className="info-price__title">Tiền NB đưa</div>
                <div className="info-price__detail">
                  {formatDecimal(calcalatorPriceOfPatient())} đ
                </div>
              </div>
              <div className="info-price">
                <div className="info-price__title">Tiền mặt trả lại</div>
                <div className="info-price__detail">
                  {calculatorPriceReturn() &&
                    formatDecimal(calculatorPriceReturn())}{" "}
                  đ
                </div>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 11, offset: 1 }}>
            <div className="box-left">
              <div className="info-price">
                <div className="info-price__title">Số tiền phiếu thu</div>
                <div className="info-price__detail">
                  {/* {(tongTien || 0).formatPrice()} đ */}
                  {formatDecimal(calculatorPatientPay())} đ
                </div>
              </div>
              <div className="info-price">
                <div className="info-price__title">Tiền tạm ứng</div>
                <div className="info-price__detail">
                  {/* {!isReturn && tienTamUng ? tienTamUng.formatPrice() : 0} đ */}
                  0 đ
                </div>
              </div>
            </div>
            <div className="text-note">
              <b>Lưu ý:</b> QRPay, MoMo không thể thanh toán chung với phương
              thức thanh toán khác!
            </div>
          </Col>
        </Row>

        <Row>
          <div className="box-second" key={`${nguoiBenhId}`}>
            <Form form={form} layout="vertical" autoComplete="off">
              {dsPhuongThucTt
                ?.sort((a, b) => (a.uuTien || 0) - (b.uuTien || 0))
                .map((ds, idx) => {
                  return (
                    <div className="content" key={ds.id}>
                      <Form.Item name="use-reset-field">
                        <div className="input-box">
                          <div className="input-box__label">{ds.ten}</div>
                          <div className="input-box__wrap">
                            <NumberFormat
                              defaultValue={
                                ds?.tienMat ? calculatorPatientPay() : null
                              }
                              customInput={Input}
                              thousandSeparator="."
                              decimalSeparator=","
                              decimalScale={2}
                              onValueChange={handleChange(ds, "tongTien")}
                              value={infoPrice[ds.id]?.tongTien}
                              placeholder="Nhập số tiền"
                            />
                          </div>
                        </div>
                      </Form.Item>
                      {ds.loaiPhuongThucTt === 32 && (
                        <Form.Item name="use-reset-field">
                          <div className="input-box">
                            <div className="input-box__label">Mã chuẩn chi</div>
                            <div className="input-box__wrap">
                              <Input
                                onChange={handleChange(ds, "maChuanChi")}
                                value={infoPrice[ds.id]?.maChuanChi}
                                placeholder="Nhập mã chuẩn chi"
                              />
                            </div>
                          </div>
                        </Form.Item>
                      )}
                    </div>
                  );
                })}
            </Form>
          </div>
        </Row>
      </Main>
    </ModalCheckout>
  );
};

export default ModalPayment;
