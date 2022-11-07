import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * BC07. Báo cáo chấm công thực hiện dịch vụ yêu cầu
 *
 */

const Index = ({
  listLoaiThoiGian = [],
  listDoiTuong = [],
  listAllKhoa = [],
  listAllNhomDichVuCap3 = [],

  getUtils,
  getListAllKhoa,
  getAllDichVuCap3,
  getBc07,
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getListAllKhoa({ page: "", size: "", active: true });
    getAllDichVuCap3({ page: 0 });
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Theo thời gian
              <span className="icon-required"> *</span>
            </label>
            <Select
              onChange={onChange("loaiThoiGian")}
              value={_state.loaiThoiGian}
              className="input-filter select"
              placeholder={"Chọn loại thời gian"}
              data={listLoaiThoiGian.filter((ltg) =>
                [20, 30, 40].some((v) => v === ltg.id)
              )}
            />
            {!_state.isValidData && !_state.loaiThoiGian && (
              <div className="error">Vui lòng chọn loại thời gian!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đối tượng</label>
            <Select
              className="input-filter"
              placeholder={"Chọn đối tượng"}
              value={_state.doiTuong}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              onChange={onChange("doiTuong")}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Khoa chỉ định</label>
            <Select
              onChange={onChange("dsKhoaChiDinhId", true)}
              value={_state.dsKhoaChiDinhId}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn khoa chỉ định"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Thời gian xuất báo cáo
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              value={_state.denNgay}
              onChange={onChange("denNgay")}
              placeholder="Chọn ngày"
              picker="month"
              format="MM/YYYY"
              className="input-filter"
              dropdownClassName="ant-picker-month-panel-nowrap"
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Theo dịch vụ</label>
            <Select
              onChange={onChange("dsNhomDichVuCap3Id", true)}
              value={_state.dsNhomDichVuCap3Id}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn dịch vụ"}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllNhomDichVuCap3 || []),
              ]}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuThoiGian: moment(_state.denNgay)
      .startOf("M")
      .format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay)
      .endOf("M")
      .format("DD-MM-YYYY HH:mm:ss"),
    doiTuong: _state.doiTuong,
    dsKhoaChiDinhId: _state.dsKhoaChiDinhId,
    dsNhomDichVuCap3Id: _state.dsNhomDichVuCap3Id,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.loaiThoiGian) {
        message.error("Vui lòng chọn theo thời gian");
        return false;
      }
      if (!_state.doiTuong) {
        message.error("Vui lòng chọn đối tượng");
        return false;
      }
      if (!_state.denNgay) {
        message.error("Vui lòng chọn Thời gian xuất báo cáo");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="BC07. Báo cáo chấm công thực hiện dịch vụ yêu cầu"
        renderFilter={renderFilter}
        getBc={getBc07}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 30,
          doiTuong: [""],
          dsKhoaChiDinhId: [""],
          dsNhomDichVuCap3Id: [""],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "Bc07", link: "/bao-cao/bc07" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listAllKhoa: state.khoa.listAllKhoa || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listAllNhomDichVuCap3: state.nhomDichVuCap3.listAllNhomDichVuCap3 || [],
  }),
  ({
    baoCaoDaIn: { getBc07 },
    utils: { getUtils },
    khoa: { getListAllKhoa },
    nhomDichVuCap3: { getAllDichVuCap3 },
  }) => ({
    getBc07,
    getUtils,
    getListAllKhoa,
    getAllDichVuCap3,
  })
)(Index);
