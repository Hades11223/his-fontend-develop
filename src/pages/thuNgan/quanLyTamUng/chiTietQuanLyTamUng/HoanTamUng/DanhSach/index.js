import React, { useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./general";
import { useTranslation } from "react-i18next";
import printProvider from "data-access/print-provider";

const DanhSach = (props) => {
  const { hiddenHeader } = props;
  const { t } = useTranslation();
  const { dataSortColumn, listDsHoanTamUng, totalElements, page, size } =
    useSelector((state) => state.hoanTamUng);
  const { onSizeChange, onSortChange, onSearch, onChangeInputSearch } =
    useDispatch().hoanTamUng;
  const { inPhieuTamUng } = useDispatch().thuTamUng;

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

  const onSearchInput = (key) => (e) => {
    let value = e.target.value;
    onChangeInputSearch({ [key]: value });
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

  const onInPhieuTamUng = (idPhieuThu) => {
    inPhieuTamUng(idPhieuThu).then((s) => {
      printProvider.printMergePdf([s?.data.file.pdf]);
    });
  };
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns({
            onClickSort,
            onSettings,
            dataSortColumn,
            t,
            onSearchInput,
            onInPhieuTamUng,
          })}
          dataSource={listDsHoanTamUng}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          scroll={{ x: 1800 }}
          tableName="tableHoanTamUng"
          ref={refSettings}
          title={t("thuNgan.quanLyTamUng.danhSachPhieuHoanTamUng")}
          classNameRow={`custom-header ${hiddenHeader ? "none" : ""}`}
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
            listData={listDsHoanTamUng}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
          />
        )}
      </ContentTable>
    </Main>
  );
};

export default DanhSach;
