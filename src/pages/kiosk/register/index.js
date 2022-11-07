import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { Form, Input, Row, Col } from "antd";
import DOBInput from "components/DOBInput";
import saveImg from "assets/images/kiosk/save.png";
import { KiosWrapper } from "../components";
import Button from "../common/Button";
import { MainWrapper } from "./styled";

const Register = ({ getNumber, step, uuTien, updateData, doiTuong }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    ngaySinh: "",
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { validate, ngaySinh } = state;

  const update = (value, variables) => {
    setState({ [`${variables}`]: value });
  };

  const onGetNumberSuccess = () => {
    updateData({
      step: step + 1,
    });
    history.push("/kiosk/lay-so");
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const data = {
        tenNb: values.tenNb?.toUpperCase(),
        ngaySinh:
          ngaySinh && ngaySinh?.str && ngaySinh?.formatStr
            ? moment(ngaySinh?.str, ngaySinh?.formatStr).format()
            : "",
        uuTien,
        doiTuong,
      };
      if (!validate) {
        getNumber({ callback: onGetNumberSuccess, ...data });
      }
    });
  };

  return (
    <KiosWrapper showBtnBack step={step}>
      <MainWrapper>
        <div className="content">
          <div className="title">Đăng ký khám bệnh</div>
          <div className="bg">
            <div className="info">
              <div>
                <Form
                  name="basic"
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                >
                  <Row className="row-thong-tinkb" gutter={24}>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                      <Form.Item label="Họ và tên" name="tenNb">
                        <Input placeholder="Nhập họ và tên" allowClear />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                      <Form.Item
                        label="Ngày tháng năm sinh"
                        className="custom-label"
                      >
                        <DOBInput
                          allowClear
                          className="item-dob"
                          value={state.ngaySinh}
                          onBlur={(e, nofi, ageStr, chiNamSinh) => {
                            console.log("onBluronBluronBlur", nofi);
                            setState({
                              ngaySinh: e,
                              validate: nofi,
                              checkNgaySinh: nofi === 0 ? true : false,
                            });
                          }}
                          onChange={(e) => update(e, "ngaySinh")}
                          placeholder={"Nhập ngày tháng năm sinh"}
                        />
                        {validate && validate !== 0 && ngaySinh?.str ? (
                          <div className="error-msg">
                            Ngày sinh sai định dạng!
                          </div>
                        ) : (
                          <div className="msg">
                            VD: 12/05/1990 hoặc 12051990
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
            onClick={handleSubmit}
            rounded
            className="btn-lg"
            color="#172B4D"
            bxShadow="#05C270"
            padding={60}
          >
            <img src={saveImg} alt="saveImg" /> <span>Lưu và lấy số</span>
          </Button>
        </div>
      </MainWrapper>
    </KiosWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.kios.step,
    uuTien: state.kios.uuTien,
    doiTuong: state.kios.doiTuong,
  };
};

const mapDispatchToProps = ({ kios: { getNumber, updateData } }) => ({
  getNumber,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
