import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputNumber, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Main } from "./styled";
import IcDelete from "assets/images/kho/delete.png";
import moment from "moment";
import { formatNumber } from "utils";
import TableEmpty from "pages/kho/components/TableEmpty";
import PopoverHangHoa from "../PopoverHangHoa";
import { useTranslation } from "react-i18next";
const DanhSachHangHoa = ({ onFocusSearchHangHoa, isEdit, ...props }, ref) => {
  const {
    phieuNhapXuat: { thongTinPhieu, dsNhapXuatChiTiet },
  } = useSelector((state) => state);
  const {
    phieuNhapXuat: { updateData, onRemoveItem },
  } = useDispatch();
  const { t } = useTranslation();
  const [state, _setState] = useState({ validateSoLuong: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    getData: () => {
      return state?.validateSoLuong;
    },
  }));
  const onChange = (type, item, index) => (e) => {
    if (
      isEdit &&
      thongTinPhieu?.trangThai &&
      ![10, 15].includes(thongTinPhieu?.trangThai)
    )
      return;
    const value = e?.target ? e?.target.value : e;
    let ds = dsNhapXuatChiTiet || [];
    const newItem = { ...ds[index], [type]: value };
    if (type === "soLuongSoCapYeuCau") {
      newItem.soLuongSoCap = value;
      if (item?.soLuongSoCapKhaDungConHsd < value) {
        setState({ validateSoLuong: true });
      } else {
        setState({ validateSoLuong: false });
      }
    }
    ds[index] = newItem;
    updateData({ dsNhapXuatChiTiet: [...ds] });
  };

  const onDelete = (item, index) => (e) => {
    if (item?.id) {
      onRemoveItem({ item });
    } else {
      updateData({
        dsNhapXuatChiTiet: dsNhapXuatChiTiet.filter((x) => x !== item),
      });
    }
  };
  return (
    <Main className="main">
      <TableWrapper
        scroll={{ y: 453 }}
        rowKey={"key"}
        columns={[
          {
            title: <HeaderSearch title={t("common.stt")} />,
            width: 64,
            dataIndex: "index",
            key: "index",
            hideSearch: true,
            align: "center",
          },
          {
            title: <HeaderSearch title={t("kho.tenHangHoa")} />,
            width: 230,
            dataIndex: "ten",
            key: "ten",
            type: true,
            hideSearch: true,
            render: (value, item, index) => {
              return (
                <>
                  <PopoverHangHoa item={item}>
                    <span
                      className=""
                      style={{
                        color: "#0762F7",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      {item?.ma} - {item?.ten}
                    </span>
                  </PopoverHangHoa>

                  {isEdit ? (
                    <Input
                      placeholder={t("kho.nhapGhiChu")}
                      className="note-input"
                      value={item?.ghiChu}
                      onChange={onChange("ghiChu", item, index)}
                    />
                  ) : (
                    <div>{item?.ghiChu}</div>
                  )}
                </>
              );
            },
          },
          {
            title: <HeaderSearch title={t("kho.hamLuong")} />,
            width: 150,
            dataIndex: "hamLuong",
            key: "hamLuong",
            hideSearch: true,
            align: "right",
          },
          {
            title: <HeaderSearch title={t("kho.slDuTru")} />,
            key: "soLuongSoCapYeuCau",
            width: 83,
            dataIndex: "soLuongSoCapYeuCau",
            hideSearch: true,
            align: "right",
            render: (value, item, index) => {
              return (
                <>
                  {isEdit || [10, 15].includes(thongTinPhieu?.trangThai) ? (
                    <InputNumber
                      value={item?.soLuongSoCapYeuCau}
                      onChange={(e) => {
                        const value =
                          !isNaN(parseFloat(e)) && parseFloat(e) > 0
                            ? parseFloat(e) % 1.0 === 0.0
                              ? parseInt(e)
                              : parseFloat(e)
                            : 0;
                        onChange("soLuongSoCapYeuCau", item, index)(value);
                      }}
                    />
                  ) : (
                    (value && formatNumber(value)) || ""
                  )}
                  {state?.validateSoLuong && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {t("kho.soLuongVuotQuaTonKhaDung")}
                    </p>
                  )}
                </>
              );
            },
          },
          {
            title: <HeaderSearch title={t("kho.slDuyet")} />,
            key: "soLuongSoCap",
            width: 83,
            dataIndex: "soLuongSoCap",
            hideSearch: true,
            align: "right",
            render: (field, item, index) =>
              field === 0 ? field : formatNumber(field),
          },
          {
            title: <HeaderSearch title={t("kho.soLo")} />,
            width: 150,
            dataIndex: "soLo",
            key: "soLo",
            hideSearch: true,
            align: "right",
            hidden: isEdit || thongTinPhieu?.trangThai !== 30,
          },
          {
            title: <HeaderSearch title={t("kho.hanSuDung")} />,
            width: 150,
            dataIndex: "hanSuDung",
            key: "hanSuDung",
            hideSearch: true,
            align: "right",
            hidden: isEdit || thongTinPhieu?.trangThai !== 30,
            render: (value, _, __) => moment(value)?.format("DD/MM/YYYY"),
          },
          {
            title: <HeaderSearch title={t("kho.tienIch")} />,
            key: "",
            width: 83,
            dataIndex: "",
            hideSearch: true,
            hidden: !isEdit,
            align: "right",
            render: (_, item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src={IcDelete}
                    onClick={onDelete(item, index)}
                    alt="..."
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={dsNhapXuatChiTiet || []}
        locale={{
          emptyText: (
            <TableEmpty
              onClickButton={onFocusSearchHangHoa}
              showButton={isEdit}
            />
          ),
        }}
      />
    </Main>
  );
};

export default memo(forwardRef(DanhSachHangHoa));
