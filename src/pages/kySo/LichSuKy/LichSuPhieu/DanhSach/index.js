import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useDispatch } from "react-redux";
import moment from "moment";
import ModalLichSuKy from "../ModalLichSuKy";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";

const DanhSach = ({ ...props }) => {
  const refModalLichSuKy = useRef(null);

  const { listData } = useStore("lichSuKyLichSuPhieu", []);
  const { dataSortColumn } = useStore("lichSuKyLichSuPhieu", {});
  const { totalElements, page, size } = useStore("lichSuKyLichSuPhieu", null);
  const { t } = useTranslation();

  const {
    lichSuKyLichSuPhieu: { onSortChange, getList, onSizeChange },
    utils: { getUtils },
  } = useDispatch();

  useEffect(() => {
    getUtils({ name: "trangThaiKy" });
    onSizeChange({
      nbDotDieuTriId: props?.match?.params?.id,
      soPhieu: props?.match?.params?.lichSuPhieuId,
    });
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
        refModalLichSuKy.current.show({
          fileLink: record?.fileSauKy || record?.fileTruocKy,
          item: record,
        });
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
          title={t("kySo.nguoiKy")}
          sort_key="tenNguoiKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNguoiKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNguoiKy",
      key: "tenNguoiKy",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.loaiChuKy")}
          sort_key="loaiKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["loaiKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "loaiKy",
      key: "loaiKy",
      render: (item) => {
        return item === 0 ? "Ký số" : "Ký điện tử";
      },
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
      width: "50px",
      dataIndex: "thoiGianKy",
      key: "thoiGianKy",
      render: (item) => {
        return item && moment(item)?.format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.thoiGianNhan")}
          sort_key="thoiGianTrinhKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianTrinhKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "thoiGianTrinhKy",
      key: "thoiGianTrinhKy",
      align: "left",
      render: (item) => {
        return item && moment(item)?.format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.moTa")}
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["moTa"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: <HeaderSearch title={t("kySo.xemPhieu")} />,
      width: "30px",
      dataIndex: "",
      key: "",
      align: "center",
      render: (item) => {
        return (
          <img
            src={require("assets/images/utils/eye.png")}
            alt=""
            onClick={() => {
              refModalLichSuKy.current.show({
                fileLink: item?.fileSauKy || item?.fileTruocKy,
                item: item,
              });
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
      <ModalLichSuKy ref={refModalLichSuKy} />
    </Main>
  );
};
export default DanhSach;
