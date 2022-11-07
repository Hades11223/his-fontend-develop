import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { YES_NO } from "constants/index";

/**
 * BC06. Báo cáo chấm công thực hiện dịch vụ
 *
 */

const Index = ({
  listLoaiDichVu = [],
  listAllKhoa = [],
  listAllPhong,
  listDoiTuong = [],
  listAllNhanVien,

  getListAllKhoa,
  getListAllPhong,
  getUtils,
  getListAllNhanVien,
  getBc06,
}) => {
  // const [state, _setState] = useState({ khoaId: null });
  // const setState = (data) => {
  //   _setState((pre) => ({ ...pre, ...data }));
  // };

  // useEffect(() => {
  //   setState({ listAllPhong });
  // }, [listAllPhong]);

  useEffect(() => {
    getUtils({ name: "LoaiDichVu" });
    getListAllKhoa({ page: "", size: "", active: true });
    getListAllPhong({ page: "", size: "", active: true });

    getUtils({ name: "DoiTuong" });
    getListAllNhanVien();
  }, []);

  // const customChange = (key, onChange) => (e) => {
  //   if (key === "dsKhoaChiDinhId") {
  //     const value = onChange("dsKhoaChiDinhId", true)(e);
  //     setState({
  //       listAllPhong: listAllPhong.filter(
  //         (item) =>
  //           e.some((k) => item.khoaId === k) ||
  //           value.includes("") ||
  //           value.length === 0
  //       ),
  //     });
  //     onChange("dsPhongThucHienId")([]);
  //   }
  //   if (key === "dsPhongThucHienId") {
  //     // onChange("dsKhoaChiDinhId")(
  //     //   listAllPhong.find((item) => item.id === e)?.khoaId
  //     // );
  //     onChange(key)(e);
  //   }
  // };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Loại dịch vụ
              <span className="icon-required"> *</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn loại dịch vụ"}
              value={_state.loaiDichVu}
              data={[{ id: "", ten: "Tất cả" }, ...listLoaiDichVu]}
              onChange={onChange("loaiDichVu")}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Khoa chỉ định</label>
            <Select
              onChange={onChange("dsKhoaChiDinhId", true)}
              value={_state.dsKhoaChiDinhId}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn khoa chỉ định"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Phòng thực hiện</label>
            <Select
              onChange={onChange("dsPhongThucHienId", true)}
              value={_state.dsPhongThucHienId}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn phòng thực hiện"}
              data={listAllPhong}
            />
          </div>
        </Col>

        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Thời gian thực hiện
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime
              value={_state.thoiGianThucHien}
              onChange={onChange("thoiGianThucHien")}
              placeholder="Chọn ngày"
              picker="month"
              format="MM/YYYY"
              className="input-filter"
              dropdownClassName="ant-picker-month-panel-nowrap"
            />
            {!_state.isValidData && !_state.thoiGianThucHien && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đối tượng người bệnh</label>
            <Select
              className="input-filter"
              placeholder={"Chọn đối tượng người bệnh"}
              value={_state.doiTuong}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              onChange={onChange("doiTuong")}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Nhân viên</label>
            <Select
              onChange={onChange("dsNhanVienId", true)}
              value={_state.dsNhanVienId}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn nhân viên tiếp đón"}
              data={
                listAllNhanVien.length === 0
                  ? []
                  : [{ id: "", ten: "Tất cả" }, ...(listAllNhanVien || [])]
              }
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Theo yêu cầu</label>
            <Select
              onChange={onChange("theoYeuCau")}
              value={_state.theoYeuCau}
              className="input-filter"
              placeholder={"Chọn theo yêu cầu"}
              data={YES_NO}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiDichVu: _state.loaiDichVu,
    tuThoiGianThucHien: moment(_state.thoiGianThucHien)
      .startOf("M")
      .format("DD-MM-YYYY HH:mm:ss"),
    denThoiGianThucHien: moment(_state.thoiGianThucHien)
      .endOf("M")
      .format("DD-MM-YYYY HH:mm:ss"),
    dsKhoaChiDinhId: _state.dsKhoaChiDinhId,
    dsPhongThucHienId: _state.dsPhongThucHienId,
    doiTuong: _state.doiTuong,
    dsNhanVienId: _state.dsNhanVienId,
    theoYeuCau: _state.theoYeuCau,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.loaiDichVu && _state.loaiDichVu != "") {
        message.error("Vui lòng chọn loại dịch vụ");
        return false;
      }
      if (!_state.thoiGianThucHien) {
        message.error("Vui lòng chọn thời gian thực hiện");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="BC06. Báo cáo chấm công thực hiện dịch vụ"
        renderFilter={renderFilter}
        getBc={getBc06}
        handleDataSearch={handleDataSearch}
        initState={{
          thoiGianThucHien: moment(),
          loaiDichVu: "",
          dsKhoaChiDinhId: [""],
          dsPhongThucHienId: [],
          doiTuong: [""],
          dsNhanVienId: [""],
          theoYeuCau: "",
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "Bc06", link: "/bao-cao/bc06" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiDichVu: state.utils.listLoaiDichVu || [],
    listAllKhoa: state.khoa.listAllKhoa || [],
    listAllPhong: state.phong.listAllPhong || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
  }),
  ({
    baoCaoDaIn: { getBc06 },
    utils: { getUtils },
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    nhanVien: { getListAllNhanVien },
  }) => ({
    getBc06,
    getListAllKhoa,
    getListAllNhanVien,
    getUtils,
    getListAllPhong,
  })
)(Index);
