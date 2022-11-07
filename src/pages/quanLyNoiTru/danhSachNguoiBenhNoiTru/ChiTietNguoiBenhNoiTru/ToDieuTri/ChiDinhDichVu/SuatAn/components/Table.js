import React, { useState, useRef, useEffect } from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { MainTable } from "../styled";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { useDispatch } from "react-redux";
import { Checkbox, Dropdown, Menu, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import ChinhSuaSuatAn from "pages/chiDinhDichVu/DichVuSuatAn/ChinhSuaSuatAn";
import { refConfirm } from "app";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import icHoanDv from "assets/images/khamBenh/icHoanDv.png";
import IcHuyHoan from "assets/images/xetNghiem/icHuyHoan.png";

function Table(props) {
  const {
    chiDinhSuatAn: { xoaSuatAn, getDsSuatAn, traSuatAn, huyTraSuatAn },
  } = useDispatch();
  const [state, _setState] = useState({
    dataVatTu: [],
  });
  const { listDvSuatAn, nbDotDieuTriId, chiDinhTuDichVuId } = props;
  const { t } = useTranslation();
  const [listTrangThai] = useEnum(ENUM.TRANG_THAI_PHIEU_LINH_SUAT_AN);
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refSuaThongTin = useRef(null);
  useEffect(() => {
    if (listDvSuatAn.length) {
      setState({ dataVatTu: listDvSuatAn });
    }
  }, [listDvSuatAn]);
  const onDelete = (record) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `Bạn có chắc chắn muốn xóa dịch vụ ${record.tenDichVu}`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          xoaSuatAn(record.id).then((s) =>
            getDsSuatAn({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 210,
            })
          );
        }
      );
  };

  const onTraSuatAn = (record, traDotXuat) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: !traDotXuat
            ? t("quanLyNoiTru.suatAn.traSuatAn")
            : t("quanLyNoiTru.suatAn.traDotXuat"),
          content: `Bạn có chắc chắn muốn trả suất ăn ${record.tenDichVu}`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          traSuatAn([{ id: record.id, traDotXuat }]).then((s) =>
            getDsSuatAn({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 210,
            })
          );
        }
      );
  };

  const onHuyTraSuatAn = (record) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Hủy trả suất ăn",
          content: `Bạn có chắc chắn muốn hủy trả suất ăn ${record.tenDichVu}`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          huyTraSuatAn([{ id: record.id }]).then((s) =>
            getDsSuatAn({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 210,
            })
          );
        }
      );
  };

  const onEdit = (record) => () => {
    refSuaThongTin.current && refSuaThongTin.current.show(record);
  };

  const menu = (record) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <span onClick={onTraSuatAn(record, false)}>
              {t("quanLyNoiTru.suatAn.traSuatAn")}
            </span>
          ),
        },
        {
          key: "2",
          label: (
            <span onClick={onTraSuatAn(record, true)}>
              {t("quanLyNoiTru.suatAn.traDotXuat")}
            </span>
          ),
        },
      ]}
    />
  );

  const columns = [
    {
      title: <HeaderSearch title="STT" sort_key="index" />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, row, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title={"Tên dịch vụ"} sort_key="tenDichVu" />,
      width: 400,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },
    {
      title: <HeaderSearch title={"Loại bữa ăn"} sort_key="loaiBuaAn" />,
      width: 100,
      dataIndex: "tenLoaiBuaAn",
      key: "tenLoaiBuaAn",
    },
    {
      title: <HeaderSearch title={"SL"} sort_key="soLuongYeuCau" />,
      width: 90,
      dataIndex: "soLuongYeuCau",
      key: "soLuongYeuCau",
      align: "center",
    },
    {
      title: <HeaderSearch title={"ĐVT"} sort_key="dvt" />,
      width: 90,
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      align: "center",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title={"Đột xuất"} />,
      width: 90,
      dataIndex: "dotXuat",
      key: "dotXuat",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: <HeaderSearch title="Trạng thái" sort_key="trangThai" />,
      width: 90,
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item, list) => {
        return listTrangThai.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={"Tiện ích"} />,
      width: 110,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (item, record, index) => {
        const { phieuTraId, trangThai } = record || {};
        return (
          <div className="action-btn">
            <Tooltip
              title={t("quanLyNoiTru.thongTinChiTiet")}
              placement="bottom"
            >
              <img
                style={{ objectFit: "contain" }}
                src={IconEdit}
                alt="..."
                onClick={onEdit(record)}
              />
            </Tooltip>
            <Tooltip title={t("quanLyNoiTru.suatAn.xoaDv")} placement="bottom">
              <img
                style={{ objectFit: "contain" }}
                src={IconDelete}
                alt="..."
                onClick={() => onDelete(record)}
              />
            </Tooltip>

            {[20].includes(trangThai) && !phieuTraId && (
              <Dropdown overlay={menu(record)} placement="bottom">
                <img src={icHoanDv} alt="..."></img>
              </Dropdown>
            )}

            {[30].includes(trangThai) && !phieuTraId && (
              <Tooltip title={"Hủy trả suất ăn"} placement="bottom">
                <img
                  style={{ objectFit: "contain", height: 20, marginBottom: -2 }}
                  src={IcHuyHoan}
                  alt="..."
                  onClick={onHuyTraSuatAn(record)}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <MainTable>
      <TableWrapper
        columns={columns}
        dataSource={state?.dataVatTu}
        scroll={{ x: false, y: false }}
      />
      <ChinhSuaSuatAn ref={refSuaThongTin} />
    </MainTable>
  );
}

export default React.memo(Table);
