import React, { useState } from "react";
import { Checkbox, Input } from "antd";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import Select from "components/Select";
import { HIEU_LUC } from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import { combineSort } from "utils";
let timer = null;

const Total = ({
  listDonViTinh,
  getListDonViTinh,
  page,
  size,
  total,
  listGroupUnit,
  onPageChange,
  onSizeChange,
  dataSearchUnit,
  updateData,
}) => {
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [currentItem, setCurrentItem] = useState({});
  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const totalSortKey = combineSort(sort);
    updateData({ dataSortUnit: totalSortKey, ...dataSearchUnit });
    getListDonViTinh({
      pageUnit: 0,
      sizeUnit: size,
      sort: totalSortKey,
      ...dataSearchUnit,
    });
  };

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearchUnit: { ...dataSearchUnit, [name]: value } });
      getListDonViTinh({
        ...dataSearchUnit,
        pageUnit: 0,
        sizeUnit: size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 500);
  };

  const columnsTotal = [
    {
      title: <HeaderSearch title="STT" />,
      width: 6,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm đơn vị tính"
          sort_key="nhomDonViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhomDonViTinh || 0}
          search={
            <Input
              placeholder="Tìm theo nhóm đơn vị tính"
              onChange={(e) => {
                onSearchInput(e.target.value, "tenNhomDonViTinh");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "nhomDonViTinh",
      key: "nhomDonViTinh",
      render: (item) => {
        return <span>{item?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị tính"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm theo đơn vị tính"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Chọn hiệu lực"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "active",
      align: "center",
      key: "active",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];
  const onRow = (record) => {
    return {
      onClick: (event) => {
        setCurrentItem(record);
      },
    };
  };
  const setRowClassName = (record) => {
    let idDiff = currentItem?.id;
    return record.id == idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  return (
    <div>
      <TableWrapper
        onRow={onRow}
        rowClassName={setRowClassName}
        columns={columnsTotal}
        dataSource={listDonViTinh}
      />
      {!!total && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={total}
          listData={listDonViTinh}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};
export default Total;
