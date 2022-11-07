import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { LOAI_PHIEU_THU } from "pages/baocao/utils";
import { Main } from "./styled";

/**
 * TC04. Báo cáo chi tiết sử dụng hóa đơn
 *
 */

const TC04 = ({
  listLoaiThoiGian,
  listtrangThaiHoaDon,
  listdoiTuong,

  getListAllNhanVien,
  getUtils,
  getTc04,
  ...props
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "trangThaiHoaDon" });
    getListAllNhanVien();
    getUtils({ name: "doiTuong" });
  }, []);

  const listAllNhanVien = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(props.listAllNhanVien || []).map((item) => ({
        ...item,
        ten: `${item.taiKhoan || ""}_${item.ma}_${item.ten}`,
      })),
    ];
  }, [props.listAllNhanVien]);

  const handleChange = (key, onChange) => (value) => {
    if (["dsTrangThai", "nguoiPhatHanhHdId"].some((item) => item === key)) {
      if (value.length > 0) onChange(key)(value.filter((item) => item));
      else onChange(key)([""]);
    }
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={12} xl={12} xxl={12}>
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
        <Col md={12} xl={12} xxl={12}>
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
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Trạng thái hóa đơn</label>
            <Select
              className="input-filter"
              placeholder={"Chọn trạng thái hóa đơn"}
              mode="multiple"
              data={[
                { id: "", ten: "Tất cả" },
                ...(listtrangThaiHoaDon || []).filter((i) =>
                  [30, 40, 50].some((j) => i.id === j)
                ),
              ]}
              value={_state.trangThai}
              onChange={handleChange("dsTrangThai", onChange)}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
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
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Người xuất hóa đơn</label>
            <Select
              onChange={handleChange("nguoiPhatHanhHdId", onChange)}
              value={_state.nguoiPhatHanhHdId}
              className="input-filter"
              placeholder={"Chọn người xuất hóa đơn"}
              mode="multiple"
              data={listAllNhanVien}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Đối tượng NB</label>
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
        <Col md={12} xl={12} xxl={12}>
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
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    dsTrangThai: _state.dsTrangThai[0] != "" ? _state.dsTrangThai : "",
    nguoiPhatHanhHdId:
      _state.nguoiPhatHanhHdId[0] != "" ? _state.nguoiPhatHanhHdId : "",
    doiTuong: _state.doiTuong,
    nhaThuoc: _state.nhaThuoc,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC04. Báo cáo chi tiết sử dụng hóa đơn"
        renderFilter={renderFilter}
        getBc={getTc04}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 60,
          dsTrangThai: [""],
          nguoiPhatHanhHdId: [""],
          doiTuong: "",
          nhaThuoc: false,
        }}
        breadcrumb={[{ title: "TC04", link: "/bao-cao/tc04" }]}
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
  }),
  ({
    utils: { getUtils },
    nhanVien: { getListAllNhanVien },
    baoCaoDaIn: { getTc04 },
  }) => ({
    getListAllNhanVien,
    getUtils,
    getTc04,
  })
)(TC04);
