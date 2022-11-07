import React, { useMemo } from "react";
import { Main } from "./styled";
import { Input, Table } from "antd";
import IcSearch from "assets/images/template/icSearch.png";
import { Pagination } from "components";

const TableWrapper = ({
  title,
  columns = [],
  data = [],
  isShowSearch = false,
  isShowBtn = false,
  rightBtn = () => {},
  onChangeSearch = () => {},
  searchPlaceHolder = "",
  isTable = true,
  className,
  totalElements,
  page,
  size,
  onSearch,
  params,
  ...props
}) => {
  const ds = useMemo(() => {
    return [...data];
  }, [data]);

  const onChangePage = (page) => {
    onSearch({ page: page - 1, ...params });
  };

  const handleSizeChange = (size) => {
    onSearch({ size, ...params });
  };

  return (
    <Main className={className}>
      <div className="header">
        <div className="_title">{title}</div>
        {isShowSearch && (
          <div className="_search">
            <Input
              onChange={onChangeSearch}
              placeholder={`${searchPlaceHolder}`}
            />
            <img src={IcSearch} alt="iSofh" />
          </div>
        )}
        {isShowBtn && <div className="_right_btn">{rightBtn}</div>}
      </div>
      <div className="wrapper">
        {isTable ? (
          <Table
            rowClassName={(record, index) => (index % 2 === 0 ? "bg-blue" : "")}
            rowKey={props.rowKey || "id"}
            pagination={false}
            columns={columns}
            dataSource={ds}
            {...props}
          />
        ) : (
          props.children
        )}
        {!!totalElements && (
          <Pagination
            listData={ds}
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            style={{ justifyContent: "flex-end" }}
          />
        )}
      </div>
    </Main>
  );
};

export default TableWrapper;
