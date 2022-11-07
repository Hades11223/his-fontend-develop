import React, { useMemo } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { HeaderWrapper } from "./styled";
import { useDispatch } from "react-redux";
import IconHoanDv from "assets/images/khamBenh/icHoanDv.png";
import { TRANG_THAI_DICH_VU, LOAI_DICH_VU } from "constants/index";
import { TRANG_THAI } from "pages/xetNghiem/configs";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useLoading } from "hook";
import IcViewImagePacs from "assets/svg/ic-view-pasc.svg";
import { Menu, Dropdown } from "antd";

const Header = ({
  isCollapsed,
  title,
  onDelete,
  loaiDichVu,
  soPhieuId,
  nbDotDieuTriId,
  dataSource,
  phieuChiDinhId,
  onHoanDichVu,
  onViewPacs,
  dsSoKetNoi,
  chiDinhTuLoaiDichVu,
  dsChiDinhTuLoaiDichVu,
  chiDinhTuDichVuId,
  isDisplayIconHoan,
  isReadonly,
  disabledAll,
}) => {
  const { t } = useTranslation();
  const { inPhieu, inPhieuKetQua } = useDispatch().chiDinhKhamBenh;

  const { showLoading, hideLoading } = useLoading();

  const onPrint = async (e) => {
    e.stopPropagation();
    showLoading();
    try {
      await inPhieu({
        nbDotDieuTriId,
        soPhieuId,
        loaiDichVu,
        phieuChiDinhId,
        chiDinhTuLoaiDichVu,
        dsChiDinhTuLoaiDichVu,
        chiDinhTuDichVuId,
      });
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const hidden = (key) =>
    dataSource &&
    dataSource.find(
      (x) =>
        ((x.thanhToan && x.trangThaiHoan === 0 && key === "return") ||
          (!x.thanhToan && key === "delete")) &&
        ((x.loaiDichVu === LOAI_DICH_VU.KHAM &&
          TRANG_THAI_DICH_VU["YEU_CAU_HOAN"].includes(x.trangThai)) ||
          (x.loaiDichVu === LOAI_DICH_VU.CDHA &&
            TRANG_THAI_DICH_VU["YEU_CAU_HOAN"].includes(x.trangThai)) ||
          (x.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM &&
            TRANG_THAI["YEU_CAU_HOAN"].includes(x.trangThai)))
    );
  const onPrintKetQua = async (e) => {
    try {
      e.stopPropagation();
      showLoading();
      await inPhieuKetQua({
        nbDotDieuTriId,
        soPhieuId,
        loaiDichVu,
        dsSoKetNoi,
        chiDinhTuLoaiDichVu,
        chiDinhTuDichVuId,
      });
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const menu = useMemo(() => {
    const phieus = [
      { key: 0, ten: t("phieuIn.inPhieuChiDinh"), api: onPrint },
      { key: 1, ten: t("phieuIn.inKetQua"), api: onPrintKetQua },
    ];
    return (
      <Menu
        items={phieus.map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={item?.api}>
              {item.ten}
            </a>
          ),
        }))}
      />
    );
  }, []);

  const isShowPacs = useMemo(
    () =>
      dataSource &&
      dataSource.find(
        (x) =>
          x.loaiDichVu === LOAI_DICH_VU.CDHA &&
          TRANG_THAI_DICH_VU.DA_CO_KET_QUA === x.trangThai
      ),
    [dataSource]
  );

  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      <div className="header-info">
        <CaretRightOutlined className="collapse-arrow" />
        <span className="header-info__name">{title}</span>
        {!disabledAll&&<>
        <Dropdown overlay={menu} placement="topCenter">
          <img
            src={IconPrinter}
            alt="IconEdit"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </Dropdown>

        {!isReadonly && <Tooltip title={t("common.xoaPhieu")} placement="bottom">
          <img
            src={IconDelete}
            alt="IconDelete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </Tooltip> }
        {isDisplayIconHoan && (
          <Tooltip title={t("common.hoanPhieu")} placement="bottom">
            <img src={IconHoanDv} alt="IconHoanDv" onClick={onHoanDichVu} />
          </Tooltip>
        )}

        {isShowPacs && (
          <Tooltip title={t("khamBenh.ketQua.xemKQPacs")} placement="bottom">
            <IcViewImagePacs
              className="icon"
              onClick={onViewPacs}
            />
          </Tooltip>
        )}</>}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
