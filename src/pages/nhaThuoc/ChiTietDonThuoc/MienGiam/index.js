import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { message, Radio } from "antd";
import ModalCheckout from "components/ModalCheckout";
import IconSave from "assets/images/thuNgan/icSave.png";
import { firstLetterWordUpperCase } from "utils";
import mienGiamProvider from "data-access/nb-phieu-thu-provider";
import DiscountOnService from "pages/thuNgan/chiTietPhieuThu/ModalTaoMienGiam/DiscountOnService";
import DiscountByVoucher from "pages/thuNgan/chiTietPhieuThu/ModalTaoMienGiam/DiscountByVoucher";
import { Main, ButtonWrapper } from "./styled";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ModalTaoMienGiam = ({ modalCheckoutRef, phieuThuId }) => {
  const { t } = useTranslation();
  const {
    maGiamGia: { getListAllMaGiamGia },
    thuocChiTiet: { searchDonThuoc },
  } = useDispatch();
  const { infoPatient } = useSelector((state) => state.thuocChiTiet);
  const { listAllMaGiamGia } = useSelector((state) => state.maGiamGia);
  const [listHinhThucMienGiam] = useEnum(ENUM.HINH_THUC_MIEN_GIAM);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { id } = useParams();
  const [state, _setState] = useState({
    dsDichVu: [],
    hinhThucMienGiam: 20,
    phanTramMienGiam: 0,
    tienMienGiamPhieuThu: 0,
    dsDichVuId: [],
    dsMaGiamGiaId: [],
    disabledBtnNext: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getListAllMaGiamGia({
      active: true,
      page: "",
      size: "",
      ngayHieuLuc: moment().format("DD-MM-YYYY"),
    });
  }, []);

  const gioiTinh =
    listGioiTinh.find(
      (item) => item.id === infoPatient.nbDotDieuTri?.gioiTinh
    ) || {};

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
      .filter((d) => d?.phanTramMienGiamDichVu > 0 || d?.tienMienGiamDichVu > 0)
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
  useEffect(() => {
    if (infoPatient?.dsThuoc?.length) {
      let data = infoPatient.dsThuoc.map((item, index) => {
        return {
          ...item,
          stt: index + 1,
          thanhTien: item.nbDichVu?.thanhTien,
          soLuong: item.nbDichVu?.soLuong,
          tenDichVu: item.nbDichVu.dichVu.ten,
          phanTramMienGiam: item.nbDichVu?.phanTramMienGiamDichVu || 0,
          tienMienGiamDichVu: item.nbDichVu.tienMienGiamDichVu || 0,
          key: index + 1,
        };
      });
      setState({ listAllService: data });
    }
  }, [infoPatient]);
  const renderTypeDiscount = useCallback(() => {
    switch (state.hinhThucMienGiam) {
      case 20:
        return (
          <DiscountOnService
            listAllServices={state?.listAllService}
            updateListServices={onUpdateListServices}
            thongTinPhieuThu={infoPatient?.phieuThu}
          />
        );
      case 30:
        return (
          <DiscountByVoucher
            onUpdateReceipt={onUpdateReceipt}
            listAllServices={state?.listAllService}
            listVouchers={listAllMaGiamGia}
            onUpdateVoucherServices={onUpdateVoucherServices}
            thongTinPhieuThu={infoPatient?.phieuThu}
            setDisabledButton={setDisabledButton}
          />
        );
      default:
        return null;
    }
  }, [state.hinhThucMienGiam, state?.listAllService, infoPatient]);

  const handleClickBack = () => {
    if (modalCheckoutRef.current) {
      modalCheckoutRef.current.close();
      setState({
        hinhThucMienGiam: 20,
      });
    }
  };

  const handleSubmit = () => {
    if (state.hinhThucMienGiam === 30) {
      if (state?.dsMaGiamGiaId.length) {
        let payload = {
          dsMaGiamGiaId: state.dsMaGiamGiaId,
          dsDichVuId: state.dsDichVuId,
        };
        mienGiamProvider.addOrUpdateVoucher(payload, phieuThuId).then((res) => {
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
      };
      if (state.hinhThucMienGiam === 20 && payload.dsDichVu.length === 0) {
        message.error(t("thuNgan.canChonItNhatMotDichVuApDungMienGiam"));
        return;
      }
      mienGiamProvider.addOrUpdateDiscount(payload, phieuThuId).then((res) => {
        handleAfterSubmit();
      });
    }
  };

  const handleAfterSubmit = () => {
    searchDonThuoc(id);
    handleClickBack();
  };
  return (
    <ModalCheckout
      titleHeader={t("thuNgan.mienGiam")}
      subTitleHeader={
        <>
          <span>
            {firstLetterWordUpperCase(infoPatient?.nbDotDieuTri?.tenNb)}{" "}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten}</span>
          )}
          {infoPatient?.nbDotDieuTri?.tenNb && (
            <>
              -
              <span className="normal-weight">
                {infoPatient?.nbDotDieuTri?.tenNb} {t("common.tuoi")}
              </span>
            </>
          )}
        </>
      }
      ref={modalCheckoutRef}
      disabledBtnNext={
        infoPatient?.phieuThu?.thanhToan || state.disabledBtnNext
      }
      titleBtnBack={`${t("common.troLai")} [ESC]`}
      titleBtnNext={
        <ButtonWrapper>
          {t("common.luu")} [F4] <img src={IconSave} alt="saveicon" />
        </ButtonWrapper>
      }
      width={800}
      destroyOnClose
      onClickBack={handleClickBack}
      onClickNext={handleSubmit}
    >
      <Main>
        <div className="header">
          <p className="text-bold">{t("thuNgan.chonHinhThucMienGiam")}</p>
          <Radio.Group onChange={onChange} value={state.hinhThucMienGiam}>
            {listHinhThucMienGiam
              .filter((x) => x.id !== 10)
              .map((item) => (
                <Radio key={item.id} value={item.id}>
                  {item.ten}
                </Radio>
              ))}
          </Radio.Group>
        </div>
        <div className="type-discount">{renderTypeDiscount()}</div>
      </Main>
    </ModalCheckout>
  );
};
export default ModalTaoMienGiam;
