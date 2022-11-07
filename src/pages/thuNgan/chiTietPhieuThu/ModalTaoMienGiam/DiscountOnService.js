import React, { useEffect, useState } from "react";
import { InputNumber, Input, Checkbox } from "antd";
import cloneDeep from "lodash/cloneDeep";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { formatDecimal, parseFloatNumber } from "utils";
import { useTranslation } from "react-i18next";
import { InputNumberFormat } from "components/common";

let timer = null;

const DiscountOnService = ({
  listAllServices,
  updateListServices,
  thongTinPhieuThu,
  onUpdateReceipt,
  ghiChu,
}) => {
  const { t } = useTranslation();

  const [state, _setState] = useState({
    data: [],
    selectedRowKeys: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState({
      data: cloneDeep(listAllServices),
    });
  }, [listAllServices]);

  const onSearchInput = (e) => {
    e.persist();
    clearTimeout(timer);
    timer = setTimeout(() => {
      const searchValue = e.target.value;
      const valueText = searchValue?.trim().toLowerCase().unsignText();
      const dataSearch = !!valueText
        ? state.data?.filter(
            (option) =>
              option?.tenDichVu
                ?.toLowerCase()
                .unsignText()
                .indexOf(valueText) >= 0
          )
        : listAllServices;
      const { phanTramMienGiamDichVu, tienMienGiamDichVu } = state;
      dataSearch.map((item) => {
        item.phanTramMienGiamDichVu = phanTramMienGiamDichVu;
        item.tienMienGiamDichVu =
          item.thanhTien < tienMienGiamDichVu
            ? item.thanhTien
            : tienMienGiamDichVu;
        return item;
      });
      setState({ data: dataSearch });
      updateListServices(dataSearch);
    }, 300);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} className="text-center" />,
      width: "30px",
      dataIndex: "stt",
      key: "stt",
      align: "right",
    },
    {
      title: (
        <HeaderSearch title={t("common.thanhTien")} className="text-center" />
      ),
      width: "60px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          search={
            <Input
              placeholder={t("thuNgan.timTenDichVu")}
              onChange={onSearchInput}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
    },
    {
      title: (
        <HeaderSearch title={t("common.soLuong")} className="text-center" />
      ),
      width: "60px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.phanTramMienGiam")}
          className="text-center"
        />
      ),
      width: "60px",
      dataIndex: "phanTramMienGiamDichVu",
      key: "phanTramMienGiamDichVu",
      align: "right",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tienMienGiam")}
          className="text-center"
        />
      ),
      width: "60px",
      dataIndex: "tienMienGiamDichVu",
      key: "tienMienGiamDichVu",
      align: "right",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
  ];
  const onSelectChange = (selectedRowKeys) => {
    const { data, phanTramMienGiamDichVu, tienMienGiamDichVu } = state;
    const formattedData = data
      .map((item) => {
        if (selectedRowKeys.includes(item.key)) {
          item.phanTramMienGiamDichVu = phanTramMienGiamDichVu;
          item.tienMienGiamDichVu =
            item.thanhTien < tienMienGiamDichVu
              ? item.thanhTien
              : tienMienGiamDichVu;
          return item;
        }
        return null;
      })
      .filter((item1) => item1);
    setState({ selectedRowKeys });
    updateListServices(formattedData);
  };

  const onSelectAll = (e) => {
    const { data, phanTramMienGiamDichVu, tienMienGiamDichVu } = state;
    const formattedData = data.map((item) => {
      if (e.target.checked) {
        item.phanTramMienGiamDichVu = phanTramMienGiamDichVu;
        item.tienMienGiamDichVu =
          item.thanhTien < tienMienGiamDichVu
            ? item.thanhTien
            : tienMienGiamDichVu;
        return item;
      }
      item.phanTramMienGiamDichVu = null;
      item.tienMienGiamDichVu = null;
      return null;
    });
    setState({
      selectedRowKeys: e.target?.checked ? data.map((item) => item.key) : [],
    });
    updateListServices(formattedData);
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={onSelectAll}
            disabled={thongTinPhieuThu.thanhToan}
          />
        }
      />
    ),
    columnWidth: 20,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    getCheckboxProps: () => ({
      disabled: thongTinPhieuThu.thanhToan,
    }),
  };

  const onChangeInput = (key) => (e) => {
    let value = e?.target.value && parseFloatNumber(e.target.value);
    const { data, selectedRowKeys } = state;
    const formattedData = data.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        if (key === "tienMienGiamDichVu" && item.thanhTien < value) {
          item[key] = item.thanhTien;
        } else {
          item[key] = value;
        }
      }
      return item;
    });

    setState({ [key]: value, data: formattedData });
    updateListServices(
      formattedData.filter((x) => selectedRowKeys.includes(x.key))
    );
  };

  return (
    <div className="receipt">
      {/* <div className="item-row text-bold">{t("thuNgan.phanTramMienGiam")}</div> */}
      <div className="item-row">
        <div className="title text-bold">
          {t("thuNgan.dienPhanTramMienGiamApDung")}:
        </div>{" "}
        <div className="num">
          <InputNumberFormat
            style={{ width: "240px" }}
            placeholder={t("thuNgan.nhapSoPhanTram")}
            onChange={onChangeInput("phanTramMienGiamDichVu")}
            disabled={
              thongTinPhieuThu.thanhToan || state?.tienMienGiamDichVu > 0
            }
            max={100}
            value={state?.phanTramMienGiamDichVu}
          />
          %
        </div>
      </div>
      {t("common.hoac")}
      <div className="item-row">
        <div className="title text-bold">
          {t("thuNgan.dienSoTienMienGiam")}:
        </div>
        <div className="num">
          <InputNumberFormat
            style={{ width: "240px" }}
            placeholder={t("thuNgan.nhapSoTien")}
            onChange={onChangeInput("tienMienGiamDichVu")}
            disabled={
              thongTinPhieuThu.thanhToan || state?.phanTramMienGiamDichVu > 0
            }
            value={state?.tienMienGiamDichVu}
          />
        </div>
      </div>
      <div className="item-row">
        <div className="title text-bold">
          {t("thuNgan.quanLyTamUng.ghiChu")}:
        </div>{" "}
        <div className="num">
          <Input
            width="240px"
            placeholder={t("thuNgan.nhapNoiDungGhiChu")}
            onChange={(e) => {
              onUpdateReceipt("ghiChu", e?.target?.value);
            }}
            value={ghiChu}
          />
        </div>
      </div>
      <span className="text-bold subtitle">
        {t("thuNgan.chonDichVuDeApDungMienGiam")}
      </span>
      <div className="miengiam-noidung">
        <div className="title-2 text-bolder">
          {t("common.daChon")} {state.selectedRowKeys.length}{" "}
          {t("common.dichVu")}
        </div>
        <TableWrapper
          columns={columns}
          dataSource={state.data}
          rowSelection={rowSelection}
          style={{
            marginTop: 0,
          }}
          scroll={{
            y: 200,
          }}
        />
      </div>
    </div>
  );
};

export default DiscountOnService;
