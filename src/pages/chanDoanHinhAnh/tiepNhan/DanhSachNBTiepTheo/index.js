import React, { useEffect, useState } from "react";
import { Main, ContentTable } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Button, Row } from "antd";
import { useDispatch } from "react-redux";
import IconCall from "assets/images/xetNghiem/icCall.png";
import { useInterval, useStore } from "hook";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const DanhSachNBTiepTheo = (props) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const { dsPhongThucHienId } = useSelector((state) => state.dsBenhNhan);
  const listNbCls = useStore("qms.listNbCls", {});

  const {
    choTiepDonDV: { updateData: updateDataChoTiepDon, tiepNhanDv },
    qms: { getDsNguoiBenhCLSQms },
  } = useDispatch();

  const onCallNb = (data) => {
    tiepNhanDv(data?.dsId).then((s) => {
      getDsNguoiBenhCLSQms(dsPhongThucHienId);
    });
    updateDataChoTiepDon({ nbDotDieuTriId: data?.nbDotDieuTriId });
  };

  useEffect(() => {
    setState({ data: listNbCls.dsTiepTheo });
  }, [listNbCls.dsTiepTheo]);

  useInterval(() => {
    if (
      dsPhongThucHienId &&
      checkRole([ROLES["CHAN_DOAN_HINH_ANH"].NB_TIEP_THEO])
    )
      getDsNguoiBenhCLSQms(dsPhongThucHienId);
  }, 5000);

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHs")}
          sort_key="maHoSo"
          // dataSort={dataSortColumn["maHoSo"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenNb")}
          sort_key="tenNb"
          // dataSort={dataSortColumn["tenNb"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
      render: (item, data) => {
        return (
          <div className="item-info">
            <span>{item}</span>
            <Button className="btn-call" onClick={() => onCallNb(data)}>
              <span>{t("khamBenh.goi")}</span>
              <img src={IconCall} alt="..." />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Main>
      <Row className="header-table">
        <div className="header-table__left">
          {t("common.danhSachNguoiBenhTiepTheo")}
        </div>
      </Row>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={state.data}
          headerMinHeight="0px"
          scroll={{ x: 300 }}
          rowKey={(record) => `${record.id}-${record.tenNb}`}
        />
      </ContentTable>
    </Main>
  );
};

export default DanhSachNBTiepTheo;
