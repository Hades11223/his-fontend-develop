import React, { useEffect, useMemo, memo, useState, useRef } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { connect, useDispatch } from "react-redux";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
let timer = null;

const Tinh = ({
  listTinh,
  page,
  size,
  total,
  onEditTinh,
  updateData,
  searchTinh,
  onPageChange,
  onSizeChange,
  onReset,
  dataSearch,
  sortData,
  setEditStatus,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,

  layerId,
  ...props
}) => {
  const [dataEdit, setDataEdit] = useState({});
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
      (data?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setEditStatus(true);
      onEditTinh(data[indexNextItem]);
      setDataEdit(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-2-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...sortData, [key]: value };
    delete sort.createdAt;
    updateData({ dataSortTinh: sort });
    const res = combineSort(sort);
    searchTinh({
      pageTinh: PAGE_DEFAULT,
      sizeTinh: size,
      sort: res,
      ...dataSearch,
    });
  };
  useEffect(() => {
    const res = combineSort(sortData);
    searchTinh({ pageTinh: page, sizeTinh: size, sort: res });
  }, []);
  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearchTinh: { ...dataSearch, [name]: value },
      });
      searchTinh({
        ...dataSearch,
        pageTinh: 0,
        sizeTinh: size,
        [name]: value,
        sort: combineSort(sortData),
      });
    }, 300);
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 7,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã tỉnh"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData.ma || 0}
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
          title="Tên tỉnh"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm tên tỉnh"
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
    // {
    //   title: (
    //     <HeaderSearch
    //       title="Quốc gia"
    //       sort_key="quocGia.ten"
    //       onClickSort={onClickSort}
    //       dataSort={sortData["quocGia.ten"] || 0}
    //       searchSelect={
    //         <Select
    //           defaultValue=""
    //           data={[{ id: "", ten: "Tất cả" }, ...listAllQuocGia]}
    //           placeholder="Chọn quốc gia"
    //           onChange={(value) => {
    //             onSearchInput(value, "quocGiaId");
    //           }}
    //         />
    //       }
    //     />
    //   ),
    //   width: 14,
    //   dataIndex: "quocGia",
    //   key: "quocGia",
    //   render: (item) => {
    //     return item?.ten;
    //   },
    // },
    {
      title: (
        <HeaderSearch
          title="Tên viết tắt"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={sortData.vietTat || 0}
          search={
            <Input
              placeholder="Tìm tên viết tắt"
              onChange={(e) => {
                onSearchInput(e.target.value, "vietTat");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "vietTat",
      key: "vietTat",
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={sortData.active || 0}
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
      setEditStatus(true);
      onEditTinh(record.action);
      setDataEdit(record.action);
    },
  });
  const data = listTinh.map((item, index) => {
    return {
      ...item,
      action: item,
      stt: page * size + index + 1,
    };
  });
  const quocGia = useMemo(() => {
    return [{ id: "", ten: "Tất cả Quốc gia" }, ...props.listAllQuocGia];
  }, [props.listAllQuocGia]);
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id == idDiff
      ? "row-actived row-id-2-" + record.id
      : "row-id-2-" + record.id;
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
          checkRole([ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH_THEM])
            ? [
                {
                  content: (
                    <>
                      <Select
                        value={dataSearch?.quocGiaId || ""}
                        data={quocGia}
                        placeholder="Chọn quốc gia"
                        onChange={(value) => {
                          onSearchInput(value, "quocGiaId");
                        }}
                      />
                    </>
                  ),
                },
                // {
                //   title: "Thêm mới [F1]",
                //   onClick: onReset,
                // },
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
                        value={dataSearch?.quocGiaId || ""}
                        data={quocGia}
                        placeholder="Chọn quốc gia"
                        onChange={(value) => {
                          onSearchInput(value, "quocGiaId");
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
        columns={columnsGroup}
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {total && (
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
const mapStateToProps = (state) => {
  return {
    listAllQuocGia: state.ttHanhChinh.listAllQuocGia,
  };
};
export default connect(mapStateToProps, null)(memo(Tinh));
