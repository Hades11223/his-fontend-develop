import React from "react";
import { Row, Col } from "antd";
import moment from "moment";

const LAYOUT = {
  INFO: 8,
  DETAIL: 16,
};

const ThongTinThemCongTy = ({
  ttCongty = {},
  thoiGianTao,
  thoiGianCapNhat,
}) => {
  console.log(thoiGianTao, thoiGianCapNhat);
  return (
    <Row className="company-more-info">
      <Col md={24} className="info">
        <Row className="">
          <Col md={4} className="title">
            Địa chỉ:
          </Col>
          <Col md={20} className="detail">
            {ttCongty?.diaChi || ""}
          </Col>
        </Row>
      </Col>

      <Col md={12} className="info">
        <Row className="">
          <Col md={LAYOUT.INFO} className="title">
            Tài khoản ngân hàng:
          </Col>
          <Col md={LAYOUT.DETAIL} className="detail">
            {`${ttCongty?.tenNganHang || ""} ${
              ttCongty?.chuTaiKhoan ? `- ${ttCongty?.chuTaiKhoan}` : ""
            } ${ttCongty?.soTaiKhoan ? `- ${ttCongty?.soTaiKhoan}` : ""}`}
          </Col>
        </Row>
      </Col>

      <Col md={12} className="info">
        <Row className="">
          <Col md={LAYOUT.INFO} className="title">
            SĐT:
          </Col>
          <Col md={LAYOUT.DETAIL} className="detail">
            {ttCongty?.sdtNguoiDauMoi || ""}
          </Col>
        </Row>
      </Col>

      <Col md={12} className="info">
        <Row className="">
          <Col md={LAYOUT.INFO} className="title">
            Người đại diện/Chức vụ:
          </Col>
          <Col md={LAYOUT.DETAIL} className="detail">
            {`${ttCongty?.nguoiDaiDien || ""}${
              ttCongty?.chucVuNguoiDaiDien
                ? `/${ttCongty?.chucVuNguoiDaiDien}`
                : ""
            }`}
          </Col>
        </Row>
      </Col>

      <Col md={12} className="info">
        <Row className="">
          <Col md={LAYOUT.INFO} className="title">
            Đầu mối liên hệ:
          </Col>
          <Col md={LAYOUT.DETAIL} className="detail">
            {`${ttCongty?.nguoiDauMoi || ""}${
              ttCongty?.sdtNguoiDaiDien ? `/${ttCongty?.sdtNguoiDaiDien}` : ""
            }`}
          </Col>
        </Row>
      </Col>

      <Col md={12} className="info">
        <Row className="">
          <Col md={LAYOUT.INFO} className="title">
            Ngày tạo báo giá:
          </Col>
          <Col md={LAYOUT.DETAIL} className="detail">
            {thoiGianTao != null
              ? moment(thoiGianTao).format("DD/MM/YYYY HH:mm")
              : ""}
          </Col>
        </Row>
      </Col>

      <Col md={12} className="info">
        <Row className="">
          <Col md={LAYOUT.INFO} className="title">
            Ngày cập nhật báo giá:
          </Col>
          <Col md={LAYOUT.DETAIL} className="detail">
            {thoiGianCapNhat != null
              ? moment(thoiGianCapNhat).format("DD/MM/YYYY HH:mm")
              : ""}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ThongTinThemCongTy;
