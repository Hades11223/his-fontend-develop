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

const NhomBenh1 = (props) => {
  const {
    listData,
    onSearch,
    onEdit,
    page,
    size,
    total,
    onReset,
    updateData,
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
        .getElementsByClassName("row-id-3-" + data[indexNextItem]?.id)[0]
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
      loaiNhomBenh: 20,
    });
  };
  const onSearchInput = (value, name) => {
    if (name === "chuongBenhId") {
      props.getAllNhomBenh({ loaiNhomBenh: 10, chuongBenhId: value });
    }
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
        loaiNhomBenh: 20,
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
      width: 45,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? nh??m b???nh ph??? I"
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
          title="T??n nh??m b???nh ph??? I"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort.ten || 0}
          search={
            <Input
              placeholder="T??m theo t??n nh??m b???nh ph??? I"
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

  const customeSelect = {
    width: "22%",
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSort),
      loaiNhomBenh: 20,
    });
  };
  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSort),
      loaiNhomBenh: 20,
    });
  };
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff
      ? "row-actived row-id-3-" + record.id
      : "row-id-3-" + record.id;
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
                        style={{ ...customeSelect }}
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
                        style={{ ...customeSelect }}
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

const mapDispatchToProps = ({
  nhomBenh: { updateData, onSearch : onSearch, getAllNhomBenh },
}) => ({
  updateData,
  onSearch,
  getAllNhomBenh,
});
export default connect((state) => {
  const {
    nhomBenh: {
      listData,
      total,
      page,
      size,
      dataEdit,
      dataSearch,
      dataSort,
      listAllNhomBenhChinh,
    },
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
    listAllNhomBenhChinh,
  };
}, mapDispatchToProps)(NhomBenh1);
