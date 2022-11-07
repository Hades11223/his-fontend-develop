import { Button, Checkbox, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useEffect, useState, useRef } from "react";
import { Main } from "./styled";
import IcCreate from "assets/images/kho/IcCreate.png";
import { Pagination, Select } from "components";
import { connect, useDispatch } from "react-redux";
import { HIEU_LUC } from "constants/index";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
let timer = null;

const DanhSach = (props) => {
  const { form } = props;
  const {
    onSearch,
    onSizeChange,
    listKiosk,
    listRoom,
    totalElements,
    page,
    size,
    onSortChange,
    dataSortColumn,
    onChangeInputSearch,
    updateData,
    setStateParent,
    stateParent,
    listloaiQms,
    handleChangeshowTable,
    handleCollapsePane,
    showFullTable,
    collapseStatus,

    layerId,
  } = props;
  const refSelectRow = useRef();
  const refClickBtnAdd = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
  }, []);
  refSelectRow.current = (index) => {
    const indexNextItem =
      (listKiosk?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < listKiosk.length) {
      setStateParent({
        editStatus: true,
      });
      setDataEdit(listKiosk[indexNextItem]);
      updateData({ currentItem: listKiosk[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + listKiosk[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  useEffect(() => {
    onSearch({});
  }, []);
  const [dataEdit, setDataEdit] = useState({});
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên thiết bị"
          sort_key="ten"
          dataSort={dataSortColumn["ten"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập mã hồ sơ"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 60,
      dataIndex: "ten",
      key: "ten",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ MAC"
          sort_key="mac"
          dataSort={dataSortColumn["mac"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập địa chỉ Mac"
              onChange={onSearchInput("mac")}
            />
          }
        />
      ),
      width: 50,
      dataIndex: "mac",
      key: "mac",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Loại QMS"
          sort_key="mac"
          dataSort={dataSortColumn["loaiQms"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...(listloaiQms || [])]}
              placeholder="Chọn loại QMS"
              onChange={onSearchInput("loaiQms")}
            />
          }
        />
      ),
      width: 50,
      dataIndex: "loaiQms",
      key: "loaiQms",
      align: "left",
      render: (item) => {
        return listloaiQms?.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
          sort_key="phongId"
          dataSort={dataSortColumn["phongId"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={listRoom}
              placeholder="Chọn phòng"
              onChange={onSearchInput("phongId")}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "phongId",
      key: "phongId",
      align: "left",
      render: (item) => {
        return listRoom.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          dataSort={dataSortColumn["active"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 40,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onRow = (record = {}) => {
    return {
      onClick: (event) => {
        setStateParent({
          editStatus: true,
        });
        setDataEdit(record);
        updateData({ currentItem: record });
      },
    };
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const handleClickedBtnAdded = () => {
    form.resetFields();
    updateData({ currentItem: null });
    setStateParent({
      editStatus: false,
    });
  };
  const setRowClassName = (record) => {
    // .
    let idDiff = dataEdit?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  refClickBtnAdd.current = () => {
    form.resetFields();
    updateData({ currentItem: null });
    setStateParent({
      editStatus: false,
    });
  };

  return (
    <Main>
      <TableWrapper
        title="Danh mục Kiosk"
        scroll={{ x: 1000 }}
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
          checkRole([ROLES["THIET_LAP"].KIOSK_THEM])
            ? [
                {
                  title: "Thêm mới [F1]",
                  onClick: handleClickedBtnAdded,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: `btn-change-full-table ${showFullTable ? "small" : "large"}`,
                  title: <Icon component={showFullTable ? thuNho : showFull} />,
                  onClick: handleChangeshowTable,
                },
                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
            : [
                {
                  className: `btn-change-full-table ${showFullTable ? "small" : "large"}`,
                  title: <Icon component={showFullTable ? thuNho : showFull} />,
                  onClick: handleChangeshowTable,
                },
                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
        }
        columns={columns}
        dataSource={listKiosk}
        onRow={onRow}
        rowKey={(record) => record.id}
        rowClassName={setRowClassName}
      ></TableWrapper>
      {totalElements && (
        <Pagination
          listData={listKiosk}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    phong: { listRoom = [] },
    kiosk: {
      listKiosk,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
      dataSortColumn,
    },
  } = state;

  return {
    listRoom,
    listKiosk,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    dataSortColumn,
    listloaiQms: state.utils.listloaiQms,
  };
};
const mapDispatchToProps = ({
  utils: { getUtils },
  kiosk: {
    onSearch,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onSizeChange,
  },
}) => ({
  getUtils,
  onSearch,
  onSortChange,
  onChangeInputSearch,
  updateData,
  onSizeChange,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
