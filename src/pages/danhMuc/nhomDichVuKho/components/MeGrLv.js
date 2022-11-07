import React, { useEffect, useState } from "react";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { combineSort } from "utils";
import { LOAI_DICH_VU } from "constants/index";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { Checkbox, Input } from "antd";
let timer = null;

const MeGrLv = (props) => {
  const {
    listMeGrLv,
    page,
    size,
    total,
    sortData,
    searchData,
    dataSearch,
    updateData,
    getListMeGrLv,
    onDelete,
  } = props;
  // const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);

  useEffect(() => {
    const sort = combineSort(sortData);
    const params = {
      page,
      size,
      sort,
      showAll: true,
      loaiDichVu: LOAI_DICH_VU.THUOC,
    };
    getListMeGrLv(params);
  }, []);

  useEffect(() => {
    const data = listMeGrLv.map((item, index) => {
      return { ...item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listMeGrLv, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...sortData, [key]: value };
    updateData({ sortMeGrLv: sort });
    const res = combineSort(sort);
    getListMeGrLv({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...searchData,
      loaiDichVu: LOAI_DICH_VU.THUOC,
      showAll: true,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm thuốc cấp 1"
          sort_key="nhomDvKhoCap1.ten"
          onClickSort={onClickSort}
          dataSort={sortData["nhomDvKhoCap1.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên nhóm thuốc cấp 1"
              onChange={(e) => {
                onSearchInput(e.target.value, "nhomDvKhoCap1.ten");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "nhomDvKhoCap1",
      key: "nhomDvKhoCap1",
      render: (item) => {
        return item && <span>{item.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm thuốc cấp 2"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm tên nhóm thuốc cấp 2"
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
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={sortData.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 9,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearchMeGrLv: { ...searchData, [name]: value } });
      getListMeGrLv({
        ...searchData,
        showAll: true,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(sortData),
        loaiDichVu: LOAI_DICH_VU.THUOC,
      });
    }, 500);
  };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData({ pageMeGrLv: page - 1 });
    getListMeGrLv({
      ...params,
      showAll: true,
      ...searchData,
      sort: combineSort(sortData),
      loaiDichVu: LOAI_DICH_VU.THUOC,
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData({ sizeMeGrLv: size });
    getListMeGrLv({
      ...params,
      showAll: true,
      ...dataSearch,
      sort: combineSort(sortData),
      loaiDichVu: LOAI_DICH_VU.THUOC,
    });
  };

  return (
    <div>
      <TableWrapper columns={columns} dataSource={data}></TableWrapper>
      {total && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          listData={data}
          total={total}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

export default MeGrLv;
