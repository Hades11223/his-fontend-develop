import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { PopoverWrapper, Main, GlobalStyles } from "./styled";
const PopoverHangHoa = ({ content, children, data, ...props }) => {
  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);
  const renderContent = useMemo(() => {
    const item = data || {};
    return (
      <Main>
        <div className="dd-flex fd-col">
          <div className="text text-bold">{`${item?.dichVu?.ma} - ${item?.dichVu?.ten}`}</div>
          <div className="info dd-flex fd-row space-between">
            <div className="_col">
              {item?.loNhap?.xuatXu?.ten && (
                <div className="_row">
                  <span>Xuất xứ: </span>
                  {item?.loNhap?.xuatXu?.ten}
                </div>
              )}
              {item?.loNhap?.nhaSanXuat?.ten && (
                <div className="_row">
                  <span>Nhà sản xuất: </span>
                  {item?.loNhap?.nhaSanXuat?.ten}
                </div>
              )}              
              {item?.loNhap?.soVisa && (
                <div className="_row">
                  <span>Số visa: </span>
                  {item?.loNhap?.soVisa}
                </div>
              )}
              {item?.dichVu?.quyCach && (
                <div className="_row">
                  <span>Quy cách: </span>
                  {item?.dichVu?.quyCach}
                </div>
              )}
              {item?.dichVu?.tenDuongDung && (
                <div className="_row">
                  <span>Đường dùng: </span>
                  {item?.dichVu?.tenDuongDung}
                </div>
              )}
            </div>
            <div className="_col">
              {thongTinPhieu?.quyetDinhThau?.goiThau && (
                <div className="_row">
                  <span>Gói thầu: </span>
                  {thongTinPhieu?.quyetDinhThau?.goiThau}
                </div>
              )}
              {item?.chiTietThau?.soLuongThau && (
                <div className="_row">
                  <span>Số lượng thầu: </span>
                  {item?.chiTietThau?.soLuongThau}
                </div>
              )}
              {item?.chiTietThau?.soLuongConLai && (
                <div className="_row">
                  <span>Số lượng còn lại: </span>
                  {item?.chiTietThau?.soLuongConLai}
                </div>
              )}
              {item?.dichVu?.maHoatChat && (
                <div className="_row">
                  <span>Mã hoạt chất: </span>
                  {item?.dichVu?.maHoatChat}
                </div>
              )}
              {item?.dichVu?.tenHoatChat && (
                <div className="_row">
                  <span>Tên hoạt chất: </span>
                  {item?.dichVu?.tenHoatChat}
                </div>
              )}
              {item?.dichVu?.hamLuong && (
                <div className="_row">
                  <span>Hàm lượng: </span>
                  {item?.dichVu?.hamLuong}
                </div>
              )}
            </div>
          </div>
        </div>
      </Main>
    );
  }, [data]);
  return (
    <>
      <GlobalStyles />
      <PopoverWrapper
        trigger="hover"
        overlayClassName="wide"
        overlayInnerStyle={{ width: "650px" }}
        content={renderContent}
        placement="rightTop"
      >
        {children}
      </PopoverWrapper>
    </>
  );
};

export default PopoverHangHoa;
