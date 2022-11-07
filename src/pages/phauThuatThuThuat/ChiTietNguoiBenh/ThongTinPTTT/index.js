import { Checkbox, Col, DatePicker, Input, InputNumber, Row } from "antd";
import { InputTimeout, Select } from "components";
import ElementFilter from "components/common/ElementFilter";
import ImageEdit from "components/ImageEdit";
import SelectLoadMore from "components/SelectLoadMore";
import dichVuKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import useThongTinNb from "../hook/useThongTinNb";
import moment from "moment";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import {
  DOI_TUONG_KCB,
  ENUM,
  LOAI_DICH_VU,
  TRANG_THAI_DICH_VU,
  TRANG_THAI_HOAN,
} from "constants/index";
import { useEnum, useStore } from "hook";
import { useParams } from "react-router-dom";

const mapData = (i) => ({
  value: i.dichVuId,
  label: i.ten,
  ma: i.ma,
});

const ThongTinPTTT = () => {
  const [thongTinNb] = useThongTinNb();
  const { id } = useParams();

  const { dataDetail } = useSelector((state) => state.pttt);
  const [listPhanLoaiPTTT] = useEnum(ENUM.PHAN_LOAI_PTTT);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listLoaiPtTt] = useEnum(ENUM.LOAI_PTTT);
  const { listKhoaTheoTaiKhoan } = useSelector((state) => state.khoa);
  const { listAllPhuongPhapGayMe } = useSelector(
    (state) => state.phuongPhapGayMe
  );
  const { listAllPhauThuatVien } = useSelector((state) => state.nhanVien);
  const listAllMauKetQuaPTTT = useStore(
    "mauKetQuaPTTT.listAllMauKetQuaPTTT",
    []
  );
  const dataToDieuTri = useStore("toDieuTri.currentToDieuTri", {});
  const dichVuCha = useStore("pttt.dichVuCha", {});
  const {
    pttt: { updateData, updateThongTinPTTT, themThongTin, getDichVuCha },
    mauKetQuaPTTT: { getListAllMauKetQuaPTTT },
  } = useDispatch();

  // console.log("dataDetail", dataDetail);

  const disabledAll = useMemo(
    // () => [25, 35, 43, 115].some((i) => i === dataDetail.trangThai),
    () => dataDetail.trangThai !== 63 || dataDetail?.trangThaiHoan === 40,
    [dataDetail.trangThai, dataDetail.khongThucHien]
  );

  useEffect(() => {
    getListAllMauKetQuaPTTT({
      active: true,
      page: "",
      size: "",
      loaiDichVu: LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
    });
    return () => {
      updateData({ dataDetail: {} });
    };
  }, []);

  useEffect(() => {
    if (
      dataDetail?.id &&
      dataDetail?.chiDinhTuLoaiDichVu === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
    ) {
      getDichVuCha(dataDetail.chiDinhTuDichVuId);
    } else {
      updateData({ dichVuCha: null });
    }
  }, [dataDetail?.id]);

  const { t } = useTranslation();

  // console.log("disabledAll", dataDetail);

  const disableDichVu = useMemo(() => {
    if (dataDetail.trangThaiHoan === TRANG_THAI_HOAN.KHONG_THUC_HIEN)
      return true;
    if (dataDetail.phauThuat || thongTinNb.noiTru) {
      return (
        ![
          TRANG_THAI_DICH_VU.CHO_TIEP_NHAN,
          TRANG_THAI_DICH_VU.DA_TIEP_NHAN,
        ].includes(dataDetail.trangThai) || dataDetail?.thanhToan
      );
    } else {
      return (
        ![TRANG_THAI_DICH_VU.CHO_TIEP_NHAN].includes(dataDetail.trangThai) ||
        dataDetail?.thanhToan
      );
    }
  }, [
    dataDetail.trangThai,
    dataDetail.phauThuat,
    thongTinNb,
    dataDetail.khongThucHien,
  ]);

  const listBacSi = useMemo(
    () =>
      listAllPhauThuatVien
        ?.map((i) => i.id)
        .includes(dataDetail?.bacSiChiDinhId)
        ? listAllPhauThuatVien || []
        : [
            {
              id: dataDetail?.bacSiChiDinhId,
              ten: dataDetail?.tenBacSiChiDinh,
            },
            ...(listAllPhauThuatVien || []),
          ],
    [listAllPhauThuatVien, dataDetail?.bacSiChiDinhId]
  );

  const onChange = useCallback(
    (key) => (e, data) => {
      const value = e?.hasOwnProperty("target")
        ? e?.target?.type === "checkbox"
          ? e?.target?.checked
          : e?.target?.value
        : e?.hasOwnProperty("_d")
        ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
        : e;
      if (key === "dichVuId") {
        updateThongTinPTTT({ [key]: value, maDichVu: data?.ma });
      } else {
        updateThongTinPTTT({ [key]: value });
      }
    },
    []
  );

  const addValue = useMemo(
    () => ({
      value: dataDetail?.dichVuId,
      label: dataDetail?.tenDichVu,
    }),
    [dataDetail]
  );
  const addParam = useMemo(
    () => ({
      active: true,
      khoaChiDinhId: dataDetail.khoaThucHienId,
      loaiDichVu: 40,
      dsDoiTuongSuDung:
        thongTinNb?.doiTuongKcb === DOI_TUONG_KCB.NGOAI_TRU ? 20 : 30,
    }),
    [dataDetail?.id, thongTinNb]
  );
  const onChangeMauKetQua = (e, item) => {
    let data = item?.lists;
    updateThongTinPTTT({
      cachThuc: data?.cachThuc,
      phuongPhap: data?.phuongThuc,
      chanDoan: data?.chanDoan,
      ketLuan: data?.ketLuan,
      phuongPhapGayMeId: data?.phuongPhapGayMeId,
    });
  };

  const onChangeLoaiPttt = (e) => {
    let payload = { id: id, loaiPtTt: e };
    themThongTin(payload);
  };

  const onDisabledDate = (d) => {
    if (
      [
        DOI_TUONG_KCB.DIEU_TRI_NGOAI_TRU,
        DOI_TUONG_KCB.DIEU_TRI_NOI_TRU,
        DOI_TUONG_KCB.DIEU_TRI_NOI_TRU_BAN_NGAY,
      ].includes(thongTinNb.doiTuongKcb) &&
      dataDetail.chiDinhTuLoaiDichVu === LOAI_DICH_VU.TO_DIEU_TRI
    ) {
      return (
        d >= moment(dataDetail?.thoiGianKetThuc) ||
        d <= moment(dataToDieuTri?.thoiGianYLenh)
      );
    } else {
      return d > moment(dataDetail.thoiGianKetThuc);
    }
  };
  const renderFilter = () => {
    return (
      <Row>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.maDichVu")}</label>
            <Input
              value={dataDetail?.maDichVu}
              className="input-filter"
              disabled
            />
          </div>
        </Col>
        <Col md={16} xl={16} xxl={16}>
          <div className="item-select p-relative">
            <label className="label-filter">{t("pttt.tenDichVu")}</label>
            {addParam?.khoaChiDinhId && thongTinNb?.id && (
              <SelectLoadMore
                api={dichVuKyThuatProvider.searchAll}
                mapData={mapData}
                addParam={addParam}
                onChange={onChange("dichVuId")}
                value={dataDetail.dichVuId}
                addValue={addValue}
                keySearch={"ten"}
                placeholder={t("pttt.chonDichVu")}
                className="input-filter"
                disabled={disableDichVu}
              />
            )}
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.trangThai")}</label>
            <Select
              value={dataDetail?.trangThai}
              className="input-filter"
              placeholder={t("pttt.trangThai")}
              data={listTrangThaiDichVu}
              disabled
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.tyLeThanhToan")}</label>
            <InputNumber
              className="input-filter"
              formatter={(value) => `${Math.round(value)}%`}
              parser={(value) => value.replace("%", "")}
              min={1}
              max={100}
              value={dataDetail?.tyLeTtDv}
              onChange={onChange("tyLeTtDv")}
              disabled={!dichVuCha.phauThuat}
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.thanhTien")}</label>
            <Input
              disabled
              value={(dataDetail?.thanhTien || 0)?.formatPrice()}
              className="input-filter"
            />
          </div>
        </Col>
        <Col md={5} xl={5} xxl={5}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.khoaChiDinh")}</label>
            <Select
              disabled
              className="input-filter"
              value={dataDetail.khoaChiDinhId}
              data={listKhoaTheoTaiKhoan}
            />
          </div>
        </Col>
        <Col md={5} xl={5} xxl={5}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.bacSiChiDinh")}</label>
            <Select
              disabled
              className="input-filter"
              placeholder={t("pttt.chonBacSiChiDinh")}
              value={dataDetail?.bacSiChiDinhId}
              data={listBacSi}
            />
          </div>
        </Col>
        <Col md={3} xl={3} xxl={3}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.loaiPttt")}</label>
            <Select
              data={listLoaiPtTt}
              value={dataDetail?.loaiPtTt}
              className="input-filter"
              onChange={onChangeLoaiPttt}
            />
          </div>
        </Col>
        <Col md={3} xl={3} xxl={3}>
          <div className="item-select checkbox-pl f-end">
            <Checkbox checked={dataDetail?.khongThucHien} />
            <label style={{ marginLeft: "4px" }}>
              {t("pttt.khongPhauThuat")}
            </label>
          </div>
        </Col>

        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">
              {t("pttt.thoiGianBatDauPttt")}
            </label>
            <DatePicker
              format={"DD/MM/YYYY HH:mm:ss"}
              className="input-filter"
              placeholder={t("pttt.chonThoiGian")}
              showTime
              value={
                dataDetail?.thoiGianThucHien
                  ? moment(dataDetail?.thoiGianThucHien)
                  : null
              }
              disabledDate={onDisabledDate}
              onChange={onChange("thoiGianThucHien")}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-select">
            <label className="label-filter">
              {t("pttt.thoiGianKetThucPttt")}
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              format={"DD/MM/YYYY HH:mm:ss"}
              className="input-filter"
              placeholder={t("pttt.chonThoiGian")}
              showTime
              disabledDate={(d) => d < moment(dataDetail.thoiGianThucHien)}
              value={
                dataDetail?.thoiGianKetThuc
                  ? moment(dataDetail?.thoiGianKetThuc)
                  : null
              }
              onChange={onChange("thoiGianKetThuc")}
              disabled={disabledAll}
            />
          </div>
        </Col>
        {/* <Col md={2} xl={2} xxl={2}>
          <div className="item-select">
            <TimePicker
              className="input-filter mt-22"
              placeholder={"Chọn thời gian"}
              value={
                dataDetail?.thoiGianKetThuc
                  ? moment(dataDetail?.thoiGianKetThuc)
                  : null
              }
              onChange={onChange("thoiGianKetThuc", true)}
            />
          </div>
        </Col> */}

        <Col md={3} xl={3} xxl={3}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.phanLoaiPTTT")}</label>
            <Select
              value={dataDetail?.phanLoai}
              className="input-filter"
              placeholder={t("pttt.chonLoaiPttt")}
              data={listPhanLoaiPTTT}
              onChange={onChange("phanLoai")}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={7} xl={7} xxl={7}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.phuongPhapGayMe")}</label>
            <Select
              value={dataDetail.phuongPhapGayMeId}
              className="input-filter"
              placeholder={t("pttt.chonPhuongPhap")}
              data={listAllPhuongPhapGayMe}
              onChange={onChange("phuongPhapGayMeId")}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.mauKetQua")}</label>
            <Select
              className="input-filter"
              placeholder={t("pttt.chonMauKetQua")}
              data={listAllMauKetQuaPTTT}
              onChange={onChangeMauKetQua}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              {t("pttt.chanDoanTruocPttt")}
            </label>
            <Input.TextArea
              rows={3}
              className="input-filter"
              placeholder={t("pttt.nhapChanDoanTruocPhauThuat")}
              value={dataDetail?.cdChinh}
              disabled
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.chanDoanSauPttt")}</label>
            <Input.TextArea
              rows={3}
              className="input-filter"
              placeholder={t("pttt.nhapChanDoanSauPhauThuat")}
              value={dataDetail?.chanDoan}
              onChange={onChange("chanDoan")}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.phuongPhapPttt")}</label>
            <Input.TextArea
              rows={3}
              className="input-filter"
              placeholder={t("pttt.nhapPhuongPhapPhauThuat")}
              value={dataDetail?.phuongPhap}
              onChange={onChange("phuongPhap")}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.ketLuan")}</label>
            <Input.TextArea
              rows={3}
              className="input-filter"
              placeholder={t("pttt.nhapKetLuan")}
              value={dataDetail?.ketLuan}
              onChange={onChange("ketLuan")}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select h-100">
            <label className="label-filter">{t("pttt.luocDoPttt")}</label>
            <div className="input-filter cal-height">
              <div
                className={`contain-img ${
                  dataDetail.phauThuat ? "img-pt" : "img-tt"
                } ${dataDetail.luocDo ? "" : "bg-gray"}`}
                disabled={disabledAll}
              >
                <ImageEdit
                  typeApi="ptttLuocDo"
                  src={dataDetail.luocDo}
                  afterSave={(s) => {
                    onChange("luocDo")(s);
                  }}
                  placeholder={t("pttt.nhanDeTaiAnhLuocDoPttt")}
                />
              </div>
              {!dataDetail.phauThuat && (
                <div className="info-image">
                  <div className="item-child">
                    <span>{t("pttt.danLuu")}:</span>
                    <span>
                      <InputTimeout
                        placeholder={t("pttt.nhapDanLuu")}
                        value={dataDetail?.danLuu}
                        onChange={onChange("danLuu")}
                        disabled={disabledAll}
                      />
                    </span>
                  </div>
                  <div className="item-child">
                    <span>{t("pttt.bac")}:</span>
                    <span>
                      <InputTimeout
                        placeholder={t("pttt.nhapBac")}
                        value={dataDetail?.bac}
                        onChange={onChange("bac")}
                        disabled={disabledAll}
                      />
                    </span>
                  </div>
                  <div className="item-child">
                    <span>{t("pttt.ngayRut")}:</span>
                    <span>
                      <DatePicker
                        placeholder={t("pttt.chonNgay")}
                        showTime
                        format={"DD/MM/YYYY HH:mm"}
                        onChange={onChange("thoiGianRut")}
                        value={
                          dataDetail?.thoiGianRut
                            ? moment(dataDetail?.thoiGianRut)
                            : null
                        }
                        disabled={disabledAll}
                      />
                    </span>
                  </div>
                  <div className="item-child">
                    <span>{t("pttt.ngayCatChi")}:</span>
                    <span>
                      <DatePicker
                        placeholder={t("pttt.chonNgay")}
                        showTime
                        format={"DD/MM/YYYY HH:mm"}
                        onChange={onChange("thoiGianCatChi")}
                        value={
                          dataDetail?.thoiGianCatChi
                            ? moment(dataDetail?.thoiGianCatChi)
                            : null
                        }
                        disabled={disabledAll}
                      />
                    </span>
                  </div>
                  <div className="item-child">
                    <span>{t("pttt.khac")}:</span>
                    <span>
                      <InputTimeout
                        placeholder={t("pttt.nhapKhac")}
                        value={dataDetail?.khac}
                        onChange={onChange("khac")}
                        disabled={disabledAll}
                      />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col md={16} xl={16} xxl={16}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.cachThucPttt")}</label>
            <Input.TextArea
              rows={20}
              className="input-filter"
              placeholder={t("pttt.nhapCachThucPttt")}
              value={dataDetail?.cachThuc}
              onChange={onChange("cachThuc")}
              disabled={disabledAll}
            />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Main>
      <ElementFilter renderFilter={renderFilter} />
    </Main>
  );
};
export default memo(ThongTinPTTT);
