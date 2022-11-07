import React from 'react'
import { Checkbox } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { BoxWrapper } from "./styled";
import { useTranslation } from "react-i18next";


const TableDonThuoc = () => {
  const { t } = useTranslation();
  const onSelectChange = (selectedRowKeys) => {};
  const rowSelection = {
    columnTitle: <HeaderSearch title={<Checkbox />} />,
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: [],
  };
    const data = [
        {
          id: 1,
          name: "Paraxitamon (paracetamol) - 500mg",
          lieuLuong: "500.000/viên",
        },
        {
          id: 2,
          name: "Paraxitamon (paracetamol) - 500mg",
          lieuLuong: "500.000/viên",
        },
        {
          id: 3,
          name: "Paraxitamon (paracetamol) - 500mg",
          lieuLuong: "500.000/viên",
        },
        {
          id: 4,
          name: "Paraxitamon (paracetamol) - 500mg",
          lieuLuong: "500.000/viên",
        },
        {
          id: 5,
          name: "Paraxitamon (paracetamol) - 500mg",
          lieuLuong: "500.000/viên",
        },
        {
          id: 6,
          name: "Paraxitamon (paracetamol) - 500mg",
          lieuLuong: "500.000/viên",
        },
      ];
      const data2 = [
        {
          id: 1,
          name: "Cefprozil (PRICEFIL) 500mg",
          soLuong: "06 viên",
          lieuDung: "Uống 2 viên sau ăn, ngày 3 lần",
        },
        {
          id: 2,
          name: "Paraxitamon (paracetamol) - 500mg",
          soLuong: "06 viên",
          lieuDung: "Uống 2 viên sau ăn, ngày 3 lần",
        },
        {
          id: 3,
          name: "Paraxitamon (paracetamol) - 500mg",
          soLuong: "06 viên",
          lieuDung: "Uống 2 viên sau ăn, ngày 3 lần",
        },
        {
          id: 4,
          name: "Paraxitamon (paracetamol) - 500mg",
          soLuong: "06 viên",
          lieuDung: "Uống 2 viên sau ăn, ngày 3 lần",
        },
      ];
      const columnsTableLeft = [
        {
          title: "",
          dataIndex: "stt",
          key: "stt",
          render: () => <Checkbox />,
          width: "5%",
        },
        {
          title: "",
          dataIndex: "name",
          key: "name",
          width: "65%",
        },
        {
          title: "",
          dataIndex: "lieuLuong",
          key: "lieuLuong",
          width: "30%",
        },
      ];
      const columnsTableRight = [
        {
          title: <HeaderSearch title={t("khamBenh.donThuoc.tenThuocHamLuong")} />,
          dataIndex: "name",
          key: "name",
          width: "65%",
        },
        {
          title: <HeaderSearch title={t("common.soLuong")} />,
          dataIndex: "soLuong",
          key: "soLuong",
          width: "25%",
        },
        {
          title: <HeaderSearch title={t("khamBenh.donThuoc.lieuDungCachDung")} />,
          dataIndex: "lieuDung",
          key: "lieuDung",
          width: "35%",
        },
      ];
      return (
        <BoxWrapper>
          <div className="content-left">
            <TableWrapper columns={columnsTableLeft} dataSource={data} />
          </div>
          <div className="content-right">
            <div className="title">
              <div className="title__left">
                <img src={CircleCheck} alt="" /> {t("common.daChon")}
              </div>
              <div className="title__right">{t("common.tongTien")}: 999.999.999 vnđ</div>
            </div>
            <TableWrapper
              rowSelection={rowSelection}
              className="table-right"
              columns={columnsTableRight}
              dataSource={data2}
            />
          </div>
        </BoxWrapper>
      );
}

export default TableDonThuoc;