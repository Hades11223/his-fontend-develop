import React, { useEffect, useState, useRef } from "react";
import { Input, Checkbox, message } from "antd";
import cloneDeep from "lodash/cloneDeep";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { Select } from "components";
import { formatDecimal } from "utils";
import { MA_GIAM_GIA } from "../constants";
import { openInNewTab } from "utils";
import { useTranslation } from "react-i18next";
import moment from "moment";
import ModalChiTietGhiChu from "pages/thuNgan/chiTietPhieuThu/ModalTaoMienGiam/ModalChiTietGhiChu";
import { Main } from "./styled";
let timer = null;

const DiscountByVoucher = ({
  listVouchers,
  listAllServices,
  onUpdateVoucherServices,
  setDisabledButton,
}) => {
  const { t } = useTranslation();
  const refGhiChu = useRef(null);
  const [state, _setState] = useState({
    data: [],
    selectedRowKeys: [],
    dsMoTa: [],
    checkAll: false,
    indeterminate: false,
    showData: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState({ data: cloneDeep(listAllServices) });
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
      setState({ data: dataSearch });
      onUpdateVoucherServices(dataSearch);
    }, 300);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} className="text-center" />,
      width: "30px",
      dataIndex: "stt",
      key: "stt",
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
      align: "center",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    const { data, dsMaGiamGiaId, chonLaiDichVu } = state;
    setState({
      selectedRowKeys,
      checkAll:
        !!state.data.length && selectedRowKeys.length === state.data.length,
      indeterminate:
        !!state.data.length &&
        !!selectedRowKeys.length &&
        selectedRowKeys.length < state.data.length,
    });

    if (chonLaiDichVu && (!selectedRowKeys || selectedRowKeys.length === 0)) {
      message.warning(t("thuNgan.batBuocPhaiChonItNhatMotDichVu"));
      setDisabledButton(true);
    } else {
      onUpdateVoucherServices(dsMaGiamGiaId, data);
    }
  };

  const onSelectAll = (e) => {
    const { data } = state;
    setState({
      selectedRowKeys: e.target?.checked ? data.map((item) => item.key) : [],
      checkAll: !state.checkAll,
      indeterminate: false,
    });

    setDisabledButton(!e.target?.checked);
    if (!e.target?.checked) {
      message.warning(t("thuNgan.batBuocPhaiChonItNhatMotDichVu"));
    }
  };

  const onViewGhiChu = () => {
    refGhiChu.current && refGhiChu.current.show(state?.dsVoucher);
  };

  const onChangeVoucher = (value, options) => {
    setDisabledButton(false);
    let formattedData = [];
    let dsHinhThucGiamGia = [];
    let dsMaGiamGiaId = [];
    let dsMoTa = [];
    let dsChonLaiDichVu = [];
    (options || []).map((item) => {
      const voucher = item.lists;
      if (value.length && item.lists) {
        dsHinhThucGiamGia.push(voucher.hinhThucGiamGia);
        dsChonLaiDichVu.push(voucher.chonLaiDichVu);
        if (
          voucher.hinhThucGiamGia ===
          MA_GIAM_GIA.HINH_THUC_GIAM_GIA.THEO_DICH_VU
        ) {
          if (
            voucher.loaiApDungGiamGia ===
            MA_GIAM_GIA.LOAI_AP_DUNG_GIAM_GIA.THEO_DICH_VU
          ) {
            listAllServices
              .filter((item1) => {
                return voucher.dsDichVuId.indexOf(item1.dichVuId) !== -1;
              })
              .map((x) => formattedData.push(x));
          }
          if (
            voucher.loaiApDungGiamGia ===
            MA_GIAM_GIA.LOAI_AP_DUNG_GIAM_GIA.THEO_NHOM_DICH_VU
          ) {
            listAllServices
              .filter((item2) => {
                return (
                  voucher.dsNhomDichVuCap1Id.indexOf(item2.nhomDichVuCap1Id) !==
                  -1
                );
              })
              .map((x) => formattedData.push(x));
          }
        }
        dsMaGiamGiaId.push(voucher.id);
      }
      const { moTa, tuNgay, denNgay } = voucher;
      const _tuNgay = tuNgay
        ? `từ ngày ${moment(tuNgay).format("DD/MM/YYYY")}`
        : "";
      const _denNgay = denNgay
        ? `đến ngày ${moment(denNgay).format("DD/MM/YYYY")}`
        : "";
      dsMoTa.push(`${moTa || ""}, áp dụng ${_tuNgay} ${_denNgay}`);
    });
    setState({
      dsMoTa: dsMoTa,
      dsVoucher: options,
    });

    if (
      dsHinhThucGiamGia.includes(MA_GIAM_GIA.HINH_THUC_GIAM_GIA.THEO_DICH_VU)
    ) {
      setState({ showData: true });
    } else {
      setState({ showData: false });
    }
    setState({
      selectedRowKeys: formattedData.map((item) => item.key) || [],
      checkAll: formattedData && formattedData.length === state.data.length,
      indeterminate:
        !!state.data.length &&
        !!formattedData.length &&
        formattedData.length < state.data.length,
      chonLaiDichVu: dsChonLaiDichVu.includes(true) ? true : false,
      dsMaGiamGiaId: dsMaGiamGiaId,
    });
    onUpdateVoucherServices(dsMaGiamGiaId, formattedData);
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={onSelectAll}
            disabled={!state.chonLaiDichVu}
            checked={state.checkAll}
            indeterminate={state.indeterminate}
          />
        }
      />
    ),
    columnWidth: 20,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    getCheckboxProps: () => ({
      disabled: !state.chonLaiDichVu,
    }),
  };

  return (
    <Main className="receipt">
      <div
        onClick={() => openInNewTab("/danh-muc/chuong-trinh-giam-gia")}
        className="item-row-voucher text-bold pointer"
      >
        {t("thuNgan.voucherApDung")}
      </div>
      <div className="item-row-select">
        <Select
          style={{ width: "50%" }}
          data={listVouchers}
          placeholder={t("thuNgan.chonMaVoucherApDung")}
          onChange={onChangeVoucher}
          ten="maVoucher"
          mode="multiple"
        />
      </div>
      <div className="describe">
        {state?.dsMoTa.length > 2 ? (
          <div>
            {state?.dsMoTa.slice(0, 2).join("; ")}
            <br />{" "}
            <a href={() => false} onClick={onViewGhiChu}>
              Xem thêm
            </a>{" "}
          </div>
        ) : (
          state?.dsMoTa.join("; ")
        )}
      </div>
      {state.showData && (
        <>
          <span className="text-bold subtitle">
            {t("thuNgan.chonDichVuDeApDungVoucher")}
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
        </>
      )}
      <ModalChiTietGhiChu ref={refGhiChu} />
    </Main>
  );
};

export default DiscountByVoucher;
