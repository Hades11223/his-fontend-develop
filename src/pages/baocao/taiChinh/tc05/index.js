import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * TC05. Báo cáo thu tiền theo bác sĩ khám
 *
 */

const Index = ({
  listAllKhoa = [],
  listAllPhong = [],
  listDoiTuong,
  listAllNguonNguoiBenh,
  listNhanVien,

  getListAllKhoa,
  getListAllPhong,
  getUtils,
  getListAllNguonNguoiBenh,
  getListNhanVien,
  getTc05,

  getThietLap,
}) => {
  const listAllNhanVien = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(listNhanVien || []).map((item) => ({
        ...item,
        ten: `${item.taiKhoan || ""}_${item.ma}_${item.ten}`,
      })),
    ];
  }, [listNhanVien]);

  const getNhanVien = (input) => {
    getListNhanVien({
      page: 0,
      size: 9999,
      active: true,
      "vanBang.ma": input,
    });
  };
  useEffect(() => {
    getUtils({ name: "DoiTuong" });
    getThietLap({ ma: "BAC_SI" }).then((data) => {
      getNhanVien(data);
    });
    getListAllKhoa({ page: 0, size: 9999, active: true });
    getListAllPhong({ page: 0, size: 9999, active: true });
    getListAllNguonNguoiBenh({});
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              style={{ color: _state.tuThoiGian ? "" : "red" }}
              className="label-filter"
            >
              Từ ngày
              <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              showTime
              value={_state.tuThoiGian}
              onChange={onChange("tuThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
            {!_state.isValidData && !_state.tuThoiGian && (
              <div className="error">Vui lòng chọn thời gian từ ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Khoa thực hiện</label>
            <Select
              className="input-filter"
              placeholder={"Chọn khoa thực hiện"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
              onChange={customChange("khoaThucHienId", onChange)}
              value={_state.khoaThucHienId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
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
        <Col md={6} xl={6} xxl={6}>
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              style={{ color: _state.denThoiGian ? "" : "red" }}
              className="label-filter"
            >
              Đến ngày
              <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              showTime
              value={_state.denThoiGian}
              onChange={onChange("denThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
            {!_state.isValidData && !_state.denThoiGian && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Nguồn người bệnh</label>
            <Select
              onChange={onChange("nguonNbId")}
              value={_state.nguonNbId}
              className="input-filter"
              placeholder={"Chọn nguồn người bệnh"}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllNguonNguoiBenh || []),
              ]}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuThoiGian: moment(_state.tuThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    khoaThucHienId: _state.khoaThucHienId,
    doiTuong: _state.doiTuong,
    bacSiKhamId: _state.bacSiKhamId,
    phongThucHienId: _state.phongThucHienId,
    nguonNbId: _state.nguonNbId,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC05. Báo cáo thu tiền theo bác sĩ khám"
        getBc={getTc05}
        handleDataSearch={handleDataSearch}
        renderFilter={renderFilter}
        initState={{
          khoaThucHienId: "",
          nguonNbId: "",
          doiTuong: "",
          bacSiKhamId: "",
          tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
          denThoiGian: moment()
            .set("hour", 23)
            .set("minute", 59)
            .set("second", 59),
        }}
        breadcrumb={[{ title: "TC05", link: "/bao-cao/tc05" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listDoiTuong: state.utils.listDoiTuong || [],
    listNhanVien: state.nhanVien.listNhanVien,
    listAllKhoa: state.khoa.listAllKhoa,
    listAllPhong: state.phong.listAllPhong,
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
  }),
  ({
    utils: { getUtils },
    nhanVien: { getListNhanVienTongHop: getListNhanVien },
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    baoCaoDaIn: { getTc05 },
    thietLap: { getThietLap },
  }) => ({
    getListAllKhoa,
    getListAllPhong,
    getUtils,
    getListAllNguonNguoiBenh,
    getListNhanVien,
    getTc05,

    getThietLap,
  })
)(Index);
