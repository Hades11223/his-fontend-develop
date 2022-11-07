import { Checkbox, Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * Báo cáo tài chính: Tổng hợp chi phí khám bệnh, chữa bệnh của người tham gia bảo hiểm y tế
 *
 */

const YES_NO = [
  { id: null, ten: "Tất cả" },
  { id: true, ten: "Đã thanh toán" },
  { id: false, ten: "Chưa thanh toán" },
];

const LOAI_THOI_GIAN = [
  { id: 1, ten: "Thời gian quyết toán" },
  { id: 2, ten: "Thời gian thanh toán" },
];

const Index = ({
  listDoiTuongKcb,
  listAllKhoa = [],
  listAllToaNha = [],
  listAllBenhVien = [],
  listAllTheBaoHiem = [],

  getUtils,
  getTc06,
  getListAllKhoa,
  getListAllToaNha,
  getListAllBenhVien,
  getListAllTheBaoHiem,
}) => {
  useEffect(() => {
    // getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "DoiTuongKcb" });
    getListAllKhoa({ page: 0, size: 9999, active: true });
    getListAllToaNha({});
    getListAllBenhVien({});
    getListAllTheBaoHiem({});
  }, []);

  const listAllTheBaoHiemCustom = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(listAllTheBaoHiem || []).map((item) => ({
        ...item,
        id: item.ma,
        ten: `${item.ma} - ${item.ten}`,
      })),
    ];
  }, [listAllTheBaoHiem]);

  const listAllBenhVienCustom = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(listAllBenhVien || []).map((item) => ({
        ...item,
        ten: `${item.ma} - ${item.ten}`,
      })),
    ];
  }, [listAllBenhVien]);

  const handleChange = (key, onChange) => (value) => {
    if (["dsMaThe", "dsDoiTuongKcb"].some((item) => item === key)) {
      if (value.length > 0) onChange(key)(value.filter((item) => item));
      else onChange(key)([""]);
    }
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày<span className="required">*</span>
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
          <div className="item-select">
            <label className="label-filter">Trạng thái thanh toán</label>
            <Select
              onChange={onChange("thanhToan")}
              defaultValue={true}
              className="input-filter"
              placeholder={"Chọn trạng thái thanh toán"}
              data={YES_NO}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Nhà thu ngân</label>
            <Select
              onChange={onChange("toaNhaId")}
              value={_state.toaNhaId}
              className="input-filter"
              placeholder={"Chọn nhà thu ngân"}
              data={listAllToaNha}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Loại thẻ</label>
            <Select
              onChange={handleChange("dsMaThe", onChange)}
              value={_state.dsMaThe}
              className="input-filter"
              mode="multiple"
              placeholder={"Loại thẻ"}
              data={listAllTheBaoHiemCustom || []}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày<span className="required">*</span>
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
            <label className="label-filter">Đối tượng khám chữa bệnh</label>
            <Select
              onChange={handleChange("dsDoiTuongKcb", onChange)}
              value={_state.dsDoiTuongKcb}
              className="input-filter"
              mode="multiple"
              placeholder={"Loại thẻ"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuongKcb || [])]}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Khoa</label>
            <Select
              onChange={onChange("khoaId")}
              value={_state.khoaId}
              className="input-filter"
              placeholder={"Khoa"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Nơi đăng ký BĐ</label>
            <Select
              onChange={onChange("noiDangKyId")}
              value={_state.noiDangKyId}
              className="input-filter"
              placeholder={"Chọn Nơi đăng ký BĐ"}
              data={listAllBenhVienCustom}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Loại thời gian</label>
            <Select
              onChange={onChange("thoiGian")}
              defaultValue={1}
              className="input-filter"
              placeholder={"Chọn trạng thái thanh toán"}
              data={LOAI_THOI_GIAN}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Mở rộng</label>
            <Checkbox
              checked={_state.hienThiMaHoSo}
              onChange={onChange("hienThiMaHoSo")}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => {
    const payload = {
      tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      dsDoiTuongKcb: _state.dsDoiTuongKcb[0] != "" ? _state.dsDoiTuongKcb : "",
      khoaId: _state.khoaId,
      thanhToan: _state.thanhToan,
      dsMaThe: _state.dsMaThe[0] != "" ? _state.dsMaThe : "",
      noiDangKyId: _state.noiDangKyId,
      toaNhaId: _state.toaNhaId,
      loaiThoiGian: _state.thoiGian == 2 ? 40 : 80,
      hienThiMaHoSo: _state.hienThiMaHoSo,
    };
    return payload;
  };

  return (
    <Main>
      <BaseBaoCao
        title="TC06. Tổng hợp chi phí khám bệnh, chữa bệnh của người tham gia bảo hiểm y tế"
        renderFilter={renderFilter}
        getBc={getTc06}
        handleDataSearch={handleDataSearch}
        initState={{
          thanhToan: true,
          dsMaThe: [""],
          dsDoiTuongKcb: [""],
          thoiGian: 1,
        }}
        breadcrumb={[{ title: "TC06", link: "/bao-cao/tc06" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
    listLoaiThoiGian: state.utils.listLoaiThoiGian,
    listAllKhoa: state.khoa.listAllKhoa,
    listAllToaNha: state.toaNha.listAllToaNha,
    listAllBenhVien: state.benhVien.listAllBenhVien,
    listAllTheBaoHiem: state.theBaoHiem.listAllTheBaoHiem,
  }),
  ({
    utils: { getUtils },
    baoCaoDaIn: { getTc06 },
    khoa: { getListAllKhoa },
    toaNha: { getListAllToaNha },
    benhVien: { getListAllBenhVien },
    theBaoHiem: { getListAllTheBaoHiem },
  }) => ({
    getUtils,
    getTc06,
    getListAllKhoa,
    getListAllToaNha,
    getListAllBenhVien,
    getListAllTheBaoHiem,
  })
)(Index);
