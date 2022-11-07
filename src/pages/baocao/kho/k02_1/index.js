import { Col, DatePicker, message, Row, Checkbox } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import SelectLoadMore from "components/SelectLoadMore";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import { useTranslation } from "react-i18next";

/**
 * K02.1. Báo cáo xuất nhập tồn kho lẻ
 *
 */
const K02_1 = ({ ...props }) => {
  const { t } = useTranslation();
  const { listKhoUser } = useSelector((state) => state.kho);
  const { listAllNhaSanXuat} = useSelector((state) => state.doiTac);
  
  const {
    baoCaoDaIn: { getK02_1 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    doiTac: { getListAllNhaSanXuat },
  } = useDispatch();
  useEffect(() => {
    getKhoTheoTaiKhoan({ page: "", size: "", active: true });
    getListAllNhaSanXuat({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [10],
    });
  }, []);

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
    onChange(name)(e);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              style={{ color: _state.tuNgay ? "" : "red" }}
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
              onKeyDown={onKeyDownDate("tuNgay")}
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">Vui lòng chọn thời gian từ ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              style={{ color: _state.denNgay ? "" : "red" }}
              className="label-filter"
            >
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
              onKeyDown={onKeyDownDate("denNgay")}
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label
              className="label-filter"
              style={{ color: _state.khoId ? "" : "red" }}
            >
              Kho<span style={{ color: "red" }}>*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listKhoUser || []}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị hãng sản xuất</label>
            <Checkbox
              checked={_state.hienThiHangSanXuat}
              onChange={onChange("hienThiHangSanXuat")}
            />
          </div>
        </Col>
        <Col md={16} xl={16} xxl={16}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị Mã quản lý</label>
            <Checkbox
              checked={_state.hienThiMaQuanLy}
              onChange={onChange("hienThiMaQuanLy")}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div
            className="item-select"
            style={_state.hienThiHangSanXuat ? {} : { display: "none" }}
          >
            <label className="label-filter">Hãng sản xuất</label>
            <Select
              onChange={onChange("nhaSanXuatId")}
              value={_state.nhaSanXuatId}
              className="input-filter"
              placeholder={"Chọn hãng sản xuất"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllNhaSanXuat || [])]}
            />
          </div>
        </Col>
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
      dichVuId: dichVuId,
      hienThiHangSanXuat: _state.hienThiHangSanXuat,
      hienThiMaQuanLy: _state.hienThiMaQuanLy,
      nhaSanXuatId: _state.nhaSanXuatId,
    }
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error("Vui lòng chọn kho");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="K02.1. Báo cáo xuất nhập tồn kho lẻ"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK02_1}
        handleDataSearch={handleDataSearch}
        initState={{
          hienThiHangSanXuat: false,
        }}
        breadcrumb={[{ title: "K02.1", link: "/bao-cao/k02_1" }]}
      />
    </Main>
  );
};

export default K02_1;
