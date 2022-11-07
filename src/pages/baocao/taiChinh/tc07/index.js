import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { LOAI_PHIEU_THU } from "pages/baocao/utils";
import { Main } from "./styled";
import { YES_NO } from "../../utils";

/**
 * TC07. Báo cáo thu tiền dịch vụ ngoại trú
 *
 */

const Index = ({
  listLoaiThoiGian,
  listDoiTuong,

  getListAllKhoa,
  getListAllPhong,
  getUtils,
  getListAllNguonNguoiBenh,
  getListNhanVienTongHop,
  getTc07,

  getThietLap,
}) => {
  const getNhanVien = (input) => {
    getListNhanVienTongHop({
      page: 0,
      size: 9999,
      active: true,
      "vanBang.ma": input,
    });
  };
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getThietLap({ ma: "BAC_SI" }).then((data) => {
      getNhanVien(data);
    });
    getListAllKhoa({ page: 0, size: 9999, active: true });
    getListAllPhong({ page: 0, size: 9999, active: true });
    getListAllNguonNguoiBenh({});
  }, []);

  const renderFilter = ({ _state, onChange }) => {
    return (
      <Row>
        {/* <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              style={{ color: _state.thoiGianXuatBaoCao ? "" : "red" }}
              className="label-filter"
            >
              Thời gian xuất báo cáo
              <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              getPopupContainer={trigger => trigger.parentNode}
              className="global-tc07"
              picker="month"
              showTime
              value={_state.thoiGianXuatBaoCao}
              onChange={onChange("thoiGianXuatBaoCao")}
              placeholder="Chọn tháng"
              format="MM/YYYY"
              className="input-filter"
            />
            {!_state.isValidData && !_state.thoiGianXuatBaoCao && (
              <div className="error">Vui lòng chọn thời gian xuất báo cáo!</div>
            )}
          </div>
        </Col> */}

        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              Theo thời gian
              <span className="icon-required">*</span>
            </label>
            <Select
              onChange={onChange("loaiThoiGian")}
              value={_state.loaiThoiGian}
              className="input-filter"
              placeholder={"Chọn loại thời gian"}
              data={listLoaiThoiGian.filter((ltg) =>
                [20, 30, 40, 60].some((v) => v === ltg.id)
              )}
            />
            {!_state.isValidData && !_state.loaiThoiGian && (
              <div className="error">Vui lòng chọn loại thời gian!</div>
            )}
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              className="label-filter"
            >
              Từ ngày
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.tuNgay}
              onChange={onChange("tuNgay")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">Vui lòng chọn thời gian từ ngày!</div>
            )}
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Đối tượng người bệnh</label>
            <Select
              className="input-filter"
              placeholder={"Chọn đối tượng người bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              onChange={onChange("doiTuong")}
              value={_state.doiTuong}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().endOf("day") }}
              value={_state.denNgay}
              onChange={onChange("denNgay")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Loại phiếu thu</label>
            <Select
              onChange={onChange("nhaThuoc")}
              value={_state.nhaThuoc}
              className="input-filter"
              placeholder={"Chọn loại phiếu thu"}
              data={LOAI_PHIEU_THU}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Theo yêu cầu</label>
            <Select
              onChange={onChange("theoYeuCau")}
              value={_state.theoYeuCau}
              className="input-filter"
              placeholder={"Chọn yêu cầu"}
              data={YES_NO}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    // thoiGianPhatHanhHd: moment(_state.thoiGianXuatBaoCao)
    //   .set("date", 1)
    //   .format("DD-MM-YYYY"),

    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    doiTuong: _state.doiTuong,
    nhaThuoc: _state.nhaThuoc,
    theoYeuCau: _state.theoYeuCau,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC07. Báo cáo thu tiền dịch vụ ngoại trú"
        getBc={getTc07}
        handleDataSearch={handleDataSearch}
        renderFilter={renderFilter}
        initState={{
          loaiThoiGian: 60,
          doiTuong: "",
          theoYeuCau: "",
          thoiGianXuatBaoCao: moment()
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0),
          nhaThuoc: false,
        }}
        breadcrumb={[{ title: "TC07", link: "/bao-cao/tc07" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listNhanVien: state.nhanVien.listNhanVien,
    listAllKhoa: state.khoa.listAllKhoa,
    listAllPhong: state.phong.listAllPhong,
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
  }),
  ({
    utils: { getUtils },
    nhanVien: { getListNhanVienTongHop },
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    baoCaoDaIn: { getTc07 },
    thietLap: { getThietLap },
  }) => ({
    getListAllKhoa,
    getListAllPhong,
    getUtils,
    getListAllNguonNguoiBenh,
    getListNhanVienTongHop,
    getTc07,

    getThietLap,
  })
)(Index);
