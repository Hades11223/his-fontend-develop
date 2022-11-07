import React, { memo, useEffect, useMemo, useRef } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import { Select } from "components";
import ElementFilter from "components/common/ElementFilter";
import { useParams } from "react-router-dom";

const ThongTinNguoiThucHien = (props) => {
  const { thongTinNguoiThucHien: data, dataDetail } = useSelector(
    (state) => state.pttt
  );
  const { listAllBacSiNgoaiVien } = useSelector(
    (state) => state.bacSiNgoaiVien
  );
  const {
    listAllPhauThuatVien = [],
    listAllDieuDuong = [],
    listAllKyThuatY = [],
    listAllNhanVien = [],
  } = useSelector((state) => state.nhanVien);
  const {
    pttt: { updateThongTinNguoiThucHien, getNguoiThucHien },
    bacSiNgoaiVien: { getListAllBacSiNgoaiVien },
    nhanVien: {
      getListAllPhauThuatVien,
      getListAllDieuDuong,
      getListAllKyThuatY,
      getListAllNhanVien,
    },
  } = useDispatch();
  const disabledAll = useMemo(
    () =>
      [25, 43, 155].some((i) => i === dataDetail.trangThai) ||
      dataDetail?.trangThaiHoan === 40,
    [dataDetail.trangThai, dataDetail.khongThucHien]
  );
  const { t } = useTranslation();
  const { id } = useParams();

  const onChange = (key) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e?.target?.type === "checkbox"
        ? e?.target?.checked
        : e?.target?.value
      : e;
    updateThongTinNguoiThucHien({ [key]: value });
  };

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllPhauThuatVien({ dsMaThietLapVanBang: "BAC_SI", ...param });
    getListAllDieuDuong({ dsMaThietLapVanBang: "DIEU_DUONG", ...param });
    getListAllKyThuatY({ dsMaThietLapVanBang: "KY_THUAT_Y", ...param });
    getListAllBacSiNgoaiVien({ ...param });
    getListAllNhanVien({ ...param });
  }, []);

  useEffect(() => {
    if (id) {
      getNguoiThucHien(id);
    }
  }, [id]);

  const renderFilter = ({}) => {
    const { phauThuat } = dataDetail;

    return (
      <Row>
        {phauThuat && (
          <>
            <Col md={8} xl={8} xxl={8}>
              <div className="item-select">
                <label className="label-filter">
                  {t("pttt.bacSiNgoaiVien")}
                </label>
                <Select
                  onChange={onChange("bsNgoaiVienId")}
                  value={data.bsNgoaiVienId}
                  className="input-filter"
                  placeholder={t("pttt.chonBacSi")}
                  data={listAllBacSiNgoaiVien}
                  disabled={disabledAll}
                />
              </div>
            </Col>
            <Col md={8} xl={8} xxl={8}>
              <div className="item-select">
                <label className="label-filter">
                  {t("pttt.bacSiGayMeNgoaiVien")}
                </label>
                <Select
                  onChange={onChange("bsGayMeNgoaiVienId")}
                  value={data.bsGayMeNgoaiVienId}
                  className="input-filter"
                  placeholder={t("pttt.chonBacSi")}
                  data={listAllBacSiNgoaiVien}
                  disabled={disabledAll}
                />
              </div>
            </Col>
          </>
        )}

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              {phauThuat
                ? t("pttt.phauThuatVienChinh")
                : t("pttt.thuThuatVienChinh")}
              <span className="icon-required"> *</span>
            </label>
            <Select
              onChange={onChange("nguoiThucHienId")}
              value={data.nguoiThucHienId}
              className="input-filter"
              placeholder={t(
                phauThuat ? "pttt.chonPhauThuatVien" : "pttt.chonThuThuatVien"
              )}
              data={listAllPhauThuatVien}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              {phauThuat ? t("pttt.phauThuatVien1") : t("pttt.thuThuatVien1")}
            </label>
            <Select
              onChange={onChange("ptv1Id")}
              value={data.ptv1Id}
              className="input-filter"
              placeholder={t(
                phauThuat ? "pttt.chonPhauThuatVien" : "pttt.chonThuThuatVien"
              )}
              data={listAllPhauThuatVien}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              {phauThuat ? t("pttt.phauThuatVien2") : t("pttt.thuThuatVien2")}
            </label>
            <Select
              onChange={onChange("ptv2Id")}
              value={data.ptv2Id}
              className="input-filter"
              placeholder={t(
                phauThuat ? "pttt.chonPhauThuatVien" : "pttt.chonThuThuatVien"
              )}
              data={[
                ...listAllPhauThuatVien,
                ...listAllDieuDuong,
                ...listAllKyThuatY,
              ]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              {phauThuat ? t("pttt.phauThuatVien3") : t("pttt.thuThuatVien3")}
            </label>
            <Select
              onChange={onChange("ptv3Id")}
              value={data.ptv3Id}
              className="input-filter"
              placeholder={t(
                phauThuat ? "pttt.chonPhauThuatVien" : "pttt.chonThuThuatVien"
              )}
              data={[
                ...listAllPhauThuatVien,
                ...listAllDieuDuong,
                ...listAllKyThuatY,
              ]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.gayMe1")}</label>
            <Select
              onChange={onChange("gayMe1Id")}
              value={data.gayMe1Id}
              className="input-filter"
              placeholder={t("pttt.chonGayMe")}
              data={[...listAllPhauThuatVien, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.gayMe2")}</label>
            <Select
              onChange={onChange("gayMe2Id")}
              value={data.gayMe2Id}
              className="input-filter"
              placeholder={t("pttt.chonGayMe")}
              data={[...listAllPhauThuatVien, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.phuGayMe1")}</label>
            <Select
              onChange={onChange("phuGayMe1Id")}
              value={data.phuGayMe1Id}
              className="input-filter"
              placeholder={t("pttt.chonPhuGayMe")}
              data={[...listAllDieuDuong, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.phuGayMe2")}</label>
            <Select
              onChange={onChange("phuGayMe2Id")}
              value={data.phuGayMe2Id}
              className="input-filter"
              placeholder={t("pttt.chonPhuGayMe")}
              data={[...listAllDieuDuong, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.chayMayChinh")}</label>
            <Select
              onChange={onChange("chayMayChinhId")}
              value={data.chayMayChinhId}
              className="input-filter"
              placeholder={t("pttt.chonChayMayChinh")}
              data={[...listAllDieuDuong, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.phuChayMay")}</label>
            <Select
              onChange={onChange("chayMayPhuId")}
              value={data.chayMayPhuId}
              className="input-filter"
              placeholder={t("pttt.chonChayMayPhu")}
              data={[...listAllDieuDuong, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.yTaGiupViec")}</label>
            <Select
              onChange={onChange("ytaGiupViecId")}
              value={data.ytaGiupViecId}
              className="input-filter"
              placeholder={t("pttt.chonYTaGiupViec")}
              data={[...listAllDieuDuong, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.yTaDungCu1")}</label>
            <Select
              onChange={onChange("ytaDungCu1Id")}
              value={data.ytaDungCu1Id}
              className="input-filter"
              placeholder={t("pttt.chonYTaDungCu")}
              data={[...listAllDieuDuong, ...listAllKyThuatY]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.yTaDungCu2")}</label>
            <Select
              onChange={onChange("ytaDungCu2Id")}
              value={data.ytaDungCu2Id}
              className="input-filter"
              placeholder={t("pttt.chonYTaDungCu")}
              data={[
                ...listAllPhauThuatVien,
                ...listAllDieuDuong,
                ...listAllKyThuatY,
              ]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.yTaDungCu3")}</label>
            <Select
              onChange={onChange("ytaDungCu3Id")}
              value={data.ytaDungCu3Id}
              className="input-filter"
              placeholder={t("pttt.chonYTaDungCu")}
              data={[
                ...listAllPhauThuatVien,
                ...listAllDieuDuong,
                ...listAllKyThuatY,
              ]}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.yTaDungCu4")}</label>
            <Select
              onChange={onChange("ytaDungCu4Id")}
              value={data.ytaDungCu4Id}
              className="input-filter"
              placeholder={t("pttt.chonYTaDungCu")}
              data={listAllNhanVien}
              disabled={disabledAll}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("pttt.yTaDungCu5")}</label>
            <Select
              onChange={onChange("ytaDungCu5Id")}
              value={data.ytaDungCu5Id}
              className="input-filter"
              placeholder={t("pttt.chonYTaDungCu")}
              data={listAllNhanVien}
              disabled={disabledAll}
            />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Main>
      <ElementFilter renderFilter={renderFilter} />
    </Main>
  );
};
export default memo(ThongTinNguoiThucHien);
