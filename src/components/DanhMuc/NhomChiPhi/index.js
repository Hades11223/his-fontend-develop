import React, { useState, useEffect, useMemo } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import { HIEU_LUC } from "constants/index";
import { Checkbox, DatePicker } from "antd";
import moment from "moment";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
import { Main } from "./styled";

function NhomChiPhi(props) {
  const { size, page, totalElements, dichVuId, refCallbackSave = {} } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.getData({ dichVuId });
    props.getListAllNhomChiPhi({ size: 500 });
    props.getUtils({
      name: "ThoiGianApDungNhomChiPhi",
    });
  }, [dichVuId]);

  useEffect(() => {
    setState({
      listAllNhomChiPhi: [
        { id: "", ten: "Tất cả" },
        ...props.listAllNhomChiPhi.map((x) => {
          return { ...x, ten: `${x.ma} - ${x.ten}` };
        }),
      ],
    });
  }, [props.listAllNhomChiPhi]);

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
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    props.onChangeInputSearch({
      [key]: value,
      dichVuId,
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
      state.currentItem[key] = value;
    }
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, dichVuId });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, dichVuId });
  };
  const getDefaultValue = (value) => {
    if (value?.toDateObject) {
      // return value.toDateObject();
      return moment(value.toDateObject());
    }
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
              onClick={() => openInNewTab("/danh-muc/khoa")}
            >
              Nhóm chi phí
            </div>
          }
          sort_key="nhomChiPhi.id"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhomChiPhi.id"] || 0}
          searchSelect={
            <Select
              data={state.listAllNhomChiPhi}
              placeholder="Chọn nhóm"
              onChange={onSearchInput("nhomChiPhiId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "nhomChiPhi",
      key: "nhomChiPhi",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Select
              placeholder={"Chọn nhóm"}
              data={props.listAllNhomChiPhi.map((x) => {
                return { ...x, ten: `${x.ma} - ${x.ten}` };
              })}
              onSelect={onChange("nhomChiPhiId")}
              value={state.currentItem?.nhomChiPhiId}
            ></Select>
          );
        } else return item && `${item.ma} - ${item.ten}`;
      },
    },

    {
      title: (
        <HeaderSearch
          title="Loại thời gian"
          sort_key="loaiThoiGian"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["loaiThoiGian"] || 0}
          searchSelect={
            <Select
              onChange={onSearchInput("loaiThoiGian")}
              className="select"
              placeholder={"Chọn loại thời gian"}
              data={state.listThoiGianApDungNhomChiPhi}
              allowClear={false}
            ></Select>
          }
        />
      ),
      width: "200px",
      dataIndex: "loaiThoiGian",
      key: "loaiThoiGian",
      render: (item, list, index) => {
        console.log("item", item);
        if (index === state.currentIndex) {
          return (
            <Select
              placeholder={"Chọn loại thời gian"}
              data={props.listThoiGianApDungNhomChiPhi}
              onSelect={onChange("loaiThoiGian")}
              value={state.currentItem?.loaiThoiGian}
            ></Select>
          );
        } else {
          let _selectItem = props.listThoiGianApDungNhomChiPhi.find(
            (x) => x.id === item
          );
          return _selectItem?.ten || "";
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng từ ngày"
          sort_key="tuNgay"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["tuNgay"] || 0}
          require
          searchSelect={
            <DatePicker
              placeholder="Từ ngày"
              format="DD/MM/YYYY"
              onChange={onSearchInput("tuNgay")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "tuNgay",
      key: "tuNgay",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <>
              <DatePicker
                defaultValue={getDefaultValue(state.currentItem?.tuNgay)}
                placeholder="Từ ngày"
                format="DD/MM/YYYY"
                onChange={onChange("tuNgay")}
              />
              {state?.checkValidate && !state.currentItem?.tuNgay && (
                <span className="error">Vui lòng chọn áp dụng từ ngày!</span>
              )}
            </>
          );
        } else return (item && moment(item).format("DD/MM/YYYY")) || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng đến ngày"
          sort_key="denNgay"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["denNgay"] || 0}
          searchSelect={
            <DatePicker
              placeholder="Đến ngày"
              format="DD/MM/YYYY"
              onChange={onSearchInput("denNgay")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "denNgay",
      key: "denNgay",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <DatePicker
              defaultValue={getDefaultValue(state.currentItem?.denNgay)}
              placeholder="Đến ngày"
              format="DD/MM/YYYY"
              onChange={onChange("denNgay")}
            />
          );
        } else return (item && moment(item).format("DD/MM/YYYY")) || "";
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
    if (!state.pressButtonAdded) {
      return {
        onClick: (event) => {
          if (state?.currentIndex !== index)
            setState({
              currentItem: JSON.parse(JSON.stringify(record)),
              currentIndex: index,
              pressedRow: true,
            });
        },
      };
    }
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
    const {
      id,
      dichVuId,
      nhomChiPhiId,
      active = true,
      tuNgay,
      denNgay,
      loaiThoiGian,
    } = state.currentItem || {};
    console.log("state.currentItem", state.currentItem);
    props
      .createOrEdit({
        id,
        nhomChiPhiId,
        dichVuId: dichVuId,
        active,
        tuNgay,
        denNgay,
        loaiThoiGian,
      })
      .then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
          pressButtonAdded: false,
        });
      });
  };
  refCallbackSave.current = onSave;

  const onCancel = () => {
    setState({
      checkValidate: false,
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
    });
  };
  return (
    <Main>
      <EditWrapper
        title={"Nhóm chi phí"}
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        isShowSaveButton={state.currentItem}
        isShowCancelButton={state.currentItem}
        showAdded={dichVuId && !state.currentItem}
        roleSave={props.roleSave}
        roleEdit={props.roleEdit}
        editStatus={state?.pressButtonAdded ? false : editStatus}
        forceShowButtonSave={
          (state?.pressedRow && checkRole(props.roleEdit) && true) ||
          (state.pressButtonAdded && checkRole(props.roleEdit) && true) ||
          false
        }
        forceShowButtonCancel={
          (state?.pressedRow && checkRole(props.roleEdit) && true) ||
          (state.pressButtonAdded && checkRole(props.roleEdit) && true) ||
          false
        }
        isEditAndPressRow={dichVuId && checkRole(props.roleEdit)}
      >
        <fieldset disabled={state?.pressButtonAdded ? false : editStatus}>
          <div>
            <TableWrapper
              scroll={{ y: 500, x: 700 }}
              columns={columns}
              dataSource={dichVuId ? state.data : []}
              onRow={onRow}
            ></TableWrapper>
            {dichVuId && totalElements ? (
              <Pagination
                onChange={onChangePage}
                current={props.page + 1}
                pageSize={props.size}
                total={totalElements}
                onShowSizeChange={onSizeChange}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            ) : null}
          </div>
        </fieldset>
      </EditWrapper>
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    nhomChiPhi: {
      listData,
      size,
      page,
      _totalElements,
      dataSortColumn,
      listAllNhomChiPhi = [],
    },
    utils: { listThoiGianApDungNhomChiPhi = [] },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements: _totalElements,
    listAllNhomChiPhi,
    listThoiGianApDungNhomChiPhi,
    dataSortColumn: dataSortColumn || { active: 2, "dichVu.ten": 1 },
  };
};

const mapDispatchToProps = ({
  nhomChiPhi: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,

    createOrEdit,
    onDelete,
  },
  nhomChiPhi: { getListAllNhomChiPhi },
  utils: { getUtils },
}) => {
  return {
    getData,
    getListAllNhomChiPhi,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,

    createOrEdit,
    onDelete,
    updateData,
    getUtils,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NhomChiPhi);
