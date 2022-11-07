import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { t } from "i18next";
import { useEnum, useListAll, useStore } from "hook";
import { ENUM } from "constants/index";

const PTTT01 = () => {
  const {
    baoCaoDaIn: { getPttt01 },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
  } = useDispatch();

  const [listAllKhoa] = useListAll("khoa");
  const [listLoaiDoiTuong] = useListAll("loaiDoiTuong");
  const [listdoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listAllNhanVien] = useListAll("nhanVien");
  const [listLoaiPtTt] = useEnum(ENUM.LOAI_PTTT);
  const [listPhanLoaiPTTT] = useEnum(ENUM.PHAN_LOAI_PTTT);
  const [listLoaiThoiGian] = useEnum(ENUM.LOAI_THOI_GIAN);

  const listAllNhomDichVuCap1 = useStore(
    "nhomDichVuCap1.listAllNhomDichVuCap1",
    []
  );

  useEffect(() => {
    getAllTongHopDichVuCap1({
      active: true,
      page: "",
      size: "",
      dsMaThietLap: ["MA_NHOM_DICH_VU_CAP1_PT", "MA_NHOM_DICH_VU_CAP1_TT"],
    });
  }, []);

  const listAllLoaiThoiGian = useMemo(() => {
    return listLoaiThoiGian.filter((x) => [30, 40, 90].includes(x.id));
  }, [listLoaiThoiGian]);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              {t("baoCao.tuNgay")}
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.tuNgay}
              onChange={onChange("tuNgay")}
              placeholder={t("baoCao.chonNgay")}
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">{t("baoCao.chonTuNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              {t("baoCao.denNgay")}
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().endOf("day") }}
              value={_state.denNgay}
              onChange={onChange("denNgay")}
              placeholder={t("baoCao.chonNgay")}
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">{t("baoCao.chonDenNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaThucHien")}</label>
            <Select
              onChange={onChange("dsKhoaThucHienId")}
              value={_state.dsKhoaThucHienId}
              className="input-filter"
              placeholder={t("baoCao.khoaThucHien")}
              data={listAllKhoa}
              mode="multiple"
              showArrow
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaChiDinh")}</label>
            <Select
              onChange={onChange("dsKhoaChiDinhId")}
              value={_state.dsKhoaChiDinhId}
              className="input-filter"
              placeholder={t("baoCao.khoaChiDinh")}
              data={listAllKhoa}
              mode="multiple"
              showArrow
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.loaiDoiTuong")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.loaiDoiTuong")}
              data={listLoaiDoiTuong}
              onChange={onChange("dsLoaiDoiTuongId")}
              value={_state.dsLoaiDoiTuongId}
              mode="multiple"
              showArrow
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.nguoiBenh")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.nguoiBenh")}
              data={listdoiTuongKcb}
              onChange={onChange("dsDoiTuongKcb")}
              value={_state.dsDoiTuongKcb}
              mode="multiple"
              showArrow
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.ptvChinh")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.ptvChinh")}
              data={listAllNhanVien}
              onChange={onChange("dsNguoiThucHienId")}
              value={_state.dsNguoiThucHienId}
              mode="multiple"
              showArrow
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.pvt1")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.pvt1")}
              data={listAllNhanVien}
              onChange={onChange("dsPtv1Id")}
              value={_state.dsPtv1Id}
              mode="multiple"
              showArrow
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.loaiPttt")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.loaiPttt")}
              data={[{ id: "", ten: "Tất cả" }, ...listLoaiPtTt]}
              onChange={onChange("dsLoaiPttt")}
              value={_state.dsLoaiPttt}
              defaultValue=""
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.phanLoaiPttt")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.phanLoaiPttt")}
              data={[{ id: "", ten: "Tất cả" }, ...listPhanLoaiPTTT]}
              onChange={onChange("dsPhanLoaiPttt")}
              value={_state.dsPhanLoaiPttt}
              defaultValue=""
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.nhomDv")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.nhomDv")}
              data={[{ id: "", ten: "Tất cả" }, ...listAllNhomDichVuCap1]}
              onChange={onChange("dsNhomDichVuCap1Id")}
              value={_state.dsNhomDichVuCap1Id}
              defaultValue=""
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.theoThoiGian")}{" "}
              <span className="icon-required"> *</span>
            </label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.theoThoiGian")}
              data={listAllLoaiThoiGian}
              onChange={onChange("loaiThoiGian")}
              value={_state.loaiThoiGian}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => {
    return {
      tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      dsDoiTuongKcb: _state?.dsDoiTuongKcb,
      dsKhoaChiDinhId: _state?.dsKhoaChiDinhId,
      loaiThoiGian: _state?.loaiThoiGian,
      dsLoaiDoiTuongId: _state?.dsLoaiDoiTuongId,
      dsKhoaThucHienId: _state?.dsKhoaThucHienId,
      dsNguoiThucHienId: _state?.dsNguoiThucHienId,
      dsPtv1Id: _state?.dsPtv1Id,
      dsLoaiPttt: _state?.dsLoaiPttt,
      dsPhanLoaiPttt: _state?.dsPhanLoaiPttt,
      dsNhomDichVuCap1Id: _state?.dsNhomDichVuCap1Id,
    };
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.loaiThoiGian) {
        message.error(t("baoCao.vuiLongChonTheoThoiGian"));
        return false;
      }
      return _beforeOk();
    };

  return (
    <BaseBaoCao
      title={t("baoCao.pttt01")}
      renderFilter={renderFilter}
      getBc={getPttt01}
      handleDataSearch={handleDataSearch}
      breadcrumb={[{ title: "Pttt01", link: "/bao-cao/pttt-01" }]}
      initState={{
        loaiThoiGian: 30,
      }}
      beforeOk={beforeOk}
    />
  );
};

export default PTTT01;
