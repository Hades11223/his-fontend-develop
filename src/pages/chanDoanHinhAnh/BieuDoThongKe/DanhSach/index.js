import React, { useEffect, useRef } from "react";
import { TableWrapper, Pagination } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./general";
import { useTranslation } from "react-i18next";
const DanhSach = (props) => {
  const { t } = useTranslation();
  const {
    dashboardCDHA: { dataSortColumn, totalElements, page, size, listTheoBacSi },
  } = useSelector((state) => state);
  const {
    dashboardCDHA: { onSizeChange, onSortChange, onSearch },
  } = useDispatch();
  const refSettings = useRef(null);

  useEffect(() => {
    // onSizeChange(10);
  }, []);
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        // history.push("/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/" + record.id);
      },
    };
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };
  return (
    <Main noPadding={true} bottom={0}>
      <TableWrapper
        columns={columns({
          t,
          onClickSort,
          onSettings,
          dataSortColumn,
        })}
        dataSource={listTheoBacSi}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 2000 }}
        tableName="table_CDHA_Dashboard"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listTheoBacSi}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      )}
    </Main>
  );
};

export default DanhSach;
