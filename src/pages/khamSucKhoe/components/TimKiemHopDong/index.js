import React, { useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseSearch } from "components";
import { useTranslation } from "react-i18next";

const TimKiemHopDong = ({ layerId, ...props }) => {
  const { t } = useTranslation();

  const refCreate = useRef();
  const refFocusTenNb = useRef();

  const { listTrangThaiHopDong = [] } = useSelector((state) => state.utils);

  const {
    phimTat: { onRegisterHotkey },
    hopDongKSK: { searchHopDongByParams, clearData },
    utils: { getUtils },
  } = useDispatch();

  const listTrangThaiHopDongMemo = useMemo(() => {
    return [
      { id: [20, 40, 50], ten: "Tất cả" },
      ...listTrangThaiHopDong.filter((x) => [20, 40, 50].includes(x.id)),
    ];
  }, [listTrangThaiHopDong]);

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refCreate.current && refCreate.current.click();
          },
        },
        {
          keyCode: 117, //F6
          onEvent: () => {
            refFocusTenNb.current && refFocusTenNb.current.focus();
          },
        },
      ],
    });

    getUtils({ name: "TrangThaiHopDong" });

    return () => {
      clearData();
    };
  }, []);

  return (
    <BaseSearch
      dataInput={[
        {
          widthInput: "232px",
          placeholder: "Tìm mã thanh toán HĐ",
          keyValueInput: "ma",
          functionChangeInput: searchHopDongByParams,
        },
        {
          widthInput: "232px",
          placeholder: "Tìm tên công ty",
          keyValueInput: "tenDoiTac",
          functionChangeInput: searchHopDongByParams,
        },
        {
          widthInput: "232px",
          placeholder: "Tìm tên hợp đồng",
          keyValueInput: "ten",
          functionChangeInput: searchHopDongByParams,
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcSearchData: searchHopDongByParams,
        data: [
          {
            widthInput: "212px",
            placeholder: "Trạng thái hợp đồng",
            key: "dsTrangThai",
            functionChangeInput: searchHopDongByParams,
            type: "select",
            dataSelect: listTrangThaiHopDongMemo,
          },
          {
            key: ["tuNgayHieuLuc", "denNgayHieuLuc"],
            widthInput: "212px",
            type: "dateRange",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            title: "Ngày hiệu lực hợp đồng",
          },
        ],
      }}
    />
  );
};

export default TimKiemHopDong;
