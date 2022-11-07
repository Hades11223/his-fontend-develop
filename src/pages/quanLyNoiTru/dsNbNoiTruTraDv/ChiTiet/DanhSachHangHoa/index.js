import React from "react";
import { Input } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import useWindowSize from "hook/useWindowSize";
import moment from "moment";
import TableEmpty from "pages/kho/components/TableEmpty";
import { memo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Main } from "./styled";

const DanhSachHangHoa = ({ onFocusSearchHangHoa, isEdit, ...props }) => {
  const size = useWindowSize();
  const refModalDsNb = useRef();
  const [state, _setState] = useState({ dataSortColumn: {}, listCheckId: [] });
  const { dataSortColumn } = state;
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const {
    phieuNhapXuat: { dsNhapXuatChiTiet = [] },
  } = useSelector((state) => state);

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  const onDelete = (item, index) => (e) => {
    // onRemoveItem({ item });
  };

  const onDetail = () => {
    if (refModalDsNb.current) {
      refModalDsNb.current.show();
    }
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
                onClickSort={onClickSort}
                dataSort={dataSortColumn.ten || 0}
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
                    {item?.ten}
                  </span>
                  <div>{item?.ghiChu}</div>
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title="Hàm lượng"
                sort_key="hamLuong"
                onClickSort={onClickSort}
                dataSort={dataSortColumn.hamLuong || 0}
              />
            ),
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "hamLuong",
            key: "hamLuong",
            hideSearch: true,
            // render: (item) => item?.tenDonViTinh,
          },
          {
            title: (
              <HeaderSearch
                title="SL trả"
                sort_key="soLuongYeuCau"
                onClickSort={onClickSort}
                dataSort={dataSortColumn.soLuongYeuCau || 0}
              />
            ),
            key: "soLuongYeuCau",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuongYeuCau",
            hideSearch: true,
            align: "right",
          },
          {
            title: (
              <HeaderSearch
                title="SL kê"
                sort_key="soLuong"
                onClickSort={onClickSort}
                dataSort={dataSortColumn.soLuong || 0}
              />
            ),
            key: "soLuong",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuong",
            hideSearch: true,
            align: "right",
          },
          {
            title: (
              <HeaderSearch
                title="Số dùng"
                sort_key="soLo"
                onClickSort={onClickSort}
                dataSort={dataSortColumn.soLo || 0}
              />
            ),
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "loNhap",
            key: "soLo",
            hideSearch: true,
            align: "center",
            render: (item) => item?.soLo,
          },
          {
            title: (
              <HeaderSearch
                title="Ngày trả"
                sort_key="loNhap.ngayHanSuDung"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["loNhap.ngayHanSuDung"] || 0}
              />
            ),
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "loNhap",
            key: "ngayHanSuDung",
            hideSearch: true,
            render: (value, _, __) =>
              value?.ngayHanSuDung
                ? moment(value?.ngayHanSuDung)?.format("DD/MM/YYYY")
                : "",
          },
          {
            title: (
              <HeaderSearch
                title="Ngày kê"
                sort_key="loNhap.ngayHanSuDung"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["loNhap.ngayHanSuDung"] || 0}
              />
            ),
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "loNhap",
            key: "ngayHanSuDung",
            hideSearch: true,
            render: (value, _, __) =>
              value?.ngayHanSuDung
                ? moment(value?.ngayHanSuDung)?.format("DD/MM/YYYY")
                : "",
          },
          {
            title: (
              <HeaderSearch
                title="Ngày thực hiện"
                sort_key="loNhap.ngayHanSuDung"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["loNhap.ngayHanSuDung"] || 0}
              />
            ),
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "loNhap",
            key: "ngayHanSuDung",
            hideSearch: true,
            render: (value, _, __) =>
              value?.ngayHanSuDung
                ? moment(value?.ngayHanSuDung)?.format("DD/MM/YYYY")
                : "",
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

      {/* <Pagination
        // onChange={onChangePage}
        current={1}
        pageSize={10}
        listData={dsNhapXuatChiTiet}
        total={100}
        // onShowSizeChange={handleSizeChange}
        stylePagination={{ flex: 1, justifyContent: "flex-start" }}
      /> */}
    </Main>
  );
};

export default memo(DanhSachHangHoa);
