import React, { useState, useEffect, useRef, useCallback } from "react";
import { SelectGroup } from "../styled";
import { SelectGroupChuyenVien, GlobalStyle } from "./styled";
import { Main } from "./styled";
import { TextField, Select, SelectLargeData } from "components";
import { DatePickerField } from "components/DatePicker";
import moment from "moment";
import {
  DOI_TUONG,
  GIOI_TINH,
  TRANG_THAI_DICH_VU,
  LOAI_CHUYEN_VIEN,
} from "constants/index";
import { useSelector, useDispatch } from "react-redux";
import { refElement } from "../../ThongTin";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { debounce } from "lodash";
import Checkbox from "components/Checkbox";

const { SelectChanDoan, SelectBenhVien } = SelectLargeData;

export const FormChuyenVien = (props) => {
  const { t } = useTranslation();
  const [listTuyenBenhVien] = useEnum("tuyenBenhVien");
  const getListAllNgheNghiep = useDispatch().ngheNghiep.getListAllNgheNghiep;

  const benhVien = useSelector((state) => state.auth.auth?.benhVien);
  const listAllBenhVien = useSelector(
    (state) => state.benhVien.listAllBenhVien
  );
  const listAllNgheNghiep = useSelector(
    (state) => state.ngheNghiep.listAllNgheNghiep
  );

  const { handleSetData, infoNb, thongTinChiTiet } = props;

  const {
    tenNb,
    doiTuong,
    tuNgayTheBhyt,
    denNgayTheBhyt,
    maTheBhyt,
    tenXaPhuong,
    tenQuanHuyen,
    tenTinhThanhPho,
    gioiTinh,
    tuoi,
    tenDanToc,
    tenQuocGia,
  } = infoNb || {};
  const selectFirstRef = useRef();
  const [dataSelect, setDataSelect] = useState(() => ({}));

  const [dimensionSelect, setDimensionSelect] = useState({
    firstHeight: "auto",
    secondHeight: "auto",
  });

  useEffect(() => {
    debounceFunc();
  }, [thongTinChiTiet, infoNb, benhVien]);
  const debounceFunc = useCallback(
    debounce(() => {
      const data = {
        ...dataSelect,
        ...(infoNb || {}),
        ...(thongTinChiTiet?.nbChanDoan || {}),
        ...(thongTinChiTiet?.nbChuyenVien || {}),
        ...(thongTinChiTiet?.nbKhamXet || {}),
        ...(thongTinChiTiet?.nbChiSoSong || {}),
        ...(thongTinChiTiet?.nbHoiBenh || {}),
        dieuTriTai1Id: benhVien?.id,
        dieuTriTuNgay1: moment(infoNb?.thoiGianVaoVien).format("YYYY-MM-DD"),
        dieuTriDenNgay1: thongTinChiTiet?.nbChuyenVien?.dieuTriDenNgay1
          ? thongTinChiTiet?.nbChuyenVien.dieuTriDenNgay1
          : moment(new Date()).format("YYYY-MM-DD"),
      };
      handleSetData(["nbChuyenVien", "dieuTriTai1Id"])(benhVien?.id);
      handleSetData(["nbChuyenVien", "dieuTriTuNgay1"])(
        moment(infoNb?.thoiGianVaoVien).format("YYYY-MM-DD")
      );
      handleSetData(["nbChuyenVien", "dieuTriDenNgay1"])(
        thongTinChiTiet?.nbChuyenVien?.dieuTriDenNgay1
          ? thongTinChiTiet?.nbChuyenVien.dieuTriDenNgay1
          : moment(new Date()).format("YYYY-MM-DD")
      );
      handleSetData(["nbChuyenVien", "ngheNghiepId"])(infoNb?.ngheNghiepId);
      handleSetData(["nbChuyenVien", "noiLamViec"])(infoNb?.noiLamViec);
      if (!data.thoiGianChuyenTuyen) {
        data.thoiGianChuyenTuyen = new Date();
        handleSetData(["nbChuyenVien", "thoiGianChuyenTuyen"])(
          moment(data.thoiGianChuyenTuyen).format("YYYY-MM-DD HH:mm")
        );
      }

      setDataSelect(data);
    }, 1000),
    [thongTinChiTiet, infoNb, benhVien]
  );
  const {
    dauHieuLamSang,
    ketQuaXnCls,
    phuongPhapDaSuDung,
    tinhTrangChuyenVien,
    huongDieuTri,
    phuongTienVanChuyen,
    nguoiHoTong,
  } = dataSelect || {};
  useEffect(() => {
    getListAllNgheNghiep({ page: "", size: "" });
  }, []);

  useEffect(() => {
    setDimensionSelect({
      ...dimensionSelect,
      firstHeight: selectFirstRef.current.offsetHeight,
      firstWidth: selectFirstRef.current.offsetWidth,
    });
  }, [dataSelect]);

  const showAddress = () => {
    return `${tenXaPhuong || ""}${tenXaPhuong && tenQuanHuyen ? " - " : ""}${
      tenQuanHuyen || ""
    }${(tenXaPhuong || tenQuanHuyen) && tenTinhThanhPho ? " - " : ""}${
      tenTinhThanhPho || ""
    }`;
  };

  const getBenhVien = (benhVienId) => {
    return listAllBenhVien?.find((item) => item.id == benhVienId);
  };

  const handleChangeData = (key, key1) => (e) => {
    let values = e;
    if (key === "loai") {
      values = e?.target?.checked
        ? LOAI_CHUYEN_VIEN.CHUYEN_KHAM_CHUYEN_KHOA
        : LOAI_CHUYEN_VIEN.CHUYEN_VIEN;
    }

    if (
      ["dieuTriTuNgay2", "dieuTriDenNgay2", "dieuTriDenNgay1"].includes(key)
    ) {
      handleSetData([key1 || "nbChuyenVien", key])(
        moment(moment(values, "YYYY-MM-DD")).format("YYYY-MM-DD")
      );
    } else {
      handleSetData([key1 || "nbChuyenVien", key])(values);
    }
    if (
      ["dieuTriTuNgay2", "dieuTriDenNgay2", "dieuTriDenNgay1"].includes(key)
    ) {
      setDataSelect({
        ...dataSelect,
        [key]: moment(moment(values, "YYYY/MM/DD")).format(),
      });
    } else {
      setDataSelect({
        ...dataSelect,
        [key]: values,
      });
    }
  };

  const customFormat = (value) => {
    return `${value.hour()} giờ ${value.minute()} phút, ngày ${value.date()} tháng ${
      value.month() + 1
    } năm ${value.year()}`;
  };

  const getTuyen = (benhVien) => {
    return listTuyenBenhVien?.find((item) => item.id == benhVien?.tuyenBenhVien)
      ?.ten;
  };

  const disableNgayChuyenTuyen = (date) => {
    if (infoNb?.thoiGianVaoVien) {
      if (
        date._d.ddmmyyyy() == infoNb.thoiGianVaoVien.toDateObject().ddmmyyyy()
      )
        return false;
      if (date.isBefore(moment(infoNb?.thoiGianVaoVien))) return true;
    }
    if (dataSelect.dieuTriDenNgay1) {
      if (
        date._d.ddmmyyyy() ==
        dataSelect.dieuTriDenNgay1.toDateObject().ddmmyyyy()
      )
        return false;
      if (date.isAfter(moment(dataSelect.dieuTriDenNgay1))) return true;
    }
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };

  return (
    <Main className="form-detail">
      <GlobalStyle />
      <div className="flex-center">
        <SelectGroup className="flex group-kinh-gui">
          <span className={`${dataSelect?.vienChuyenDenId ? "" : "red"}`}>
            {t("khamBenh.ketLuanKham.chuyenVien.kinhGui")}
            <span className="red">*</span>:
          </span>
          <div className="select-box flex1">
            <SelectBenhVien
              value={dataSelect?.vienChuyenDenId}
              showSearch
              onChange={handleChangeData("vienChuyenDenId")}
            />
          </div>
        </SelectGroup>
      </div>
      <div className="mr-5 flex">
        <div className="mrr-20">
          <span>{t("khamBenh.ketLuanKham.chuyenVien.chuyenKhoa")}: </span>
        </div>
        <Checkbox
          checked={dataSelect.loai === LOAI_CHUYEN_VIEN.CHUYEN_KHAM_CHUYEN_KHOA}
          onChange={handleChangeData("loai")}
        />
      </div>
      <div className="mr-5 flex">
        <div className="flex1">
          <span>
            {" "}
            {t("khamBenh.ketLuanKham.chuyenVien.coSoKhamChuaBenh")}:{" "}
          </span>
          {benhVien?.ten}
        </div>
        <div className="width250">
          {t("khamBenh.ketLuanKham.chuyenVien.tranTrongGioiThieu")}:{" "}
        </div>
      </div>
      <div className="mr-5 flex">
        <div className="flex1">
          <span>{t("khamBenh.ketLuanKham.chuyenVien.hoVaTen")}: </span>
          <span>{tenNb}</span>
        </div>
        <div className="width150">
          <span>{t("khamBenh.ketLuanKham.chuyenVien.namNu")}: </span>
          <span>
            {gioiTinh === GIOI_TINH.NAM ? t("common.nam") : t("common.nu")}
          </span>
        </div>
        <div className="width150">
          <span>{t("khamBenh.ketLuanKham.chuyenVien.tuoi")}: </span>
          <span>{tuoi}</span>
        </div>
      </div>
      <div className="mr-5 mr-5">
        <span>{t("khamBenh.ketLuanKham.chuyenVien.diaChi")}: </span>
        {showAddress()}
      </div>
      <div className="mr-5 flex">
        <div className="flex1">
          <span>{t("khamBenh.ketLuanKham.chuyenVien.danToc")}: </span>
          {tenDanToc}
        </div>
        <div className="width300">
          <span>{t("khamBenh.ketLuanKham.chuyenVien.quocTich")}: </span>
          {tenQuocGia}
        </div>
      </div>
      <div className="mr-5 flex">
        <SelectGroup className="flex1 flex  mr-0 mrr-20">
          <span>{t("khamBenh.ketLuanKham.chuyenVien.ngheNghiep")}: </span>
          <div className="select-box flex1">
            <Select
              showSearch
              filterOption={filterOption}
              value={dataSelect.ngheNghiepId}
              onChange={handleChangeData("ngheNghiepId")}
              className="max-width mrh-5"
              data={listAllNgheNghiep}
            ></Select>
          </div>
        </SelectGroup>
        <div className="width300">
          <TextField
            label={t("khamBenh.ketLuanKham.chuyenVien.noiLamViec")}
            maxLength={500}
            html={dataSelect.noiLamViec}
            onChange={handleChangeData("noiLamViec")}
            refsChild={refElement}
            keyReload={"form-chuyen-vien"}
          />
        </div>
      </div>
      {doiTuong === DOI_TUONG.BAO_HIEM && (
        <>
          <div className="mr-5">
            <span>{t("khamBenh.ketLuanKham.chuyenVien.soBHYT")}:</span>
            <span>{maTheBhyt}</span>
            {/* <MultiInput className="mrl-5" sizeRange={[3, 3, 3, 8]} /> */}
          </div>

          <div className="mr-5">
            <span>{t("khamBenh.ketLuanKham.chuyenVien.hanSuDungTu")}</span>
            <span>
              {tuNgayTheBhyt && moment(tuNgayTheBhyt).format("DD/MM/YYYY")}
            </span>
            <span> {t("khamBenh.ketLuanKham.chuyenVien.den")} </span>
            <span>
              {denNgayTheBhyt && moment(denNgayTheBhyt).format("DD/MM/YYYY")}
            </span>{" "}
          </div>
        </>
      )}
      <div className="mr-5">
        <div>{t("khamBenh.ketLuanKham.chuyenVien.daDuocKhamBenhDieuTri")}</div>
        <div className="mr-5 flex">
          <div className="flex1">
            <span>+ {t("khamBenh.ketLuanKham.chuyenVien.tai")}: </span>
            <span>{dataSelect?.dieuTriTai1?.ten || benhVien?.ten}</span>
          </div>
          <div className="width100">
            (
            <span>
              {getTuyen(dataSelect?.dieuTriTai1 || benhVien) || "Tuyến: "}
            </span>
            )
          </div>
          <div className="width180">
            <span>{t("common.tuNgay")}: </span>
            <span>{moment(infoNb?.thoiGianVaoVien).format("DD/MM/YYYY")}</span>
          </div>
          <div className="width180">
            <span>{t("common.denNgay")}: </span>
            <DatePickerField
              value={
                dataSelect?.dieuTriDenNgay1
                  ? moment(dataSelect?.dieuTriDenNgay1)
                  : moment(new Date())
              }
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              onChange={handleChangeData("dieuTriDenNgay1")}
              className="p-5"
            />
          </div>
        </div>
        <div className="mr-5 flex">
          <div className="flex1">
            <SelectGroup className="flex mr-0">
              <span>+ {t("khamBenh.ketLuanKham.chuyenVien.tai")}: </span>
              <div className="select-box flex1">
                <SelectBenhVien
                  value={dataSelect.dieuTriTai2Id}
                  showSearch
                  onChange={handleChangeData("dieuTriTai2Id")}
                />
              </div>
            </SelectGroup>
          </div>
          <div className="width100">
            (
            <span>
              {getTuyen(
                dataSelect?.dieuTriTai2 ||
                  getBenhVien(dataSelect?.dieuTriTai2Id)
              ) || `${t("khamBenh.ketLuanKham.chuyenVien.tuyen")}: `}
            </span>
            )
          </div>
          <div className="width180">
            <span>{t("common.tuNgay")}: </span>
            <DatePickerField
              value={
                dataSelect?.dieuTriTuNgay2 && moment(dataSelect?.dieuTriTuNgay2)
              }
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              onChange={handleChangeData("dieuTriTuNgay2")}
              className="p-5"
            />
          </div>
          <div className="width180">
            <span>{t("common.denNgay")}: </span>
            <DatePickerField
              value={
                dataSelect?.dieuTriDenNgay2 &&
                moment(dataSelect?.dieuTriDenNgay2)
              }
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              onChange={handleChangeData("dieuTriDenNgay2")}
              className="p-5"
            />
          </div>
        </div>
      </div>
      <h3 className="mr-17" style={{ marginBottom: "5px" }}>
        {t("khamBenh.ketLuanKham.chuyenVien.tomTatBenhAn")}
      </h3>
      <TextField
        label={t("khamBenh.ketLuanKham.chuyenVien.dauHieuLamSang")}
        html={dauHieuLamSang}
        onChange={handleChangeData("dauHieuLamSang")}
        refsChild={refElement}
        keyReload={"form-chuyen-vien"}
      />
      <TextField
        label={t("khamBenh.ketLuanKham.chuyenVien.ketQuaXetNghiemCls")}
        html={ketQuaXnCls}
        onChange={handleChangeData("ketQuaXnCls")}
        refsChild={refElement}
        keyReload={"form-chuyen-vien"}
      />
      <SelectGroupChuyenVien dimension={dimensionSelect} className="mr-0">
        <span>{t("khamBenh.ketLuanKham.chuyenVien.chanDoanBenh")}: </span>
        <div className="select-box-chuyen-vien" ref={selectFirstRef}>
          <SelectChanDoan
            getPopupContainer={(trigger) => {
              return trigger;
            }}
            mode="multiple"
            maxItem={1}
            value={(dataSelect.dsCdChinhId || []).map((item) => item + "")}
            onChange={handleChangeData("dsCdChinhId", "nbChanDoan")}
            style={{
              width: "100%",
            }}
          />
        </div>
      </SelectGroupChuyenVien>
      <TextField
        label={t(
          "khamBenh.ketLuanKham.chuyenVien.phuongPhapThuThuatKyThuatThuocDaSuDung"
        )}
        html={phuongPhapDaSuDung}
        onChange={handleChangeData("phuongPhapDaSuDung")}
        refsChild={refElement}
        keyReload={"form-chuyen-vien"}
      />
      <TextField
        label={t("khamBenh.ketLuanKham.chuyenVien.tinhTrangLucChuyenTuyen")}
        html={tinhTrangChuyenVien}
        onChange={handleChangeData("tinhTrangChuyenVien")}
        refsChild={refElement}
        keyReload={"form-chuyen-vien"}
      />
      <div>{t("khamBenh.ketLuanKham.chuyenVien.lyDoChuyenTuyen")}</div>
      <div className="ly-do-chuyen-tuyen">
        <div
          className="checkbox-panel"
          onClick={() => handleChangeData("lyDoChuyenTuyen")(1)}
        >
          {(!dataSelect.lyDoChuyenTuyen || dataSelect.lyDoChuyenTuyen == 1) && (
            <i></i>
          )}
        </div>
        <div>
          1. {t("khamBenh.ketLuanKham.chuyenVien.duDieuKienChuyenTuyen")}
        </div>
      </div>
      <div className="ly-do-chuyen-tuyen">
        <div
          className="checkbox-panel"
          onClick={() => handleChangeData("lyDoChuyenTuyen")(2)}
        >
          {dataSelect.lyDoChuyenTuyen == 2 && <i></i>}
        </div>
        <div>
          2. {t("khamBenh.ketLuanKham.chuyenVien.theoYeuCauCuaNguoiBenh")}
        </div>
      </div>

      <TextField
        label={t("khamBenh.ketLuanKham.chuyenVien.huongDieuTri")}
        html={huongDieuTri}
        onChange={handleChangeData("huongDieuTri")}
        refsChild={refElement}
        keyReload={"form-chuyen-vien"}
      />
      <div>
        <span>{t("khamBenh.ketLuanKham.chuyenVien.chuyenTuyenHoi")}: </span>
        <DatePickerField
          dropdownClassName="date-custom-kham-benh-chuyen-vien"
          disabledDate={disableNgayChuyenTuyen}
          disabled={
            thongTinChiTiet?.nbDvKyThuat?.trangThai >=
            TRANG_THAI_DICH_VU.DA_KET_LUAN
          }
          showTime={{ format: "HH:mm" }}
          customFormat={customFormat}
          value={
            dataSelect?.thoiGianChuyenTuyen &&
            moment(dataSelect?.thoiGianChuyenTuyen)
          }
          onChange={handleChangeData("thoiGianChuyenTuyen")}
          placeholder={t(
            "khamBenh.ketLuanKham.chuyenVien.ngayThangNamGioPhutGiay"
          )}
        />
      </div>
      <TextField
        className="sign-location"
        label={t("khamBenh.ketLuanKham.chuyenVien.phuongTienVanChuyen")}
        html={phuongTienVanChuyen}
        onChange={handleChangeData("phuongTienVanChuyen")}
        refsChild={refElement}
        keyReload={"form-chuyen-vien"}
      />
      <TextField
        label={t("khamBenh.ketLuanKham.chuyenVien.hoTenChucDanh")}
        html={nguoiHoTong}
        onChange={handleChangeData("nguoiHoTong")}
        refsChild={refElement}
        keyReload={"form-chuyen-vien"}
      />
    </Main>
  );
};
export default FormChuyenVien;
