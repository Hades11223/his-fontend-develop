import { Col } from "antd";
import Header1 from "pages/kho/components/Header1";
import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openInNewTab } from "utils";
import { Main } from "./styled";

const ThongTinPhieuNhap = ({}) => {
  const {
    phieuNhapXuat: { thongTinPhieu },
    utils: { listloaiDichVu },
  } = useSelector((state) => state);

  const { getUtils } = useDispatch().utils;

  useEffect(() => {
    getUtils({ name: "loaiDichVu" });
  }, []);

  const column = (data) => [
    {
      name: "Hình thức nhập:",
      data: data.hinhThucNhapXuat?.name,
    },
    {
      name: "Kho xuất:",
      data: data.khoDoiUng?.ten,
      onClick: () => openInNewTab("/kho/quan-tri-kho"),
    },
    {
      name: "Kho tủ trực:",
      data: data.kho?.ten,
    },
    {
      name: "Số phiếu:",
      data: data.soPhieu,
    },
    {
      name: "Khoa chỉ định:",
      data: data.dsKhoaChiDinh?.map((item) => item.ten).join(", "),
    },
    {
      name: "Loại DV:",
      data: listloaiDichVu?.find((i) => i.id === data.loaiDichVu)?.ten,
    },
    {
      name: "Người tạo phiếu:",
      data: data.nguoiTaoPhieu?.ten,
    },
    {
      name: "Người duyệt phiếu:",
      data: data.nguoiDuyet?.ten,
    },
    {
      name: "Ghi chú:",
      data: data.ghiChu,
    },
  ];

  return (
    <>
      <Header1
        title={"Thông tin phiếu lĩnh bù tủ trực"}
        noPadding={true}
        bottom={9}
      ></Header1>
      <Main>
        {column(thongTinPhieu).map((item, index) => (
          <Col key={index} span={8}>
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
