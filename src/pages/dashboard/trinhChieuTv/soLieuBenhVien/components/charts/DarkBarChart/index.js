import React, { useState, useEffect, useCallback } from "react";
import ChartNoDataContent from "../NoData";
import { isEmpty } from "lodash";
import styled, { keyframes } from "styled-components";
import Loading from "../../common/Loading";
import { Pagination } from "antd";
import DarkbarChartContent from "./DarkBarChartContent";

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;

const DarkBarChartStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5em;
  font-size: 1.2625vw;
  @media all and (max-width: 2561px) {
    font-size: 1.1625vw;
  }
  @media all and (max-width: 1921px) {
    font-size: 1.1625vw;
  }
  @media all and (max-width: 1367px) {
    font-size: 0.9375vw;
  }
  position: relative;
  ${({ useBackground }) =>
    useBackground
      ? `
    background: #000E25;
    margin: 0.5em;
    border-radius: 0.83333333333vw;
    width: calc(100% - 1em);
  `
      : ""}
  .header {
    display: flex;
    flex-direction: row;
    height: calc(100vh * 80 / 2160) !important;
    justify-content: space-between;
    .title {
      font-weight: 900;
      font-size: 1.25vw;
      line-height: 1.45vw;
      color: var(--header-text); //#FFFFFF
      margin-bottom: 0.5em;
    }
    .config-button {
      cursor: pointer;
      font-weight: 700;
      font-size: calc(100vw / 3840 * 48);
      line-height: calc(100vw / 3840 * 65);
      color: var(--text);
    }
  }
  .pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-pagination {
      padding: 0 !important;
      .ant-pagination-item {
        min-width: 8px;
        margin: 0.26020833333vw;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-options {
        display: none;
      }
      .ant-pagination-item-ellipsis {
        border: none;
        border-radius: 0;
        border-bottom: dashed 1px #f2994a;
      }
      .ant-pagination-jump-next,
      .ant-pagination-jump-prev {
        border: none;
        border-radius: 0;
        border-bottom: dashed 1px #f2994a;
      }
      li {
        border-radius: 50%;
        width: 0.57291666666vw !important;
        height: 0.57291666666vw !important;
        border: 0.10416666666vw solid #f2994a;
        background: transparent;
        &.ant-pagination-item-active {
          animation: ${paging_item_moving} 200ms ease-in-out;
          background: #f2994a;
        }
        a {
          display: none;
        }
      }
    }
  }
