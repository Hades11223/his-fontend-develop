import React from "react";
import styled, { keyframes } from "styled-components";
import usePaging from "../../hooks/usePaging";
import { Pagination } from "antd";
import { GroupTransparentStyled } from "./styled";

const GroupTransparent = ({
  grow,
  children,
  isVertical,
  isPaging,
  autoIncreasePageTime = 20000,
  recordPerPage = 8,
  dataList,
  renderChildren,
  style,
  useTotalAt0 = false,
}) => {
  const { showingData, handlePageChange, paging } = usePaging({
    recordPerPage,
    autoIncreasePageTime,
    dataSource: dataList,
    useTotalAt0: useTotalAt0,
  });

  return (
    <GroupTransparentStyled
      style={{ flexGrow: grow || 0, ...style }}
      isVertical={isVertical}
      isPaging={isPaging}
    >
      <div className="group-content">
        {renderChildren
          ? renderChildren(isPaging ? showingData : dataList)
          : children}
      </div>
      {isPaging && (
        <div className="pagination">
          <Pagination
            current={paging.current}
            total={paging.total}
            pageSize={paging.size}
            onChange={handlePageChange}
          />
        </div>
      )}
    </GroupTransparentStyled>
  );
};

export default React.memo(GroupTransparent);
