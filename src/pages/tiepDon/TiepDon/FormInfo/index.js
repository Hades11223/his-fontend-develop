import React, { forwardRef, useEffect, useRef } from "react";
import ThongTinTiepDon from "../../components/ThongTinTiepDon";
import { Main } from "./styled";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const FormInfo = (
  { id, isEdit, visible, onOk, onCancel, onlySeen, ...props },
  ref
) => {
  const { t } = useTranslation();
  const { verifingCongBaoHiem = false } = useSelector((state) => state.tiepDon);
  const {
    tiepDon: { getById, initPageTiepDon },
    ngheNghiep: { getListAllNgheNghiep },
    ttHanhChinh: {
      getListAllQuocGia,
      getListAllTinh,
      getListAllQuanHuyen,
      getListAllXaPhuong,
    },
    benhVien: { getListAllBenhVien },
    moiQuanHe: { getListAllQuanHe },
    tiepDonDichVu: { searchDvTiepDon },
    nbDotDieuTri: { clearData: clearDataNbDotDieuTri },
  } = useDispatch();

  useEffect(() => {
    getListAllNgheNghiep({ page: "", size: "" });
    getListAllQuocGia({ page: "", size: "" });
    getListAllTinh({ page: "", size: "" });
    getListAllQuanHuyen({ page: "", size: "" });
    getListAllXaPhuong({ page: "", size: "" });
    getListAllQuanHe({ page: "", size: "" });
    getListAllBenhVien({ page: "", size: "" });
    searchDvTiepDon({});
  }, []);

  useEffect(() => {
    if (id) {
      getById(id);
    } else {
      clearDataNbDotDieuTri();
    }
    initPageTiepDon({ id, isEdit: isEdit });
  }, [id, isEdit, visible]);

  return (
    <Main>
      <Spin
        spinning={verifingCongBaoHiem}
        tip={t("tiepDon.dangKiemTraTheBHYT")}
      >
        <ThongTinTiepDon
          isEdit={isEdit}
          onlySeen={onlySeen}
          onOk={onOk}
          onCancel={onCancel}
          ref={ref}
          id={id}
        />
      </Spin>
    </Main>
  );
};

export default forwardRef(FormInfo);
