import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * BC03. Thống kê số lượng người bệnh theo loại dịch vụ
 *
 */

const Index = ({
  listLoaiThoiGian = [],
  listloaiDichVu = [],
  listAllKhoa = [],
  listDoiTuong,
  listAllDichVu,

  getAllTongHopDichVuCap1,
  getListAllKhoa,
  getUtils,
  getAllDichVu,
  getBc03,
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getAllTongHopDichVuCap1({ active: true });
    getUtils({ name: "DoiTuong" });
    getListAllKhoa({ page: 0, size: 9999, active: true });
    getAllDichVu({ active: true });
  }, []);

  const handleChange = (key, onChange, _state) => (value) => {
    if (
      ["dsNhomDichVuCap1Id", "dsDichVuId", "dsKhoaChiDinhId"].some(
        (item) => item === key
      )
    ) {
      let newValue = [];
      const newBool = JSON.stringify(value);
      const oldBool = JSON.stringify(_state[key]);
      if (newBool.indexOf('""') !== -1 && oldBool.indexOf('""') === -1) {
        newValue = [""];
      } else if (value.length > 1) newValue = value.filter((item) => item);
      else newValue = value;

      onChange(key)(newValue);
      if (key === "dsNhomDichVuCap1Id") {
        getAllDichVu({ active: true, dsNhomDichVuCap1Id: newValue });
        onChange("dsDichVuId")([""]);
      }
    }
  };

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
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              className="label-filter"
            >
              Từ ngày
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày
              <span className="icon-required"> *</span>
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
              data={[{ id: "", ten: "Tất cả" }, ...(listloaiDichVu || [])]}
              onChange={handleChange("dsNhomDichVuCap1Id", onChange, _state)}
            />
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
              onChange={handleChange("dsKhoaChiDinhId", onChange, _state)}
              value={_state.dsKhoaChiDinhId}
              mode="multiple"
              className="input-filter"
              placeholder={"Chọn khoa chỉ định"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Tên Dịch Vụ</label>
            <Select
              onChange={handleChange("dsDichVuId", onChange, _state)}
              value={_state.dsDichVuId}
              className="input-filter"
              placeholder={"Chọn dịch vụ"}
              mode="multiple"
              data={[{ id: "", ten: "Tất cả" }, ...(listAllDichVu || [])]}
            />
          </div>
        </Col>
        <Col md={16} xl={16} xxl={16}>
          <div className="item-checkbox">
            <Checkbox
              className="label-filter checkbox-header"
              checked={_state.dvKhamChiDinhKham}
              onChange={onChange("dvKhamChiDinhKham")}
            >
              Chỉ hiển thị dịch vụ khám và các dịch vụ chỉ định từ khám bệnh
            </Checkbox>
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuThoiGian: moment(_state.tuThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    dsNhomDichVuCap1Id: _state.dsNhomDichVuCap1Id,
    doiTuong: _state.doiTuong,
    dsKhoaChiDinhId: _state.dsKhoaChiDinhId,
    dsDichVuId: _state.dsDichVuId,
    dvKhamChiDinhKham: _state.dvKhamChiDinhKham ? true : undefined,
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
        title="BC03. Thống kê số lượng người bệnh theo loại dịch vụ"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getBc03}
        handleDataSearch={handleDataSearch}
        initState={{
          dvKhamChiDinhKham: true,
          loaiThoiGian: 30,
          dsNhomDichVuCap1Id: [""],
          doiTuong: "",
          dsKhoaChiDinhId: [""],
          dsDichVuId: [""],
          tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
          denThoiGian: moment()
            .set("hour", 23)
            .set("minute", 59)
            .set("second", 59),
        }}
        breadcrumb={[{ title: "Bc03", link: "/bao-cao/bc03" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian,
    listloaiDichVu: state.nhomDichVuCap1.listAllNhomDichVuCap1,
    listAllKhoa: state.khoa.listAllKhoa,
    listDoiTuong: state.utils.listDoiTuong || [],
    listAllDichVu: state.dichVu.listAllDichVu || [],
  }),
  ({
    baoCaoDaIn: { getBc03 },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    khoa: { getListAllKhoa },
    utils: { getUtils },
    dichVu: { getAllDichVu },
  }) => ({
    getBc03,
    getAllTongHopDichVuCap1,
    getListAllKhoa,
    getUtils,
    getAllDichVu,
  })
)(Index);
