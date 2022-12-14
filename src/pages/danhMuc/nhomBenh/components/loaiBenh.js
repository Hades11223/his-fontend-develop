import React, { useEffect, useRef, useState, useMemo } from "react";
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

const LoaiBenh = (props) => {
  const {
    listLoaiBenh,
    page,
    size,
    totalElements,
    updateData,
    getListLoaiBenh,
    onEdit,
    onReset,
    dataSearch,
    dataSort,
    handleChangeshowTable,
    showFullTable,
    collapseStatus,
    handleCollapsePane,

    layerId,
  } = props;
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
      (dataSource?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < dataSource.length) {
      setDataEdit(dataSource[indexNextItem]);
      onEdit(dataSource[indexNextItem]);
      document
        .getElementsByClassName("row-id-5-" + dataSource[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    updateData({ dataSort: sort });
    getListLoaiBenh({
      page: PAGE_DEFAULT,
      size,
      sort: combineSort(sort),
      ...dataSearch,
    });
  };
  const onSearchInput = (value, name) => {
    if (name === "chuongBenhId") {
      props.getAllNhomBenh({ loaiNhomBenh: 10, chuongBenhId: value });
      props.getAllNhomBenh({ loaiNhomBenh: 20, chuongBenhId: value });
      props.getAllNhomBenh({ loaiNhomBenh: 30, chuongBenhId: value });
    }
    if (name === "nhomBenhChinhId") {
      props.getAllNhomBenh({
        loaiNhomBenh: 20,
        nhomBenhChinhId: value,
        chuongBenhId: props.dataSearch["chuongBenhId"],
      });
    }
    if (name === "nhomBenhPhu1Id") {
      props.getAllNhomBenh({
        loaiNhomBenh: 30,
        nhomBenhPhu1Id: value,
        chuongBenhId: props.dataSearch["chuongBenhId"],
        nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"],
      });
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearch: {
          ...dataSearch,
          [name]: value,
        },
      });
      getListLoaiBenh({
        ...dataSearch,
        page: 0,
        size,
        [name]: value,
        sort: combineSort(dataSort),
      });
    }, 300);
  };
  useEffect(() => {
    getListLoaiBenh({
      page: 0,
      size: 10,
      sort: combineSort(dataSort),
    });
  }, []);
  const dataSource = useMemo(() => {
    return listLoaiBenh.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: page * size + index + 1,
      };
    });
  }, [listLoaiBenh, page, size]);
  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 45,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? lo???i b???nh"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSort.ma || 0}
          search={
            <Input
              placeholder="T??m theo m??"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n lo???i b???nh"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort.ten || 0}
          search={
            <Input
              placeholder="T??m theo t??n lo???i b???nh"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Ch???n hi???u l???c"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 120,
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
      onEdit(record.action);
    },
  });
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff
      ? "row-actived row-id-5-" + record.id
      : "row-id-5-" + record.id;
  };
  const customeSelect = {
    width: "20%",
  };
  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListLoaiBenh({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSearch),
    });
  };
  const onPageChange = (page) => {
    const params = { page, size };
    updateData(params);
    getListLoaiBenh({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSearch),
    });
  };
  return (
    <div>
      <TableWrapper
        scroll={{ y: 3150, x: 1000 }}
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
                          { id: "", ten: "T???t c??? ch????ng b???nh" },
                          ...props.listAllChuongBenh,
                        ]}
                        placeholder="Ch???n ch????ng b???nh"
                        onChange={(e) => onSearchInput(e, "chuongBenhId")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["nhomBenhChinhId"] || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m b???nh ch??nh" },
                          ...props.listAllNhomBenhChinh,
                        ]}
                        placeholder="Ch???n nh??m b???nh ch??nh"
                        onChange={(e) => onSearchInput(e, "nhomBenhChinhId")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["nhomBenhPhu1Id"] || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m b???nh ph??? I" },
                          ...props.listAllNhomBenhPhu1,
                        ]}
                        placeholder="Ch???n nh??m b???nh ph??? I"
                        onChange={(e) => onSearchInput(e, "nhomBenhPhu1Id")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["nhomBenhPhu2Id"] || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m b???nh ph??? II" },
                          ...props.listAllNhomBenhPhu2,
                        ]}
                        placeholder="Ch???n nh??m b???nh ph??? II"
                        onChange={(e) => onSearchInput(e, "nhomBenhPhu2Id")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  title: "Th??m m???i [F1]",
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
                          { id: "", ten: "T???t c??? ch????ng b???nh" },
                          ...props.listAllChuongBenh,
                        ]}
                        placeholder="Ch???n ch????ng b???nh"
                        onChange={(e) => onSearchInput(e, "chuongBenhId")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["nhomBenhChinhId"] || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m b???nh ch??nh" },
                          ...props.listAllNhomBenhChinh,
                        ]}
                        placeholder="Ch???n nh??m b???nh ch??nh"
                        onChange={(e) => onSearchInput(e, "nhomBenhChinhId")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["nhomBenhPhu1Id"] || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m b???nh ph??? I" },
                          ...props.listAllNhomBenhPhu1,
                        ]}
                        placeholder="Ch???n nh??m b???nh ph??? I"
                        onChange={(e) => onSearchInput(e, "nhomBenhPhu1Id")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["nhomBenhPhu2Id"] || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m b???nh ph??? II" },
                          ...props.listAllNhomBenhPhu2,
                        ]}
                        placeholder="Ch???n nh??m b???nh ph??? II"
                        onChange={(e) => onSearchInput(e, "nhomBenhPhu2Id")}
                        style={{ marginRight: "5pt", ...customeSelect }}
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
        dataSource={dataSource}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {totalElements > 0 && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          listData={dataSource}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = ({
  loaiBenh: { updateData, getListLoaiBenh },
  nhomBenh: { getAllNhomBenh },
}) => ({
  updateData,
  getListLoaiBenh,
  getAllNhomBenh,
});
export default connect((state) => {
  const {
    loaiBenh: {
      listLoaiBenh,
      totalElements,
      page,
      size,
      dataEdit,
      dataSearch,
      dataSort,
    },
    nhomBenh: {
      listAllNhomBenhChinh,
      listAllNhomBenhPhu1,
      listAllNhomBenhPhu2,
    },
    chuongBenh: { listAllData: listAllChuongBenh },
  } = state;
  return {
    listLoaiBenh,
    dataEdit,
    dataSearch,
    dataSort,
    totalElements,
    page,
    size,
    listAllChuongBenh,
    listAllNhomBenhChinh,
    listAllNhomBenhPhu1,
    listAllNhomBenhPhu2,
  };
}, mapDispatchToProps)(LoaiBenh);
