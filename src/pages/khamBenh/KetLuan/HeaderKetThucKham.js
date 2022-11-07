import React, { useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { HeaderWrapper } from "./styled";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

const HeaderKetThucKham = ({
  title,
  isCollapsed,
  showIconDelete,
  showIconPrint,
  nbDotDieuTriId,
  keyHuongDieuTri,
  id,
}) => {
  const { t } = useTranslation();
  const inPhieuKetLuanKham = useDispatch().ketQuaKham.inPhieuKetLuanKham;
  const tooltipText = {
    10: { text: "", i18n: "" },
    20: {
      text: "In giấy hẹn khám",
      i18n: "khamBenh.ketLuanKham.inGiayHenKham",
    },
    30: {
      text: "In giấy nhập viện",
      i18n: "khamBenh.ketLuanKham.inGiayNhapVien",
    },
    40: {
      text: "In giấy chuyển viện",
      i18n: "khamBenh.ketLuanKham.inGiayChuyenVien",
    },
  };
  const tooltip = tooltipText[keyHuongDieuTri]?.i18n
    ? t(tooltipText[keyHuongDieuTri].i18n)
    : "";
  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      <div className="info">
        <CaretRightOutlined className="collapse-arrow" />
        <span className="info__name">{title}</span>
        {showIconPrint !== false && (
          <Tooltip title={tooltip}>
            <img
              src={IconPrinter}
              alt="{In}"
              onClick={(e) => {
                e.stopPropagation();
                console.log("nbDotDieuTriId: ", nbDotDieuTriId);
                inPhieuKetLuanKham({
                  // nbDotDieuTriId,
                  id,
                  // soPhieuId,
                  // loaiDonThuoc,
                  // phieuNhapXuatId,
                });
              }}
            />
          </Tooltip>
        )}
        {showIconDelete !== false && (
          <img
            src={IconDelete}
            alt={t("khamBenh.ketLuanKham.huyKetLuan")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        )}
      </div>
    </HeaderWrapper>
  );
};

export default HeaderKetThucKham;
