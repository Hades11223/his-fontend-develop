import React, { useMemo } from "react";
import { ROLES } from "constants/index";
import BaseDmTabForm from "../../../components/BaseDm/lv2";
import BaseDm3 from "../../danhMuc/BaseDm3";
import ThongTinGoi from "./components/thongTinGoi";
import DichVuTrongGoi from "./components/dvTrongGoi";
import KhoaChiDinhGoi from "./components/khoaChiDinhGoi";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const GoiDichVu = ({ ...props }) => {
  const { t } = useTranslation();
  const {
    goiDVChiTiet: { _getListTongHop: getListChiTiet },
    khoaChiDinh: { _getList: getListKhoaChiDinh },
  } = useDispatch();
  const [listloaiDichVu] = useEnum(ENUM.LOAI_DICH_VU);
  const listLoaiDv = useMemo(
    () =>
      listloaiDichVu?.filter((i) =>
        [10, 20, 30, 40, 90, 100].some((j) => j === i.id)
      ),
    [listloaiDichVu]
  );
  const getColumns = ({ onClickSort, onSearchInput, baseColumns }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    baseColumns.colMulSelect({
      title: t("danhMuc.loaiDv"),
      fieldName: "dsLoaiDichVu",
      data: listLoaiDv,
      width: 150,
      render: (item) =>
        item?.map((i) => listLoaiDv?.find((j) => j.id === i)?.ten).join(", "),
    }),
    // baseColumns.colMulSelect({
    //   title: "Tài khoản chỉ định gói",
    //   fieldName: "dsLoaiDichVu",
    //   data: [],
    // }),
    baseColumns.colCheckbox({
      title: t("danhMuc.hanCheKhoaChiDinh"),
      fieldName: "hanCheKhoaChiDinh",
      width: 160,
    }),
    baseColumns.active,
  ];

  const listPanel = () => [
    {
      key: 1,
      title: t("danhMuc.thongTinGoi"),
      render: (props) => (
        <ThongTinGoi
          listLoaiDichVu={listLoaiDv}
          roleEdit={[ROLES["GOI_DICH_VU"].GOI_DICH_VU_SUA]}
          {...props}
        />
      ),
    },
    {
      key: 2,
      title: t("danhMuc.dichVuTrongGoi"),
      render: () => (
        <DichVuTrongGoi
          roleEdit={[ROLES["GOI_DICH_VU"].GOI_DICH_VU_SUA]}
          {...props}
        />
      ),
    },
    {
      title: t("danhMuc.khoaChiDinhGoi"),
      key: "khoaChiDinh",
      render: () => (
        <KhoaChiDinhGoi
          roleEdit={[ROLES["GOI_DICH_VU"].GOI_DICH_VU_SUA]}
          {...props}
        />
      ),
    },
  ];
  const customOnSelectRow =
    ({ callback }) =>
    (data, index) => {
      getListChiTiet({ page: 0, goiDvId: data?.id, isSave: true });
      getListKhoaChiDinh({ page: 0, goiDvId: data?.id, isSave: true });
      callback(data);
    };
  return (
    <BaseDm3
      breadcrumb={[
        { title: t("danhMuc.goiDichVu") , link: "/goi-dich-vu" },
        {
          title: t("danhMuc.danhMucGoiDichVu"),
          link: "/goi-dich-vu/danh-muc",
        },
      ]}
    >
      <BaseDmTabForm
        storeName={"goiDV"}
        title={t("danhMuc.danhMucGoiDichVu")}
        listPanel={listPanel}
        getColumns={getColumns}
        rowKey={(record) => record.id}
        customOnSelectRow={customOnSelectRow}
        roleSave={[ROLES["GOI_DICH_VU"].GOI_DICH_VU_THEM]}
        // roleEdit={[ROLES["GOI_DICH_VU"].GOI_DICH_VU_SUA]}
        flexHanCheKhoaChiDinh={true}
        {...props}
      />
    </BaseDm3>
  );
};

export default GoiDichVu;
