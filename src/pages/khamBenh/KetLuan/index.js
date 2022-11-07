import React, { useState, useEffect, useMemo } from "react";
import { Collapse, Row, Col } from "antd";
import HeaderKetThucKham from "./HeaderKetThucKham";
import FormHenKham from "./FormHenKham";
import FormChuyenVien from "./FormChuyenVien";
import FormNhapVien from "./FormNhapVien";
import { CollapseWrapper, StickyWrapper } from "./styled";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { TITLE_KET_LUAN_KHAM } from "../configs";
import {
  TRANG_THAI_DICH_VU,
  HUONG_DIEU_TRI_KHAM,
  KET_QUA_KHAM,
} from "constants/index";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
const { Panel } = Collapse;

const KetLuan = ({
  refData,
  handleSetData,
  ketLuanKham,
  setKetLuanKham,
  dataDichVu,
}) => {
  const { t } = useTranslation();
  const [listhuongDieuTriKham] = useEnum("huongDieuTriKham");
  const [listketQuaDieuTri] = useEnum("ketQuaDieuTri");
  const { thongTinChiTiet } = useSelector((state) => state.khamBenh);
  const {
    benhVien: { getListAllBenhVien },
    ngheNghiep: { getListAllNgheNghiep },
  } = useDispatch();
  const infoNb = useSelector((state) => state.khamBenh.infoNb);
  const trangThaiKham = thongTinChiTiet?.nbDvKyThuat?.trangThai;

  const [collapsedKey, setCollapsedKey] = useState(1);

  const isDichVuWasFinish = useMemo(() => {
    const res = dataDichVu.every((item) => item.trangThai === 150); // 150 : đã kết luận
    return res;
  }, [dataDichVu, trangThaiKham]);

  useEffect(() => {
    getListAllBenhVien({ page: "", size: "" });
    getListAllNgheNghiep({ page: "", size: "" });
  }, []);
  const renderTitle = () => {
    if (TITLE_KET_LUAN_KHAM[ketLuanKham?.keyHuongDieuTri]) {
      if (TITLE_KET_LUAN_KHAM[ketLuanKham?.keyHuongDieuTri].i18n)
        return t(TITLE_KET_LUAN_KHAM[ketLuanKham?.keyHuongDieuTri].i18n);
      return TITLE_KET_LUAN_KHAM[ketLuanKham?.keyHuongDieuTri].text;
    }
    return "";
  };

  const renderContent = () => {
    let content = "";
    switch (ketLuanKham?.keyHuongDieuTri) {
      case HUONG_DIEU_TRI_KHAM.HEN_KHAM:
        content = <FormHenKham handleSetData={handleSetData} />;
        break;
      case HUONG_DIEU_TRI_KHAM.NHAP_VIEN:
        content = <FormNhapVien handleSetData={handleSetData} />;
        break;
      case HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN:
        content = (
          <FormChuyenVien
            handleSetData={handleSetData}
            infoNb={infoNb}
            thongTinChiTiet={thongTinChiTiet}
          />
        );
        break;
      default:
        break;
    }
    return content;
  };

  const listPanel = [
    {
      header: (
        <HeaderKetThucKham
          keyHuongDieuTri={ketLuanKham?.keyHuongDieuTri}
          isCollapsed={parseInt(collapsedKey) === 1}
          title={renderTitle()}
          showIconDelete={false}
          nbDotDieuTriId={thongTinChiTiet?.nbDotDieuTriId}
          id={thongTinChiTiet?.id}
        />
      ),
      content: renderContent(),
      key: 1,
    },
    // {
    //   header: (
    //     <HeaderKetThucKham
    //       isCollapsed={parseInt(collapsedKey) === 2}
    //       title="GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BHYT"
    //     />
    //   ),
    //   content: <InfoKetThucKham />,
    //   key: 2,
    // },
  ];

  const onCollapsed = (value) => {
    setCollapsedKey(value);
  };

  const handleChangeKetLuanKham = (key) => (value) => {
    let keyKetQua;

    if (refData.current?.nbKetLuan) {
      refData.current.nbKetLuan[
        key === "keyHuongDieuTri" ? "huongDieuTri" : "ketQuaDieuTri"
      ] = value;
    }

    if (key === "keyHuongDieuTri") {
      if (
        value === HUONG_DIEU_TRI_KHAM.HEN_KHAM ||
        value === HUONG_DIEU_TRI_KHAM.CHO_VE
      ) {
        keyKetQua = KET_QUA_KHAM.DO;
      } else if (
        value === HUONG_DIEU_TRI_KHAM.NHAP_VIEN ||
        value === HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN
      ) {
        keyKetQua = KET_QUA_KHAM.NANG_HON;
      } else {
        keyKetQua = KET_QUA_KHAM.KHONG_DANH_GIA;
      }
    }
    setKetLuanKham({ keyKetQua, [key]: value });
  };

  const listketQuaDieuTriKhamFilter = useMemo(() => {
    return listketQuaDieuTri?.filter((item) => {
      let arrKetQua = [];
      if (ketLuanKham.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.HEN_KHAM) {
        arrKetQua = [1, 2, 3, 10];
      } else if (ketLuanKham.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.CHO_VE) {
        arrKetQua = [1, 2, 10];
      } else if (
        ketLuanKham.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.NHAP_VIEN ||
        ketLuanKham.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN
      ) {
        arrKetQua = [3, 4, 10];
      } else {
        arrKetQua = [10];
      }

      return arrKetQua.includes(item.id);
    });
  }, [ketLuanKham?.keyHuongDieuTri, listketQuaDieuTri]);

  const stickyHeader = useMemo(() => {
    const isKsk = infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk;

    return (
      // !isDichVuWasFinish ||
      trangThaiKham >= TRANG_THAI_DICH_VU.DANG_KET_LUAN && (
        <StickyWrapper>
          <Row className="info">
            <Col span={11} className="info__left">
              <div>{t("khamBenh.ketLuanKham.huongDieuTri")}</div>
              <Select
                disabled={
                  trangThaiKham === TRANG_THAI_DICH_VU.DA_KET_LUAN ||
                  (isKsk && infoNb?.trangThaiKsk === 30)
                }
                style={{ width: "100%" }}
                value={ketLuanKham?.keyHuongDieuTri}
                data={listhuongDieuTriKham}
                onChange={handleChangeKetLuanKham("keyHuongDieuTri")}
                placeholder={t("khamBenh.ketLuanKham.chonHuongDieuTri")}
              />
            </Col>
            <Col span={11} offset={2} className="info__right">
              <div>{t("common.ketQua")}</div>
              <Select
                disabled={
                  trangThaiKham === TRANG_THAI_DICH_VU.DA_KET_LUAN ||
                  (isKsk && infoNb?.trangThaiKsk === 30)
                }
                style={{ width: "100%" }}
                value={ketLuanKham?.keyKetQua}
                data={listketQuaDieuTriKhamFilter}
                onChange={handleChangeKetLuanKham("keyKetQua")}
                placeholder={t("khamBenh.ketLuanKham.chonKetQuaKham")}
              />
            </Col>
          </Row>
        </StickyWrapper>
      )
    );
  }, [
    // isDichVuWasFinish,
    trangThaiKham,
    ketLuanKham,
    listhuongDieuTriKham,
    listketQuaDieuTriKhamFilter,
    t,
  ]);

  return (
    <>
      {stickyHeader}
      {ketLuanKham?.keyHuongDieuTri !== 10 &&
        ketLuanKham?.keyHuongDieuTri !== 100 &&
        ketLuanKham?.keyHuongDieuTri && (
          <div className="collapse-content fadeIn">
            <CollapseWrapper
              bordered={false}
              onChange={onCollapsed}
              activeKey={collapsedKey}
            >
              {listPanel.map((panel) => (
                <Panel showArrow={false} key={panel.key} header={panel.header}>
                  {panel.content}
                </Panel>
              ))}
            </CollapseWrapper>
          </div>
        )}
    </>
  );
};

export default KetLuan;
