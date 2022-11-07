import React, { useMemo, useEffect } from "react";
import PendingIcon from "assets/svg/kham-benh/pending.svg";
import WaitingIcon from "assets/svg/kham-benh/waiting.svg";
import FinishIcon from "assets/svg/kham-benh/finish.svg";
import { Main } from "./styled";
import { Popover } from "antd";
import Tooltip from "../DichVu/Tooltip";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
export const KetLuan = ({ item, ...props }) => {
  const { t } = useTranslation();
  const updateData = useDispatch().khamBenh.updateData;
  useEffect(() => {
    updateData({ thoiGianKetLuan: item?.thoiGianKetLuan });
  }, []);
  const status = useMemo(() => {
    if (
      [
        40, //CHUYỂN VIỆN
        30, //NHẬP VIỆN
        100, //KHÔNG KHÁM
      ].includes(item?.huongDieuTri)
    )
      return 1;
    else if (
      [
        20, //HẸN KHÁM
      ].includes(item?.huongDieuTri)
    ) {
      return 2;
    } else {
      if (
        [
          10, //CHO VỀ
        ].includes(item?.huongDieuTri)
      ) {
        return 3;
      }
    }
  }, [item]);
  const icon = useMemo(() => {
    if (status == 1) return <WaitingIcon />;
    if (status == 2) return <PendingIcon />;
    return <FinishIcon />;
  }, [item]);
  const stateText = useMemo(() => {
    if (item?.huongDieuTri == 10) return t("khamBenh.hanhTrinhKham.choVe");
    if (item?.huongDieuTri == 20)
      return `${t("khamBenh.hanhTrinhKham.henKham")} <br/> ${
        item?.soNgayHenKham || 1
      } ${t("khamBenh.hanhTrinhKham.ngay")}`;
    if (item?.huongDieuTri == 30)
      return `${t("khamBenh.hanhTrinhKham.nhapVien")} <br/> ${
        item?.tenKhoaNhapVien
      }`;
    if (item?.huongDieuTri == 40)
      return `${t("khamBenh.hanhTrinhKham.chuyenVien")} <br/> ${
        item?.tenVienChuyenDen
      }`;
  }, [item]);
  return (
    <Popover content={<Tooltip item={item} isResult={true} />}>
      <Main className={`service-name status${status}`} id={props.id}>
        {icon}
        {parse(stateText)}
      </Main>
    </Popover>
  );
};

export default KetLuan;
