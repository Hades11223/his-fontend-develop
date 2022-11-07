import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { YES_NO } from "pages/baocao/utils";

/**
 * BC05. Báo cáo chi tiết tiếp nhận dịch vụ theo phòng
 *
 */

const Index = ({
  listDoiTuong,
  listDoiTuongKcb,
  listLoaiDichVu = [],
  listAllPhong,
  listAllNhomDichVuCap2,

  getUtils,
  getListAllPhong,
  getAllDichVuCap2,
  getBc05,
}) => {
  useEffect(() => {
    getAllDichVuCap2({ page: 0 });
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "LoaiDichVu" });
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "DoiTuongKcb" });
    getListAllPhong({ page: 0, size: 9999, active: true });
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày
              <span className="icon-required"> *</span>
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
            <label className="label-filter">
              Loại dịch vụ
              <span className="icon-required"> *</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn loại dịch vụ"}
              value={_state.loaiDichVu}
              data={listLoaiDichVu}
              onChange={onChange("loaiDichVu")}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày
              <span className="icon-required"> *</span>
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Nhóm dịch vụ</label>
            <Select
              onChange={onChange("dsNhomDichVuCap2Id", true)}
              value={_state.dsNhomDichVuCap2Id}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn nhóm dịch vụ"}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllNhomDichVuCap2 || []),
              ]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Phòng thực hiện</label>
            <Select
              mode="multiple"
              onChange={onChange("dsPhongThucHienId")}
              value={_state.dsPhongThucHienId}
              className="input-filter"
              placeholder={"Chọn phòng thực hiện"}
              data={listAllPhong}
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
              placeholder={"Chọn yêu cầu"}
              data={YES_NO}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    dsNhomDichVuCap2Id: _state.dsNhomDichVuCap2Id,
    doiTuong: _state.doiTuong,
    doiTuongKcb: _state.doiTuongKcb,
    loaiDichVu: _state.loaiDichVu,
    dsPhongThucHienId: _state.dsPhongThucHienId,
    theoYeuCau: _state.theoYeuCau,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.dsNhomDichVu || _state.dsNhomDichVu?.length === 0) {
        message.error("Vui lòng chọn phòng thực hiện");
        return false;
      }
      if (!_state.loaiDichVu) {
        message.error("Vui lòng chọn loại dịch vụ");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="BC05. Báo cáo chi tiết tiếp nhận dịch vụ theo phòng"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getBc05}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 30,
          doiTuong: "",
          doiTuongKcb: "",
          dsNhomDichVu: [""],
          theoYeuCau: "",
        }}
        breadcrumb={[{ title: "Bc05", link: "/bao-cao/bc05" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
    listLoaiDichVu: state.utils.listLoaiDichVu || [],
    listAllPhong: state.phong.listAllPhong || [],
    listAllNhomDichVuCap2: state.nhomDichVuCap2.listAllNhomDichVuCap2 || [],
  }),
  ({
    baoCaoDaIn: { getBc05 },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    utils: { getUtils },
    phong: { getListAllPhong },
    nhomDichVuCap2: { getAllDichVuCap2 },
  }) => ({
    getBc05,
    getAllTongHopDichVuCap1,
    getUtils,
    getListAllPhong,
    getAllDichVuCap2,
  })
)(Index);
