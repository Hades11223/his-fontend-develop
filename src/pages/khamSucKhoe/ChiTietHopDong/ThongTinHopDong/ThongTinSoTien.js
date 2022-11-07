import { Col, Row, Tooltip } from "antd";
import React from "react";

const ThongTinSoTien = ({ ttHopDong = {} }) => {
  const tongTienMienGiam =
    (ttHopDong.tienGiamGia || 0) +
    (ttHopDong?.tienMienGiamDichVu || 0) +
    (ttHopDong?.tienMienGiamHopDong || 0);

  const _maVoucher = (ttHopDong?.dsMaGiamGia || [])
    .map((x) => x.maVoucher)
    .join(", ");

  return (
    <Row className="company-more-info">
      <Col span={6} className="info">
        <div className="title">Voucher:</div>
        <div className="detail">
          <Tooltip placement="topLeft" title={_maVoucher}>
            {_maVoucher}
          </Tooltip>
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Miễn giảm theo voucher:</div>
        <div className="detail alignRightTxt">
          {(ttHopDong?.tienGiamGia || 0).formatPrice()} đ
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Miễn giảm theo dịch vụ:</div>
        <div className="detail alignRightTxt">
          {(ttHopDong?.tienMienGiamDichVu || 0).formatPrice()} đ
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Miễn giảm theo hợp đồng:</div>
        <div className="detail alignRightTxt">{`${(
          ttHopDong?.tienMienGiamHopDong || 0
        ).formatPrice()}  đ`}</div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tổng tiền miễn giảm:</div>
        <div className="detail alignRightTxt">
          {tongTienMienGiam.formatPrice()} đ
        </div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tiền dự kiến:</div>
        <div className="detail alignRightTxt">{`${(
          ttHopDong?.tienDuKien || 0
        ).formatPrice()} đ`}</div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tiền dự kiến sau miễn giảm:</div>
        <div className="detail alignRightTxt">{`${(
          ttHopDong?.tienDuKienSauGiam || 0
        ).formatPrice()} đ`}</div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tiền thực tế:</div>
        <div className="detail alignRightTxt">{`${(
          ttHopDong?.tienThucTe || 0
        ).formatPrice()} đ`}</div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tiền thực tế sau miễn giảm:</div>
        <div className="detail alignRightTxt">{`${(
          ttHopDong?.tienThucTeSauGiam || 0
        ).formatPrice()} đ`}</div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tiền đã thanh toán:</div>
        <div className="detail alignRightTxt">{`${(
          ttHopDong?.tienDaThanhToan || 0
        ).formatPrice()} đ`}</div>
      </Col>

      <Col span={6} className="info">
        <div className="title">Tiền chưa thanh toán:</div>
        <div className="detail alignRightTxt">{`${(
          ttHopDong?.tienChuaThanhToan || 0
        ).formatPrice()} đ`}</div>
      </Col>
    </Row>
  );
};

export default ThongTinSoTien;
