import React from "react";
import { HeaderWrapper } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useDispatch } from "react-redux";
import { message, Tooltip } from "antd";
import { uniq } from "lodash";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import IcChangeService from "assets/images/xetNghiem/icChangeService.png";

function Header(props) {
  const { onDeleteAll, getListDichVuThuoc } = useDispatch().chiDinhDichVuThuoc;
  const { listDvThuoc, nbDotDieuTriId, chiDinhTuDichVuId, title, disabledAll, onChuyenThuoc } =
    props;
  const { t } = useTranslation();

  const onDelete = (e) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("pttt.xacNhanXoaDonThuoc")} ${
            listDvThuoc[0].tenDon && listDvThuoc[0].soPhieu
              ? `${`${listDvThuoc[0].tenDon} - ${listDvThuoc[0].soPhieu}`}`
              : listDvThuoc[0].tenDon
          }?`,
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
                `${t("khamBenh.donThuoc.khongTheXoaDichVu")} :  ${uniq(data)?.join("; ")}`
              );
            } else {
              message.success(t("khamBenh.donThuoc.xoaDonThuocThanhCong"));
            }
            getListDichVuThuoc({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 40,
            });
          });
        }
      );
  };

  return (
    <HeaderWrapper>
      {title}
      {!disabledAll && (
        <>
          <Tooltip title="Xóa đơn thuốc" placement="bottom">
            <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
          </Tooltip>
          <Tooltip title={t("pttt.chuyenDichVu")} placement="bottom">
            <img
              style={{ objectFit: "contain" }}
              src={IcChangeService}
              alt="..."
              onClick={() => onChuyenThuoc()}
            />
          </Tooltip>
        </>
      )}
    </HeaderWrapper>
  );
}

export default Header;
