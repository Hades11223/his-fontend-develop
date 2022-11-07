import { Row } from "antd";
import React from "react";
import { Main } from "./styled";
import { useSelector } from "react-redux";

const ThongTinSoTien = () => {
  const { tienDieuTri } = useSelector((state) => state.nbDotDieuTri);

  return (
    <Main>
      <h1>Thông tin số tiền</h1>
      <Row className="title">
        <div className="left">Số tiền còn lại</div>
        <div className="right">{`${tienDieuTri?.tienConLai?.formatPrice()} đ`}</div>
      </Row>
      <Row className="title">
        <div className="left">Số tiền tạm ứng</div>
        <div className="right">{`${tienDieuTri?.tienHoanUng?.formatPrice()} đ`}</div>
      </Row>
      <Row className="title">
        <div className="left">Số tiền chưa TT</div>
        <div className="right">{`${tienDieuTri?.tienChuaThanhToan?.formatPrice()} đ`}</div>
      </Row>
      <Row className="title">
        <div className="left">Số tiền đã TT</div>
        <div className="right">{`${tienDieuTri?.tienDaThanhToan?.formatPrice()} đ`}</div>
      </Row>
    </Main>
  );
};
export default ThongTinSoTien;
