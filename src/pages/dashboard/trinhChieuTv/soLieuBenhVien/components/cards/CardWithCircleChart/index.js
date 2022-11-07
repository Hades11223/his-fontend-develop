import React from "react";
import Loading from "../../common/Loading";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Row, Col } from "antd";
import {
  CardWithCircleChartStyled,
  downTrendIcon,
  noTrendIcon,
  upTrendIcon,
} from "./styled";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: "1em", fontWeight: "900" }}
      >
        {Math.round(percent * 100)}&nbsp;%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const COLORS = ["#8884d8", "#c5cad3"];

const CardWithCircleChart = ({
  title,
  titleStyle,
  dataSource = {},
  percentTop = false,
  loading,
  firstLoading,
}) => {
  const renderFirstPercent = () => {
    if (!dataSource.percent && dataSource.percent !== 0) return "";
    return (
      <div
        className={`percent ${
          dataSource.percent === 0
            ? "no-trend"
            : dataSource.percent > 0
            ? "up-trend"
            : "down-trend"
        }`}
      >
        <div className="trend-icon">
          {dataSource.percent === 0
            ? noTrendIcon()
            : dataSource.percent > 0
            ? upTrendIcon()
            : downTrendIcon()}
          <div className="percent-value-text">
            {Math.round(Math.abs(dataSource.percent * 100)) / 100}&nbsp;%
          </div>
        </div>
        {(dataSource.count || dataSource.count === 0) && (
          <div className="percent-value">
            <div className="count-number">({dataSource.count})</div>
          </div>
        )}
      </div>
    );
  };

  const renderSecondPercent = () => {
    if (!dataSource.secondPercent || dataSource.secondPercent === 0) return "";
    return (
      <div className="second-percent">
        {Math.round(dataSource.secondPercent * 100) / 100}&nbsp;%
      </div>
    );
  };

  return (
    <CardWithCircleChartStyled
      secondPercent={dataSource.secondPercent || dataSource.secondPercent === 0}
    >
      <div className="card-content-wrap">
        {firstLoading ? (
          <Loading type="chart" isAbsolute noSub whiteLoading />
        ) : (
          <Row className="rowChart" style={{ width: "100%" }}>
            {loading && <Loading type="chart" isAbsolute noSub whiteLoading />}
            <Col span={dataSource.secondPercent ? 8 : 12} className="col">
              <div style={titleStyle || {}} className="title-text">
                {title}
              </div>
              <div className="value">{dataSource.value}</div>
            </Col>
            <Col
              span={dataSource.secondPercent ? 8 : 12}
              className="col chart-circle-wrap"
            >
              <PieChart
                width={(window.innerWidth / 3840) * 230}
                height={(window.innerWidth / 3840) * 230}
              >
                <Pie
                  activeIndex={0}
                  activeShape={renderActiveShape}
                  data={dataSource.dataChart || []}
                  cx={((window.innerWidth / 3840) * 230) / 2}
                  cy={((window.innerWidth / 3840) * 230) / 2}
                  innerRadius={(window.innerWidth / 3840) * 60}
                  outerRadius={(window.innerWidth / 3840) * 90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(dataSource.dataChart || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Col>
            <Col span={dataSource.secondPercent ? 8 : 0} className="col">
              {(dataSource.secondPercent ||
                dataSource.secondPercent === 0 ||
                percentTop) &&
                renderFirstPercent()}
              {dataSource.secondPercent ||
              dataSource.secondPercent === 0 ||
              percentTop
                ? renderSecondPercent()
                : renderFirstPercent()}
            </Col>
          </Row>
        )}
      </div>
    </CardWithCircleChartStyled>
  );
};

export default React.memo(CardWithCircleChart);
