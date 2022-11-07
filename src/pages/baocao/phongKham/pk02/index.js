import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * PK02. Danh sách người bệnh có lịch hẹn khám
 *
 */

const PK02 = ({
  listLoaiThoiGian,
  listDoiTuong,
  listNhanVien,
  listAllKhoa,
  listAllPhong,

  getUtils,
  getListNhanVien,
  getListAllKhoa,
  getListAllPhong,

  getPk02,
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getListNhanVien({ page: 0, size: 9999, active: true, "vanBang.ma": "bs" });
    getListAllKhoa({ active: true });
    getListAllPhong({ page: 0, size: 9999, active: true });
  }, []);

  const customChange = (name, onChange) => (e) => {
    if (name === "khoaThucHienId") {
      getListAllPhong({
        page: 0,
        size: 9999,
        active: true,
        khoaId: e,
      });
      onChange("phongThucHienId")();
    }
    onChange(name)(e);
  };

  const renderFilter = ({ _state, onChange }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
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
                [10, 50].some((v) => v === ltg.id)
              )}
            />
            {!_state.isValidData && !_state.loaiThoiGian && (
              <div className="error">Vui lòng chọn loại thời gian!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Khoa người bệnh</label>
            <Select
              onChange={customChange("khoaThucHienId", onChange)}
              value={_state.khoaThucHienId}
              className="input-filter"
              placeholder={"Chọn khoa người bệnh"}
              data={listAllKhoa}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày
              <span className="icon-required">*</span>
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Bác sĩ khám</label>
            <Select
              onChange={onChange("bacSiKhamId")}
              value={_state.bacSiKhamId}
              className="input-filter"
              placeholder={"Chọn bác sĩ khám"}
              data={[{ id: "", ten: "Tất cả" }, ...(listNhanVien || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Phòng thực hiện</label>
            <Select
              onChange={onChange("phongThucHienId")}
              value={_state.phongThucHienId}
              className="input-filter"
              placeholder={"Chọn phòng thực hiện"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllPhong || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label
              style={{ color: _state.denNgay ? "" : "red" }}
              className="label-filter"
            >
              Đến ngày
              <span style={{ color: "red" }}>*</span>
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
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    loaiThoiGian: _state.loaiThoiGian,
    khoaThucHienId: _state.khoaThucHienId,
    phongThucHienId: _state.phongThucHienId,
    doiTuong: _state.doiTuong,
    bacSiKhamId: _state.bacSiKhamId,
  });

  return (
    <Main>
      <BaseBaoCao
        title="PK02. Danh sách người bệnh có lịch hẹn khám"
        getBc={getPk02}
        handleDataSearch={handleDataSearch}
        renderFilter={renderFilter}
        initState={{
          loaiThoiGian: 10,
          bacSiKhamId: "",
        }}
        breadcrumb={[{ title: "PK02", link: "/bao-cao/pk02" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listNhanVien: state.nhanVien.listNhanVien,
    listAllKhoa: state.khoa.listAllMaTenKhoa || [],
    listAllPhong: state.phong.listAllPhong,
  }),
  ({
    utils: { getUtils },
    nhanVien: { getListNhanVien },
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    baoCaoDaIn: { getPk02 },
  }) => ({
    getUtils,
    getListNhanVien,
    getListAllKhoa,
    getListAllPhong,
    getPk02,
  })
)(PK02);
