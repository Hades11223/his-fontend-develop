import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEnum, useStore } from "hook";
import ScreenPhieuTra from "pages/quanLyNoiTru/components/ScreenPhieuTra";

const DanhSachNguoiBenh = ({ refSetting }) => {
  const { id } = useParams();
  const {
    chiDinhSuatAn: { getDsSuatAn },
  } = useDispatch();
  const { getListAllLoaiBuaAn } = useDispatch().loaiBuaAn;

  const listAllLoaiBuaAn = useStore("loaiBuaAn.listAllLoaiBuaAn", []);
  const listDvSuatAn = useStore("chiDinhSuatAn.listDvSuatAn", []);

  const [listGioiTinh] = useEnum("GioiTinh", []);
  const [listTrangThai] = useEnum("TrangThaiPhieuLinhSuatAn", []);

  useEffect(() => {
    getListAllLoaiBuaAn({ page: "", size: "" });
    getDsSuatAn({ phieuTraId: id, page: "", size: "" });
  }, []);

  const renderColumns = ({ columns, onSettings }) => {
    refSetting.current["tab2"] = onSettings;
    return [
      columns.stt,
      columns.inputTimeout({
        title: "Tên người bệnh",
        dataIndex: "tenNb",
        width: 200,
      }),
      columns.inputTimeout({
        title: "Mã BA",
        dataIndex: "maBenhAn",
        width: 100,
      }),
      columns.enum({
        title: "Giới tính",
        dataIndex: "gioiTinh",
        listEnum: listGioiTinh,
        width: 100,
      }),
      columns.inputTimeout({
        title: "Tên dịch vụ",
        dataIndex: "tenDichVu",
        width: 180,
      }),
      columns.select({
        title: "Loại bữa ăn",
        dataIndex: "loaiBuaAnId",
        width: 150,
        dataSearch: [{ id: "", ten: "Tất cả" }, ...listAllLoaiBuaAn],
      }),
      columns.inputTimeout({
        title: "SL",
        dataIndex: "soLuong",
        width: 80,
        hideSearch: true,
      }),
      columns.inputTimeout({
        title: "Đơn vị tính",
        dataIndex: "tenDonViTinh",
        width: 100,
        hideSearch: true,
      }),
      columns.enum({
        title: "Trạng thái",
        dataIndex: "trangThai",
        listEnum: listTrangThai,
        width: 150,
      }),
      columns.date({
        title: "Ngày thực hiện",
        dataIndex: "thoiGianThucHien",
        width: 150,
        hideSearch: true,
      }),
      columns.checkbox({
        title: "Không tính tiền",
        dataIndex: "khongTinhTien",
        width: 100,
        dataSearch: ["Không tính tiền", "Có tính tiền"],
      }),
      columns.checkbox({
        title: "Tự trả",
        dataIndex: "tuTra",
        dataSearch: ["Tự trả", "Không tự trả"],
      }),
      // {
      //   title: <HeaderSearch title="Tiện tích" />,
      //   key: "",
      //   width: "60px",
      //   dataIndex: "",
      //   hideSearch: true,
      //   align: "right",
      //   render: (_) => {
      //     return (
      //       <div
      //         style={{
      //           display: "flex",
      //           alignItems: "center",
      //           justifyContent: "space-around",
      //         }}
      //       >
      //         <IcDelete />
      //       </div>
      //     );
      //   },
      // },
    ];
  };

  const onSearch = (data) => {
    getDsSuatAn({ phieuTraId: id, ...data });
  };

  return (
    <ScreenPhieuTra.DanhSach
      getDanhSach={onSearch}
      dataSource={listDvSuatAn}
      renderColumns={renderColumns}
      tableName="table_NOITRU_ChiTietTraSuatAn_DsNb"
      initParam={{ page: "", size: "" }}
    />
  );
};

export default DanhSachNguoiBenh;
