import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import cloneDeep from "lodash/cloneDeep";
import { HeaderSearch, TableWrapper, InputTimeout } from "components";
import { formatDecimal, normalizeNumber, parseFloatNumber } from "utils";
import { useTranslation } from "react-i18next";
import { InputNumberFormat } from "components/common";
import { Main } from "./styled";

const DiscountOnService = ({ listAllServices, updateListServices }) => {
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

  const onSearchInput = (value) => {
    const searchValue = value;
    const valueText = searchValue?.trim().toLowerCase().unsignText();
    const dataSearch = !!valueText
      ? state.data?.filter(
          (option) =>
            option?.tenDichVu?.toLowerCase().unsignText().indexOf(valueText) >=
            0
        )
      : listAllServices;
    const { phanTramMienGiam, tienMienGiam } = state;
    dataSearch.map((item) => {
      item.phanTramMienGiam = phanTramMienGiam;
      item.tienMienGiam =
        item.thanhTien < tienMienGiam ? item.thanhTien : tienMienGiam;
      return item;
    });
    setState({ data: dataSearch });
    updateListServices(dataSearch);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} className="text-center" />,
      width: "30px",
      dataIndex: "",
      key: "",
      align: "right",
      render: (item, data, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch title={t("common.thanhTien")} className="text-center" />
      ),
      width: "60px",
      dataIndex: "tongTien",
      key: "tongTien",
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          search={
            <InputTimeout
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
      dataIndex: "phanTramMienGiam",
      key: "phanTramMienGiam",
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
      dataIndex: "tienMienGiam",
      key: "tienMienGiam",
      align: "right",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
  ];
  const onSelectChange = (selectedRowKeys) => {
    const { data, phanTramMienGiam, tienMienGiam } = state;
    const formattedData = data
      .map((item) => {
        if (selectedRowKeys.includes(item.key)) {
          item.phanTramMienGiam = phanTramMienGiam;
          item.tienMienGiam =
            item.thanhTien < tienMienGiam ? item.thanhTien : tienMienGiam;
          return item;
        }
        return null;
      })
      .filter((item1) => item1);
    setState({ selectedRowKeys });
    updateListServices(formattedData);
  };

  const onSelectAll = (e) => {
    const { data, phanTramMienGiam, tienMienGiam } = state;
    const formattedData = data.map((item) => {
      if (e.target.checked) {
        item.phanTramMienGiam = phanTramMienGiam;
        item.tienMienGiam =
          item.thanhTien < tienMienGiam ? item.thanhTien : tienMienGiam;
        return item;
      }
      item.phanTramMienGiam = null;
      item.tienMienGiam = null;
      return null;
    });
    setState({
      selectedRowKeys: e.target?.checked ? data.map((item) => item.key) : [],
    });
    updateListServices(formattedData);
  };

  const rowSelection = {
    columnTitle: <HeaderSearch title={<Checkbox onChange={onSelectAll} />} />,
    columnWidth: 20,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const onChangeInput = (key) => (e) => {
    let value = e?.target.value && parseFloatNumber(e.target.value);
    const { data, selectedRowKeys } = state;
    const formattedData = data.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        if (key === "tienMienGiam" && item.thanhTien < value) {
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
    <Main className="receipt">
      {/* <div className="item-row text-bold">{t("thuNgan.phanTramMienGiam")}</div> */}
      <div className="item-row">
        <div className="title text-bold">
          {t("thuNgan.dienPhanTramMienGiamApDung")}:
        </div>{" "}
        <div className="num">
          <InputNumberFormat
            style={{ width: "240px" }}
            placeholder={t("thuNgan.nhapSoPhanTram")}
            onChange={onChangeInput("phanTramMienGiam")}
            disabled={state?.tienMienGiam > 0}
            max={100}
            value={state?.phanTramMienGiam}
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
            onChange={onChangeInput("tienMienGiam")}
            disabled={state?.phanTramMienGiam > 0}
            value={state?.tienMienGiam}
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
          dataSource={state?.data}
          rowSelection={rowSelection}
          style={{
            marginTop: 0,
          }}
          scroll={{
            y: 200,
          }}
        />
      </div>
    </Main>
  );
};

export default DiscountOnService;
