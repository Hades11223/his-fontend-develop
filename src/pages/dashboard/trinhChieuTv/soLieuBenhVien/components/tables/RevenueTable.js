import React from "react";
import styled, { keyframes } from "styled-components";
import { Button, Empty, Pagination } from "antd";
import Loading from "../common/Loading";
import usePaging from "../hooks/usePaging";
import { isEmpty } from "lodash";

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;

const RevenueTableStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: calc(8 * 100vw / 3840);
  padding-bottom: calc(40 * 100vw / 3840);
  .revenue-table-content {
    width: 100%;
    height: 100%;
    background: #000e25;
    border-radius: calc(32 * 100vw / 3840);
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
  .row {
    display: flex;
    border-bottom: solid 2px #56ccf2;
    height: fit-content;
    align-content: stretch;
    :last-child {
      border-bottom: none;
    }
    .cell {
      display: flex;
      color: white;
      flex-direction: row;
      align-self: stretch;
      align-items: center;
      justify-content: center;
      &.padding-cell {
        padding: calc(32 * 100vw / 3840);
      }
      border-right: solid 2px #56ccf2;
      &.verticle {
        flex-direction: column;
      }
      :last-child {
        border-right: none;
      }
      button {
        background: transparent;
        border: none;
        border-radius: calc(16.446 * 100vw / 3840);
        color: #f2c94c;
        width: 100%;
        height: fit-content;
        > span {
          font-weight: 900;
          font-size: calc(45 * 100vw / 3840);
          line-height: calc(61 * 100vw / 3840);
        }
        &.active {
          color: #172b4d;
          background: #f2c94c;
        }
      }
    }
  }
  .flex-row {
    display: flex;
    border-top: solid 2px #56ccf2;
    width: 100%;
    flex-direction: row;
    > div {
      flex: 1;
      border-right: solid 2px #56ccf2;
      :last-child {
        border-right: none;
      }
    }
  }
  .text-1 {
    font-weight: 900;
    font-size: 50px;
    line-height: 115%;
    text-transform: uppercase;
    color: #f2c94c;
    padding: calc(40 * 100vw / 3840) calc(20 * 100vw / 3840);
    text-align: center;
  }
  .text-2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 115%;
    color: #f2c94c;
    padding: calc(20 * 100vw / 3840);
  }
  .text-3 {
    font-weight: 700;
    font-size: calc(50 * 100vw / 3840);
    line-height: 115%;
    color: #ffffff;
  }
  .row.revenue-header,
  .cell.verticle {
    > div {
      flex: 1;
    }
  }
  .revenue-table-content,
  .revenue-table {
    width: 100%;
    height: 100%;
  }
  .table-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    > .row {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      > div {
        flex: 1;
      }
    }
  }
  .empty {
    .ant-empty {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-empty-image {
      height: calc(50 / 1367 * 100vw);
      svg {
        width: calc(92 / 1367 * 100vw);
        height: calc(76 / 1367 * 100vw);
      }
    }
    .ant-empty-description {
      font-weight: 700;
      font-size: calc(50 * 100vw / 3840);
      line-height: 115%;
      color: #ffffff;
    }
  }
`;

const RevenueTable = ({
  dataSource,
  loading,
  recordPerPage = 9,
  autoIncreasePageTime = 20000,
  setServiceType,
  serviceType,
}) => {
  const { showingData, handlePageChange, paging } = usePaging({
    recordPerPage,
    autoIncreasePageTime,
    dataSource,
    setServiceType,
    serviceType,
  });

  const renderRow = (item) => {
    return (
      <>
        <div className="cell text-3">{item.ten}</div>
        <div className="cell">
          <div className="text-3">{item.soLuongChiDinh}</div>
          <div className="text-3" style={{ flexGrow: 2 }}>
            {item.thanhTienChiDinh}
          </div>
        </div>
        <div className="cell">
          <div className="text-3">{item.soLuongThucLam}</div>
          <div className="text-3" style={{ flexGrow: 2 }}>
            {item.thanhTienThucLam}
          </div>
        </div>
        <div className="cell">
          <div className="text-3">{item.soLuongThanhToan}</div>
          <div className="text-3" style={{ flexGrow: 2 }}>
            {item.thanhTienThanhToan}
          </div>
        </div>
      </>
    );
  };

  return (
    <RevenueTableStyled id={`revenue-table-tv`}>
      <div className="revenue-table-content">
        <div className="revenue-table">
          <div className="row revenue-header">
            <div className="cell verticle padding-cell">
              <Button
                className={`button ${serviceType === 1 && "active"}`}
                onClick={() => setServiceType && setServiceType(1)}
              >
                LOẠI DỊCH VỤ
              </Button>
              <Button
                className={`button ${serviceType === 2 && "active"}`}
                onClick={() => setServiceType && setServiceType(2)}
              >
                LOẠI HÌNH DỊCH VỤ
              </Button>
            </div>
            <div className="cell verticle">
              <div className="text-1">CHỈ ĐỊNH</div>
              <div className="flex-row">
                <div className="text-2">SL</div>
                <div className="text-2" style={{ flexGrow: 2 }}>
                  Thành tiền
                </div>
              </div>
            </div>
            <div className="cell verticle">
              <div className="text-1">THỰC LÀM</div>
              <div className="flex-row">
                <div className="text-2">SL</div>
                <div className="text-2" style={{ flexGrow: 2 }}>
                  Thành tiền
                </div>
              </div>
            </div>
            <div className="cell verticle">
              <div className="text-1">THANH TOÁN</div>
              <div className="flex-row">
                <div className="text-2">SL</div>
                <div className="text-2" style={{ flexGrow: 2 }}>
                  Thành tiền
                </div>
              </div>
            </div>
          </div>
          <div className="table-content">
            {loading ? (
              <Loading isAbsolute type="chart" whiteLoading />
            ) : (
              <>
                {(showingData || []).map((item, index) => {
                  return (
                    <div className="row" key={`row-${item.id || ""}-${index}`}>
                      {renderRow(item)}
                    </div>
                  );
                })}
                {isEmpty(showingData) && (
                  <div
                    className="row empty text-3
                
                "
                    style={{ flexGrow: 9 }}
                  >
                    <Empty />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="pagination">
        <Pagination
          current={paging.current}
          total={paging.total}
          pageSize={paging.size}
          onChange={handlePageChange}
        />
      </div>
    </RevenueTableStyled>
  );
};

export default React.memo(RevenueTable);
