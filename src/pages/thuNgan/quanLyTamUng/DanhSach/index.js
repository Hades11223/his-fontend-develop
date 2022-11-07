import React, { useEffect, useRef } from "react";
import { TableWrapper, Pagination } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { columns } from "./general";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const DanhSach = (props) => {
  const { dataSortColumn, listNbTamUng, totalElements, page, size } =
    useSelector((state) => state.quanLyTamUng);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const {
    quanLyTamUng: { onSizeChange, onSortChange, onSearch },
  } = useDispatch();
  const { nhaTamUng } = props;
  const refSettings = useRef(null);

  useEffect(() => {
    onSizeChange(10);
  }, []);
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
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
    history.push(
      `/thu-ngan/quan-ly-tam-ung/${record.id}?nhaTamUngId=${nhaTamUng}`
    );
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns({
          onClickSort,
          onSettings,
          dataSortColumn,
          listDoiTuongKcb,
          onViewDetail,
        })}
        dataSource={listNbTamUng}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 2000 }}
        tableName="table_thuNgan_quanLyTamUng"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listNbTamUng}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

export default DanhSach;
