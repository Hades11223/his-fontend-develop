import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import {  useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";

const DanhSach = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation();

  const { listData } = useStore("lichSuKyDanhSachPhieu", []);
  const { totalElements, page, size } = useStore("lichSuKyDanhSachPhieu", null);
  const { dataSortColumn } = useStore("lichSuKyDanhSachPhieu", {});
  const [listtrangThaiKy] = useEnum(ENUM.TRANG_THAI_KY);
  const {
    lichSuKyDanhSachPhieu: { getList, onSizeChange, onSortChange },
  } = useDispatch();

  useEffect(() => {
    onSizeChange({ nbDotDieuTriId: id });
  }, []);
  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const onChangePage = (page) => {
    getList({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id, soPhieu } = record;
        history.push(
          `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${id}/lich-su-phieu/${soPhieu}`
        );
      },
    };
  };

  const setRowClassName = (record) => {
    return "";
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "15px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.maPhieu")}
          sort_key="maBaoCao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maBaoCao"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "maBaoCao",
      key: "maBaoCao",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.tenPhieu")}
          sort_key="tenBaoCao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenBaoCao"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenBaoCao",
      key: "tenBaoCao",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.soPhieuKy")}
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.nguoiKy")}
          sort_key="tenNguoiKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNguoiKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNguoiKy",
      key: "tenNguoiKy",
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.thoiGianKy")}
          sort_key="thoiGianKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "thoiGianKy",
      key: "thoiGianKy",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY hh:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.trangThaiPhieu")}
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["trangThai"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return item && listtrangThaiKy?.find((obj) => obj.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("kySo.lichSuKy")} />,
      width: "30px",
      align: "center",
      render: (item) => {
        return (
          <img
            src={require("assets/images/utils/time-blue.png")}
            alt=""
            onClick={() => {
              history.push(
                `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${id}/lich-su-phieu/${item.soPhieu}`
              );
            }}
          />
        );
      },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listData}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          rowClassName={setRowClassName}
        />
        <Pagination
          listData={listData}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};
export default DanhSach;
