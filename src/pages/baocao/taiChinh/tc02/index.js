import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { LOAI_PHIEU_THU, TRANG_THAI_HOA_DON } from "pages/baocao/utils";
import { Main } from "./styled";

/**
 * TC02. Bảng tổng hợp chi tiết thu chi theo thu ngân
 *
 */

const TC02 = ({
  listLoaiThoiGian,
  listDoiTuong,
  nhanVienId,

  getTc02,
  getThietLap,
  getListAllNhanVien,
  getUtils,
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
    getThietLap({ ma: "MA_THU_NGAN" }).then((dsMaVaiTro) => {
      getListAllNhanVien({ dsMaVaiTro });
    });
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "LoaiThoiGian" });
  }, []);

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
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">Vui lòng chọn thời gian từ ngày!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
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
              Thu ngân<span className="required">*</span>
            </label>
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
            <label className="label-filter">Đối tượng</label>
            <Select
              className="input-filter"
              placeholder={"Chọn đối tượng"}
              value={_state.doiTuong}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              onChange={onChange("doiTuong")}
            />
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
    loaiThoiGian: _state.loaiThoiGian,
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    thuNganId: _state.thuNganId,
    doiTuong: _state.doiTuong,
    nhaThuoc: _state.nhaThuoc,
    phatHanhHoaDon: _state.phatHanhHoaDon,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.thuNganId && _state.thuNganId !== "") {
        message.error("Vui lòng chọn thu ngân");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="TC02. Bảng tổng hợp chi tiết thu chi theo thu ngân"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getTc02}
        handleDataSearch={handleDataSearch}
        initState={{ thuNganId: nhanVienId, doiTuong: "", nhaThuoc: false }}
        breadcrumb={[{ title: "TC02", link: "/bao-cao/tc02" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    nhanVienId: state.auth?.auth?.nhanVienId,
  }),
  ({
    thietLap: { getThietLap },
    nhanVien: { getListAllNhanVien },
    utils: { getUtils },
    baoCaoDaIn: { getTc02 },
  }) => ({
    getTc02,
    getThietLap,
    getListAllNhanVien,
    getUtils,
  })
)(TC02);
