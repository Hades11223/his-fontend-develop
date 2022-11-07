import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import ChartNoDataContent from "../NoData";
import { isEmpty } from "lodash";
import Loading from "../../common/Loading";
import { Pagination } from "antd";
import useMarquee from "../../hooks/useMarquee";
import { useSelector } from "react-redux";
import { HorizontalBarChartStyled } from "./styled";

const renderLabel = (props) => {
  const { x, y, width, height, value } = props;
  return (
    <svg>
      <switch>
        <foreignObject
          x={x}
          y={y - height + 2}
          dy={8}
          width={(window.innerWidth / 3840) * 600}
          height={(window.innerWidth / 3840) * 70}
        >
          <div
            title={value}
            style={{ color: "var(--text3)" }} //#56CCF2
            xmlns="http://www.w3.org/1999/xhtml"
            className="text-elipsis"
          >
            {value}
          </div>
        </foreignObject>
        <text textAnchor="left" fill={"black"} fontSize={"1em"}>
          {value}
        </text>
      </switch>
    </svg>
  );
};

const HorizontalBarChart = ({
  data,
  dataKey = "ten",
  valueKey = "soLuong",
  useCurrencyFormat = false,
  barPerPage = 7,
  loading,
  title,
  autoIncreasePageTime = 20000,
  useBackground = false,
  maxLengthLabel,
  id,
  delayRenderTime = 6000,
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
  }, [data, paging, barPerPage]);

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
          width="90%"
          height={
            ((showingData.length * window.innerWidth) / 3840) *
            (window.matchMedia("(max-width: 2561px)").matches
              ? window.matchMedia("(max-width: 1921px)").matches
                ? window.matchMedia("(max-width: 1367px)").matches
                  ? 125
                  : 135
                : 150
              : 160)
          }
        >
          <BarChart
            data={showingData}
            layout="vertical"
            margin={{
              top: (window.innerWidth / 3840) * 20,
              right:
                (window.innerWidth / 3840) * (useCurrencyFormat ? 450 : 150),
              left: (window.innerWidth / 3840) * 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorbar" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#1C75BC" stopOpacity={1} />
                <stop offset="100%" stopColor="#09C3FF" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis type="number" stroke="#FFFFFF" hide />
            <YAxis type="category" stroke="#FFFFFF" hide dataKey={dataKey} />
            <Bar
              dataKey={valueKey}
              fill="url(#colorbar)"
              maxBarSize={(window.innerWidth / 3840) * 60}
            >
              {data?.map((entry, index) => {
                return (
                  <React.Fragment key={`cell-wrap-${index}`}>
                    <Cell key={`cell-${index}`} />
                  </React.Fragment>
                );
              })}
              <LabelList
                position="right"
                dataKey={valueKey}
                formatter={(value) => {
                  if (!value || value == 0) return "";
                  if (useCurrencyFormat)
                    return new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      signDisplay: "never",
                      currencyDisplay: "code",
                    })
                      .format(value)
                      .replace("VND", "đ");
                  return value;
                }}
                fill={"var(--text)"} //#fff
                fontWeight="bold"
              />
              <LabelList dataKey={dataKey} fill="#fff" content={renderLabel} />
            </Bar>
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
    </HorizontalBarChartStyled>
  );
};

export default React.memo(HorizontalBarChart);
