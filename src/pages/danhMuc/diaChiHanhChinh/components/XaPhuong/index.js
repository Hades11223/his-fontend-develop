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
const XaPhuong = (props) => {
  const {
    handleChangeshowTable,
    showFullTable,
    collapseStatus,
    handleCollapsePane,
    onReset,

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
    const { listData } = props;
    const indexNextItem =
      (listData?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      props.setEditStatus(true);
      props.onEditXaPhuong(listData[indexNextItem]);
      setDataEdit(listData[indexNextItem]);
      document
        .getElementsByClassName("row-id-4-" + listData[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  useEffect(() => {
    if (props.type === "xaPhuong") {
      props.getListHuyen({ page: 0, size: 9999 });
      if (!props.listAllTinh1?.length) {
        props.getListTinh({ page: 0, size: 9999 });
      }
    }
  }, []);
  useEffect(() => {
    props.onSizeChange({ page: 0 });
  }, [props.type]);
  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };
  const onSearchInput = (key) => (e) => {
    if (props.type === "xaPhuong") {
      if (key === "quocGiaId") {
        if (e) {
          props.getListTinh({ page: 0, size: 9999, [key]: e });
          props.getListHuyen({ page: 0, size: 9999, [key]: e });
        } else {
          props.getListTinh({ page: 0, size: 9999 });
          props.getListHuyen({ page: 0, size: 9999 });
        }
      }
      if (key === "tinhThanhPhoId") {
        if (e) {
          props.getListHuyen({ page: 0, size: 9999, [key]: e });
        } else {
          props.getListHuyen({ page: 0, size: 9999 });
        }
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
      props.onEditXaPhuong(record);
      setDataEdit(record);
    },
  });
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id == idDiff
      ? "row-actived row-id--" + record.id
      : "row-id-4-" + record.id;
  };
  const columnsGroup = [
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
          title="Quốc gia"
          sort_key="quanHuyen.tinhThanhPho.quocGia.ten"
          onClickSort={onClickSort}
          dataSort={
            props.dataSortColumn["quanHuyen.tinhThanhPho.quocGia.ten"] || 0
          }
          search={
            <Input
              placeholder="Tìm quốc gia"
              onChange={onSearchInput("quocGia.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "quocGia",
      key: "quocGia",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỉnh/TP"
          sort_key="quanHuyen.tinhThanhPho.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["quanHuyen.tinhThanhPho.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tỉnh/TP"
              onChange={onSearchInput("tinhThanhPho.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "tinhThanhPho",
      key: "tinhThanhPho",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quận/Huyện"
          sort_key="quanHuyen.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["quanHuyen.ten"] || 0}
          search={
            <Input
              placeholder="Tìm quận/Huyện"
              onChange={onSearchInput("quanHuyen.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "quanHuyen",
      key: "quanHuyen",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Xã/Phường"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm xã/Phường"
              onChange={onSearchInput("ten")}
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
          dataSort={props.dataSortColumn.active || 0}
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
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];
  const columnsGroupXP = [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "index",
      key: "index",
    },
    {
      title: (
        <HeaderSearch
          title="Mã xã/phường"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã xã/Phường"
              onChange={onSearchInput("ma")}
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
          title="Tên xã/phường"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên xã/Phường"
              onChange={onSearchInput("ten")}
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
          title="Tên viết tắt"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.vietTat || 0}
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
          dataSort={props.dataSortColumn.active || 0}
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
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];
  const quocGia = useMemo(() => {
    return [{ id: "", ten: "Tất cả Quốc gia" }, ...props.listAllQuocGia];
  }, [props.listAllQuocGia]);
  const tinh = useMemo(() => {
    return [{ id: "", ten: "Tất cả Tỉnh" }, ...(props.listAllTinh1 || [])];
  }, [props.listAllTinh1]);
  const huyen = useMemo(() => {
    return [{ id: "", ten: "Tất cả Huyện" }, ...(props.listAllQuanHuyen || [])];
  }, [props.listAllQuanHuyen]);
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
          checkRole([ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH_THEM]) &&
          props.type === "xaPhuong"
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
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={props.dataSearch["quanHuyenId"] || ""}
                        data={huyen}
                        placeholder="Chọn quận/huyện"
                        onChange={onSearchInput("quanHuyenId")}
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
                  className: `btn-change-full-table ${
                    showFullTable ? "small" : "large"
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
            : props.type === "xaPhuong" && [
                {
                  className: `btn-change-full-table ${
                    showFullTable ? "small" : "large"
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
        columns={props.type === "xaPhuong" ? columnsGroupXP : columnsGroup}
        dataSource={props.listData}
        onRow={props.type === "xaPhuong" && onRow}
        rowClassName={props.type === "xaPhuong" && setRowClassName}
      />
      {props.totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={props.page + 1}
          pageSize={props.size}
          total={props.totalElements}
          onShowSizeChange={(e) => props.onSizeChange({ size: e })}
          style={{ flex: 1, justifyContent: "flex-end" }}
          listData={props.listData}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    xaTongHop: {
      listData,
      size,
      page,
      totalElements,
      dataSortColumn,
      dataSearch,
    },
    ttHanhChinh: {
      listAllQuocGia = [],
      listAllTinh1 = [],
      listAllQuanHuyen = [],
    },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    dataSortColumn: dataSortColumn,
    dataSearch,
    listAllQuocGia,
    listAllTinh1,
    listAllQuanHuyen,
  };
};
const mapDispatchToProps = ({
  xaTongHop: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  ttHanhChinh: { getListTinh, getListHuyen },
}) => {
  return {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    getListTinh,
    getListHuyen,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(XaPhuong);
