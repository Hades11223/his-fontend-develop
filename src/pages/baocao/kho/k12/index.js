import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import SelectLoadMore from "components/SelectLoadMore";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import { useTranslation } from "react-i18next";

/**
 * K12. Báo cáo chi tiết sử dụng hàng hóa thông thường
 *
 */
const K12 = ({
  listAllKho,
  listAllKhoa,
  listHangHoa,

  getAllKho,
  getListAllKhoa,
  getListHangHoa,
  dataSearch,
  getK12,
}) => {
  useEffect(() => {
    getAllKho({ active: true, kyThuatCao: false });
    getListAllKhoa({ active: true });
    getListHangHoa({ page: 0, size: 9999, active: true });
  }, []);

  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  const customChange = (name, onChange) => (e) => {
    if (name === "khoId") {
      setState({
        paramHangHoa: { khoId: e },
      });
      onChange("dichVuId")();
    }
    if (name === "khoaId") {
      getListHangHoa({
        dataSearch: {
          ...dataSearch,
          page: 0,
          size: 9999,
          active: true,
          khoaId: e,
        },
      });
      onChange("dichVuId")();
    }
    onChange(name)(e);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
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
              onKeyDown={onKeyDownDate("tuNgay")}
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
              <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().endOf("day") }}
              value={_state.denNgay}
              onChange={onChange("denNgay")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              onKeyDown={onKeyDownDate("denNgay")}
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Kho</label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listAllKho || []}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Khoa</label>
            <Select
              className="input-filter"
              placeholder={"Chọn khoa"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
              onChange={customChange("khoaId", onChange)}
              value={_state.khoaId}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.tenHangHoa")}</label>
            <SelectLoadMore
              api={tonKhoProvider.theoLo}
              mapData={(i) => ({
                value: `${i.dichVuId}-${i.khoId}`,
                label: i.ten,
              })}
              onChange={onChange("dichVuId")}
              keySearch={"ten"}
              value={_state.dichVuId}
              className="input-filter"
              placeholder={t("baoCao.chonHangHoa")}
              addParam={state?.paramHangHoa}
              hasAll={true}
            />
          </div>
        </Col>
        {/* <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Trạng thái hàng hóa</label>
            <Select
              className="input-filter"
              placeholder={"Chọn trạng thái hàng hóa"}
              mode="multiple"
              data={[
                { id: 1, ten: "NB đã được duyệt lĩnh" },
                { id: 2, ten: "NB chưa được duyệt lĩnh" },
              ]}
              onChange={onChange("trangThaiHangHoa")}
              value={_state.trangThaiHangHoa}
            />
          </div>
        </Col> */}
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => {
    let dichVuId = _state?.dichVuId?.split("-")[0] || null;
    return {
      loaiThoiGian: _state.loaiThoiGian,
      tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      khoId: _state.khoId,
      khoaId: _state.khoaId,
      dichVuId: dichVuId,
    }
  };

  return (
    <Main>
      <BaseBaoCao
        title="K12. Báo cáo chi tiết sử dụng hàng hóa thông thường"
        renderFilter={renderFilter}
        getBc={getK12}
        handleDataSearch={handleDataSearch}
        // initState={{
        //   hienThiPhanLoaiHangHoa: true,
        //   hienThiMaHangHoa: true,
        //   hienThiTenHoatChat: true,
        // }}
        breadcrumb={[{ title: "K12", link: "/bao-cao/k12" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho,
    listAllKhoa: state.khoa.listAllKhoa,
    listHangHoa: state.tonKho.listAllHangHoa,
    dataSearch: state.tonKho?.dataSearch,
  }),
  ({
    baoCaoDaIn: { getK12 },
    kho: { getAllTongHop: getAllKho },
    khoa: { getListAllKhoa },
    tonKho: { onSearchAllDichVuTonKho: getListHangHoa },
  }) => ({
    getK12,
    getAllKho,
    getListAllKhoa,
    getListHangHoa,
  })
)(K12);
