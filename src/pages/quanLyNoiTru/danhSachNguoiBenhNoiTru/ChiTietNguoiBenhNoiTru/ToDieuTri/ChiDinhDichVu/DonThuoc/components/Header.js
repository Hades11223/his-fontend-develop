import React from "react";
import { HeaderWrapper } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import { useDispatch } from "react-redux";
import { message, Tooltip } from "antd";
import { uniq } from "lodash";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import IconPrinter from "assets/images/khamBenh/printer.png";
import { useLoading } from "hook";

function Header(props) {
  const { getListDichVuThuoc, onDeleteAll, inPhieu } =
    useDispatch().chiDinhDichVuThuoc;
  const {
    listDvThuoc,
    nbDotDieuTriId,
    chiDinhTuDichVuId,
    soPhieuId,
    phieuNhapXuatId,
    loaiDonThuoc,
    nhaThuoc,
    isReadonly,
  } = props;
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();

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
                `Không thể xóa dịch vụ :  ${uniq(data)?.join("; ")}`
              );
            } else {
              message.success("Xóa đơn thuốc thành công");
            }
            getListDichVuThuoc({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 210,
            });
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
  return (
    <HeaderWrapper>
      {props.title}
      {nhaThuoc && (
        <Tooltip title={t("common.inDonThuoc")} placement="bottom">
          <img src={IconPrinter} alt="IconEdit" onClick={onPrintPhieu} />
        </Tooltip>
      )}
      {!isReadonly && (
        <Tooltip title="Xóa đơn thuốc" placement="bottom">
          <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
        </Tooltip>
      )}
    </HeaderWrapper>
  );
}

export default Header;
