import { Button, Row, Input, DatePicker } from "antd";
import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect } from "react-redux";
import { openInNewTab } from "utils";

const ThongTinHangHoa = (props) => {
  const {
    getListPhieuNhapChiTiet,
    listPhieuNhapChiTiet,
    phieuNhapXuatId,
    currentItem,
    totalElements,
    page,
    size,
    onSizeChange,
  } = props;

  useEffect(() => {
    if (phieuNhapXuatId) {
      getListPhieuNhapChiTiet({ phieuNhapXuatId });
    }
  }, [phieuNhapXuatId]);

  const onChangePage = (page) => {
    getListPhieuNhapChiTiet({ phieuNhapXuatId, page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onSearchInput = () => { };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          search={
            <Input
              placeholder="Nhập dịch vụ"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.dichVu?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          search={
            <Input
              placeholder="Nhập số hóa đơn"
              onChange={onSearchInput("soLuong")}
            />
          }
        />
      ),
      width: "35px",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: (
        <HeaderSearch
          title="Số lô"
          search={
            <Input
              placeholder="Số lô"
              onChange={onSearchInput("loNhap.soLo")}
            />
          }
        />
      ),
      width: "40px",
      dataIndex: "loNhap",
      key: "loNhap",
      render: (item) => {
        return item?.soLo;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngày sản xuất"
          searchSelect={<DatePicker placeholder="Ngày sản xuất" />}
        />
      ),
      width: "60px",
      dataIndex: "loNhap",
      key: "loNhap",
      render: (item) => {
        return item.ngaySanXuat;
      },
    },
    {
      title: (
        <HeaderSearch
          title="HSD"
          searchSelect={<DatePicker placeholder="Hạn sử dụng" />}
        />
      ),
      width: "35px",
      dataIndex: "loNhap",
      key: "loNhap",
      render: (item) => {
        return item.ngayHanSuDung;
      },
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          search={
            <Input
              placeholder="Nhập quyết định thầu"
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: "30px",
      dataIndex: "",
      key: "",
    },
  ];
  return (
    <Main>
      <Row className="header">
        <div className="header__left">Thông tin phiếu nhập</div>
      </Row>
      <ContentTable>
        <span className="title">Thông tin</span>
        <div className="documentno-info">
          <div className="info-content">
            <div className="custom-col">
              <table>
                <tbody>
                  <tr>
                    <td>Nhà cung cấp:</td>
                    <td className="info">{currentItem?.nhaCungCap?.ten}</td>
                  </tr>
                  <tr>
                    <td
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
                    >Nguồn nhập kho:</td>
                    <td className="info">{currentItem?.nguonNhapKho?.ten}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="custom-col">
              <table>
                <tbody>
                  <tr>
                    <td>Quyết định thầu:</td>
                    <td className="info">{currentItem?.quyetDinhThau?.ten}</td>
                  </tr>
                  <tr>
                    <td>Thành tiền:</td>
                    <td className="info">{currentItem?.thanhTien}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="header-table">
            <span> Thông tin hàng hóa</span>
          </div>
          <TableWrapper columns={columns} dataSource={listPhieuNhapChiTiet} />
        </div>
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nhapKhoChiTiet: {
      listPhieuNhapChiTiet = [],
      phieuNhapXuatId,
      currentItem,
      totalElements,
      page,
      size,
    },
    nhapKho: { listPhieuNhap },
  } = state;
  return {
    listPhieuNhapChiTiet,
    phieuNhapXuatId,
    listPhieuNhap,
    currentItem,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  nhapKhoChiTiet: { getListPhieuNhapChiTiet, onSizeChange },
  nhapKho: { getListPhieuNhap },
}) => ({ getListPhieuNhapChiTiet, getListPhieuNhap, onSizeChange });
export default connect(mapStateToProps, mapDispatchToProps)(ThongTinHangHoa);
