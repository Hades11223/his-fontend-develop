import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { columns } from "./general";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const DanhSach = (props) => {
  const { t } = useTranslation();
  const {
    danhSachNguoiBenhNoiTru: {
      dataSortColumn,
      listNbLapBenhAn,
      totalElements,
      page,
      size,
    },
  } = useSelector((state) => state);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);

  const {
    danhSachNguoiBenhNoiTru: { onSizeChange, onSortChange, onSearch },
  } = useDispatch();
  const refSettings = useRef(null);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: onViewDetail(record),
    };
  };
  const onViewDetail = (record) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    history.push("/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/" + record.id);
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns({
          t,
          onClickSort,
          onSettings,
          dataSortColumn,
          listTrangThaiNb,
          onViewDetail,
        })}
        dataSource={listNbLapBenhAn}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 2000 }}
        tableName="table_QLNT_NguoiBenhNoiTru"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listNbLapBenhAn}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

export default DanhSach;
