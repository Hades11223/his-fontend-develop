import { Col, Popover } from "antd";
import Header1 from "pages/kho/components/Header1";
import React, { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import { useEnum } from "hook";
import IcInfo from "assets/images/khamBenh/icInfo.svg";

const ThongTinPhieuNhap = ({}) => {
  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);

  const [listloaiDichVu] = useEnum("loaiDichVu", []);

  const dienGiai = useMemo(() => {
    return `${
      thongTinPhieu.loaiNhapXuat === 85 ? "Phiếu lĩnh nội trú" : "Phiếu lĩnh bù"
    } ${listloaiDichVu?.find((i) => i.id === thongTinPhieu?.loaiDichVu)?.ten} ${
      thongTinPhieu.ghiChu
    }`;
    /**
     * Từ ngày ${moment(thongTinPhieu?.thoiGianTaoPhieu)?.format(
      "DD/MM/YYYY"
    )} Đến ngày ${
      thongTinPhieu?.thoiGianDuyet
        ? moment(thongTinPhieu?.thoiGianDuyet)?.format("DD/MM/YYYY")
        : ""
    }
     */
  }, [listloaiDichVu, thongTinPhieu]);

  const column = (data) => [
    {
      name: "Loại hàng hóa:",
      data: listloaiDichVu?.find((i) => i.id === data?.loaiDichVu)?.ten,
    },
    {
      name: "Khoa lĩnh:",
      data: data?.dsKhoaChiDinh?.map((item) => item.ten).join(", "),
    },
    {
      name: "Số phiếu:",
      data: data?.soPhieu,
    },
    {
      name: "Người tạo phiếu:",
      data: data?.nguoiTaoPhieu?.ten,
    },
    {
      name: "Diễn giải",
      data: (
        <Popover title={<div style={{ fontWeight: "bold" }}>{dienGiai}</div>}>
          <IcInfo className="pointer" />
        </Popover>
      ),
    },
    {
      name: "Lĩnh cho kho:",
      data: data.loaiNhapXuat === 85 ? data?.khoDoiUng?.ten : data?.kho?.ten,
    },
    {
      name: "Thành tiền (Theo giá nhập):",
      data: data?.thanhTien?.formatPrice(),
    },
    {
      name: "Người duyệt phiếu:",
      data: data?.nguoiDuyet?.ten,
    },
    // {
    //   name: "Từ ngày",
    //   data: (
    //     <span>
    //       {moment(data?.thoiGianTaoPhieu)?.format("DD/MM/YYYY")}
    //       <span style={{ fontWeight: "bold" }}> Đến ngày </span>
    //       {data?.thoiGianDuyet
    //         ? moment(data?.thoiGianDuyet)?.format("DD/MM/YYYY")
    //         : ""}
    //     </span>
    //   ),
    // },
    {
      name: "Kho xuất:",
      data: data.loaiNhapXuat === 85 ? data?.kho?.ten : data?.khoDoiUng?.ten,
    },
    {
      name: "Thành tiền (Theo giá bán):",
      data: data?.thanhTienSuaDoi?.formatPrice(),
    },
  ];

  return (
    <>
      <Header1 title={"Thông tin phiếu"} noPadding={true} bottom={9}></Header1>
      <Main>
        {column(thongTinPhieu).map((item, index) => (
          <Col key={index} span={6}>
            <label
              className="label pointer"
              onClick={item.onClick && item.onClick}
            >
              {item.name}
            </label>
            <div className="content">{item.data}</div>
          </Col>
        ))}
      </Main>
    </>
  );
};

export default memo(ThongTinPhieuNhap);
