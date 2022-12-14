import { Checkbox } from "antd";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputNumber } from "antd";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { Main } from "./styled";
import Button from "pages/kho/components/Button";
const ModalDanhSachHangHoa = ({ focusSearchHangHoa }, ref) => {
  const refModal = useRef(null);
  const refTenHangHoa = useRef(null);
  const refOnSelected = useRef(null);
  const [state, _setState] = useState({
    listSelected: [],
  });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  const {
    tonKho: { listData, page = 0, size = 10, totalElements, dataSortColumn },
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);
  const {
    tonKho: { onSearch, onSortChange, onChangeInputSearch },
  } = useDispatch();
  useImperativeHandle(ref, () => ({
    show: ({ ten }, onSelected) => {
      // if (refTenHangHoa.current) {
      //   refTenHangHoa.current.setValue(ten);
      // }
      setState({
        show: true,
        ten,
        listSelected: [],
      });

      refOnSelected.current = onSelected;
      refModal.current && refModal.current.show();
    },
  }));
  const refTimeOut = useRef(null);
  const dataSearch = useMemo(() => {
    let dataSearch = {
      ten: state.ten,
      khoId: thongTinPhieu?.khoId,
    };
    return dataSearch;
  }, [state.ten, thongTinPhieu]);

  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        let value = e;
        if (e) {
          if (e?.hasOwnProperty("checked")) value = e?.checked;
          else if (e?.hasOwnProperty("value")) value = e?.value;
        } else value = e;
        onChangeInputSearch({
          fromTongHop: true,
          theoLo: true,
          ...dataSearch,
          [key]: value,
        });
      },
      500,
      key,
      e?.target || e
    );
  };
  useEffect(() => {
    if (state.show) onSizeChange(10);
  }, [state.ten, state.show]);

  useEffect(() => {
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, []);

  const onClickSort = (key, value) => {
    onSortChange({
      fromTongHop: true,
      theoLo: true,
      [key]: value,
    });
  };

  const onSelect = (data, index) => (e) => {
    let listSelected = state.listSelected || [];
    const index = listSelected.findIndex(
      (item) => item.id === data?.id
    );
    if (index === -1) {
      setState({
        listSelected: [...listSelected, data],
      });
    } else {
      listSelected.splice(index, 1);
      setState({ listSelected: [...listSelected] });
    }
  };

  const getChecked = (data, index) => {
    let listSelected = state.listSelected || [];
    return listSelected.find((item) => item.id === data?.id);
  };

  const columns = [
    {
      title: <HeaderSearch title=" " />,
      key: "check",
      width: "7%",
      align: "center",
      render: (_, data, index) => (
        <Checkbox
          checked={getChecked(data, index)}
          onChange={onSelect(data, index)}
        />
      ),
    },
    {
      title: <HeaderSearch title="STT" />,
      key: "index",
      width: "7%",
      align: "center",
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
    },
    {
      title: (
        <HeaderSearch
          title="T??n Ho???t Ch???t"
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenHoatChat"] || 0}
          search={
            !thongTinPhieu?.quyetDinhThauId && (
              <Input
                placeholder="T??m t??n ho???t ch???t"
                onChange={onSearchInput("tenHoatChat")}
              />
            )
          }
        />
      ),
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
      width: "15%",
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
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="SL Kh??? d???ng"
          sort_key="soLuongKhaDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLuongKhaDung"] || 0}
          search={
            <InputNumber
              min={0}
              step={1}
              placeholder="T??m s??? l?????ng kh??? d???ng"
              onChange={onSearchInput("soLuongKhaDung")}
            />
          }
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
          title="Nh?? cung c???p"
          sort_key="tenNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenNhaCungCap"] || 0}
          search={
            !thongTinPhieu?.nhaCungCapId && (
              <Input
                placeholder="T??m nh?? cung"
                onChange={onSearchInput("tenNhaCungCap")}
              />
            )
          }
        />
      ),
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "15%",
      align: "left",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="S??? l??"
          sort_key="soLo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLo"] || 0}
          search={
              <Input
                placeholder="T??m nh?? cung"
                onChange={onSearchInput("soLo")}
              />
          }
        />
      ),
      dataIndex: "soLo",
      key: "soLo",
      width: "15%",
      align: "left",
      //   sorter: (a, b) => a - b,
    },
  ];
  const onCancel = () => {
    refModal.current.hide();
    setState({ show: false });
  };
  const onOk = () => {
    refOnSelected.current && refOnSelected.current(state.listSelected || []);
    refModal.current.hide();
    setState({ show: false });
  };
  const onChangePage = (page) => {
    onSearch({
      fromTongHop: true,
      theoLo: true,
      dataSearch,
      page: page - 1,
      size: 10,
    });
  };
  const onSizeChange = (size) => {
    onSearch({
      fromTongHop: true,
      theoLo: true,
      dataSearch,
      page: 0,
      size: size,
    });
  };
  return (
    <ModalTemplate ref={refModal} title="Danh s??ch h??ng h??a">
      <Main>
        <TableWrapper
          rowClassName={(record, index) => {
            return index % 2 === 0
              ? `table-row-even ${
                  index === state?.listServiceSelected?.length - 1
                    ? "add-border"
                    : ""
                }`
              : `table-row-odd ${
                  index === state?.listServiceSelected?.length - 1
                    ? "add-border"
                    : ""
                }`;
          }}
          columns={columns}
          dataSource={listData}
          //   onRow={onRow}
          rowKey={(record) => record.id + "_" + record.khoId}
          //   rowClassName={setRowClassName}
        />
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listData}
          total={totalElements}
          onShowSizeChange={onSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
        <div className="footer-action">
          <div className="selected-item">
            ???? ch???n: {state.listSelected?.length || 0} d???ch v???
          </div>
          <Button minWidth={100} onClick={onCancel}>
            H???y
          </Button>
          <Button type="primary" minWidth={100} onClick={onOk}>
            Th??m
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDanhSachHangHoa);
