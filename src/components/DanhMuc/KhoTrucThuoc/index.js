import React, { useState, useEffect } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import TabPanel from "components/MultiLevelTab/TabPanel";
import { HIEU_LUC } from "constants/index";
import { Checkbox } from "antd";
function KhoTrucThuoc(props) {
  const { size, page, totalElements, khoQuanLyId } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.getData({ khoQuanLyId });
    props.getAllKhoTongHop({});
  }, [khoQuanLyId]);

  useEffect(() => {
    setState({
      listData: [...props.listData],
    });
  }, [props.listData]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    props.onChangeInputSearch({
      [key]: value,
      khoQuanLyId,
    });
  };

  const onChange = (key, selector) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d;
    else value = e;
    if (state.currentItem) {
      if (selector) {
        if (!state.currentItem[selector]) state.currentItem[selector] = {};
        state.currentItem[selector][key] = value;
      } else state.currentItem[key] = value;
    }
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, khoQuanLyId });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, khoQuanLyId });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
    },
    {
      title: (
        <HeaderSearch
          title="Kho trực thuộc"
          sort_key="khoTrucThuocId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoTrucThuoc.khoTrucThuocId"] || 0}
          searchSelect={
            <Select
              data={props.listData.map((item2, index) => {
                return item2 && item2.khoTrucThuoc;
              })}
              placeholder="Chọn kho"
              onChange={onSearchInput("khoTrucThuocId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "khoTrucThuoc",
      key: "khoTrucThuoc",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Select
              data={props.listAllKho?.map((item) => ({
                ...item,
                label: item.ten,
                value: item.id,
              }))}
              dropdownMatchSelectWidth={400}
              placeholder={"Chọn khoa"}
              onSelect={onChange("khoTrucThuocId")}
              value={state.currentItem?.id}
            />
            // <SelectLargeData
            //   placeholder={"Chọn kho"}
            //   data={props.listAllKho}
            //   onChange={onChange("khoTrucThuocId")}
            //   style={{ width: "100%" }}
            //   getValue={(item) => item?.id}
            //   renderText={(item) => item?.ten}
            //   value={state.currentItem?.id}
            // />
          );
        } else return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} onChange={onChange("active")} />;
      },
    },
  ];
  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        if (state.currentIndex != index)
          setState({
            currentItem: JSON.parse(JSON.stringify(record)),
            currentIndex: index,
          });
      },
    };
  };
  const onAddNewRow = () => {
    let item = { khoQuanLyId, active: true };
    setState({
      currentItem: item,
      currentIndex: 0,
      listData: [item, ...state.listData],
    });
  };
  const onSave = () => {
    const { id, khoTrucThuocId, khoQuanLyId, active } = state.currentItem || {};
    setState({
      checkValidate: false,
    });
    props
      .createOrEdit(
        {
          id,
          khoTrucThuocId: khoTrucThuocId,
          khoQuanLyId: khoQuanLyId,
          active,
        },
        khoQuanLyId
      )
      .then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
        });
      });
  };

  const onCancel = () => {
    setState({
      checkValidate: false,
      currentIndex: -1,
      currentItem: null,
      listData: (state.listData || []).filter((item) => item.id),
    });
  };
  return (
    <TabPanel>
      <EditWrapper
        title={"Kho trực thuộc"}
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        isShowSaveButton={state.currentItem}
        isShowCancelButton={state.currentItem}
        showAdded={khoQuanLyId && !state.currentItem}
      >
        <TableWrapper
          // scroll={{ y: 500, x: 700 }}
          columns={columns}
          dataSource={khoQuanLyId ? state.listData : []}
          onRow={onRow}
        ></TableWrapper>
        {khoQuanLyId && totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={props.page + 1}
            pageSize={props.size}
            total={totalElements}
            listData={khoQuanLyId ? state.listData : []}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
      </EditWrapper>
    </TabPanel>
  );
}

const mapStateToProps = (state) => {
  const {
    quanTriKho: { listData, size, page, totalElements, dataSortColumn },
    kho: { listAllKho },
  } = state;

  return {
    listData: listData || [],
    listAllKho,
    size,
    page,
    totalElements,
    dataSortColumn: dataSortColumn || { active: 2, ["ten"]: 1 },
  };
};

const mapDispatchToProps = ({
  quanTriKho: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onDelete,
    createOrEdit,
  },
  kho: { getAllTongHop: getAllKhoTongHop },
}) => {
  return {
    getAllKhoTongHop,
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onDelete,
    createOrEdit,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KhoTrucThuoc);
