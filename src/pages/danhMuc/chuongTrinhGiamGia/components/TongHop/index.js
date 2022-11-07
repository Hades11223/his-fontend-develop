import React, { useEffect, useState, useMemo } from "react";
import { Checkbox, Input, InputNumber, DatePicker } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC, PAGE_DEFAULT } from "constants/index";
import { connect } from "react-redux";
import { combineSort } from "utils";
import moment from "moment";
import TabPanel from "components/MultiLevelTab/TabPanel";
let timer = null;
const dateFormat = "DD/MM/YYYY";

const TongHop = (props) => {
  const data = useMemo(() => {
    return props.listTongHop.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: props.page * props.size + index + 1,
      };
    });
  }, [props.listTongHop]);

  useEffect(() => {
    const res = combineSort(props.dataSortColumn);
    props.getTongHop({ sort: res });
  }, []);

  useEffect(() => {
    props.getListAllChuongTrinhGiamGia({});
  }, []);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...props.dataSortColumn, [key]: value };
    props.updateData({ dataSortTongHop: sort });
    const res = combineSort(sort);
    props.getTongHop({
      page: PAGE_DEFAULT,
      size: props.size,
      sort: res,
      ...props.dataSearch,
    });
  };
  const onSearchInput = (name) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d.format("dd/MM/yyyy");
    else value = e;
    onChangeInputSearch(value, name);
  };

  const onChangeInputSearch = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      props.updateData({
        dataSearchTongHop: { ...props.dataSearch, [name]: value },
      });
      props.getTongHop({
        ...props.dataSearch,
        page: PAGE_DEFAULT,
        size: props.size,
        [name]: value,
        sort: combineSort(props.dataSortColumn),
      });
    }, 300);
  };
  const onChangePage = (page) => {
    const params = { page: page - 1, size: props.size };
    props.updateData(params);
    props.getTongHop({
      ...params,
      ...props.dataSearch,
      sort: combineSort(props.dataSortColumn),
    });
  };

  const handleSizeChange = (size) => {
    const params = { page: props.page, size };
    props.updateData(params);
    props.getTongHop({
      ...params,
      ...props.dataSearch,
      sort: combineSort(props.dataSortColumn),
    });
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên chương trình"
          sort_key="tenChuongTrinh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.tenChuongTrinh || 0}
          search={
            <Input
              placeholder="Tìm tên chương trình"
              onChange={onSearchInput("tenChuongTrinh")}
              ten={"tenChuongTrinh"}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tenChuongTrinh",
      key: "tenChuongTrinh",
    },
    {
      title: (
        <HeaderSearch
          title="Mã voucher"
          sort_key="maVoucher"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.maVoucher || 0}
          search={
            <Input
              placeholder="Tìm mã voucher"
              onChange={onSearchInput("maVoucher")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "maVoucher",
      key: "maVoucher",
    },
    {
      title: (
        <HeaderSearch
          title="Mô tả"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.moTa || 0}
          search={
            <Input placeholder="Tìm mô tả" onChange={onSearchInput("moTa")} />
          }
        />
      ),
      width: 150,
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng từ ngày"
          sort_key="tuNgay"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.tuNgay || 0}
          searchSelect={
            <DatePicker
              placeholder="Tìm áp dụng từ ngày"
              onChange={onSearchInput("tuNgay")}
              format={dateFormat}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tuNgay",
      key: "tuNgay",
      align: "center",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng đến ngày"
          sort_key="denNgay"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.denNgay || 0}
          searchSelect={
            <DatePicker
              placeholder="Tìm áp dụng đến ngày"
              onChange={onSearchInput("denNgay")}
              format={dateFormat}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "denNgay",
      key: "denNgay",
      align: "center",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY");
      },
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
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];
  return (
    <TabPanel>
      <TableWrapper columns={columnsGroup} dataSource={data} />
      {props.totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={props.page + 1}
          pageSize={props.size}
          total={props.totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </TabPanel>
  );
};

const mapStateToProps = (state) => {
  const {
    maGiamGia: {
      listTongHop,
      totalTongHop: totalElements,
      pageTongHop: page,
      sizeTongHop: size,
      dataSortTongHop: dataSortColumn,
      dataSearchTongHop: dataSearch,
    },
    utils: { listhinhThucGiamGia, listcachThucGiamGia, listloaiApDungGiamGia },
  } = state;

  return {
    listTongHop: listTongHop || [],
    totalElements,
    page,
    size,
    dataSortColumn: dataSortColumn || [],
    dataSearch,
    listhinhThucGiamGia,
    listcachThucGiamGia,
    listloaiApDungGiamGia,
  };
};
const mapDispatchToProps = ({
  maGiamGia: { getTongHop, updateData },
  chuongTrinhGiamGia: { getListAllChuongTrinhGiamGia },
  utils: { getUtils },
}) => ({
  getTongHop,
  updateData,
  getUtils,
  getListAllChuongTrinhGiamGia,
});
export default connect(mapStateToProps, mapDispatchToProps)(TongHop);
