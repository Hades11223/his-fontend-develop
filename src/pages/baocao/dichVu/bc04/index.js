import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * BC04. Thống kê số lượng dịch vụ theo đối tượng
 *
 */

const Index = ({
  listLoaiThoiGian = [],
  listloaiDichVu = [],
  listAllNguonNguoiBenh,

  getAllTongHopDichVuCap1,
  getUtils,
  getBc04,
  getListAllNguonNguoiBenh,
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getAllTongHopDichVuCap1({ active: true });
    getListAllNguonNguoiBenh({ active: true });
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
          <div className="item-date">
            <label className="label-filter">
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
        <Col md={8} xl={8} xxl={8}>
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

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Loại dịch vụ
              <span className="icon-required"> *</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn loại dịch vụ"}
              mode="multiple"
              value={_state.dsNhomDichVuCap1Id}
              data={
                listloaiDichVu.length === 0
                  ? []
                  : [{ id: "", ten: "Tất cả" }, ...(listloaiDichVu || [])]
              }
              onChange={onChange("dsNhomDichVuCap1Id", true)}
            />
          </div>
        </Col>

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Nguồn người bệnh</label>
            <Select
              onChange={onChange("dsNguonNbId", true)}
              mode="multiple"
              value={_state.dsNguonNbId}
              className="input-filter"
              placeholder={"Chọn nguồn người bệnh"}
              data={[
                {
                  id: "",
                  ten: "Tất cả",
                },
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
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    dsNhomDichVuCap1Id: _state.dsNhomDichVuCap1Id,
    dsNguonNbId:
      _state.dsNguonNbId && _state.dsNguonNbId[0] === ""
        ? [(listAllNguonNguoiBenh || []).map((x) => x.id).join(",")]
        : _state.dsNguonNbId,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.loaiThoiGian) {
        message.error("Vui lòng chọn loại thời gian");
        return false;
      }
      if (_state.dsNhomDichVuCap1Id?.length === 0) {
        message.error("Vui lòng chọn loại dịch vụ");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="BC04. Thống kê số lượng dịch vụ theo đối tượng"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getBc04}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 30,
          dsNhomDichVuCap1Id: [""],
          dsNguonNbId: [""],
        }}
        breadcrumb={[{ title: "Bc04", link: "/bao-cao/bc04" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian,
    listloaiDichVu: state.nhomDichVuCap1.listAllNhomDichVuCap1 || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
  }),
  ({
    baoCaoDaIn: { getBc04 },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    utils: { getUtils },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
  }) => ({
    getBc04,
    getAllTongHopDichVuCap1,
    getUtils,
    getListAllNguonNguoiBenh,
  })
)(Index);
