import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Checkbox, Popover } from "antd";
import { TableWrapper, HeaderSearch, Pagination, Button } from "components";
import { TRANG_THAI_CDHA, TRANG_THAI_DICH_VU } from "constants/index";
import IcOption from "assets/svg/ic-option.svg";
import { Main, GlobalStyle } from "./styled";
import IcReload from "assets/svg/ic-reload.svg";
import { useInterval } from "hook";
import { useTranslation } from "react-i18next";
import ModalTiepNhanKSK from "../ModalTiepNhanKSK";

let timer = null;

const DanhSachBN = ({ layerId }) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refMaHoSo = useRef(null);
  const { listData, totalElements, page, size, dataSortColumn } = useSelector(
    (state) => state.dsBenhNhan
  );
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

  const content = () => (
    <Checkbox.Group
      options={TRANG_THAI_CDHA.map((i) => ({
        ...i,
        label: i.i18Key ? t(i.i18Key) : i.label,
      }))}
      defaultValue={[TRANG_THAI_DICH_VU.CHO_TIEP_NHAN]}
      onChange={onSearchInput("dsTrangThai")}
    />
  );

  useEffect(() => {
    onChangeInputSearch({
      size: 10,
      dsTrangThai: [
        TRANG_THAI_DICH_VU.CHO_TIEP_NHAN,
        TRANG_THAI_DICH_VU.DA_CHECKIN,
        TRANG_THAI_DICH_VU.CHUAN_BI_THUC_HIEN,
      ],
    });
  }, []);

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
      if (value.includes(25)) {
        value = [...value, 35, 43];
      }
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

  const handleOpenModalKSK = () => {
    refModal.current && refModal.current.show();
  };

  const renderHeaderRight = () => {
    return (
      <>
        <Button type="primary" onClick={handleOpenModalKSK}>
          Tiếp nhận nhiều NB KSK
        </Button>
        {paramCheck && (
          <Popover
            content={content}
            placement="bottomRight"
            overlayClassName="cdha-option-popover"
          >
            <IcOption className="ic-action" />
          </Popover>
        )}
      </>
    );
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
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
              placeholder={t("xetNghiem.nhapTenNguoiBenh")}
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

  const onReload = () => {
    onChangeInputSearch({});
  };

  // useInterval(() => {
  //   if (page !== 0) return;
  //   onChangeInputSearch({});
  // }, 7000);

  return (
    <>
      <Main
        title={
          <>
            {t("common.danhSachNb")}
            <IcReload onClick={() => onReload()} className="ic-action" />
          </>
        }
        headerRight={renderHeaderRight()}
      >
        <GlobalStyle />
        <TableWrapper
          columns={columns}
          dataSource={listData}
          onRow={onRow}
          rowKey={(record) => `${record.id}-${record.tenNb}`}
          rowClassName={setRowClassName}
          scroll={{ x: 300 }}
        />
        {!!totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listData}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
          />
        ) : null}
      </Main>
      <ModalTiepNhanKSK ref={refModal} />
    </>
  );
};

export default DanhSachBN;
