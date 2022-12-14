import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import { Input } from "antd";
import { ModalTemplate } from "components";

const ModalDanhSachHangHoa = (props, ref) => {
  const refModal = useRef(null);
  const refTenHangHoa = useRef(null);
  const refOnSelected = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  const {
    tonKho: { listData, page = 0, size = 10, totalElements, dataSortColumn },
    phieuNhapXuat: { thongTinPhieu },
    quanTriKho: { listData: listKhoDoiUng },
  } = useSelector((state) => state);

  const {
    tonKho: { onSearch, onSortChange, onChangeInputSearch },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: ({ ten }, onSelected) => {
      setState({
        ten,
        show: true,
      });
      onSearch({
        dataSearch: {
          ...dataSearch,
          ten,
        },
        fromTongHop: true,
        page: 0,
        size: 10,
      });

      refModal.current && refModal.current.show();
      refOnSelected.current = onSelected;
    },
    hide: () => {
      setState({
        show: false,
      });
      refModal.current && refModal.current.hide();
    },
  }));

  const onClickSort = (key, value) => {
    onSortChange({
      fromTongHop: true,
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);

  useEffect(() => {
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, []);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        let value = "";
        if (e) {
          if (e.hasOwnProperty("checked")) value = e?.checked;
          else {
            if (e.hasOwnProperty("value")) {
              value = e.value;
            } else value = e;
          }
        } else value = e;
        onChangeInputSearch({
          fromTongHop: true,
          ...dataSearch,
          [key]: value,
        });
      },
      500,
      key,
      e?.target || e
    );
  };

  const columns = [
    {
      title: <HeaderSearch title="" />,
      key: "check",
      width: "7%",
      align: "center",
      render: (_, data, index) => (
        <Radio checked={false} onClick={onSelected(index)} />
      ),
    },
    {
      title: <HeaderSearch title="STT" sort_key="" />,
      key: "index",
      width: "7%",
      ellipsis: {
        showTitle: false,
      },
      dataIndex: "index",
    },
    {
      title: (
        <HeaderSearch
          title="M?? h??ng h??a"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? h??ng h??a"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: "15%",
      //   sorter: (a, b) => a - b,
      render: (field, item, index) => <b>{field}</b>,
    },
    {
      title: (
        <HeaderSearch
          title="T??n h??ng h??a"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ten"] || 0}
          search={
            <Input
              defaultValue={state.ten}
              ref={refTenHangHoa}
              placeholder="T??m t??n h??ng h??a"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: "30%",
      //   sorter: (a, b) => a - b,
      render: (field, item, index) => <b>{field}</b>,
    },
    {
      title: (
        <HeaderSearch
          title="T??n ho???t ch???t"
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenHoatChat"] || 0}
          search={
            <Input
              placeholder="T??m t??n ho???t ch???t"
              onChange={onSearchInput("tenHoatChat")}
            />
          }
        />
      ),
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="H??m l?????ng"
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["hamLuong"] || 0}
          search={
            <Input
              placeholder="T??m h??m l?????ng"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      dataIndex: "hamLuong",
      key: "hamLuong",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="??VT"
          sort_key="tenDonViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenDonViTinh"] || 0}
          search={
            <Input
              placeholder="T??m ????n v??? t??nh"
              onChange={onSearchInput("tenDonViTinh")}
            />
          }
        />
      ),
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="SL kh??? d???ng"
          sort_key="soLuongKhaDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLuongKhaDung"] || 0}
        />
      ),
      dataIndex: "soLuongKhaDung",
      key: "soLuongKhaDung",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="Nh?? s???n xu???t"
          sort_key="tenNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenNhaCungCap"] || 0}
          search={
            <Input
              placeholder="T??m nh?? cung c???p"
              onChange={onSearchInput("tenNhaCungCap")}
            />
          }
        />
      ),
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
  ];
  const onSelected = (index) => () => {
    const item = (listData || [])[index];
    refOnSelected.current && refOnSelected.current(item);
    refModal.current.hide();
  };

  const dataSearch = useMemo(() => {
    let dataSearch = {
      ten: state.ten,
      khoId: thongTinPhieu?.khoDoiUngId,
    };
    if (!thongTinPhieu?.khoDoiUngId) {
      dataSearch.dsKhoId = (listKhoDoiUng || []).map((i) => i.khoQuanLyId);
    }
    return dataSearch;
  }, [state.ten, thongTinPhieu, listKhoDoiUng]);

  const onChangePage = (page) => {
    onSearch({
      fromTongHop: true,
      page: page - 1,
      size: 10,
    });
  };
  const onSizeChange = (size) => {
    onSearch({
      fromTongHop: true,
      page: 0,
      size: size,
    });
  };
  const onCancel = () => {
    setState({
      show: false,
    });
  };
  return (
    <ModalTemplate
      ref={refModal}
      title="Danh s??ch h??ng h??a"
      onCancel={onCancel}
    >
      <TableWrapper
        columns={columns}
        dataSource={listData}
        //   onRow={onRow}
        rowKey={(record) => {}}
        // rowClassName={setRowClassName}
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        total={totalElements}
        listData={listData}
        onShowSizeChange={onSizeChange}
        stylePagination={{ flex: 1, justifyContent: "flex-start" }}
      />
    </ModalTemplate>
  );
};

export default forwardRef(ModalDanhSachHangHoa);
