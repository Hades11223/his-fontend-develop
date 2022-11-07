import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC, ROLES } from "constants/index";
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

const NhomBenhChinh = (props) => {
  const {
    listData,
    page,
    size,
    total,
    onEdit,
    updateData,
    onSearch,
    onReset,
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
        .getElementsByClassName("row-id-2-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    updateData({ dataSort: sort });
    onSearch({
      page: PAGE_DEFAULT,
      size,
      sort: combineSort(sort),
      ...dataSearch,
      loaiNhomBenh: 10,
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
        loaiNhomBenh: 10,
        sort: combineSort(dataSort),
      });
    }, 500);
  };
  useEffect(() => {
    setData(
      listData.map((item, index) => {
        return {
          ...item,
          action: item,
          stt: page * size + index + 1,
        };
      })
    );
  }, [listData, page, size]);
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
          title="Mã nhóm bệnh chính"
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
          title="Tên nhóm bệnh chính"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort.ten || 0}
          search={
            <Input
              placeholder="Tìm theo tên nhóm bệnh chính"
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
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const onRow = (record) => ({
    onClick: () => {
      setDataEdit(record.action);
      onEdit(record);
    },
  });
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff
      ? "row-actived row-id-2-" + record.id
      : "row-id-2-" + record.id;
  };
  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSort),
      loaiNhomBenh: 10,
    });
  };
  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSort),
      loaiNhomBenh: 10,
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
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["chuongBenhId"] || ""}
                        data={[
                          { id: "", ten: "Tất cả chương bệnh" },
                          ...props.listAllChuongBenh,
                        ]}
                        placeholder="Chọn chương bệnh"
                        onChange={(e) => onSearchInput(e, "chuongBenhId")}
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
                        value={props.dataSearch["chuongBenhId"] || ""}
                        data={[
                          { id: "", ten: "Tất cả chương bệnh" },
                          ...props.listAllChuongBenh,
                        ]}
                        placeholder="Chọn chương bệnh"
                        onChange={(e) => onSearchInput(e, "chuongBenhId")}
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
        columns={columnsGroup}
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {total > 0 && (
        <Pagination
          onChange={onPageChange}
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
const mapDispatchToProps = ({ nhomBenh: { updateData, onSearch : onSearch } }) => ({
  updateData,
  onSearch,
});
export default connect((state) => {
  const {
    nhomBenh: { listData, total, page, size, dataEdit, dataSearch, dataSort },
    chuongBenh: { listAllData: listAllChuongBenh },
  } = state;
  return {
    listData,
    dataEdit,
    dataSearch,
    dataSort,
    total,
    page,
    size,
    listAllChuongBenh,
  };
}, mapDispatchToProps)(NhomBenhChinh);
