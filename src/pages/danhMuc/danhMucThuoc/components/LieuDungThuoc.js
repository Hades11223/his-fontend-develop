import React, { useState, useEffect, useMemo } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import { PAGE_SIZE, HIEU_LUC } from "constants/index";
import { Input, Checkbox, InputNumber } from "antd";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
import TabPanel from "components/MultiLevelTab/TabPanel";
import { cloneDeep } from "lodash";

function LieuDungThuoc(props) {
  const { size, page, currentItem, totalElements, dichVuId } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);

  useEffect(() => {
    props.onSizeChange({ size: PAGE_SIZE });
    props.getListAllLieuDung({});
  }, [props.currentItem]);

  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

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
    } else value = e;
    props.onChangeInputSearch({
      [key]: value,
      dichVuId,
    });
  };

  const onPageChange = (page) => {
    // const params = { page: page - 1, size };
    // props.updateData(params);
    // getListServicesPack({
    //   ...params,
    //   ...dataSearch,
    //   sort: combineSort(dataSortColumn),
    // });
  };
  const onChange = (key, selector, index) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    if (state.currentItem) {
      if (selector) {
        if (!state.currentItem[selector]) state.currentItem[selector] = {};
        state.currentItem[selector][key] = value;
      } else {
        state.currentItem[key] = value;
        const newCurrentItem = cloneDeep(state.currentItem);
        setState({
          currentItem: newCurrentItem,
        });
      }
    }
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
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
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/lieu-dung")}
            >
              Liều dùng
            </div>
          }
          sort_key="lieuDung.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["lieuDung.ten"] || 0}
          searchSelect={
            <Select
              data={props.listData.map((item) => {
                return item && item.lieuDung;
              })}
              placeholder="Chọn liều dùng"
              onChange={onSearchInput("lieuDungId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "lieuDung",
      key: "lieuDung",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Select
              defaultValue={state.currentItem.lieuDungId}
              data={props.listAllLieuDung}
              placeholder="Chọn liều dùng"
              onChange={onChange("lieuDungId", "", index)}
            />
          );
        } else return item?.ten;
      },
    },

    {
      title: (
        <HeaderSearch
          title="Số lần/ngày"
          sort_key="lieuDung.soLan1Ngay"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["lieuDung.soLan1Ngay"] || 0}
          search={
            <Input
              placeholder="Tìm số lần/ngày"
              onChange={onSearchInput("soLan1Ngay")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "lieuDung",
      key: "soLan1Ngay",
      render: (item, list, index) => {
        return item?.soLan1Ngay;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số viên/lần"
          sort_key="lieuDung.soVien1Lan"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["lieuDung.soVien1Lan"] || 0}
          search={
            <Input
              placeholder="Tìm số viên/lần"
              onChange={onSearchInput("lieuDung.soVien1Lan")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "lieuDung",
      key: "soVien1Lan",
      render: (item, list, index) => {
        return item?.soVien1Lan;
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
      width: "100px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else {
          return <Checkbox checked={item} onChange={onChange("active")} />;
        }
      },
    },
  ];
  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        setState({
          currentItem: {
            ...state.currentItem,
            ...JSON.parse(JSON.stringify(record)),
          },
          currentIndex: index,
          pressedRow: true,
        });
      },
    };
  };
  const onAddNewRow = () => {
    let item = { dichVuId, active: true };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      pressButtonAdded: true,
    });
  };
  const onSave = () => {
    const { id, lieuDungId, active } = state.currentItem || {};
    // if (lieuDungId)
    props
      .createOrEdit({
        id,
        lieuDungId,
        active,
        dichVuId: props.currentItem?.id,
        // phongId: state.currentItem?.phong?.id,
      })
      .then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
          pressButtonAdded: false,
        });
      });
  };

  const onCancel = () => {
    setState({
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
    });
  };
  return (
    <TabPanel>
      <EditWrapper
        title={currentItem?.id ? "Liều dùng" : ""}
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        // isShowSaveButton={true}
        // isShowCancelButton={true}
        // showAdded={true}
        showAdded={true}
        roleSave={props.roleSave}
        roleEdit={props.roleEdit}
        editStatus={state?.pressButtonAdded ? false : editStatus}
        forceShowButtonSave={
          (state?.pressedRow && checkRole(props.roleEdit) && true) || false
        }
        forceShowButtonCancel={
          (state?.pressedRow && checkRole(props.roleEdit) && true) || false
        }
      >
        {currentItem?.id && (
          <>
            <TableWrapper
              columns={columns}
              dataSource={state.data}
              onRow={onRow}
            ></TableWrapper>
            {totalElements ? (
              <Pagination
                onChange={onChangePage}
                current={props.page + 1}
                pageSize={props.size}
                total={totalElements}
                listData={state.data}
                onShowSizeChange={onSizeChange}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            ) : null}
          </>
        )}
      </EditWrapper>
    </TabPanel>
  );
}

const mapStateToProps = (state) => {
  const {
    lieuDungThuoc: { listData, size, page, totalElements, dataSortColumn },
    danhMucThuoc: { currentItem },
    lieuDung: { listAllLieuDung },
  } = state;

  return {
    listData,
    size,
    page,
    totalElements,
    currentItem,
    dataSortColumn: dataSortColumn || { active: 2, ten: 1 },
    listAllLieuDung,
  };
};

const mapDispatchToProps = ({
  lieuDungThuoc: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
  },
  lieuDung: { getListAllLieuDung },
}) => {
  return {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
    updateData,
    getListAllLieuDung,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LieuDungThuoc);
