import { Input } from "antd";
import IcDelete from "assets/svg/ic-delete.svg";
import IcEye from "assets/svg/ic-eye.svg";
import { TableWrapper, HeaderSearch } from "components";
import useWindowSize from "hook/useWindowSize";
import moment from "moment";
import TableEmpty from "pages/kho/components/TableEmpty";
import React, { memo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Main } from "./styled";
import ModalDanhSachNb from "../ModalDanhSachNb";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";

const DanhSachHangHoa = ({ onFocusSearchHangHoa, isEdit, ...props }) => {
  const { t } = useTranslation();
  const size = useWindowSize();
  const refModalDanhSachNb = useRef();
  const [state, _setState] = useState({ dataSortColumn: {}, listCheckId: [] });
  const { dataSortColumn } = state;
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const dsNbDvKho = useStore("nbDvKho.dsNbDvKho");
  const dsNhapXuatChiTiet = useStore("phieuNhapXuat.dsNhapXuatChiTiet", []);

  const { xoaHangHoaPhieuTra } = useDispatch().phieuNhapXuat;

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  const onDelete = (item, index) => (e) => {
    const selectItem = dsNbDvKho.find((x) => x.maDichVu == item.dichVu?.ma);

    if (selectItem) {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: "Xóa dữ liệu",
            content: `Bạn có chắc chắn xóa ${item.dichVu?.ten}?`,
            cancelText: t("common.quayLai"),
            okText: t("common.dongY"),
            classNameOkText: "button-error",
            showImg: true,
            showBtnOk: true,
          },
          () => {
            xoaHangHoaPhieuTra({
              nbDvKhoTraId: selectItem.id,
              phieuTraKhoChiTietId: item.phieuNhapXuatId,
            }).then(() => {
              props.onRefresh && props.onRefresh();
            });
          }
        );
    }
  };

  const onDetail = () => {
    debugger;
    if (refModalDanhSachNb.current) {
      refModalDanhSachNb.current.show();
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
                title="ĐVT"
                sort_key="donViTinh"
                onClickSort={onClickSort}
                dataSort={dataSortColumn.donViTinh || 0}
              />
            ),
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "tenDonViTinh",
            key: "donViTinh",
            hideSearch: true,
            // render: (item) => item?.tenDonViTinh,
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
          // {
          //   title: (
          //     <HeaderSearch
          //       title="SL duyệt"
          //       sort_key="soLuong"
          //       onClickSort={onClickSort}
          //       dataSort={dataSortColumn.soLuong || 0}
          //     />
          //   ),
          //   key: "soLuong",
          //   width: size.width <= 1400 ? 83 : 83,
          //   dataIndex: "soLuong",
          //   hideSearch: true,
          //   align: "right",
          // },
          {
            title: (
              <HeaderSearch
                title="Số lô"
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
                title="Hạn sử dụng"
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
            title: <HeaderSearch title="Tiện ích" />,
            key: "",
            width: "60px",
            dataIndex: "",
            hideSearch: true,
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
                  {/* <img style={{ cursor: "pointer" }} src={IcDelete} /> */}
                  <IcEye onClick={onDetail} />
                  <IcDelete onClick={onDelete(item, index)} />
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

      {/* <Pagination
        // onChange={onChangePage}
        current={1}
        pageSize={10}
        listData={dsNhapXuatChiTiet}
        total={100}
        // onShowSizeChange={handleSizeChange}
        stylePagination={{ flex: 1, justifyContent: "flex-start" }}
      /> */}

      <ModalDanhSachNb ref={refModalDanhSachNb} />
    </Main>
  );
};

export default memo(DanhSachHangHoa);
