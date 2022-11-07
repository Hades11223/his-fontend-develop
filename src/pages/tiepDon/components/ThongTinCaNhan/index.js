import React, { useState, useMemo, useEffect, useRef } from "react";
import MoRong from "./MoRong";
import { Row, Col, Input, TimePicker, message } from "antd";
import AddressFull from "components/AddressFull";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import DOBInput from "components/DOBInput";
import { isNil } from "lodash";
import { openInNewTab } from "utils";
import { formatPhone } from "utils";
import { ENUM, MAX_MONTH_AGE, THIET_LAP_CHUNG } from "constants/index";
import { InputTimeout, Select } from "components";
import { useTranslation } from "react-i18next";
import { useEnum, useStore, useThietLap } from "hook";
import IcArrowDown from "assets/svg/ic-arrow-down.svg";
import { Main } from "./styled";
const ThongTinCaNhan = ({
  layerId,
  onChange,
  onCheckTrungThongTin,
  id,
  checkMaTheBhyt,
  ...props
}) => {
  const { t } = useTranslation();
  const {
    tiepDon: { updateData, updateThongTinNb, onSelectAddress },
    ttHanhChinh: { getListAllQuocGia },
    ngheNghiep: { getListAllNgheNghiep },
    phimTat: { onRegisterHotkey },
    danToc: { getListAllDanToc },
  } = useDispatch();
  const {
    maHoSo,
    checkValidate,
    tenNb,
    ngaySinh = "",
    ngaySinh: ngaySinhTime2,
    tuoi,
    thangTuoi,
    gioiTinh,
    quocTichId,
    soDienThoai,
    checkNgaySinh = false,
    nbDiaChi,
    disableTiepDon,
    email,
    nbGiayToTuyThan,
  } = useSelector((state) => state.tiepDon);
  const { listAllDanToc } = useSelector((state) => state.danToc);
  const { listAllQuocGia } = useSelector((state) => state.ttHanhChinh);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const [listLoaiGiayTo] = useEnum(ENUM.LOAI_GIAY_TO);
  const [dataQUOC_TICH_MAC_DINH] = useThietLap(
    THIET_LAP_CHUNG.QUOC_TICH_MAC_DINH
  );
  const [dataDAN_TOC_MAC_DINH] = useThietLap(THIET_LAP_CHUNG.DAN_TOC_MAC_DINH);

  const { loaiGiayTo, maSo } = nbGiayToTuyThan || {};
  const refViewMore = useRef(null);
  const showItemInfo = () => {
    refViewMore.current.show();
  };
  const ngaySinhTime = useMemo(() => {
    return ngaySinhTime2 && moment(ngaySinhTime2?.date);
  }, [ngaySinhTime2]);

  const refHoVaTen = useRef(null);
  const [state, _setState] = useState({
    diaChi: "",
    validate: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { diaChi, validate } = state;

  const { soNha } = nbDiaChi || {};

  useEffect(() => {
    if (!!nbDiaChi)
      setState({
        diaChi: nbDiaChi?.diaChi
          ? nbDiaChi?.diaChi
          : nbDiaChi?.tinhThanhPho
          ? `${nbDiaChi?.xaPhuong?.ten ? nbDiaChi?.xaPhuong?.ten : ""}${
              nbDiaChi?.quanHuyen?.ten ? `, ${nbDiaChi?.quanHuyen?.ten}` : ""
            }${
              nbDiaChi?.tinhThanhPho?.ten
                ? `, ${nbDiaChi?.tinhThanhPho?.ten}`
                : ""
            }`
          : "",
      });
  }, [nbDiaChi]);

  useEffect(() => {
    if (!loaiGiayTo) {
      updateThongTinNb(
        {
          loaiGiayTo: 2,
        },
        "nbGiayToTuyThan"
      );
    }
  }, [loaiGiayTo]);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllQuocGia(param);
    getListAllNgheNghiep(param);
    getListAllDanToc(param);
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refHoVaTen.current && refHoVaTen.current.focus();
          },
        },
      ],
    });
  }, []);

  const checkGender = (value) => {
    if (maHoSo) return; //nếu đã có mã hồ sơ, nghĩa là người bệnh cũ thì ko cần phải check lại giới tính
    let dataTen = value.toUpperCase();
    let genderVan = dataTen.search(" VĂN ");
    let genderThi = dataTen.search(" THỊ ");
    if (genderVan >= 0 && genderThi < 0) {
      updateData({ gioiTinh: 1 });
    } else if (genderThi >= 0) {
      updateData({ gioiTinh: 2 });
    } else {
      updateData({ gioiTinh: gioiTinh || "" });
    }
  };

  const onChangeValue = (variables) => (value) => {
    if (["loaiGiayTo", "maSo"].includes(variables)) {
      // nếu trường thay đổi là maSo hoặc Email thì update vào nbGiayToTuyThan
      updateThongTinNb({ [variables]: value }, "nbGiayToTuyThan");
      if (variables === "maSo" && !id) {
        //Đồng thời gọi check trùng thông tin nếu là maSo
        onCheckTrungThongTin(value, variables);
      }
    } else {
      if (variables === "soNha") {
        //nếu thay đổi trường soNha thì cập nhật vào nbDiaChi
        updateThongTinNb(
          {
            [variables]: value,
          },
          "nbDiaChi"
        );
      } else {
        if (
          [
            "quocTichId",
            "ngaySinh",
            "ngaySinhTime",
            "tenNb",
            "diaChi",
            "soDienThoai",
          ].includes(variables)
        ) {
          if (variables === "diaChi") {
            // nếu trường thông tin là địa chỉ thì lưu vào nbDiaChi
            updateThongTinNb({ diaChi: value }, "nbDiaChi");
          } else updateData({ [variables]: value });

          if (variables === "tenNb") {
            checkGender(value);
            checkMaTheBhyt(value, "hoTen");
          }
          if (variables === "soDienThoai") {
            value = formatPhone(value)?.trim();
          }
          if (variables === "quocTichId") {
            const selectedQuocTich = (listAllQuocGia || []).find(
              (x) => x.id == value
            );
            const defaultDanToc = (listAllDanToc || []).find(
              (x) => x.ma == dataDAN_TOC_MAC_DINH
            );

            updateData({
              danTocId:
                selectedQuocTich?.ma == dataQUOC_TICH_MAC_DINH
                  ? defaultDanToc?.id
                  : null,
            });
          }
          if (["tenNb", "diaChi", "soDienThoai"].includes(variables) && !id) {
            onCheckTrungThongTin(value, variables);
          }

          if (variables === "ngaySinhTime") {
            updateData({
              ngaySinh: {
                str: ngaySinh.str,
                date: moment(
                  moment(ngaySinh?.date).format("YYYY/MM/DD") +
                    moment(value).format(" HH:mm:ss")
                ).format("YYYY/MM/DD HH:mm:ss"),
              },
            });
          }
        } else {
          onChange(value, variables);
        }
      }
    }
  };

  const onErrorAddress = (address, listSuggest) => {
    updateData({ selectedAddress: false });
    message.error(t("tiepDon.diaChiHanhChinhKhongHopLe"));
  };

  const onChangeAdrressText = (e) => {
    if (e != state.diaChi) {
      setState({ diaChi: e });
    }
  };

  const selectAdress = (data) => {
    onSelectAddress(data).then((address) => {
      onCheckTrungThongTin(address, "diaChi");
    });
  };

  return (
    <Main
      title={t("tiepDon.thongTinCaNhan")}
      titleRight={
        <div>
          {t("common.nhan")} <span> [F6] </span>{" "}
          {t("tiepDon.nhanDeThemThongTin")}
        </div>
      }
    >
      <Row className="row-name" gutter={6}>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-input">
            <label className={!tenNb ? `label label-error` : "label"}>
              {t("common.hoVaTen")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <InputTimeout
              ref={refHoVaTen}
              placeholder={t("common.nhapHoVaTen")}
              value={tenNb}
              style={{ textTransform: "uppercase" }}
              onChange={onChangeValue("tenNb")}
              disabled={disableTiepDon}
            />
            {checkValidate && !tenNb ? (
              <div className="error">
                {t("tiepDon.vuiLongNhapTenNguoiBenh")}
              </div>
            ) : null}
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12} style={{ paddingRight: 0 }}>
          <div className="item-input">
            <label className="label">{t("common.soDienThoai")}</label>
            <InputTimeout
              placeholder={t("common.nhapSoDienThoai")}
              value={soDienThoai}
              onChange={onChangeValue("soDienThoai")}
              disabled={disableTiepDon}
            />
            {soDienThoai && !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
              <div className="error">{t("tiepDon.soDienThoaiSaiDinhDang")}</div>
            ) : null}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label
              className={
                !ngaySinh?.str
                  ? `label item-title label-error`
                  : "label item-title"
              }
            >
              {t("tiepDon.ngayThangNamSinh")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <DOBInput
              className="item-born"
              value={ngaySinh}
              onBlur={(e, nofi, ageStr, chiNamSinh) => {
                let ngaySinhTime = nofi === 0 && e && e.date && e.date._d;
                let tuoi = nofi === 0 ? ngaySinhTime.getAge() : "";
                setState({ validate: nofi });
                updateData({
                  ngaySinh: e,
                  tuoi: tuoi,
                  thangTuoi: tuoi <= 3 ? (ageStr > 0 ? ageStr : null) : null,
                  ngaySinhTime: ngaySinhTime,
                  checkNgaySinh: nofi === 0 ? true : false,
                  chiNamSinh: chiNamSinh,
                });
                if (ngaySinh !== props.ngaySinh && !id)
                  onCheckTrungThongTin(e, "ngaySinh");
                if (e?.date) {
                  checkMaTheBhyt(
                    moment(moment(e?.date, "YYYY-MM-DD"))?.format("YYYY-MM-DD"),
                    "ngaySinh"
                  );
                }
              }}
              onChange={onChangeValue("ngaySinh")}
              disabled={disableTiepDon}
              placeholder={t("tiepDon.nhapNgayThangNamSinh")}
            />
            {validate && validate !== 0 && ngaySinh?.str ? (
              <div className="error">{t("tiepDon.ngaySinhSaiDinhDang")}</div>
            ) : checkValidate && !checkNgaySinh && !ngaySinh?.str ? (
              <div className="error">{t("tiepDon.vuiLongNhapNgaySinh")}</div>
            ) : null}
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-date">
            <label className="label">{t("common.gioSinh")}</label>
            <TimePicker
              suffixIcon={false}
              placeholder="00:00:00"
              className="item-time"
              value={ngaySinhTime}
              format="HH:mm:ss"
              onChange={onChangeValue("ngaySinhTime")}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-input">
            <label className="label"> {t("tiepDon.tuoi")}</label>
            <Input
              value={
                !isNil(thangTuoi) && thangTuoi <= MAX_MONTH_AGE
                  ? `${thangTuoi} ${t("common.thang")}`
                  : tuoi
              }
              disabled
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6} style={{ paddingRight: 0 }}>
          <div className="item-select">
            <label className={!gioiTinh ? `label label-error` : "label"}>
              {t("common.gioiTinh")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={onChangeValue("gioiTinh")}
              value={gioiTinh}
              className="item-male"
              placeholder={t("common.chonGioiTinh")}
              data={listGioiTinh || []}
              disabled={disableTiepDon}
            />
            {checkValidate && !gioiTinh ? (
              <div className="error">{t("common.vuiLongChonGioiTinh")}</div>
            ) : null}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8} style={{ marginBottom: 14 }}>
          <div className="item-input" style={{ marginBottom: 0 }}>
            <label className="label">{t("tiepDon.soNhaThonXom")}</label>
            <InputTimeout
              placeholder={t("tiepDon.snThonXom")}
              value={soNha}
              onChange={onChangeValue("soNha")}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
        <Col
          md={16}
          xl={16}
          xxl={16}
          style={{ marginBottom: 14, paddingRight: 0 }}
        >
          <div className="item-input" style={{ marginBottom: 0 }}>
            <label className={!diaChi ? `label label-error` : "label"}>
              {t("tiepDon.phuongXaQuanHuyenTinhThanh")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <AddressFull
              onChangeAdrressText={onChangeAdrressText}
              onBlur={(e) => onChangeValue("diaChi")(e.target.value)}
              placeholder="Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố"
              value={diaChi}
              onSelectAddress={selectAdress}
              disabled={disableTiepDon}
              onError={onErrorAddress}
              delayTyping={300}
            />
          </div>
          {checkValidate && !diaChi ? (
            <div className="error">{t("tiepDon.vuiLongNhapDiaChi")}</div>
          ) : null}
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-input">
            <label className="label">{t("common.email")}</label>
            <InputTimeout
              className="input"
              placeholder={t("common.nhapEmail")}
              onChange={onChangeValue("email")}
              value={email}
              disabled={disableTiepDon}
            />
            <div className="error">
              {email && !email?.isEmail()
                ? t("common.vuiLongNhapDungDinhDangDiaChiEmail")
                : null}
            </div>
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          {/* <div className="item"> */}
          <div className="item-select">
            <label
              className={
                !quocTichId ? `label label-error pointer` : "label pointer"
              }
              onClick={() =>
                openInNewTab("/danh-muc/dia-chi-hanh-chinh?level=1")
              }
            >
              {t("common.quocTich")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={onChangeValue("quocTichId")}
              value={quocTichId}
              className="select"
              placeholder={t("common.chonQuocTich")}
              data={listAllQuocGia || []}
              disabled={disableTiepDon}
            />
            {checkValidate && !quocTichId ? (
              <div className="error">{t("common.vuiLongChonQuocTich")}</div>
            ) : null}
          </div>
          {/* </div> */}
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label">{t("tiepDon.loaiGiayToTuyThan")}</label>
            <Select
              onChange={onChangeValue("loaiGiayTo")}
              value={loaiGiayTo}
              className="select"
              placeholder={t("tiepDon.chonLoaiGiayToTuyThan")}
              data={listLoaiGiayTo || []}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-input">
            <label className="label">{t("tiepDon.maSoGiayToTuyThan")}</label>
            <InputTimeout
              className="input"
              placeholder={t("tiepDon.nhapMaSoGiayToTuyThan")}
              value={maSo}
              onChange={onChangeValue("maSo")}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
      </Row>

      <MoRong ref={refViewMore} onChange={onChange} />
      <Row>
        <div
          className="button-clear"
          onClick={() => showItemInfo()}
          style={{ marginTop: 24 }}
        >
          <span>{t("common.xemThem")}</span>
          <IcArrowDown />
        </div>
      </Row>
    </Main>
  );
};

export default ThongTinCaNhan;
