import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC, ROLES } from "constants/index";
import { combineSort } from "utils";
import { connect, useDispatch } from "react-redux";
import { checkRole } from "utils/role-utils";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
let timer = null;

const ChuongBenh = (props) => {
  const {
    onSearch,
    page,
    size,
    total,
    listData,
    onReset,
    updateData,
    onEdit,
    dataSearch,
    dataSort,
    handleChangeshowTable,
    showFullTable,
    collapseStatus,
    handleCollapsePane,
    layerId,
  } = props;
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
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
      (data?.findIndex((item) => item.id === dataEdit?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setDataEdit(data[indexNextItem]);
      onEdit(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-1-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    updateData({ dataSort: sort });
    const res = combineSort(sort);
    onSearch({
      page,
      sort: res,
      ...dataSearch,
    });
  };
  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearch: {
          ...dataSearch,
          [name]: value,
        },
      });
      onSearch({
        ...dataSearch,
        page: 0,
        size,
        [name]: value,
        sort: combineSort(dataSort),
      });
    }, 500);
  };
  useEffect(() => {
    onSearch({
      page,
      size: 10,
      sort: combineSort(dataSort),
    });
  }, []);
  useEffect(() => {
    setData(
      listData.map((item, index) => {
        return {
          ...item,
          action: item,
          index: page * size + index + 1,
        };
      })
    );
  }, [listData, page, size]);
  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 3,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="STT chương bệnh"
          sort_key="stt"
          onClickSort={onClickSort}
          dataSort={dataSort.stt || 0}
          search={
            <Input
              placeholder="Tìm theo stt"
              onChange={(e) => {
                onSearchInput(e.target.value, "stt");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "index",
      key: "index",
    },
    {
      title: (
        <HeaderSearch
          title="Mã chương bệnh"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSort.ma || 0}
          search={
            <Input
              placeholder="Tìm theo mã"
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
          title="Tên chương bệnh"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort.ten || 0}
          search={
            <Input
              placeholder="Tìm theo tên chương bệnh"
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
          dataSort={dataSort.active || 0}
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
        return <Checkbox checked={item} />;
      },
    },
  ];
  const onRow = (record, index) => ({
    onClick: (event) => {
      setDataEdit(record.action);
      onEdit(record.action);
    },
  });
  const onSizeChange = (size) => {
    const params = {
      page,
      size,
    };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSort),
    });
  };
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id == idDiff
      ? "row-actived row-id-1-" + record.id
      : "row-id-1-" + record.id;
  };
  const onChangePage = (values) => {
    const params = { page: values - 1, size };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSort),
    });
  };
  return (
    <div>
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
          checkRole([ROLES["DANH_MUC"].BENH_TAT_THEM])
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
        columns={columnsService}
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {total && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={total}
          listData={data}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};
const mapDispatchToProps = ({
  chuongBenh: { updateData, onSearch: onSearch },
}) => ({
  updateData,
  onSearch,
});
export default connect((state) => {
  const {
    chuongBenh: { listData, total, page, size, dataEdit, dataSearch, dataSort },
  } = state;
  return { listData, dataEdit, dataSearch, dataSort, total, page, size };
}, mapDispatchToProps)(ChuongBenh);
