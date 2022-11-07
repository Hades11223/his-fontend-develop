import React, {
  useRef,
  memo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import { useSelector } from "react-redux";
import { ENUM, ROLES, THIET_LAP_CHUNG } from "constants/index";
import { Row, Col, message, Tooltip, Dropdown, Menu } from "antd";
import { refConfirm } from "app";
import { useDispatch } from "react-redux";
import { Button, LazyLoad, AuthWrapper } from "components";
import { useHistory } from "react-router-dom";
import stringUtils from "mainam-react-native-string-utils";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum, useThietLap } from "hook";
import IcCancel from "assets/svg/ic-cancel.svg";
import IcSave from "assets/svg/ic-save.svg";
import IcEmergency from "assets/svg/tiep-don/ic-emergency.svg";
import IcXemThongKe from "assets/svg/tiep-don/xemThongKe.svg";
import IcDanhSachNbDaTiepDon from "assets/svg/tiep-don/iconDanhSachDaTiepDon.svg";
import IcBaoCao from "assets/svg/tiep-don/icBaoCao.svg";
import { ListBaoCao } from "pages/home/layout/configData";
import { checkRole } from "utils/role-utils";

const ThongTinTiepDon = ({ onOk, onCancel, id, isEdit, onlySeen }, ref) => {
  const { t } = useTranslation();
  const history = useHistory();
  const refLayerHotKey = useRef(stringUtils.guid());
  const { quayTiepDonId } = useSelector((state) => state.goiSo);
  const {
    tenNb,
    ngaySinh,
    doiTuong,
    nbQuanNhan,
    nbGiayToTuyThan,
    nbTheBaoHiem,
    nbCapCuu,
    disableTiepDon,
    stt,
    capCuu,
    dataMacDinh,
    dangKyKhamCc,
    nbNguonNb,
    boQuaCheckThe,
  } = useSelector((state) => state.tiepDon);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const [dataMA_KHOA_CAP_CUU] = useThietLap(THIET_LAP_CHUNG.MA_KHOA_CAP_CUU);
  const { listAllQuayTiepDonTaiKhoan } = useSelector(
    (state) => state.quayTiepDon
  );
  const { listAllNguonNguoiBenh } = useSelector(
    (state) => state.nguonNguoiBenh
  );
  const menu = () => {
    let dsMaQuyenBaoCao = [
      ROLES.BAO_CAO.BC01,
      ROLES.BAO_CAO.BC02,
      ROLES.BAO_CAO.NGUOI_BENH_KHAM_CHI_TIET,
      ROLES.BAO_CAO.NGUOI_BENH_CO_LICH_HEN_KHAM,
      ROLES.BAO_CAO.PK03,
    ];
    let data = ListBaoCao.filter((options) => {
      if (
        !dsMaQuyenBaoCao.includes(options.accessRoles[0]) ||
        !checkRole(options.accessRoles)
      )
        return false;
      return true;
    });
    return (
      <Menu
        items={data.map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={() => window.open(`${item.link}`)}>
              {item.title}
            </a>
          ),
        }))}
      ></Menu>
    );
  };

  const {
    tiepDon: {
      updateData,
      getById,
      resetData,
      giamDinhThe,
      hienThiThongTinThe,
      onSetCapCuu,
      onCheckIsKhamCapCuu,
      onChangeDoiTuong,
      tiepDon,
    },
    tiepDonDichVu: { keDichVuKham, getPhieuKhamBenh },
    goiSo: { huyTiepDon },
    nbDotDieuTri: { searchNBDotDieuTriTongHop },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    information: { onCheckTrungThongTin, checkTrungThongTin },
  } = useDispatch();

  const { nguonNbId } = nbNguonNb || {};
  const maNguonNb = nguonNbId
    ? listAllNguonNguoiBenh.find((x) => x.id === nguonNbId)?.ma
    : null;

  const refTrungThongTin = useRef();
  const refModalCheckBaoHiem = useRef();
  const refModal = useRef(null);
  const refTabThongTin = useRef(null);
  const refSubmit = useRef(null);
  const refIsSubmit = useRef(false);

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: () => {
            refSubmit.current && refSubmit.current();
          },
        },
        {
          keyCode: 27, //ESC
          onEvent: () => {
            onCancel && onCancel();
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    refSubmit.current = onSubmit;
  });
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  const onChange = (value, variables) => {
    let newData = { [`${variables}`]: value };
    if (variables === "doiTuong" && value) {
      onChangeDoiTuong({ value });
      return;
    }
    if (variables === "anhMatTruoc" || variables === "anhMatSau") {
      newData.nbGiayToTuyThan = {
        ...(nbGiayToTuyThan || {}),
        [`${variables}`]: value,
      };
    }
    if (variables == "gioiTinh") {
      newData.gioiTinh = value;
      checkMaTheBhyt(
        (listGioiTinh?.find((gt) => gt.id === value) || {}).ten,
        "gioiTinh",
        t("common.gioiTinh")
      );
    }
    if (variables == "capCuu") {
      newData.capCuu = value;
    }
    updateData(newData);
  };
  const showTrungThongTin = (data, dataBVE) => {
    refTrungThongTin.current.show(
      {
        show: true,
        data: data,
        dataBVE: dataBVE,
      },
      (data, code) => {
        if (data) {
          let tenNb = data?.data?.tenNb;
          let maThe = data?.data?.nbTheBaoHiem?.maThe;
          let ngaySinh = data?.data?.ngaySinh;
          if (code) {
            updateData({
              doiTuong: 1,
              loaiDoiTuongId: dataMacDinh?.loaiDoiTuong?.id,
              id: "",
            });
          }
          if (tenNb && maThe && ngaySinh && !dataBVE) {
            onCheckCardInsurance(
              {
                hoTen: tenNb,
                maThe,
                ngaySinh,
              },
              { tenNb }
            );
          } else {
            if (dataBVE) {
              let s = data;
              if (s?.data?.id) {
                if (dataBVE?.dsDichVu?.length) {
                  let data = dataBVE?.dsDichVu.map((item) => {
                    return {
                      nbDotDieuTriId: s?.data?.id,
                      nbDvKyThuat: {
                        phongThucHienId: item?.phongId,
                        ngoaiVienId: {
                          id: item?.ngoaiVienId,
                        },
                      },
                      nbDichVu: {
                        dichVuId: item?.dichVuId,
                        soLuong: 1,
                        chiDinhTuDichVuId: s?.data?.id,
                        chiDinhTuLoaiDichVu: 200,
                        khoaChiDinhId: s?.data?.khoaId,
                        loaiDichVu: item?.loaiDichVu,
                        khongThuTien: item?.khongThuTien,
                      },
                    };
                  });
                  keDichVuKham({ data }).then(() => {
                    history.push(`/tiep-don/dich-vu/${s?.data?.id}`);
                    if (data.length > 0) {
                      getPhieuKhamBenh({
                        id: s?.data?.id,
                        data,
                      });
                    }
                  });
                } else {
                  history.push(`/tiep-don/dich-vu/${s?.data?.id}`);
                }
              }
            }
          }
        } else {
          if (nbTheBaoHiem?.maThe && tenNb?.length && ngaySinh?.date) {
            onCheckCardInsurance(
              {
                hoTen: tenNb,
                maThe: nbTheBaoHiem?.maThe,
                ngaySinh: ngaySinh?.date,
              },
              { tenNb: tenNb }
            );
          }
        }
      }
    );
  };
  const onCheckTrung = (value, variables) => {
    onCheckTrungThongTin({
      variables,
      value,
    }).then((s) => {
      if (s?.type == 1) {
        showTrungThongTin(s.data);
      } else {
        if (s?.type == 2) {
          onCheckCardInsurance(s.data, { tenNb: s.data?.hoTen });
        }
      }
    });
  };

  const onCheckTrungBVE = (data, dataBVE) => {
    checkTrungThongTin(data).then((s) => {
      if (s.data?.length) {
        showTrungThongTin(s.data, dataBVE);
      } else {
        if (data?.maTheBhyt) {
          onCheckCardInsurance(
            { ...dataBVE, hoTen: data?.tenNb, maThe: data?.maTheBhyt },
            { tenNb: data?.tenNb }
          );
        }
      }
    });
  };

  // hàm gọi trực tiếp check cổng
  const checkMaTheBhyt = (value, variables, nameDetail) => {
    if (
      (doiTuong !== 2 && variables !== "maThe") ||
      !nbTheBaoHiem?.maThe ||
      !tenNb ||
      !ngaySinh
    )
      return;
    if (boQuaCheckThe) return;
    const check = (value) => {
      return value?.trim && value?.trim();
    };

    if (!check(tenNb || (variables === "hoTen" ? value : ""))) {
      message.error(t("tiepDon.vuiLongDienHoVaTen"));
      return;
    }
    if (!check(ngaySinh?.str || (variables === "ngaySinh" ? value : ""))) {
      message.error(t("tiepDon.vuiLongNhapNgaySinh"));
      return;
    }
    if (!check(nbTheBaoHiem?.maThe || (variables === "maThe" ? value : ""))) {
      message.error(t("tiepDon.vuiLongDienSoBaoHiem"));
      return;
    }
    onGiamDinhThe({
      data: {
        hoTen: tenNb || "",
        maThe: nbTheBaoHiem?.maThe || "",
        ngaySinh: ngaySinh?.date || "",
        [variables]: value,
      },
      tenNb: tenNb || "",
      diaChi: "",
    });
  };
  const showModalQuanNhan = () => {
    refModal.current.refQuanNhan.current.show({
      show: true,
      donViId: nbQuanNhan?.donViId,
      nguoiDaiDienId: nbQuanNhan?.nguoiDaiDienId,
      chucVuId: nbQuanNhan?.chucVuId,
      quanHamId: nbQuanNhan?.quanHamId,
    });
  };
  const showModalCapCuu = () => {
    refModal.current.refAddCapCuu.current.show(
      {
        show: true,
        loaiCapCuuId: nbCapCuu?.loaiCapCuuId,
        viTriChanThuongId: nbCapCuu?.viTriChanThuongId,
        nguyenNhanNhapVienId: nbCapCuu?.nguyenNhanNhapVienId,
        thoiGianCapCuuId: nbCapCuu?.thoiGianCapCuuId,
      },
      (data = {}) => {
        updateData({ nbCapCuu: { ...nbCapCuu, ...data } });
      }
    );
  };
  const onSubmit = ({ boQuaChuaThanhToan = false } = {}) => {
    if (refIsSubmit.current) return;
    refIsSubmit.current = true;
    tiepDon({ boQuaChuaThanhToan, maNguonNb }).then((s) => {
      refIsSubmit.current = false;
      switch (s.code) {
        case 1: //chưa chọn quầy
          message.error(s.message);
          return;
        case 2: //đia chỉ
          return;
        case 3: //chưa thanh toán
          if (s?.data?.doiTuong === 2) {
            refConfirm.current &&
              refConfirm.current.show(
                {
                  showBtnOk: true,
                  title: t("common.thongBao"),
                  content: s.message,
                },
                () => {}
              );
          } else {
            onSubmit({ boQuaChuaThanhToan: true });
          }
          return;
        case 4: //quân nhân
          showModalQuanNhan();
          return;
        case 5:
          showModalCapCuu();
          return;
        case 10:
          // message.error(s.message);
          return;
        case 7950:
          refConfirm.current &&
            refConfirm.current.show({
              content: s.message,
              onOk: () => onBackCheckThe(true),
              onCancel: () => onBackCheckThe(),
            });
          return;
        case 7920:
          refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.thongBao"),
                content: `${s?.message}`,
                showBtnOk: true,
                classNameOkText: "button-error",
              },
              () => {
                onChange(1, "doiTuong");
              }
            );
          return;
        case 7922: //cấp cứu
          refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.thongBao"),
                content: `${s?.message}`,
                showBtnOk: true,
                classNameOkText: "button-error",
              },
              () => {
                onSubmit({ boQuaChuaThanhToan: true });
              }
            );
          return;
        case 7923:
        case 7924:
          refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.canhBao"),
                content: `${s?.message}`,
                cancelText: t("common.quayLai"),
                okText: t("common.xacNhan"),
                typeModal: "warning",
                showImg: false,
                showBtnOk: true,
              },
              () => {
                history.push(`/tiep-don/dich-vu/${s.id}`);
              },
              () => {}
            );
          break;
        case 9740:
          refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.canhBao"),
                content: `${s?.message}`,
                cancelText: t("common.quayLai"),
                okText: t("common.xemChiTiet"),
                typeModal: "warning",
                showImg: false,
                showBtnOk: true,
              },
              () => {
                searchNBDotDieuTriTongHop({
                  nbThongTinId: s.nbThongTinId,
                }).then((s) => {
                  if (!s?.code) {
                    if (onOk) {
                      onOk(s?.data[0]?.id);
                    } else {
                      history.push(
                        `/tiep-don/dich-vu/${
                          s?.data[0]?.id ? s?.data[0]?.id : ""
                        }`
                      );
                    }
                  }
                });
              },
              () => {}
            );
          break;
        case 0:
          if (onOk) {
            onOk(s.id);
          } else {
            if (s.edit || !s.khamCapCuu) {
              history.push(`/tiep-don/dich-vu/${s.id}`);
            } else if (s.khamCapCuu) {
            }
          }
          message.success(s?.message || t("common.capNhatThanhCong"));
          break;
        default:
          return;
      }
    });
    setTimeout(() => (refIsSubmit.current = false), 1000);
  };
  const onBackCheckThe = (onOK) => {
    if (onOK) {
      let data = nbTheBaoHiem || {};
      data.boQuaTheLoi = true;
      updateData({ nbTheBaoHiem: { ...data } });
      onSubmit();
    }
  };

  // hàm xử lý bắt trùng
  const onCheckCardInsurance = (data, item, checkCong) => {
    if (!nbTheBaoHiem?.boQuaTheLoi || checkCong) {
      onGiamDinhThe({ data, tenNb: item?.tenNb, diaChi: item?.diaChi });
    }
  };
  const onGiamDinhThe = ({ data, tenNb, diaChi }) => {
    const { ngaySinh } = data;
    const dataInfo = data;
    data.ngaySinh =
      ngaySinh && moment(moment(ngaySinh, "YYYY-MM-DD"))?.format("YYYY-MM-DD"); // sửa vấn đề gửi bị lùi 1 ngày
    giamDinhThe(data)
      .then((data) => {
        updateData({ verifingCongBaoHiem: false, theBaoHiem: data?.data });
        refModalCheckBaoHiem.current.show(
          {
            show: true,
            data: data,
            hoTen: tenNb,
            diaChi: diaChi,
          },
          (item) => {
            if (item?.hoTen) {
              hienThiThongTinThe({ ...dataInfo, ...item });
            } else if (item.boQuaTheLoi) {
              updateData({ boQuaCheckThe: true });
            }
          }
        );
      })
      .catch((e) => {
        updateData({ verifingCongBaoHiem: false });
      });
  };
  const edit = (value) => () => {
    updateData({ disableTiepDon: value });
    if (value) getById(id);
  };
  const onBack = () => {
    if (onCancel) {
      onCancel(id);
    } else history.push(`/tiep-don/dich-vu/${id}`);
  };
  const onResetData = () => {
    if (refConfirm.current)
      refConfirm.current.show(
        {
          title: t("tiepDon.huyTiepDon"),
          content: t("tiepDon.xacNhanHuyTiepDon"),
          cancelText: t("common.quayLai"),
          okText: t("tiepDon.huyTiepDon"),
          classNameOkText: "button-error",
          showBtnOk: true,
        },
        () => {
          if (stt && quayTiepDonId) {
            huyTiepDon(quayTiepDonId);
          }
          resetData();
        }
      );
  };
  const onShowThongKe = (show = true) => {
    if (refTabThongTin.current) {
      refTabThongTin.current.show({ show });
    }
  };
  useEffect(() => {
    onSetCapCuu();
  }, [quayTiepDonId, listAllQuayTiepDonTaiKhoan, dataMA_KHOA_CAP_CUU]);

  useEffect(() => {
    onCheckIsKhamCapCuu();
  }, [capCuu, quayTiepDonId, dataMA_KHOA_CAP_CUU, listAllQuayTiepDonTaiKhoan]);

  return (
    <Main className="leftToRight">
      <Row style={{ width: "100%" }}>
        <Col md={24} xl={!id ? 16 : 18} xxl={!id ? 16 : 18}>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].THONG_TIN_CHUNG]}>
            <LazyLoad
              component={import("./InfoHeader")}
              onChange={onChange}
              onCheckCardInsurance={onCheckCardInsurance}
              refModal={(fnc) => (refModal.current = fnc)}
              onCheckTrungThongTin={onCheckTrungBVE}
              id={id}
            />
          </AuthWrapper>
        </Col>
        <Col md={24} xl={!id ? 8 : 6} xxl={!id ? 8 : 6} className="bg-color1">
          <div className={id ? "" : "line"}>
            <LazyLoad
              component={import("../DanhSachBenhNhan")}
              layerId={refLayerHotKey.current}
              onChange={onChange}
              disabled={id}
              onGiamDinhThe={onGiamDinhThe}
              id={id}
            />
          </div>
          {!id && (
            <div className="image">
              <div className="item" onClick={() => onShowThongKe(true)}>
                <Tooltip title={t("tiepDon.thongKeTiepDon")} placement="left">
                  <IcXemThongKe />
                </Tooltip>
              </div>
              <div className="item">
                <Tooltip title={t("tiepDon.baoCaoTiepDon")} placement="left">
                  <Dropdown overlay={menu} trigger="click" placement="left">
                    <IcBaoCao />
                  </Dropdown>
                </Tooltip>
              </div>
              <div
                className="item"
                onClick={() =>
                  window.open("/quan-ly-tiep-don/danh-sach-nb-da-tiep-don")
                }
              >
                <Tooltip title={t("tiepDon.dsNbDaTiepDon")} placement="left">
                  <IcDanhSachNbDaTiepDon />
                </Tooltip>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <LazyLoad
        id={id}
        component={import("./Info")}
        layerId={refLayerHotKey.current}
        onChange={onChange}
        history={history}
        onCheckTrungThongTin={onCheckTrung}
        checkMaTheBhyt={checkMaTheBhyt}
        isEdit={isEdit}
      />
      <div className={`button-bottom`}>
        {id ? (
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].SUA_THONG_TIN]}>
            {disableTiepDon ? (
              <>
                <Button onClick={onBack} type="default" minWidth={100}>
                  <span>{t("common.quayLai")}</span>
                </Button>
                {!onlySeen && (
                  <Button onClick={edit(false)} type="primary">
                    <span>{t("common.capNhatThongTin")}</span>
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button onClick={onBack} type="default" minWidth={100}>
                  <span>{t("common.huy")}</span>
                </Button>
                <Button
                  onClick={onSubmit}
                  type="primary"
                  iconHeight={15}
                  rightIcon={<IcSave />}
                >
                  <span>{t("common.luuThayDoi")}</span>
                  <span className="hotKey">[F4]</span>
                </Button>
              </>
            )}
          </AuthWrapper>
        ) : (
          <>
            <AuthWrapper accessRoles={[ROLES["TIEP_DON"].HUY_TIEP_DON]}>
              <Button
                onClick={onResetData}
                type="default"
                iconHeight={10}
                rightIcon={<IcCancel />}
              >
                {t("tiepDon.huyTiepDon")}
              </Button>
            </AuthWrapper>
            <Button
              className="submit-form-button"
              onClick={onSubmit}
              type="primary"
              iconHeight={20}
              rightIcon={<IcSave />}
            >
              <span>{t("common.luuThongTin")}</span>
              <span className="hotKey">[F4]</span>
            </Button>

            {dangKyKhamCc && (
              <Button
                className="primary"
                onClick={() => onSubmit()}
                rightIcon={<IcEmergency />}
                backgroundColor={"#08CFDE"}
                borderColor={"#08B3C0"}
                iconHeight={20}
              >
                {t("tiepDon.luuVaDangKyKhamCapCuu")}
              </Button>
            )}
          </>
        )}
      </div>
      <LazyLoad
        component={import("./ModalCheckBaoHiem")}
        ref={refModalCheckBaoHiem}
      />
      <LazyLoad
        component={import("./ModalTrungThongTin")}
        ref={refTrungThongTin}
      />
      <LazyLoad
        ref={refTabThongTin}
        component={import("../DanhSachBenhNhan/TabThongTin")}
      />
    </Main>
  );
};

export default memo(forwardRef(ThongTinTiepDon));
