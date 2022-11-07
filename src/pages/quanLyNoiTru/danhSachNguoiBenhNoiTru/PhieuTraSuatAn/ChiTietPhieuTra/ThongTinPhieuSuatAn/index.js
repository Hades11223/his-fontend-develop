import { Checkbox } from "antd";
import React, { memo, useEffect } from "react";
import moment from "moment";
import ScreenPhieuTra from "pages/quanLyNoiTru/components/ScreenPhieuTra";
import { useEnum, useStore } from "hook";

const ThongTinPhieuSuatAn = ({}) => {
  const dataDetail = useStore("nbPhieuLinhSuatAn.dataDetail", {});
  const [listTrangThaiPhieuLinhSuatAn] = useEnum(
    "TrangThaiPhieuLinhSuatAn",
    []
  );
  const column = () => [
    {
      name: "Số phiếu:",
      data: dataDetail?.soPhieu,
    },
    {
      name: "Khoa chỉ định:",
      data: dataDetail?.tenKhoa,
    },
    {
      name: "Người duyệt:",
      data: dataDetail?.tenNguoiDuyet,
    },
    {
      name: "Ngày thực hiện",
      data: dataDetail?.ngayThucHien
        ? moment(dataDetail?.ngayThucHien)?.format("DD/MM/YYYY")
        : "",
    },
    {
      name: "Trạng thái:",
      data: listTrangThaiPhieuLinhSuatAn.find(
        (i) => i.id === dataDetail?.trangThai
      )?.ten,
    },
    {
      name: "",
      data: <Checkbox checked={dataDetail.dotXuat}>Đột xuất</Checkbox>,
    },
    {
      name: "",
      data: "",
    },
    {
      name: "Ngày duyệt",
      data: dataDetail?.thoiGianDuyet
        ? moment(dataDetail?.thoiGianDuyet)?.format("DD/MM/YYYY")
        : "",
    },
  ];

  return (
    <ScreenPhieuTra.ThongTinPhieu
      column={column}
    ></ScreenPhieuTra.ThongTinPhieu>
  );
};

export default memo(ThongTinPhieuSuatAn);
