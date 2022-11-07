import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Main } from "./styled";
import { HeaderSearch, Page, TableWrapper, Pagination } from "components";
import viewItem from "assets/svg/thuNgan/viewItem.svg";
import Icon from "@ant-design/icons";
import moment from "moment";
import HeaderSearchHoaDon from "./component/headerSearchHoaDon";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import ModalDsNguoiBenh from "./component/modalDsBenhNhan";
import { useRef } from "react";
import ModalXuatHoaDon from "../component/ModalXuatHoaDon";
import { checkRoleOr } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum } from "hook";
const DsHoaDonDienTu = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalDsNb = useRef(null);
  const refModalXuatHoaDon = useRef(null);
  const [listTrangThaiHoaDon] = useEnum(ENUM.TRANG_THAI_HOA_DON);
  const { totalElements, listData, page, size, dataSortColumn } = useSelector(
    (state) => state.dsHoaDonDienTu
  );
  const { onSizeChange, onSortChange, onSearch } = dispatch.dsHoaDonDienTu;
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const handleChangePage = (page) => {
    onSearch({ page: page - 1 });
  };
  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        setState({
          dataSelect: record,
        });
      },
    };
  };
  const handleRedirect = (item) => {
    const { nbDotDieuTriId, maHoSo, id } = item;
    history.push(
      `/thu-ngan/chi-tiet-hoa-don/${maHoSo}/${id}/${nbDotDieuTriId}`
    );
  };
  const setRowClassName = (record) => {
    let idDiff = state.dataSelect?.id;
    return record.id === idDiff ? "row-actived" : null;
  };
  useEffect(() => {
    onSizeChange({
      size: 10,
    });
  }, []);

  const handleShowModal = () => {
    if (refModalDsNb.current) {
      refModalXuatHoaDon.current.show(handleCachXuatHoaDon);
    }
  };
  const handleCachXuatHoaDon = (value) => {
    if (value == 1) {
      if (refModalDsNb.current) {
        refModalDsNb.current.show();
      }
    } else if (value == 2) {
      history.push("/thu-ngan/tao-hoa-don-nhieu-nguoi");
    } else {
    }
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 80,
      dataIndex: "index",
      key: "index",
      align: "center",
      fixed: "left",
      render: (text, item, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soHoaDon")}
          sort_key="soHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soHoaDon || 0}
        />
      ),
      width: 120,
      dataIndex: "soHoaDon",
      key: "soHoaDon",
      align: "left",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.kyHieuHoaDon")}
          sort_key="kyHieuHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.kyHieuHoaDon || 0}
        />
      ),
      width: 150,
      dataIndex: "kyHieuHoaDon",
      key: "kyHieuHoaDon",
      align: "left",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tongTienHoaDon")}
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tongTien || 0}
        />
      ),
      width: 200,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (text) => text.formatPrice() || "",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.thoiGianXuatHoaDon")}
          sort_key="thoiGianPhatHanhHd"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thoiGianXuatHoaDon || 0}
        />
      ),
      width: 200,
      dataIndex: "thoiGianPhatHanhHd",
      key: "thoiGianPhatHanhHd",
      align: "left",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.maHoSo || 0}
        />
      ),
      width: 120,
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          title={t("thuNgan.hoTenNguoiBenh")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tenNb || 0}
        />
      ),
      width: 250,
      dataIndex: "tenNb",
      key: "tenNb",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tenCongTy")}
          sort_key="tenCongTy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tenCongTy || 0}
        />
      ),
      width: 250,
      dataIndex: "tenCongTy",
      key: "tenCongTy",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          title={t("thuNgan.nguoiXuatHoaDon")}
          sort_key="tenNguoiPhatHanhHd"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tenNguoiXuatHoaDon || 0}
        />
      ),
      width: 200,
      dataIndex: "tenNguoiPhatHanhHd",
      key: "tenNguoiPhatHanhHd",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soHoaDonGoc")}
          sort_key="soHoaDonGoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soHoaDonGoc || 0}
        />
      ),
      width: 200,
      dataIndex: "soHoaDonGoc",
      key: "soHoaDonGoc",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.kyHieuHoaDonGoc")}
          sort_key="kyHieuHoaDonGoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.kyHieuHoaDonGoc || 0}
        />
      ),
      width: 200,
      dataIndex: "kyHieuHoaDonGoc",
      key: "kyHieuHoaDonGoc",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.trangThai")}
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.trangThai || 0}
        />
      ),
      width: 140,
      dataIndex: "trangThai",
      key: "trangThai",
      align: "left",
      fixed: "right",
      render: (text) =>
        listTrangThaiHoaDon
          ? listTrangThaiHoaDon.find((item) => item.id == text)?.ten
          : "",
    },
    {
      title: <HeaderSearch title={t("thuNgan.xemHoaDon")} sort_key="soPhieu" />,
      width: 150,
      dataIndex: "soHoaDon",
      key: "soHoaDon",
      align: "center",
      render: (text, item) => {
        return (
          <Tooltip title={t("thuNgan.xemHoaDon")} placement="bottom">
            <Icon
              component={viewItem}
              onClick={() => handleRedirect(item)}
            ></Icon>
          </Tooltip>
        );
      },
      fixed: "right",
    },
  ];
  return (
    <Page
      breadcrumb={[
        { title: t("thuNgan.thuNgan"), link: "/thu-ngan" },
        {
          title: t("thuNgan.hoaDonDienTu"),
          link: "/thu-ngan/ds-hoa-don-dien-tu",
        },
      ]}
    >
      <Main>
        <div className="header-title">
          <div className="title">{t("thuNgan.hoaDonDienTu")}</div>
          {checkRoleOr([
            ROLES["THU_NGAN"].THEM_HOA_DON_DIEN_TU,
            ROLES["THU_NGAN"].THEM_HOA_DON_DIEN_TU_NHIEU_NGUOI,
          ]) && (
            <Button className="btn-ok" onClick={handleShowModal}>
              <span> {t("common.themMoi")} </span>
              <img src={IcCreate} alt="..."></img>
            </Button>
          )}
        </div>
        <HeaderSearchHoaDon />
        <div className="wrapper">
          <TableWrapper
            columns={columnsGroup}
            dataSource={listData || []}
            onRow={onRow}
            scroll={{ x: 200 }}
            rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              listData={listData}
              onChange={handleChangePage}
              current={page + 1 || 1}
              pageSize={size || 10}
              total={totalElements || 15}
              onShowSizeChange={handleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </div>
        <ModalDsNguoiBenh ref={refModalDsNb}></ModalDsNguoiBenh>
        <ModalXuatHoaDon ref={refModalXuatHoaDon}></ModalXuatHoaDon>
      </Main>
    </Page>
  );
};

export default DsHoaDonDienTu;
