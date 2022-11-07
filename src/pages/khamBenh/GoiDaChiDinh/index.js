import React, { useEffect, useMemo, useState } from "react";
import { CollapseWrapper, StickyWrapper } from "./styled";
import { Collapse } from "antd";
import Header from "./Header";
import DanhSachGoiDichVu from "./DanhSachGoiDichVu";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

const GoiDaChiDinh = (props) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    activeKey: ["0"],
  });

  const {
    nbBoChiDinh: { getListGoiDichVu, deleteGoiDichVu },
  } = useDispatch();

  const {
    khamBenh: { thongTinChiTiet },
    nbBoChiDinh: { dsGoiDichVu },
    chiDinhKhamBenh: { dataNb },
  } = useSelector((state) => state);

  const setState = (data) => {
    _setState((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };

  const chanDoan = useMemo(() => {
    let { dsCdChinh, cdSoBo } = dataNb || {};
    dsCdChinh = (dsCdChinh || []).filter((item) => item);
    if (dsCdChinh.length) {
      return dsCdChinh.map((item) => item?.ten).join();
    }
    return cdSoBo || [];
  }, [dataNb]);

  const dsGoiDichVuMemo = useMemo(() => {
    return dsGoiDichVu.map((item, idx) => ({
      ...item,
      stt: idx + 1,
    }));
  }, [dsGoiDichVu]);

  const renderSticky = useMemo(() => {
    return (
      <StickyWrapper>
        <div className="info">
          <div className="info__left">
            <p>
              {t("khamBenh.chiDinh.chanDoan")}: <span>{chanDoan}</span>
            </p>
            <p>
              {t("khamBenh.chiDinh.bacSiChiDinh")}:{" "}
              <span>{t("khamBenh.chiDinh.nguoiBenhYeuCau")}</span>
            </p>
          </div>
          <div className="info__right">
            {t("khamBenh.chanDoan.chanDoanKemTheo")}:
            <span>
              {(dataNb?.dsCdKemTheo || []).map((item) => item.ten).join()}
            </span>
          </div>
        </div>
      </StickyWrapper>
    );
  }, [chanDoan, dataNb, t]);

  useEffect(() => {
    if (thongTinChiTiet?.id) {
      getListGoiDichVu({
        nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
      });
    }
  }, [thongTinChiTiet]);

  const onCollapsed = (value) => {
    setState({
      activeKey: value,
    });
  };

  function onDeleteItem(id) {
    deleteGoiDichVu(id).then(() => {
      getListGoiDichVu({
        nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
      });
    });
  }

  return (
    <>
      {renderSticky}

      <CollapseWrapper
        bordered={false}
        activeKey={state.activeKey}
        onChange={onCollapsed}
      >
        <Panel
          showArrow={false}
          key={"0"}
          header={<Header isCollapsed={false} title={t("khamBenh.boChiDinh")} />}
        >
          <DanhSachGoiDichVu
            data={dsGoiDichVuMemo}
            onDeleteItem={onDeleteItem}
          />
        </Panel>
      </CollapseWrapper>
    </>
  );
};

export default React.memo(GoiDaChiDinh);
