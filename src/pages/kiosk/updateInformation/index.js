import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Form, Input, Radio, Row, Col } from "antd";
import DOBInput from "components/DOBInput";
import AddressFull from "components/AddressFull";
import { formatPhone } from "utils";
import saveImg from "assets/images/kiosk/save.png";
import deleteImg from "assets/images/kiosk/delete.png";
import { KiosWrapper } from "../components";
import Button from "../common/Button";
import { MainWrapper } from "./styled";

const UpdateInformation = ({
  listGioiTinh = [],
  infoGetNumber,
  getNumber,
  updateData,
  step,
  uuTien,
}) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    ngaySinh: "",
    validate: false,
    invalidAddress: false,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const listGioiTinhSelect = listGioiTinh.map((item) => (
    <Radio value={item.id}>{item.ten}</Radio>
  ));

  const {
    soDienThoai,
    tenNb,
    gioiTinh,
    ngaySinh,
    soNha,
    quanHuyen,
    tinhThanhPho,
    xaPhuong,
    doiTuong,
    quanHuyenId,
    tinhThanhPhoId,
    xaPhuongId,
    quocGiaId,
  } = infoGetNumber;

  useEffect(() => {
    let address = "";
    if (xaPhuong) address += `${xaPhuong}, `;
    if (quanHuyen) address += `${quanHuyen}, `;
    if (tinhThanhPho) address += `${tinhThanhPho}`;

    setState({
      diaChi: address,
      tinhThanhPhoId: tinhThanhPhoId,
      quanHuyenId,
      xaPhuongId,
      quocGiaId,
    });
  }, [xaPhuong, quanHuyen, tinhThanhPho]);

  const update = (value, variables) => {
    setState({ [`${variables}`]: value });
  };

  useEffect(() => {
    const dateOfBirth = {
      str: moment(ngaySinh).format("DD/MM/YYYY"),
      date: ngaySinh,
    };
    setState({
      ngaySinh: dateOfBirth,
    });
  }, [ngaySinh?.str]);

  useEffect(() => {
    const { ngaySinh } = state;
    if (ngaySinh?.str?.length !== 10) return;
    const age = ngaySinh.str
      ? parseInt(moment().format("YYYY")) -
        parseInt(moment(ngaySinh.str, "DD/MM/YYYY").format("YYYY"))
      : "";
    if (isNaN(age)) return;
    setState({
      age: age || "",
    });
  }, [state.ngaySinh]);

  useEffect(() => {
    if (soDienThoai) {
      setNumber(formatPhone(soDienThoai)?.trim());
    }
  }, [soDienThoai]);
  const onGetNumberSuccess = () => {
    updateData({
      step: step + 1,
    });
    history.push("/kiosk/lay-so");
  };

  const handleClear = () => {
    setState({ diaChi: "" });
  };

  const onChangeAdrressText = (e) => {
    setState({ diaChi: e, invalidAddress: !e });
  };

  const handleValidateAddress = () => {
    if (!state.tinhThanhPhoId) {
      setState({ invalidAddress: true });
    }
  };

  const onSelectAddress = async (data) => {
    let address = {};
    if (data?.tinhThanhPho && data?.quanHuyen) {
      address = {
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.quanHuyen?.id,
        xaPhuongId: data?.id,
        diaChi: data?.displayText,
      };
    } else if (data?.tinhThanhPho) {
      address = {
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.id,
        diaChi: data?.displayText,
      };
    } else {
      address = {
        tinhThanhPhoId: data?.id,
        diaChi: data?.displayText,
      };
    }

    setState({
      ...address,
      quocGiaId: data?.quocGia?.id,
    });
  };

  const [number, setNumber] = useState("");
  const handleFormatPhoneNumber = () => {
    setNumber(formatPhone(number)?.trim());
  };
  const handleChangePhoneNumber = (e) => {
    setNumber(e.target.value);
  };

  const onGetNumber = () => {
    const { validate, ngaySinh } = state;
    let isValid = true;
    if (!ngaySinh || !ngaySinh?.str) {
      isValid = false;
      setState({
        checkNgaySinh: true,
      });
    }

    if (!state.diaChi) {
      isValid = false;
      setState({
        invalidAddress: true,
      });
    }

    form.validateFields().then((values) => {
      const { ngaySinh, xaPhuongId, quanHuyenId, tinhThanhPhoId, quocGiaId } =
        state;
      const data = {
        tenNb: values.tenNb,
        ngaySinh: moment(ngaySinh.str.split(" "), "DD/MM/YYYY").format(
          "YYYY-MM-DDTHH:MM:SSZ"
        ),
        soDienThoai: number?.replaceAll(" ", ""),
        gioiTinh: values.gioiTinh,
        soNha: values.soNha,
        xaPhuongId,
        quanHuyenId,
        tinhThanhPhoId,
        uuTien,
        doiTuong,
        quocGiaId,
      };
      if (isValid && !validate) {
        getNumber({ callback: onGetNumberSuccess, ...data });
      }
    });
  };

  return (
    <KiosWrapper showBtnBack step={1}>
      <MainWrapper>
        <div className="content">
          <div className="title">Ch???nh s???a th??ng tin c?? nh??n</div>
          <div className="bg">
            <div className="info">
              <div>
                <Form
                  form={form}
                  name="kiosupdateform"
                  initialValues={{
                    tenNb,
                    gioiTinh,
                    soNha,
                  }}
                  layout="vertical"
                  style={{ width: "100%" }}
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="S??? ??i???n tho???i">
                        <Input
                          value={number}
                          placeholder="Nh???p s??? ??i???n tho???i"
                          allowClear
                          onChange={handleChangePhoneNumber}
                          onBlur={handleFormatPhoneNumber}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="H??? v?? t??n"
                        name="tenNb"
                        rules={[
                          { required: true, message: "M???i nh???p h??? v?? t??n!" },
                        ]}
                      >
                        <Input placeholder="Nh???p h??? v?? t??n" allowClear />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="Gi???i t??nh" name="gioiTinh">
                        <Radio.Group>{listGioiTinhSelect}</Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item label="Ng??y th??ng n??m sinh">
                        <DOBInput
                          allowClear
                          className="item-dob"
                          value={state.ngaySinh}
                          onBlur={(e, nofi, ageStr, chiNamSinh) => {
                            setState({
                              ngaySinh: e,
                              validate: nofi,
                              checkNgaySinh: nofi === 0 ? true : false,
                            });
                          }}
                          onChange={(e) => update(e, "ngaySinh")}
                          placeholder={"Nh???p ng??y th??ng n??m sinh"}
                        />
                        {state.validate &&
                        state.validate !== 0 &&
                        state.ngaySinh?.str ? (
                          <div className="error-msg">
                            Ng??y sinh sai ?????nh d???ng!
                          </div>
                        ) : !state.ngaySinh?.str ? (
                          <div className="error-msg error-msg-dob">
                            Vui l??ng nh???p ng??y th??ng n??m sinh!
                          </div>
                        ) : null}
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item label="Tu???i" name="age">
                        <div className="age">{state.age}</div>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={12} className="custom-col-address">
                      <Form.Item label="S??? nh?? / Th??n / X??m" name="soNha">
                        <Input placeholder="Nh???p s??? nh??" allowClear />
                      </Form.Item>
                      <div className="info-msg">VD: S??? 8 T??? 28</div>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Ph?????ng / X??, Qu???n / Huy???n, T???nh / Th??nh ph???">
                        <AddressFull
                          className="custom-address"
                          onChangeAdrressText={onChangeAdrressText}
                          placeholder="Ph?????ng/X??, Qu???n/Huy???n, T???nh/Th??nh Ph???"
                          value={state.diaChi}
                          onSelectAddress={onSelectAddress}
                          onBlur={handleValidateAddress}
                        />
                        {state.diaChi && (
                          <div className="delete-icon" onClick={handleClear}>
                            <img src={deleteImg} alt="deleteImg" />
                          </div>
                        )}
                        {state.invalidAddress ? (
                          <div className="error-msg">
                            Vui l??ng nh???p ?????a ch???!
                          </div>
                        ) : (
                          <div className="info-msg">
                            VD: Kh????ng Mai, Thanh Xu??n, H?? N???i
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-action">
          <Button
            onClick={onGetNumber}
            rounded
            className="btn-lg"
            color="#172B4D"
            bxShadow="#05C270"
            padding={60}
          >
            <img src={saveImg} alt="saveImg" /> <span>L??u v?? l???y s???</span>
          </Button>
        </div>
      </MainWrapper>
    </KiosWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.kios.step,
    listGioiTinh: state.utils.listgioiTinh,
    infoGetNumber: state.kios.infoGetNumber,
    uuTien: state.kios.uuTien,
    doiTuong: state.kios.doiTuong,
  };
};

const mapDispatchToProps = ({
  kios: { updateData, getNumber },
  utils: { getUtils },
}) => ({
  updateData,
  getUtils,
  getNumber,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInformation);
