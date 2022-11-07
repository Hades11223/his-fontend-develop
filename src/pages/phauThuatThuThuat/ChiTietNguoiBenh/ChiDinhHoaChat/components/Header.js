import React, { useRef } from "react";
import { HeaderWrapper } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useDispatch } from "react-redux";
import { message, Tooltip } from "antd";
import { uniq } from "lodash";
import { useTranslation } from "react-i18next";
import { ModalNotification2 } from "components/ModalConfirm";
import { LOAI_DICH_VU } from "constants/index";

const Header = (props) => {
  const refNotification = useRef();
  const { onDeleteAll, getListDichVuHoaChat } = useDispatch().chiDinhHoaChat;
  const { t } = useTranslation();

  const { listDvHoaChat, nbDotDieuTriId, chiDinhTuDichVuId, disabledAll } = props;

  const onDelete = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (refNotification.current)
      refNotification.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: t("common.banCoChacMuonXoa") + props.title + "?",
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
              message.success(t("quanLyNoiTru.toDieuTri.xoaDonHoaChatThanhCong"));
            }
            getListDichVuHoaChat({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
            });
          });
        },
        () => {}
      );
  };

  return (
    <HeaderWrapper>
      {props.title && `${props.title}`}
      {!disabledAll && (
        <>
          <Tooltip
            title={t("khamBenh.donThuoc.xoaDonVatTu")}
            placement="bottom"
          >
            <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
          </Tooltip>
        </>
      )}
      <ModalNotification2 ref={refNotification} />
    </HeaderWrapper>
  );
};

export default Header;
