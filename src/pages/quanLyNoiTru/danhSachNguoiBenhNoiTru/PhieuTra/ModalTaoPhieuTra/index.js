import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import React, { forwardRef, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useEnum, useStore } from "hook";
import { TEN_CO_CHE_DUYET_PHAT, ENUM, TEN_LOAI_DICH_VU } from "constants/index";
import SelectLoadMore from "components/SelectLoadMore";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { useTranslation } from "react-i18next";
import ScreenPhieuTra from "pages/quanLyNoiTru/components/ScreenPhieuTra";
import { useHistory } from "react-router-dom";

const ModalTaoPhieuTra = ({ khoaLamViec, refModalTaoPhieuTraSuatAn }, ref) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [listLoaiDichVuKho] = useEnum(ENUM.LOAI_DICH_VU_KHO);

  const refModal = useRef(null);

  const listRoom = useStore("phong.listRoom", []);

  const listThietLapChonKho = useStore(
    "thietLapChonKho.listThietLapChonKho",
    []
  );
  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);

  const {
    phong: { getListPhongTongHop },
    nhapKho: { taoPhieuTraBu },
    thietLapChonKho: { getListThietLapChonKhoTongHop },
  } = useDispatch();

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => _setState((state) => ({ ...state, ...data }));

  useEffect(() => {
    getListDenKho(initState);

    if (khoaLamViec?.id) {
      getListPhongTongHop({ khoaId: khoaLamViec.id });
    }
  }, []);

  const getListDenKho = (_state) => {
    getListThietLapChonKhoTongHop({
      loaiDichVu: _state.loaiDichVu,
      noiTru: true,
      tuTruc: false,
      active: true,
    });
  };

  const onCustomChange = (key, onChange, _state) => (value) => {
    if (key === "loaiDichVu") {
      if (value === 50) {
        ref.current && ref.current.close();

        refModalTaoPhieuTraSuatAn.current &&
          refModalTaoPhieuTraSuatAn.current.show();
        return;
      }

      getListDenKho({ ..._state, [key]: value });
      onChange("loaiDichVu")(value);
    }

    if (key === "dsKhoaChiDinhId") {
      onChange("dsKhoaChiDinhId")(value);
      getListPhongTongHop({ khoaId: value });
    }
  };

  const renderFilter = ({ _state, onChange }) => {
    return (
      <Row>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              {t("quanLyNoiTru.loaiHangHoa")}
              <span className="icon-required">*</span>
            </label>
            <Select
              // onChange={onChange("loaiDichVu")}
              onChange={onCustomChange("loaiDichVu", onChange, _state)}
              value={_state.loaiDichVu}
              className="input-filter"
              placeholder={t("quanLyNoiTru.chonLoaiHangHoa")}
              data={[...listLoaiDichVuKho, { ten: "Suất ăn", id: 50 }]}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              {t("quanLyNoiTru.khoaTra")}
              <span className="icon-required">*</span>
            </label>
            <Select
              // mode="multiple"
              onChange={onCustomChange("dsKhoaChiDinhId", onChange)}
              value={_state.dsKhoaChiDinhId}
              className="input-filter"
              placeholder={t("quanLyNoiTru.chonKhoa")}
              data={listKhoaTheoTaiKhoan}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              {t("quanLyNoiTru.denkho")}
              <span className="icon-required">*</span>
            </label>
            <Select
              onChange={onChange("khoId")}
              value={_state.khoId}
              className="input-filter"
              placeholder={t("quanLyNoiTru.chonKho")}
              data={listThietLapChonKho}
            />
          </div>
        </Col>

        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">{t("common.phong")}</label>
            <Select
              onChange={onChange("dsPhongId")}
              value={_state.dsPhongId}
              className="input-filter"
              mode="multiple"
              placeholder={t("common.chonPhong")}
              data={listRoom}
              disabled={!_state.dsKhoaChiDinhId}
            />
          </div>
        </Col>

        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label className="label-filter">
              {t("quanLyNoiTru.traTuNgay")}
              <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime
              value={_state.tuThoiGian}
              onChange={onChange("tuThoiGian")}
              placeholder={t("common.chonNgay")}
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              disabledDate={(date) => date > _state.denThoiGian}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label className="label-filter">
              {t("quanLyNoiTru.traDenNgay")}{" "}
              <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime
              value={_state.denThoiGian}
              onChange={onChange("denThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              disabledDate={(date) => date < _state.tuThoiGian}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">{t("quanLyNoiTru.maBenhAn")}</label>
            <SelectLoadMore
              api={nbDotDieuTriProvider.getNbNoiTru}
              mapData={(i) => ({
                value: i.id,
                label: i.maBenhAn,
              })}
              onChange={onChange("maHoSo")}
              value={_state.maHoSo}
              keySearch={"maBenhAn"}
              placeholder={t("quanLyNoiTru.chonMa")}
              className="input-filter"
              hasAll={true}
              blurReset={true}
            />
          </div>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOk = (data) => {
    if (!data.loaiDichVu) {
      message.error("Vui lòng chọn loại hàng hóa");
      return;
    }
    const body = {
      loaiDichVu: data.loaiDichVu,
      khoId: data.khoId,
      tuThoiGian: data.tuThoiGian,
      denThoiGian: data.denThoiGian,
      dsKhoaChiDinhId: data.dsKhoaChiDinhId
        ? [data.dsKhoaChiDinhId]
        : undefined,
      dsPhongId: data.dsPhongId?.length > 0 ? data.dsPhongId : undefined,
      maHoSo: data.maHoSo,
    };

    return taoPhieuTraBu(body);
  };

  const initState = useMemo(
    () => ({
      loaiDichVu: 90,
      tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
      denThoiGian: moment().set("hour", 23).set("minute", 59).set("second", 59),
      dsKhoaChiDinhId: khoaLamViec?.id,
    }),
    [khoaLamViec?.id]
  );

  const afterSubmit = (data) => {
    if (data?.id) {
      history.push("/quan-ly-noi-tru/chi-tiet-phieu-tra/" + data.id);
    }
  };

  return (
    <ScreenPhieuTra.ModalCreate
      width={600}
      title="Tạo phiếu trả"
      renderFilter={renderFilter}
      initState={initState}
      ref={ref}
      onSubmit={onOk}
      afterSubmit={afterSubmit}
    ></ScreenPhieuTra.ModalCreate>
  );
};

export default forwardRef(ModalTaoPhieuTra);
