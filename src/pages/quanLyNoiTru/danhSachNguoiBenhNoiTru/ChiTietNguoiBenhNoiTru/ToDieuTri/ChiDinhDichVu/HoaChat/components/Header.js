import React from "react";
import { HeaderWrapper } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useDispatch } from "react-redux";
import { message, Tooltip } from "antd";
import { uniq } from "lodash";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";

function Header(props) {
  const {
    chiDinhHoaChat: { onDeleteAll, getListDichVuHoaChat },
  } = useDispatch();
  const { t } = useTranslation();
  const { listDvHoaChat, nbDotDieuTriId, chiDinhTuDichVuId } = props;

  const onDelete = (e) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("quanLyNoiTru.toDieuTri.xacNhanXoaDonHoaChat")}?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          const payload = listDvHoaChat.map((item) => {
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
                `${t("khamBenh.donThuoc.khongTheXoaDichVu")} :  ${uniq(
                  data
                )?.join("; ")}`
              );
            } else {
              message.success(
                t("quanLyNoiTru.toDieuTri.xoaDonHoaChatThanhCong")
              );
            }
            getListDichVuHoaChat({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 210,
            });
          });
        }
      );
  };

  return (
    <HeaderWrapper>
      {props.title && `${props.title}`}
      <Tooltip title={t("khamBenh.donThuoc.xoaDonVatTu")} placement="bottom">
        <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
      </Tooltip>
    </HeaderWrapper>
  );
}

export default Header;
