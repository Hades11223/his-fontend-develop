import { Row } from "antd";
import React, { useEffect } from "react";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const TimKiem = () => {
  const { t } = useTranslation();

  const {
    baoCao: { tongHop: baoCaotongHop },
  } = useDispatch();

  useEffect(() => {
    baoCaotongHop();
  }, []);

  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>{t("kySo.lichSuKyChiTiet")}</label>
          </div>
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
