import React, { useState, useEffect } from "react";
import { Checkbox, Input } from "antd";
import { useSelector } from "react-redux";
import { ContentTranfer } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useTranslation } from "react-i18next";

function ModalContent(props) {
  const { t } = useTranslation();

  const { updateListServices } = props;

  const {
    danhSachDichVu: { listAllService },
    thuNgan: { thongTinPhieuThu },
  } = useSelector((state) => state);
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  useEffect(() => {
    setState({
      data: listAllService,
    });
  }, [listAllService]);
  const onSearchInput = (value) => {
    let valueText = value?.trim().toLowerCase().unsignText();
    let dataSearch = state.data?.filter(
      (option) =>
        option?.tenDichVu?.toLowerCase().unsignText().indexOf(valueText) >= 0
    );
    if (valueText) {
      setState({ data: dataSearch || [] });
    } else {
      setState({ data: listAllService });
    }
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
      render: (item) => item?.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          search={
            <Input
              placeholder={t("thuNgan.timTenDichVu")}
              onChange={(e) => onSearchInput(e.target.value)}
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
  ];

  const onSelectChange = (selectedRowKeys) => {
    const listIndex = listAllService.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    setState({ selectedRowKeys });
    updateListServices(listIndex);
  };
  const onSelectAll = (e) => {
    const { data } = state;
    let res = e.target?.checked ? data : [];
    setState({
      selectedRowKeys: e.target?.checked ? data.map((item) => item.key) : [],
    });
    updateListServices(res);
  };
  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={onSelectAll}
            disabled={thongTinPhieuThu?.thanhToan}
          >
            {t("common.tatCa")}
          </Checkbox>
        }
      />
    ),
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    getCheckboxProps: () => ({
      disabled: thongTinPhieuThu?.thanhToan,
    }),
  };
  let hasSelected = state.selectedRowKeys?.length > 0;
  return (
    <ContentTranfer>
      <div className="title">
        {t("common.daChon")}{" "}
        {(hasSelected && state.selectedRowKeys?.length) || 0}{" "}
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
          y: 100,
        }}
      />
    </ContentTranfer>
  );
}

export default ModalContent;