`;

const configIcon = (
  <svg
    width={(window.innerWidth / 3840) * 60}
    height={(window.innerWidth / 3840) * 61}
    viewBox="0 0 60 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M49.1018 32.95C49.2046 32.15 49.2817 31.35 49.2817 30.5C49.2817 29.65 49.2046 28.85 49.1018 28.05L54.5247 23.925C55.0131 23.55 55.1416 22.875 54.8332 22.325L49.6929 13.675C49.4616 13.275 49.0247 13.05 48.562 13.05C48.4078 13.05 48.2536 13.075 48.1251 13.125L41.7255 15.625C40.389 14.625 38.9497 13.8 37.382 13.175L36.4053 6.55C36.3282 5.95 35.7885 5.5 35.1459 5.5H24.8654C24.2229 5.5 23.6831 5.95 23.606 6.55L22.6294 13.175C21.0616 13.8 19.6223 14.65 18.2859 15.625L11.8862 13.125C11.732 13.075 11.5778 13.05 11.4236 13.05C10.9867 13.05 10.5498 13.275 10.3185 13.675L5.17819 22.325C4.84407 22.875 4.99828 23.55 5.48661 23.925L10.9096 28.05C10.8068 28.85 10.7297 29.675 10.7297 30.5C10.7297 31.325 10.8068 32.15 10.9096 32.95L5.48661 37.075C4.99828 37.45 4.86978 38.125 5.17819 38.675L10.3185 47.325C10.5498 47.725 10.9867 47.95 11.4493 47.95C11.6035 47.95 11.7577 47.925 11.8862 47.875L18.2859 45.375C19.6223 46.375 21.0616 47.2 22.6294 47.825L23.606 54.45C23.6831 55.05 24.2229 55.5 24.8654 55.5H35.1459C35.7885 55.5 36.3282 55.05 36.4053 54.45L37.382 47.825C38.9497 47.2 40.389 46.35 41.7255 45.375L48.1251 47.875C48.2793 47.925 48.4335 47.95 48.5877 47.95C49.0247 47.95 49.4616 47.725 49.6929 47.325L54.8332 38.675C55.1416 38.125 55.0131 37.45 54.5247 37.075L49.1018 32.95ZM44.0129 28.675C44.1157 29.45 44.1414 29.975 44.1414 30.5C44.1414 31.025 44.09 31.575 44.0129 32.325L43.6531 35.15L45.9405 36.9L48.7162 39L46.9172 42.025L43.6531 40.75L40.9801 39.7L38.667 41.4C37.5619 42.2 36.5081 42.8 35.4544 43.225L32.73 44.3L32.3188 47.125L31.8048 50.5H28.2066L27.7183 47.125L27.307 44.3L24.5827 43.225C23.4775 42.775 22.4495 42.2 21.4214 41.45L19.0826 39.7L16.3583 40.775L13.0942 42.05L11.2951 39.025L14.0709 36.925L16.3583 35.175L15.9985 32.35C15.9213 31.575 15.8699 31 15.8699 30.5C15.8699 30 15.9213 29.425 15.9985 28.675L16.3583 25.85L14.0709 24.1L11.2951 22L13.0942 18.975L16.3583 20.25L19.0312 21.3L21.3443 19.6C22.4495 18.8 23.5032 18.2 24.557 17.775L27.2813 16.7L27.6926 13.875L28.2066 10.5H31.7791L32.2674 13.875L32.6786 16.7L35.403 17.775C36.5081 18.225 37.5362 18.8 38.5642 19.55L40.903 21.3L43.6274 20.225L46.8914 18.95L48.6905 21.975L45.9405 24.1L43.6531 25.85L44.0129 28.675ZM30.0057 20.5C24.3257 20.5 19.7251 24.975 19.7251 30.5C19.7251 36.025 24.3257 40.5 30.0057 40.5C35.6857 40.5 40.2862 36.025 40.2862 30.5C40.2862 24.975 35.6857 20.5 30.0057 20.5ZM30.0057 35.5C27.1785 35.5 24.8654 33.25 24.8654 30.5C24.8654 27.75 27.1785 25.5 30.0057 25.5C32.8328 25.5 35.1459 27.75 35.1459 30.5C35.1459 33.25 32.8328 35.5 30.0057 35.5Z"
      fill={"var(--header-text)"}
    />
  </svg>
);

const DarkBarChart = ({
  data = [],
  barPerPage = 8,
  loading,
  title,
  autoIncreasePageTime = 20000,
  useBackground = false,
  openConfig,
  dataKey = "name",
  valueKey = "value",
  useCurrencyFormat = false,
  valueLabelText,
  percentLabelText,
  valueLabelKey,
  useTooltip = true,
  tooltipProps = {},
}) => {
  const [paging, setPaging] = useState({
    size: barPerPage,
    total: data?.length,
    current: 1,
  });

  const [currentLoading, setCurrentLoading] = useState(false);
  const [showingData, setShowingData] = useState([]);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      size: barPerPage,
      total: data?.length,
      current: 1,
    }));
  }, [data, barPerPage]);

  useEffect(() => {
    setCurrentLoading(true);
    setTimeout(() => {
      setShowingData(
        (data || []).filter(
          (item, index) =>
            index >= paging.size * (paging.current - 1) &&
            index < paging.size * paging.current
        )
      );
      setCurrentLoading(false);
    }, 200);
  }, [data, paging.size, paging.current, barPerPage]);

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
    <DarkBarChartStyled useBackground={useBackground}>
      <div className="header">
        <div className="title">{title}</div>
        {openConfig && (
          <div className="config-button" onClick={openConfig}>
            Tùy chỉnh {configIcon}
          </div>
        )}
      </div>
      {loading || currentLoading ? (
        <Loading isAbsolute type="chart" whiteLoading />
      ) : !showingData || isEmpty(showingData) ? (
        <ChartNoDataContent />
      ) : (
        <DarkbarChartContent
          dataKey={dataKey}
          valueKey={valueKey}
          useCurrencyFormat={useCurrencyFormat}
          valueLabelText={valueLabelText}
          percentLabelText={percentLabelText}
          valueLabelKey={valueLabelKey}
          useTooltip={useTooltip}
          tooltipProps={tooltipProps}
          dataSource={showingData}
        />
      )}
      <div className="pagination">
        <Pagination
          current={paging.current}
          total={paging.total}
          pageSize={paging.size}
          onChange={handlePageChange}
        />
      </div>
    </DarkBarChartStyled>
  );
};

export default React.memo(DarkBarChart);
