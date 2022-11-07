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
import { Pagination, Tooltip } from "antd";
import { CircleChartStyled, LegendStyled } from "./styled";
// số liệu bệnh viện - thống kê nguồn người bệnh

const SIZE_DEFAULT_LEGEND = 6;

const CircleChart = ({
  data,
  title,
  useBackground = false,
  loading,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const total = useMemo(() => {
    return (data || []).reduce((prev, current) => prev + current.value || 0, 0);
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
          y={cy + (window.innerWidth / 3840) * 5}
          dy={5}
          textAnchor="middle"
          fontWeight={"bold"}
          fill={"var(--text)" || "white"}
          fontSize={"1vw"}
        >
          {total}
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

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <LegendStyled>
        {payload
          ?.filter(
            (_, idx) =>
              SIZE_DEFAULT_LEGEND * (page - 1) <= idx &&
              idx < SIZE_DEFAULT_LEGEND * page
          )
          .map((entry, index) => {
            return (
              <div key={`item-${index}`} className="legend-item">
                <div
                  className="icon"
                  style={{
                    background: entry.color,
                  }}
                ></div>
                <Tooltip overlayClassName="tooltip-tv" title={entry.value}>
                  <div className="value-text">{entry.value}</div>
                </Tooltip>
                <div className="value">{entry.payload?.value}</div>
                <div className="percent">
                  {"("}
                  {parseInt((entry.payload?.percent * 10000) / 100.0)}%{")"}
                </div>
              </div>
            );
          })}

        {payload?.length > SIZE_DEFAULT_LEGEND && (
          <div className="pagination">
            <Pagination
              current={page}
              total={payload?.length}
              pageSize={SIZE_DEFAULT_LEGEND}
              onChange={setPage}
            />
          </div>
        )}
      </LegendStyled>
    );
  };

  return (
    <CircleChartStyled useBackground={useBackground} style={{ ...style }}>
      <div className="title">{title}</div>
      {!data || isEmpty(data) || total == 0 ? (
        <ChartNoDataContent />
      ) : loading ? (
        <Loading type="chart" isAbsolute whiteLoading />
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="20%"
              cy={"47%"}
              innerRadius={window.innerWidth / 36}
              outerRadius={window.innerWidth / 20}
              fill="#2276FC"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              align="right"
              verticalAlign="middle"
              // width={'16vw'}
              content={renderLegend}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </CircleChartStyled>
  );
};

export default React.memo(CircleChart);
