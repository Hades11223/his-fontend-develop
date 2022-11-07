import React, { useEffect } from "react";
import { Checkbox } from "antd";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const DanhSachDichVu = (props, ref) => {
  const { t } = useTranslation();
  const { listDichVuTiepDon, totalElements, page, size } = useSelector(
    (state) => state.danhSachDichVuNbTiepDon
  );
  const { nbDotDieuTriId, isNBKhamSucKhoe } = props;

  const [listTrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const {
    danhSachDichVuNbTiepDon: { searchDichVuTiepDon, onSizeChange },
    khoa: { getListAllKhoa },
  } = useDispatch();
  useEffect(() => {
    if (nbDotDieuTriId) {
      const params = { size: 10, nbDotDieuTriId };
      if (!isNBKhamSucKhoe) params.dsChiDinhTuLoaiDichVu = [200, 230, 240];
      onSizeChange(params);
    }
    getListAllKhoa({});
  }, [nbDotDieuTriId]);

  const onChangePage = (page) => {
    searchDichVuTiepDon({
      page: page - 1,
      nbDotDieuTriId: nbDotDieuTriId,
      size: size,
    });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size, nbDotDieuTriId: nbDotDieuTriId });
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
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      width: "150px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },
    {
      title: <HeaderSearch title={t("common.trangThai")} />,
      width: "80px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (item) => {
        return (listTrangThaiDichVu || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.ttThanhToan")} />,
      width: "80px",
      dataIndex: "thanhToan",
      key: "thanhToan",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.ttHoan")} />,
      width: "80px",
      dataIndex: "trangThaiHoan",
      key: "trangThaiHoan",
      render: (item) => {
        return (listTrangThaiHoan || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.khoaChiDinh")} />,
      width: "120px",
      dataIndex: "khoaChiDinhId",
      key: "khoaChiDinhId",
      render: (item) => {
        return (listAllKhoa || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("common.tuTra")} />,
      width: "80px",
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.khongTinhTien")} />,
      width: "80px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.thanhToanSau")} />,
      width: "80px",
      dataIndex: "thanhToanSau",
      key: "thanhToanSau",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
  ];
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listDichVuTiepDon}
        rowKey={(record) => `${record.id}-${record.tenNb}`}
      />
      {!!totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listDichVuTiepDon}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      ) : null}
    </Main>
  );
};

export default DanhSachDichVu;
