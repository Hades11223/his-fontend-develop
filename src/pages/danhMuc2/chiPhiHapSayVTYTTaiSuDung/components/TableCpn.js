import { HeaderSearch, InputTimeout, TableWrapper } from "components";
import React, { useEffect, useRef, useState } from "react";
import { Col, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";

import stringUtils from "mainam-react-native-string-utils";

const { Column } = TableWrapper;

const TableCpn = ({ iconExpandMinimize }) => {
  const { t } = useTranslation();
  const { listData, page, size, dataSort } = useSelector(
    (state) => state.chiPhiHapSayVTYT
  );

  const {
    chiPhiHapSayVTYT: { updateStore, getRecord, onSearchInput, onSortColumn },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const [state, _setState] = useState({
    currentItem: {},
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  // const handleClickedBtnAdded = () => {
  //   setState({ editStatus: false });
  //   // updateData({
  //   //   currentItem: {
  //   //     tachSoLuong: true,
  //   //   },
  //   // });
  // };

  const refSelectRow = useRef((index) => {
    const indexNextItem =
      (listData?.findIndex((item) => item.id === state.currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      onHandleChangeRow(listData[indexNextItem]);
      setState({ currentItem: listData[indexNextItem] });
      updateStore({ currentItem: listData[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + listData[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  });

  const refLayerHotKey = useRef(stringUtils.guid());

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });

    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
      updateStore({ currentItem: {} });
    };
  }, []);

  useEffect(() => {
    getRecord();
  }, []);

  const onHandleChangeRow = (data = {}) => {
    setState({ currentItem: data });
    updateStore({
      currentItem: data,
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => onHandleChangeRow(record),
    };
  };

  const onClickSort = (key, value) => {
    onSortColumn({
      [key]: value,
    });
  };

  const rowClassName = (record) =>
    record.dichVuId === state.currentItem?.dichVuId
      ? "row-actived row-id-" + record.dichVuId
      : "row-id-" + record.dichVuId;

  const columns = [
    // {
    //   title: <HeaderSearch title={t("common.stt")} />,
    //   width: 50,
    //   dataIndex: "key",
    //   align: "center",
    //   key: 1,

    // },
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "key",
      key: "1",
      align: "center",
      render: (idx) => page * size + Number(idx.slice(3)) + 1,
    }),
    Column({
      title: t("danhMuc.maVatTu"),
      // i18Name: "danhMuc.maVatTu",
      width: "150px",
      dataIndex: "ma",
      key: "ma",
      sort_key: "ma",
      dataSort: dataSort["ma"] || "",
      onClickSort: onClickSort,
      renderSearch: (
        <InputTimeout
          placeholder={t("danhMuc.timMaVatTu")}
          onChange={(e) => {
            onSearchInput({ ma: e });
          }}
        />
      ),
    }),
    Column({
      title: t("danhMuc.tenVatTu"),
      // i18Name: "danhMuc.tenVatTu",
      width: "150px",
      dataIndex: "ten",
      key: "ten",
      sort_key: "ten",
      dataSort: dataSort["ten"] || "",
      onClickSort: onClickSort,
      renderSearch: (
        <InputTimeout
          placeholder={t("danhMuc.timTenVatTu")}
          onChange={(e) => {
            onSearchInput({ ten: e });
          }}
        />
      ),
    }),
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.maGoiThau")}
          search={
            <Input
              placeholder={t("danhMuc.timMaGoiThau")}
              // onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "quyetDinhThauId",
      key: 4,
      // render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.tenGoiThau")}
          search={
            <Input
              placeholder={t("danhMuc.timTenGoiThau")}
              // onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "quyetDinhThau",
      key: 5,
      // render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.heSoDinhMuc")}
          search={
            <Input
              placeholder={t("danhMuc.timHeSoDinhMuc")}
              // onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "idHs",
      key: 6,
      // render: (item) => item?.ten,
    },
  ];

  return (
    <TableWrapper
      title={t("danhMuc.dmChiPhiHapSayVTYTTaiSuDung")}
      scroll={{ x: 1000 }}
      // setEditStatus={(val) => setState({ editStatus: val })}
      classNameRow={"custom-header"}
      columns={columns}
      dataSource={listData}
      onRow={onRow}
      rowClassName={rowClassName}
      buttonHeader={iconExpandMinimize}
    />
  );
};

export default TableCpn;
