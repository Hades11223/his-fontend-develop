import React from "react";
import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import SelectLoadMore from "components/SelectLoadMore";
import { ENUM } from "constants/index";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { useEnum, useStore } from "hook";
import moment from "moment";
import ScreenPhieuLinh from "pages/quanLyNoiTru/components/ScreenPhieuLinh";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ModalTaoPhieuLinh = (
  { disabledLoaiNhapXuat, refModalTaoPhieuSuatAn, khoaLamViecId },
  ref
) => {
  const { t } = useTranslation();
  const [listLoaiDichVuKho] = useEnum(ENUM.LOAI_DICH_VU_KHO);
  const listLoaiDichVuKhoCustom = useMemo(
    () => [
      ...[90, 100].map((i) => listLoaiDichVuKho?.find((j) => j.id === i)),
      { id: 50, ten: "Suất ăn" },
    ],
    [listLoaiDichVuKho]
  );
  const [listLoaiPhieuLinh] = useEnum(ENUM.LOAI_PHIEU_LINH);
  const refModal = useRef(null);

  const listKhoCha = useStore("kho.listKhoCha", []);
  const listAllTuKho = useStore("kho.listAllKho", []);
  const { auth } = useSelector((state) => state.auth);
  const listRoom = useStore("phong.listRoom", []);
  const listThietLapChonKho = useStore(
    "thietLapChonKho.listThietLapChonKho",
    []
  );
  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);

  const history = useHistory();
  const [state, _setState] = useState({
    paramTuKho: {},
    listKhoTuTruc: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const {
    phong: { getListPhongTongHop },
    kho: { getListKhoCha, getAllTongHop },
    nhapKho: { taoPhieuLinhBu },
    thietLapChonKho: { getListThietLapChonKhoTongHop },
  } = useDispatch();

  const initState = useMemo(
    () => ({
      loaiDichVu: 90,
      tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
      denThoiGian: moment().set("hour", 23).set("minute", 59).set("second", 59),
      loaiNhapXuat: 85,
      dsKhoaChiDinhId:
        auth?.dsKhoaPhuTrachId.length < 2
          ? auth?.dsKhoaPhuTrachId[0]
          : khoaLamViecId,
    }),
    [auth?.dsKhoaPhuTrach, khoaLamViecId]
  );

  useEffect(() => {
    getListTuKho({});
    getListPhongTongHop();
    getListDenKho(initState);
  }, []);

  const getListTuKho = (payload) => {
    const paramTuKho = {
      ...state.paramTuKho,
      ...payload,
      dsCoCheDuyetPhat: 20,
    };
    setState({ paramTuKho });
    getAllTongHop(paramTuKho);
  };

  const getListDenKho = (_state) => {
    if (_state.loaiNhapXuat === 80 && _state.khoDoiUngId) {
      getListKhoCha({
        active: true,
        khoTrucThuocId: _state.khoDoiUngId,
      });
    } else if (_state.loaiNhapXuat === 85 && _state.loaiDichVu) {
      getListThietLapChonKhoTongHop({
        loaiDichVu: _state.loaiDichVu,
        noiTru: true,
        tuTruc: false,
        active: true,
      });
    }
  };

  const customChange = (key, onChange, _state) => (value) => {
    if (key === "loaiDichVu") {
      if (value === 50) {
        ref.current && ref.current.close();
        refModalTaoPhieuSuatAn.current && refModalTaoPhieuSuatAn.current.show();
        return;
      }
      if (_state.loaiNhapXuat === 80) {
        getListTuKho({ dsLoaiDichVu: value });
      }
      getListDenKho({ ..._state, [key]: value });

      onChange("khoDoiUngId")();
      onChange("khoId")();
    }

    if (key === "loaiNhapXuat" || key === "khoDoiUngId") {
      getListDenKho({ ..._state, [key]: value });
      onChange("khoId")();
    }
    if (
      key === "loaiNhapXuat" &&
      value === 80 &&
      _state.loaiDichVu !== state.paramTuKho.dsLoaiDichVu
    ) {
      getListTuKho({ dsLoaiDichVu: _state.loaiDichVu });
    }

    if (key === "dsKhoaChiDinhId") {
      if (_state.loaiNhapXuat === 80) {
        getListTuKho({ khoaQuanLyId: value });
      }
      getListDenKho({ ..._state, [key]: value });

      getListPhongTongHop({ khoaId: value });
      onChange("dsPhongId")([]);
    }
    onChange(key)(value);
  };

  const renderFilter = ({ _state, onChange }) => {
    return (
      <Row>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              Loại Hàng hóa<span className="icon-required">*</span>
            </label>
            <Select
              onChange={customChange("loaiDichVu", onChange, _state)}
              value={_state.loaiDichVu}
              className="input-filter"
              placeholder={"Chọn loại hàng hóa"}
              data={listLoaiDichVuKhoCustom}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              Loại lĩnh<span className="icon-required">*</span>
            </label>
            <Select
              disabled={disabledLoaiNhapXuat}
              onChange={customChange("loaiNhapXuat", onChange, _state)}
              value={_state.loaiNhapXuat}
              className="input-filter"
              placeholder={"Chọn loại lĩnh"}
              data={listLoaiPhieuLinh}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              Từ kho<span className="icon-required">*</span>
            </label>
            <Select
              disabled={_state.loaiNhapXuat === 85}
              onChange={customChange("khoDoiUngId", onChange, _state)}
              value={_state.khoDoiUngId}
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listAllTuKho}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              Đến kho<span className="icon-required">*</span>
            </label>
            <Select
              onChange={onChange("khoId")}
              value={_state.khoId}
              className="input-filter"
              placeholder={"Chọn kho"}
              data={
                _state.loaiNhapXuat === 85
                  ? listThietLapChonKho
                  : _state.loaiNhapXuat === 80
                  ? listKhoCha || []
                  : []
              }
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label className="label-filter">
              Lĩnh từ ngày
              <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime
              value={_state.tuThoiGian}
              onChange={onChange("tuThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              disabledDate={(date) => date > _state.denThoiGian}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label className="label-filter">
              Lĩnh đến ngày<span className="icon-required">*</span>
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
            <label className="label-filter">
              Khoa chỉ định<span className="icon-required">*</span>
            </label>
            <Select
              onChange={customChange("dsKhoaChiDinhId", onChange, _state)}
              value={_state.dsKhoaChiDinhId}
              className="input-filter"
              placeholder={"Chọn khoa"}
              data={listKhoaTheoTaiKhoan}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Phòng</label>
            <Select
              onChange={onChange("dsPhongId")}
              value={_state.dsPhongId}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn phòng"}
              data={listRoom}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">Mã bệnh án</label>
            <SelectLoadMore
              api={nbDotDieuTriProvider.getNbNoiTru}
              mapData={(i) => ({
                value: i.id,
                label: i.maBenhAn,
              })}
              onChange={onChange("nbDotDieuTriId")}
              value={_state.nbDotDieuTriId}
              keySearch={"maBenhAn"}
              placeholder={"Chọn mã"}
              className="input-filter"
              hasAll={true}
              // addParam={state.addParamDv}
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
      loaiNhapXuat: data.loaiNhapXuat,
      khoId: data.loaiNhapXuat === 85 ? data.khoId : data.khoDoiUngId,
      khoDoiUngId: data.loaiNhapXuat === 85 ? data.khoDoiUngId : data.khoId,
      tuThoiGian: data.tuThoiGian,
      denThoiGian: data.denThoiGian,
      dsKhoaChiDinhId: data.dsKhoaChiDinhId
        ? [data.dsKhoaChiDinhId]
        : undefined,
      dsPhongId: data.dsPhongId?.length > 0 ? data.dsPhongId : undefined,
      nbDotDieuTriId: data.nbDotDieuTriId,
    };
    return taoPhieuLinhBu(body);
  };

  const afterSubmit = (data) => {
    if (data?.id) {
      if (data.loaiNhapXuat === 80) {
        history.push("/kho/xuat-kho/chi-tiet-linh-bu/" + data.id);
      } else history.push("/quan-ly-noi-tru/chi-tiet-phieu-linh/" + data.id);
    }
  };

  return (
    <ScreenPhieuLinh.ModalCreate
      width={600}
      title="Tạo phiếu lĩnh"
      renderFilter={renderFilter}
      initState={initState}
      ref={ref}
      onSubmit={onOk}
      afterSubmit={afterSubmit}
    ></ScreenPhieuLinh.ModalCreate>
  );
};

export default forwardRef(ModalTaoPhieuLinh);
