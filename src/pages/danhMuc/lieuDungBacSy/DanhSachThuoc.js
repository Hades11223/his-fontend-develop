import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Checkbox, Input, Form } from "antd";
import Select from "components/Select";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import IcCreate from "assets/images/kho/IcCreate.png";

// import Select from "components/Select";
import { HIEU_LUC, ROLES } from "constants/index";
import { ThongTinDichVuStyle } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { checkRole } from "utils/role-utils";
const DanhSachThuoc = ({
  listData,
  page,
  size,
  totalElements,
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  dataEditDefault,
  dataEditDefaultLieuDung,
  stateParent,
  setStateParent,
  onSearchThuoc,
  onSearchAllThuoc,
  listAllThuoc,
  dataSortColumn,
  ...props
}) => {
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    editStatus: false,
    viewStatus: true,
    listLieuDungThuoc: [],
    isValidData: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (dataEditDefaultLieuDung) {
      let newState = {
        editStatus: false,
        viewStatus: true,
        currentIndex: "",
        isValidData: true,
        ...stateParent,
      };
      setState(newState);
      if (!stateParent.editStatus) {
      } else {
      }
    }
  }, [dataEditDefaultLieuDung, stateParent]);

  useEffect(() => {
    // if (listData && listData.length > 0) {
    setState({ listLieuDungThuoc: [...listData] });
    // }
  }, [listData]);

  useEffect(() => {
    onSearchAllThuoc({ page: 0, size: 9999 });
  }, []);

  const handleCancel = () => {
    if (state.editStatus) {
    } else {
    }
    setStateParent({
      isSelected: true,
    });
  };

  const onOk = (isOk) => () => {
    if (isOk) {
      let item = state.listLieuDungThuoc[state.currentIndex];
      let isValidData = state.isValidData;
      if (!item?.lieuDungId) {
        isValidData = false;
        return;
      }
      createOrEdit(item)
        .then((s) => {
          setState({
            editStatus: false,
            viewStatus: true,
            isValidData: true,
            currentIndex: "",
          });
        })
        .catch((e) => {});
    } else {
      setState({
        editStatus: false,
        viewStatus: true,
        isValidData: true,
        currentIndex: "",
        listLieuDungThuoc: state.listLieuDungThuoc
          ?.filter((item) => item.id)
          .map((item1, index) => ({ ...item1, index })),
      });
    }
  };

  const handleHiddenCancel = () => {
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  const handleHiddenSave = () => {
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };

  const handleDropdownVisibleChange = (open) => {
    document.querySelector("#containerElement").style.overflowY = open
      ? "hidden"
      : "auto";
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };

  const handleClickedBtnAdded = () => {
    if (dataEditDefaultLieuDung?.id) {
      let ds = listData;
      let currentItem = {
        index: 0,
        lieuDungId: dataEditDefaultLieuDung?.id,
        lieuDung: {
          ...dataEditDefaultLieuDung,
        },
        dichVuId: "",
        dichVu: {
          id: "",
          ma: "",
          ten: "",
        },
        active: true,
      };
      ds = [currentItem, ...ds].map((item, index) => ({ index, ...item }));
      setState({
        viewStatus: false,
        currentIndex: currentItem.index,
        listLieuDungThuoc: [...ds],
        pressedRow: true,
      });
    }
  };

  const onChange = (key) => (e) => {
    const value = e.target ? e.target?.value : e;
    let item = state.listLieuDungThuoc[state.currentIndex];
    if (item) {
      if (key == "dichVuId") {
        const dichVu = listAllThuoc?.find((item) => item?.id == value);
        item = {
          ...item,
          dichVu,
          dichVuId: dichVu?.id,
        };
      }
      if (key == "active") {
        item = {
          ...item,
          active: !item.active,
        };
      }
      state.listLieuDungThuoc[state.currentIndex] = { ...item };
      setState({ listLieuDungThuoc: [...state.listLieuDungThuoc] });
    }
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        checkRole([ROLES["DANH_MUC"].LIEU_DUNG_BS_SUA]) &&
          setState({ currentIndex: index, viewStatus: false });
      },
    };
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    onChangeInputSearch({
      [key]: value,
    });
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onChangeSize = (size) => {
    onSizeChange({ size: size });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 20,
      dataIndex: "index",
      key: "index",
      align: "center",
      // render: (_, __, index) => `${Number.parseInt(index) + 1}`,
    },
    {
      title: (
        <HeaderSearch
          title="Mã thuốc"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã thuốc"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: 40,
      dataIndex: "dichVu",
      key: "dichVu.ma",
      align: "center",
      render: (record, _, index) => {
        let listThuoc = [];
        if (listAllThuoc?.length) {
          listThuoc = listAllThuoc.map((thuoc) => ({
            ...thuoc,
            ten: thuoc.ma,
          }));
        }

        if (state.currentIndex === index) {
          return (
            <Select
              value={record?.id}
              data={listThuoc}
              placeholder="Chọn thuốc"
              onChange={onChange("dichVuId")}
            />
          );
        } else {
          return record?.ma || "";
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên thuốc"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên thuốc"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 40,
      dataIndex: "dichVu",
      key: "dichVu.ten",
      align: "center",
      render: (record) => record?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: "40px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (record, _, index) => {
        return (
          <Checkbox
            onChange={(e) => {
              if (state.currentIndex === index) {
                onChange("active")(e);
              }
            }}
            checked={record}
          />
        );
      },
    },
  ];
  const handleHidden = () => {
    let roleSave = [ROLES["DANH_MUC"].LIEU_DUNG_BS_THEM];
    let roleEdit = [ROLES["DANH_MUC"].LIEU_DUNG_BS_SUA];
    if (state?.pressedRow && checkRole(props.roleSave)) {
      return false;
    }
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  return (
    <ThongTinDichVuStyle>
      {/* <div className="title-info" style={{ fontSize: 24, fontWeight: 700 }}>Liều dùng </div> */}
      <div className="table-info">
        <TableWrapper
          title="Danh sách thuốc"
          columns={columns}
          scroll={{ y: 300 }}
          classNameRow={"custom-header"}
          styleMain={{ marginTop: 0 }}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 35,
          }}
          buttonHeader={
            ((checkRole([ROLES["DANH_MUC"].LIEU_DUNG_BS_THEM]) &&
              state.viewStatus) ||
              (Object.keys(dataEditDefaultLieuDung).length > 0 &&
                checkRole([ROLES["DANH_MUC"].LIEU_DUNG_BS_SUA]))) && [
              {
                title: "Thêm mới",
                onClick: handleClickedBtnAdded,
                buttonHeaderIcon: (
                  <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                ),
              },
            ]
          }
          dataSource={state.listLieuDungThuoc}
          onRow={onRow}
        />

        {totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={state.listLieuDungThuoc}
            total={totalElements}
            onShowSizeChange={onChangeSize}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
        {handleHidden()
          ? null
          : !state.viewStatus && (
              <div className="button-bottom-modal">
                <button className="button-cancel pointer" onClick={onOk(false)}>
                  Hủy
                </button>
                <button className="button-ok pointer" onClick={onOk(true)}>
                  Lưu [F4]
                </button>
              </div>
            )}
      </div>
    </ThongTinDichVuStyle>
  );
};

const mapStateToProps = ({
  lieuDungThuoc: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
  },
  danhMucThuoc: { listAllData: listAllThuoc },
  lieuDung: { dataEditDefault: dataEditDefaultLieuDung },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    dataEditDefaultLieuDung,
    listAllThuoc,
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
  },
  danhMucThuoc: { onSearch: onSearchThuoc, onSearchAll: onSearchAllThuoc },
  lieuDung: { updateData: updateDataLieuDung },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  onSearchThuoc,
  onSearchAllThuoc,
  updateDataLieuDung,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSachThuoc);
