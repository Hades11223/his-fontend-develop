import { Checkbox, Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { LOAI_PHIEU_THU } from "pages/baocao/utils";
import { Main } from "./styled";

/**
 * Báo cáo tài chính: TC03. Báo cáo sử dụng hóa đơn
 *
 */

const TC03 = ({
  listLoaiThoiGian,
  listDoiTuong,
  listDoiTuongKcb,

  getUtils,
  getTc03,
  ...props
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "DoiTuongKcb" });
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
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
                [40, 60].some((v) => v === ltg.id)
              )}
            />
            {!_state.isValidData && !_state.loaiThoiGian && (
              <div className="error">Vui lòng chọn loại thời gian!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
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
        <Col md={6} xl={6} xxl={6}>
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Đối tượng người bệnh</label>
            <Select
              className="input-filter"
              placeholder={"Chọn đối tượng người bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              value={_state.doiTuong}
              onChange={onChange("doiTuong")}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Đối tượng khám chữa bệnh</label>
            <Select
              onChange={onChange("doiTuongKcb")}
              value={_state.doiTuongKcb}
              className="input-filter"
              placeholder={"Chọn đối tượng khám chữa bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuongKcb || [])]}
            />
          </div>
        </Col>
        <Col offset={18} span={6}>
          <Checkbox
            value={_state.khongTachSoHdTrong}
            onChange={onChange("khongTachSoHdTrong")}
          >
            Gộp dải hóa đơn
          </Checkbox>
        </Col>
        <Col md={6} xl={6} xxl={6}>
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
    loaiThoiGian: _state.loaiThoiGian,
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    doiTuong: _state.doiTuong,
    doiTuongKcb: _state.doiTuongKcb,
    khongTachSoHdTrong: _state.khongTachSoHdTrong,
    nhaThuoc: _state.nhaThuoc,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC03. Báo cáo sử dụng hóa đơn"
        renderFilter={renderFilter}
        getBc={getTc03}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 60,
          nhaThuoc: false,
        }}
        breadcrumb={[{ title: "TC03", link: "/bao-cao/tc03" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
  }),
  ({ utils: { getUtils }, baoCaoDaIn: { getTc03 } }) => ({
    getUtils,
    getTc03,
  })
)(TC03);
