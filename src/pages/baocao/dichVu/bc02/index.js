import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * BC02. Báo cáo chi tiết người bệnh đã tiếp đón
 *
 */

const Index = ({
  listAllKhoa = [],
  listAllNhanVien,
  listAllNguonNguoiBenh,
  listDoiTuong = [],

  getListAllKhoa,
  getListAllNhanVien,
  getListAllNguonNguoiBenh,
  getUtils,
  getBc02,
}) => {
  useEffect(() => {
    getListAllKhoa({ page: 0, size: 9999, active: true });
    getListAllNhanVien();

    getListAllNguonNguoiBenh({});
    getUtils({ name: "DoiTuong" });
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              style={{ color: _state.tuNgay ? "" : "red" }}
              className="label-filter"
            >
              Từ ngày
              <span style={{ color: "red" }}>*</span>
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
            <label
              className="label-filter"
              // onClick={() => openInNewTab("/danh-muc/khoa?active=1")}
            >
              Khoa tiếp đón
            </label>
            <Select
              onChange={onChange("khoaTiepDonId")}
              value={_state.khoaTiepDonId}
              className="input-filter"
              placeholder={"Chọn khoa tiếp đón"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
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
              Nguồn người bệnh
            </label>
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              className="label-filter"
            >
              Nhân viên tiếp đón
            </label>
            <Select
              onChange={onChange("nhanVienTiepDonId")}
              value={_state.nhanVienTiepDonId}
              className="input-filter"
              placeholder={"Chọn nhân viên tiếp đón"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllNhanVien || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đối tượng người bệnh</label>
            <Select
              className="input-filter"
              placeholder={"Chọn đối tượng người bệnh"}
              value={_state.doiTuong}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              onChange={onChange("doiTuong")}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    loaiThoiGian: _state.loaiThoiGian,
    khoaTiepDonId: _state.khoaTiepDonId,
    nguonNbId: _state.nguonNbId,
    doiTuong: _state.doiTuong,
    nhanVienTiepDonId: _state.nhanVienTiepDonId,
  });

  return (
    <Main>
      <BaseBaoCao
        title="BC02. Báo cáo chi tiết người bệnh đã tiếp đón"
        renderFilter={renderFilter}
        getBc={getBc02}
        handleDataSearch={handleDataSearch}
        initState={{
          khoaTiepDonId: "",
          nguonNbId: "",
          doiTuong: "",
          nhanVienTiepDonId: "",
        }}
        breadcrumb={[{ title: "Bc02", link: "/bao-cao/bc02" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKhoa: state.khoa.listAllKhoa,
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
    listDoiTuong: state.utils.listDoiTuong || [],
  }),
  ({
    baoCaoDaIn: { getBc02 },
    khoa: { getListAllKhoa },
    nhanVien: { getListAllNhanVien },
    utils: { getUtils },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
  }) => ({
    getBc02,
    getListAllKhoa,
    getListAllNhanVien,
    getListAllNguonNguoiBenh,
    getUtils,
  })
)(Index);
