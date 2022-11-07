import React, { useState, useRef, useEffect, memo, useMemo } from "react";
import { Col, Input, Checkbox, Tooltip, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import SelectMore from "./SelectMore";
import DOBInput from "components/DOBInput";
import ModalUploadGiayTo from "./ModalUploadGiayTo";
import IcEye from "assets/svg/tiep-don/eye.svg";
import IcCloud from "assets/svg/tiep-don/cloud.svg";
import { cloneDeep, isEqual } from "lodash";
import { THIET_LAP_CHUNG } from "constants/index";
import Box from "../Box";
import { InputTimeout, Select } from "components";
import { useTranslation } from "react-i18next";
import { useStore, useThietLap } from "hook";

const ThongTinBaoHiem = ({ layerId, id, ...props }) => {
  const { t } = useTranslation();
  const refModalUploadGiayTo = useRef(null);
  const refSoBaoHieu = useRef(null);
  const refNbBaoHiem = useRef({});
  const refPreMaThe = useRef(null);
  const refPreTuNgay = useRef(null);
  const refPreDenNgay = useRef(null);
  const {
    nbTheBaoHiem,
    checkValidate,
    doiTuong,
    checkNoiGioiThieu = false,
    disableTiepDon,
    nbTongKetRaVien,
    nbNguonNb,
  } = useSelector((state) => state.tiepDon);
  const [dataNGUON_NGUOI_BENH] = useThietLap(THIET_LAP_CHUNG.NGUON_NGUOI_BENH);
  const { listAllBenhVien } = useSelector((state) => state.benhVien);
  const { dataTAI_KHOAN_BHXH } = useSelector((state) => state.thietLap);
  const { listAllNguonNguoiBenh } = useSelector(
    (state) => state.nguonNguoiBenh
  );
  const { listkhuVucBHYT } = useSelector((state) => state.utils);

  const { nguonNbId } = nbNguonNb || {};
  const maNguonNb = nguonNbId
    ? listAllNguonNguoiBenh.find((x) => x.id === nguonNbId)?.ma
    : null;
  const { thongTinBenhNhan } = useStore("nbDotDieuTri", {});

  const {
    tiepDon: { updateData, updateThongTinNb },
    thietLap: { getThietLap },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const { onCheckTrungThongTin, checkMaTheBhyt, isEdit } = props;
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { cdNoiGioiThieu } = nbTongKetRaVien || {};
  const {
    mucHuong,
    noiDangKyId,
    maThe,
    noiGioiThieuId,
    henKhamLai,
    giayMienCungChiTra,
    mienDongChiTra,
    giayChuyenTuyen,
    giayHenKham,
    diaChi,
    khuVuc,
  } = nbTheBaoHiem || {};

  // + nameField tên trường tương ứng trong theBaoHiem check
  // + nameDetail tên trường đưa vào thông báo:
  // vd trường tuNgay -> nameDetail = Bảo hiểm từ ngày
  // + valDetail giá trị tương ứng trong theBaoHiem

  const onChange = (variables) => (value) => {
    if (variables === "cdNoiGioiThieu") {
      updateThongTinNb({ [`${variables}`]: value }, "nbTongKetRaVien");
      return;
    }
    if (
      variables === "khuVuc" ||
      variables === "diaChi" ||
      variables === "thoiGianDu5Nam" ||
      variables === "noiGioiThieuId" ||
      variables === "denNgayMienCungChiTra"
    ) {
      updateThongTinNb({ [`${variables}`]: value }, "nbTheBaoHiem");
    }
    if (variables === "tuNgayMienCungChiTra") {
      if (!denNgayMienCungChiTra) {
        updateThongTinNb(
          {
            denNgayMienCungChiTra: moment(
              new Date(new Date().getFullYear(), 11, 31)
            ),
            [`${variables}`]: value,
          },
          "nbTheBaoHiem"
        );
      } else {
        updateThongTinNb(
          {
            [`${variables}`]: value,
          },
          "nbTheBaoHiem"
        );
      }
    }
  };
  const onChangeThongTinBH = (variables) => (value) => {
    updateThongTinNb({ [`${variables}`]: value }, "nbTheBaoHiem");
  };
  const onChangeNoiDangKy = (value) => {
    onChangeThongTinBH("noiDangKyId")(value);
    checkMaTheBhyt(
      (listAllBenhVien?.find((bv) => bv.id === value) || {}).ten,
      "tenDKBD",
      t("tiepDon.noiDangKy")
    );
  };
  const onBlur = (value, variables) => {
    let data = {};
    data = { [variables]: value };
    if (variables === "henKhamLai") {
      data["giayChuyenTuyen"] = null;
    }
    updateThongTinNb(data, "nbTheBaoHiem");

    onCheckTrungThongTin(value, variables);
  };
  useEffect(() => {
    getThietLap({ ma: THIET_LAP_CHUNG.TAI_KHOAN_BHXH });
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 118, //F7
          onEvent: () => {
            refSoBaoHieu.current && refSoBaoHieu.current.focus();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (!isEqual(refNbBaoHiem.current, nbTheBaoHiem)) {
      //nếu khác dữ liệu trước đó
      refNbBaoHiem.current = nbTheBaoHiem; //gán lại dữ liệu

      setState({
        tuNgayStr: nbTheBaoHiem?.tuNgay
          ? moment(nbTheBaoHiem?.tuNgay).format("DD/MM/yyyy")
          : "",
        denNgayStr: nbTheBaoHiem?.denNgay
          ? moment(nbTheBaoHiem?.denNgay).format("DD/MM/yyyy")
          : "",
        tuNgayApDungStr: nbTheBaoHiem?.tuNgayApDung
          ? moment(nbTheBaoHiem?.tuNgayApDung).format("DD/MM/yyyy")
          : "",
        denNgayApDungStr: nbTheBaoHiem?.denNgayApDung
          ? moment(nbTheBaoHiem?.denNgayApDung).format("DD/MM/yyyy")
          : "",
        thoiGianDu5NamStr: nbTheBaoHiem?.thoiGianDu5Nam
          ? moment(nbTheBaoHiem?.thoiGianDu5Nam).format("DD/MM/yyyy")
          : "",
        tuNgayMienCungChiTraStr: nbTheBaoHiem?.tuNgayMienCungChiTra
          ? moment(nbTheBaoHiem?.tuNgayMienCungChiTra).format("DD/MM/yyyy")
          : "",
        denNgayMienCungChiTraStr: nbTheBaoHiem?.denNgayMienCungChiTra
          ? moment(nbTheBaoHiem?.denNgayMienCungChiTra).format("DD/MM/yyyy")
          : nbTheBaoHiem?.tuNgayMienCungChiTra
          ? moment(new Date(new Date().getFullYear(), 11, 31)).format(
              "DD/MM/yyyy"
            )
          : "",
      });
    }
  }, [nbTheBaoHiem]);
  const tuNgay = useMemo(() => {
    return nbTheBaoHiem?.tuNgay && moment(nbTheBaoHiem?.tuNgay);
  }, [nbTheBaoHiem?.tuNgay]);

  const denNgay = useMemo(() => {
    return nbTheBaoHiem?.denNgay && moment(nbTheBaoHiem?.denNgay);
  }, [nbTheBaoHiem?.denNgay]);

  const tuNgayApDung = useMemo(() => {
    return nbTheBaoHiem?.tuNgayApDung
      ? moment(nbTheBaoHiem?.tuNgayApDung)
      : nbTheBaoHiem?.tuNgay && moment(nbTheBaoHiem?.tuNgay);
  }, [nbTheBaoHiem?.tuNgay, nbTheBaoHiem?.tuNgayApDung]);

  const denNgayApDung = useMemo(() => {
    return nbTheBaoHiem?.denNgayApDung
      ? moment(nbTheBaoHiem?.denNgayApDung)
      : nbTheBaoHiem?.denNgay && moment(nbTheBaoHiem?.denNgay);
  }, [nbTheBaoHiem?.denNgay, nbTheBaoHiem?.denNgayApDung]);

  const thoiGianDu5Nam = useMemo(() => {
    return nbTheBaoHiem?.thoiGianDu5Nam && moment(nbTheBaoHiem?.thoiGianDu5Nam);
  }, [nbTheBaoHiem?.thoiGianDu5Nam]);

  const tuNgayMienCungChiTra = useMemo(() => {
    return (
      nbTheBaoHiem?.tuNgayMienCungChiTra &&
      moment(nbTheBaoHiem?.tuNgayMienCungChiTra)
    );
  }, [nbTheBaoHiem?.tuNgayMienCungChiTra]);
  const denNgayMienCungChiTra = useMemo(() => {
    return (
      nbTheBaoHiem?.denNgayMienCungChiTra &&
      moment(nbTheBaoHiem?.denNgayMienCungChiTra)
    );
  }, [nbTheBaoHiem?.denNgayMienCungChiTra]);

  const showUploadFile =
    (item = [], type, title) =>
    () => {
      if (!disableTiepDon) {
        refModalUploadGiayTo.current.show(
          {
            show: true,
            dataView: item,
            type,
            title,
          },
          (data = {}) => {
            message.success(t("tiepDon.taiGiayLenThanhCong"));
            let obj = cloneDeep(nbTheBaoHiem || {});
            obj[`${data?.type}`] = data?.data;
            updateData({ nbTheBaoHiem: { ...obj } });
          }
        );
      }
    };

  const isSameHospital = useMemo(() => {
    if (doiTuong != 2) return true;
    if (!noiDangKyId) return false;
    const giaTri = dataTAI_KHOAN_BHXH;
    return (
      giaTri ==
      (listAllBenhVien?.find((item) => item.id == noiDangKyId)?.ma || "") +
        "_BV"
    );
  }, [doiTuong, dataTAI_KHOAN_BHXH, noiDangKyId, listAllBenhVien]);

  const onFocusTTBaoHiem = (type) => (e) => {
    switch (type) {
      case "maThe":
        refPreMaThe.current = maThe;
        break;
      case "tuNgay":
        refPreTuNgay.current = tuNgay;
        break;
      case "denNgay":
        refPreDenNgay.current = denNgay;
        break;
    }
  };

  const onBlurMaTheBaoHiem = (e) => {
    const value = e.target.value;
    if (value == refPreMaThe.current) return;

    // onBlur(e.target.value, "maThe");

    if (
      value.length === 10 ||
      value.length === 15 //và mã thẻ 10 hoặc 15 ký tự thì check cổng
    ) {
      checkMaTheBhyt(value, "maThe");
      updateThongTinNb({ maThe: value }, "nbTheBaoHiem");
    }
    if (!id) {
      onCheckTrungThongTin(value, "maThe");
    }
  };

  const onChangeThoiGianBH = (
    value,
    variables,
    nameField,
    nameDetail,
    valDetail
  ) => {
    if (
      variables === "tuNgay" ||
      variables === "denNgay" ||
      variables === "tuNgayApDung" ||
      variables === "denNgayApDung"
    ) {
      updateThongTinNb({ [`${variables}`]: value }, "nbTheBaoHiem");
    }
    if (variables === "tuNgay" || variables === "denNgay") {
      checkMaTheBhyt(valDetail, nameField, nameDetail);
    }
  };
  return (
    <Box
      title={t("tiepDon.thongTinBHYT")}
      titleRight={
        <div>
          {t("common.nhan")} <span>[F7] </span>
          {t("tiepDon.nhanDeThemThongTinBHYT")}
        </div>
      }
    >
      <Main className="flame-right-main">
        <Col md={16} xl={16} xxl={16}>
          <div className="item-input">
            <label
              className={
                !maThe && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              {t("tiepDon.soBaoHiem")}
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}{" "}
            </label>
            <InputTimeout
              ref={refSoBaoHieu}
              placeholder={t("tiepDon.soBaoHiem")}
              value={maThe}
              maxLength={15}
              style={{ textTransform: "uppercase" }}
              onChange={(e) =>
                (!e || /^[a-zA-Z0-9]+$/i.test(e)) &&
                onChangeThongTinBH("maThe")(e)
              }
              onFocus={onFocusTTBaoHiem("maThe")}
              onBlur={onBlurMaTheBaoHiem}
              disabled={disableTiepDon}
            />
          </div>
          {checkValidate && doiTuong === 2 && !maThe ? (
            <div className="error">{t("tiepDon.vuiLongNhapSoBaoHiem")}</div>
          ) : // !checkMaThe ? (
          //   <div className="error">Số bảo hiểm sai định dạng!</div>
          // ) :
          null}
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-input">
            <label
              className={
                !mucHuong && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              {t("tiepDon.mucHuong")}
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <Input
              value={mucHuong ? `${mucHuong} %` : ""}
              // onChange={(e) => onChange("mucHuong")(e.target.value)}
              disabled
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label
              className={
                !tuNgay && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              {t("tiepDon.baoHiemTuNgay")}
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <DOBInput
              className="item-born"
              value={{ date: tuNgay, str: state.tuNgayStr }}
              onFocus={onFocusTTBaoHiem("tuNgay")}
              onBlur={(e, nofi) => {
                console.log("tuNgay", e.date);
                if (
                  e.date &&
                  e.date?._d?.ddmmyyyy() !==
                    refPreTuNgay.current?._d?.ddmmyyyy()
                ) {
                  onChangeThoiGianBH(
                    e.date,
                    "tuNgay",
                    "tuNgay",
                    t("tiepDon.baoHiemTuNgay"),
                    e.date.format("DD/MM/YYYY")
                  );
                }
              }}
              disabled={disableTiepDon}
              onChange={(e) => {
                setState({
                  tuNgayStr: e.str,
                });
              }}
              placeholder={t("common.chonNgay")}
            />

            {state?.validate &&
            state.validate !== 0 &&
            doiTuong === 2 &&
            state.tuNgayStr ? (
              <div className="error">{t("tiepDon.tuNgaySaiDinhDang")}</div>
            ) : checkValidate && doiTuong === 2 && !tuNgay ? (
              <div className="error">{t("tiepDon.vuiLongChonTuNgay")}</div>
            ) : null}
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label
              className={
                !denNgay && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              {t("tiepDon.baoHiemDenNgay")}
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <DOBInput
              className="item-born"
              value={{ date: denNgay, str: state.denNgayStr }}
              onFocus={onFocusTTBaoHiem("denNgay")}
              onBlur={(e, nofi) => {
                console.log("denNgay", e.date);
                if (
                  e.date &&
                  e.date?._d?.ddmmyyyy() !==
                    refPreDenNgay.current?._d?.ddmmyyyy()
                ) {
                  onChangeThoiGianBH(
                    e.date,
                    "denNgay",
                    "denNgay",
                    t("tiepDon.baoHiemDenNgay"),
                    e.date.format("DD/MM/YYYY")
                  );
                }
              }}
              disabled={disableTiepDon}
              onChange={(e) => {
                setState({
                  denNgayStr: e.str,
                });
              }}
              placeholder={t("common.chonNgay")}
            />

            {state?.validate &&
            state.validate !== 0 &&
            doiTuong === 2 &&
            state.denNgayStr ? (
              <div className="error">{t("tiepDon.denNgaySaiDinhDang")}</div>
            ) : checkValidate && doiTuong === 2 && !denNgay ? (
              <div className="error">{t("tiepDon.vuiLongChonDenNgay")}</div>
            ) : null}
          </div>
        </Col>
        {isEdit && (
          <Col md={12} xl={12} xxl={12}>
            <div className="item-date">
              <label
                className={
                  !tuNgayApDung && doiTuong === 2
                    ? `label label-error`
                    : "label"
                }
              >
                {t("tiepDon.baoHiemApDungTuNgay")}
                {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
              </label>
              <DOBInput
                className="item-born"
                value={{ date: tuNgayApDung, str: state.tuNgayApDungStr }}
                onFocus={onFocusTTBaoHiem("tuNgayApDung")}
                onBlur={(e, nofi) => {
                  if (
                    e.date &&
                    e.date?._d?.ddmmyyyy() !==
                      refPreTuNgay.current?._d?.ddmmyyyy()
                  ) {
                    onChangeThoiGianBH(
                      e.date,
                      "tuNgayApDung",
                      "tuNgayApDung",
                      t("tiepDon.baoHiemApDungTuNgay"),
                      e.date.format("DD/MM/YYYY")
                    );
                  }
                }}
                disabled={disableTiepDon}
                onChange={(e) => {
                  setState({
                    tuNgayApDungStr: e.str,
                  });
                }}
                placeholder={t("common.chonNgay")}
                disabledDate={(current) => {
                  return current && current.valueOf() < tuNgay;
                }}
              />

              {state?.validate &&
              state.validate !== 0 &&
              doiTuong === 2 &&
              state.tuNgayApDungStr ? (
                <div className="error">{t("tiepDon.tuNgaySaiDinhDang")}</div>
              ) : checkValidate && doiTuong === 2 && !tuNgayApDung ? (
                <div className="error">{t("tiepDon.vuiLongChonTuNgay")}</div>
              ) : null}
            </div>
          </Col>
        )}
        {isEdit && (
          <Col md={12} xl={12} xxl={12}>
            <div className="item-date">
              <label
                className={
                  !denNgayApDung && doiTuong === 2
                    ? `label label-error`
                    : "label"
                }
              >
                {t("tiepDon.baoHiemApDungDenNgay")}
                {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
              </label>
              <DOBInput
                className="item-born"
                value={{ date: denNgayApDung, str: state.denNgayApDungStr }}
                onFocus={onFocusTTBaoHiem("denNgayApDung")}
                onBlur={(e, nofi) => {
                  if (
                    e.date &&
                    e.date?._d?.ddmmyyyy() !==
                      refPreDenNgay.current?._d?.ddmmyyyy()
                  ) {
                    onChangeThoiGianBH(
                      e.date,
                      "denNgayApDung",
                      "denNgayApDung",
                      t("tiepDon.baoHiemApDungDenNgay"),
                      e.date.format("DD/MM/YYYY")
                    );
                  }
                }}
                disabled={disableTiepDon}
                onChange={(e) => {
                  setState({
                    denNgayApDungStr: e.str,
                  });
                }}
                placeholder={t("common.chonNgay")}
                disabledDate={(current) => {
                  return current && current.valueOf() > denNgay;
                }}
              />

              {state?.validate &&
              state.validate !== 0 &&
              doiTuong === 2 &&
              state.denNgayApDungStr ? (
                <div className="error">{t("tiepDon.denNgaySaiDinhDang")}</div>
              ) : checkValidate && doiTuong === 2 && !denNgayApDung ? (
                <div className="error">{t("tiepDon.vuiLongChonDenNgay")}</div>
              ) : null}
            </div>
          </Col>
        )}
        <Col md={24} xl={24} xxl={24}>
          <div className="item-input">
            <label
              className={
                "label"
                // !cdNoiGioiThieu && doiTuong === 2
                //   ? `label label-error`
                //   : "label"
              }
            >
              {t("tiepDon.chanDoanNoiGioiThieu")}
              {/* {doiTuong === 2 && <span style={{ color: "red" }}> *</span>} */}
            </label>
            <InputTimeout
              placeholder={t("tiepDon.nhapNoiDung")}
              isTextArea={true}
              value={cdNoiGioiThieu}
              onChange={onChange("cdNoiGioiThieu")}
              disabled={disableTiepDon}
              cols={5}
            />
            {/* {checkValidate && doiTuong === 2 && !cdNoiGioiThieu && (
              <div className="error">Vui lòng chẩn đoán nơi giới thiệu!</div>
            )} */}
          </div>
        </Col>
        <Col
          md={!isSameHospital ? 12 : 24}
          xl={!isSameHospital ? 12 : 24}
          xxl={!isSameHospital ? 12 : 24}
        >
          <div className="item-input">
            <label
              className={
                !noiDangKyId && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              {t("tiepDon.noiDangKy")}
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <SelectMore
              onChange={onChangeNoiDangKy}
              className="noiDangKyId"
              placeholder={t("tiepDon.chonNoiDangKy")}
              data={listAllBenhVien || []}
              value={noiDangKyId}
              disabled={disableTiepDon}
              valueTen={"ma"}
            />
            {checkValidate && doiTuong === 2 && !noiDangKyId && (
              <div className="error">{t("tiepDon.vuiLongChonNoiDangKy")}</div>
            )}
          </div>
        </Col>
        {!isSameHospital ? ( //và nơi đăng ký không trùng với thông tin khai báo trong thiết lập chung tài khoản bhxh thì hiển thị ô nhập nơi giới thiệu
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label
                className={
                  !noiGioiThieuId &&
                  doiTuong === 2 &&
                  (checkNoiGioiThieu || !thongTinBenhNhan?.noiTru) &&
                  maNguonNb !== dataNGUON_NGUOI_BENH
                    ? `label label-error`
                    : "label"
                }
              >
                {t("tiepDon.noiGioiThieu")}
                {doiTuong === 2 &&
                  (checkNoiGioiThieu || !thongTinBenhNhan?.noiTru) &&
                  !henKhamLai &&
                  maNguonNb !== dataNGUON_NGUOI_BENH && (
                    <span style={{ color: "red" }}> *</span>
                  )}
              </label>
              <SelectMore
                className="noiGioiThieuId"
                onChange={onChange("noiGioiThieuId")}
                placeholder={t("tiepDon.chonNoiGioiThieu")}
                data={listAllBenhVien || []}
                value={noiGioiThieuId}
                disabled={disableTiepDon}
                valueTen={"ma"}
              />
              {checkValidate &&
                doiTuong === 2 &&
                (checkNoiGioiThieu || !thongTinBenhNhan?.noiTru) &&
                !henKhamLai &&
                maNguonNb !== dataNGUON_NGUOI_BENH &&
                !noiGioiThieuId && (
                  <div className="error">
                    {t("tiepDon.vuiLongChonNoiGioiThieu")}
                  </div>
                )}
            </div>
          </Col>
        ) : null}
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label">
              {t("tiepDon.thoiGianDu5NamLienTuc")}
            </label>
            <DOBInput
              className="item-born"
              value={{ date: thoiGianDu5Nam, str: state.thoiGianDu5NamStr }}
              onBlur={(e, nofi) => {
                if (e.date?._d?.ddmmyyyy() === thoiGianDu5Nam?._d?.ddmmyyyy())
                  return;
                if (e.date) onChange("thoiGianDu5Nam")(e.date);
              }}
              disabled={disableTiepDon}
              onChange={(e) => {
                setState({
                  thoiGianDu5NamStr: e.str,
                });
              }}
              placeholder={t("common.chonNgay")}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label">{t("tiepDon.mienGiamTuNgay")}</label>
            <DOBInput
              className="item-born"
              value={{
                date: tuNgayMienCungChiTra,
                str: state.tuNgayMienCungChiTraStr,
              }}
              onBlur={(e, nofi) => {
                mienDongChiTra &&
                  tuNgayMienCungChiTra &&
                  denNgayMienCungChiTra &&
                  doiTuong === 2 &&
                  showUploadFile(
                    giayMienCungChiTra || [],
                    "giayMienCungChiTra",
                    t("tiepDon.mienCungChiTra")
                  );
                if (
                  e.date?._d?.ddmmyyyy() ===
                  tuNgayMienCungChiTra?._d?.ddmmyyyy()
                )
                  return;
                if (e.date) onChange("tuNgayMienCungChiTra")(e.date);
              }}
              disabled={disableTiepDon}
              onChange={(e) => {
                setState({
                  tuNgayMienCungChiTraStr: e.str,
                });
              }}
              placeholder={t("common.chonNgay")}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label">{t("tiepDon.mienGiamDenNgay")}</label>
            <DOBInput
              className="item-born"
              value={{
                date: denNgayMienCungChiTra,
                str: state.denNgayMienCungChiTraStr,
              }}
              onBlur={(e, nofi) => {
                mienDongChiTra &&
                  tuNgayMienCungChiTra &&
                  denNgayMienCungChiTra &&
                  doiTuong === 2 &&
                  showUploadFile(
                    giayMienCungChiTra || [],
                    "giayMienCungChiTra",
                    t("tiepDon.mienCungChiTra")
                  );
                if (
                  e.date?._d?.ddmmyyyy() ===
                  denNgayMienCungChiTra?._d?.ddmmyyyy()
                )
                  return;
                if (e.date) onChange("denNgayMienCungChiTra")(e.date);
              }}
              disabled={disableTiepDon}
              onChange={(e) => {
                setState({
                  denNgayMienCungChiTraStr: e.str,
                });
              }}
              placeholder={t("common.chonNgay")}
            />
          </div>
        </Col>
        {!!id && (
          <>
            <Col md={24} xl={24} xxl={24}>
              <div className="item-input">
                <label className={"label"}>{t("tiepDon.diaChiTheBHYT")}</label>
                <InputTimeout
                  placeholder={t("tiepDon.nhapDiaChiBHYT")}
                  value={diaChi}
                  onChange={onChange("diaChiBHYT")}
                  disabled={disableTiepDon}
                />
              </div>
            </Col>
            <Col md={24} xl={24} xxl={24}>
              <div className="item-select">
                <label className={`label`}>{t("tiepDon.maKhuVuc")}</label>
                <Select
                  onChange={onChange("khuVuc")}
                  value={khuVuc}
                  className="select"
                  placeholder={t("tiepDon.chonMaKhuVuc")}
                  data={listkhuVucBHYT || []}
                  disabled={disableTiepDon}
                />
              </div>
            </Col>
          </>
        )}

        {noiGioiThieuId ? (
          <Col md={12} xl={12} xxl={12}>
            <div className={`checkbox ${henKhamLai ? "disabled" : ""}`}>
              <div
                className={"upload-giay-chuyen-tuyen"}
                onClick={
                  !henKhamLai &&
                  showUploadFile(
                    giayChuyenTuyen,
                    "giayChuyenTuyen",
                    t("tiepDon.chuyenTuyen")
                  )
                }
              >
                {t("tiepDon.taiLenGiayChuyenTuyen")}
                {giayChuyenTuyen?.length ? (
                  <IcEye className="icon" />
                ) : (
                  <IcCloud className="icon" />
                )}
              </div>
            </div>
          </Col>
        ) : null}
        {noiGioiThieuId &&
          tuNgayMienCungChiTra &&
          denNgayMienCungChiTra &&
          doiTuong === 2 && (
            <Col md={12} xl={12} xxl={12}>
              <div className={`checkbox ${henKhamLai ? "disabled" : ""}`}>
                <div
                  className={"upload-giay-chuyen-tuyen"}
                  onClick={showUploadFile(
                    giayMienCungChiTra,
                    "giayMienCungChiTra",
                    t("tiepDon.mienCungChiTra")
                  )}
                >
                  {t("tiepDon.taiLenGiayMienCungChiTra")}
                  {giayMienCungChiTra?.length ? (
                    <IcEye className="icon" />
                  ) : (
                    <IcCloud className="icon" />
                  )}
                </div>
              </div>
            </Col>
          )}

        <Col md={12} xl={12} xxl={12}>
          <div className="checkbox co-lich-hen-kham-lai">
            <Checkbox
              checked={henKhamLai}
              disabled={disableTiepDon}
              onChange={() => onBlur(!henKhamLai, "henKhamLai")}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  onChange("henKhamLai")(!e?.target?.checked);
                }
              }}
            ></Checkbox>
            <div
              onClick={
                henKhamLai &&
                showUploadFile(
                  giayHenKham,
                  "giayHenKham",
                  t("tiepDon.henKhamLai")
                )
              }
            >
              {t("tiepDon.coLichHenKhamLai")}
              {giayHenKham?.length ? (
                <IcEye className="icon" />
              ) : (
                <Tooltip title={t("tiepDon.taiTepLen")} placement="bottom">
                  <IcCloud className="icon" />
                </Tooltip>
              )}
            </div>
          </div>
        </Col>
        {!noiGioiThieuId &&
          tuNgayMienCungChiTra &&
          denNgayMienCungChiTra &&
          doiTuong === 2 && (
            <Col md={12} xl={12} xxl={12}>
              <div className={`checkbox ${henKhamLai ? "disabled" : ""}`}>
                <div
                  className={"upload-giay-chuyen-tuyen"}
                  onClick={showUploadFile(
                    giayMienCungChiTra,
                    "giayMienCungChiTra",
                    t("tiepDon.mienCungChiTra")
                  )}
                >
                  {t("tiepDon.taiLenGiayMienCungChiTra")}
                  {giayMienCungChiTra?.length ? (
                    <IcEye className="icon" />
                  ) : (
                    <IcCloud className="icon" />
                  )}
                </div>
              </div>
            </Col>
          )}
      </Main>
      <ModalUploadGiayTo ref={refModalUploadGiayTo} />
    </Box>
  );
};

export default memo(ThongTinBaoHiem);
