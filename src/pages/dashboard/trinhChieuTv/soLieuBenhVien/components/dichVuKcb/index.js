import React from "react";
import { Main } from "./styled";
const DichVuKCB = () => {
  const PercentGroup = ({ data }) => (
    <div className="percent-group">
      <div className="label">Khám bệnh</div>
      <div className="total">
        <div
          className="chua-hoan-thanh"
          style={{
            width: `${data.chuaHoanThanh}%`,
          }}
        >
          {data.chuaHoanThanh}
        </div>
        <div
          className="da-hoan-thanh"
          style={{
            width: `${data.daHoanThanh}%`,
          }}
        >
          {data.daHoanThanh}
        </div>
      </div>
    </div>
  );

  return (
    <Main>
      <div className="dich-vu-kcb">
        <h1>DỊCH VỤ KHÁM CHỮA BỆNH</h1>
        <div className="dich-vu-kcb-group">
          {Array(7)
            .fill(0)
            .map((item, index) => (
              <PercentGroup
                data={{ daHoanThanh: 40, chuaHoanThanh: 20 }}
                key={index}
              />
            ))}
        </div>
      </div>
    </Main>
  );
};

export default DichVuKCB;
