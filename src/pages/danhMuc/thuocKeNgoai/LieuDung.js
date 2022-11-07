import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Checkbox, Input } from "antd";
import Select from "components/Select";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import IcCreate from "assets/images/kho/IcCreate.png";
import { ROLES } from "constants/index";
import { ThongTinDichVuStyle } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { checkRole } from "utils/role-utils";
import { IN_NHANH_KYSO } from "constants/index";
const LieuDung = ({
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
  dataEditDefaultThuocKeNgoai,
  stateParent,
  setStateParent,
  getListLieuDung,
  getListAllLieuDung,
  listAllLieuDung,
  listLieuDung,
  ...props
}) => {
  const [state, _setState] = useState({
    editStatus: false,
    viewStatus: true,
    listLieuDung: [],
    isValidData: true,
  });
  console.log("state: ", state);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (dataEditDefault) {
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
  }, [dataEditDefault, stateParent]);

  useEffect(() => {
    // if (listData && listData.length > 0) {
    setState({ listLieuDung: [...listData] });
    // }
  }, [listData]);

  useEffect(() => {
    // getListLieuDung({ page: 0, size: 9999 });
    getListAllLieuDung({});
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
    console.log("isOk: ", isOk);
    if (isOk) {
      let item = state.listLieuDung[state.currentIndex];
      console.log("item: ", item);
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
        listLieuDung: state.listLieuDung
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
    if (dataEditDefaultThuocKeNgoai?.id) {
      let ds = listData;
      let currentItem = {
        index: 0,
        lieuDungId: "",
        lieuDung: {
          soLan1Ngay: "",
          soVien1Lan: "",
          ten: "",
        },
        active: true,
        thuocChiDinhNgoai: {
          id: dataEditDefaultThuocKeNgoai?.id,
          ma: dataEditDefaultThuocKeNgoai?.ma,
          ten: dataEditDefaultThuocKeNgoai?.ten,
        },
        thuocChiDinhNgoaiId: dataEditDefaultThuocKeNgoai?.id,
      };
      ds = [currentItem, ...ds].map((item, index) => ({ index, ...item }));
      setState({
        viewStatus: false,
        currentIndex: currentItem.index,
        listLieuDung: [...ds],
        pressedRow: true,
      });
    }
  };

  const onChange = (key) => (e) => {
    const value = e.target ? e.target?.value : e;
    let item = state.listLieuDung[state.currentIndex];
    if (item) {
      if (key == "lieuDungId") {
        const lieuDung = listAllLieuDung?.find((item) => item?.id == value);
        item = {
          ...item,
          lieuDung,
          lieuDungId: lieuDung?.id,
        };
      }
      if (key == "active") {
        item = {
          ...item,
          active: !item.active,
        };
      }
      state.listLieuDung[state.currentIndex] = { ...item };
      setState({ listLieuDung: [...state.listLieuDung] });
    }
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        checkRole([ROLES["DANH_MUC"].THUOC_KE_NGOAI_SUA]) &&
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
      render: (_, __, index) => `${Number.parseInt(index) + 1}`,
    },
    {
      title: (
        <HeaderSearch
          title="Liều dùng"
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["lieuDungId"] || 0}
          searchSelect={
            <Select
              data={listAllLieuDung}
              placeholder="Chọn liều dùng"
              onChange={onSearchInput("lieuDungId")}
            />
          }
        />
      ),
      width: 40,
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      align: "center",
      render: (record, _, index) => {
        if (state.currentIndex === index) {
          return (
            <Select
              value={record}
              data={listAllLieuDung}
              placeholder="Chọn liều dùng"
              onChange={onChange("lieuDungId")}
            />
          );
        } else {
          const lieuDung = listAllLieuDung?.find((item) => item.id == record);
          return (lieuDung && lieuDung?.ten) || "";
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lần/ngày"
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["lieuDungId"] || 0}
          search={
            <Input
              placeholder="Tìm số lần/ngày"
              onChange={onSearchInput("lieuDung.soLan1Ngay")}
            />
          }
        />
      ),
      width: 40,
      dataIndex: "lieuDung",
      key: "lieuDung.soLan1Ngay",
      align: "center",
      render: (record) => record?.soLan1Ngay || "",
    },
    {
      title: (
        <HeaderSearch
          title="Số viên/lần"
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["lieuDungId"] || 0}
          search={
            <Input
              placeholder="Tìm số viên/lần"
              onChange={onSearchInput("lieuDung.soVien1Lan")}
            />
          }
        />
      ),
      width: 40,
      dataIndex: "lieuDung",
      key: "lieuDung.soVien1Lan",
      align: "center",
      render: (record) => record?.soVien1Lan || "",
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={IN_NHANH_KYSO}
              placeholder="Chọn in nhanh"
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
    let roleSave = [ROLES["DANH_MUC"].THUOC_KE_NGOAI_THEM];
    let roleEdit = [ROLES["DANH_MUC"].THUOC_KE_NGOAI_SUA];
    if (state?.pressedRow && checkRole(props.roleEdit)) {
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
      <TableWrapper
        title="Liều dùng"
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
          ((checkRole([ROLES["DANH_MUC"].THUOC_KE_NGOAI_THEM]) &&
            state.viewStatus) ||
            (Object.keys(dataEditDefaultThuocKeNgoai).length > 0 &&
              checkRole([ROLES["DANH_MUC"].THUOC_KE_NGOAI_SUA]))) && [
            {
              title: "Thêm mới",
              onClick: handleClickedBtnAdded,
              buttonHeaderIcon: (
                <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
              ),
            },
          ]
        }
        dataSource={state.listLieuDung}
        onRow={onRow}
      />
      {totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={state.listLieuDung}
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
                Lưu
              </button>
            </div>
          )}
    </ThongTinDichVuStyle>
  );
};

const mapStateToProps = ({
  thuocKeNgoaiLieuDung: {
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
  thuocKeNgoai: { dataEditDefault: dataEditDefaultThuocKeNgoai },
  lieuDung: { listAllLieuDung, listLieuDung },
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
    dataEditDefaultThuocKeNgoai,
    listAllLieuDung,
    listLieuDung,
  };
};
const mapDispatchToProps = ({
  thuocKeNgoaiLieuDung: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  lieuDung: { getListLieuDung, getListAllLieuDung },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  getListLieuDung,
  getListAllLieuDung,
});
export default connect(mapStateToProps, mapDispatchToProps)(LieuDung);
