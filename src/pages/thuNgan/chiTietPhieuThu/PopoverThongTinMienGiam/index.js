import React, { useEffect, useState } from "react";
import { Main, GlobalStyle } from "./styled";
import { Popover, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Select } from "components";
import IcInfo from "assets/svg/ic-info.svg";
import { useParams } from "react-router-dom";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const PopoverThongTinMienGiam = () => {
  const { t } = useTranslation();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const [listLoaiMienGiam] = useEnum(ENUM.LOAI_MIEN_GIAM);

  const {
    nbDotDieuTri: { mienGiam, getById, tongTienDieuTri },
    thuNgan: { getThongTinPhieuThu },
  } = useDispatch();
  const { nbDotDieuTriId, phieuThuId } = useParams();
  const [state, _setState] = useState({ isEdit: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChangeUpdate = (key) => (e) => {
    setState({ [key]: e });
  };

  const onEdit = () => {
    setState({ isEdit: true });
  };
  const onSubmit = () => {
    mienGiam({
      id: nbDotDieuTriId,
      loaiMienGiam: state?.loaiMienGiam || null,
      nguoiDuyetId: state?.loaiMienGiam ? state?.nguoiDuyetId : null,
    }).then(() => {
      if (!state?.loaiMienGiam) {
        setState({ nguoiDuyetId: null, isEdit: false });
      }
      getById(nbDotDieuTriId);
      getThongTinPhieuThu(phieuThuId);
      tongTienDieuTri({ id: nbDotDieuTriId });
    });
  };
  useEffect(() => {
    if (thongTinBenhNhan) {
      setState({
        loaiMienGiam: thongTinBenhNhan?.loaiMienGiam,
        nguoiDuyetId: thongTinBenhNhan?.nguoiDuyetMienGiamId,
      });
    }
  }, [thongTinBenhNhan]);
  const content = () => (
    <Main>
      <div className="content-popover">
        <div className="content-mg">
          <div className="title"> {t("thuNgan.loaiMg")}:</div>
          <Select
            value={state.loaiMienGiam}
            data={listLoaiMienGiam}
            onChange={onChangeUpdate("loaiMienGiam")}
            disabled={!state?.isEdit}
          />
        </div>
        <div className="content-mg">
          <div className="title"> {t("thuNgan.nguoiDuyetMg")}:</div>
          <Select
            value={state.nguoiDuyetId}
            data={listAllNhanVien}
            onChange={onChangeUpdate("nguoiDuyetId")}
            disabled={!state?.isEdit}
          />
        </div>
        <div className="footer">
          {!state?.isEdit && (
            <Button minWidth={80} onClick={onEdit}>
              Sửa
            </Button>
          )}
          {state?.isEdit && (
            <Button type="primary" minWidth={80} onClick={onSubmit}>
              Lưu{" "}
            </Button>
          )}
        </div>
      </div>
    </Main>
  );
  return (
    <div>
      <GlobalStyle />
      <Popover
        content={content}
        overlayClassName="popover-loai-mien-giam"
        trigger="click"
        placement={"bottomRight"}
        style={{ borderRadius: "16px" }}
      >
        <Tooltip title={t("thuNgan.chiTietDichVuKham")} placement="bottom">
          <IcInfo className="icon" />
        </Tooltip>
      </Popover>
    </div>
  );
};

export default PopoverThongTinMienGiam;
