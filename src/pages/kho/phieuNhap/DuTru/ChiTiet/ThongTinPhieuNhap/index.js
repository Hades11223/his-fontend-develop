import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Col } from "antd";
import { Main } from "./styled";
import { openInNewTab } from "utils";
import Header1 from "pages/kho/components/Header1";

const ThongTinPhieuNhap = ({ ...props }) => {
  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);

  return (
    <>
      <Header1 title={"Thông tin phiếu"} noPadding={true} bottom={9}></Header1>
      <Main>
        <Col span={6}>
          <label
            className="label pointer"
            onClick={() => openInNewTab("/kho/quan-tri-kho")}
          >
            Kho xuất:
          </label>
          <div className="content">{thongTinPhieu.khoDoiUng?.ten}</div>
        </Col>
        <Col span={6}>
          <label
            className="label pointer"
            onClick={() => openInNewTab("/kho/quan-tri-kho")}
          >
            Kho nhập:
          </label>
          <div className="content">{thongTinPhieu.kho?.ten}</div>
        </Col>
        <Col span={6}>
          <label className="label">Tháng dự trù:</label>
          <div className="content">
            {thongTinPhieu.thangDuTru && "Tháng " + thongTinPhieu.thangDuTru}
          </div>
        </Col>
        <Col span={6}>
          <label className="label">Số phiếu:</label>
          <div className="content">{thongTinPhieu.soPhieu}</div>
        </Col>
        <Col span={6}>
          <label className="label">Người tạo phiếu:</label>
          <div className="content">{thongTinPhieu.nguoiTaoPhieu?.ten}</div>
        </Col>
        <Col span={18}>
          <label className="label">Ghi chú:</label>
          <div className="content">{thongTinPhieu.ghiChu}</div>
        </Col>
      </Main>
    </>
  );
};

export default memo(ThongTinPhieuNhap);
