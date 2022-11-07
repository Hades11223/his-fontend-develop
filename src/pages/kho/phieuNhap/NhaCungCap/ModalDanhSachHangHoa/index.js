import { Checkbox, Radio } from "antd";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "antd";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { useHistory } from "react-router-dom";
import IcExpand from "assets/images/kho/icExpand.png";
import { Button } from "components";
import { Main } from "./styled";
const ModalDanhSachHangHoa = (props, ref) => {
  const refModal = useRef(null);
  const refOnSelected = useRef(null);
  const refCurrentTime = useRef(null);
  const [state, _setState] = useState({ dataVatTuBo: {} });
  const history = useHistory();
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  const {
    listQuyetDinhThauChiTiet,
    page = 0,
    size = 10,
    totalElements,
    dataSortColumn,
  } = useSelector((state) => state.quyetDinhThauChiTiet);
  const {
    phieuNhapXuat: { thongTinPhieu, nhapKhongTheoThau, dsNhapXuatChiTiet },
    kho: { currentItem: khoHienTai },
  } = useSelector((state) => state);
  const {
    quyetDinhThauChiTiet: {
      onSearch,
      onChangeSort,
      onChangeInputSearch,
      addItemVatTuCon,
    },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (
      { ten, dichVuId, vatTuBoId, data, hiddenButon = false },
      onSelected
    ) => {
      setState({
        index: -1,
        ten,
        dataVatTuBo: data,
        hiddenButon,
      });
      if (vatTuBoId) {
        onSearch({
          dataSearch: {
            vatTuBoId,
          },
          fromTongHop: true,
          page: 0,
          size: 10,
        });
      } else {
        onSearch({
          dataSearch: {
            quyetDinhThauId: thongTinPhieu?.quyetDinhThauId,
            dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
            dichVuId: dichVuId,
            ten: ten,
            thau: history.location.pathname.includes("chinh-sua")
              ? !!thongTinPhieu?.quyetDinhThauId
              : !nhapKhongTheoThau,
            dsMucDichSuDung: khoHienTai.nhaThuoc ? 20 : 10,
          },
          fromTongHop: true,
          page: 0,
          size: 10,
        });
      }
      refOnSelected.current = onSelected;
      refModal.current && refModal.current.show();
    },
  }));
  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (key === "ten") {
      setState({ ten: e.target.value });
    }
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        let value = "";
        if (e) {
          if (e?.hasOwnProperty("checked")) value = e?.checked;
          else value = e?.value;
        } else value = e;
        onChangeInputSearch({
          fromTongHop: true,
          [key]: value,
          thau: history.location.pathname.includes("chinh-sua")
            ? !!thongTinPhieu?.quyetDinhThauId
            : !nhapKhongTheoThau,
          dsMucDichSuDung: khoHienTai.nhaThuoc ? 20 : 10,
        });
      },
      500,
      key,
      e?.target || e
    );
  };
  useEffect(() => {
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, []);

  const onClickSort = (key, value) => {
    onChangeSort({
      fromTongHop: true,
      [key]: value,
      // dataSearch: {
      //   quyetDinhThauId: thongTinPhieu?.quyetDinhThauId,
      //   nhaCungCapId: thongTinPhieu?.nhaCungCapId,
      //   dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
      // },
    });
  };

  const onShowChiTiet = (index, data) => {
    if (!data?.vatTuCha) {
      return null;
    }
    let newData = state?.dataSource.filter(
      (item) => item.vatTuBoId === data?.id
    );
    let dataSource = (state?.dataSource || []).map((item) => {
      return {
        ...item,
        expand: newData.includes(item) ? !item?.expand : item?.expand,
      };
    });
    setState({ dataSource });
  };
  const onChangeVatTuCon = (index) => (e) => {
    state.dataSource[index]["vatTuCon"] = e?.target?.checked;
  };
  const columns = [
    {
      title: <HeaderSearch title=" " />,
      key: "check",
      width: "5%",
      align: "center",
      render: (_, data, index) => {
        return (
          <div>
            {!data?.vatTuBoId && !data?.vatTuCha && (
              <Radio
                checked={state.index === index}
                // onChange={() => {
                //   onCancel(index);
                // }}
              />
            )}
            {data?.vatTuBoId && (
              <Checkbox
                defaultChecked={data?.vatTuCon}
                onChange={onChangeVatTuCon(index)}
              />
            )}
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title="STT" />,
      key: "index2",
      width: "5%",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      dataIndex: "index2",
      render: (item, data, index) => {
        return (
          <div onClick={() => onShowChiTiet(index, data)}>
            {!data?.vatTuCha && data?.index}
            {data?.vatTuCha && <img src={IcExpand} alt={IcExpand} />}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hàng hóa"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã hàng hóa"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: "12%",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ten"] || 0}
          search={
            <Input
              value={state?.ten}
              placeholder="Tìm tên hàng hóa"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: "25%",
      render: (item, data) => (
        <label style={{ fontWeight: `${data?.vatTuCha ? "bold" : ""}` }}>
          {item}
        </label>
      ),
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["hamLuong"] || 0}
          search={
            <Input
              placeholder="Tìm hàm lượng"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      dataIndex: "hamLuong",
      key: "hamLuong",
      width: "12%",
      //   sorter: (a, b) => a - b,
    },

    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["quyetDinhThau"] || 0}
          search={
            !thongTinPhieu?.quyetDinhThauId && (
              <Input
                placeholder="Tìm quyết định thầu"
                onChange={onSearchInput("quyetDinhThau")}
              />
            )
          }
        />
      ),
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      width: "12%",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="SL thầu"
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLuongThau"] || 0}
        />
      ),
      dataIndex: "soLuongThau",
      key: "soLuongThau",
      width: "8%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="SL còn lại"
          sort_key="soLuongConLai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLuongConLai"] || 0}
        />
      ),
      dataIndex: "soLuongConLai",
      key: "soLuongConLai",
      width: "8%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key="tenNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenNhaCungCap"] || 0}
          search={
            !thongTinPhieu?.nhaCungCapId && (
              <Input
                placeholder="Tìm nhà cung"
                onChange={onSearchInput("tenNhaCungCap")}
              />
            )
          }
        />
      ),
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "13%",
      align: "left",
      //   sorter: (a, b) => a - b,
    },
  ];
  const onCancel = (record, index) => {
    let data = record;
    let dataCon = (state?.dataSource || []).filter((item) => {
      return (
        item?.vatTuCon &&
        item.vatTuBoId ===
          (thongTinPhieu.quyetDinhThauId
            ? data?.quyetDinhThauChiTietId
            : data?.dichVuId)
      );
    });
    if (dataCon.length) {
      data = { ...data, dsNhapXuatChiTiet: dataCon };
    }
    refOnSelected.current && refOnSelected.current(data);
    refModal.current.hide();
  };
  const onChangePage = (page) => {
    onSearch({
      fromTongHop: true,
      page: page - 1,
      size,
    });
  };
  const onSizeChange = (size) => {
    onSearch({
      fromTongHop: true,
      page: 0,
      size: size,
    });
  };
  const onRow = (record, index) => {
    if (record?.vatTuCha || record?.vatTuBoId > 0) {
      return null;
    }
    return {
      onClick: (e) => {
        if (
          !refCurrentTime.current ||
          new Date() - refCurrentTime.current > 2000
        ) {
          refCurrentTime.current = new Date();
          onCancel(record, index);
        }
      },
    };
  };

  useEffect(() => {
    let data = [];
    Object.keys(listQuyetDinhThauChiTiet).forEach((key) => {
      const { dsVatTuBoChiTiet, index, dichVuId, quyetDinhThauChiTietId } =
        listQuyetDinhThauChiTiet[key];
      data.push(listQuyetDinhThauChiTiet[key]);
      if (dsVatTuBoChiTiet?.length) {
        let payload = {
          ten: "Chi tiết bộ phận",
          vatTuCha: true,
          id: thongTinPhieu?.quyetDinhThauId
            ? quyetDinhThauChiTietId
            : dichVuId,
          dichVuId: dichVuId,
        };
        data.push(payload);
      }
      dsVatTuBoChiTiet?.length &&
        dsVatTuBoChiTiet.map((item, idx) =>
          data.push({
            ...item,
            expand: false,
            index: index + "." + (idx + 1),
            vatTuCon: true,
          })
        );
    });
    setState({
      dataSource: (data || []).filter(
        (item) =>
          !(state?.dataVatTuBo?.dsNhapXuatChiTiet || [])
            .map((x) => x.dichVuId)
            .includes(item?.dichVuId)
      ),
    });
  }, [listQuyetDinhThauChiTiet, state?.dataVatTuBo]);
  const onOk = () => {
    addItemVatTuCon(state.dataSource || []);
    refModal.current.hide();
    setState({ show: false });
  };
  return (
    <ModalTemplate ref={refModal} title="Danh sách hàng hóa">
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
          dataSource={(state?.dataSource || []).filter(
            (x) => x.expand || x.expand === undefined
          )}
          tableName="table_KHO_PhieuNhap_NhaCungCap_ModalDsHangHoa"
          onRow={onRow}
          rowKey={(record) =>
            record.dichVuId +
            "_" +
            record.quyetDinhThauId +
            "_" +
            record.quyetDinhThauChiTietId +
            "_" +
            record.ten
          }
          //   rowClassName={setRowClassName}
        />
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listQuyetDinhThauChiTiet}
          total={totalElements}
          onShowSizeChange={onSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
        {state?.hiddenButon && (
          <div className="footer-action">
            <div className="selected-item"></div>
            <Button minWidth={100} onClick={onCancel}>
              Hủy
            </Button>
            <Button type="primary" minWidth={100} onClick={onOk}>
              Thêm
            </Button>
          </div>
        )}
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDanhSachHangHoa);
