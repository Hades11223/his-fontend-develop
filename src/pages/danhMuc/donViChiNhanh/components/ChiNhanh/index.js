import React, { useEffect, useMemo, useRef } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC, YES_NO } from "constants/index";
import { combineSort } from "utils";
import { connect, useDispatch } from "react-redux";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
const ChiNhanh = ({
  //chiNhanh
  size,
  page,
  totalElements,
  dataSort,
  dataSearch,
  listDonViChiNhanh,
  dataEditDefault,
  updateData,
  getListDonViChiNhanh,
  //utils
  onReset,
  onPageChange,
  onSizeChange,
  onEdit,
  setStateParent,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,

  layerId,
  ...props
}) => {
  const refTimeOut = useRef(null);
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
            if (refSelectRow.current && e?.target?.nodeName != "INPUT")
              refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            if (refSelectRow.current && e?.target?.nodeName != "INPUT")
              refSelectRow.current(1);
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
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setStateParent({ editStatus: true });
      onEdit(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-2-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    delete sort.createdAt;
    updateData({ dataSort: sort });
    const res = combineSort(sort);
    getListDonViChiNhanh({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const onSearchInput = (value, name) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(() => {
      updateData({
        dataSearch: {
          ...dataSearch,
          [name]: value,
        },
      });
      getListDonViChiNhanh({
        ...dataSearch,
        page: 0,
        size,
        [name]: value,
        sort: combineSort(dataSort),
      });
    }, 500);
  };

  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã chi nhánh"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSort?.ma || 0}
          search={
            <Input
              placeholder="Tìm mã chi nhánh"
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
          title="Tên chi nhánh"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort?.ten || 0}
          search={
            <Input
              placeholder="Tìm tên chi nhánh"
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
          title="Là cơ quan chủ quản"
          sort_key="chuQuan"
          onClickSort={onClickSort}
          dataSort={dataSort.chuQuan || 0}
          searchSelect={
            <Select
              data={YES_NO}
              defaultValue=""
              placeholder="Là cơ quan chủ quản"
              onChange={(value) => {
                onSearchInput(value, "chuQuan");
              }}
            />
          }
        />
      ),
      width: 10,
      dataIndex: "chuQuan",
      key: "chuQuan",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Dải mã NB riêng"
          sort_key="tachMaNb"
          onClickSort={onClickSort}
          dataSort={dataSort?.tachMaNb || 0}
          searchSelect={
            <Select
              data={YES_NO}
              defaultValue=""
              placeholder="Dải mã NB riêng"
              onChange={(value) => {
                onSearchInput(value, "tachMaNb");
              }}
            />
          }
        />
      ),
      width: 10,
      dataIndex: "tachMaNb",
      key: "tachMaNb",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort?.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 10,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const onRow = (record, index) => ({
    onClick: (event) => {
      setStateParent({ editStatus: true });
      onEdit(record.action);
    },
  });
  const data = useMemo(() => {
    return listDonViChiNhanh?.map((item, index) => {
      return {
        ...item,
        key: item?.id,
        action: item,
        index: page * size + index + 1,
      };
    });
  }, [listDonViChiNhanh]);

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-2-" + record.id
      : "row-id-2-" + record.id;
  };

  return (
    <>
      <TableWrapper
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
          // checkRole([ROLES["DANH_MUC"].NGUON_NGUOI_BENH_THEM]) ?
          [
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
          // : [
          //     {
          //       className: `btn-change-full-table ${showFullTable ? "small" : "large"}`,
          //       title: <Icon component={showFullTable ? thuNho : showFull} />,
          //       onClick: handleChangeshowTable,
          //     },

          //     {
          //       className: "btn-collapse",
          //       title: (
          //         <Icon
          //           component={collapseStatus ? extendTable : extendChiTiet}
          //         />
          //       ),
          //       onClick: handleCollapsePane,
          //     },
          //   ]
        }
        columns={columnsService}
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {totalElements && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          listData={data}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({
  chiNhanh: {
    page,
    size,
    totalElements,
    dataSearch,
    dataSort,
    listDonViChiNhanh,
    dataEditDefault,
  },
}) => ({
  page,
  size,
  totalElements,
  dataSearch,
  dataSort,
  listDonViChiNhanh,
  dataEditDefault,
});
const mapDispatchToProps = ({
  chiNhanh: { getListDonViChiNhanh, updateData },
}) => ({
  updateData,
  getListDonViChiNhanh,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChiNhanh);
