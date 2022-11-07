import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * PK03. Danh sách người bệnh bảo hiểm y tế
 *
 */

const YES_NO = [
  { id: null, ten: "Tất cả" },
  { id: true, ten: "Đã thanh toán" },
  { id: false, ten: "Chưa thanh toán" },
];

const listtrangThaiDichVu = [
  { id: "", value: "", ten: "Tất cả" },
  { id: 1, value: [20, 30, 40], ten: "Chờ khám" },
  { id: 2, value: [60], ten: "Đang khám" },
  { id: 3, value: [70], ten: "Đang thực hiện DV" },
  { id: 4, value: [100, 110, 120], ten: "Chờ kết luận" },
  { id: 5, value: [140], ten: "Đang kết luận" },
  { id: 6, value: [150], ten: "Đã kết luận" },
  { id: 7, value: [50, 130], ten: "Bỏ qua" },
];

const PK03 = ({
  listLoaiThoiGian,
  listDoiTuongKcb,
  // listtrangThaiDichVu,

  getUtils,
  getPk03,
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuongKcb" });
    getUtils({ name: "trangThaiDichVu" });
  }, []);

  const customChange = (name, onChange) => (e) => {
    if (name === "loaiThoiGian" && e === 40) {
      onChange(name)(e);
      onChange("thanhToan")(true);
    }
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
              onChange={customChange("loaiThoiGian", onChange)}
              value={_state.loaiThoiGian}
              className="input-filter"
              placeholder={"Chọn loại thời gian"}
              data={listLoaiThoiGian.filter((ltg) =>
                [10, 40, 70].some((v) => v === ltg.id)
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
          <div className="item-date">
            <label className="label-filter">
              Đến ngày
              <span className="icon-required">*</span>
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
            <label className="label-filter">Đối tượng khám chữa bệnh</label>
            <Select
              onChange={onChange("doiTuongKcb")}
              value={_state.doiTuongKcb}
              className="input-filter"
              placeholder={"Đối tượng khám chữa bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuongKcb || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Trạng thái thanh toán</label>
            <Select
              className="input-filter"
              placeholder={"Chọn trạng thái thanh toán"}
              onChange={onChange("thanhToan")}
              data={YES_NO}
              value={_state.thanhToan}
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
    thanhToan: _state.thanhToan,
    doiTuongKcb: _state.doiTuongKcb,
  });

  return (
    <Main>
      <BaseBaoCao
        title="PK03. Danh sách người bệnh bảo hiểm y tế"
        getBc={getPk03}
        handleDataSearch={handleDataSearch}
        renderFilter={renderFilter}
        initState={{
          loaiThoiGian: 10,
          doiTuongKcb: "",
          thanhToan: null,
        }}
        breadcrumb={[{ title: "PK03", link: "/bao-cao/pk03" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
    listtrangThaiDichVu: state.utils.listtrangThaiDichVu || [],
  }),
  ({ utils: { getUtils }, baoCaoDaIn: { getPk03 } }) => ({
    getUtils,
    getPk03,
  })
)(PK03);
