import React, { useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import { HIEU_LUC } from "constants/index";
import { Input, Checkbox } from "antd";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
function PhongThucHien(props) {
  const { size, page, totalElements, dichVuId, refCallbackSave = {} } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
    listGioiTinh: [],
  });
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.getData({ dichVuId, active: null, dataSortColumn: { active: 0 } });
    props.getListAllKhoa();
    props.getListAllPhong({});
    props.getUtils({ name: "gioiTinh" });
  }, [dichVuId]);

  useEffect(() => {
    setState({
      listGioiTinh: [{ id: "", ten: "Tất cả" }, ...props.listgioiTinh],
    });
  }, [props.listgioiTinh]);

  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        props.onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };
  const onPageChange = (page) => {
    // const params = { page: page - 1, size };
    // updateData(params);
    // getListServicesPack({
    //   ...params,
    //   ...dataSearch,
    //   sort: combineSort(dataSortColumn),
    // });
  };
  const onChange = (key, selector) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value || null;
    } else value = e || null;
    if (state.currentItem) {
      if (selector) {
        if (!state.currentItem[selector]) state.currentItem[selector] = {};
        state.currentItem[selector][key] = value;
      } else state.currentItem[key] = value;
    }
  };

  const onChangePage = (page) => {
    props.onSearch({
      page: page - 1,
      dichVuId,
      active: null,
      dataSortColumn: { active: 0 },
    });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({
      size: size,
      dichVuId,
      active: null,
      dataSortColumn: { active: 0 },
    });
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
              Khoa chỉ định
            </div>
          }
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.ten"] || 0}
          searchSelect={
            <Select
              data={props.listAllKhoa}
              placeholder="Chọn khoa"
              onChange={onSearchInput("khoaChiDinhId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "khoaChiDinh",
      key: "khoaChiDinh",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <span className="not-search">
              <Select
                placeholder={"Chọn khoa"}
                data={props.listAllKhoa}
                onChange={onChange("khoaChiDinhId")}
                value={state.currentItem?.khoaChiDinhId}
              ></Select>
            </span>
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/phong")}
            >
              Tên phòng
            </div>
          }
          sort_key="phong.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["phong.ten"] || 0}
          require
          searchSelect={
            <span className="not-search">
              <Select
                data={props.listAllPhong}
                placeholder="Chọn phòng"
                onChange={onSearchInput("phongId")}
              />
            </span>
          }
        />
      ),
      width: "200px",
      dataIndex: "phong",
      key: "phong",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <span className="not-search">
              <Select
                placeholder={"Chọn phòng"}
                data={props.listAllPhong}
                onSelect={onChange("id", "phong")}
                value={state.currentItem?.phong?.id}
              ></Select>
            </span>
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giới tính"
          sort_key="gioiTinh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.gioiTinh || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={state.listGioiTinh}
              placeholder="Tìm giới tính"
              onChange={onSearchInput("gioiTinh")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <span className="not-search">
              <Select
                placeholder={"Chọn giới tính"}
                data={props.listgioiTinh}
                onSelect={onChange("gioiTinh")}
                value={state.currentItem?.gioiTinh}
              ></Select>
            </span>
          );
        } else return state.listGioiTinh.find((gt) => gt.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ phòng"
          sort_key="diaChi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.diaChi || 0}
          search={
            <Input
              defaultValue=""
              placeholder="Tìm địa chỉ"
              onChange={onSearchInput("diaChi")}
            />
          }
        />
      ),
      width: 250,
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Input
              defaultValue={state.currentItem?.diaChi}
              placeholder="Tìm địa chỉ"
              onChange={onChange("diaChi")}
            />
          );
        } else return item;
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
      width: 150,
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
    if (Object.keys(record).length !== 2) {
      return {
        onClick: (event) => {
          if (!state.currentItem) {
            setState({
              currentItem: JSON.parse(JSON.stringify(record)),
              currentIndex: index,
              pressedRow: true,
            });
          }
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
      diaChi,
      gioiTinh,
      active = true,
      khoaChiDinhId,
    } = state.currentItem || {};
    props
      .createOrEdit({
        id,
        dichVuId: dichVuId,
        khoaChiDinhId,
        diaChi,
        gioiTinh,
        active,
        phongId: state.currentItem?.phong?.id,
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
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
    });
  };
  return (
    <EditWrapper
      title={
        <div
          className="pointer"
          onClick={() => openInNewTab("/danh-muc/phong")}
        >
          Phòng thực hiện
        </div>
      }
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
  );
}

const mapStateToProps = (state) => {
  const {
    phongThucHien: { listData, size, page, totalElements, dataSortColumn },
    phong: { listAllPhong = [] },
    khoa: { listAllKhoa = [] },
    utils: { listgioiTinh = [] },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    listAllPhong,
    listAllKhoa,
    dataSortColumn: dataSortColumn || { active: 2, ["dichVu.ten"]: 1 },
    listgioiTinh,
  };
};

const mapDispatchToProps = ({
  phongThucHien: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,

    createOrEdit,
    onDelete,
  },
  khoa: { getListAllKhoa },
  phong: { getListAllPhong },
  utils: { getUtils },
}) => {
  return {
    getData,
    getListAllKhoa,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,

    createOrEdit,
    onDelete,
    updateData,
    getListAllPhong,
    getUtils,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhongThucHien);
