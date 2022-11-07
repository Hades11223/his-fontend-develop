import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Input, Checkbox, Popover } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import MainTable from "pages/chanDoanHinhAnh/components/TableCDHA";
import { TRANG_THAI_CDHA } from "constants/index";
import IconDropDown from "assets/images/xetNghiem/icDropDown.png";
import { PaginationStyle } from "./styled.js";
import { useTranslation } from "react-i18next";

let timer = null;

function DanhSachBN({ layerId }) {
  const { t } = useTranslation();
  const refMaHoSo = useRef(null);
  const {
    listData,
    totalElements,
    page,
    size,
    dataSortColumn,
    dsNhomDichVuCap2Id,
    dsKhoaThucHienId,
    dsPhongThucHienId,
  } = useSelector((state) => state.dsBenhNhan);
  const { nbDotDieuTriId } = useSelector((state) => state.choTiepDonDV);

  const {
    dsBenhNhan: { onSizeChange, onChangeInputSearch, onSortChange, onSearch },
    choTiepDonDV: {
      updateData: updateDataChoTiepDon,
      onChangeInputSearch: onChangeInputSearchDv,
    },
    phimTat: { onRegisterHotkey },
  } = useDispatch();
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 113, //F2
          onEvent: () => {
            refMaHoSo.current && refMaHoSo.current.focus();
          },
        },
      ],
    });
  }, []);

  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  const [state, _setState] = useState({ value: [], data: [] });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const content = () => (
    <Checkbox.Group
      // options={TRANG_THAI_CDHA.map((i) => ({
      //   ...i,
      //   label: i.i18Key ? t(i.i18Key) : i.label,
      // }))}
      defaultValue={[25]}
      onChange={onSearchInput("dsTrangThai")}
    />
  );
  useEffect(() => {
    onSizeChange(10);
  }, []);

  useEffect(() => {
    onSearch({ dsNhomDichVuCap2Id, dsKhoaThucHienId, dsPhongThucHienId });
  }, [dsNhomDichVuCap2Id, dsKhoaThucHienId, dsPhongThucHienId]);

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    if (key === "dsTrangThai") {
      if (!value.length) {
        value = paramCheck
          ? TRANG_THAI_CDHA.reduce((arr, cur) => [...arr, cur.value], [])
          : 15;
      }
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);

    if (key === "dsTrangThai") {
      if (nbDotDieuTriId) {
        onChangeInputSearchDv({ dsTrangThai: value }, paramCheck);
      } else {
        updateDataChoTiepDon({ dsTrangThai: value });
      }
    }
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const renderHeaderRight = () => {
    if (paramCheck) {
      return (
        <Popover content={content} placement="bottomRight">
          <img src={IconDropDown} alt="IconDropDown" />
        </Popover>
      );
    }
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

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
          dataSort={dataSortColumn["maHoSo"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              ref={refMaHoSo}
              placeholder={t("common.nhapMaHoSo")}
              onChange={onSearchInput("maHoSo")}
            />
          }
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
          dataSort={dataSortColumn["tenNb"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.nhapTenNb")}
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
  ];

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        updateDataChoTiepDon({
          nbDotDieuTriId: id,
        });
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    idDiff = nbDotDieuTriId;
    return record.id === idDiff ? "row-actived" : "";
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  return (
    <MainTable
      contentHeaderLeft={t("common.danhSachNb")}
      contentHeaderRight={renderHeaderRight()}
      styleMargin={"20px auto"}
    >
      <TableWrapper
        columns={columns}
        dataSource={listData}
        onRow={onRow}
        rowKey={(record) => `${record.id}-${record.tenNb}`}
        rowClassName={setRowClassName}
        scroll={{ x: 300 }}
      />

      <PaginationStyle>
        {!!totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listData}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            stylePagination={{ flex: 1, justifyContent: "flex-start" }}
          />
        ) : null}
      </PaginationStyle>
    </MainTable>
  );
}

export default DanhSachBN;
