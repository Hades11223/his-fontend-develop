import React, { useMemo, useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { Table, Pagination } from "antd";
import Loading from "../common/Loading";
import useMarquee from "../hooks/useMarquee";
import ChartNoDataContent from "../charts/NoData";
import { isEmpty } from "lodash";

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;
const row_appear_animaition = keyframes`
0% {
  opacity: 0;
  transform: translateY(-100%);
}
100% {

}
`;

const TableCardStyled = styled.div`
  height: 100%;
  padding: 0.41666666666vw;
  position: relative;
  /* background: #ffffff; */
  background: transparent;
  border-radius: 6px;
  & .ant-table-thead {
    background: #eff1f2;
  }
  & .ant-table-cell {
    font-weight: 700;
    font-size: 0.9vw;
    color: #223645;
  }
  .ant-table-cell > .number {
    text-align: right;
    &.red {
      /* color: #eb5757 !important; */
      color: #dc2626 !important;
    }
    &.blue {
      /* color: #27ae60 !important; */
      color: #16a34a !important;
    }
    &.yellow {
      color: #f2c94c !important;
    }
  }
  .title {
    font-weight: 900;
    font-size: 0.91145833333vw;
    line-height: 1.25vw;
    color: var(--text) !important; //#ffffff
    margin-bottom: 0.5em;
    &-box {
      display: flex;
      justify-content: space-between;
    }
  }
  div,
  th {
    background: transparent !important;
    color: var(--text) !important; //#ffffff
  }
  table {
    font-size: 1.2vw;
    tr {
      height: 2vw;
    }
    td,
    th {
      padding: 0.625vw;
    }
    @media all and (max-width: 2561px) {
      td,
      th {
        padding: 0.41666666666vw;
      }
    }
    @media all and (max-width: 1921px) {
      font-size: 1.1vw;
      td,
      th {
        padding: 0.41666666666vw;
      }
    }
    @media all and (max-width: 1367px) {
      font-size: 1vw;
      td,
      th {
        padding: 0.41666666666vw;
      }
    }
    background: transparent !important;
    max-height: 95%;
    overflow: scroll;
    .summary-row {
      /* background: var(--row-total); //#172b4d */
      background: rgba(26, 182, 157, 0.15);
      animation: ${row_appear_animaition} 300ms ease-in-out;
    }
    .animation-row {
      animation: ${row_appear_animaition} 300ms ease-in-out;
    }
    .ant-table-cell-row-hover {
      background: var(--row-hover) !important;
    }
    th {
      border: none;
    }
    .limited-content {
      max-height: 3.56875vw;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .text-auto-running {
    overflow-x: scroll;
    overflow-y: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    width: 100%;
    display: inline-flex;
    text-overflow: clip;
    white-space: nowrap;
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
        width: 0.57291666666vw;
        height: 0.57291666666vw;
        border: 0.10416666666vw solid #f2994a;
        background: transparent;
        &.ant-pagination-item-active {
          animation: ${paging_item_moving} 300ms ease-in-out;
          background: #f2994a;
        }
        a {
          display: none;
        }
      }
    }
  }
  .linear-gradient-td {
    background-image: linear-gradient(
      90deg,
      var(--line-bar-table-1) 0%,
      var(--line-bar-table-2) 75%,
      var(--line-bar-table-3) 100%
    ) !important;
  }
`;

const CustomTable = ({
  dataSource,
  loading,
  title,
  recordPerPage = 6,
  autoIncreasePageTime = 20000,
  formatColumns = () => [],
  makeSummaryRow,
  id = "",
  noPaging = false,
  originData,
  useOriginData = false,
  style,
  onRow,
}) => {
  const [paging, setPaging] = useState({
    size: recordPerPage,
    total: dataSource?.length,
    current: 1,
  });
  const [showingData, setShowingData] = useState([]);
  useMarquee(`#custom-table-${id} .text-auto-running`, 0, 1000, showingData);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      size: recordPerPage,
      total: dataSource?.length,
      current: 1,
    }));
  }, [dataSource, recordPerPage]);

  useEffect(() => {
    const dataShowing = (dataSource || []).filter(
      (item, index) =>
        index >= paging.size * (paging.current - 1) &&
        index < paging.size * paging.current
    );
    if (makeSummaryRow) {
      const summaryRow = makeSummaryRow(
        useOriginData ? originData : dataSource
      );
      dataShowing.unshift(summaryRow);
    }
    setShowingData(dataShowing);
  }, [dataSource, paging, makeSummaryRow, originData]);

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

  const columns = useMemo(() => {
    return formatColumns(useOriginData ? originData : dataSource);
  }, [dataSource, originData]);

  const handlePageChange = useCallback((page, pageSize) => {
    setPaging((prev) => ({
      ...prev,
      current: page,
    }));
  }, []);
  const emptyData = !showingData || isEmpty(showingData);

  return (
    <TableCardStyled id={`custom-table-${id}`} style={style}>
      {title && <div className="title">{title}</div>}
      {loading ? (
        <Loading isAbsolute type="chart" whiteLoading />
      ) : emptyData ? (
        <ChartNoDataContent />
      ) : (
        <Table
          loading={loading}
          dataSource={showingData}
          columns={columns}
          rowKey={(rec) => rec.id}
          pagination={false}
          rowClassName={(rec) => {
            if (rec.id === "summary-row") {
              return "summary-row";
            } else return "animation-row";
          }}
          onRow={onRow}
        />
      )}
      {!noPaging && (
        <div className="pagination">
          <Pagination
            current={paging.current}
            total={paging.total}
            pageSize={paging.size}
            onChange={handlePageChange}
          />
        </div>
      )}
    </TableCardStyled>
  );
};

export default React.memo(CustomTable);
