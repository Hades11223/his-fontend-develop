import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import dichVuProvider from "data-access/categories/dm-dich-vu-provider";

/**
 * BC08. Báo cáo số lượng dịch vụ từ bệnh viện E
 *
 */

const Index = ({
  listAllNhanVien,
  listLoaiDichVu = [],
  listAllDichVu,
  listAllNguonNguoiBenh,

  getListAllNhanVien,
  getAllTongHopDichVuCap1,
  getAllDichVu,
  getListAllNguonNguoiBenh,
  getThietLap,
  getUtils,

  getBc08,
}) => {
  const [state, _setState] = useState({
    addParamDv: { active: true, dsLoaiDichVu: [10, 20, 30, 60, 150] },
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  useEffect(() => {
    getUtils({ name: "LoaiDichVu" });
    getListAllNhanVien();
    getAllTongHopDichVuCap1({ active: true });
    // getAllDichVu({ active: true, dsLoaiDichVu: [10, 20, 30, 60, 150] });
    getListAllNguonNguoiBenh({}).then((res) => {
      getThietLap({ ma: "NGUON_NGUOI_BENH" }).then((data) => {
        setState({
          nguonNbId: res.find((i) => i.ma === data)?.id,
        });
      });
    });
  }, []);

  const handleChange = (key, onChange, _state) => (value) => {
    if (
      ["dsLoaiDichVu", "dsDichVuId", "dsKhoaChiDinhId"].some(
        (item) => item === key
      )
    ) {
      let newValue = [];
      const newBool = JSON.stringify(value);
      const oldBool = JSON.stringify(_state[key]);
      if (newBool.indexOf('""') !== -1 && oldBool.indexOf('""') === -1) {
        newValue = [""];
      } else if (value.length > 1) newValue = value.filter((item) => item);
      else newValue = value;

      onChange(key)(newValue);
      if (key === "dsLoaiDichVu") {
        // getAllDichVu({
        //   active: true,
        //   dsLoaiDichVu:
        //     newValue.length === 0 || newValue[0] === ""
        //       ? [10, 20, 30, 60, 150]
        //       : newValue,
        // });
        setState({
          addParamDv: {
            active: true,
            dsLoaiDichVu:
              newValue.length === 0 || newValue[0] === ""
                ? [10, 20, 30, 60, 150]
                : newValue,
          },
        });
        onChange("dsDichVuId")([""]);
      }
    }
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày <span className="icon-required">*</span>
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
          <div className="item-date">
            <label className="label-filter">
              Đến ngày <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
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
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              className="label-filter"
            >
              Nhân viên tiếp đón
            </label>
            <Select
              onChange={onChange("dsNhanVienTiepDonId", true)}
              value={_state.dsNhanVienTiepDonId}
              mode="multiple"
              className="input-filter"
              placeholder={"Chọn nhân viên tiếp đón"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllNhanVien || [])]}
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
              mode="multiple"
              value={_state.dsLoaiDichVu}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listLoaiDichVu || []).filter((i) =>
                  [10, 20, 30, 60, 150].some((j) => j === i.id)
                ),
              ]}
              onChange={handleChange("dsLoaiDichVu", onChange, _state)}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Tên Dịch Vụ</label>
            {/* <Select
              onChange={handleChange("dsDichVuId", onChange, _state)}
              value={_state.dsDichVuId}
              className="input-filter"
              placeholder={"Chọn dịch vụ"}
              mode="multiple"
              data={[{ id: "", ten: "Tất cả" }, ...(listAllDichVu || [])]}
            /> */}
            <SelectLoadMore
              api={dichVuProvider.searchAll}
              mapData={(i) => ({
                value: i.id,
                label: i.ten,
              })}
              onChange={onChange("dsDichVuId", true)}
              value={_state.dsDichVuId}
              keySearch={"ten"}
              placeholder={"Chọn dịch vụ"}
              className="input-filter"
              mode="multiple"
              hasAll={true}
              addParam={state.addParamDv}
              blurReset={true}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Nguồn người bệnh</label>
            <Select
              onChange={onChange("nguonNbId")}
              value={
                _state.nguonNbId === "" || _state.nguonNbId
                  ? _state.nguonNbId
                  : state.nguonNbId
              }
              className="input-filter"
              placeholder={"Chọn nguồn người bệnh"}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllNguonNguoiBenh || []),
              ]}
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
    dsNhanVienTiepDonId: _state.dsNhanVienTiepDonId,
    dsLoaiDichVu: _state.dsLoaiDichVu,
    dsDichVuId: _state.dsDichVuId,
    nguonNbId:
      _state.nguonNbId === "" || _state.nguonNbId
        ? _state.nguonNbId
        : state.nguonNbId,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.dsLoaiDichVu) {
        message.error("Vui lòng chọn loại dịch vụ");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="BC08. Báo cáo số lượng dịch vụ từ bệnh viện E"
        renderFilter={renderFilter}
        getBc={getBc08}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 30,
          dsNhanVienTiepDonId: [""],
          dsLoaiDichVu: [""],
          dsDichVuId: [""],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "Bc08", link: "/bao-cao/bc08" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    listLoaiDichVu: state.utils.listLoaiDichVu,
    listAllDichVu: state.dichVu.listAllDichVu || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
  }),
  ({
    baoCaoDaIn: { getBc08 },
    nhanVien: { getListAllNhanVien },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    dichVu: { getAllDichVu },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    thietLap: { getThietLap },
    utils: { getUtils },
  }) => ({
    getBc08,
    getUtils,
    getListAllNhanVien,
    getAllTongHopDichVuCap1,
    getAllDichVu,
    getListAllNguonNguoiBenh,
    getThietLap,
  })
)(Index);
