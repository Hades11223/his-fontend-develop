import React, { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox, DatePicker, Input, Form, Button } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC, ENUM } from "constants/index";
import { combineSort } from "utils";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import TabPanel from "components/MultiLevelTab/TabPanel";
import { useEnum } from "hook";

let timer = null;
const dateFormat = "DD/MM/YYYY";
const ChuongTrinh = ({
  listChuongTrinhGiamGia,
  getListChuongTrinhGiamGia,
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
  onReset,
  updateData,
  dataSearch,
  onEdit,
  dataSort,
  dataEditDefault,
  getUtils,
  getAllDichVu,
  getAllDichVuCap1,
  setEditStatus,
  getAllTongHopDichVuCap1,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,

  layerId,
}) => {
  const refSelectRow = useRef();
  const [listHinhThucGiamGia] = useEnum(ENUM.HINH_THUC_GIAM_GIA);
  const [listCachThucGiamGia] = useEnum(ENUM.CACH_THUC_GIAM_GIA);
  const [listLoaiApDungGiamGia] = useEnum(ENUM.LOAI_AP_DUNG_GIAM_GIA);
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
      setEditStatus(true);
      onEdit(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-1-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  useEffect(() => {
    const res = combineSort(dataSort);
    getListChuongTrinhGiamGia({ page, size, sort: res });
    getAllDichVu({});
    // getAllDichVuCap1({});
    getAllTongHopDichVuCap1({});
  }, []);

  const data = useMemo(() => {
    return listChuongTrinhGiamGia.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: page * size + index + 1,
      };
    });
  }, [listChuongTrinhGiamGia]);

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    updateData({ dataSort: sort });
    const res = combineSort(sort);
    getListChuongTrinhGiamGia({
      page: PAGE_DEFAULT,
      size: size,
      sort: res,
      ...dataSearch,
    });
  };

  const onChangeInputSearch = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListChuongTrinhGiamGia({
        ...dataSearch,
        page: 0,
        size: size,
        [name]: value,
        sort: combineSort(dataSort),
      });
    }, 500);
  };

  const onSearchInput = (name) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d.format("dd/MM/yyyy");
    else value = e;
    onChangeInputSearch(value, name);
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      setEditStatus(true);
      onEdit(record.action);
    },
  });

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã chương trình"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSort.ma || 0}
          search={<Input placeholder="Tìm mã" onChange={onSearchInput("ma")} />}
        />
      ),
      width: 150,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên chương trình"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSort.ten || 0}
          search={
            <Input
              placeholder="Tìm tên chương trình"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Giá trị"
          sort_key="giaTri"
          onClickSort={onClickSort}
          dataSort={dataSort.giaTri || 0}
          search={
            <Input
              placeholder="Tìm giá trị"
              onChange={onSearchInput("giaTri")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "giaTri",
      key: "giaTri",
      align: "right",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mô tả"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSort.moTa || 0}
          search={
            <Input placeholder="Tìm mô tả" onChange={onSearchInput("moTa")} />
          }
        />
      ),
      width: 120,
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng từ ngày"
          sort_key="tuNgay"
          onClickSort={onClickSort}
          dataSort={dataSort.tuNgay || 0}
          searchSelect={
            <DatePicker
              placeholder="Tìm áp dụng từ ngày"
              onChange={onSearchInput("tuNgay")}
              format={dateFormat}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tuNgay",
      key: "tuNgay",
      align: "center",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng đến ngày"
          sort_key="denNgay"
          onClickSort={onClickSort}
          dataSort={dataSort.denNgay || 0}
          searchSelect={
            <DatePicker
              placeholder="Tìm áp dụng đến ngày"
              onChange={onSearchInput("denNgay")}
              format={dateFormat}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "denNgay",
      key: "denNgay",
      align: "center",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hình thức miễn giảm"
          sort_key="hinhThucGiamGia"
          onClickSort={onClickSort}
          dataSort={dataSort.hinhThucGiamGia || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listHinhThucGiamGia || [])]}
              placeholder="Tìm hình thức miễn giảm"
              onChange={onSearchInput("hinhThucGiamGia")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hinhThucGiamGia",
      key: "hinhThucGiamGia",
      render: (item) => {
        return item && listHinhThucGiamGia?.find((e) => e.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Cách thức miễn giảm"
          sort_key="cachThucGiamGia"
          onClickSort={onClickSort}
          dataSort={dataSort.cachThucGiamGia || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listCachThucGiamGia || [])]}
              placeholder="Tìm cách thức miễn giảm"
              onChange={onSearchInput("cachThucGiamGia")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "cachThucGiamGia",
      key: "cachThucGiamGia",
      render: (item) => {
        return item && listCachThucGiamGia?.find((e) => e.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại áp dụng"
          sort_key="loaiApDungGiamGia"
          onClickSort={onClickSort}
          dataSort={dataSort.loaiApDungGiamGia || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[
                { id: "", ten: "Tất cả" },
                ...(listLoaiApDungGiamGia || []),
              ]}
              placeholder="Tìm loại áp dụng"
              onChange={onSearchInput("loaiApDungGiamGia")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "loaiApDungGiamGia",
      key: "loaiApDungGiamGia",
      render: (item) => {
        return item && listLoaiApDungGiamGia?.find((e) => e.id === item)?.ten;
      },
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
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 120,
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
          checkRole([ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA_THEM])
            ? [
                {
                  type: "create",
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
            : [
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
        columns={columns}
        dataSource={data}
        onRow={onRow}
        layerId={layerId}
        dataEditDefault={dataEditDefault}
        // rowClassName={(record, index) =>
        //   dataEditDefault?.id === record.id
        //     ? "row-actived row-id-1-" + record.id
        //     : "row-id-1-" + record.id
        // }
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
    </TabPanel>
  );
};

const mapStateToProps = (state) => {
  const {
    chuongTrinhGiamGia: { listChuongTrinhGiamGia },
  } = state;

  return {
    listChuongTrinhGiamGia,
  };
};
const mapDispatchToProps = ({
  chuongTrinhGiamGia: { getListChuongTrinhGiamGia },
  utils: { getUtils },
  dichVu: { getAllDichVu },
  nhomDichVuCap1: { getAllDichVuCap1, getAllTongHopDichVuCap1 },
}) => ({
  getListChuongTrinhGiamGia,
  getUtils,
  getAllDichVu,
  getAllDichVuCap1,
  getAllTongHopDichVuCap1,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChuongTrinh);
