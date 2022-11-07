import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Input } from "antd";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import Select from "components/Select";
import { HIEU_LUC } from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import { combineSort } from "utils";
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
  listDonViTinh,
  getListDonViTinh,
  page,
  size,
  total,
  onEditUnit,
  listGroupUnit,
  onPageChange,
  onSizeChange,
  onReset,
  dataSearchUnit,
  updateData,
  dataEditGroupUnitDefault,
  setEditStatus,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,
  layerId,
}) => {
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [valueSearch, setValueSearch] = useState("");
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
      (listDonViTinh?.findIndex((item) => item.id === currentItem?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < listDonViTinh.length) {
      setEditStatus(true);
      onEditUnit(listDonViTinh[indexNextItem]);
      setCurrentItem(listDonViTinh[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + listDonViTinh[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (dataEditGroupUnitDefault?.id) {
      setValueSearch(dataEditGroupUnitDefault.id);
      updateData({
        dataSearchUnit: {
          ...dataSearchUnit,
          nhomDonViTinhId: dataEditGroupUnitDefault.id,
        },
      });
    }
  }, [dataEditGroupUnitDefault?.id]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const totalSortKey = combineSort(sort);
    updateData({ dataSortUnit: totalSortKey, ...dataSearchUnit });
    getListDonViTinh({
      pageUnit: 0,
      sizeUnit: size,
      sort: totalSortKey,
      ...dataSearchUnit,
    });
  };

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearchUnit: { ...dataSearchUnit, [name]: value } });
      getListDonViTinh({
        ...dataSearchUnit,
        pageUnit: 0,
        sizeUnit: size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 300);
  };

  const columnsUnit = [
    {
      title: <HeaderSearch title="STT" />,
      width: 6,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã đơn vị tính"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm theo mã đơn vị tính"
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
          title="Tên đơn vị tính"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm theo tên đơn vị tính"
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
      onEditUnit(record);
      setCurrentItem(record);
    },
  });
  const setRowClassName = (record) => {
    let idDiff = currentItem?.id;
    return record.id == idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  return (
    <div className="unit">
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
                  content: (
                    <>
                      <Select
                        data={[
                          { id: "", ten: "Tất cả nhóm đơn vị tính" },
                          ...listGroupUnit,
                        ]}
                        placeholder="Chọn nhóm đơn vị tính"
                        value={valueSearch}
                        onChange={(value) => {
                          setValueSearch(value);
                          onSearchInput(value, "nhomDonViTinhId");
                          if (!value) {
                            updateData({
                              dataEditGroupUnitDefault: null,
                            });
                          }
                        }}
                      />
                    </>
                  ),
                },
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
                  content: (
                    <>
                      <Select
                        data={[
                          { id: "", ten: "Tất cả nhóm đơn vị tính" },
                          ...listGroupUnit,
                        ]}
                        placeholder="Chọn nhóm đơn vị tính"
                        value={valueSearch}
                        onChange={(value) => {
                          setValueSearch(value);
                          onSearchInput(value, "nhomDonViTinhId");
                          if (!value) {
                            updateData({
                              dataEditGroupUnitDefault: null,
                            });
                          }
                        }}
                      />
                    </>
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
        }
        columns={columnsUnit}
        dataSource={listDonViTinh}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {!!total && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={total}
          listData={listDonViTinh}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};
export default GroupUnit;
