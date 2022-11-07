import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, message, Tooltip } from "antd";
import { DANH_SACH_DAU_TRANG } from "../ThongTin/config";
import NavigationBar from "./NavigationBar";
import StepWrapper from "../components/StepWrapper";
import CustomPopoverWithRef from "../components/CustomPopoverWithRef";
// import ModalChiDinh from "../ModalChiDinh";
import { isEqual, cloneDeep, isEmpty } from "lodash";
import { PopoverWrapper, ButtonFooter, Main } from "./styled";
import FormPopoverKetThucKham from "./FormPopoverKetThucKham";
import { LOAI_DICH_VU, TRANG_THAI_DICH_VU } from "constants/index";
import { Button, LazyLoad } from "components";
import ModalKetThucKham from "./ModalKetThucKham";
import { ROLES, HUONG_DIEU_TRI_KHAM, KET_QUA_KHAM } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";
import ArrowLeft from "assets/images/khamBenh/arrow-left.png";
import ArrowRight from "assets/images/khamBenh/arrow-right.png";
import { useLoading, usePrevious, useStore } from "hook";
import moment from "moment";
import { DEFAULT_CHAN_DOAN_KSK } from "../configs";
export const refElement = React.createRef();

const ThongTin = ({ layerId }) => {
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  if (!refElement.current) {
    refElement.current = {};
  }
  const [state, _setState] = useState({
    keyHuongDieuTri: null,
    keyKetQua: null,
    activeTab: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refModalKetThucKham = useRef(null);
  const refCustomPopover = useRef(null);
  const refData = useRef({});
  const refConfirmSaveShowing = useRef(null);
  const refDataKetLuan = useRef({});
  const refKetLuanKham = useRef({});
  const refFuncNavi = useRef(null);
  const { dsDichVuChiDinhXN, dsDichVuChiDinhKham, dsDichVuChiDinhCls } =
    useSelector((state) => state.chiDinhKhamBenh);
  const thongTinKSK = useSelector((state) => state.nbDichVuKhamKSK.thongTinKSK);
  const listAllMaBenh = useSelector(
    (state) => state.maBenh.listAllMaBenh || []
  );

  const {
    chiDinhKhamBenh: { updateData: updateDataChiDinh, updateConfigData },
    khamBenh: {
      dangKetLuan,
      updateNbDvKham,
      huyKetLuanKham,
      huyKetLuanGetMethod,
      ketLuanKham,
      thietLapTrangThai,
      updateData: updateDataKhamBenh,
      getStatisticsRoom,
    },
    phimTat: { onRegisterHotkey },
    nbDichVuKhamKSK: { updateKhamKSK, hoanThanhKSK, huyHoanThanhKSK },
  } = useDispatch();
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});
  const infoNb = useStore("khamBenh.infoNb", {});
  const nbChanDoan = useStore("khamBenh.thongTinChiTiet.nbChanDoan", {});
  const { huongDieuTri, ketQuaDieuTri } = useStore(
    "khamBenh.thongTinChiTiet.nbKetLuan",
    {}
  );
  const trangThaiKham = useStore(
    "khamBenh.thongTinChiTiet.nbDvKyThuat.trangThai",
    {}
  );
  const phongThucHienId = useStore("nbKhamBenh.phongThucHienId", null);

  const preNbDvKhamId = usePrevious(thongTinChiTiet.id);
  const hasDichVu = useMemo(() => {
    return (
      dsDichVuChiDinhXN.length > 0 ||
      dsDichVuChiDinhKham.length > 0 ||
      dsDichVuChiDinhCls.length > 0
    );
  }, [dsDichVuChiDinhKham, dsDichVuChiDinhXN, dsDichVuChiDinhCls]);

  const dataDichVu = useMemo(
    () => [...dsDichVuChiDinhKham, ...dsDichVuChiDinhXN, ...dsDichVuChiDinhCls],
    [dsDichVuChiDinhKham, dsDichVuChiDinhXN, dsDichVuChiDinhCls]
  );

  const [form] = Form.useForm();

  const isKsk = useMemo(() => {
    return infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk;
  }, [infoNb]);

  const kskChanDoanIds = useMemo(() => {
    const _cdIds =
      listAllMaBenh.find((x) => x.ma == DEFAULT_CHAN_DOAN_KSK)?.id || null;

    return _cdIds ? [_cdIds] : [];
  }, [listAllMaBenh]);

  useEffect(() => {
    thietLapTrangThai();
  }, []);

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 37,
          onEvent: () => {
            refFuncNavi.current &&
              refFuncNavi.current("previous", state.activeTab)();
          },
        },
        {
          keyCode: 39,
          onEvent: () => {
            refFuncNavi.current &&
              refFuncNavi.current("next", state.activeTab)();
          },
        },
      ],
    });
  }, [state.activeTab]);
  useEffect(() => {
    document.addEventListener("keydown", handleOnSave);
    return () => document.removeEventListener("keydown", handleOnSave);
  }, [
    state.activeTab,
    infoNb,
    thongTinChiTiet,
    dsDichVuChiDinhCls,
    dsDichVuChiDinhKham,
    dsDichVuChiDinhXN,
    state.keyHuongDieuTri,
    state.keyKetQua,
  ]);
  useEffect(() => {
    Object.keys(refElement.current).forEach((key) => {
      refElement.current[key].reload();
    });
  }, [infoNb.id]);

  useEffect(() => {
    if (huongDieuTri || ketQuaDieuTri) {
      refKetLuanKham.current = {
        keyHuongDieuTri: huongDieuTri,
        keyKetQua: ketQuaDieuTri,
      };
      setState({ keyHuongDieuTri: huongDieuTri, keyKetQua: ketQuaDieuTri });
    }
  }, [huongDieuTri, ketQuaDieuTri]);

  useEffect(() => {
    updateDataChiDinh({
      //nb nb chẩn đoán thay đổi thì cập nhật vào dataNb chiDinhKhamBenh
      dataNb: nbChanDoan,
    });
  }, [nbChanDoan]);

  useEffect(() => {
    let _thongTinChiTiet = thongTinChiTiet;
    //nếu là ksk thì mặc định chẩn đoán chính là Z00
    if (isKsk && !_thongTinChiTiet.nbChanDoan?.dsCdChinhId)
      _thongTinChiTiet = {
        ..._thongTinChiTiet,
        nbChanDoan: {
          ..._thongTinChiTiet.nbChanDoan,
          dsCdChinhId: kskChanDoanIds,
        },
      };

    refData.current = cloneDeep(_thongTinChiTiet);
    refDataKetLuan.current = cloneDeep(_thongTinChiTiet);
    if (preNbDvKhamId != thongTinChiTiet.id) {
      setTimeout(() => {
        setState({ activeTab: 0 });
      }, 500);
    }
  }, [thongTinChiTiet, kskChanDoanIds]);

  useEffect(() => {
    if (thongTinChiTiet.id && thongTinChiTiet.nbDotDieuTriId == infoNb.id) {
      updateConfigData({
        configData: {
          nbDotDieuTriId: infoNb.id,
          nbThongTinId: infoNb.nbThongTinId,
          chiDinhTuDichVuId: thongTinChiTiet.id,
          chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
          dsChiDinhTuLoaiDichVu: [LOAI_DICH_VU.KHAM],
          khoaChiDinhId: thongTinChiTiet.nbDichVu?.khoaChiDinhId,
          thongTinNguoiBenh: infoNb,
        },
      });
    }
  }, [thongTinChiTiet, infoNb]);

  const handleOnSave = (e) => {
    const { ctrlKey, metaKey, which, value } = e;
    if (
      (ctrlKey || metaKey) &&
      String.fromCharCode(which).toLowerCase() === "s"
    ) {
      e.preventDefault();
      if (
        hasDichVu &&
        !refData?.current?.nbChanDoan?.cdSoBo &&
        refData?.current?.nbChanDoan?.dsCdChinhId?.length === 0
      ) {
        message.error(t("khamBenh.thongBaoKhongTheXoaChanDoanKhiDaKeDichVu"));
        // refData.current.nbChanDoan.cdSoBo = thongTinChiTiet.nbChanDoan.cdSoBo
        // var text = document.createTextNode(`${thongTinChiTiet.nbChanDoan.cdSoBo}`);
        // document.getElementById("chan-doan-so-bo").innerHTML = thongTinChiTiet.nbChanDoan.cdSoBo
      } else {
        saveDataByKey();
      }
    }
  };
  const onSaveKetLuanKham = (
    ketThuc,
    { bacSiKetLuanId, thoiGianKetLuan } = {}
  ) => {
    return new Promise((resolve, reject) => {
      const bodyKetLuan = ketThuc
        ? { bacSiKetLuanId, thoiGianKetLuan, id: thongTinChiTiet.id }
        : getBodyKetLuan({
            bacSiKetLuanId,
            thoiGianKetLuan,
          });
      if (!ketThuc) {
        bodyKetLuan.huongDieuTri = state.keyHuongDieuTri;
        bodyKetLuan.ketQuaDieuTri = state.keyKetQua;
      }
      ketLuanKham(bodyKetLuan, ketThuc)
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
  const getBodyKetLuan = (payload = {}) => {
    const { keyHuongDieuTri, keyKetQua } = refKetLuanKham.current;
    const {
      nbChuyenVien,
      nbNhapVien,
      nbKetLuan,
      nbHoiBenh,
      nbChanDoan,
      nbKhamXet,
      nbChiSoSong,
    } = refDataKetLuan.current;
    let bodyKetLuan = {
      id: thongTinChiTiet.id,
      huongDieuTri: keyHuongDieuTri,
      ketQuaDieuTri: keyKetQua,
      thoiGianKetLuan:
        nbKetLuan?.thoiGianKetLuan &&
        moment(nbKetLuan?.thoiGianKetLuan).format("YYYY/MM/DD"),
    };
    let thoiGianHenKham = "";
    switch (keyHuongDieuTri) {
      case HUONG_DIEU_TRI_KHAM.CHO_VE:
        return bodyKetLuan;
      case HUONG_DIEU_TRI_KHAM.HEN_KHAM:
        bodyKetLuan = {
          ghiChu: nbKhamXet?.ghiChu,
          loiDan: nbKetLuan?.loiDan,
          quaTrinhBenhLy: nbHoiBenh?.quaTrinhBenhLy,
          thoiGianHenKham: nbKetLuan?.thoiGianHenKham,
          ...bodyKetLuan,
        };
        return bodyKetLuan;
      case HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN:
        bodyKetLuan.dsChanDoanId =
          nbChanDoan?.dsCdChinhId ||
          (nbChanDoan.dsCdChinh || []).map((item) => item.id);
        if (nbChuyenVien) {
          bodyKetLuan.nbChuyenVien = nbChuyenVien;
        } else {
          bodyKetLuan.nbChuyenVien = {};
        }
        if (!bodyKetLuan.nbChuyenVien.hasOwnProperty("ngheNghiepId")) {
          bodyKetLuan.nbChuyenVien.ngheNghiepId = infoNb.ngheNghiepId;
        }
        if (!bodyKetLuan.nbChuyenVien.lyDoChuyenTuyen)
          bodyKetLuan.nbChuyenVien.lyDoChuyenTuyen = 1;
        bodyKetLuan = {
          ...bodyKetLuan,
          nbChuyenVien: {
            ...bodyKetLuan.nbChuyenVien,
          },
        };

        return bodyKetLuan;
      case HUONG_DIEU_TRI_KHAM.NHAP_VIEN:
        bodyKetLuan.dsChanDoanId =
          nbChanDoan?.dsCdChinhId ||
          (nbChanDoan.dsCdChinh || []).map((item) => item.id);
        if (nbNhapVien) {
          const {
            id,
            donViYTeId,
            coSoYTeId,
            nbDotDieuTriId,
            ...newNbNhapVien
          } = nbNhapVien;
          bodyKetLuan.nbNhapVien = newNbNhapVien;
        } else {
          bodyKetLuan.nbNhapVien = {};
        }
        const {
          id,
          active,
          createdAt,
          updatedAt,
          createdBy,
          updatedBy,
          ...newNbChiSoSong
        } = nbChiSoSong || {};

        bodyKetLuan = {
          loiDan: nbNhapVien?.loiDan,
          ghiChu: nbKhamXet?.ghiChu,
          // lyDoDenKham: nbNhapVien?.loiDan || infoNb?.lyDoDenKham,
          quaTrinhBenhLy: nbHoiBenh?.quaTrinhBenhLy,
          ...bodyKetLuan,
          nbNhapVien: {
            ...bodyKetLuan.nbNhapVien,
            danTocId: nbNhapVien.danTocId,
            cacBoPhan: nbKhamXet.cacBoPhan,
            toanThan: nbKhamXet.toanThan,
            tienSuGiaDinh: nbHoiBenh.tienSuGiaDinh,
            tienSuBanThan: nbHoiBenh.tienSuBanThan,
            nbChiSoSong: isEmpty(newNbChiSoSong) ? null : newNbChiSoSong,
          },
        };
        return bodyKetLuan;
      case HUONG_DIEU_TRI_KHAM.KHONG_KHAM:
        bodyKetLuan.dsChanDoanId =
          nbChanDoan?.dsCdChinhId ||
          (nbChanDoan.dsCdChinh || []).map((item) => item.id);
        return bodyKetLuan;

      default:
        break;
    }
    return bodyKetLuan;
  };

  const isValidate = () => {
    if (infoNb?.doiTuong === 1) return false;

    const { nbChiSoSong } = refData.current;

    if (
      !nbChiSoSong?.canNang &&
      !thongTinChiTiet?.nbChiSoSong?.canNang &&
      !infoNb?.tuoi &&
      infoNb?.thangTuoi <= 12
    ) {
      message.error(t("khamBenh.batBuocNhapCanNangVoiNbBHYT01Tuoi"));
      return true;
    }
  };

  const onSaveDichVuKham = (isShowMessage = true) => {
    const isValidateResult = isValidate();
    refConfirmSaveShowing.current = false;
    if (isValidateResult) return null;
    return new Promise((resolve, reject) => {
      const { nbChanDoan, nbHoiBenh, nbKhamXet, nbKSK, nbChiSoSong } =
        refData.current;

      //update css
      // updateChiSoSong({ id: infoNb.id, ...nbChiSoSong });

      //update thong tin ksk
      if (isKsk) {
        updateKhamKSK({
          // id: thongTinChiTiet?.id,
          nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
          ...nbKSK,
        });
      }

      if (
        hasDichVu &&
        !nbChanDoan?.cdSoBo &&
        !nbChanDoan?.dsCdChinhId?.length
      ) {
        message.error(t("khamBenh.thongBaoKhongTheXoaChanDoanKhiDaKeDichVu"));
        reject(false);
      } else {
        const dataSubmit = {
          id: thongTinChiTiet?.id,
          nbChanDoan,
          nbHoiBenh,
          nbKhamXet,
          nbChiSoSong,
          isShowMessage, // trường để cho phép show message thành công hay không
        };
        updateNbDvKham(dataSubmit)
          .then((s) => {
            resolve(true);
          })
          .catch((e) => reject(false));
      }
    });
  };

  const saveDataByKey = async (isShowMessage = true) => {
    const key = state.activeTab;
    switch (key) {
      case 0:
        await onSaveDichVuKham(isShowMessage);
        break;
      case 3: {
        await onSaveKetLuanKham();
        break;
      }
      default:
        break;
    }
  };
  const onActiveTab = (key) => {
    let compared = true;
    // let comparedNbCovid = true;
    const newKey = +key;
    const currentKey = state.activeTab;
    const dataCompare = thongTinChiTiet;
    if (currentKey == 0 && newKey !== 0) {
      compared = isEqual(dataCompare, refData.current);
    } else if (currentKey == 3 && newKey !== 3) {
      compared = isEqual(dataCompare, refDataKetLuan.current);
    }
    if ([1, 4].includes(newKey) && thongTinChiTiet?.nbDvKyThuat?.ngoaiVienId) {
      refConfirm.current &&
        refConfirm.current.show({
          title: t("common.thongBao"),
          content: t("khamBenh.chiDinh.dichVuKhamCuaNbDuocChiDinhTuBve"),
          cancelText: t("common.dong"),
          classNameOkText: "button-warning",
          typeModal: "warning",
        });
      return;
    }
    if (!compared) {
      if (refConfirmSaveShowing.current) return;
      const isValidateResult = isValidate();
      if (isValidateResult) {
        setState({ activeTab: 0 });
        refConfirmSaveShowing.current = false;
        return null;
      }
      refConfirmSaveShowing.current = true;
      if (currentKey === 0) {
        onSaveDichVuKham()
          .then((s) => {
            setState({ activeTab: newKey });
            refConfirmSaveShowing.current = false;
          })
          .catch((e) => {
            setState({ activeTab: 0 });
            refConfirmSaveShowing.current = false;
          });
      }
      if (currentKey === 3) {
        onSaveKetLuanKham()
          .then((s) => {
            setState({ activeTab: newKey });
            refConfirmSaveShowing.current = false;
          })
          .catch((e) => {
            if (
              [
                HUONG_DIEU_TRI_KHAM.CHO_VE,
                HUONG_DIEU_TRI_KHAM.HEN_KHAM,
              ].includes(state.keyHuongDieuTri) &&
              e?.code == 8322
            ) {
              setState({ activeTab: newKey });
            } else {
              setState({ activeTab: 3 });
            }
            refConfirmSaveShowing.current = false;
          });
        return;
      }
    } else if (
      refData.current?.nbChanDoan?.cdSoBo ||
      refData.current?.nbChanDoan?.dsCdChinhId?.length
    ) {
      setState({ activeTab: newKey });
    }
  };

  const handleSetData = (arrKey) => (e) => {
    const value = e?.currentTarget ? e.currentTarget.innerHTML : e;
    const [key1, key2] = arrKey;
    if (key2) {
      refData.current = {
        ...refData.current,
        [key1]: refData.current[key1]
          ? {
              ...refData.current[key1],
              [key2]: value,
            }
          : { [key2]: value },
      };
    } else {
      refData.current = {
        ...refData.current,
        [key1]: value,
      };
    }
  };

  const handleSetDataKetLuan = (arrKey) => (e) => {
    const value = e?.currentTarget ? e.currentTarget.innerHTML : e;
    const [key1, key2] = arrKey;
    if (key2) {
      refDataKetLuan.current = {
        ...refDataKetLuan.current,
        [key1]: refDataKetLuan.current[key1]
          ? {
              ...refDataKetLuan.current[key1],
              [key2]: value,
            }
          : { [key2]: value },
      };
      console.log(key2, refDataKetLuan.current[key2]);
    } else {
      refDataKetLuan.current = {
        ...refDataKetLuan.current,
        [key1]: value,
      };
    }
  };

  const onChangePopoverKetThucKham = (changedValues = {}, allValues) => {
    let keyKetQua;
    const value = changedValues.keyHuongDieuTri;
    if (changedValues.hasOwnProperty("keyHuongDieuTri")) {
      if (
        value === HUONG_DIEU_TRI_KHAM.HEN_KHAM ||
        value === HUONG_DIEU_TRI_KHAM.CHO_VE
      ) {
        keyKetQua = KET_QUA_KHAM.DO;
      } else if (
        value === HUONG_DIEU_TRI_KHAM.NHAP_VIEN ||
        value === HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN
      ) {
        keyKetQua = KET_QUA_KHAM.NANG_HON;
      } else {
        keyKetQua = KET_QUA_KHAM.KHONG_DANH_GIA;
      }
      form.setFieldsValue({ keyKetQua });
    }
  };

  const renderContentPopupKetThucKham = () => {
    return (
      <PopoverWrapper>
        <FormPopoverKetThucKham
          onChangePopoverKetThucKham={onChangePopoverKetThucKham}
          form={form}
        />
      </PopoverWrapper>
    );
  };

  const handleShowPopupKetThucKham = (e) => {
    // if (typeKhamCoBan?.type === "khamCovid") {
    //   if (nbCovid?.dsCdChinhId?.length === 0 || !nbCovid?.dsCdChinhId) {
    //     // open dropdown
    //     const selectCovid = document.getElementById("select-covid");
    //     let clickEvent = document.createEvent("MouseEvents");
    //     clickEvent.initEvent("mousedown", true, true);
    //     selectCovid.firstElementChild.firstElementChild.scrollIntoView();
    //     selectCovid.firstElementChild.firstElementChild.dispatchEvent(
    //       clickEvent
    //     );
    //     message.error(t("khamBenh.canhBaoNhapChanDoanTruocKhiKetThucKham"));
    //     return;
    //   }
    // } else {
    if (refData?.current?.nbChanDoan?.dsCdChinhId?.length === 0) {
      message.error(t("khamBenh.canhBaoNhapChanDoanTruocKhiKetThucKham"));
      return;
    }
    // }
    refCustomPopover.current &&
      refCustomPopover.current.show({}, onKetLuanKham, () => {
        refCustomPopover.current && refCustomPopover.current.hide({});
      });
  };

  const onKetLuanKham = () => {
    form
      .validateFields()
      .then(async (values) => {
        // debugger;

        await saveDataByKey(false); // 1
        const { keyHuongDieuTri, keyKetQua } = values;
        refKetLuanKham.current = { keyHuongDieuTri, keyKetQua };
        await dangKetLuan({
          ketThucKham: true,
          huongDieuTri: keyHuongDieuTri,
          ketQuaDieuTri: keyKetQua,
        }).then((s) => {
          //sau khi chọn loại kết thúc khám thì đổi trạng thái sang đang kết luận
          // const { keyHuongDieuTri, keyKetQua } = values;
          // refKetLuanKham.current = { keyHuongDieuTri, keyKetQua };
          setState({ keyHuongDieuTri, keyKetQua, activeTab: 3 }); //cập nhật lại thông tin kết luận khám ngoài màn hình
          refCustomPopover.current && refCustomPopover.current.hide(); //ẩn popover kết luận khám
        });
        // await saveDataByKey(false); // 2
      })
      .catch((err) => {});
  };

  const onKetThucKham = () => {
    const ketThucKham = () => {
      if (
        refData?.current?.nbChanDoan?.dsCdChinhId?.length === 0
        // ||
        // refData?.current?.nbCovid?.dsCdChinhId?.length === 0
      ) {
        message.error(t("khamBenh.canhBaoNhapChanDoanTruocKhiKetThucKham"));
        return;
      }

      const { nbKetLuan } = refDataKetLuan?.current || {};
      const { keyHuongDieuTri } = refKetLuanKham?.current || {};
      if (
        keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.HEN_KHAM &&
        !nbKetLuan?.thoiGianHenKham
      ) {
        message.error("Bắt buộc chọn thời gian hẹn khám");
        return;
      }

      refModalKetThucKham.current &&
        refModalKetThucKham.current.show({}, (values) => {
          onSaveKetLuanKham(true, values);
        });
    };

    if (state.activeTab != 3) {
      ketThucKham();
    } else {
      showLoading();
      onSaveKetLuanKham()
        .then((s) => {
          hideLoading();
          ketThucKham();
        })
        .catch((e) => {
          hideLoading();
        });
    }
  };

  const onHoanThanhKSK = () => {
    hoanThanhKSK({
      id: thongTinChiTiet?.nbDotDieuTriId,
    })
      .then(() => {})
      .catch((err) => {
        refConfirm.current &&
          refConfirm.current.show(
            {
              title: t("common.thongBao"),
              content: `${err}. Xác nhận bỏ qua các dịch vụ chưa thực hiện?`,
              cancelText: t("common.huy"),
              okText: t("common.dongY"),
              classNameOkText: "button-warning",
              showImg: true,
              showBtnOk: true,
              typeModal: "warning",
            },
            () => {
              hoanThanhKSK({
                id: thongTinChiTiet?.nbDotDieuTriId,
                boQuaDvChuaThucHien: true,
              });
            }
          );
      });
  };

  const onHuyHoanThanhKSK = () => {
    huyHoanThanhKSK({
      id: thongTinChiTiet?.nbDotDieuTriId,
    });
  };

  const renderButtonRight = () => {
    let showButtonHuy = false;
    if (
      trangThaiKham === TRANG_THAI_DICH_VU.DA_KET_LUAN &&
      infoNb.doiTuongKcb != 3 &&
      infoNb.doiTuongKcb != 4
    ) {
      // điều kiện thay đổi hủy kết luận thay đổi thành :
      // + Điều kiện hiển thị button Hủy kết luận: DV khám ở trạng thái Đã kết luận + đối tượng KCB khác điều trị nội trú & điều trị nội trú ban ngày
      showButtonHuy = true;
    }
    if (showButtonHuy) {
      return (
        <Button
          type="default"
          onClick={() => {
            huyKetLuanGetMethod({ id: thongTinChiTiet.id }).then((res) => {
              console.log("res: ", res);
              let { data } = res;
              let content = "";
              let okText = "";
              let showBtnOk = true;
              let functionSubmit = huyKetLuanKham;
              if (!data) {
                // true : không có quyền MO_HO_SO
                content = t(
                  "khamBenh.nguoiBenhDaThanhToanBaoHiemHuyThanhToanDeMoLaiHoSo"
                );
                showBtnOk = false;
                if (checkRole([ROLES["KHAM_BENH"].MO_HO_SO])) {
                  // true : có quyền MO_HO_SO
                  showBtnOk = true;
                  content = t(
                    "khamBenh.nguoiBenhDaThanhToanBaoHiemMoHoSoAnhHuongQTBH"
                  );
                  okText = t("khamBenh.moHoSo");
                }
                // functionSubmit = huyKetLuanKham
              } else {
                // false
                content = t("khamBenh.xacNhanThayDoiKetQuaKhiDaKetThucKham");
                okText = t("common.dongY");
                showBtnOk = true;
              }
              refConfirm.current &&
                refConfirm.current.show(
                  {
                    content,
                    cancelText: t("common.quayLai"),
                    okText,
                    showBtnOk,
                    typeModal: "warning",
                    title: t("common.canhBao"),
                  },
                  async () => {
                    let resData = await functionSubmit({
                      id: thongTinChiTiet?.id,
                    });
                    window.location.href = window.location.href;
                  }
                );
            });
          }}
        >
          {t("khamBenh.huyKetLuan")}
        </Button>
      );
    }

    if (
      state.activeTab === 3 ||
      trangThaiKham == TRANG_THAI_DICH_VU.DANG_KET_LUAN
    ) {
      return (
        <Button type="primary" onClick={onKetThucKham}>
          {t("khamBenh.dongHoSo")}
        </Button>
      );
    }

    if (
      trangThaiKham != TRANG_THAI_DICH_VU.DA_KET_LUAN &&
      !(isKsk && [10, 30].includes(infoNb?.trangThaiKsk))
    )
      return (
        <CustomPopoverWithRef
          ref={refCustomPopover}
          handleVisible={handleShowPopupKetThucKham}
          width={300}
          contentPopover={renderContentPopupKetThucKham()}
          text={<Button type="primary">{t("khamBenh.ketThucKham")}</Button>}
        />
      );

    return null;
  };

  const onCancel = () => {
    Object.keys(refElement.current).forEach((key) => {
      refElement.current[key].reload();
    });
    const cloneThongTinChiTiet = cloneDeep(thongTinChiTiet);
    updateDataKhamBenh({ thongTinChiTiet: cloneThongTinChiTiet });
  };

  const onSave = (e) => {
    e.preventDefault();
    if (
      hasDichVu &&
      !refData?.current?.nbChanDoan?.cdSoBo &&
      refData?.current?.nbChanDoan?.dsCdChinhId?.length === 0
    ) {
      message.error(t("khamBenh.thongBaoKhongTheXoaChanDoanKhiDaKeDichVu"));
    } else {
      saveDataByKey().then(() => {
        getStatisticsRoom(phongThucHienId);
      });
    }
  };
  const ketLuanKhamData = useMemo(() => {
    return {
      keyHuongDieuTri: state.keyHuongDieuTri,
      keyKetQua: state.keyKetQua,
    };
  }, [state.keyHuongDieuTri, state.keyKetQua]);

  const renderBody = () => {
    return (
      <div className="element element-page" key={state.activeTab}>
        {(() => {
          switch (state.activeTab) {
            case 0:
              return (
                <LazyLoad
                  component={import("../KhamCoBan")}
                  handleSetData={handleSetData}
                  layerId={layerId}
                />
              );
            case 1:
              return <LazyLoad component={import("../ChiDinhDichVu")} />;
            case 2:
              return <LazyLoad component={import("../KetQua")} />;
            case 3:
              return (
                <LazyLoad
                  component={import("../KetLuan")}
                  refData={refDataKetLuan}
                  ketLuanKham={ketLuanKhamData}
                  setKetLuanKham={(value) => {
                    refKetLuanKham.current = value || {};
                    setState(value);
                    //bên kết luận thay đổi hướng điều trị và kết quả điều trị thì cập nhập lại gía trị trong state
                  }}
                  title={t("khamBenh.ketThucKham")}
                  handleSetData={handleSetDataKetLuan}
                  dataDichVu={dataDichVu}
                  // handleSetData={handleSetData}
                />
              );
            case 4:
              return <LazyLoad component={import("../DonThuoc")} />;
            case 5:
              return <LazyLoad component={import("../VatTu")} />;
            case 6:
              return <LazyLoad component={import("../GoiDaChiDinh")} />;
            default:
              break;
          }
        })()}
      </div>
    );
  };

  const onNavigate = (type, currenTab) => () => {
    if (
      (currenTab === 0 && type === "previous") ||
      (currenTab === 4 && type === "next")
    ) {
      return;
    }

    const newElementKey = type === "previous" ? currenTab - 1 : currenTab + 1;
    const item = DANH_SACH_DAU_TRANG.find(
      (item) => item.itemKey == newElementKey
    );
    if (!trangThaiKham || trangThaiKham < item.trangThai) {
      onNavigate(type, newElementKey)();
      return;
    }
    setState({ activeTab: newElementKey });
  };

  refFuncNavi.current = onNavigate;

  return (
    <Main className="wrapper-thong-tin-kham">
      <div className="col-thong-tin-kham-left" style={{ flex: 1 }}>
        <StepWrapper
          customHeaderRight={renderButtonRight()}
          layerId={layerId}
          activeTab={state.activeTab}
        >
          {renderBody()}
        </StepWrapper>

        <ButtonFooter className="btn">
          <div className="nav-bottom">
            <Tooltip title={t("khamBenh.chuyenVeTruoc")}>
              <Button
                onClick={onNavigate("previous", state.activeTab)}
                type="default"
              >
                <img src={ArrowLeft} alt="" />
              </Button>
            </Tooltip>
            <Tooltip title={t("khamBenh.chuyenKeTiep")}>
              <Button
                onClick={onNavigate("next", state.activeTab)}
                type="default"
              >
                <img src={ArrowRight} alt="" />
              </Button>
            </Tooltip>

            {isKsk &&
              infoNb?.trangThaiKsk === 20 &&
              thongTinChiTiet?.ketLuanKham && (
                <Button type="primary" onClick={onHoanThanhKSK}>
                  {"Hoàn thành KSK"}
                </Button>
              )}

            {isKsk &&
              infoNb?.trangThaiKsk === 30 &&
              thongTinChiTiet?.ketLuanKham && (
                <Button type="default" onClick={onHuyHoanThanhKSK}>
                  Hủy hoàn thành KSK
                </Button>
              )}
          </div>
          {[0, 3].includes(state.activeTab) &&
            !(isKsk && [10, 30].includes(infoNb?.trangThaiKsk)) && (
              <>
                <Button onClick={onCancel} type={"default"} minWidth={100}>
                  {t("common.huy")}
                </Button>
                <Button
                  onClick={onSave}
                  type={"primary"}
                  minWidth={100}
                  iconHeight={15}
                  rightIcon={
                    <img
                      style={{ marginLeft: 6 }}
                      src={require("assets/images/kho/save.png")}
                      alt=""
                    ></img>
                  }
                >
                  {t("common.luu")}
                </Button>
              </>
            )}
        </ButtonFooter>
      </div>
      <div style={{ paddingTop: 53 }} className="col-thong-tin-kham-right">
        <NavigationBar
          onActiveTab={onActiveTab}
          layerId={layerId}
          activeKey={state.activeTab}
        />
      </div>
      {/* <ModalChiDinh
        visible={neededUpdateRecord.length}
        dataSource={neededUpdateRecord}
        onCancel={onCancelUpdateRecord}
      /> */}
      <ModalKetThucKham ref={refModalKetThucKham} />
    </Main>
  );
};
export default React.memo(ThongTin);
