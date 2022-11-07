import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * TC08. Báo cáo thu tiền dịch vụ theo yêu cầu
 *
 */

const TC08 = ({
  listLoaiThoiGian,
  listtrangThaiHoaDon,
  listdoiTuong,
  listGroupService3,

  getListAllNhanVien,
  getUtils,
  getTc08,
  searchTongHopDichVuCap3,
  ...props
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "trangThaiHoaDon" });
    getListAllNhanVien();
    getUtils({ name: "doiTuong" });
    searchTongHopDichVuCap3({ page: null, size: null });
  }, []);

  const listNhomDvCap3 = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(listGroupService3 || []).filter(
        (item) =>
          item.id && {
            ...item,
            ten: `${item.ma} - ${item.ten}`,
          }
      ),
    ];
  }, [listGroupService3]);
  const listTrangThaiThanhToan = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      { id: true, ten: "Đã thanh toán" },
      { id: false, ten: "Chưa thanh toán" },
    ];
  }, []);

  const handleChange = (key, onChange) => (value) => {
    if (["dsNhomDichVuCap3Id"].some((item) => item === key)) {
      if (value.length > 0) onChange(key)(value.filter((item) => item));
      else onChange(key)([""]);
    }
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
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
                [20, 30, 40, 60].some((v) => v === ltg.id)
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
          <div className="item-select">
            <label className="label-filter">Đối tượng</label>
            <Select
              onChange={onChange("doiTuong")}
              value={_state.doiTuong}
              className="input-filter"
              placeholder={"Chọn đối tượng NB"}
              data={
                listdoiTuong?.length === 0
                  ? []
                  : [{ id: "", ten: "Tất cả" }, ...listdoiTuong]
              }
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
              data={listTrangThaiThanhToan}
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
            <label className="label-filter">Nhóm dịch vụ cấp 3</label>
            <Select
              onChange={handleChange("dsNhomDichVuCap3Id", onChange)}
              value={_state.dsNhomDichVuCap3Id}
              className="input-filter"
              placeholder={"Chọn nhóm dịch vụ cấp 3"}
              mode="multiple"
              data={listNhomDvCap3}
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
    dsNhomDichVuCap3Id:
      _state.dsNhomDichVuCap3Id[0] != "" ? _state.dsNhomDichVuCap3Id : "",
    doiTuong: _state.doiTuong,
    thanhToan: _state.thanhToan,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC08. Báo cáo thu tiền dịch vụ theo yêu cầu"
        renderFilter={renderFilter}
        getBc={getTc08}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 40,
          dsNhomDichVuCap3Id: [""],
          doiTuong: "",
          thanhToan: true,
        }}
        breadcrumb={[{ title: "TC08", link: "/bao-cao/tc08" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listtrangThaiHoaDon: state.utils.listtrangThaiHoaDon || [],
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    listdoiTuong: state.utils.listdoiTuong || [],
    listGroupService3: state.nhomDichVuCap3.listGroupService3 || [],
  }),
  ({
    utils: { getUtils },
    nhanVien: { getListAllNhanVien },
    baoCaoDaIn: { getTc08 },
    nhomDichVuCap3: { searchTongHopDichVuCap3 },
  }) => ({
    getListAllNhanVien,
    getUtils,
    getTc08,
    searchTongHopDichVuCap3,
  })
)(TC08);
