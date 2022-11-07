import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Input } from "antd";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import Select from "components/Select";
import { HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import { useDispatch } from "react-redux";
let timer = null;

const GroupUnit = ({
  listGroupUnit,
  page,
  size,
  total,
  onEditGroupUnit,
  updateData,
  getListNhomDonViTinh,
  onPageChange,
  onSizeChange,
  onReset,
  dataSearchGroupUnit,
  dataSortGroupUnit,
  setEditStatus,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,
  layerId,
}) => {
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [currentItem, setCurrentItem] = useState({});

  const refSelectRow = useRef();
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
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
    return () => {
      onRemoveLayer({ layerId });
    };
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (listGroupUnit?.findIndex((item) => item.id === currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listGroupUnit.length) {
      setEditStatus(true);
      onEditGroupUnit(listGroupUnit[indexNextItem]);
      setCurrentItem(listGroupUnit[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + listGroupUnit[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const totalSortKey = combineSort(sort);
    updateData({ dataSortGroupUnit: totalSortKey, ...dataSearchGroupUnit });
    getListNhomDonViTinh({
      pageGroupUnit: 0,
      sizeGroupUnit: size,
      sort: totalSortKey,
      ...dataSearchGroupUnit,
    });
  };

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearchGroupUnit: { ...dataSearchGroupUnit, [name]: value },
      });
      getListNhomDonViTinh({
        ...dataSearchGroupUnit,
        pageGroupUnit: 0,
        sizeGroupUnit: size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 300);
  };
  const setRowClassName = (record) => {
    let idDiff = currentItem?.id;
    return record.id == idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 3,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã nhóm đơn vị tính"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm theo mã nhóm đơn vị tính"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhóm đơn vị tính"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm theo tên nhóm đơn vị tính"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
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
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Chọn hiệu lực"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "active",
      align: "center",
      key: "active",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const onRow = (record) => ({
    onClick: () => {
      setEditStatus(true);
      onEditGroupUnit(record.action);
      setCurrentItem(record.action);
    },
  });

  return (
    <div>
      <TableWrapper
        classNameRow={"custom-header"}
        styleMain={{ marginTop: 0 }}
        scroll={{ x: 1000 }}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={
          checkRole([ROLES["DANH_MUC"].DON_VI_TINH_THEM])
            ? [
                {
                  title: "Thêm mới [F1]",
                  onClick: onReset,
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
        columns={columnsGroup}
        dataSource={listGroupUnit}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {!!total && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={total}
          listData={listGroupUnit}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};
export default GroupUnit;
