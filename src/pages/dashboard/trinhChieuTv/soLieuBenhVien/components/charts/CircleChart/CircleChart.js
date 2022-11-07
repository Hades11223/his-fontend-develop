import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Sector,
} from "recharts";
import ChartNoDataContent from "../NoData";
import { isEmpty } from "lodash";
import Loading from "../../common/Loading";
import { CircleChartStyled, LegendStyled } from "./styled";

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <LegendStyled>
      {payload.map((entry, index) => {
        return (
          <div key={`item-${index}`} className="legend-item">
            <div className="value-text">
              <div
                className="icon"
                style={{
                  background: entry.color,
                  marginRight: "0.5em",
                }}
              ></div>
              {entry.value}
            </div>
            <div className="percent-wrapper">
              <div className="percent">
                {entry.payload?.realValue < 0 && "-"}
                {parseInt((entry.payload?.percent * 10000) / 100.0)}%
              </div>
              <div className="value">
                {entry.payload?.realValue < 0 && "-"}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  signDisplay: "never",
                  currencyDisplay: "code",
                })
                  .format(entry.payload?.value)
                  .replace("VND", "đ")}
              </div>
            </div>
          </div>
        );
      })}
    </LegendStyled>
  );
};

const CircleChart = ({
  data,
  title,
  useBackground = false,
  loading,
  cyPercent,
  useCurrencyFormat,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const customData = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        realValue: item.value,
        value: item.value > 0 ? item.value : -item.value,
        // value: item.value,
      })) || [],
    [data]
  );

  // console.log('customData', customData);

  const total = useMemo(() => {
    return (customData || []).reduce(
      (prev, current) =>
        prev +
        (current.realValue
          ? current.realValue
          : // > 0
            //   ? current.value
            //   : -current.value
            0),
      0
    );
  }, [data]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    return (
      <g>
        <text
          x={cx}
          y={cy - (window.innerWidth / 3840) * 18}
          dy={8}
          textAnchor="middle"
          fill={"var(--text)" || "white"}
          fontSize={
            window.matchMedia("(max-width: 1920px)").matches
              ? window.matchMedia("(max-width: 1367px)").matches
                ? "0.7vw"
                : "0.75vw"
              : "0.8vw"
          }
        >
          Tổng doanh thu
        </text>
        <text
          x={cx}
          y={cy + (window.innerWidth / 3840) * 18}
          dy={8}
          textAnchor="middle"
          fontWeight={"bold"}
          fill={"var(--text)" || "white"}
          fontSize={
            window.matchMedia("(max-width: 1920px)").matches
              ? window.matchMedia("(max-width: 1367px)").matches
                ? "0.7vw"
                : "0.75vw"
              : "0.8vw"
          }
        >
          {total < 0 ? "-" : ""}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            signDisplay: "never",
            currencyDisplay: "code",
          })
            .format(total)
            .replace("VND", "đ")}
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
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      </g>
    );
  };

  return (
    <CircleChartStyled useBackground={useBackground}>
      <div className="title">{title}</div>
      {!data || isEmpty(data) || total == 0 ? (
        <ChartNoDataContent />
      ) : loading ? (
        <Loading type="chart" isAbsolute whiteLoading />
      ) : (
        <ResponsiveContainer width="100%" height={window.innerWidth / 7.5}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={customData}
              cx="50%"
              cy={"47%"}
              innerRadius={
                window.innerWidth /
                (window.matchMedia("(max-width: 2561px)").matches
                  ? window.matchMedia("(max-width: 1921px)").matches
                    ? window.matchMedia("(max-width: 1367px)").matches
                      ? 41
                      : 37
                    : 32
                  : 33)
              }
              outerRadius={
                window.innerWidth /
                (window.matchMedia("(max-width: 2561px)").matches
                  ? window.matchMedia("(max-width: 1921px)").matches
                    ? window.matchMedia("(max-width: 1367px)").matches
                      ? 35
                      : 32
                    : 27
                  : 27)
              }
              fill="#2276FC"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              align="center"
              verticalAlign="bottom"
              content={renderLegend}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </CircleChartStyled>
  );
};

export default React.memo(CircleChart);
