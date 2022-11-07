import React, { memo } from "react";
import { Row, Col } from "antd";
import { PopoverWrapper, GlobalStyle, Main } from "./styled";
const PopoverHangHoa = ({ item, children, ...props }) => {
  const content = (item) => (
    <Main className="content">
      <div
        className="title"
        style={{ fontWeight: 550 }}
      >{`${item?.ma} - ${item?.ten}`}</div>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <div className="">Số lượng khả dụng: {item?.soLuongKhaDung}</div>
          <div className="">Số lượng còn lại: {item?.soLuong}</div>
          <div className="">Hàm lượng: {item?.hamLuong}</div>
          <div className="">Tên hoạt chất: {item?.tenHoatChat}</div>
        </Col>
        <Col span={12}>
          <div className="">Đường dùng: {item?.duongDung}</div>
          <div className="">Nhà sản xuất: {item?.tenNhaSanXuat}</div>
          <div className="">Quy cách: {item?.quyCach}</div>
        </Col>
      </Row>
    </Main>
  );
  return (
    <>
      <GlobalStyle />
      <PopoverWrapper
        placement="right"
        content={content(item)}
        trigger="hover"
        overlayClassName="wide"
      >
        <span
          className=""
          style={{
            color: "#0762F7",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          {children}
        </span>
      </PopoverWrapper>
    </>
  );
};

export default memo(PopoverHangHoa);
