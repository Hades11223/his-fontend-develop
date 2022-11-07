import React from "react";
import { Title } from "../styled";
import { useTranslation } from "react-i18next";
import XetNghiemMau from "./XetNghiemMau";
import XetNghiemNuocTieu from "./XetNghiemNuocTieu";
import CDHA from "./CDHA";
import { TableCollapse } from "./styled";

const KhamCanLamSang = (props) => {
  const { t } = useTranslation();

  const { handleSetData } = props;
  return (
    <>
      <Title>VI. {t("khamBenh.khamSucKhoe.khamCanLamSang")}</Title>

      <TableCollapse>
        <thead>
          <tr>
            <th className="td-content">
              {t("khamBenh.khamSucKhoe.noiDungKham")}
            </th>
            <th className="td-bacsy">{t("khamBenh.khamSucKhoe.bacSi")}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <XetNghiemMau handleSetData={handleSetData} />
            </td>
            <td></td>
          </tr>

          <tr>
            <td>
              <XetNghiemNuocTieu handleSetData={handleSetData} />
            </td>
            <td></td>
          </tr>

          <tr>
            <td>
              <CDHA handleSetData={handleSetData} />
            </td>
            <td></td>
          </tr>
        </tbody>
      </TableCollapse>
    </>
  );
};

export default KhamCanLamSang;
