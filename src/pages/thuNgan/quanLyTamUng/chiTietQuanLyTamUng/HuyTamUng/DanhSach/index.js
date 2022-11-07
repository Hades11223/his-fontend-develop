import React, { useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./general";
import { useTranslation } from "react-i18next";

const DanhSach = (props) => {
  const { t } = useTranslation();
  const { dataSortColumn, listDsHuyTamUng, totalElements, page, size } =
    useSelector((state) => state.huyTamUng);
  const { onSizeChange, onSortChange, onSearch } = useDispatch().huyTamUng;
  const refSettings = useRef(null);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        // history.push("/thu-ngan/quan-ly-tam-ung/" + record.id);
      },
    };
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns({
            onClickSort,
            onSettings,
            dataSortColumn,
          })}
          dataSource={listDsHuyTamUng}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          scroll={{ x: 2000 }}
          tableName="tableHuyTamUng"
          ref={refSettings}
          title={t("thuNgan.quanLyTamUng.danhSachPhieuHuyTamUng")}
          classNameRow={"custom-header"}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 35,
          }}
        />
        {!!totalElements && (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listDsHuyTamUng}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            stylePagination={{ flex: 1, justifyContent: "flex-start" }}
          />
        )}
      </ContentTable>
    </Main>
  );
};

export default DanhSach;
