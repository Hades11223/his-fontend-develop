import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
  CartesianGrid,
} from "recharts";
import ChartNoDataContent from "../NoData";
import { isEmpty } from "lodash";
import Loading from "@components/common/loading";
import { Pagination } from "antd";
import useMarquee from "@hook/useMarquee";
import { HorizontalBarChartStyled } from "./styled";

const renderLabel = (props) => {
  const { x, y, width, height, value } = props;
  console.log("props", props);
  return (
    <svg>
      <switch>
        <foreignObject
          x={x - 10}
          y={y - (window.innerHeight / 2160) * 65}
          dy={8}
          width={width + 20}
          height={(window.innerHeight / 2160) * 70}
        >
          <div
            title={value}
            style={{
              fontWeight: "bold",
              color: "var(--header-text)" || "#56CCF2",
              fontSize: "1.1vw",
              textAlign: "center",
            }}
            xmlns="http://www.w3.org/1999/xhtml"
            className="text-elipsis"
          >
            {/* {formatValue ? formatValue(value) : value} */}

            {value}
          </div>
        </foreignObject>
        <text textAnchor="left" fill={"white"} fontSize={"1em"}>
          {/* {formatValue ? formatValue(value) : value} */}
          {value}
        </text>
      </switch>
    </svg>
  );
};

const noteData = [
  {
    background: "linear-gradient(360deg, #1C75BC 0%, #09C3FF 100%)",
    color: "#09C3FF",
  },
  {
    background: "linear-gradient(0deg, #F2994A 0.96%, #F2C94C 99.5%)",
    color: "#F2C94C",
  },
];

const VerticalBarChart = ({
  data = [],
  dataKey = "ten",
  valueKey = "doanhThu",
  valueKey2 = "doanhThu2",
  formatValue,
  barPerPage = 7,
  loading,
  title,
  autoIncreasePageTime = 20000,
  useBackground = false,
  maxLengthLabel,
  id,
  delayRenderTime = 6000,
  tickFormatterY,
  showChuThich,
  chuThich,
  textDonVi = "Triệu đồng",
}) => {
  const [paging, setPaging] = useState({
    size: barPerPage,
    total: data?.length,
    current: 1,
  });
  const [showingData, setShowingData] = useState([]);

  useMarquee(
    `#${id} .text-auto-running`,
    maxLengthLabel,
    delayRenderTime,
    showingData
  );

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      size: barPerPage,
      total: data?.length,
      current: 1,
    }));
  }, [data, barPerPage]);

  useEffect(() => {
    setShowingData(
      (data || []).filter(
        (item, index) =>
          index >= paging.size * (paging.current - 1) &&
          index < paging.size * paging.current
      )
    );
  }, [paging, barPerPage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPaging((prev) => ({
        ...prev,
        current: prev.current >= prev.total / prev.size ? 1 : prev.current + 1,
      }));
    }, autoIncreasePageTime);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handlePageChange = useCallback((page, pageSize) => {
    setPaging((prev) => ({
      ...prev,
      current: page,
    }));
  }, []);

  return (
    <HorizontalBarChartStyled useBackground={useBackground} id={id}>
      <div className="title">{title}</div>
      {loading ? (
        <Loading isAbsolute type="chart" whiteLoading />
      ) : !showingData || isEmpty(showingData) ? (
        <ChartNoDataContent />
      ) : (
        <ResponsiveContainer
          width="100%"
          height={"95%"}
          // width={showingData.length * window.innerWidth / 3840 * (
          //   window.matchMedia('(max-width: 2561px)').matches ?
          //   window.matchMedia('(max-width: 1921px)').matches ?
          //   window.matchMedia('(max-width: 1367px)').matches ?
          //     125 : 135 : 150 : 160
          // )}
        >
          <BarChart
            data={showingData}
            margin={{
              top: (window.innerHeight / 2160) * 50,
              right: (window.innerWidth / 3840) * 80,
              left:
                window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2560
                  ? 80
                  : (window.innerWidth / 3840) * 30,
              bottom: (window.innerHeight / 2160) * 40,
            }}
          >
            <defs>
              <linearGradient id="colorbar" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#1C75BC" stopOpacity={1} />
                <stop offset="100%" stopColor="#09C3FF" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorbar2" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#F2994A" stopOpacity={1} />
                <stop offset="100%" stopColor="#F2C94C" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              style={{ fontSize: "1.1vw", fontWeight: "bold" }}
              type="category"
              stroke={"var(--header-text)" || "#56CCF2"}
              dataKey={dataKey}
            />
            <YAxis
              style={{ fontSize: "1.1vw", fontWeight: "bold" }}
              type="number"
              stroke={"var(--header-text)" || "#56CCF2"}
              // dataKey={valueKey}
              tickFormatter={tickFormatterY}
            />
            <CartesianGrid
              vertical={false}
              stroke={"var(--header-text)" || "#56CCF2"}
            />

            <Bar
              isAnimationActive={false}
              dataKey={valueKey}
              fill="url(#colorbar)"
              barSize={
                (window.innerWidth / 3840) * (data.length < 5 ? 300 : 200)
              }
            >
              {data?.map((entry, index) => {
                return (
                  <React.Fragment key={`cell-wrap-${index}`}>
                    <Cell key={`cell-${index}`} />
                  </React.Fragment>
                );
              })}
              <LabelList dataKey={valueKey} fill="#fff" content={renderLabel} />
            </Bar>
            {valueKey2 && (
              <Bar
                isAnimationActive={false}
                dataKey={valueKey2}
                fill="url(#colorbar2)"
                barSize={
                  (window.innerWidth / 3840) * (data.length < 5 ? 300 : 200)
                }
              >
                {data?.map((entry, index) => {
                  return (
                    <React.Fragment key={`cell-wrap-${index}`}>
                      <Cell key={`cell-${index}`} />
                    </React.Fragment>
                  );
                })}
                <LabelList
                  dataKey={valueKey2}
                  fill="#fff"
                  content={
                    renderLabel
                    //   {
                    //   formatValue,
                    //   // zx: data.length < 5 ? 10 : 30,
                    // }
                  }
                />
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
      <div className="pagination">
        <Pagination
          current={paging.current}
          total={paging.total}
          pageSize={paging.size}
          onChange={handlePageChange}
        />
      </div>
      <div className="don-vi">ĐV: {textDonVi}</div>
      {chuThich && (
        <div className="chu-thich">
          {chuThich.map((item, index) => (
            <div className="note-item" key={index}>
              <div
                className="note-color"
                style={{
                  background: noteData[index].background,
                }}
              ></div>
              <div
                className="note-content"
                style={{ color: noteData[index].color }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </HorizontalBarChartStyled>
  );
};

export default React.memo(VerticalBarChart);
