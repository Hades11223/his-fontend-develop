import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { HeaderWrapper } from "./styled";
import { canEditOrUpdate } from "../utils";
import { useDispatch } from "react-redux";

const Header = ({
  isCollapsed,
  title,
  onDelete,
  listTrangThai,
  loaiDichVu,
  soPhieuId,
  nbDotDieuTriId,
  dataSource,
  phieuChiDinhId,
}) => {
  const inPhieu = useDispatch().chiDinhKhamBenh.inPhieu;

  const onPrint = (e) => {
    inPhieu({
      nbDotDieuTriId,
      soPhieuId,
      loaiDichVu,
      phieuChiDinhId,
    });
    e.stopPropagation();
  };
  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      <div className="info">
        <CaretRightOutlined className="collapse-arrow" />
        <span className="info__name">{title}</span>
        <img src={IconPrinter} alt="IconEdit" onClick={onPrint} />
        {canEditOrUpdate(null, loaiDichVu, listTrangThai) && (
          <img
            src={IconDelete}
            alt="IconDelete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
