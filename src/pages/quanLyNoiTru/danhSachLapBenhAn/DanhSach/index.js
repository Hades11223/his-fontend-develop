import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import { Pagination, HeaderSearch, TableWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IcEye from "assets/svg/ic-eye.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import {
  setQueryStringValue,
  setQueryStringValues,
  getAllQueryString,
} from "hook/useQueryString/queryString";
import { cloneDeep } from "lodash";

const DanhSach = (props) => {
  const { t } = useTranslation();
  const { dataSortColumn, listNbLapBenhAn, totalElements, page, size } =
    useSelector((state) => state.quanLyNoiTru);
  const {
    quanLyNoiTru: { onSizeChange, onSortChange, onSearch },
  } = useDispatch();
  const refSettings = useRef(null);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);

  useEffect(() => {
    const {
      page,
      size,
      dataSortColumn = "{}",
      ...queries
    } = getAllQueryString();
    if (queries.tuThoiGianKetLuan) {
      queries.tuThoiGianKetLuan = queries.tuThoiGianKetLuan
        .toDateObject()
        .format("yyyy-MM-dd 00:00:00");
    }
    if (queries.denThoiGianKetLuan) {
      queries.denThoiGianKetLuan = queries.denThoiGianKetLuan
        .toDateObject()
        .format("yyyy-MM-dd 23:59:59");
    }
    if (!queries.trangThai) {
      queries.trangThai = 10;
    }
    const sort = JSON.parse(dataSortColumn);
    onSizeChange({
      dataSearch: queries,
      dataSortColumn: sort,
      size: parseInt(size || 10),
      page: parseInt(page || 0),
    });
  }, []);
  const onChangePage = (page) => {
    setQueryStringValue("page", page - 1);
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    setQueryStringValues({ size: size, page: 0 });
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    let sort = cloneDeep(dataSortColumn);
    sort[key] = value;
    for (let key in sort) {
      if (!sort[key]) delete sort[key];
    }
    setQueryStringValues({ dataSortColumn: JSON.stringify(sort), page: 0 });
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: onOpenDetail(record),
    };
  };

  const onOpenDetail = (record) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    history.push("/quan-ly-noi-tru/chi-tiet-lap-benh-an/" + record.id);
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
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
          title={t("tiepDon.hoTenNguoiBenh")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
      // columnName: "Họ tên người bệnh",
      show: true,
      i18Name: "tiepDon.hoTenNguoiBenh",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "center",
      // columnName: "Mã hồ sơ",
      show: true,
      i18Name: "common.maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maBenhAn")}
          sort_key="maBenhAn"
          dataSort={dataSortColumn["maBenhAn"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      align: "center",
      // columnName: "Mã BA",
      i18Name: "common.maBenhAn",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.trangThaiNb")}
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "trangThai",
      key: "trangThai",
      // columnName: "Trạng thái NB",
      i18Name: "common.trangThaiNb",
      show: true,
      render: (item) => {
        return (listTrangThaiNb || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.khoaNhapVien")}
          sort_key="tenKhoaNhapVien"
          dataSort={dataSortColumn["tenKhoaNhapVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenKhoaNhapVien",
      key: "tenKhoaNhapVien",
      // columnName: "Khoa nhập viện",
      i18Name: "common.khoaNhapVien",
      show: true,
    },
    {
      title: <HeaderSearch title={t("cdha.chanDoanVaoVien")} />,
      width: "250px",
      dataIndex: "dsCdChinh",
      key: "dsCdChinh",
      // columnName: "Chẩn đoán vào viện",
      i18Name: "cdha.chanDoanVaoVien",
      show: true,
      render: (item) => {
        return (item || [])
          .map((item) => {
            return item.ma + " - " + item.ten;
          })
          .join(", ");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.bacSiChiDinh")}
          sort_key="tenBacSiKetLuan"
          dataSort={dataSortColumn["tenBacSiKetLuan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "120px",
      dataIndex: "tenBacSiKetLuan",
      key: "tenBacSiKetLuan",
      // columnName: "Bác sĩ chỉ định",
      i18Name: "xetNghiem.bacSiChiDinh",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNb")}
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "maNb",
      key: "maNb",
      align: "center",
      // columnName: "Mã NB",
      i18Name: "common.maNb",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.thoiGianNhapVien")}
          sort_key="thoiGianKetLuan"
          dataSort={dataSortColumn["thoiGianKetLuan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "110px",
      dataIndex: "thoiGianKetLuan",
      key: "thoiGianKetLuan",
      align: "center",
      // columnName: "Thời gian nhập viện",
      i18Name: "cdha.thoiGianNhapVien",
      show: true,
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm:ss") : "",
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.xemChiTiet")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "90px",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      render: (record) => {
        return <IcEye className="ic-action" onClick={onOpenDetail(record)} />;
      },
    },
  ];
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listNbLapBenhAn}
        onRow={onRow}
        rowKey={(record) => `${record.id} - ${record.index}`}
        scroll={{ x: 2000 }}
        tableName="table_QLNT_LapBenhAn"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listNbLapBenhAn}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

export default DanhSach;
