import { Input } from "antd";
import IcDelete from "assets/images/kho/delete.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import useWindowSize from "hook/useWindowSize";
import moment from "moment";
import TableEmpty from "pages/kho/components/TableEmpty";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "utils";
import { Main } from "./styled";

const DanhSachHangHoa = ({ onFocusSearchHangHoa, isEdit, ...props }) => {
  const {
    phieuNhapXuat: { thongTinPhieu, dsNhapXuatChiTiet = [] },
  } = useSelector((state) => state);
  const {
    phieuNhapXuat: { updateData: updateData, onRemoveItem },
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

    if (type == "soLuongYeuCau") {
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
      newItem.soLuong = value;
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
        scroll={{ y: 453, x: "auto" }}
        rowKey={(item) => item.id}
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
            title: (
              <HeaderSearch
                title="Tên hàng hóa"
                sort_key="ten"
                search={
                  <Input
                    placeholder="Tìm kiếm theo tên hoặc mã hàng hóa"
                    // onChange={onSearchInput("ten")}
                  />
                }
              />
            ),
            width: 230,
            dataIndex: "ten",
            key: "ten",
            type: true,
            hideSearch: false,
            render: (value, item, index) => {
              return (
                <>
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
                  <div>{item?.ghiChu}</div>
                </>
              );
            },
          },
          {
            title: <HeaderSearch title="ĐVT" sort_key="dvt" />,
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "dichVu",
            key: "donViTinh",
            hideSearch: true,
            render: (item) => item?.tenDonViTinh,
          },
          {
            title: <HeaderSearch title="SL yêu cầu" sort_key="soLuongYeuCau" />,
            key: "soLuongYeuCau",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuongYeuCau",
            hideSearch: true,
            align: "right",
          },
          {
            title: <HeaderSearch title="SL duyệt" sort_key="soLuong" />,
            key: "soLuong",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuong",
            hideSearch: true,
            align: "right",
            render: (field, item, index) =>
              field == 0 ? field : formatNumber(field),
          },
          {
            title: <HeaderSearch title="Số lô" sort_key="soLo" />,
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "loNhap",
            key: "soLo",
            hideSearch: true,
            align: "center",
            render: (item) => item?.soLo,
          },
          {
            title: <HeaderSearch title="Hạn sử dụng" sort_key="hanSuDung" />,
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "loNhap",
            key: "hanSuDung",
            hideSearch: true,
            render: (value, _, __) =>
              value?.ngayHanSuDung
                ? moment(value?.ngayHanSuDung)?.format("DD/MM/YYYY")
                : "", // todo
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
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={dsNhapXuatChiTiet}
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
