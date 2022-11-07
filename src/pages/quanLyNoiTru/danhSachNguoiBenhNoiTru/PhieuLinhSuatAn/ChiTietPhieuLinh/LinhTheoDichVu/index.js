import React, { memo, useEffect } from "react";
import ScreenPhieuLinh from "pages/quanLyNoiTru/components/ScreenPhieuLinh";
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
    chiTiet({ phieuLinhId: id, page: "", size: "", phieuTraId: undefined });
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
      }),
      columns.inputTimeout({
        title: "Đơn vị tính",
        dataIndex: "tenDonViTinh",
        width: 100,
      }),
      columns.date({
        title: "Ngày thực hiện",
        dataIndex: "thoiGianThucHien",
        width: 100,
      }),
    ];
  };

  return (
    <ScreenPhieuLinh.DanhSach
      renderColumns={renderColumns}
      getDanhSach={chiTiet}
      initParam={{ phieuLinhId: id, page: "", size: "", phieuTraId: undefined }}
      dataSource={listDataChiTiet}
      tableName="table_NOITRU_ChiTietSuatAn_DsLinhTheoDv"
      // totalElements={totalElements}
    ></ScreenPhieuLinh.DanhSach>
  );
};

export default memo(LinhTheoDichVu);
