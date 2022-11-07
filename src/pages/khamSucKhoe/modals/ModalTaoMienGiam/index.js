import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
} from "react";
import { Main } from "./styled";
import { message, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, ModalTemplate } from "components";
import { useParams } from "react-router-dom";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useTranslation } from "react-i18next";
import { ENUM, HOTKEY, HINH_THUC_MIEN_GIAM } from "constants/index";
import DiscountByVoucher from "pages/goiDichVu/ChiTietNguoiBenhSuDungGoi/ModalMienGiam/DiscountByVoucher";
import DiscountOnService from "pages/goiDichVu/ChiTietNguoiBenhSuDungGoi/ModalMienGiam/DiscountOnService";
import DiscountOnReceipt from "pages/goiDichVu/ChiTietNguoiBenhSuDungGoi/ModalMienGiam/DiscountOnReceipt";
import moment from "moment";
import { useEnum, useLoading } from "hook";


const ModalTaoMienGiam = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const { id } = useParams();
  const { dsDichVu } = useSelector((state) => state.dichVuKSK);
  const { listAllMaGiamGia } = useSelector((state) => state.maGiamGia);
  const [listHinhThucMienGiam] = useEnum(ENUM.HINH_THUC_MIEN_GIAM);
  const { showLoading, hideLoading } = useLoading();

  const {
    dichVuKSK: { getDsDichVu },
    maGiamGia: { getListAllMaGiamGia },
    dichVuKSK: { onMienGiam },
  } = useDispatch();

  const [state, _setState] = useState({
    show: false,
    checkAll: false,
    hinhThucMienGiam: 10,
    phanTramMienGiam: 0,
    tienMienGiam: 0,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
        checkAll: false,
        phanTramMienGiam: 0,
        tienMienGiam: 0,
      });

      if (id) {
        getDsDichVu({ hopDongKskId: id });
      }
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
      getListAllMaGiamGia({
        page: "",
        size: "",
        active: true,
        ngayHieuLuc: moment().format("DD-MM-YYYY"),
      });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

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

  const setDisabledButton = (value) => {
    setState({ disabledBtnNext: value });
  };
  const onUpdateVoucherServices = (dsMaGiamGiaId, data) => {
    setState({
      dsHdKskGiamGia: (data || []).map((item) => ({ id: item?.id })),
      dsMaGiamGiaId: dsMaGiamGiaId,
    });
  };
  const listAllServices = useMemo(() => {
    return (dsDichVu || []).map((item) => {
      item.tongTien = item.giaKhongBaoHiem;
      item.soLuong = 1;
      return item;
    });
  }, [dsDichVu]);

  const onUpdateListServices = (data) => {
    const dsHdKskGiamGia = data
      .filter((d) => d?.phanTramMienGiam >= 0 || d?.tienMienGiam >= 0)
      .map((item) => ({
        dichVuId: item.id,
        phanTramMienGiam:
          item?.phanTramMienGiam === 0 ? null : item?.phanTramMienGiam,
        tienMienGiam: item?.tienMienGiam === 0 ? null : item?.tienMienGiam,
      }));
    setState({
      dsHdKskGiamGia,
    });
  };
  const onUpdateReceipt = (type, value) => {
    if (type == "phanTramMienGiam") {
      setState({
        phanTramMienGiam: value,
      });
    } else {
      setState({
        tienMienGiam: value,
      });
    }
  };

  const validateNumber = (value) => {
    return /^[1-9][0-9]?$|^100$/.test(`${value}`);
  };

  const renderTypeDiscount = () => {
    switch (state.hinhThucMienGiam) {
      case 10:
        return (
          <DiscountOnReceipt
            phanTramMienGiam={state.phanTramMienGiam}
            onUpdateReceipt={onUpdateReceipt}
            validateNumber={validateNumber}
            tienMienGiam={state?.tienMienGiam}
          />
        );
      case 20:
        return (
          <DiscountOnService
            listAllServices={listAllServices}
            updateListServices={onUpdateListServices}
          />
        );
      case 30:
        return (
          <DiscountByVoucher
            listAllServices={listAllServices}
            listVouchers={listAllMaGiamGia}
            onUpdateVoucherServices={onUpdateVoucherServices}
            setDisabledButton={setDisabledButton}
          />
        );
      default:
        return null;
    }
  };

  const onChangeHinhThucMienGiam = (e) => {
    setState({
      hinhThucMienGiam: e.target.value,
      phanTramMienGiam: 0,
      dsHdKskGiamGia: [],
      dsDichVuId: [],
      dsMaGiamGiaId: [],
      disabledBtnNext: false,
    });
  };

  const onOk = (isOk) => async () => {
    if (isOk) {
      try {
        showLoading();
        let payload = {};
        if (state.hinhThucMienGiam === 30) {
          if (state?.dsMaGiamGiaId?.length) {
            payload = {
              dsMaGiamGiaId: state.dsMaGiamGiaId,
              dsHdKskGiamGia: [],
              hinhThucMienGiam: state.hinhThucMienGiam,
              id: id,
            };
          }
        } else {
          payload = {
            dsHdKskGiamGia: state.dsHdKskGiamGia,
            hinhThucMienGiam: state.hinhThucMienGiam,
            phanTramMienGiam: state.phanTramMienGiam,
            tienMienGiamHopDong: state.tienMienGiam,
            id: id,
          };
          if (
            state.hinhThucMienGiam === 20 &&
            payload.dsHdKskGiamGia.length === 0
          ) {
            message.error(t("thuNgan.canChonItNhatMotDichVuApDungMienGiam"));
            return;
          }
        }
        await onMienGiam(payload);
        setState({ show: false });
      } catch (error) {
      } finally {
        hideLoading();
      }
    } else {
      setState({ show: false });
    }
  };

  return (
    <ModalTemplate
      width={800}
      ref={refModal}
      title={t("thuNgan.mienGiam")}
      onCancel={onOk(false)}
      closable={false}
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
        >
          {t("common.xacNhan")} [F4]
        </Button>
      }
      hotKeys={hotKeys}
    >
      <Main key={state.show}>
        <div className="header">
          <p className="text-bold">{t("thuNgan.chonHinhThucMienGiam")}</p>
          <Radio.Group
            onChange={onChangeHinhThucMienGiam}
            value={state.hinhThucMienGiam}
          >
            {(listHinhThucMienGiam || []).map((item) => (
              <Radio key={item.id} value={item.id}>
                {item.id == HINH_THUC_MIEN_GIAM.MIEN_GIAM_THEO_PHIEU_THU
                  ? t("khamSucKhoe.mienGiamTheoHopDong")
                  : item.ten}
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
