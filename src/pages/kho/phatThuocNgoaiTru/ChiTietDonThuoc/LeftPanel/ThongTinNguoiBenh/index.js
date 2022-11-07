import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Col, Row } from "antd";
import { Main } from "./styled";
import { GIOI_TINH_BY_VALUE } from "constants/index.js";
import { useStore } from "hook";
const ThongTinNguoiBenh = ({ layerId, ...props }) => {
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refThongTin = useRef();
  const infoPatient = useStore("thuocChiTiet.infoPatient");

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refThongTin.current && refThongTin.current.focus();
          },
        },
      ],
    });
  }, []);
  return (
    <Main>
      <div className="body-info">
        <Row className="info-full">
          <div className="title" style={{ width: "100%" }}>
            Thông tin khách hàng
          </div>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title" style={{ marginRight: 90 }}>
                Họ và tên:
              </div>
              <div className="detail">
                <b>
                  {infoPatient?.nbDotDieuTri?.tenNb}
                  {` (${moment(infoPatient?.nbDotDieuTri?.ngaySinh).format(
                    "DD/MM/YYYY"
                  )} - ${`${
                    infoPatient?.nbDotDieuTri?.thangTuoi > 36
                      ? `${infoPatient?.nbDotDieuTri?.tuoi} tuổi`
                      : `${infoPatient?.nbDotDieuTri?.thangTuoi} tháng`
                  }`} - ${
                    infoPatient?.nbDotDieuTri?.gioiTinh
                      ? GIOI_TINH_BY_VALUE[infoPatient?.nbDotDieuTri?.gioiTinh]
                      : ""
                  })`}
                </b>
              </div>
            </Row>
          </Col>
          <Col sm={6} md={6} xl={6} xxl={6} className="info">
            <Row className="">
              <div className="title" style={{ marginRight: 35 }}>
                SĐT:
              </div>
              <div className="detail">
                {infoPatient?.nbDotDieuTri?.soDienThoai}
              </div>
            </Row>
          </Col>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 102 }}>
                Địa chỉ:
              </div>
              <div className="detail last">
                {infoPatient?.nbDotDieuTri?.nbDiaChi?.diaChi}
              </div>
            </Row>
          </Col>
          <Col sm={6} md={6} xl={6} xxl={6} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 20 }}>
                Mã NB:
              </div>
              <div className="detail last">
                {infoPatient?.nbDotDieuTri?.maNb}
              </div>
            </Row>
          </Col>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 8 }}>
                Người bảo lãnh - SĐT:
              </div>
              <div className="detail last">
                {`${
                  infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.hoTen
                    ? infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.hoTen
                    : ""
                }${
                  infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai
                    ? ` - ${infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai}`
                    : ""
                }`}
              </div>
            </Row>
          </Col>
          <Col sm={6} md={6} xl={6} xxl={6} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 20 }}>
                Mã HS:
              </div>
              <div className="detail last">
                {infoPatient?.nbDotDieuTri?.maHoSo}
              </div>
            </Row>
          </Col>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 8 }}>
                Số BHYT:
              </div>
              <div className="detail last">
                {infoPatient?.nbDotDieuTri?.nbTheBaoHiem?.maThe}
              </div>
            </Row>
          </Col>
          <Col sm={6} md={6} xl={6} xxl={6} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 20 }}>
                Giá trị thẻ:
              </div>
              <div className="detail last">
                {moment(infoPatient?.nbDotDieuTri?.nbTheBaoHiem?.tuNgay).format(
                  "DD/MM/YYYY"
                )}
                -{" "}
                {moment(
                  infoPatient?.nbDotDieuTri?.nbTheBaoHiem?.denNgay
                ).format("DD/MM/YYYY")}
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default ThongTinNguoiBenh;
