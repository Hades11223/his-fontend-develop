import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputNumber, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Main } from "./styled";
import useWindowSize from "hook/useWindowSize";
import IcDelete from "assets/images/kho/delete.png";
import moment from "moment";
import { formatNumber } from "utils";
import TableEmpty from "pages/kho/components/TableEmpty";
import PopoverHangHoa from "../PopoverHangHoa";
const DanhSachHangHoa = ({ onFocusSearchHangHoa, isEdit, ...props }) => {
  const {
    phieuNhapXuat: { thongTinPhieu, dsNhapXuatChiTiet },
  } = useSelector((state) => state);
  const {
    phieuNhapXuat: { updateData, onRemoveItem },
  } = useDispatch();

  const size = useWindowSize();
  const onChange = (type, item, index) => (e) => {
    if (
      isEdit &&
      thongTinPhieu?.trangThai &&
      ![10, 15].includes(thongTinPhieu?.trangThai)
    )
      return;
    const value = e?.target ? e?.target.value : e;
    let ds = dsNhapXuatChiTiet || [];
    const newItem = { ...ds[index], [type]: value };

    if (type === "soLuongSoCapYeuCau") {
      // if (value == null) return;
      // const check =
      //   parseInt(value) &&
      //   value > 0 &&
      //   value <= (item.soLuongKhaDung || item?.soLuong);
      // if (!check) {
      //   messageErrorAntCustom(
      //     `SL tồn trên kho xuất không đủ. SL dự trù: ${value}, SL tồn kho xuất ${
      //       item.soLuongKhaDung || item?.soLuong
      //     }`
      //   );
      //   return;
      // }
      newItem.soLuongSoCap = value;
    }
    ds[index] = newItem;
    updateData({ dsNhapXuatChiTiet: [...ds] });
  };

  const onDelete = (item, index) => (e) => {
    onRemoveItem({ item });
  };
  return (
    <Main className="main">
      <TableWrapper
        scroll={{ y: 453 }}
        rowKey={"key"}
        columns={[
          {
            title: <HeaderSearch title="STT" />,
            width: size.width <= 1400 ? 64 : 64,
            dataIndex: "index",
            key: "index",
            hideSearch: true,
            align: "center",
          },
          {
            title: <HeaderSearch title="Tên hàng hóa" />,
            width: 230,
            dataIndex: "ten",
            key: "ten",
            type: true,
            hideSearch: true,
            render: (value, item, index) => {
              return (
                <>
                  <PopoverHangHoa item={item}>
                    <span
                      className=""
                      style={{
                        color: "#0762F7",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      {item?.ma} - {item?.ten}
                    </span>
                  </PopoverHangHoa>

                  {isEdit ? (
                    <Input
                      placeholder="Nhập ghi chú"
                      className="note-input"
                      value={item?.ghiChu}
                      onChange={onChange("ghiChu", item, index)}
                    />
                  ) : (
                    <div>{item?.ghiChu}</div>
                  )}
                </>
              );
            },
          },
          {
            title: <HeaderSearch title="Hàm lượng" />,
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "hamLuong",
            key: "hamLuong",
            hideSearch: true,
            align: "right",
          },
          {
            title: <HeaderSearch title="SL yêu cầu" />,
            key: "soLuongSoCapYeuCau",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuongSoCapYeuCau",
            hideSearch: true,
            align: "right",
            render: (value, item, index) => {
              return !isEdit ? (
                (value && formatNumber(value)) || ""
              ) : (
                <InputNumber
                  value={item?.soLuongSoCapYeuCau}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    onChange("soLuongSoCapYeuCau", item, index)(value);
                  }}
                  // parser={(value) => parserNumber(value)}
                  // formatter={(value) => formatterNumber(value)}
                />
              );
            },
          },
          {
            title: <HeaderSearch title="SL duyệt" />,
            key: "soLuongSoCap",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuongSoCap",
            hideSearch: true,
            align: "right",
            render: (field, item, index) =>
            thongTinPhieu?.trangThai === 20 ? (
                <InputNumber
                  value={item?.soLuongSoCap}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    onChange("soLuongSoCap", item, index)(value);
                  }}
                />
              ) : field === 0 ? (
                field
              ) : (
                formatNumber(field)
              ),
          },
          {
            title: <HeaderSearch title="Số lô" />,
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "soLo",
            key: "soLo",
            hideSearch: true,
            align: "right",
            hidden: isEdit || thongTinPhieu?.trangThai !== 30,
            render: (value, item, __) => item?.loNhap?.soLo,
          },
          {
            title: <HeaderSearch title="Hạn sử dụng" />,
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "hanSuDung",
            key: "hanSuDung",
            hideSearch: true,
            align: "right",
            hidden: isEdit || thongTinPhieu?.trangThai !== 30,
            render: (value, _, __) => moment(value)?.format("DD/MM/YYYY"),
          },
          {
            title: <HeaderSearch title="Tiện tích" />,
            key: "",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "",
            hideSearch: true,
            hidden: !isEdit,
            align: "right",
            render: (_, item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src={IcDelete}
                    onClick={onDelete(item, index)}
                    alt="..."
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={dsNhapXuatChiTiet || []}
        locale={{
          emptyText: (
            <TableEmpty
              onClickButton={onFocusSearchHangHoa}
              showButton={isEdit}
            />
          ),
        }}
      />
    </Main>
  );
};

export default memo(DanhSachHangHoa);
