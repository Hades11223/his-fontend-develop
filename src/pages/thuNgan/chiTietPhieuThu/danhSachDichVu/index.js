import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Checkbox, Input } from "antd";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { PaginationWrapper, Main } from "./styled";
import { TRANG_THAI, isNumber, formatDecimal } from "./configs";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

let timer = null;
const DanhsachDichVu = ({ layerId }, ref) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);
  const { thongTinPhieuThu } = useSelector((state) => state.thuNgan);
  const { listData, totalElements, page, size, dataSortColumn } = useSelector(
    (state) => state.danhSachDichVu
  );
  const [listtrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);

  const {
    danhSachDichVu: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
    },
  } = useDispatch();
  const refTenDichVu = useRef(null);
  const [state, _setState] = useState({
    currentIndex: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    showTableSettings: () => {
      refSettings && refSettings.current.settings();
    },
  }));

  const { onRegisterHotkey } = useDispatch().phimTat;
  const { nbDotDieuTriId, phieuThuId } = useParams();
  useEffect(() => {
    onSizeChange({ size: 10, nbDotDieuTriId, phieuThuId });
  }, [nbDotDieuTriId, phieuThuId]);

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 9, //Tab
          onEvent: () => {
            refTenDichVu.current && refTenDichVu.current.focus();
          },
        },
        {
          keyCode: 38, //Mũi tên lên
          onEvent: () => {
            if (state.currentIndex > 0) {
              setState({
                currentIndex: state.currentIndex - 1,
              });
            }
          },
        },
        {
          keyCode: 40, //Mũi tên xuống
          onEvent: () => {
            if (state.currentIndex < listData.length - 1) {
              setState({
                currentIndex: state.currentIndex + 1,
              });
            }
          },
        },
        {
          keyCode: 13, //Enter
          onEvent: () => {
            const record = listData[state.currentIndex];
            if (record) {
              // onRow(record).onClick();
            }
          },
        },
      ],
    });
  }, [state.currentIndex, listData]);
  useEffect(() => {
    if (state.index > listData.length - 1) {
      setState({ currentIndex: 0 });
    }
  }, [listData]);
  const onClickSort = (key, value) => {
    if (key === "thanhTien" || key === "tienGiamGia") {
      key = `${key}${getKeyByLoaiPhieuThu()}`;
    }
    onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key, requiredNumber) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (requiredNumber && !isNumber(value) && value) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const getKeyByLoaiPhieuThu = () => {
    return thongTinPhieuThu.loaiPhieuThu === 1
      ? "KhongBh"
      : thongTinPhieuThu.loaiPhieuThu === 2
      ? "Bh"
      : "";
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "60px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },

    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDichVu"] || 0}
          search={
            <Input
              ref={refTenDichVu}
              placeholder={t("thuNgan.timTenDichVu")}
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
      i18Name: "common.tenDichVu",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soLuong")}
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuong"] || 0}
          search={
            <Input
              placeholder={t("thuNgan.nhapGiaNhoNhatCanTim")}
              onChange={onSearchInput("soLuong", true)}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
      i18Name: "common.soLuong",
      show: true,
    },

    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? t("thuNgan.thanhTienKhongBH")
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? t("thuNgan.thanhTienBH")
              : t("common.thanhTien")
          }
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || 0}
          search={
            <Input
              placeholder={t("thuNgan.timThanhTien")}
              onChange={onSearchInput("thanhTien", true)}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      i18Name: "common.thanhTien",
      show: true,
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.donViTinh")}
          sort_key="tenDonViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDonViTinh"] || 0}
          search={
            <Input
              placeholder={t("common.nhapDonViTinh")}
              onChange={onSearchInput("tenDonViTinh")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      align: "left",
      i18Name: "common.donViTinh",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tuTra")}
          sort_key="tuTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tuTra"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={TRANG_THAI.map((item) => {
                item.ten = t(item.ten);
                return item;
              })}
              placeholder={t("common.chon")}
              onChange={onSearchInput("tuTra")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      i18Name: "common.tuTra",
      show: true,
      render: (item, list, index) => (
        <Checkbox checked={item} onChange={() => {}} />
      ),
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.khongTinhTien")}
          sort_key="khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khongTinhTien"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={TRANG_THAI}
              placeholder={t("common.chon")}
              onChange={onSearchInput("khongTinhTien")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      i18Name: "thuNgan.khongTinhTien",
      show: true,
      render: (item, list, index) => (
        <Checkbox checked={item} onChange={() => {}} />
      ),
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.donGiaKhongBh")}
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaKhongBaoHiem"] || 0}
          search={
            <Input
              placeholder={t("thuNgan.nhapGiaNhoNhatCanTim")}
              onChange={onSearchInput("giaKhongBaoHiem", true)}
            />
          }
        />
      ),
      width: "170px",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      align: "right",
      i18Name: "thuNgan.donGiaKhongBh",
      show: true,
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.donGiaBH")}
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaBaoHiem"] || 0}
          search={
            <Input
              placeholder={t("thuNgan.nhapGiaNhoNhatCanTim")}
              onChange={onSearchInput("giaBaoHiem", true)}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      align: "right",
      i18Name: "thuNgan.donGiaBH",
      show: true,
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.phuThu")}
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaPhuThu"] || 0}
          search={
            <Input
              placeholder={t("thuNgan.nhapGiaNhoNhatCanTim")}
              onChange={onSearchInput("giaPhuThu", true)}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      align: "right",
      i18Name: "thuNgan.phuThu",
      show: true,
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tongTienMienGiam")}
          sort_key="tienMienGiam"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tienMienGiam"] || 0}
          search={
            <Input
              placeholder={t("thuNgan.nhapTongTienMienGiam")}
              onChange={onSearchInput("tienMienGiam", true)}
            />
          }
        />
      ),
      width: "170px",
      dataIndex: "tienMienGiam",
      key: "tienMienGiam",
      align: "right",
      i18Name: "thuNgan.tongTienMienGiam",
      show: true,
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? t("thuNgan.tienMienGiamKhongBH")
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? t("thuNgan.tienMienGiamBH")
              : t("thuNgan.tienMienGiam")
          }
          sort_key={`tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`}
          onClickSort={onClickSort}
          dataSort={
            dataSortColumn[`tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`] || 0
          }
          search={
            <Input
              placeholder={t("thuNgan.nhapTienMienGiam")}
              onChange={onSearchInput(
                `tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
                true
              )}
            />
          }
        />
      ),
      width: "170px",
      dataIndex: `tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      key: `tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      align: "right",
      i18Name: "thuNgan.tienMienGiam",
      show: true,
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? `% ${t("thuNgan.mienGiamKhongBH")}`
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? `% ${t("thuNgan.mienGiamBH")}`
              : `% ${t("thuNgan.mienGiam")}`
          }
          sort_key={`phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`}
          onClickSort={onClickSort}
          dataSort={
            dataSortColumn[`phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`] ||
            0
          }
          search={
            <Input
              placeholder={t("thuNgan.nhapGiaNhoNhatCanTim")}
              onChange={onSearchInput(
                `phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
                true
              )}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: `phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      key: `phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      align: "right",
      i18Name: "thuNgan.mienGiam",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? `% ${t("thuNgan.voucherMienGiamKhongBH")}`
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? `% ${t("thuNgan.voucherMienGiamBH")}`
              : `% ${t("thuNgan.voucherMienGiam")}`
          }
          sort_key={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? "tienGiamGiaKhongBh"
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? "tienGiamGiaBh"
              : "tienGiamGia"
          }
          onClickSort={onClickSort}
          dataSort={dataSortColumn[`tienGiamGia${getKeyByLoaiPhieuThu()}`] || 0}
          search={
            <Input
              placeholder={t("thuNgan.nhapGiaNhoNhatCanTim")}
              onChange={onSearchInput(
                `tienGiamGia${getKeyByLoaiPhieuThu()}`,
                true
              )}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: `tienGiamGia${getKeyByLoaiPhieuThu()}`,
      key: `tienGiamGia${getKeyByLoaiPhieuThu()}`,
      align: "right",
      render: (item) => formatDecimal(String(item)),
      i18Name: "thuNgan.voucherMienGiam",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.trangThaiHoan")}
          searchSelect={
            <Select
              defaultValue={0}
              data={listtrangThaiHoan}
              placeholder={t("common.chon")}
              onChange={onSearchInput("trangThaiHoan")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "trangThaiHoan",
      key: "trangThaiHoan",
      align: "center",
      render: (item, list, index) => {
        return listtrangThaiHoan?.find((e) => e.id === item)?.ten;
      },
      i18Name: "thuNgan.trangThaiHoan",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.daXuatHD")}
          searchSelect={
            <Select
              defaultValue=""
              data={TRANG_THAI}
              placeholder={t("common.chon")}
              onChange={onSearchInput("phatHanhHoaDon")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "phatHanhHoaDon",
      key: "phatHanhHoaDon",
      align: "center",
      render: (item, list, index) => (
        <Checkbox checked={item} onChange={() => {}} />
      ),
      i18Name: "thuNgan.daXuatHD",
      show: true,
    },
  ];
  const handleChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  return (
    <Main>
      <TableWrapper
        columns={columns}
        dataSource={listData}
        rowClassName={(record, index) => {
          return index === state.currentIndex ? "row-selected" : "";
        }}
        tableName="table_ThuNgan_ChiTietPhieuThu_DanhSachDichVu"
        ref={refSettings}
      />
      {!!totalElements && (
        <PaginationWrapper>
          <Pagination
            className="service-pagination"
            onChange={handleChangePage}
            current={page + 1}
            pageSize={size}
            listData={listData}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
          />
        </PaginationWrapper>
      )}
    </Main>
  );
};

export default forwardRef(DanhsachDichVu);
