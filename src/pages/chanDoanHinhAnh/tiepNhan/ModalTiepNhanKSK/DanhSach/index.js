import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Checkbox, Input } from "antd";
import { HeaderSearch, Pagination, TableWrapper } from "components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { TRANG_THAI_DICH_VU } from "constants/index";
import { useThietLap } from "hook";

const DanhSach = (props, ref) => {
  const { t } = useTranslation();
  const refTimeOut = useRef(null);

  const {
    listData,
    listDataLimit,
    page,
    size,
    totalElements,
    dataSortColumn,
    dataSearch,
  } = useSelector((state) => state.dsBenhNhan);

  const {
    dsBenhNhan: {
      onSearch,
      onSizeChange,
      onSortChange,
      updateData,
      onChangeInputSearch,
    },
  } = useDispatch();

  const thietLap = useThietLap("TIEP_NHAN_KSK_TOI_DA", 70);

  const [state, _setState] = useState({
    selectedRowKeys: [],
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  // console.log(page, size, totalElements);
  // console.log(listData);
  // console.log(listDataLimit);
  // console.log("selectedRowKeys", state.selectedRowKeys);
  // console.log("dataSearch", dataSearch);
  // console.log("selectedRowKeys", state.selectedRowKeys);

  useEffect(() => {
    // get 10 record
    onChangeInputSearch({
      khamSucKhoe: true,
    });

    // get thietLap[0] record
    onChangeInputSearch({
      size: thietLap[0],
      khamSucKhoe: true,
      isSelectLimit: true,
    });
  }, [dataSearch.maHopDong, dataSearch.tenHopDong, dataSearch.tenDoiTac]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setState({
        selectedRowKeys: [],
      });
      updateData({ listSelectedId: [] });
    },
  }));

  const isSelectAll = useMemo(() => {
    return (
      state.selectedRowKeys.length !== 0 &&
      state.selectedRowKeys.length === listDataLimit.length
    );
  }, [state.selectedRowKeys, listDataLimit]);

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  const handleSizeChange = (pageSize) => {
    onSizeChange({ size: pageSize });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onCheckAll = async (e) => {
    const arrSelectedRowKeys = e.target?.checked
      ? [...new Set((listDataLimit || []).map((x) => String(x.id)))]
      : [
          // ...state.selectedRowKeys.filter(
          //   (x) => !listDataLimit.map((y) => y.id).includes(x)
          // ),
        ];

    setState({
      selectedRowKeys: arrSelectedRowKeys,
    });
    updateData({ listSelectedId: arrSelectedRowKeys });
  };

  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        onChangeInputSearch({
          [key]: value,
          khamSucKhoe: true,
        });
        onChangeInputSearch({
          [key]: value,
          size: thietLap[0],
          khamSucKhoe: true,
          isSelectLimit: true,
        });
        setState({ selectedRowKeys: [] });
      },
      500,
      key,
      e?.target
    );
  };

  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      if (state.selectedRowKeys.length === listDataLimit.length) return;

      let result = [...state.selectedRowKeys];

      if (selected) {
        result.push(String(record.id));
      } else {
        result = result.filter((item) => item !== String(record.id));
      }

      setState({ selectedRowKeys: result });
      updateData({ listSelectedId: result });
    },
    // onChange: (record) => {
    //   setState({ selectedRowKeys: record });
    //   updateData({ listSelectedId: record });
    // },
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox onChange={onCheckAll} checked={isSelectAll}></Checkbox>
        }
      />
    ),
    columnWidth: 40,
    selectedRowKeys: state.selectedRowKeys,
    // onChange: onSelectOne,
  };

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
          dataSort={dataSortColumn.maHoSo || 0}
          search={
            <Input
              placeholder={t("common.nhapMaHoSo")}
              onChange={onSearchInput("maHoSo")}
            />
          }
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
          dataSort={dataSortColumn.maNb || 0}
          search={
            <Input
              placeholder={t("common.nhapMaNguoiBenh")}
              onChange={onSearchInput("maNb")}
            />
          }
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
          dataSort={dataSortColumn.tenNb || 0}
          search={
            <Input
              placeholder={t("common.nhapTenNb")}
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: "160px",
      // align: "center",
      dataIndex: "tenNb",
      i18Name: "common.tenNb",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.tenCongTy")}
          sort_key="id"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenDoiTac || 0}
          // search={
          //   <Input
          //     placeholder={t("cdha.nhapTenCongTy")}
          //     onChange={onSearchInput("tenDoiTac")}
          //   />
          // }
        />
      ),
      align: "center",
      width: "220px",
      dataIndex: "tenDoiTac",
    },
  ];

  return (
    <Main>
      <span className="title__warning">
        Lưu ý SL hồ sơ tiếp nhận tối đa = {thietLap}
      </span>
      <div>
        Đã chọn{" "}
        <b className="title__warning">
          {state.selectedRowKeys?.length || 0} NB
        </b>{" "}
        cần tiếp nhận KSK
      </div>
      <TableWrapper
        scroll={{ y: 240 }}
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
export default forwardRef(DanhSach);
