import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import nbThongTinProvider from "data-access/nb-thong-tin-provider";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

const Index = ({
  listDoiTuong = [],
  listAllPhuongThucThanhToan = [],

  getUtils,
  getListAllPhuongThucThanhToan,
  getThietLap,
  getListNhanVienTongHop,
  getTc11,
  ...props
}) => {
  const listNhanVien = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(props.listNhanVien || []).map((item) => ({
        ...item,
        ten: `${item.taiKhoan || ""}_${item.ma}_${item.ten}`,
      })),
    ];
  }, [props.listNhanVien]);
  const [state, _setState] = useState({
    hienThiThuNgan: true,
    hienThiNb: true,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useEffect(() => {
    getUtils({ name: "DoiTuong" });
    getListAllPhuongThucThanhToan();
    getThietLap({ ma: "MA_THU_NGAN" }).then((dsMaVaiTro) => {
      getListNhanVienTongHop({ dsMaVaiTro });
    });
  }, []);

  const changeHienThi = (key) => (e) => {
    setState({ [key]: e.target.checked });
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={4} xl={4} xxl={4}>
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

        <Col md={4} xl={4} xxl={4}>
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

        <Col md={5} xl={5} xxl={5}>
          <div className="item-select">
            <label className="label-filter">
              Đối tượng NB<span className="red required">*</span>
            </label>
            <Select
              value={_state.doiTuong}
              onChange={onChange("doiTuong")}
              className="input-filter"
              placeholder={"Chọn đối tượng người bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...listDoiTuong]}
            />
          </div>
        </Col>

        <Col md={5} xl={5} xxl={5}>
          <div className="item-select">
            <label className="label-filter">Phương thức thanh toán</label>
            <Select
              mode="multiple"
              onChange={onChange("dsPtttId")}
              value={_state.dsPtttId}
              className="input-filter"
              placeholder={"Chọn phương thức thanh toán"}
              data={listAllPhuongThucThanhToan}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              Từ số hóa đơn - đến số hóa đơn
            </label>
            <Select
              className="input-filter"
              mode="tags"
              onChange={onChange("dsKhoangSoHoaDon")}
              placeholder="VD: 1-20, ..."
            ></Select>
            {/* <Input
              className="ant-select input-filter"
              style={{ width: "50%" }}
              placeholder="Từ"
              onChange={onChange("tuSoHoaDon")}
            ></Input>
            <Input
              className="ant-select input-filter"
              style={{ width: "50%" }}
              placeholder="Đến"
              onChange={onChange("denSoHoaDon")}
            ></Input> */}
          </div>
        </Col>

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select checkbox-pl">
            <Checkbox
              checked={state.hienThiThuNgan}
              onChange={changeHienThi("hienThiThuNgan")}
            />
            <label className="label-filter checkbox-lb">
              Hiển thị tên thu ngân
            </label>
          </div>
        </Col>

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select checkbox-pl">
            <Checkbox
              checked={state.hienThiNb}
              onChange={changeHienThi("hienThiNb")}
            />
            <label className="label-filter checkbox-lb">Hiển thị NB</label>
          </div>
        </Col>

        <Col md={8} xl={8} xxl={8}></Col>

        <Col md={8} xl={8} xxl={8}>
          {state.hienThiThuNgan && (
            <div className="item-select">
              <label className="label-filter">Tên thu ngân</label>
              <Select
                onChange={onChange("dsThuNganId", true)}
                value={_state.dsThuNganId}
                className="input-filter"
                mode="multiple"
                placeholder={"Chọn thu ngân"}
                data={listNhanVien}
              />
            </div>
          )}
        </Col>

        <Col md={8} xl={8} xxl={8}>
          {state.hienThiNb && (
            <div className="item-select">
              <label className="label-filter">Tên NB</label>
              <SelectLoadMore
                api={nbThongTinProvider.search}
                mapData={(i) => ({
                  value: i.id,
                  label: i.tenNb + " - " + i.maNb,
                })}
                onChange={onChange("dsNbId", true)}
                value={_state.dsNbId}
                keySearch={"tenNb"}
                placeholder="Chọn người bệnh"
                className="input-filter"
                mode="multiple"
                hasAll={true}
              />
            </div>
          )}
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    doiTuong: _state.doiTuong,
    dsPtttId: _state.dsPtttId,
    dsKhoangSoHoaDon: _state.dsKhoangSoHoaDon,
    dsThuNganId: state.hienThiThuNgan ? _state.dsThuNganId : undefined,
    dsNbId: state.hienThiNb ? _state.dsNbId : undefined,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.doiTuong) {
        message.error("Vui lòng chọn đối tượng");
        return false;
      }
      if (
        (_state.tuSoHoaDon && !_state.denSoHoaDon) ||
        (!_state.tuSoHoaDon && _state.denSoHoaDon)
      ) {
        message.error("Vui lòng chọn đầy đủ từ số hóa đơn - đến số hóa đơn");
        return false;
      }
      if (
        _state.tuSoHoaDon &&
        _state.denSoHoaDon &&
        _state.tuSoHoaDon > _state.denSoHoaDon
      ) {
        message.error("Vui lòng chọn đến số hóa đơn lớn hơn từ số hóa đơn");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="TC11. Báo cáo tổng hợp doanh số"
        // listLink={[]}
        renderFilter={renderFilter}
        getBc={getTc11}
        handleDataSearch={handleDataSearch}
        initState={{
          doiTuong: [""],
          dsThuNganId: [""],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC11", link: "/bao-cao/tc11" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listDoiTuong: state.utils.listDoiTuong || [],
    listAllPhuongThucThanhToan:
      state.phuongThucTT.listAllPhuongThucThanhToan || [],
    listNhanVien: state.nhanVien.listNhanVien || [],
  }),
  ({
    utils: { getUtils },
    phuongThucTT: { getListAllPhuongThucThanhToan },
    thietLap: { getThietLap },
    nhanVien: { getListNhanVienTongHop },
    baoCaoDaIn: { getTc11 },
  }) => ({
    getUtils,
    getListAllPhuongThucThanhToan,
    getThietLap,
    getListNhanVienTongHop,
    getTc11,
  })
)(Index);
