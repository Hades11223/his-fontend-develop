import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalCheckout from "components/ModalCheckout";
import { formatDecimal } from "utils";
import { Main, ButtonWrapper } from "./styled";
import { Col, Row, Input, Form } from "antd";
import NumberFormat from "react-number-format";
import stringUtils from "mainam-react-native-string-utils";
import cacheUtils from "utils/cache-utils";
import { useTranslation } from "react-i18next";

const ModalThanhToanHopDong = ({ modalCheckoutRef }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  //redux
  const {
    hopDongKSK: { chiTietHopDong, dsPhuongThucTt, selectedPhieuThu },
  } = useSelector((state) => state);

  const {
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    hopDongKSK: {
      getPhuongThucTT,
      thanhToanKSK,
      getDsPhieuThu,
      getHopDong,
      updateData,
      thanhToanPhieuThu,
    },
  } = useDispatch();
  const [infoPrice, setInfoPrice] = useState({});

  const refLayerHotKey = useRef(stringUtils.guid());
  const refF4 = useRef();

  useEffect(() => {
    getPhuongThucTT({ page: 0, active: true, size: 1000 });

    onAddLayer({ layerId: refLayerHotKey.current });
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
    if (selectedPhieuThu) {
      let item = dsPhuongThucTt?.find((item) => item?.tienMat);
      setInfoPrice({
        ...infoPrice,
        [item.id]: {
          tongTien: selectedPhieuThu?.thanhTien,
        },
      });
    } else {
      setInfoPrice({});
    }
  }, [selectedPhieuThu, dsPhuongThucTt]);

  const tienPTTT = useMemo(() => {
    let total = 0;
    Object.keys(infoPrice).forEach((ifp) => {
      total += infoPrice[ifp].tongTien || 0;
    });
    return Math.round(total * 100) / 100;
  }, [infoPrice]);

  //handle
  const cancelHandler = async () => {
    await setInfoPrice({});
    await form.resetFields();
    updateData({ selectedPhieuThu: null });

    modalCheckoutRef.current.close();
  };
  const submitHandler = () => {
    const payload = Object.keys(infoPrice).map((key) => {
      return {
        phuongThucTtId: key,
        tongTien: infoPrice[key].tongTien || 0,
        maChuanChi: infoPrice[key].maChuanChi,
      };
    });
    const filterPayload = payload.filter((itemO) => {
      return itemO.tongTien || itemO.tongTien === 0;
    });

    function refreshList() {
      getHopDong(chiTietHopDong?.id);
      getDsPhieuThu(chiTietHopDong?.id);

      cancelHandler();
    }

    if (selectedPhieuThu) {
      thanhToanPhieuThu({
        id: selectedPhieuThu.id,
        dsPhuongThucTt: filterPayload,
        nhaThuNganId: state.nhaTamUng,
        hoanUng: null,
      }).then(() => {
        refreshList();
      });
    } else {
      thanhToanKSK(
        {
          hopDongKskId: chiTietHopDong?.id,
          dsPhuongThucTt: filterPayload,
          nhaThuNganId: state.nhaTamUng,
        },
        infoPrice
      ).then(() => {
        refreshList();
      });
    }
  };
  refF4.current = submitHandler;

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

  return (
    <ModalCheckout
      titleHeader="Thanh toán hợp đồng"
      subTitleHeader={
        <div
          style={{
            fontSize: 14,
            fontWeight: "normal",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "300px",
          }}
        >
          <span>{chiTietHopDong?.doiTac?.ten}</span>
        </div>
      }
      ref={modalCheckoutRef}
      borderButtonBack={"1px solid gray"}
      titleBtnNext={
        <ButtonWrapper>
          {t("khamSucKhoe.thanhToan.xacNhanThanhToan")}
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/pay.png")}
            alt=""
          ></img>
        </ButtonWrapper>
      }
      width={900}
      onClickBack={cancelHandler}
      onClickNext={submitHandler}
    >
      <Main>
        <Row>
          <Col xs={{ span: 14 }}>
            <div className="box-right">
              <div className="info-price">
                <div className="info-price__title">
                  {t("khamSucKhoe.thanhToan.soTienThanhToan")}
                </div>
                <div className="info-price__detail">
                  {formatDecimal(tienPTTT)} đ
                </div>
              </div>
              <div className="info-price">
                <div className="info-price__title">
                  {t("khamSucKhoe.thanhToan.soTienDVDaThucHien")}
                </div>
                <div className="info-price__detail">
                  {formatDecimal(chiTietHopDong?.tienThucTe)} đ
                </div>
              </div>
              <div className="info-price">
                <div className="info-price__title">
                  {t("khamSucKhoe.thanhToan.soTienChuaThanhToan")}
                </div>
                <div className="info-price__detail">
                  {formatDecimal(chiTietHopDong?.tienChuaThanhToan)} đ
                </div>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 9, offset: 1 }}>
            <div className="text-note">
              <b>{t("common.luuY")}:</b>{" "}
              {t("thuNgan.qrPayMoMoKhongTheThanhToan")}
            </div>
          </Col>
        </Row>

        <Row>
          <div className="box-second">
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
                              defaultValue={null}
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

export default ModalThanhToanHopDong;
