import { Tooltip } from "antd";
import IcDelete from "assets/images/kho/delete.png";
import { TableWrapper, InputTimeout, HeaderSearch } from "components";
import useWindowSize from "hook/useWindowSize";
import moment from "moment";
import TableEmpty from "pages/kho/components/TableEmpty";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "utils";
import { Main, WrapperPopup } from "./styled";

const DanhSachNguoiBenh = ({ onFocusSearchHangHoa, isEdit, ...props }) => {
  const { dsNbDvKho } = useSelector((state) => state.nbDvKho);
  const {
    phieuNhapXuat: { onRemoveItem },
    thuocChiTiet: { getDsNb },
  } = useDispatch();

  const size = useWindowSize();

  const onDelete = (item, index) => (e) => {
    onRemoveItem({ item });
  };

  const renderTitlePop = (item) => (
    <WrapperPopup>
      <div className="title-pop">
        {item?.maDichVu} - {item?.tenDichVu}
      </div>
      <div className="pop-content">
        <div className="item-pop">Số lượng khả dụng: {item.soLuongKhaDung}</div>
        <div className="item-pop">Đường dùng: {item.tenDuongDung}</div>
        <div className="item-pop">Số lượng còn lại: {item.soLuongTon}</div>
        <div className="item-pop">Nhà sản xuất: {item.tenNhaSanXuat}</div>
        <div className="item-pop">Hàm lượng: {item.hamLuong}</div>
        <div className="item-pop">Quy cách: {"Không có"}</div>
        <div className="item-pop">Tên hoạt chất: {item.tenHoatChat}</div>
      </div>
    </WrapperPopup>
  );
  return (
    <Main className="main">
      <TableWrapper
        scroll={{ y: 453, x: "auto" }}
        rowKey={"key"}
        columns={[
          {
            title: <HeaderSearch title="STT" />,
            width: size.width <= 1400 ? 50 : 50,
            dataIndex: "index",
            key: "index",
            hideSearch: true,
            align: "center",
            render: (_, __, index) => index + 1,
          },
          {
            title: (
              <HeaderSearch
                title="Mã HS"
                sort_key="maHoSo"
                search={
                  <InputTimeout
                    placeholder="Tìm mã HS"
                    onChange={(maHoSo) => getDsNb({ maHoSo })}
                  />
                }
              />
            ),
            width: 80,
            dataIndex: "maHoSo",
            key: "maHoSo",
            type: true,
            hideSearch: false,
          },
          {
            title: (
              <HeaderSearch
                title="Mã NB"
                sort_key="maNb"
                search={
                  <InputTimeout
                    placeholder="Tìm mã NB"
                    onChange={(maNb) => getDsNb({ maNb })}
                  />
                }
              />
            ),
            width: 80,
            dataIndex: "maNb",
            key: "maNb",
            type: true,
            hideSearch: false,
          },
          {
            title: (
              <HeaderSearch
                title="Tên người bệnh"
                sort_key="tenNb"
                search={
                  <InputTimeout
                    placeholder="Tìm tên người bệnh"
                    onChange={(tenNb) => getDsNb({ tenNb })}
                  />
                }
              />
            ),
            width: 200,
            dataIndex: "tenNb",
            key: "tenNb",
            type: true,
            hideSearch: false,
          },
          {
            title: (
              <HeaderSearch
                title="Tên hàng hóa"
                sort_key="tenDichVu"
                search={
                  <InputTimeout
                    placeholder="Tìm kiếm theo tên hàng hóa"
                    onChange={(tenDichVu) => getDsNb({ tenDichVu })}
                  />
                }
              />
            ),
            width: 120,
            dataIndex: "tenDichVu",
            key: "tenDichVu",
            type: true,
            hideSearch: false,
            render: (value, item, index) => (
              <Tooltip
                overlayInnerStyle={{ width: 400 }}
                overlay={renderTitlePop(item)}
                color={"white"}
              >
                {item?.maDichVu} - {item?.tenDichVu}
              </Tooltip>
            ),
          },
          {
            title: <HeaderSearch title="ĐVT" sort_key="dvt" />,
            width: size.width <= 1400 ? 50 : 50,
            dataIndex: "tenDonViTinh",
            key: "tenDonViTinh",
            hideSearch: true,
          },
          {
            title: <HeaderSearch title="SL kê" sort_key="soLuongYeuCau" />,
            key: "soLuongYeuCau",
            width: size.width <= 1400 ? 70 : 70,
            dataIndex: "soLuongYeuCau",
            hideSearch: true,
            align: "right",
          },
          {
            title: <HeaderSearch title="SL duyệt" sort_key="soLuong" />,
            key: "soLuong",
            width: size.width <= 1400 ? 70 : 70,
            dataIndex: "soLuong",
            hideSearch: true,
            align: "right",
            render: (field, item, index) =>
              field == 0 ? field : formatNumber(field),
          },
          {
            title: <HeaderSearch title="Số lô" sort_key="soLo" />,
            width: size.width <= 1400 ? 80 : 80,
            dataIndex: "soLo",
            key: "soLo",
            hideSearch: true,
            align: "center",
          },
          {
            title: <HeaderSearch title="Hạn sử dụng" sort_key="hanSuDung" />,
            width: size.width <= 1400 ? 90 : 90,
            dataIndex: "ngayHanSuDung",
            key: "ngayHanSuDung",
            hideSearch: true,
            render: (value, _, __) => moment(value)?.format("DD/MM/YYYY"),
          },
          {
            title: (
              <HeaderSearch
                title="Thời gian phát hàng hóa"
                sort_key="hanSuDung"
              />
            ),
            width: size.width <= 1400 ? 120 : 120,
            dataIndex: "thoiGianThucHien",
            key: "thoiGianThucHien",
            hideSearch: true,
            render: (value, _, __) =>
              moment(value)?.format("HH:mm:ss DD/MM/YYYY"),
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
        dataSource={dsNbDvKho}
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
        current={pageNb + 1}
        pageSize={sizeNb}
        listData={dsNbDvKho}
        total={totalElementNb}
        // onShowSizeChange={handleSizeChange}
        stylePagination={{ flex: 1, justifyContent: "flex-start" }}
      /> */}
    </Main>
  );
};

export default memo(DanhSachNguoiBenh);
