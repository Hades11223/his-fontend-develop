import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoPatients } from "../../configs";
import { Main } from "./styled";
import IcChart from "assets/images/khamBenh/icChart.svg";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useInterval, usePrevious } from "hook";

export const SoLuongBN = (props) => {
  const { t } = useTranslation();
  const statisticsRoom = useSelector((state) => state.khamBenh.statisticsRoom);
  const phongThucHienId = useSelector(
    (state) => state.nbKhamBenh.phongThucHienId
  );
  const prePhongThucHienId = usePrevious(phongThucHienId);

  const {
    khamBenh: { getStatisticsRoom },
  } = useDispatch();

  useEffect(() => {
    if (!phongThucHienId) return;
    if (prePhongThucHienId != phongThucHienId)
      getStatisticsRoom(phongThucHienId);
  }, [phongThucHienId]);

  useInterval(() => {
    getStatisticsRoom(phongThucHienId)
  }, [300000]);
  return (
    <Main>
      <Tooltip title={t("khamBenh.bieuDoPhongKham")} placement="top">
        <IcChart />
      </Tooltip>
      {infoPatients.map((info) => {
        return (
          <div
            key={info.key}
            className="info"
            style={{ background: info.background }}
          >
            {t(`khamBenh.${info.dataIndex}`)}:{" "}
            <span className="info--bold">{statisticsRoom[info.dataIndex]}</span>
          </div>
        );
      })}
    </Main>
  );
};

export default React.memo(SoLuongBN);
