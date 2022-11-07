import React from "react";
import SoLuongLeLinh from "../SoLuongLeLinh";
import IcDelete from "assets/svg/ic-delete.svg";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";

const DanhSachNguoiBenh = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    nbDvKho: { getNbDvKho: getDsNb },
    phieuNhapXuat: { xoaHangHoaPhieuTra },
  } = useDispatch();

  const onDelete = (item) => (e) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Xóa dữ liệu",
          content: `Bạn có chắc chắn xóa ${item.tenDichVu}?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          xoaHangHoaPhieuTra({
            nbDvKhoTraId: item.id,
            phieuTraKhoChiTietId: item.phieuTraId,
          }).then(() => {
            props.onRefresh && props.onRefresh();
          });
        }
      );
  };

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
            <IcDelete onClick={onDelete(item)} />
          </div>
        );
      },
    },
  ];

  const onSearch = (data) => {
    getDsNb({ phieuLinhId: id, ...data });
  };

  return <SoLuongLeLinh onSearch={onSearch} renderColumns={renderColumns} />;
};

export default DanhSachNguoiBenh;
