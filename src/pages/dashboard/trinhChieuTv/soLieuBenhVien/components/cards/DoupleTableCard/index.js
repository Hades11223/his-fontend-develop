import React, { useMemo } from "react";
import Loading from "../../common/Loading";
import usePaging from "../../hooks/usePaging";
import { Pagination } from "antd";
import InpatientTable from "../../tables/table";
import { DoubleTableStyled } from "./styled";

const DoubleTable = (props) => {
  const {
    loading,
    dataSource,
    title,
    recordPerPage = 29,
    autoIncreasePageTime = 20000,
    formatColumns,
    id,
    makeSummaryRow,
    onRow,
  } = props;

  const { showingData, handlePageChange, paging } = usePaging({
    recordPerPage,
    autoIncreasePageTime,
    dataSource,
  });

  const showingDataTable1 = useMemo(() => {
    return (showingData || []).filter(
      (item, index) => index < (recordPerPage - 1) / 2
    );
  }, [showingData]);

  const showingDataTable2 = useMemo(() => {
    return (showingData || []).filter(
      (item, index) => index >= (recordPerPage - 1) / 2
    );
  }, [showingData]);

  return (
    <DoubleTableStyled>
      <div className="card-info-content">
        <div className="title">{title}</div>
        <div className="double-table-wrapper">
          <div className="table-wrapper">
            <div className="table-card-wrapper">
              <InpatientTable
                id={`${id}-table-1`}
                dataSource={showingDataTable1}
                originData={dataSource}
                formatColumns={formatColumns}
                makeSummaryRow={makeSummaryRow}
                recordPerPage={(recordPerPage - (recordPerPage % 2)) / 2}
                loading={loading}
                noPaging
                useOriginData
                onRow={onRow}
              />
            </div>
          </div>
          <div className="table-wrapper">
            <div className="table-card-wrapper">
              <InpatientTable
                id={`${id}-table-2`}
                dataSource={showingDataTable2}
                originData={dataSource}
                formatColumns={formatColumns}
                recordPerPage={
                  (recordPerPage - (recordPerPage % 2)) / 2 +
                  (recordPerPage % 2)
                }
                loading={loading}
                noPaging
                useOriginData
                onRow={onRow}
              />
            </div>
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
    </DoubleTableStyled>
  );
};

export default React.memo(DoubleTable);
