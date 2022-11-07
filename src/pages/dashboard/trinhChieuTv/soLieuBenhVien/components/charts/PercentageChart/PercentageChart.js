import React, { useCallback, useEffect, useState } from "react";
import Loading from "../../common/Loading";
import ChartNoDataContent from "../NoData";
import { isEmpty } from "lodash";
import { Pagination } from "antd";
import useMarquee from "../../hooks/useMarquee";
import { PercentageChartStyled } from "./styled";

const PercentageChart = ({
  title,
  loading,
  barPerPage,
  data,
  id,
  maxLengthLabel,
  delayRenderTime = 6000,

  autoIncreasePageTime = 20000,
  ...otherProps
}) => {
  const [paging, setPaging] = useState({
    size: barPerPage,
    // total: data?.length,
    total: 8,
    current: 1,
  });
  const [showingData, setShowingData] = useState([]);
  useMarquee(
    `#${id} .text-auto-running`,
    maxLengthLabel,
    delayRenderTime,
    showingData
  );

  const defaultData = [
    {
      title: "Khám bệnh",
      chuaHoanThanh: 20,
      daHoanThanh: 40,
    },
    {
      title: "Nội soi",
      chuaHoanThanh: 10,
      daHoanThanh: 30,
    },
    {
      title: "Phẫu thuật",
      chuaHoanThanh: 40,
      daHoanThanh: 8,
    },
    {
      title: "Tiểu phẫu",
      chuaHoanThanh: 15,
      daHoanThanh: 60,
    },
    {
      title: "Hội chẩn",
      chuaHoanThanh: 5,
      daHoanThanh: 95,
    },
    {
      title: "Khám bệnh",
      chuaHoanThanh: 50,
      daHoanThanh: 50,
    },
    {
      title: "Nội soi",
      chuaHoanThanh: 50,
      daHoanThanh: 50,
    },
    {
      title: "abc",
      chuaHoanThanh: 50,
      daHoanThanh: 50,
    },
  ];

  const PercentageBar = ({ chuaHoanThanh, daHoanThanh, title }) => {
    return (
      <div className="percent-wrapper">
        <h1 className="percent-title">{title}</h1>
        <div className="total">
          <div
            className="chua-hoan-thanh"
            style={{ width: `${chuaHoanThanh}%` }}
          >
            {chuaHoanThanh}
          </div>
          <div className="da-hoan-thanh" style={{ width: `${daHoanThanh}%` }}>
            {daHoanThanh}
          </div>
        </div>
      </div>
    );
  };

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
    <PercentageChartStyled>
      <div className="title">{title}</div>
      {loading ? (
        <Loading isAbsolute type="chart" whiteLoading />
      ) : !(!showingData || isEmpty(showingData)) ? (
        <ChartNoDataContent />
      ) : (
        <div>
          {defaultData.map((item, index) => (
            <PercentageBar key={index} {...item} />
          ))}
        </div>
      )}
      <div className="pagination">
        <Pagination
          current={paging.current}
          total={paging.total}
          pageSize={paging.size}
          onChange={handlePageChange}
        />
      </div>
    </PercentageChartStyled>
  );
};

export default PercentageChart;
