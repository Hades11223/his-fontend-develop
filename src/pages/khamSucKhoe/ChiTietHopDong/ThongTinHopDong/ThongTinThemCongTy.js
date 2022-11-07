import { Col, Row, Tooltip } from "antd";
import React from "react";
import moment from "moment";

const ThongTinThemCongTy = ({ ttHopDong = {} }) => {
  const _dauMoiLienHe = `${ttHopDong?.doiTac?.nguoiDauMoi || ""}${
    ttHopDong?.doiTac?.sdtNguoiDaiDien
      ? `/${ttHopDong?.doiTac?.sdtNguoiDaiDien}`
      : ""
  }`;
  const _tkNganHang = `${ttHopDong?.tenNganHang || ""} ${
    ttHopDong?.chuTaiKhoan ? `- ${ttHopDong?.chuTaiKhoan}` : ""
  } ${ttHopDong?.soTaiKhoan ? `- ${ttHopDong?.soTaiKhoan}` : ""}`;
  const _nguoiDaiDien = `${ttHopDong?.nguoiDaiDien || ""}${
    ttHopDong?.chucVuNguoiDaiDien ? `/${ttHopDong?.chucVuNguoiDaiDien}` : ""
  }`;

  return (
    <Row className="company-more-info">
      {/* <Col span={6} className="info">
        <div className="title">Địa chỉ:</div>
        <div className="detail">
          <Tooltip placement="topLeft" title={ttHopDong?.doiTac?.diaChi || ""}>
            {ttHopDong?.doiTac?.diaChi}
          </Tooltip>
        </div>
      </Col> */}

      <Col span={6} className="info">
        <div className="title">Đầu mối liên hệ:</div>
        <div className="detail">
          <Tooltip placement="topLeft" title={_dauMoiLienHe}>
            {_dauMoiLienHe}
          </Tooltip>
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Số hợp đồng:</div>
        <div className="detail">{ttHopDong?.soHopDong}</div>
      </Col>
      <Col span={6} className="info">
        <div className="title">Ngày hiệu lực hợp đồng:</div>
        <div className="detail">
          {ttHopDong?.ngayHieuLuc
            ? moment(ttHopDong?.ngayHieuLuc).format("DD/MM/YYYY")
            : ""}
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Hình thức TT DV ngoài HĐ:</div>
        <div className="detail">
          {ttHopDong?.hinhThucTtDvNgoaiHd
            ? ttHopDong?.hinhThucTtDvNgoaiHd === 10
              ? "Thanh toán theo HĐ"
              : "Tự thanh toán"
            : ""}
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tài khoản ngân hàng:</div>
        <div className="detail">
          <Tooltip title={_tkNganHang}>{_tkNganHang}</Tooltip>
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Người đại diện/Chức vụ:</div>
        <div className="detail">
          <Tooltip title={_nguoiDaiDien}>{_nguoiDaiDien}</Tooltip>
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Số điện thoại:</div>
        <div className="detail">{ttHopDong?.sdtNguoiDauMoi}</div>
      </Col>
    </Row>
  );
};

export default ThongTinThemCongTy;
