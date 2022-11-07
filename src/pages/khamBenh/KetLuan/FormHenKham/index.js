import React, { useCallback, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import { Form, Input, Row, Col, ConfigProvider } from "antd";
import { Main, GlobalStyle } from "./styled";
import TextField from "components/TextField";
import { DatePickerField } from "components/DatePicker";
import Checkbox from "components/Checkbox";
import { DOI_TUONG } from "constants/index";
import { refElement } from "../../ThongTin";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

export const FormHenKham = (props) => {
  const { t } = useTranslation();
  const { handleSetData } = props;
  const thongTinChiTiet = useSelector(
    (state) => state.khamBenh.thongTinChiTiet
  );

  const infoNb = useSelector((state) => {
    return state.khamBenh.infoNb;
  });
  const { thoiGianThucHien } = thongTinChiTiet?.nbDichVu || {};
  const [state, _setState] = useState({
    visibleDelete: null,
    visibleEdit: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [dataSelect, setDataSelect] = useState({});

  useEffect(() => {
    debounceFunc();
  }, [thongTinChiTiet, infoNb]);

  const debounceFunc = useCallback(
    debounce(() => {
      const data = {
        ...(infoNb || {}),
        ...(thongTinChiTiet?.nbHoiBenh || {}),
        ...(thongTinChiTiet?.nbChanDoan || {}),
        ...(thongTinChiTiet?.nbKetLuan || {}),
        ...(thongTinChiTiet?.nbKhamXet || {}),
        ...dataSelect,
      };
      setDataSelect(data);
    }, 1000),
    [thongTinChiTiet, infoNb]
  );

  const {
    quaTrinhBenhLy,
    dsCdChinh,
    dsCdKemTheo,
    thoiGianKetLuan,
    thoiGianHenKham,
    ghiChu,
    loiDan,
    tenNb,
    doiTuong,
    ngaySinh,
    tenXaPhuong,
    tenQuanHuyen,
    tenTinhThanhPho,
    gioiTinh,
    maTheBhyt,
    soNha,
    tuNgayTheBhyt,
    denNgayTheBhyt,
    chiNamSinh,
  } = dataSelect;

  const [form] = Form.useForm();
  const showAddress = () => {
    return `${soNha ? `${soNha} - ` : ""}${tenXaPhuong || ""}${
      tenXaPhuong && tenQuanHuyen ? " - " : ""
    }${tenQuanHuyen || ""}${
      (tenXaPhuong || tenQuanHuyen) && tenTinhThanhPho ? " - " : ""
    }${tenTinhThanhPho || ""}`;
  };

  const customFormat = (value) => {
    if (!value) return;

    value = moment(value);

    return `ngày ${value.date()} tháng ${
      value.month() + 1
    } năm ${value.year()}`;
  };

  const handleChangeData = (key, key1) => (values) => {
    handleSetData([key1 || "nbKetLuan", key])(values);
    // if (["thoiGianHenKham"].includes(key)) {
    setDataSelect({ ...dataSelect, [key]: values });
    // }
  };

  const checkDisabledDate = (currentDate) => {
    return moment(currentDate) < moment(thoiGianThucHien);
  };

  return (
    <Main className="form-detail">
      <GlobalStyle />
      <Row className="mr-5">
        <Col span={16}>
          <div>
            <span>{t("khamBenh.ketLuanKham.henKham.hoVaTen")}: </span>
            {tenNb}
          </div>
        </Col>
        <Col span={7} offset={1}>
          <Checkbox checked={gioiTinh === 1}>{t("common.nam")}</Checkbox>
          <Checkbox checked={gioiTinh === 2}>{t("common.nu")}</Checkbox>
        </Col>
      </Row>
      <div className="mr-5">
        <span>{t("khamBenh.ketLuanKham.henKham.sinhNgay")}: </span>
        <span>
          {ngaySinh &&
            moment(ngaySinh).format(chiNamSinh ? "YYYY" : "DD/MM/YYYY")}
        </span>
        {/*<DatePickerField
            value={ngaySinh && moment(ngaySinh)}
            label="Sinh ngày:"
            placeholder="........ / ....... / ............."
          /> */}
      </div>
      <div className="mr-5">
        <span>{t("khamBenh.ketLuanKham.henKham.diaChi")}: </span>
        {showAddress()}
      </div>
      {doiTuong === DOI_TUONG.BAO_HIEM && (
        <>
          <div className="mr-5">
            <span>{t("khamBenh.ketLuanKham.henKham.soTheBHYT")}:</span>
            <span> {maTheBhyt}</span>
            {/* <MultiInput className="mrl-5" sizeRange={[3, 3, 3, 8]} /> */}
          </div>

          <div className="mr-5">
            <span>{t("khamBenh.ketLuanKham.henKham.hanSuDungTu")}</span>
            <span>
              {tuNgayTheBhyt && moment(tuNgayTheBhyt).format("DD/MM/YYYY")}
            </span>
            <span> {t("khamBenh.ketLuanKham.henKham.den")} </span>
            <span>
              {denNgayTheBhyt && moment(denNgayTheBhyt).format("DD/MM/YYYY")}
            </span>{" "}
          </div>
        </>
      )}
      <div className="mr-5">
        <span>{t("khamBenh.ketLuanKham.henKham.ngayKhamBenh")}: </span>
        <span>
          {thoiGianThucHien && moment(thoiGianThucHien).format("DD/MM/YYYY")}
        </span>{" "}
      </div>

      <TextField
        html={quaTrinhBenhLy}
        classNameLabel={dataSelect.quaTrinhBenhLy ? "" : "red"}
        label={t("khamBenh.ketLuanKham.henKham.quaTrinhBenhLy")}
        afterText={<span className="red"> *</span>}
        onChange={handleChangeData("quaTrinhBenhLy", "nbHoiBenh")}
        maxLength={1000}
        maxLine={3}
        refsChild={refElement}
        keyReload={"form-hen-kham"}
      />
      <div className="mr-5">
        <span className={(dsCdChinh || []).length === 0 ? "red" : ""}>
          {t("khamBenh.ketLuanKham.henKham.chanDoan")}{" "}
          <span className="red"> *</span>:
        </span>
        {(dsCdChinh || []).map((cd, index) => {
          if (dsCdChinh.length === index + 1) {
            return <span key={cd.id}>{cd.ten}</span>;
          }

          return <span key={cd.id}>{cd.ten}, </span>;
        })}
      </div>
      <div className="mr-5">
        <span>{t("khamBenh.ketLuanKham.henKham.benhKemTheo")}: </span>
        {(dsCdKemTheo || []).map((cd, index) => {
          if (dsCdKemTheo.length === index + 1) {
            return <span key={cd.id}>{cd.ten}</span>;
          }

          return <span key={cd.id}>{cd.ten}, </span>;
        })}
      </div>

      {/* <TextField className="mr-5" label="Chẩn đoán" />
        <TextField className="mr-5" label="Bệnh kèm theo" /> */}
      <TextField
        html={ghiChu}
        className="mr-5"
        maxLength={1000}
        maxLine={3}
        onChange={handleChangeData("ghiChu", "nbKhamXet")}
        label={t("common.ghiChu")}
        refsChild={refElement}
        keyReload={"form-hen-kham"}
      />
      <TextField
        html={loiDan}
        className="mr-5"
        maxLength={1000}
        maxLine={3}
        onChange={handleChangeData("loiDan", "nbKetLuan")}
        label={t("common.loiDan")}
        refsChild={refElement}
        keyReload={"form-hen-kham"}
      />
      <div className="mr-17">
        <span
          className={
            dataSelect.thoiGianHenKham ||
            (thoiGianHenKham && moment(thoiGianHenKham))
              ? ""
              : "red"
          }
        >
          {t("khamBenh.ketLuanKham.henKham.henKhamVaoLai")}{" "}
          <span className="red"> *</span>{" "}
        </span>{" "}
        {/* <ConfigProvider locale={viVN}> */}
        <DatePickerField
          dropdownClassName="date-custom-kham-benh-hen-kham"
          value={thoiGianHenKham && moment(thoiGianHenKham)}
          // showTime={{ format: "HH:mm" }}
          customFormat={customFormat}
          disabledDate={checkDisabledDate}
          onChange={handleChangeData("thoiGianHenKham")}
          placeholder={t("khamBenh.ketLuanKham.henKham.ngayThangNam")}
          onPanelChange={(value, mode) => {
            handleChangeData("thoiGianHenKham", "nbKetLuan")(value);
          }}
          // panelRender={}
        />
        {/* </ConfigProvider> */}
        <span>{t("khamBenh.ketLuanKham.henKham.hoacDenKhiCoBatThuong")}</span>
      </div>
      <div className="mr-17">
        {t("khamBenh.ketLuanKham.henKham.thoiHanGiayHenKham")}
      </div>
      <Row className="sign-box">
        <Col span={10}>
          <div className="sign-bottom mr-20">
            <div className="sign-bottom__title">
              {t("khamBenh.ketLuanKham.henKham.bacSiKhamBenh")}
            </div>
            <div>{t("khamBenh.ketLuanKham.henKham.kyTen")}</div>
          </div>
        </Col>
        <Col span={12} offset={2}>
          <div className="sign-bottom">
            <div>
              {moment(thoiGianKetLuan || new Date()).format(
                t("khamBenh.ketLuanKham.henKham.formatDate")
              )}
            </div>
            <div className="sign-bottom__title">
              {t("khamBenh.ketLuanKham.henKham.daiDienCoSoKhamChuaBenh")}
            </div>
            <div>{t("khamBenh.ketLuanKham.henKham.kyTenDongDau")}</div>
          </div>
        </Col>
      </Row>
    </Main>
  );
};

export default FormHenKham;
