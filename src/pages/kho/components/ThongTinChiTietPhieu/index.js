import { Row, Input, DatePicker, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Main, ContentTable } from "./styled";
import { connect } from "react-redux";
import Select from "components/Select";

const ThongTinChiTietPhieu = (props) => {
  const {
    getListPhieuNhapChiTiet,
    phieuNhapXuatId,
    currentItem,
    listNhaSanXuat,
    listNguonNhapKho,
    listAllQuyetDinhThau,
    listHinhThucNhapXuat,
  } = props;
  const dateFormat = "hh:MM YYYY/MM/DD";

  const [state, _setState] = useState({
    nhaCungCapId: null,
    soHoaDon: null,
    ngayHoaDon: null,
    thoiGianDuyet: null,
    hinhThucNhapXuatId: null,
    quyetDinhThauId: null,
    soHopDong: null,
    nguonNhapKhoId: null,
    tienChietKhau: 0,
    vat: 0,
    thanhTien: 0,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (phieuNhapXuatId) {
      getListPhieuNhapChiTiet({ phieuNhapXuatId });
    }
  }, [phieuNhapXuatId]);

  const onChange = (key) => (value) => {
    setState({ [key]: value });
  };
  useEffect(() => {
    setState({
      nhaCungCapId: currentItem?.nhaCungCapId,
      soHoaDon: currentItem?.soHoaDon,
      ngayHoaDon: currentItem?.ngayHoaDon,
      thoiGianDuyet: currentItem?.thoiGianDuyet,
      hinhThucNhapXuatId: currentItem?.hinhThucNhapXuatId,
      quyetDinhThauId: currentItem?.quyetDinhThauId,
      soHopDong: currentItem?.soHopDong,
      nguonNhapKhoId: currentItem?.nguonNhapKhoId,
      tienChietKhau: currentItem?.tienChietKhau,
      vat: currentItem?.vat,
      thanhTien: currentItem?.thanhTien,
    });
  }, [currentItem]);
  return (
    <Main>

      <ContentTable>
        <span className="title">Thông tin</span>
        <Row className="row-name">
          <Col span={8}>
            <Row>
              <label>Nhà cung cấp:</label>
              <Select
                value={state.nhaCungCapId}
                style={{ width: "100%" }}
                data={listNhaSanXuat}
                onChange={onChange("nhaCungCapId")}
              />
            </Row>
            <Row>
              <Col span={5}>
                <label>Số hóa đơn:</label>
                <Input value={state.soHoaDon}></Input>{" "}
              </Col>
              <Col span={9}>
                <label>Ngày hóa đơn:</label>
                <DatePicker
                  format={dateFormat}
                  value={state.ngayHoaDon}
                  placeholder="Ngày hóa đơn"
                  onChange={onChange("ngayHoaDon")}
                ></DatePicker>
              </Col>
              <Col span={10}>
                <label>Ngày duyệt:</label>
                <DatePicker
                  format={dateFormat}
                  value={state.thoiGianDuyet}
                  placeholder="Ngày duyệt"
                  onChange={onChange("thoiGianDuyet")}
                ></DatePicker>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={9}>
                <label>Hình thức nhập:</label>
                <Select
                  value={state.hinhThucNhapXuatId}
                  style={{ width: "100%" }}
                  data={listHinhThucNhapXuat}
                  onChange={onChange("hinhThucNhapXuatId")}
                />
              </Col>
              <Col span={9}>
                <label>Quyết định thầu:</label>
                <Select
                  value={state.quyetDinhThauId}
                  style={{ width: "100%" }}
                  data={listAllQuyetDinhThau}
                  onChange={onChange("quyetDinhThauId")}
                />
              </Col>
              <Col span={6}>
                <label>Số hợp đồng:</label>
                <Input
                  value={state.soHopDong}
                  onChange={onChange("soHopDong")}
                ></Input>
              </Col>
            </Row>
            <Row>
              <label>Nguồn nhâp kho:</label>
              <Select
                value={state.nguonNhapKhoId}
                style={{ width: 440 }}
                data={listNguonNhapKho}
                onChange={onChange("nguonNhapKhoId")}
              />
            </Row>
          </Col>
          <Col span={3}>
            <label> Ghi chú</label>
            <Input style={{ height: 100 }}></Input>
          </Col>
          <Col span={2}>
            <label> Tiền chiết khấu</label>
            <span>
              {" "}
              {state.tienChietKhau ? state.tienChietKhau.formatPrice() : 0}{" "}
            </span>
            <label>VAT</label>
            <Input value={state.vat}></Input>
          </Col>
          <Col span={3}>
            <label> Thành tiền</label>
            <span style={{ color: "red" }}>
              {" "}
              {state.thanhTien ? state.thanhTien.formatPrice() : 0}{" "}
            </span>
            <label> Thành tiền sửa đổi</label>
            <span style={{ color: "red" }}> 0 </span>
          </Col>
        </Row>
      </ContentTable>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nhapKhoChiTiet: { listPhieuNhapChiTiet = [], phieuNhapXuatId, currentItem },
    nhapKho: { listPhieuNhap },
    nhaSanXuat: { listNhaSanXuat },
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
    hinhThucNhapXuat: { listHinhThucNhapXuat },
  } = state;
  return {
    listPhieuNhapChiTiet,
    phieuNhapXuatId,
    listPhieuNhap,
    currentItem,
    listNhaSanXuat,
    listAllQuyetDinhThau,
    listNguonNhapKho,
    listHinhThucNhapXuat,
  };
};
const mapDispatchToProps = ({
  nhapKhoChiTiet: { getListPhieuNhapChiTiet },
  nhapKho: { getListPhieuNhap },
  
}) => ({
  getListPhieuNhapChiTiet,
  getListPhieuNhap,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongTinChiTietPhieu);
