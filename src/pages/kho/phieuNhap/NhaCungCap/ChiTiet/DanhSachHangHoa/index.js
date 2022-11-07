import { Popover } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import TableEmpty from "pages/kho/components/TableEmpty";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatNumber } from "utils";
import PopoverHangHoa from "../../PopoverHangHoa";
import { Main } from "./styled";
const DanhSachHangHoa = ({
  dataSortColumn,
  onClickSort,
  detachLine = true,
  detail = {},
  ...props
}) => {
  const {
    phieuNhapXuat: { dsNhapXuatChiTiet },
  } = useSelector((state) => state);

  const columns = [
    {
      title: <HeaderSearch title="STT" minHeight={0} />,
      key: "stt",
      width: "5%",
      ellipsis: {
        showTitle: false,
      },
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: (
              <div className="table_line">
                <div className="table_line_2">
                  <div className="line_2_col">
                    <div>Mã hiệu: </div>
                    <div>{data?.loNhap?.maKyHieu}</div>
                  </div>
                  <div className="line_2_col">
                    <div>Số lô: </div>
                    <div>{data?.loNhap?.soLo}</div>
                  </div>
                  <div className="line_2_col">
                    <div>HSD: </div>
                    <div>
                      {data?.loNhap?.ngayHanSuDung &&
                        moment(data.loNhap.ngayHanSuDung).format("DD/MM/YYYY")}
                    </div>
                  </div>
                  <div className="line_2_col">
                    <div>Thặng số bán lẻ: </div>
                    <div>{data?.loNhap?.thangSoBanLe || 0}</div>
                  </div>
                  <div className="line_2_col">
                    <div>Xuất xứ: </div>
                    <div>{data.loNhap?.xuatXu?.ten}</div>
                  </div>
                </div>
                <div className="table_line_1">
                  <div className="line_1_col">
                    <div>Đơn giá BH: </div>
                    <div>{formatNumber(data?.loNhap?.giaBaoHiem || 0)}</div>
                  </div>
                  <div className="line_1_col">
                    <div>Đơn giá không BH: </div>
                    <div>
                      {formatNumber(data?.loNhap?.giaKhongBaoHiem || 0)}
                    </div>
                  </div>
                  <div className="line_1_col">
                    <div>Phụ thu: </div>
                    <div>{formatNumber(data?.loNhap?.giaPhuThu || 0)}</div>
                  </div>

                  <div className="line_1_col">
                    <div>Nhà sản xuất: </div>
                    <div style={{ whiteSpace: "break-spaces" }}>
                      {data.loNhap?.nhaSanXuat?.ten}
                    </div>
                  </div>
                </div>
              </div>
            ),
            props: {
              colSpan: 6,
            },
          }
        ) : (
          <div>{data?.index}</div>
        ),
    },
    {
      title: (
        <HeaderSearch
          minHeight={0}
          title="Mã hàng hóa"
          sort_key="dichVu.dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ma"] || 0}
        />
      ),
      key: "ma",
      width: "15%",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <PopoverHangHoa data={data}>
            <div className="item-ma fit-content">  {data?.vatTuKichCo
                  ? data.loNhap.kichCoVt.ma
                  : data.dichVu?.ma}</div>
          </PopoverHangHoa>
        ),
    },
    {
      title: (
        <HeaderSearch
          minHeight={0}
          title="Tên hàng hóa"
          sort_key="dichVu.dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ten"] || 0}
        />
      ),
      key: "ten",
      width: "40%",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div className="fit-content">
            <PopoverHangHoa data={data}>
              <div className="item-ten">
                {data?.vatTuKichCo
                  ? data.loNhap.kichCoVt.ten
                  : data.dichVu?.ten}
              </div>
            </PopoverHangHoa>
            <div className="font-normal">{data?.loNhap?.ghiChu}</div>
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          minHeight={0}
          title="SL"
          sort_key="soLuongSoCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soLuongSoCap || 0}
        />
      ),
      dataIndex: "soLuongSoCap",
      key: "soLuongSoCap",
      width: "10%",
      align: "center",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div className="bold">
            {formatNumber(item) + " " + (data.dvtSoCap?.ten || "")}
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          minHeight={0}
          title="Giá sau VAT"
          sort_key="loNhap.giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["loNhap.giaNhapSauVat"] || 0}
        />
      ),
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      width: "15%",
      align: "center",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <Popover
            placement="bottom"
            overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
            content={
              <div>
                <label>Giá nhập trước VAT</label>
                <label>
                  {formatNumber(data?.loNhap?.giaNhapTruocVat || 0)}
                </label>

                <hr
                  style={{
                    borderTop: "1px solid #c5cad3",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                  }}
                />
                <label>VAT</label>
                <label>{formatNumber(data?.loNhap?.vat || 0)}</label>
              </div>
            }
          >
            <div className="pointer bold">
              {formatNumber(data?.loNhap?.giaNhapSauVat || 0)}
            </div>
          </Popover>
        ),
    },
    {
      title: (
        <HeaderSearch
          minHeight={0}
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thanhTien || 0}
        />
      ),
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: "15%",
      align: "center",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <Popover
            placement="bottom"
            overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
            content={
              <div>
                <label>Thành tiền sửa đổi</label>
                <p>{formatNumber(data?.thanhTienSuaDoi || 0)}</p>
              </div>
            }
          >
            <div className="pointer bold">
              {formatNumber(data?.thanhTien || 0)}
            </div>
          </Popover>
        ),
    },
  ];

  const dataSource = useMemo(() => {
    let data = [];
    (dsNhapXuatChiTiet || []).map((item, index) => {
      data.push({ ...item, index: index + 1 });
      (item.dsNhapXuatChiTiet || []).map((item2, index2) => {
        data.push({
          ...item2,
          index: index + 1 + "." + (index2 + 1),
          ma: item2?.dichVu?.ma || item2?.ma,
          ten: item2?.dichVu?.ten || item2?.ten,
        });
      });
    });

    return (data || []).reduce((a, item, index) => {
      return [
        ...a,
        {
          ...item,
          rowId: index,
        },
        {
          ...item,
          rowId: index + "_",
        },
      ];
    }, []);
  }, [dsNhapXuatChiTiet]);
  console.log("dataSource", dataSource);

  return (
    <Main>
      <TableWrapper
        className="danh-sach-hang-hoa"
        locale={{
          emptyText: <TableEmpty />,
        }}
        showSorterTooltip={false}
        rowClassName={(record, index) =>
          index % 2 === 1 ? "none-border-top" : "border-top"
        }
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.rowId}
      ></TableWrapper>
    </Main>
  );
};

export default DanhSachHangHoa;
