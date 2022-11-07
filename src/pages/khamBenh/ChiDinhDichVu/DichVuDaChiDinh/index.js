import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { CollapseWrapper } from "./styled";
import { LOAI_DICH_VU } from "constants/index";
import ModalHoanDichVu from "components/ModalHoanDichVu";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import DanhSachChiDinh from "./DanhSachChiDinh";

const DichVuDaChiDinh = ({
  isHiddenTyLett,
  isDisplayLoaiPttt,
  isDisplayIconHoan,
  isReadonly, 
  disabledAll,
  ...props
}) => {
  const { t } = useTranslation();
  const collapseDichVu = useStore("chiDinhKhamBenh.collapseDichVu", []);
  const configData = useStore("chiDinhKhamBenh.configData", null);

  const {
    benhPham: { getListAllBenhPham },
  } = useDispatch();

  const refModalHoanDichVu = useRef(null);

  const [state, _setState] = useState({
    listDeletingId: [],
    activeKey: [],
    thanhTien: 0,
  });

  const setState = (data) => {
    _setState((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };

  useEffect(() => {
    if (configData) {
      getListAllBenhPham({active: true, page: "", size: ""});
    }
  }, [configData]);

  useEffect(() => {
    if (collapseDichVu.length > 0) {
      setState({ activeKey: collapseDichVu });
    }
  }, [collapseDichVu]);

  const listDv = useMemo(() => {
    return [
      {
        loaiDichVu: LOAI_DICH_VU.KHAM,
        keyStore: "chiDinhKhamBenh.dsDichVuChiDinhKham",
      },
      {
        loaiDichVu: LOAI_DICH_VU.XET_NGHIEM,
        keyStore: "chiDinhKhamBenh.dsDichVuChiDinhXN",
      },
      {
        loaiDichVu: LOAI_DICH_VU.CDHA,
        keyStore: "chiDinhKhamBenh.dsDichVuChiDinhCls",
      },
      {
        loaiDichVu: LOAI_DICH_VU.NGOAI_DIEU_TRI,
        keyStore: "chiDinhKhamBenh.dsDichVuNgoaiDieuTri",
      },
    ];
  }, []);

  const onCollapsed = (value) => {
    setState({
      activeKey: value,
    });
  };

  return (
    <>
      <CollapseWrapper
        bordered={false}
        activeKey={state.activeKey}
        // accordion
        onChange={onCollapsed}
      >
        {listDv.map((panel, idx) => (
          <DanhSachChiDinh
            key={idx}
            loaiDichVu={panel.loaiDichVu}
            keyStore={panel.keyStore}
            activeKey={state.activeKey}
            isHiddenTyLett={isHiddenTyLett}
            isDisplayLoaiPttt={isDisplayLoaiPttt}
            isDisplayIconHoan={isDisplayIconHoan}
            disabledAll={disabledAll}
            isReadonly={isReadonly}
            {...props}
          />
        ))}
      </CollapseWrapper>
      <ModalHoanDichVu ref={refModalHoanDichVu} />
    </>
  );
};

export default DichVuDaChiDinh;
