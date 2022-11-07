import React, { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC } from "constants/index";
import { connect, useDispatch } from "react-redux";
import { customeSelect } from "../../config";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import { setDriver } from "localforage";
const Huyen = (props) => {
  const {
    handleChangeshowTable,
    showFullTable,
    collapseStatus,
    handleCollapsePane,
    onReset,

    layerId,
  } = props;
  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };
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
    const { listData } = props;
    const indexNextItem =
      (listData?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      props.setEditStatus(true);
      props.onEditQuanHuyen(listData[indexNextItem]);
      setDataEdit(listData[indexNextItem]);
      document
        .getElementsByClassName("row-id-3-" + listData[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  useEffect(() => {
    props.onSizeChange({ page: 0 });
    props.getListTinh({ page: 0, size: 9999 });
  }, []);
  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };
  const onSearchInput = (key) => (e) => {
    if (key === "quocGiaId") {
      if (e) {
        props.getListTinh({ page: 0, size: 9999, [key]: e });
      } else {
        props.getListTinh({ page: 0, size: 9999 });
      }
    }
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    props.onChangeInputSearch({
      [key]: value,
    });
  };
  const onRow = (record) => ({
    onClick: () => {
      props.setEditStatus(true);
      props.onEditQuanHuyen(record);
      setDataEdit(record);
    },
  });
  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã quận/huyện"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã quận/huyện"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: 20,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên quận/huyện"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên quận/huyện"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 20,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Tên viết tắt"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["vietTat"] || 0}
          search={
            <Input
              placeholder="Tìm tên viết tắt"
              onChange={onSearchInput("vietTat")}
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
          dataSort={props.dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
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
  const quocGia = useMemo(() => {
    return [{ id: "", ten: "Tất cả Quốc gia" }, ...props.listAllQuocGia];
  }, [props.listAllQuocGia]);
  const tinh = useMemo(() => {
    return [{ id: "", ten: "Tất cả Tỉnh" }, ...props.listAllTinh1];
  }, [props.listAllTinh1]);
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id == idDiff
      ? "row-actived row-id-3-" + record.id
      : "row-id-3-" + record.id;
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
                        value={props.dataSearch["quocGiaId"] || ""}
                        data={quocGia}
                        placeholder="Chọn quốc gia"
                        onChange={onSearchInput("quocGiaId")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["tinhThanhPhoId"] || ""}
                        data={tinh}
                        placeholder="Chọn tỉnh"
                        onChange={onSearchInput("tinhThanhPhoId")}
                        style={customeSelect}
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
                        value={props.dataSearch["quocGiaId"] || ""}
                        data={quocGia}
                        placeholder="Chọn quốc gia"
                        onChange={onSearchInput("quocGiaId")}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["tinhThanhPhoId"] || ""}
                        data={tinh}
                        placeholder="Chọn tỉnh"
                        onChange={onSearchInput("tinhThanhPhoId")}
                        style={customeSelect}
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
        dataSource={props.listData}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {props.totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={props.page + 1}
          pageSize={props.size}
          listData={props.listData}
          total={props.totalElements}
          onShowSizeChange={(e) => props.onSizeChange({ size: e })}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    huyenTongHop: {
      listData,
      size,
      page,
      totalElements,
      dataSortColumn,
      dataSearch,
    },
    ttHanhChinh: { listAllQuocGia, listAllTinh1 },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    dataSortColumn: dataSortColumn || { active: 2, ["ma"]: 1 },
    dataSearch,
    listAllQuocGia,
    listAllTinh1,
  };
};
const mapDispatchToProps = ({
  huyenTongHop: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  ttHanhChinh: { getListTinh },
}) => {
  return {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    getListTinh,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Huyen);
