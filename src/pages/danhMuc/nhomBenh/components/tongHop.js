import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { connect } from "react-redux";
let timer = null;

const TongHop = ({
  listData,
  page,
  size,
  total,
  updateData,
  onSearch,
  dataSearch,
  dataSortTongHop,
}) => {
  const [data, setData] = useState([]);
  const onClickSort = (key, value) => {
    const sort = { ...dataSortTongHop, [key]: value };
    updateData({ dataSortTongHopTongHop: sort, [key]: value });
    const res = combineSort(sort);
    onSearch({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };
  useEffect(() => {
    setData(
      listData.map((item, index) => {
        return {
          ...item,
          action: item,
          stt: page * size + index + 1,
        };
      })
    );
  }, [listData, page, size]);
  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataonSearch: { ...dataSearch, [name]: value },
      });
      onSearch({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(dataSortTongHop),
      });
    }, 500);
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 4,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên bệnh"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSortTongHop={dataSortTongHop.ten || 0}
          search={
            <Input
              placeholder="Tìm tên bệnh"
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
          title="Tên loại bệnh"
          sort_key="loaiBenh.ten"
          onClickSort={onClickSort}
          dataSortTongHop={dataSortTongHop["loaiBenh.ten"] || 0}
          search={
            <Input
              placeholder="Tìm loại bệnh"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "loaiBenh",
      key: "loaiBenh",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhóm bệnh chính"
          sort_key="nhomBenhChinh.ten"
          onClickSort={onClickSort}
          dataSortTongHop={dataSortTongHop["nhomBenhChinh.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên nhóm bệnh chính"
              onChange={(e) => {
                onSearchInput(e.target.value, "tenNhomBenhChinh");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "nhomBenhChinh",
      key: "nhomBenhChinh",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhóm phụ I"
          sort_key="nhomBenhPhu1.ten"
          onClickSort={onClickSort}
          dataSortTongHop={dataSortTongHop["nhomBenhPhu1.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên nhóm phụ I"
              onChange={(e) => {
                onSearchInput(e.target.value, "tenNhomBenhPhu1");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "nhomBenhPhu1",
      key: "nhomBenhPhu1",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhóm phụ II"
          sort_key="nhomBenhPhu2.ten"
          onClickSort={onClickSort}
          dataSortTongHop={dataSortTongHop["nhomBenhPhu2.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên nhóm phụ II"
              onChange={(e) => {
                onSearchInput(e.target.value, "tenNhomBenhPhu2");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "nhomBenhPhu2",
      key: "nhomBenhPhu2",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên chương"
          sort_key="chuongBenh.ten"
          onClickSort={onClickSort}
          dataSortTongHop={dataSortTongHop["chuongBenh.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên chương"
              onChange={(e) => {
                onSearchInput(e.target.value, "tenChuongBenh");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "chuongBenh",
      key: "chuongBenh",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSortTongHop={dataSortTongHop.active || 0}
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
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const onSizeChange = (size) => {
    const params = {
      page,
      size,
    };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortTongHop),
    });
  };
  const onPageChange = (values) => {
    const params = { page: values - 1, size };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortTongHop),
    });
  };
  return (
    <div>
      <TableWrapper columns={columnsGroup} dataSource={data} />
      {total > 0 && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={total}
          listData={data}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = ({ maBenh: { updateData, onSearch } }) => ({
  updateData,
  onSearch,
});
export default connect((state) => {
  const {
    maBenh: {
      listData,
      total,
      page,
      size,
      dataEdit,
      dataSearch,
      dataSortTongHop,
    },
  } = state;
  return { listData, dataEdit, dataSearch, dataSortTongHop, total, page, size };
}, mapDispatchToProps)(TongHop);
