import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { DA_THANH_TOAN } from "../../utils";

/**
 * BC01. Báo cáo chi tiết theo người bệnh
 *
 */

const Index = ({
  listLoaiThoiGian,
  listDoiTuong,
  listAllNguoiGioiThieu,
  listAllNguonNguoiBenh,
  listAllKhoa = [],
  listAllPhong,
  listDoiTuongKcb,

  getListAllNguoiGioiThieu,
  getListAllNguonNguoiBenh,
  getListAllPhong,
  getUtils,
  getListAllKhoa,
  getBc01,
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "huongGiay" });
    getUtils({ name: "khoGiay" });
    getUtils({ name: "DinhDangBaoCao" });
    getUtils({ name: "DoiTuongKcb" });
    getListAllPhong({ active: true });
    getListAllNguoiGioiThieu({});
    getListAllNguonNguoiBenh({});
    getListAllKhoa({ page: 0, size: 9999, active: true });
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label pointer">
              Theo thời gian
              <span className="icon-required"> *</span>
            </label>
            <Select
              onChange={onChange("loaiThoiGian")}
              value={_state.loaiThoiGian}
              className="select"
              placeholder={"Chọn loại thời gian"}
              data={listLoaiThoiGian.filter((i) => i.id < 50)}
            />
            {!_state.isValidData && !_state.loaiThoiGian && (
              <div className="error">Vui lòng chọn loại thời gian!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label">Đối tượng người bệnh</label>
            <Select
              className="select"
              placeholder={"Chọn đối tượng người bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              onChange={onChange("doiTuong")}
              value={_state.doiTuong}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label
              className="label pointer"
              onClick={() =>
                openInNewTab(
                  `/danh-muc/phong?active=1&khoaId=${_state.khoaThucHienId}`
                )
              }
            >
              Phòng thực hiện
            </label>
            <Select
              onChange={onChange("phongThucHienId")}
              value={_state.phongThucHienId}
              className="select"
              placeholder={"Chọn phòng thực hiện"}
              data={listAllPhong}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label
              className="label pointer"
              onClick={() =>
                openInNewTab("/danh-muc/nguon-nguoi-benh?active=1&tab=2")
              }
            >
              Nguồn giới thiệu
            </label>
            <Select
              onChange={onChange("nguonNbId")}
              value={_state.nguonNbId}
              className="select"
              placeholder={"Chọn nguồn giới thiệu"}
              data={listAllNguonNguoiBenh}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label pointer">
              Từ ngày
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.tuNgay}
              onChange={onChange("tuNgay")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">Vui lòng chọn thời gian từ ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label">Đối tượng khám chữa bệnh</label>
            <Select
              onChange={onChange("doiTuongKcb")}
              value={_state.doiTuongKcb}
              className="select"
              placeholder={"Đối tượng khám chữa bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuongKcb || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label
              className="label pointer"
              onClick={() => openInNewTab("/danh-muc/khoa?active=1")}
            >
              Khoa thực hiện
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn khoa thực hiện"}
              data={listAllKhoa || []}
              onChange={onChange("khoaThucHienId")}
              value={_state.khoaThucHienId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label
              className="label pointer"
              onClick={() =>
                openInNewTab(
                  `/danh-muc/nguon-nguoi-benh?active=1&tab=1&nguonNbId=${_state.nguonNbId}`
                )
              }
            >
              Người giới thiệu
            </label>
            <Select
              onChange={onChange("nguoiGioiThieuId")}
              value={_state.nguoiGioiThieuId}
              className="select"
              placeholder={"Chọn người giới thiệu"}
              data={listAllNguoiGioiThieu}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label">
              Đến ngày
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().endOf("day") }}
              value={_state.denNgay}
              onChange={onChange("denNgay")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6} offset={12}>
          <div className="item-select">
            <label className="label">Trạng thái thanh toán</label>
            <Select
              onChange={onChange("thanhToan")}
              defaultValue={null}
              className="select"
              // placeholder={"Chọn trạng thái thanh toán"}
              data={DA_THANH_TOAN}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    nguonNbId: _state.nguonNbId,
    nguoiGioiThieuId: _state.nguoiGioiThieuId,
    khoaThucHienId: _state.khoaThucHienId,
    phongThucHienId: _state.phongThucHienId,
    doiTuong: _state.doiTuong,
    doiTuongKcb: _state.doiTuongKcb,
    thanhToan: _state.thanhToan,
  });

  return (
    <BaseBaoCao
      title="BC01. Báo cáo chi tiết theo người bệnh"
      renderFilter={renderFilter}
      getBc={getBc01}
      handleDataSearch={handleDataSearch}
      initState={{
        loaiThoiGian: 20,
      }}
      breadcrumb={[{ title: "Bc01", link: "/bao-cao/bc01" }]}
    />
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listhuongGiay: state.utils.listhuongGiay || [],
    listkhoGiay: state.utils.listkhoGiay || [],
    listDinhDangBaoCao: state.utils.listDinhDangBaoCao || [],
    listAllPhong: state.phong.listAllPhong || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
    listAllNguoiGioiThieu: state.nguoiGioiThieu.listAllNguoiGioiThieu || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
    listAllKhoa: state.khoa.listAllKhoa,
  }),
  ({
    utils: { getUtils },
    phong: { getListAllPhong },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    nguoiGioiThieu: { getListAllNguoiGioiThieu },
    khoa: { getListAllKhoa },
    baoCaoDaIn: { getBc01 },
  }) => ({
    getUtils,
    getListAllPhong,
    getListAllNguonNguoiBenh,
    getListAllNguoiGioiThieu,
    getListAllKhoa,
    getBc01,
  })
)(Index);
