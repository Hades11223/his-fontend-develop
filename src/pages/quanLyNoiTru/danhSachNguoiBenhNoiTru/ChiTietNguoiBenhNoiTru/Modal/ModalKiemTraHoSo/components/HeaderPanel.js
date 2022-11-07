import React from "react";
import { HeaderStyled } from "../styled";
import IcReload from "assets/svg/noiTru/ic-reload.svg";
import IcDelete from "assets/svg/noiTru/ic-delete.svg";
import Icon from "@ant-design/icons";

const HeaderPanel = ({
  hideDelete,
  title,
  soKhoan,
  onRefreshList,
  onDeleteDichVu,
}) => {
  return (
    <HeaderStyled>
      <div className="title pl-5">{title}</div>
      <div className="so-khoan pl-5">{`(${soKhoan} khoản)`}</div>
      {!hideDelete && (
        <Icon
          className="pl-5"
          component={IcDelete}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteDichVu();
          }}
        />
      )}
      <Icon
        className="pl-5"
        component={IcReload}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRefreshList();
        }}
      />
    </HeaderStyled>
  );
};

export default HeaderPanel;
