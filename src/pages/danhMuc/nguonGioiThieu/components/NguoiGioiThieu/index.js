import React, { useEffect, useState, useRef, useMemo } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { connect, useDispatch } from "react-redux";
import { SORT_DEFAULT } from "constants/index";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import TabPanel from "components/MultiLevelTab/TabPanel";

const NguoiGioiThieu = ({
  //nguonNguoiBenh
  listAllNguonNguoiBenh,
  getListAllNguonNguoiBenh,
  //nguoiGioiThieu
  page,
  size,
  totalElements,
  dataSearch,
  dataSort,
  updateData,
  listNguoiGioiThieu,
  listAllNguoiGioiThieu,
  createOrEdit,
  searchListNguoiGioiThieu,
  dataEditDefault,
  //utils
  onReset,
  onEdit,
  onPageChange,
  onSizeChange,
  setStateParent,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,

  layerId,
  ...props
}) => {
  const refTimeOut = useRef(null);

  const [state, _setState] = useState({
    dataSortColumn: SORT_DEFAULT,
  });
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
        .getElementsByClassName("row-id-1-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    delete sort.createdAt;
    updateData({ dataSort: sort });
    const res = combineSort(sort);
    searchListNguoiGioiThieu({
      page: PAGE_DEFAULT,
      size: size,
      sort: res,
      ...dataSearch,
    });
  };

  useEffect(() => {
    const sort = combineSort(state.dataSortColumn);
    const params = { page, size, sort };
    searchListNguoiGioiThieu(params);
    getListAllNguonNguoiBenh({});
  }, []);

  const onSearchInput = (value, name) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(() => {
      let newDataSearch = { ...dataSearch };
      if (typeof value == "object" && Array.isArray(value)) {
        let params = value?.reduce((res, item, index) => {
          res[index] = `${name}=${item}`;
          return res;
        }, []);
        newDataSearch = {
          ...newDataSearch,
          sameParamString: params?.join("&"),
        };
      } else {
        newDataSearch = {
          ...newDataSearch,
          [name]: value,
        };
      }
      updateData({ dataSearch: newDataSearch });
      searchListNguoiGioiThieu({
        ...newDataSearch,
        page: 0,
        size,
        sort: combineSort(dataSort),
      });
    }, 500);
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      setStateParent({ editStatus: true });
      onEdit(record.action);
    },
  });
  const data = useMemo(() => {
    return (listNguoiGioiThieu || []).map((item, index) => {
      return {
        ...item,
        key: item?.id,
        action: item,
        index: page * size + index + 1,
      };
    });
  }, [listNguoiGioiThieu]);

  const dsAllNguonNguoiBenh = useMemo(() => {
    return [
      {
        id: "",
        ten: "Tất cả",
      },
      ...listAllNguonNguoiBenh,
    ];
  }, [listAllNguonNguoiBenh]);

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
  };

  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 7,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên nguồn người bệnh"
          // sort_key="dsNguonNb"
          // onClickSort={onClickSort}
          // dataSort={dataSort?.["dsNguonNb"] || 0}
          searchSelect={
            <Select
              mode="multiple"
              data={dsAllNguonNguoiBenh}
              placeholder="Chọn tên nguồn người bệnh"
              onChange={(value) => {
                onSearchInput(value, "dsNguonNbId");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "dsNguonNbId",
      key: "dsNguonNbId",
      render: (value, item, index) => {
        const dsNguonNb = listAllNguonNguoiBenh?.filter((i) =>
          value?.includes(i?.id)
        );
        return dsNguonNb && dsNguonNb.length > 0
          ? dsNguonNb?.map((j) => j?.ten).join(", ")
          : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã người giới thiệu"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSort?.ma || 0}
          search={
            <Input
              placeholder="Tìm mã"
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
          title="Tên người giới thiệu"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort?.ten || 0}
          search={
            <Input
              placeholder="Tìm tên người giới thiệu"
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

  return (
    <TabPanel>
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
          checkRole([ROLES["DANH_MUC"].NGUON_NGUOI_BENH_THEM])
            ? [
                {
                  title: "Thêm mới [F1]",
                  onClick: onReset,
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
          listData={data}
          total={totalElements}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </TabPanel>
  );
};

const mapStateToProps = ({
  nguonNguoiBenh: { listAllNguonNguoiBenh },
  nguoiGioiThieu: {
    listNguoiGioiThieu,
    dataSearch,
    dataSort,
    size,
    page,
    totalElements,
    dataEditDefault,
  },
}) => ({
  size,
  page,
  totalElements,
  dataSort,
  dataSearch,
  listAllNguonNguoiBenh,
  listNguoiGioiThieu,
  dataEditDefault,
});
const mapDispatchToProps = ({
  nguonNguoiBenh: { getListAllNguonNguoiBenh },
  nguoiGioiThieu: {
    createOrEdit,
    updateData,
    search: searchListNguoiGioiThieu,
  },
}) => ({
  updateData,
  createOrEdit,
  searchListNguoiGioiThieu,
  getListAllNguonNguoiBenh,
});
export default connect(mapStateToProps, mapDispatchToProps)(NguoiGioiThieu);
