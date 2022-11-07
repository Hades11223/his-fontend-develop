import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Pagination from "components/Pagination";
import moment from "moment";
import IcGroup from "assets/images/template/icGroup.png";
import IcGuiCt from "assets/svg/giayDayCong/ic-gui-ct.svg";
import IcHuyCn from "assets/svg/giayDayCong/ic-huy-cn.svg";
import IcEye from "assets/svg/ic-eye.svg";
import Icon from "@ant-design/icons";
import { Checkbox, Tooltip } from "antd";
import { useState } from "react";

const { Column } = TableWrapper;

const DanhSachNbTuVong = (props) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);

  const {
    listData,
    page,
    size,
    totalElements,
    dataSortColumn,
    onSearch,
    onSizeChange,
    onSortChange,
    onShowTTTuVong,
  } = props;

  const [state, _setState] = useState({
    isCheckedAll: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    onSizeChange({ page, size });
  }, []);

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
    }),
    Column({
      title: t("giayDayCong.tenNb"),
      width: "250px",
      dataIndex: "tenNb",
      key: "tenNb",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.tenNb",
    }),
    Column({
      title: t("giayDayCong.maBenhAn"),
      width: "120px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.maBenhAn",
    }),
    Column({
      title: t("giayDayCong.maHoSo"),
      width: "120px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.maHoSo",
    }),
    Column({
      title: t("giayDayCong.ngaySinh"),
      width: "150px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      i18Name: "giayDayCong.ngaySinh",
      render: (field, item, index) =>
        field
          ? moment(field).format(item?.chiNamSinh ? "YYYY" : "DD / MM / YYYY")
          : "",
    }),
    Column({
      title: t("giayDayCong.diaChi"),
      width: "220px",
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.diaChi",
    }),
    // Column({
    //   title: t("giayDayCong.trangThai"),
    //   width: "170px",
    //   dataIndex: "trangThai",
    //   key: "trangThai",
    //   i18Name: "giayDayCong.trangThai",
    // }),
    Column({
      title: t("giayDayCong.nbTuVong.thoiGianTuVong"),
      width: "150px",
      dataIndex: "thoiGianTuVong",
      key: "thoiGianTuVong",
      i18Name: "giayDayCong.nbTuVong.thoiGianTuVong",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.nbTuVong.thoiGianChungTu"),
      width: "150px",
      dataIndex: "thoiGianThucHien",
      i18Name: "giayDayCong.nbTuVong.thoiGianChungTu",
      key: "thoiGianThucHien",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    // Column({
    //   title: t("giayDayCong.nbTuVong.thongTinTraVe"),
    //   width: "150px",
    //   dataIndex: "phanHoi",
    //   key: "phanHoi",
    //   i18Name: "giayDayCong.nbTuVong.thongTinTraVe",
    //   render: (item) => {
    //     return item;
    //   },
    // }),
    Column({
      title: t("giayDayCong.nbTuVong.thoiGianVaoVien"),
      width: "150px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      i18Name: "giayDayCong.nbTuVong.thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: (
        <>
          {t("common.tienIch")}
          <img
            src={IcGroup}
            alt="..."
            onClick={onSettings}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
      width: "100px",
      align: "center",
      fixed: "right",
      ignore: true,
      render: (list, item, index) => {
        return (
          <>
            <Tooltip title={t("giayDayCong.action.xemChiTiet")}>
              <IcEye className="ic-action" onClick={onShowTTTuVong(list)} />
            </Tooltip>
            {/* {list.trangThai == 40 ? (
              <Icon
                className="ic-action"
                component={IcHuyCn}
                onClick={() => {}}
              ></Icon>
            ) : (
              <Icon
                className="ic-action"
                component={IcGuiCt}
                onClick={() => {}}
              ></Icon>
            )} */}
          </>
        );
      },
    }),
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked
        ? (listData || []).map((x) => x.id)
        : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];

    if ((listData || []).length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
      });
    }
  };

  // const rowSelection = {
  //   columnTitle: (
  //     <HeaderSearch
  //       title={
  //         <Checkbox
  //           onChange={oncheckAll}
  //           checked={state.isCheckedAll}
  //         ></Checkbox>
  //       }
  //     />
  //   ),
  //   columnWidth: 40,
  //   onChange: onSelectChange,
  //   selectedRowKeys: state.selectedRowKeys,
  // };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listData || []}
        onRow={onRow}
        rowKey={(record) => record.id}
        ref={refSettings}
        // rowSelection={rowSelection}
        tableName="table_GIAYDAYCONG_DsNbTuVong"
      />
      {!!totalElements && (
        <Pagination
          listData={listData || []}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nbTuVong: { listData, totalElements, page, size, dataSortColumn },
  } = state;
  return {
    listData,
    totalElements,
    page,
    size,
    dataSortColumn,
  };
};

const mapDispatchToProps = ({
  nbTuVong: { onSearch, onSizeChange, onSortChange },
  utils: { getUtils },
  phieuIn: { showFileEditor },
}) => ({
  onSearch,
  onSizeChange,
  getUtils,
  onSortChange,
  showFileEditor,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachNbTuVong);
