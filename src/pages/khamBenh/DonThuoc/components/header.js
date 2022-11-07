import React from "react";
import { HeaderWrapper } from "../styled";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useDispatch } from "react-redux";
import { message, Tooltip } from "antd";
import { uniq } from "lodash";
import { useTranslation } from "react-i18next";
import { useLoading } from "hook";
import { refConfirm } from "app";
function Header(props) {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const {
    chiDinhDichVuKho: { inPhieu, onDeleteAll, getListDichVuThuoc },
  } = useDispatch();

  const {
    listDvThuoc,
    nbDotDieuTriId,
    soPhieuId,
    loaiDonThuoc,
    phieuNhapXuatId,
  } = props;

  const onDelete = (e) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("pttt.xacNhanXoaDonThuoc")} ${listDvThuoc[0].tenDon}?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          const payload = listDvThuoc.map((item) => {
            return item.id;
          });
          onDeleteAll(payload).then((s) => {
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
            getListDichVuThuoc({ nbDotDieuTriId, dsTrangThaiHoan: [0, 10, 20] });
          });
        }
      );
  };

  const onPrintPhieu = async (e) => {
    e.stopPropagation();
    try {
      showLoading();
      await inPhieu({
        nbDotDieuTriId,
        soPhieuId,
        loaiDonThuoc,
        phieuNhapXuatId,
        nhathuoc: true,
      });
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const soPhieu =
    props?.listDvThuoc?.[0]?.soPhieu == null
      ? ""
      : ` - ${props?.listDvThuoc?.[0]?.soPhieu}`;
  return (
    <HeaderWrapper>
      {props.title && `${props.title}${props?.listDvThuoc ? soPhieu : ""}`}
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
