import React from "react";
import { EmptyChartStyled } from "./styled";

const EmptyChart = ({}) => {
  return (
    <EmptyChartStyled>
      {BoxIcon()}
      <div className="text-1">Chưa có dữ liệu vào khoảng thời gian này!</div>
      <div className="text-2">
        Chưa có dữ liệu để hiển thị biểu đồ. <br />
        Vui lòng chọn khoảng thời gian khác và thử lại
      </div>
    </EmptyChartStyled>
  );
};

export default EmptyChart;
