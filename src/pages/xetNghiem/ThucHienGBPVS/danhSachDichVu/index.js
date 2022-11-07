import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Input, message } from "antd";
import { Main, TableTitle } from "./styled";
import Select from "components/Select";
import { TRANG_THAI_FILTER } from "pages/xetNghiem/configs";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

let timer = null;

const DanhSachDichVu = ({ layerId }) => {
  const { t } = useTranslation();
  const refInputMaDv = useRef(null);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const {
    xnGiaiPhauBenhViSinh: { listServices, nbDotDieuTriId },
  } = useSelector((state) => state);
  const {
    xnGiaiPhauBenhViSinh: { getDsDichVuChiDinhXN, updateData },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    updateData({ dsTrangThai: [66] });
  }, []);

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refInputMaDv.current && refInputMaDv.current.focus();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (nbDotDieuTriId)
      getDsDichVuChiDinhXN({
        page: 0,
        size: 1000,
        nbDotDieuTriId,
        dataSortColumnDSDV: { maDichVu: 1 },
      }).then((s) => {
        if (s.length <= 0) {
          message.error(t("common.khongTonTaiDichVuNguoiBenh"));
        }
      });
  }, [nbDotDieuTriId]);

  const [dataSortColumn, setDataSortColumn] = useState({});
  const [dataSearch, setDataSearch] = useState({});

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };

    getDsDichVuChiDinhXN({
      page: 0,
      size: 1000,
      dataSortColumnDSDV: sort,
      dataSearchDSDV: dataSearch,
    });
    setDataSortColumn(sort);
  };
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const search = { ...dataSearch, [key]: value };
      getDsDichVuChiDinhXN({
        page: 0,
        size: 1000,
        dataSortColumnDSDV: dataSortColumn,
        dataSearchDSDV: search,
        nbDotDieuTriId,
      });
      setDataSearch(search);
    }, 300);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 50,
      dataIndex: "stt",
      key: "stt",
      render: (item, row, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.maDV")}
          sort_key="maDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maDichVu || 0}
          search={
            <Input
              ref={refInputMaDv}
              placeholder={t("xetNghiem.timMaDV")}
              onChange={onSearchInput("maDichVu")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "maDichVu",
      key: "maDichVu",
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.tenDV")}
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenDichVu || 0}
          search={
            <Input
              placeholder={t("xetNghiem.timTenDV")}
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.trangThai")}
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.trangThai || 0}
          searchSelect={
            <Select
              data={[
                { id: "", ten: t("common.tatCa") },
                ...listTrangThaiDichVu.filter((x) =>
                  TRANG_THAI_FILTER.includes(x.id)
                ),
              ]}
              defaultValue=""
              placeholder={t("common.chonTrangThai")}
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        const index = listTrangThaiDichVu.findIndex((tt) => tt.id === item);
        if (index === -1) return;

        return listTrangThaiDichVu[index].ten;
      },
    },
  ];

  const handleDoubleClick = (record) => (e) => {
    updateData({ infoDichVu: record });
  };

  const onRow = (record) => {
    return {
      onClick: handleDoubleClick(record),
    };
  };

  return (
    <Main>
      <TableTitle>{t("xetNghiem.danhSachDichVu")}</TableTitle>
      <TableWrapper onRow={onRow} columns={columns} dataSource={listServices} />
    </Main>
  );
};

export default DanhSachDichVu;
