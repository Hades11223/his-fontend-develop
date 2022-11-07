import { Col } from "antd";
import Header1 from "pages/kho/components/Header1";
import React, { memo } from "react";
import { Main } from "./styled";

const ThongTinPhieu = ({ column }) => {
  return (
    <>
      <Header1 title={"Thông tin phiếu"} noPadding={true} bottom={9}></Header1>
      <Main>
        {column().map((item, index) => (
          <Col key={index} span={6}>
            <label
              className="label pointer"
              onClick={item.onClick && item.onClick}
            >
              {item.name}
            </label>
            <div className="content">{item.data}</div>
          </Col>
        ))}
      </Main>
    </>
  );
};

export default memo(ThongTinPhieu);
