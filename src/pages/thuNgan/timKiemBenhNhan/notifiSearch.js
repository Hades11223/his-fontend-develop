import React, { useEffect } from "react";

import { MainNotifiSearch } from "./styled";
import { Row } from "antd";
import IconSearch from "assets/images/thuNgan/icSearch.png";
import { useTranslation } from "react-i18next";

const TimKiemBenhNhan = (props) => {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <MainNotifiSearch>
      <Row>
        <img src={IconSearch} alt="iconSearch" />
        <div className="title">
          {t(
            "thuNgan.vuiLongTimKiemNguoiBenhHoacNhanGoiNbTiepTheoDeTiepTucThanhToan"
          )}
        </div>
      </Row>
    </MainNotifiSearch>
  );
};
export default TimKiemBenhNhan;
