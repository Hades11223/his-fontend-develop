import React, { memo, useEffect } from "react";
import ScreenPhieuTra from "pages/quanLyNoiTru/components/ScreenPhieuTra";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useStore } from "hook";

const LinhTheoDichVu = ({ refSetting }) => {
  const {
    nbPhieuLinhSuatAn: { chiTiet },
  } = useDispatch();
  const listDataChiTiet = useStore("nbPhieuLinhSuatAn.listDataChiTiet", []);

  const { id } = useParams();

  useEffect(() => {
    chiTiet({ phieuTraId: id, page: "", size: "", phieuLinhId: undefined });
  }, []);

  const renderColumns = ({ columns, onSettings }) => {
    refSetting.current["tab1"] = onSettings;
    return [
      columns.stt2({ width: 25 }),
      // column.tenDichVu(),
      columns.inputTimeout({
        title: "Tên dịch vụ",
        dataIndex: "tenDichVu",
        width: 300,
      }),
      columns.inputTimeout({
        title: "Số lượng",
        dataIndex: "soLuong",
        width: 70,
        hideSearch: true,
      }),
      columns.inputTimeout({
        title: "Đơn vị tính",
        dataIndex: "tenDonViTinh",
        width: 100,
        hideSearch: true,
      }),
      columns.date({
        title: "Ngày thực hiện",
        dataIndex: "thoiGianThucHien",
        width: 100,
        hideSearch: true,
      }),
    ];
  };

  return (
    <ScreenPhieuTra.DanhSach
      renderColumns={renderColumns}
      getDanhSach={chiTiet}
      initParam={{ phieuTraId: id, page: "", size: "", phieuLinhId: undefined }}
      dataSource={listDataChiTiet}
      tableName="table_NOITRU_ChiTietSuatAn_DsTraTheoDv"
      // totalElements={totalElements}
    ></ScreenPhieuTra.DanhSach>
  );
};

export default memo(LinhTheoDichVu);
