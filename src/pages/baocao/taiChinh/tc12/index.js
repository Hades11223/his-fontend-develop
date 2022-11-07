import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import { concatString } from "utils";

const Index = () => {

  const { t } = useTranslation()

  const {
    utils: { listDoiTuong = [], listDoiTuongKcb = [] },
    khoa: { listKhoa = [] },

  } = useSelector(state => state)

  const {
    utils: { getUtils },
    baoCaoDaIn: { getTc12 },
    khoa: { getListKhoa }
  } = useDispatch()

  useEffect(() => {
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "DoiTuongKcb" });
    getListKhoa({})
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col span={6}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày<span className="red required">*</span>
            </label>
            <DatePicker
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
              Đến ngày<span className="red required">*</span>
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
        <Col span={6}>
          <div className="item-select">
            <label className="label-filter">Khoa hiện tại</label>
            <Select
              className="select"
              placeholder={"Chọn khoa hiện tại"}
              data={[{ id: "", ten: "Tất cả" }, ...listKhoa]}
              onChange={onChange("khoaId")}
              value={_state.khoaId}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="item-select">
            <label className="label-filter">Đối tượng người bệnh</label>
            <Select
              className="select"
              placeholder={"Chọn đối tượng người bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...listDoiTuong]}
              onChange={onChange("doiTuong")}
              value={_state.doiTuong}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.doiTuongKcb")}</label>
            <Select
              className="select"
              placeholder={concatString(t("common.chon"), t("baoCao.doiTuongKcb"))}
              data={[{ id: "", ten: "Tất cả" }, ...listDoiTuongKcb]}
              onChange={onChange("doiTuongKcb")}
              value={_state.doiTuongKcb}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.doiTuongNb")}</label>
            <Select
              className="select"
              placeholder={concatString(t("common.chon"), t("baoCao.doiTuongNb"))}
              data={[{ id: null, ten: "Tất cả" }, { id: true, ten: "Có tạm ứng" }]}
              onChange={onChange("tamUng")}
              value={_state.tamUng}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    doiTuong: _state.doiTuong,
    khoaId: _state.khoaId,
    doiTuongKcb: _state.doiTuongKcb,
    tamUng: _state.tamUng,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
      () => {
        return _beforeOk();
      };

  return (
    <Main>
      <BaseBaoCao
        title="TC12. Theo dõi tình hình tạm ứng và chi phí KCB của Người bệnh"
        renderFilter={renderFilter}
        getBc={getTc12}
        handleDataSearch={handleDataSearch}
        initState={{
          doiTuong: [""],
          khoaId: [""],
          doiTuongKcb: [""],
          tamUng: [null]
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC12", link: "/bao-cao/tc12" }]}
      />
    </Main>
  );
};

export default Index
