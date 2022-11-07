import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, ModalTemplate } from "components";
import DiscountOnService from "./DiscountOnService";
import DiscountOnReceipt from "./DiscountOnReceipt";
import DiscountByVoucher from "./DiscountByVoucher";
import { message, Radio } from "antd";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";
const ModalMienGiam = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const thongTinNbGoiDv = useStore("nbGoiDv.thongTinNbGoiDv", {});
  const listDvTrongGoi = useStore("dichVuTrongGoi.listDvTrongGoi", []);

  const { listAllMaGiamGia } = useSelector((state) => state.maGiamGia);
  const {
    nbGoiDv: { onMienGiam },
    maGiamGia: { getListAllMaGiamGia },
  } = useDispatch();
  const { id } = useParams();
  const [listHinhThucMienGiam] = useEnum(ENUM.HINH_THUC_MIEN_GIAM);
  const [state, _setState] = useState({
    isEdit: false,
    dsGoiDvChiTiet: [],
    hinhThucMienGiam: 10,
    phanTramMienGiamGoiDv: 0,
    tienMienGiamGoiDv: 0,
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
      size: "",
      page: "",
      ngayHieuLuc: moment().format("DD-MM-YYYY"),
    });
  }, []);
  useImperativeHandle(ref, () => ({
    show: ({ type = 0, nbGoiDvId, nbDotDieuTriId }, callback) => {
      setState({ show: true, type, nbGoiDvId, nbDotDieuTriId });
      refCallback.current = callback;
    },
  }));

  useEffect(() => {
    const { phanTramMienGiamGoiDv, tienMienGiamGoiDv } = thongTinNbGoiDv;
    setState({
      phanTramMienGiamGoiDv: phanTramMienGiamGoiDv || 0,
      tienMienGiamGoiDv: tienMienGiamGoiDv || 0,
    });
  }, [thongTinNbGoiDv]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onUpdateReceipt = (type, value) => {
    if (type == "phanTramMienGiam") {
      setState({
        phanTramMienGiamGoiDv: value,
      });
    } else {
      setState({
        tienMienGiamGoiDv: value,
      });
    }
  };

  const validateNumber = (value) => {
    return /^[1-9][0-9]?$|^100$/.test(`${value}`);
  };

  const setDisabledButton = (value) => {
    setState({ disabledBtnNext: value });
  };

  const onOK = (isOk) => () => {
    if (isOk) {
      let payload = {};
      if (state.hinhThucMienGiam === 30) {
        if (state?.dsMaGiamGiaId?.length) {
          payload = {
            dsMaGiamGiaId: state.dsMaGiamGiaId,
            dsGoiDvChiTiet: [],
            hinhThucMienGiam: state.hinhThucMienGiam,
            id: id,
          };
        }
      } else {
        payload = {
          dsGoiDvChiTiet: state.dsGoiDvChiTiet,
          hinhThucMienGiam: state.hinhThucMienGiam,
          phanTramMienGiamGoiDv: state.phanTramMienGiamGoiDv,
          tienMienGiamGoiDv: state.tienMienGiamGoiDv,
          id: id,
        };
        if (
          state.hinhThucMienGiam === 20 &&
          payload.dsGoiDvChiTiet.length === 0
        ) {
          message.error(t("thuNgan.canChonItNhatMotDichVuApDungMienGiam"));
          return;
        }
      }
      onMienGiam(payload).then((res) => {
        setState({ show: false });
      });
    } else {
      setState({ show: false });
    }
  };

  const onUpdateVoucherServices = (dsMaGiamGiaId, data) => {
    setState({
      dsGoiDvChiTiet: (data || []).map((item) => ({ id: item?.id })),
      dsMaGiamGiaId: dsMaGiamGiaId,
    });
  };

  const onUpdateListServices = (data) => {
    const dsGoiDvChiTiet = data
      .filter((d) => d?.phanTramMienGiam >= 0 || d?.tienMienGiam >= 0)
      .map((item) => ({
        id: item.id,
        phanTramMienGiam:
          item?.phanTramMienGiam === 0 ? null : item?.phanTramMienGiam,
        tienMienGiam: item?.tienMienGiam === 0 ? null : item?.tienMienGiam,
      }));
    setState({
      dsGoiDvChiTiet,
    });
  };
  const onChange = (e) => {
    setState({
      hinhThucMienGiam: e.target.value,
      phanTramMienGiamGoiDv: 0,
      dsGoiDvChiTiet: [],
      dsDichVuId: [],
      dsMaGiamGiaId: [],
      disabledBtnNext: false,
    });
  };

  const renderTypeDiscount = useCallback(() => {
    switch (state.hinhThucMienGiam) {
      case 10:
        return (
          <DiscountOnReceipt
            onUpdateReceipt={onUpdateReceipt}
            phanTramMienGiam={
              state.phanTramMienGiamGoiDv ||
              thongTinNbGoiDv?.phanTramMienGiamGoiDv
            }
            validateNumber={validateNumber}
            tienMienGiam={state?.tienMienGiamGoiDv}
          />
        );
      case 20:
        return (
          <DiscountOnService
            listAllServices={listDvTrongGoi}
            updateListServices={onUpdateListServices}
            thongTinNbGoiDv={thongTinNbGoiDv}
          />
        );
      case 30:
        return (
          <DiscountByVoucher
            onUpdateReceipt={onUpdateReceipt}
            listAllServices={listDvTrongGoi}
            listVouchers={listAllMaGiamGia}
            onUpdateVoucherServices={onUpdateVoucherServices}
            thongTinNbGoiDv={thongTinNbGoiDv}
            setDisabledButton={setDisabledButton}
          />
        );
      default:
        return null;
    }
  }, [state.hinhThucMienGiam, thongTinNbGoiDv, state?.tienMienGiamGoiDv]);

  return (
    <ModalTemplate
      width={"70%"}
      ref={refModal}
      closeable={false}
      title={"Miễn giảm gói"}
      onCancel={onOK(false)}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<CheckCircleOutlined />}
          iconHeight={15}
          onClick={onOK(true)}
        >
          {t("common.xacNhan")}
        </Button>
      }
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

export default forwardRef(ModalMienGiam);
