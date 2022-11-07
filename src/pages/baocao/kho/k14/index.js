import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import { useStore } from "hook";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * K14. Báo cáo chi tiết xuất thuốc ngoại trú
 *
 */
const K14 = () => {

  const { listKhoUser } = useStore("kho", []);
  const { listAllKhoa } = useStore("khoa", []);
  const { kho: { getTheoTaiKhoan }, khoa: { getListAllKhoa }, baoCaoDaIn: { getK14 } } = useDispatch();

  useEffect(() => {
    getTheoTaiKhoan({});
    getListAllKhoa({ active: true });
  }, []);

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col span={6}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày tạm ứng<span className="red required">*</span>
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
        <Col span={6}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày tạm ứng<span className="red required">*</span>
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
            <label className="label-filter">
              Kho xuất
            </label>
            <Select
              mode="multiple"
              className="input-filter"
              placeholder={"Chọn kho"}
              data={[{ id: "", ten: "Tất cả" }, ...listKhoUser]}
              onChange={onChange("dsKhoId", true)}
              value={_state.dsKhoId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              Khoa xuất
            </label>
            <Select
              mode="multiple"
              className="input-filter"
              placeholder={"Chọn khoa"}
              data={[{ id: "", ten: "Tất cả" }, ...listAllKhoa]}
              onChange={onChange("dsKhoaXuat", true)}
              value={_state.dsKhoaXuat}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    dsKhoId: _state.dsKhoId,
    dsKhoaXuat: _state.dsKhoaXuat,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
      () => {
        return _beforeOk();
      };

  return (
    <Main>
      <BaseBaoCao
        title="K14. Báo cáo chi tiết xuất thuốc ngoại trú"
        renderFilter={renderFilter}
        getBc={getK14}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "K14", link: "/bao-cao/k14" }]}
      />
    </Main>
  );
};

export default K14
