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

const TenBenh = (props) => {
  const {
    listData,
    page,
    size,
    total,
    updateData,
    onSearch,
    onReset,
    dataSearch,
    dataSort,
    onEdit,
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
      (data?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setDataEdit(data[indexNextItem]);
      onEdit(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-6-" + data[indexNextItem]?.id)[0]
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
    });
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
  const onSearchInput = (value, name) => {
    if (name === "chuongBenhId") {
      props.getAllNhomBenh({ loaiNhomBenh: 10, chuongBenhId: value });
      props.getAllNhomBenh({ loaiNhomBenh: 20, chuongBenhId: value });
      props.getAllNhomBenh({ loaiNhomBenh: 30, chuongBenhId: value });
      props.getListAllLoaiBenh({ nhomBenhPhu2Id: value });
    }
    if (name === "nhomBenhChinhId") {
      props.getAllNhomBenh({
        loaiNhomBenh: 20,
        chuongBenhId: props.dataSearch["chuongBenhId"],
        nhomBenhChinhId: value,
      });
    }
    if (name === "nhomBenhPhu1Id") {
      props.getAllNhomBenh({
        loaiNhomBenh: 30,
        chuongBenhId: props.dataSearch["chuongBenhId"],
        nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"],
        nhomBenhPhu1Id: value,
      });
    }
    if (name === "nhomBenhPhu2Id") {
      props.getListAllLoaiBenh({
        chuongBenhId: props.dataSearch["chuongBenhId"],
        nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"],
        nhomBenhPhu1Id: props.dataSearch["nhomBenhPhu1Id"],
        nhomBenhPhu2Id: value,
      });
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearch: {
          ...dataSearch,
          [name]: value,
          loaiNhomBenh: 30,
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
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff
      ? "row-actived row-id-6-" + record.id
      : "row-id-6-" + record.id;
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã tên bệnh"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSort.ma || 0}
          search={
            <Input
              placeholder="Tìm mã bệnh"
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
          title="Tên tên bệnh"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort.ten || 0}
          search={
            <Input
              placeholder="Tìm tên bệnh"
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
          title="Mã nhóm BC BYT"
          sort_key="maNhomByt"
          onClickSort={onClickSort}
          dataSort={dataSort.maNhomByt || 0}
          search={
            <Input
              placeholder="Tìm mã nhóm BC BYT"
              onChange={(e) => {
                onSearchInput(e.target.value, "maNhomByt");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "maNhomByt",
      key: "maNhomByt",
    },
    {
      title: (
        <HeaderSearch
          title="	Mã nhóm chi tiết"
          sort_key="maNhomChiTiet"
          onClickSort={onClickSort}
          dataSort={dataSort.maNhomChiTiet || 0}
          search={
            <Input
              placeholder="Tìm mã nhóm chi tiết"
              onChange={(e) => {
                onSearchInput(e.target.value, "maNhomChiTiet");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "maNhomChiTiet",
      key: "maNhomChiTiet",
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
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
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
  const onPageChange = (values) => {
    const params = { page: values - 1, size };
    updateData(params);
    onSearch({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSort),
    });
  };
  const onRow = (record) => ({
    onClick: () => {
      setDataEdit(record.action);
      onEdit(record.action);
    },
  });
  const customeSelect = {
    width: "15%",
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
                          { id: "", ten: "Tất cả chương bệnh" },
                          ...props.listAllChuongBenh,
                        ]}
                        placeholder="Chọn chương bệnh"
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
                          { id: "", ten: "Tất cả nhóm bệnh chính" },
                          ...props.listAllNhomBenhChinh,
                        ]}
                        placeholder="Chọn nhóm bệnh chính"
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
                          { id: "", ten: "Tất cả nhóm bệnh phụ I" },
                          ...props.listAllNhomBenhPhu1,
                        ]}
                        placeholder="Chọn nhóm bệnh phụ I"
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
                          { id: "", ten: "Tất cả nhóm bệnh phụ II" },
                          ...props.listAllNhomBenhPhu2,
                        ]}
                        placeholder="Chọn nhóm bệnh phụ II"
                        onChange={(e) => onSearchInput(e, "nhomBenhPhu2Id")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["loaiBenhId"] || ""}
                        data={[
                          { id: "", ten: "Tất cả loại bệnh" },
                          ...props.listAllLoaiBenh,
                        ]}
                        placeholder="Chọn nhóm loại bệnh"
                        onChange={(e) => onSearchInput(e, "loaiBenhId")}
                        style={{ marginRight: "5pt", ...customeSelect }}
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
                          { id: "", ten: "Tất cả nhóm bệnh chính" },
                          ...props.listAllNhomBenhChinh,
                        ]}
                        placeholder="Chọn nhóm bệnh chính"
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
                          { id: "", ten: "Tất cả nhóm bệnh phụ I" },
                          ...props.listAllNhomBenhPhu1,
                        ]}
                        placeholder="Chọn nhóm bệnh phụ I"
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
                          { id: "", ten: "Tất cả nhóm bệnh phụ II" },
                          ...props.listAllNhomBenhPhu2,
                        ]}
                        placeholder="Chọn nhóm bệnh phụ II"
                        onChange={(e) => onSearchInput(e, "nhomBenhPhu2Id")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["loaiBenhId"] || ""}
                        data={[
                          { id: "", ten: "Tất cả loại bệnh" },
                          ...props.listAllLoaiBenh,
                        ]}
                        placeholder="Chọn nhóm loại bệnh"
                        onChange={(e) => onSearchInput(e, "loaiBenhId")}
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
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {total > 0 && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          listData={data}
          total={total}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = ({
  maBenh: { updateData, onSearch },
  nhomBenh: { getAllNhomBenh },
  loaiBenh: { getListAllLoaiBenh },
}) => ({
  updateData,
  onSearch,
  getAllNhomBenh,
  getListAllLoaiBenh,
});
export default connect((state) => {
  const {
    maBenh: { listData, total, page, size, dataEdit, dataSearch, dataSort },
    nhomBenh: {
      listAllNhomBenhChinh,
      listAllNhomBenhPhu1,
      listAllNhomBenhPhu2,
    },
    chuongBenh: { listAllData: listAllChuongBenh },
    loaiBenh: { listAllLoaiBenh },
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
    listAllNhomBenhPhu1,
    listAllNhomBenhPhu2,
    listAllLoaiBenh,
  };
}, mapDispatchToProps)(TenBenh);
