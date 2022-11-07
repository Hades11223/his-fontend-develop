import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { LOAI_PHIEU_THU } from "pages/baocao/utils";
import { Main } from "./styled";

/**
 * TC09. Báo cáo thu tiền theo loại tiền
 *
 */

const TC09 = ({
  listAllKhoa = [],
  listdoiTuong,
  listAllNguonNguoiBenh,

  getUtils,
  getListAllKhoa,
  getListAllNguonNguoiBenh,
  getTc09,
}) => {
  useEffect(() => {
    getListAllKhoa({ page: 0, size: 9999, active: true });
    getUtils({ name: "doiTuong" });
    getListAllNguonNguoiBenh({});
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
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
          <div className="item-date">
            <label className="label-filter">
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
        <Col md={8} xl={8} xxl={8}></Col>

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Khoa thực hiện</label>
            <Select
              className="input-filter"
              placeholder={"Chọn khoa thực hiện"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
              onChange={onChange("khoaThucHienId")}
              value={_state.khoaThucHienId}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đối tượng người bệnh</label>
            <Select
              onChange={onChange("doiTuong")}
              value={_state.doiTuong}
              className="input-filter"
              placeholder={"Chọn đối tượng NB"}
              data={
                listdoiTuong?.length === 0
                  ? []
                  : [{ id: "", ten: "Tất cả" }, ...listdoiTuong]
              }
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
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
        <Col md={8} xl={8} xxl={8}>
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
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    khoaThucHienId: _state.khoaThucHienId,
    doiTuong: _state.doiTuong,
    nguonNbId: _state.nguonNbId,
    nhaThuoc: _state.nhaThuoc,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC09. Báo cáo thu tiền theo loại tiền"
        renderFilter={renderFilter}
        getBc={getTc09}
        handleDataSearch={handleDataSearch}
        initState={{
          doiTuong: "",
          khoaThucHienId: "",
          nguonNbId: "",
          nhaThuoc: false,
        }}
        breadcrumb={[{ title: "TC09", link: "/bao-cao/tc09" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKhoa: state.khoa.listAllKhoa,
    listdoiTuong: state.utils.listdoiTuong || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
  }),
  ({
    utils: { getUtils },
    khoa: { getListAllKhoa },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    baoCaoDaIn: { getTc09 },
  }) => ({
    getUtils,
    getListAllKhoa,
    getListAllNguonNguoiBenh,
    getTc09,
  })
)(TC09);
