import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import ModalCheckout from "components/ModalCheckout";
import IconSave from "assets/images/thuNgan/icSave.png";
import { firstLetterWordUpperCase } from "utils";
import {
  Main,
  ButtonWrapper,
  Wrapper,
  ModalStyled,
  ModalHeader,
  SubModalHeader,
  ModalContent,
  ModalFooter,
  ButtonBack,
  ButtonNext,
} from "./styled";
import { Col, Row, Input, Radio } from "antd";
import NumberFormat from "react-number-format";
import mienGiamProvider from "data-access/nb-phieu-thu-provider";

const ModalDiscount = (props, ref) => {
  const { isAdvised, infoPatient } = useSelector((state) => state.thuocChiTiet);
  const { nbDotDieuTri } = infoPatient || {};
  const isVangLai = useMemo(() => {
    return nbDotDieuTri?.ngoaiVien;
  }, [infoPatient]);
  const { addOrUpdateDiscount } = useDispatch().thuNgan;
  const { updateData: updateDataThuocChiTiet, searchDonThuoc } =
    useDispatch().thuocChiTiet;
  const { modalCheckoutRef, ...rest } = props;
  const refInput = useRef(null);
  const [state, _setState] = useState({
    isModalVisible: false,
    discount: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        isModalVisible: true,
      });
    },
    close: () => {
      setState({
        isModalVisible: false,
      });
    },
  }));
  const cancelHandler = () => {
    ref.current.close();
  };
  const submitHandler = () => {
    const keyPost =
      state.discount === 1 ? "phanTramMienGiam" : "tienMienGiamPhieuThu";
    mienGiamProvider
      .addOrUpdateDiscount(
        {
          hinhThucMienGiam: 10, // phiếu thu (tổng đơn) = 10
          [keyPost]: state.value,
        },
        infoPatient.phieuThu.id
      )
      .then((res) => {
        searchDonThuoc(infoPatient?.phieuXuatId);
      });
    ref.current.close();
  };
  const onChange = (key) => (e) => {
    let obj = {
      [key]: e?.target?.value || e?.floatValue,
    };
    if (key === "discount") {
      obj = {
        [key]: e.target.value,
        value: null,
      };
    }
    setState(obj);
  };
  const onKeyUp = (key) => (e) => {
    if (key === "value") {
      if (state.discount === 1) {
        if (Number(e.target.value) > 100) {
          e.target.value = 100;
          setState({ value: e.target.value });
        }
      }
      //  else {
      //     e.target.value = e.target.value.formatPrice()
      // }
    }
  };
  const disabledInputStatus = () => {
    if (
      isVangLai &&
      (infoPatient?.phieuXuat?.trangThai == 15 ||
        infoPatient?.phieuXuat?.trangThai == 10) &&
      !infoPatient?.phieuThu?.thanhToan
    ) {
      return false;
    }
    if (
      isAdvised &&
      (infoPatient?.phieuXuat?.trangThai == 15 ||
        infoPatient?.phieuXuat?.trangThai == 10) &&
      !infoPatient?.phieuThu?.thanhToan
    ) {
      return false;
    }
    // if(isVangLai && (infoPatient?.phieuXuat?.trangThai == 15)){
    //     return false
    // }
    // if (((infoPatient?.phieuXuat?.trangThai == 15) || (infoPatient?.phieuXuat?.trangThai == 10)) && !isAdvised) {
    //     return true
    // }
    // if (((infoPatient?.phieuXuat?.trangThai == 15) || (infoPatient?.phieuXuat?.trangThai == 10))) {
    //     return false
    // }
    // if (isAdvised) {
    //     return false
    // }
    return true;
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  return (
    <Wrapper>
      <ModalStyled
        width={350}
        visible={state.isModalVisible}
        closable={false}
        footer={null}
        {...rest}
      >
        <ModalHeader className="modal-header">
          Chiết khấu tổng đơn
          {/* <SubModalHeader>{subTitleHeader}</SubModalHeader> */}
        </ModalHeader>
        <ModalContent className="modal-content">
          <Main>
            <Row>
              <Col span={24}>
                <Radio.Group
                  value={state.discount}
                  onChange={onChange("discount")}
                  style={{ width: "100%" }}
                >
                  {/* <Row justify="space-between" > */}
                  <Radio value={1}>Theo %</Radio>
                  <Radio value={2}>Theo tiền VNĐ</Radio>
                  {/* </Row> */}
                </Radio.Group>
                <div style={{ marginTop: 10 }}>Giá trị</div>
                {state.discount === 2 ? (
                  <NumberFormat
                    customInput={Input}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    onKeyDown={blockInvalidChar}
                    onValueChange={onChange("value")}
                    min={0}
                    value={state.value}
                    defaultValue={infoPatient?.phieuThu?.tienMienGiam}
                    // placeholder="Nhập số tiền"
                    disabled={disabledInputStatus()} // nếu nhấn button tư vấn mới được sửa input
                  />
                ) : (
                  <Input
                    min={0}
                    onKeyDown={blockInvalidChar}
                    ref={refInput}
                    value={state.value}
                    defaultValue={infoPatient?.phieuThu?.phanTramMienGiam}
                    disabled={disabledInputStatus()}
                    // placeholder="Nhập số tiền"
                    // defaultValue={state?.value?.formatPrice()}
                    type="number"
                    // onBlur={(e) => {
                    //     e.target.value = e.target.value.formatPrice()
                    //     console.log('e.target.value blur: ', e.target.value);
                    //     setState({ value: e.target.value })
                    // }}
                    onKeyUp={onKeyUp("value")}
                    onChange={onChange("value")}
                    style={{ width: "100%", fontSize: 14 }}
                    className="input-option"
                  />
                )}
              </Col>
            </Row>
          </Main>
        </ModalContent>
        <ModalFooter className="modal-footer">
          <ButtonBack
            onClick={cancelHandler}
            style={{ border: "1px solid gray" }}
          >
            Quay lại
          </ButtonBack>
          <ButtonNext onClick={submitHandler}>
            Lưu{" "}
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            ></img>
          </ButtonNext>
        </ModalFooter>
      </ModalStyled>
    </Wrapper>
  );
};

export default forwardRef(ModalDiscount);
