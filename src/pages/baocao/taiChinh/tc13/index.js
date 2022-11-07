import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { TRANG_THAI_PHIEU_THU } from "pages/baocao/utils";

const Index = ({
  listDoiTuongKcb,
  listAllKhoa,
  listToaNha,
  listAllPhuongThucThanhToan,

  getListAllKhoa,
  getUtils,
  getTc13,
  getListAllToaNha,
  getListAllNhanVien,
  getListAllPhuongThucThanhToan,
  ...props
}) => {
  const listAllNhanVien = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(props.listAllNhanVien || []).map((item) => ({
        ...item,
        ten: `${item.taiKhoan || ""}_${item.ma}_${item.ten}`,
      })),
    ];
  }, [props.listAllNhanVien]);

  useEffect(() => {
    getUtils({ name: "DoiTuongKcb" });
    getListAllKhoa({});
    getListAllToaNha({});
    getListAllNhanVien({});
    getListAllPhuongThucThanhToan({});
  }, []);

  const onCustomChange = (key, onChange) => (e) => {
    // console.log("log", e);
    if (key === "dsTrangThai") {
      if (e === 40) onChange("dsTrangThai")([40, 50]);
      else onChange("dsTrangThai")(e);
    }
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <Row>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                Từ ngày tạm ứng<span className="red required">*</span>
              </label>
              <DatePicker
                // showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.tuThoiGian}
                onChange={onChange("tuThoiGian")}
                placeholder="Chọn ngày"
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.tuThoiGian && (
                <div className="error">Vui lòng chọn thời gian từ ngày!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                Đến ngày tạm ứng<span className="red required">*</span>
              </label>
              <DatePicker
                // showTime={{ defaultValue: moment().endOf("day") }}
                value={_state.denThoiGian}
                onChange={onChange("denThoiGian")}
                placeholder="Chọn ngày"
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.denThoiGian && (
                <div className="error">Vui lòng chọn thời gian đến ngày!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Đối tượng người bệnh</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={"Chọn đối tượng người bệnh"}
                data={[{ id: "", ten: "Tất cả" }, ...listDoiTuongKcb]}
                onChange={onChange("dsDoiTuongKcb", true)}
                value={_state.dsDoiTuongKcb}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Khoa người bệnh</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={"Chọn khoa người bệnh"}
                data={[{ id: "", ten: "Tất cả" }, ...listAllKhoa]}
                onChange={onChange("dsKhoaId", true)}
                value={_state.dsKhoaId}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Nhà</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={"Chọn toà nhà"}
                data={[{ id: "", ten: "Tất cả" }, ...listToaNha]}
                onChange={onChange("dsToaNhaId", true)}
                value={_state.dsToaNhaId}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Thu Ngân</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={"Chọn thu ngân"}
                data={listAllNhanVien}
                onChange={onChange("dsThuNgan", true)}
                value={_state.dsThuNgan}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Hình thức thu</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={"Chọn khoa hiện tại"}
                data={[
                  { id: "", ten: "Tất cả" },
                  ...listAllPhuongThucThanhToan,
                ]}
                onChange={onChange("dsPtttId", true)}
                value={_state.dsPtttId}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Trạng thái phiếu thu</label>
              <Select
                className="input-filter"
                placeholder={"Chọn trạng thái phiếu thu"}
                data={[{ id: "", ten: "Tất cả" },
                ...TRANG_THAI_PHIEU_THU]}
                onChange={onCustomChange("dsTrangThai", onChange)}
                value={_state.dsTrangThai}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    dsDoiTuongKcb: _state.dsDoiTuongKcb,
    dsKhoaId: _state.dsKhoaId,
    dsToaNhaId: _state.dsToaNhaId,
    dsThuNganId: _state.dsThuNgan,
    dsPtttId: _state.dsPtttId,
    dsTrangThai: _state.dsTrangThai,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="TC13. Báo cáo danh sách người bệnh tạm ứng"
        renderFilter={renderFilter}
        getBc={getTc13}
        handleDataSearch={handleDataSearch}
        initState={{
          dsDoiTuongKcb: [""],
          dsKhoaId: [""],
          dsToaNhaId: [""],
          dsThuNgan: [""],
          dsPtttId: [""],
          dsTrangThai: [40, 50],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC13", link: "/bao-cao/tc13" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
    listAllKhoa: state.khoa.listAllKhoa || [],
    listToaNha: state.toaNha.listAllToaNha || [],
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    listAllPhuongThucThanhToan:
      state.phuongThucTT.listAllPhuongThucThanhToan || [],
  }),
  ({
    utils: { getUtils },
    baoCaoDaIn: { getTc13 },
    khoa: { getListAllKhoa },
    toaNha: { getListAllToaNha },
    nhanVien: { getListAllNhanVien },
    phuongThucTT: { getListAllPhuongThucThanhToan },
  }) => ({
    getUtils,
    getTc13,
    getListAllKhoa,
    getListAllToaNha,
    getListAllNhanVien,
    getListAllPhuongThucThanhToan,
  })
)(Index);
