import React from "react";
import SoLuongLeLinh from "../SoLuongLeLinh";
import IcDelete from "assets/svg/ic-delete.svg";
import { HeaderSearch } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DanhSachNguoiBenh = (props) => {
  const { id } = useParams();
  const {
    nbDvKho: { getNbDvKho: getDsNb },
  } = useDispatch();

  const renderColumns = ({ commonCol }) => [
    commonCol.check,
    commonCol.stt,
    commonCol.maHoSo,
    commonCol.tenNb,
    commonCol.tenHangHoa,
    commonCol.slTra,
    commonCol.ngayThucHien,
    commonCol.ngayKe,
    {
      title: <HeaderSearch title="Tiện tích" />,
      key: "",
      width: "60px",
      dataIndex: "",
      hideSearch: true,
      align: "right",
      render: (_, item, index) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <IcDelete />
          </div>
        );
      },
    },
  ];

  const onSearch = (data) => {
    getDsNb({ phieuLinhId: id, ...data });
  };

  return (
    <SoLuongLeLinh
      onSearch={onSearch}
      renderColumns={renderColumns}
    />
  );
};

export default DanhSachNguoiBenh;
