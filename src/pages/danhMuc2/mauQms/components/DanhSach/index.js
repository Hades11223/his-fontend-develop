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
  const {
    onSearch,
    getUtils,
    listTemplate,
    totalElements,
    page,
    size,
    onSortChange,
    dataSortColumn,
    onChangeInputSearch,
    updateData,
    listloaiQms,
    onDelete,
    setStateParent,
    onSizeChange,
    handleChangeshowTable,
    handleCollapsePane,
    showFullTable,
    collapseStatus,

    currentItem,
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
      (listTemplate?.findIndex((item) => item.id === currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listTemplate.length) {
      setStateParent({
        editStatus: true,
      });
      updateData({ currentItem: listTemplate[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + listTemplate[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  useEffect(() => {
    onSearch({});
    getUtils({ name: "loaiQms" });
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
          title="Mã mẫu QMS"
          sort_key="ma"
          dataSort={dataSortColumn["ma"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập mã mẫu qms"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: 60,
      dataIndex: "ma",
      key: "ma",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Tên mẫu QMS"
          sort_key="ten"
          dataSort={dataSortColumn["ten"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập tên mẫu qms"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 80,
      dataIndex: "ten",
      key: "ten",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Loại QMS"
          sort_key="loaiQms"
          dataSort={dataSortColumn["loaiQms"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...(listloaiQms || [])]}
              placeholder="Nhập loại QMS"
              onChange={onSearchInput("loaiQms")}
            />
          }
        />
      ),
      width: 70,
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

  const onChangePage = (page) => {};

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

  const handleClickedBtnAdded = () => {
    updateData({
      currentItem: {},
    });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  return (
    <Main>
      {/* <div className="header">
        <span className="title">Danh mục mẫu QMS</span>
        {checkRole([ROLES["DANH_MUC"].MAU_QMS_THEM]) && <Button className="btn-new" onClick={() => {
          setStateParent({
            editStatus: false
          })
        }}>
          <span onClick={handleClickedBtnAdded}>Thêm mới</span>
          <img src={IcCreate} />
        </Button>}
      </div> */}
      <TableWrapper
        title="Danh mục mẫu QMS"
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
          checkRole([ROLES["DANH_MUC"].MAU_QMS_THEM])
            ? [
                {
                  title: "Thêm mới",
                  onClick: handleClickedBtnAdded,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: `btn-change-full-table ${
                    state?.showFullTable ? "small" : "large"
                  }`,
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
                  className: `btn-change-full-table ${
                    state?.showFullTable ? "small" : "large"
                  }`,
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
        onRow={onRow}
        dataSource={listTemplate}
        rowKey={(record) => record.id}
        rowClassName={setRowClassName}
      ></TableWrapper>
      {totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listTemplate}
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
    template: {
      listTemplate,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
      dataSortColumn,
      currentItem,
    },
    utils: { listloaiQms },
  } = state;

  return {
    listTemplate,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    dataSortColumn,
    listloaiQms,
    currentItem,
  };
};
const mapDispatchToProps = ({
  utils: { getUtils },
  template: {
    onSearch,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onDelete,
    onSizeChange,
  },
}) => ({
  getUtils,
  onSearch,
  onSortChange,
  onChangeInputSearch,
  updateData,
  onDelete,
  onSizeChange,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
