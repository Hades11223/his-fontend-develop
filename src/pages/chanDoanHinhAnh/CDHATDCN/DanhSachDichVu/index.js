import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";
import { HeaderSearch, Pagination, TableWrapper } from "components";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import IcSetting from "assets/svg/ic-setting.svg";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Main } from "../styled";

const DanhSachDichVu = () => {
  const { listData, page, size, totalElements, dataSortColumn1 } = useSelector(
    (state) => state.dsBenhNhan
  );
  const {
    dsBenhNhan: { getListNb, onSizeChange, onSortChangeListNb },
  } = useDispatch();

  useEffect(() => {
    getListNb({});
  }, []);
  const [state, _setState] = useState({
    isCheckedAll: false,
  });
  //ref
  const refSettings = useRef(null);
  const { t } = useTranslation();

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const onClickSort = (key, value) => {
    onSortChangeListNb({ [key]: value });
  };

  const onCheck = (item) => () => {
    setState({ editId: null });
  };

  const onEdit = (item) => () => {
    setState({ editId: item.index });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  //column
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      width: "80px",
      align: "center",
      render: (_, item) => {
        return item.index;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.maHoSo || 0}
        />
      ),
      i18Name: "common.maHoSo",
      show: true,
      align: "center",
      dataIndex: "maHoSo",
      width: "120px",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNguoiBenh")}
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.maNb || 0}
        />
      ),
      align: "center",
      dataIndex: "maNb",
      width: "120px",
      i18Name: "common.maNguoiBenh",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenNb")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.tenNb || 0}
        />
      ),
      width: "150px",
      // align: "center",
      dataIndex: "tenNb",
      i18Name: "common.tenNb",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maDv")}
          sort_key="maDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.maDichVu || 0}
        />
      ),
      // align: "center",
      dataIndex: "maDichVu",
      width: "120px",
      i18Name: "common.maDv",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.tenDichVu || 0}
        />
      ),
      // align: "center",
      dataIndex: "tenDichVu",
      width: "200px",
      i18Name: "common.tenDichVu",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soPhieu")}
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.soPhieu || 0}
        />
      ),
      align: "center",
      width: "120px",
      dataIndex: "soPhieu",
      i18Name: "common.soPhieu",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title="ID"
          sort_key="id"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.id || 0}
        />
      ),
      align: "center",
      width: "120px",
      dataIndex: "id",
      columnName: "ID",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("Trạng thái")}
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.trangThai || 0}
        />
      ),
      width: "120px",
      align: "center",
      dataIndex: "trangThai",
      i18Name: "common.trangThai",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.daGuiPacs")}
          sort_key="guiPacs"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.guiPacs || 0}
        />
      ),

      width: "120px",
      align: "center",
      dataIndex: "guiPacs",
      i18Name: "cdha.daGuiPacs",
      show: true,
      render: (_, item) => {
        return <Checkbox checked={item === true ? true : false} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.ngayChiDinh")}
          sort_key="thoiGianChiDinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.thoiGianChiDinh || 0}
        />
      ),
      align: "center",
      dataIndex: "thoiGianChiDinh",
      width: "200px",
      i18Name: "cdha.ngayChiDinh",
      show: true,
      render: (item) => {
        return item && new Date(item).format("dd/MM/YYYY - HH:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.daTT")}
          sort_key="thanhToan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn1.thanhToan || 0}
        />
      ),
      align: "center",
      width: "120px",
      i18Name: "common.daTT",
      show: true,
      dataIndex: "thanhToan",
      render: (item) => {
        return <Checkbox defaultValue={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.tienIch")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "100px",
      align: "center",
      fixed: "right",
      render: (_, item) => {
        return (
          <div className="tool-btn">
            <EditOutlined
              style={{ color: "#0762F7", fontSize: 18 }}
              onClick={onEdit(item)}
            />
          </div>
        );
      },
    },
  ];

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked
        ? (listData || []).map((x) => x.id)
        : [],
      isCheckedAll: e.target?.checked,
    });
  };
  const onChangePage = (page) => {
    getListNb({ page: page - 1, size });
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

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        scroll={{ y: 400, x: 700 }}
        bordered
        ref={refSettings}
        columns={columns}
        tableName="table_CDHATDCN"
        dataSource={listData || []}
        rowSelection={rowSelection}
        rowKey={(record) => `${record.id}`}
        onRow={onRow}
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
export default DanhSachDichVu;
