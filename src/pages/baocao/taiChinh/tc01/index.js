import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { LOAI_PHIEU_THU, TRANG_THAI_HOA_DON } from "../../utils";
import { Main } from "./styled";

/**
 * TC01. Báo cáo tổng hợp thu tiền người bệnh
 *
 */

const Index = ({
  listLoaiThoiGian = [],
  listDoiTuong,
  listDoiTuongKcb,
  listAllNguoiGioiThieu,
  listAllNguonNguoiBenh,
  nhanVienId,

  getListAllNguoiGioiThieu,
  getListAllNguonNguoiBenh,
  getUtils,
  getThietLap,
  getListAllNhanVien,
  getTc01,
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
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "DoiTuongKcb" });
    getListAllNguoiGioiThieu({});
    getListAllNguonNguoiBenh({});
    getThietLap({ ma: "MA_THU_NGAN" }).then((dsMaVaiTro) => {
      getListAllNhanVien({ dsMaVaiTro }).then((res) => {});
    });
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Theo thời gian
              <span className="icon-required"> *</span>
            </label>
            <Select
              onChange={onChange("loaiThoiGian")}
              value={_state.loaiThoiGian}
              className="input-filter select"
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
        <Col md={8} xl={8} xxl={8}>
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
            <label
              className="label-filter"
              onClick={() =>
                openInNewTab("/danh-muc/nguon-nguoi-benh?active=1&tab=2")
              }
            >
              Nguồn giới thiệu
            </label>
            <Select
              onChange={onChange("nguonNbId")}
              value={_state.nguonNbId}
              className="input-filter"
              placeholder={"Chọn nguồn giới thiệu"}
              data={listAllNguonNguoiBenh}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
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

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Đối tượng khám chữa bệnh</label>
            <Select
              onChange={onChange("doiTuongKcb")}
              value={_state.doiTuongKcb}
              className="input-filter"
              placeholder={"Đối tượng khám chữa bệnh"}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuongKcb || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label
              className="label-filter"
              onClick={() =>
                openInNewTab(
                  `/danh-muc/nguon-nguoi-benh?active=1&tab=1&nguonNbId=${_state.nguonNbId}`
                )
              }
            >
              Người giới thiệu
            </label>
            <Select
              onChange={onChange("nguoiGioiThieuId")}
              value={_state.nguoiGioiThieuId}
              className="input-filter"
              placeholder={"Chọn người giới thiệu"}
              data={listAllNguoiGioiThieu}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Thu ngân</label>
            <Select
              onChange={onChange("thuNganId")}
              value={_state.thuNganId}
              className="input-filter"
              placeholder={"Chọn thu ngân"}
              data={listAllNhanVien}
            />
            {_state.clickedSubmit && !_state.thuNganId && (
              <div className="error">Vui lòng chọn thu ngân!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
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
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">Trạng thái hóa đơn</label>
            <Select
              onChange={onChange("phatHanhHoaDon")}
              value={_state.phatHanhHoaDon}
              className="input-filter"
              placeholder={"Chọn trạng thái"}
              data={TRANG_THAI_HOA_DON}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    nguonNbId: _state.nguonNbId,
    nguoiGioiThieuId: _state.nguoiGioiThieuId,
    doiTuong: _state.doiTuong,
    doiTuongKcb: _state.doiTuongKcb,
    loaiThoiGian: _state.loaiThoiGian,
    thuNganId: _state.thuNganId,
    nhaThuoc: _state.nhaThuoc,
    phatHanhHoaDon: _state.phatHanhHoaDon,
  });

  return (
    <Main>
      <BaseBaoCao
        title="TC01. Báo cáo tổng hợp thu tiền người bệnh"
        renderFilter={renderFilter}
        getBc={getTc01}
        handleDataSearch={handleDataSearch}
        initState={{
          thuNganId: nhanVienId,
          nhaThuoc: false,
        }}
        breadcrumb={[{ title: "TC01", link: "/bao-cao/tc01" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian,
    listDoiTuong: state.utils.listDoiTuong || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
    listAllNguoiGioiThieu: state.nguoiGioiThieu.listAllNguoiGioiThieu || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
    listLoaiThoiGian: state.utils.listLoaiThoiGian,
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    nhanVienId: state.auth?.auth?.nhanVienId,
  }),
  ({
    utils: { getUtils },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    nguoiGioiThieu: { getListAllNguoiGioiThieu },
    thietLap: { getThietLap },
    nhanVien: { getListAllNhanVien },
    baoCaoDaIn: { getTc01 },
  }) => ({
    getUtils,
    getListAllNguonNguoiBenh,
    getListAllNguoiGioiThieu,
    getThietLap,
    getListAllNhanVien,
    getTc01,
  })
)(Index);
