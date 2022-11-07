import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

const Index = ({
  listLoaiThoiGian,
  listAllKhoa,
  listAllPhong,
  listAllNhanVien,
  listdoiTuong,
  listAllNguoiGioiThieu,
  listAllNguonNguoiBenh,
  listhuongDieuTriKham,

  getUtils,
  getListAllKhoa,
  getListAllPhong,
  getListNhanVien,
  getThietLap,
  getListAllNguoiGioiThieu,
  getListAllNguonNguoiBenh,

  getBcDsNbKhamChiTiet,
}) => {
  // useEffect(() => {
  //   if (listPhongThucHien) {
  //     let listKhoaThucHien = listPhongThucHien
  //       ?.filter((x1) => x1.khoaChiDinh)
  //       ?.map((x) => ({ ...x?.khoaChiDinh, phongThucHienId: x?.phong?.id }))
  //       ?.filter(
  //         (x2, index, parent) =>
  //           parent.findIndex((x3) => x3?.id == x2?.id) == index
  //       );
  //     let dsPhong = listPhongThucHien
  //       ?.map((x) => ({ ...x?.phong }))
  //       ?.filter(
  //         (x1, index, parent) =>
  //           parent?.findIndex((x2) => x2?.id == x1?.id) == index
  //       );
  //     setState({
  //       listPhongThucHien: dsPhong,
  //       listKhoaThucHien,
  //       listKhoaThucHienRender: listKhoaThucHien,
  //     });
  //   }
  // }, [listPhongThucHien]);

  // useEffect(() => {
  //   if (state.phongThucHienId) {
  //     let dsKhoaThucHienRender = state.dsKhoaThucHienRender?.filter(
  //       (x) => x?.phongThucHienId == state.phongThucHienId
  //     );
  //     setState({ khoaThucHienId: null, dsKhoaThucHienRender });
  //   }
  // }, [state.phongThucHienId]);
  const getNhanVien = (input) => {
    getListNhanVien({
      page: 0,
      size: 9999,
      active: true,
      "vanBang.ma": input,
    });
  };

  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "doiTuong" });
    getUtils({ name: "huongDieuTriKham" });
    getListAllNguoiGioiThieu({});
    getListAllNguonNguoiBenh({});
    getListAllKhoa({ active: true });
    getListAllPhong({ page: 0, size: 9999, active: true });
    getThietLap({ ma: "BAC_SI" }).then((data) => {
      getNhanVien(data);
    });
  }, []);

  const customChange = (key, onChange) => (e) => {
    if (key === "khoaThucHienId") {
      getListAllPhong({
        page: 0,
        size: 9999,
        active: true,
        khoaId: e,
      });
      onChange("phongThucHienId")();
    }
    onChange(key)(e);
  };

  const handleChange = (key, onChange) => (value) => {
    if (["dsHuongDieuTriKham"].some((item) => item === key)) {
      if (value.length > 0) onChange(key)(value.filter((item) => item));
      else onChange(key)([""]);
    }
  };

  const renderFilter = ({ _state, onChange }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              className="label-filter"
            >
              Theo thời gian
              <span className="icon-required">*</span>
            </label>
            <Select
              onChange={onChange("loaiThoiGian")}
              value={_state.loaiThoiGian}
              className="input-filter"
              placeholder={"Chọn loại thời gian"}
              data={listLoaiThoiGian}
            />
            {!_state.isValidData && !_state.loaiThoiGian && (
              <div className="error">Vui lòng chọn loại thời gian!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label
              className="label-filter"
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
              className="input-filter"
              placeholder={"Chọn phòng thực hiện"}
              data={listAllPhong}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label
              className="label-filter"
              onClick={() =>
                openInNewTab("/danh-muc/nguon-nguoi-benh?active=1&tab=2")
              }
            >
              Nguồn giới thiệu
            </label>
            <Select
              onChange={onChange("nguonNbId")}
              value={_state.nguonNbId}
              className="input-filter"
              placeholder={"Chọn nguồn giới thiệu"}
              data={listAllNguonNguoiBenh}
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
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">Vui lòng chọn thời gian từ ngày!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label
              className="label-filter"
              onClick={() => openInNewTab("/danh-muc/khoa?active=1")}
            >
              Khoa thực hiện
            </label>
            <Select
              onChange={customChange("khoaThucHienId", onChange)}
              value={_state.khoaThucHienId}
              className="input-filter"
              placeholder={"Chọn khoa thực hiện"}
              data={listAllKhoa}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label
              className="label-filter"
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
              className="input-filter"
              placeholder={"Chọn người giới thiệu"}
              data={listAllNguoiGioiThieu}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày
              <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Bác sĩ khám</label>
            <Select
              onChange={onChange("bacSiKhamId")}
              value={_state.bacSiKhamId}
              className="input-filter"
              placeholder={"Chọn bác sĩ khám"}
              data={listAllNhanVien}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đối tượng NB</label>
            <Select
              onChange={onChange("doiTuong")}
              value={_state.doiTuong}
              className="input-filter"
              placeholder={"Chọn đối tượng NB"}
              data={listdoiTuong}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Hướng điều trị khám</label>
            <Select
              onChange={handleChange("dsHuongDieuTriKham", onChange)}
              value={_state.dsHuongDieuTriKham}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn hướng điều trị khám"}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listhuongDieuTriKham || []),
              ]}
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
    bacSiKhamId: _state.bacSiKhamId,
    dsHuongDieuTriKham: _state.dsHuongDieuTriKham,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.loaiThoiGian) {
        message.error("Vui lòng chọn loại thời gian");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="PK01. Danh sách người bệnh khám chi tiết"
        getBc={getBcDsNbKhamChiTiet}
        handleDataSearch={handleDataSearch}
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "PK01", link: "/bao-cao/pk01" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listAllKhoa: state.khoa.listAllMaTenKhoa || [],
    listAllPhong: state.phong.listAllPhong,
    listAllNhanVien: state.nhanVien.listNhanVien,
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
    listAllNguoiGioiThieu: state.nguoiGioiThieu.listAllNguoiGioiThieu || [],
    listdoiTuong: state.utils.listdoiTuong || [],
    listhuongDieuTriKham: state.utils.listhuongDieuTriKham || [],
  }),
  ({
    utils: { getUtils },
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    nhanVien: { getListNhanVien },
    thietLap: { getThietLap },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    nguoiGioiThieu: { getListAllNguoiGioiThieu },

    baoCaoDaIn: { getBcDsNbKhamChiTiet },
  }) => ({
    getUtils,
    getListAllNguonNguoiBenh,
    getListAllNguoiGioiThieu,
    getBcDsNbKhamChiTiet,

    getListAllKhoa,
    getListAllPhong,
    getListNhanVien,
    getThietLap,
  })
)(Index);
