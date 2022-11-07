import React, { useEffect } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC } from "constants/index";
import { connect } from "react-redux";

const DichVuTongHop = (props) => {
  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };
  useEffect(() => {
    props.onSizeChange({ page: 0 });
  }, []);
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    props.onChangeInputSearch({
      [key]: value,
    });
  };
  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    props.onSizeChange({ size });
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 4,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dv cấp 1"
          sort_key="nhomDichVuCap2.nhomDichVuCap1.ten"
          onClickSort={onClickSort}
          dataSort={
            props.dataSortColumn["nhomDichVuCap2.nhomDichVuCap1.ten"] || 0
          }
          search={
            <Input
              placeholder="Tìm nhóm dv cấp 1"
              onChange={onSearchInput("nhomDichVuCap1.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "nhomDichVuCap1",
      key: "nhomDichVuCap1",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dv cấp 2"
          sort_key="nhomDichVuCap2.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhomDichVuCap2.ten"] || 0}
          search={
            <Input
              placeholder="Tìm theo nhóm dv cấp 2"
              onChange={onSearchInput("nhomDichVuCap2.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "nhomDichVuCap2",
      key: "nhomDichVuCap2",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dv cấp 3"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm theo nhóm dv cấp 3"
              onChange={onSearchInput("ten")}
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
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
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
  return (
    <div>
      <TableWrapper columns={columnsGroup} dataSource={props.listData} />
      {props.totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={props.page + 1}
          pageSize={props.size}
          listData={props.listData}
          total={props.totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVuTongHop: { listData, size, page, totalElements, dataSortColumn },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    dataSortColumn: dataSortColumn || { active: 2 },
  };
};
const mapDispatchToProps = ({
  dichVuTongHop: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    onChangePage,
  },
}) => {
  return {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    onChangePage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DichVuTongHop);
