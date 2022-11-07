import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { message, Radio } from "antd";
import { firstLetterWordUpperCase } from "utils";
import mienGiamProvider from "data-access/nb-phieu-thu-provider";
import DiscountOnReceipt from "./DiscountOnReceipt";
import DiscountOnService from "./DiscountOnService";
import DiscountByVoucher from "./DiscountByVoucher";
import { Main } from "./styled";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Button, ModalTemplate } from "components";
import { ENUM, HOTKEY } from "constants/index";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useEnum } from "hook";

const ModalTaoMienGiam = (props, ref) => {
  const { t } = useTranslation();
  const { listAllService } = useSelector((state) => state.danhSachDichVu);
  const { listAllMaGiamGia } = useSelector((state) => state.maGiamGia);
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const [listHinhThucMienGiam] = useEnum(ENUM.HINH_THUC_MIEN_GIAM);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { thongTinPhieuThu } = useSelector((state) => state.thuNgan);

  const refModal = useRef(null);
  const {
    thuNgan: { getThongTinPhieuThu },
    nbDotDieuTri: { tongTienDieuTri },
    maGiamGia: { getListAllMaGiamGia },
    danhSachDichVu: {
      searchAll: getAllListServices,
      onSizeChange: getListServices,
    },
    danhSachPhieuThu: { onSearch: getDSPhieuThu },
  } = useDispatch();
  const { nbDotDieuTriId } = useParams();
  const [state, _setState] = useState({
    dsDichVu: [],
    hinhThucMienGiam: 10,
    phanTramMienGiam: 0,
    tienMienGiamPhieuThu: 0,
    dsDichVuId: [],
    dsMaGiamGiaId: [],
    disabledBtnNext: false,
  });
  const { phieuThuId } = state;
  useImperativeHandle(ref, () => ({
    show: ({ phieuThuId }, callback) => {
      setState({
        phieuThuId,
        show: true,
        dsDichVu: [],
        hinhThucMienGiam: 10,
        phanTramMienGiam: 0,
        tienMienGiamPhieuThu: 0,
        dsDichVuId: [],
        dsMaGiamGiaId: [],
        disabledBtnNext: false,
      });
    },
  }));
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getListAllMaGiamGia({
      active: true,
      size: "",
      page: "",
      ngayHieuLuc: moment().format("DD-MM-YYYY"),
    });
  }, []);
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  useEffect(() => {
    const { phanTramMienGiam, tienMienGiamPhieuThu, ghiChu } = thongTinPhieuThu;
    setState({
      phanTramMienGiam: phanTramMienGiam || 0,
      tienMienGiamPhieuThu: tienMienGiamPhieuThu || 0,
      ghiChu: ghiChu
    });
  }, [thongTinPhieuThu]);
  
  const gioiTinh =
    listGioiTinh?.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};

  const onChange = (e) => {
    setState({
      hinhThucMienGiam: e.target.value,
      phanTramMienGiam: 0,
      // tienMienGiamPhieuThu: 0,
      dsDichVu: [],
      dsDichVuId: [],
      dsMaGiamGiaId: [],
      disabledBtnNext: false,
    });
  };

  const onUpdateListServices = (data) => {
    const dsDichVu = data
      .filter(
        (d) => d?.phanTramMienGiamDichVu >= 0 || d?.tienMienGiamDichVu >= 0
      )
      .map((item) => ({
        id: item.id,
        phanTramMienGiamDichVu:
          item?.phanTramMienGiamDichVu === 0
            ? null
            : item?.phanTramMienGiamDichVu,
        tienMienGiamDichVu:
          item?.tienMienGiamDichVu === 0 ? null : item?.tienMienGiamDichVu,
      }));
    setState({
      dsDichVu,
    });
  };

  const onUpdateVoucherServices = (dsMaGiamGiaId, dsDichVuId) => {
    setState({
      dsDichVuId: dsDichVuId,
      dsMaGiamGiaId: dsMaGiamGiaId,
    });
  };

  const onUpdateReceipt = (type, value) => {
    setState({ [type]: value });
  };

  const setDisabledButton = (value) => {
    setState({ disabledBtnNext: value });
  };

  const validateNumber = (value) => {
    return /^[1-9][0-9]?$|^100$/.test(`${value}`);
  };
  const renderTypeDiscount = useCallback(() => {
    switch (state.hinhThucMienGiam) {
      case 10:
        return (
          <DiscountOnReceipt
            phanTramMienGiam={state.phanTramMienGiam}
            onUpdateReceipt={onUpdateReceipt}
            thongTinPhieuThu={thongTinPhieuThu}
            validateNumber={validateNumber}
            tienMienGiamPhieuThu={state?.tienMienGiamPhieuThu}
            ghiChu={state?.ghiChu}
          />
        );
      case 20:
        return (
          <DiscountOnService
            listAllServices={listAllService}
            updateListServices={onUpdateListServices}
            thongTinPhieuThu={thongTinPhieuThu}
            onUpdateReceipt={onUpdateReceipt}
            ghiChu={state?.ghiChu}
          />
        );
      case 30:
        return (
          <DiscountByVoucher
            onUpdateReceipt={onUpdateReceipt}
            listAllServices={listAllService}
            listVouchers={listAllMaGiamGia}
            onUpdateVoucherServices={onUpdateVoucherServices}
            thongTinPhieuThu={thongTinPhieuThu}
            setDisabledButton={setDisabledButton}
          />
        );
      default:
        return null;
    }
  }, [state.hinhThucMienGiam, thongTinPhieuThu, state?.tienMienGiamPhieuThu, state?.ghiChu]);

  const handleClickBack = () => {
    setState({
      show: false,
      hinhThucMienGiam: 10,
    });
  };
  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOk(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOk(true)();
      },
    },
  ];
  const handleAfterSubmit = () => {
    handleClickBack();
    getListServices({ size: 10, nbDotDieuTriId, phieuThuId });
    getThongTinPhieuThu(phieuThuId);
    getAllListServices({ nbDotDieuTriId, phieuThuId });
    getDSPhieuThu({
      dataSearch: { nbDotDieuTriId },
      nbDotDieuTriId,
    });
    tongTienDieuTri({ id: nbDotDieuTriId });
  };
  const onOk = (isOk) => async () => {
    if (isOk) {
      if (state.hinhThucMienGiam === 30) {
        if (state?.dsMaGiamGiaId.length) {
          let payload = {
            dsMaGiamGiaId: state.dsMaGiamGiaId,
            dsDichVuId: state.dsDichVuId,
          };
          mienGiamProvider
            .addOrUpdateVoucher(payload, phieuThuId)
            .then((res) => {
              handleAfterSubmit();
            });
        } else {
          handleAfterSubmit();
        }
      } else {
        let payload = {
          dsDichVu: state.dsDichVu,
          hinhThucMienGiam: state.hinhThucMienGiam,
          phanTramMienGiam: state.phanTramMienGiam,
          tienMienGiamPhieuThu: state.tienMienGiamPhieuThu,
          ghiChu: state?.ghiChu,
        };
        if (state.hinhThucMienGiam === 20 && payload.dsDichVu.length === 0) {
          message.error(t("thuNgan.canChonItNhatMotDichVuApDungMienGiam"));
          return;
        }
        mienGiamProvider
          .addOrUpdateDiscount(payload, phieuThuId)
          .then((res) => {
            handleAfterSubmit();
          });
      }
    } else {
      setState({
        hinhThucMienGiam: 10,
        show: false,
      });
    }
  };
  return (
    <ModalTemplate
      width={800}
      ref={refModal}
      title={t("thuNgan.mienGiam")}
      onCancel={onOk(false)}
      closable={false}
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)}{" "}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight font-color"> - {gioiTinh.ten}</span>
          )}
          {thongTinBenhNhan.tuoi && (
            <>
              {" "}
              -{" "}
              <span className="normal-weight">
                {thongTinBenhNhan?.tuoi} {t("common.tuoi")}
              </span>
            </>
          )}
        </>
      }
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
        >
          {t("common.quayLai")} [ESC]
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          iconHeight={15}
          onClick={onOk(true)}
          disabled={thongTinPhieuThu.thanhToan || state.disabledBtnNext}
        >
          {t("common.xacNhan")} [F4]
        </Button>
      }
      hotKeys={hotKeys}
    >
      <Main>
        <div className="header">
          <p className="text-bold">{t("thuNgan.chonHinhThucMienGiam")}</p>
          <Radio.Group onChange={onChange} value={state.hinhThucMienGiam}>
            {(listHinhThucMienGiam || []).map((item) => (
              <Radio key={item.id} value={item.id}>
                {item.ten}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <div className="type-discount">{renderTypeDiscount()}</div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTaoMienGiam);
