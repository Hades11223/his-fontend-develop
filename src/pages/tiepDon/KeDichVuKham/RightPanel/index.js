import React, { memo, useEffect, useRef } from "react";
import DichVuDaChon from "./DichVuDaChon";
import TongTien from "./TongTien";
import { Main } from "./styled";
import TabThongTin from "../../components/DanhSachBenhNhan/TabThongTin";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import { SplitPanel } from "components";
import { Tooltip } from "antd";
import IcXemThongKe from "assets/svg/tiep-don/xemThongKe.svg";
import IcDanhSachNbDaTiepDon from "assets/svg/tiep-don/iconDanhSachDaTiepDon.svg";
const RightPanel = ({ layerId, ...props }) => {
  const { t } = useTranslation();

  const refTabThongTin = useRef(null);
  const { id } = useParams();

  const idIndex = useStore("tiepDon.id", null);
  const khoaTiepDonId = useStore("tiepDon.khoaTiepDonId", null);
  const gioiTinh = useStore("tiepDon.gioiTinh", null);
  const {
    tiepDonDichVu: { onSearchNbDv, searchDvTiepDon },
    tiepDon: { getById },
    phong: { getListAllPhong },
  } = useDispatch();
  useEffect(() => {
    if (id) {
      if (idIndex != id) getById(id);
    }
    getListAllPhong({ active: true, page: "", size: "" });
  }, [id]);

  useEffect(() => {
    if (gioiTinh !== undefined && khoaTiepDonId && id)
      searchDvTiepDon({
        gioiTinh: gioiTinh,
        loaiDichVu: 10,
        khoaChiDinhId: khoaTiepDonId,
      }).then(() => {
        onSearchNbDv({
          nbDotDieuTriId: id,
          dsChiDinhTuLoaiDichVu: [200, 230, 240],
          dsLoaiDichVu: [10, 20, 30, 40, 60].join(","),
        });
      });
  }, [gioiTinh, khoaTiepDonId, id]);

  const onViewThongKe = () => {
    refTabThongTin.current && refTabThongTin.current.show({ show: true });
  };
  return (
    <Main {...props}>
      <div className="header-button">
        <div
          className="item"
          onClick={() =>
            window.open("/quan-ly-tiep-don/danh-sach-nb-da-tiep-don")
          }
        >
          <Tooltip title={t("tiepDon.dsNbDaTiepDon")} placement="left">
            <IcDanhSachNbDaTiepDon />
          </Tooltip>
        </div>
        <div className="item" onClick={() => onViewThongKe(true)}>
          <Tooltip title={t("tiepDon.thongKeTiepDon")} placement="left">
            <IcXemThongKe />
          </Tooltip>
        </div>
      </div>
      <SplitPanel mode="vertical">
        {/* <Row className="panel-info"> */}
        <DichVuDaChon />
        <TongTien layerId={layerId} />
      </SplitPanel>
      {/* </Row> */}
      <TabThongTin ref={refTabThongTin} />
    </Main>
  );
};

export default memo(RightPanel);
