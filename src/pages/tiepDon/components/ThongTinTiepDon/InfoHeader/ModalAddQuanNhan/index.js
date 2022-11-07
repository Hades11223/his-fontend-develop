import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "../ModalAddCapCuu/styled";
import { Col } from "antd";
import { Button, Select, ModalTemplate } from "components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IconSuccess from "assets/svg/ic-check-circle-white.svg";

const ModalAddQuanNhan = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { listAllChucVu } = useSelector((state) => state.chucVu);
  const { listAllDonVi } = useSelector((state) => state.donVi);
  const { listAllQuanHam } = useSelector((state) => state.quanHam);
  const { listAllNguoiDaiDien } = useSelector((state) => state.nguoiDaiDien);
  const {
    chucVu: { getListAllChucVu },
    donVi: { getListAllDonVi },
    quanHam: { getListAllQuanHam },
    nguoiDaiDien: { getListAllNguoiDaiDien },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      getListAllChucVu();
      getListAllDonVi();
      getListAllQuanHam();
      getListAllNguoiDaiDien();
      setState({
        show: item.show,
        donViId: item?.donViId,
        nguoiDaiDienId: item?.nguoiDaiDienId,
        chucVuId: item?.chucVuId,
        quanHamId: item?.quanHamId,
      });
      refCallback.current = callback;
    },
  }));
  const { donViId, nguoiDaiDienId, chucVuId, quanHamId, checkValidate } = state;
  const onSave = () => {
    if (donViId && chucVuId && quanHamId) {
      setState({
        show: false,
        checkValidate: false,
      });
      let obj = {
        donViId,
        nguoiDaiDienId,
        chucVuId,
        quanHamId,
      };
      if (refCallback.current) refCallback.current(obj);
    } else {
      setState({ checkValidate: true });
    }
  };

  const onChange = (value, variables) => {
    setState({ [`${variables}`]: value });
  };
  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    setState({ show: false });
  };

  return (
    <ModalTemplate
      closable={false}
      width={600}
      ref={refModal}
      title={t("tiepDon.thongTinBoSung")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSave}
          iconHeight={20}
          rightIcon={<IconSuccess />}
        >
          <span> {t("common.luuThongTin")} </span>
        </Button>
      }
    >
      <Main>
        <Col span={12} className="pr-3">
          <div className="item-select">
            <label className={!donViId ? `label label-error` : "label"}>
              {t("tiepDon.donVi")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "donViId")}
              value={donViId}
              placeholder={t("tiepDon.chonDonVi")}
              data={listAllDonVi || []}
            />
            {checkValidate && !donViId && (
              <div className="error2">{t("tiepDon.vuiLongChonLoaiDonVi")}</div>
            )}
          </div>
          <div className="item-select ">
            <label className={!chucVuId ? `label label-error` : "label"}>
              {t("tiepDon.chucVu")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "chucVuId")}
              value={chucVuId}
              placeholder={t("tiepDon.chonChucVu")}
              data={listAllChucVu || []}
            />
            {checkValidate && !chucVuId && (
              <div className="error2">{t("tiepDon.vuiLongChonChucVu")}</div>
            )}
          </div>
        </Col>
        <Col span={12} className="pl-3">
          <div className="item-select">
            <label className={!quanHamId ? `label label-error` : "label"}>
              {t("tiepDon.quanHam")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "quanHamId")}
              value={quanHamId}
              placeholder={t("tiepDon.chonQuanHam")}
              data={listAllQuanHam || []}
            />
            {checkValidate && !quanHamId && (
              <div className="error2">{t("tiepDon.vuiLongChonQuanHam")}</div>
            )}
          </div>
          <div className="item-select">
            <label className="label">{t("tiepDon.nguoiDaiDien")}</label>
            <Select
              onChange={(e) => onChange(e, "nguoiDaiDienId")}
              value={nguoiDaiDienId}
              placeholder={t("tiepDon.chonNguoiDaiDien")}
              data={listAllNguoiDaiDien || []}
            />
          </div>
        </Col>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalAddQuanNhan);
