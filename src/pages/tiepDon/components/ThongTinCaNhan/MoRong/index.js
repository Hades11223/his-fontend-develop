import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { Row, Col, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TakeImage from "../../TakeImage";
import { Select, InputTimeout, ModalTemplate } from "components";
import { openInNewTab } from "utils";
import { Main, ActionBottom } from "./styled";
import { useTranslation } from "react-i18next";
import fileProvider from "data-access/file-provider";
import { useCamera } from "hook";
import IcArrowDown from "assets/svg/ic-arrow-down.svg";

const MoRong = ({ onChange, ...props }, ref) => {
  const { t } = useTranslation();
  const { onShowCamera } = useCamera();
  const refModal = useRef(null);

  const {
    nbGiayToTuyThan,
    danTocId,
    disableTiepDon,
    daXacThucThongTin,
    ngheNghiepId,
    soBaoHiemXaHoi,
    nbDiaChi,
    searchThe,
    theBaoHiem,
  } = useSelector((state) => state.tiepDon);
  const { listAllDanToc } = useSelector((state) => state.danToc);
  const { listAllNgheNghiep } = useSelector((state) => state.ngheNghiep);

  const {
    tiepDon: { updateThongTinNb, updateData },
  } = useDispatch();

  const { diaChiNuocNgoai } = nbDiaChi || {};
  const [state, _setState] = useState({ show: false });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));
  useEffect(() => {
    setState({
      anhMatTruoc: nbGiayToTuyThan?.anhMatTruoc,
      anhMatSau: nbGiayToTuyThan?.anhMatSau,
    });
  }, [nbGiayToTuyThan]);
  useEffect(() => {
    setState({ soBaoHiemXaHoi });
  }, [soBaoHiemXaHoi]);
  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const { anhMatSau, anhMatTruoc, soBaoHiemXaHoi: nbSoBaoHiemXaHoi } = state;
  const onTakePicture = (type) => () => {
    if (!disableTiepDon)
      if (type === "anhMatTruoc") {
        onShowCamera(
          {
            title: t("common.matTruoc"),
          },
          async (file) => {
            const res = await fileProvider.uploadImage({ file, type });
            if (res?.code === 0) return res.data[0];
            return null;
          },
          (data) => {
            if (data) onChangeGiayTo(type)(data);
          }
        );
      } else {
        onShowCamera(
          {
            title: t("common.matSau"),
          },
          async (file) => {
            const res = await fileProvider.uploadImage({ file, type });
            if (res?.code === 0) return res.data[0];
            return null;
          },
          (data) => {
            if (data) onChangeGiayTo(type)(data);
          }
        );
      }
  };

  const onChangeGiayTo = (type) => (value) => {
    updateThongTinNb({ [type]: value }, "nbGiayToTuyThan");
  };
  const onChangeDiaChi = (type) => (value) => {
    updateThongTinNb({ [type]: value }, "nbDiaChi");
  };

  const onOk = () => {
    setState({ show: false });
  };

  return (
    <ModalTemplate
      title={t("tiepDon.thongTinBoSung")}
      ref={refModal}
      closable={false}
      width={600}
      onCancel={onOk}
      actionCenter={
        <ActionBottom onClick={onOk}>
          <div>
            <span style={{ color: "#0762F7", marginRight: 5 }}>Thu gọn</span>
            <IcArrowDown className="icon" />
          </div>
        </ActionBottom>
      }
    >
      <Main>
        <Row className="row-name">
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select" style={{ marginTop: 10 }}>
              <label
                className="label pointer"
                onClick={() => openInNewTab("/danh-muc/dan-toc")}
              >
                {t("common.danToc")}
              </label>
              <Select
                onChange={(e) => onChange(e, "danTocId")}
                value={danTocId}
                className="select"
                placeholder={t("common.chonDanToc")}
                data={listAllDanToc || []}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          {/* {props.dataMacDinh?.quocTich?.id !== quocTichId && ( */}
          <Col md={12} xl={12} xxl={12} style={{ paddingRight: 0 }}>
            <div className="item-input" style={{ marginTop: 10 }}>
              <label className="label">{t("tiepDon.diaChiTaiNuocNgoai")}</label>
              <InputTimeout
                isTextArea={true}
                placeholder={t("tiepDon.nhapDiaChiTaiNuocNgoai")}
                value={diaChiNuocNgoai}
                onChange={onChangeDiaChi("diaChiNuocNgoai")}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          {/* )} */}
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label
                className="label pointer"
                onClick={() => openInNewTab("/danh-muc/nghe-nghiep")}
              >
                {t("common.ngheNghiep")}
              </label>
              <Select
                onChange={(e) => updateData({ ngheNghiepId: e })}
                value={ngheNghiepId}
                className="select"
                placeholder={t("common.chonNgheNghiep")}
                data={listAllNgheNghiep || []}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12} style={{ paddingRight: 0 }}>
            <div className="item-input">
              <label className="label">{t("tiepDon.maSoBHXH")}</label>
              <InputTimeout
                placeholder={t("tiepDon.nhapMaSoBHXH")}
                value={nbSoBaoHiemXaHoi}
                onChange={(e) => updateData({ soBaoHiemXaHoi: e })}
                disabled={
                  disableTiepDon || (searchThe && theBaoHiem?.maKetQua == "000")
                }
              />
            </div>
          </Col>
          <Col md={24} xl={24} xxl={24}>
            <div className="checkbox">
              <Checkbox
                disabled={disableTiepDon}
                checked={daXacThucThongTin}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    updateData({
                      daXacThucThongTin: !e?.target?.checked,
                    });
                  }
                }}
              >
                {t("tiepDon.daXacThucThongTin")}
              </Checkbox>
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div
              className={
                disableTiepDon ? "optimize avatar-no-drop" : "optimize"
              }
              onClick={onTakePicture("anhMatTruoc")}
            >
              <TakeImage
                value={anhMatTruoc}
                image={require("assets/images/welcome/Mattruoc.png")}
                icon={require("assets/images/welcome/iconAccept.png")}
                titleTooltipIcon={t("common.chupAnh")}
              />
              <div className="text">
                {t("common.cmndCanCuoc")} <br />
                {t("common.matTruoc")}
              </div>
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div
              className={
                disableTiepDon ? "optimize avatar-no-drop" : "optimize"
              }
              onClick={onTakePicture("anhMatSau")}
            >
              <TakeImage
                value={anhMatSau}
                image={require("assets/images/welcome/Matsau.png")}
                icon={require("assets/images/welcome/iconAccept.png")}
                titleTooltipIcon={t("common.chupAnh")}
              />
              <div className="text">
                {t("common.cmndCanCuoc")} <br />
                {t("common.matSau")}
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(MoRong);
