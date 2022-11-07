import React from "react";
import { HeaderWrapper } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useDispatch } from "react-redux";
import { Tooltip, message } from "antd";
import { uniq } from "lodash";
import { useTranslation } from "react-i18next";
import { useLoading } from "hook";
import IconPrinter from "assets/images/khamBenh/printer.png";

function Header(props) {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();

  const { listDvThuoc, nbDotDieuTriId } = props;

  const {
    chiDinhDichVuThuoc: {
      onDeleteAllThuocKeNgoai,
      getListDichVuThuocKeNgoai,
      inPhieuThuocKeNgoai
    },
  } = useDispatch();

  const onDelete = (e) => {
    const payload = listDvThuoc.map((item) => {
      return item.id;
    });
    onDeleteAllThuocKeNgoai(payload).then((s) => {
      let data = (s?.data || [])
        .filter((item) => {
          return item.code !== 0 && item?.message;
        })
        ?.map((item) => item?.message);
      if (data?.length > 0) {
        message.error(
          `${t("khamBenh.donThuoc.khongTheXoaDichVu")} :  ${uniq(data)?.join(
            "; "
          )}`
        );
      } else {
        message.success(t("khamBenh.donThuoc.xoaDonThuocThanhCong"));
      }
      getListDichVuThuocKeNgoai({ nbDotDieuTriId });
    });
  };

  const onPrintPhieu = async (e) => {
    e.stopPropagation();
    try {
      showLoading();
      await inPhieuThuocKeNgoai({
        nbDotDieuTriId,
      });
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  return (
    <HeaderWrapper>
      {props.title}
      <Tooltip title={t("common.inDonThuoc")} placement="bottom">
        <img src={IconPrinter} alt="IconEdit" onClick={onPrintPhieu} />
      </Tooltip>
      <Tooltip title={t("khamBenh.donThuoc.xoaDonThuoc")} placement="bottom">
        <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
      </Tooltip>
    </HeaderWrapper>
  );
}

export default Header;
