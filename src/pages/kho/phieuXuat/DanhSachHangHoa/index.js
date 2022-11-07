import HeaderSearch from "components/TableWrapper/headerSearch";
import IcDelete from "assets/images/kho/delete.png";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import TableEmpty from "pages/kho/components/TableEmpty";
import { useSelector, useDispatch } from "react-redux";
import { formatDecimal } from "utils";
import NumberFormat from "react-number-format";
import { Input } from "antd";
const blockInvalidChar = (e) => {
  if (
    (e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 96 && e.keyCode <= 105) || // các số trên bàn phím
    e.keyCode === 9 || // tab
    e.which === 8 || // dấu -
    e.keyCode === 37 || // mũi tên trái
    e.keyCode === 39 || // mũi tên phải
    e.keyCode === 190 || // dấu .
    e.keyCode === 188 // dấu ,
  ) {
  } else {
    return e.preventDefault();
  }
};
const ThongTinHangHoa = ({ onFocusSearchHangHoa, isEdit, trangThai }, ref) => {
  const [state, setState] = useState({
    dataRender: [],
    data: [],
  });

  const {
    phieuNhapXuat: { thongTinPhieu, dsNhapXuatChiTiet },
  } = useSelector((state) => state);

  const {
    phieuNhapXuat: { updateData },
  } = useDispatch();

  const onChange = (type, item, index) => (e) => {
    if (
      isEdit &&
      thongTinPhieu?.trangThai &&
      ![10, 15, 20].includes(thongTinPhieu?.trangThai)
    )
      return;
    let value = e?.target ? e?.target.value : e;
    if (type === "soLuongSoCapYeuCau" || type === "soLuongSoCap") {
      value = e.floatValue;
    }
    let ds = dsNhapXuatChiTiet || [];
    const newItem = { ...ds[index], [type]: value };
    if (type === "soLuongSoCapYeuCau") {
      newItem.soLuongSoCap = value;
    }
    ds[index] = newItem;
    updateData({ dsNhapXuatChiTiet: [...ds] });
  };

  useImperativeHandle(ref, () => ({
    updateData: (data) =>
      setState({
        data,
        dataRender: data,
      }),
  }));

  const handleSearch = (value) => {
    const searchStr = value.trim().toLowerCase();
    const newDataRender = (state.data || []).filter(
      (item) => item?.ten?.trim().toLowerCase().indexOf(searchStr) !== -1
    );
    setState({ ...state, dataRender: newDataRender });
  };

  const handleSort = (key1, key2) => (key, value) => {
    // if (value === 0) {
    //   handleSearch("");
    //   setState({
    //     ...state,
    //     sortKey: "",
    //     sortValue: 0,
    //   });
    // } else {
    //   const newDataRender = state.data.sort((a, b) =>
    //     key2
    //       ? value === 1
    //         ? a[key1][key2] - b[key1][key2]
    //         : b[key1][key2] - a[key1][key2]
    //       : value === 1
    //       ? a[key1] - b[key1]
    //       : b[key1] - a[key1]
    //   );
    //   setState({
    //     ...state,
    //     dataRender: newDataRender,
    //     sortKey: key,
    //     sortValue: value,
    //   });
    // }
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      key: "stt",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: <HeaderSearch title="Tên hàng hóa" />,
      key: "ten",
      width: "25%",
      render: (_, data) => data?.ten,
    },
    {
      title: <HeaderSearch title="ĐVT" />,
      align: "center",
      key: "tenDonViTinh",
      render: (_, data) => data?.tenDonViTinh,
    },
    {
      title: <HeaderSearch title="Hàm lượng" />,
      key: "hamLuong",
      align: "right",
      width: "20%",
      render: (_, data) => data?.hamLuong,
    },
    {
      title: <HeaderSearch title="SL yêu cầu" />,
      key: "soLuongSoCapYeuCau",
      align: "right",
      dataIndex: "soLuongSoCapYeuCau",
      render: (value, data, index) =>
        (isEdit && window.location.pathname.indexOf("/chinh-sua") < 0) ||
        ([10, 15].includes(thongTinPhieu.trangThai) &&
          [30, 40].includes(thongTinPhieu.loaiNhapXuat)) ? (
          <NumberFormat
            customInput={Input}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            className="input-option"
            onValueChange={onChange("soLuongSoCapYeuCau", data, index)}
            value={value}
            placeholder="Nhập số tiền"
            onKeyDown={blockInvalidChar}
          />
        ) : (
          formatDecimal(value)
        ),
    },
    {
      title: <HeaderSearch title="SL duyệt" />,
      key: "soLuongSoCap",
      align: "right",
      width: "10%",
      dataIndex: "soLuongSoCap",
      render: (item, data, index) => {
        return !!(window.location.pathname.indexOf("/chinh-sua") > 0) &&
          (thongTinPhieu.loaiNhapXuat === 20 &&
            thongTinPhieu.trangThai === 20) ? (
          <NumberFormat
            customInput={Input}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            className="input-option"
            onValueChange={onChange("soLuongSoCap", data, index)}
            value={item}
            placeholder="Nhập số tiền"
            onKeyDown={blockInvalidChar}
          />
        ) : (
          formatDecimal(item)
        );
      },
    },
    {
      title: <HeaderSearch title="Số lượng khả dụng" />,
      key: "soLuongKhaDung",
      dataIndex: "soLuongKhaDung",
      align: "right",
    },
    {
      title: <HeaderSearch title="Số lô" />,
      key: "soLo",
      align: "right",
      render: (_, data) => data?.soLo || data?.loNhap?.soLo,
    },
    {
      title: <HeaderSearch title="Hạn sử dụng" />,
      key: "hanSuDung",
      align: "right",
      render: (_, data) =>
        (data?.ngayHanSuDung || data?.loNhap?.ngayHanSuDung) &&
        (data?.ngayHanSuDung || data?.loNhap?.ngayHanSuDung)
          .toDateObject()
          .format("dd/MM/yyyy"),
    },
    {
      title: <HeaderSearch title="" />,
      key: "delete",
      width: "5%",
      hidden:
        !isEdit ||
        (thongTinPhieu?.trangThai &&
          ![10, 15].includes(thongTinPhieu?.trangThai)),
      align: "center",
      render: (_, data, index) => (
        <img
          onClick={() => {
            updateData({
              dsNhapXuatChiTiet: dsNhapXuatChiTiet.filter(
                (item) => item.dichVuId !== data.dichVuId
              ),
            });
          }}
          style={{ cursor: "pointer" }}
          src={IcDelete}
          alt="..."
        />
      ),
    },
  ];

  return (
    <Main>
      <TableWrapper
        locale={{
          emptyText: (
            <TableEmpty
              showButton={isEdit}
              onClickButton={isEdit && onFocusSearchHangHoa}
            />
          ),
        }}
        showSorterTooltip={false}
        columns={columns}
        dataSource={dsNhapXuatChiTiet || []}
        pagination={false}
        rowKey={(record) => record.id}
      />
    </Main>
  );
};

export default forwardRef(ThongTinHangHoa);
