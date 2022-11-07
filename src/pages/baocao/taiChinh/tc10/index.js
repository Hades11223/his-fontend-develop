import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * TC10. Tổng hợp doanh thu TNDN
 *
 */

const YES_NO = [
  { id: true, ten: "Đã thanh toán" },
  { id: false, ten: "Chưa thanh toán" },
];

const TC10 = ({
  listLoaiThoiGian = [],
  listDonGiaKhongBh = [],
  listDoiTuongKcb = [],

  getUtils,
  getTc10,
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DonGiaKhongBh" });
    getUtils({ name: "DoiTuongKcb" });
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
                [20, 40].some((v) => v === ltg.id)
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đối tượng khám chữa bệnh</label>
            <Select
              onChange={onChange("doiTuongKcb")}
              value={_state.doiTuongKcb}
              className="input-filter"
              placeholder={"Chọn đối tượng khám chữa bệnh"}
              data={listDoiTuongKcb}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Trạng thái thanh toán</label>
            <Select
              onChange={onChange("thanhToan")}
              value={_state.thanhToan}
              className="input-filter"
              placeholder={"Chọn trạng thái thanh toán"}
              data={YES_NO}
            />
          </div>
        </Col>

        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
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

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đơn giá không bảo hiểm</label>
            <Select
              className="input-filter"
              placeholder={"Chọn đơn giá không bảo hiểm"}
              data={listDonGiaKhongBh}
              onChange={onChange("donGiaKhongBh")}
              value={_state.donGiaKhongBh}
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
    thanhToan: _state.thanhToan,
    donGiaKhongBh: _state.donGiaKhongBh,
    doiTuongKcb: _state.doiTuongKcb,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC10. Tổng hợp doanh thu TNDN"
        renderFilter={renderFilter}
        getBc={getTc10}
        handleDataSearch={handleDataSearch}
        initState={{
          thanhToan: true,
          tuThoiGian: moment()
            .startOf("M")
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0),
          denThoiGian: moment()
            .endOf("M")
            .set("hour", 23)
            .set("minute", 59)
            .set("second", 59),
        }}
        breadcrumb={[{ title: "TC10", link: "/bao-cao/tc10" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDonGiaKhongBh: state.utils.listDonGiaKhongBh || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
  }),
  ({ utils: { getUtils }, baoCaoDaIn: { getTc10 } }) => ({
    getUtils,
    getTc10,
  })
)(TC10);
