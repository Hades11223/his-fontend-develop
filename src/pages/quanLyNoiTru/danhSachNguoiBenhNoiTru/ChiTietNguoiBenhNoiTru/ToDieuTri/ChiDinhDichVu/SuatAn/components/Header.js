import React from "react";
import { HeaderWrapper } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useDispatch } from "react-redux";
import { Dropdown, Menu, message, Tooltip } from "antd";
import { uniq } from "lodash";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";
import icHoanDv from "assets/images/khamBenh/icHoanDv.png";
import IcHuyHoan from "assets/images/xetNghiem/icHuyHoan.png";

function Header(props) {
  const {
    chiDinhSuatAn: { deleteAllSuatAn, getDsSuatAn },
  } = useDispatch();
  const { t } = useTranslation();

  const { listDvSuatAn, nbDotDieuTriId, chiDinhTuDichVuId, traSuatAn } = props;

  const onDelete = (e) => {
    const payload = listDvSuatAn.map((item) => {
      return item.id;
    });

    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `Bạn có chắc chắn muốn xóa đơn suất ăn`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          deleteAllSuatAn(payload).then((s) => {
            let data = (s?.data || [])
              .filter((item) => {
                return item.code !== 0 && item?.message;
              })
              ?.map((item) => item?.message);
            if (data?.length > 0) {
              message.error(
                `${t("quanLyNoiTru.suatAn.khongTheXoaDichVu")} :  ${uniq(
                  data
                )?.join("; ")}`
              );
            } else {
              message.success(t("quanLyNoiTru.suatAn.xoaDonThanhCong"));
            }
            getDsSuatAn({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 210,
            });
          });
        }
      );
  };

  const onTraSuatAn = (traDotXuat) => (e) => {
    e.stopPropagation();
    e.preventDefault();

    traSuatAn(1, traDotXuat);
  };

  const onHuyTraSuatAn = (e) => {
    e.stopPropagation();
    e.preventDefault();

    traSuatAn(2);
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <span onClick={onTraSuatAn(false)}>
              {t("quanLyNoiTru.suatAn.traSuatAn")}
            </span>
          ),
        },
        {
          key: "2",
          label: (
            <span onClick={onTraSuatAn(true)}>
              {t("quanLyNoiTru.suatAn.traDotXuat")}
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <HeaderWrapper>
      {props.title && `${props.title}`}
      <Tooltip title={t("quanLyNoiTru.suatAn.xoaDon")} placement="bottom">
        <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
      </Tooltip>

      <Dropdown overlay={menu} placement="topLeft">
        <img src={icHoanDv} alt="..."></img>
      </Dropdown>

      <Tooltip title={t("quanLyNoiTru.suatAn.huyTraSuatAn")} placement="bottom">
        <img src={IcHuyHoan} alt="IconDelete" onClick={onHuyTraSuatAn} />
      </Tooltip>
    </HeaderWrapper>
  );
}

export default Header;
