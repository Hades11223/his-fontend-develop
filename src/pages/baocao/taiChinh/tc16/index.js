import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { TRANG_THAI_PHIEU_THU } from "pages/baocao/utils";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { concatString } from "utils";

const Index = ({
  listAllKhoa,
  listToaNha,
  listAllNhanVien,
  listAllPhuongThucThanhToan,
  // listDoiTuongKcb,
  getListAllKhoa,
  getUtils,
  getListAllToaNha,
  getListAllNhanVien,
  getListAllPhuongThucThanhToan
}) => {

  const { t } = useTranslation()

  const { khoa: { listKhoaTheoTaiKhoan }, utils: { listDoiTuongKcb = [] } } = useSelector(state => state)
  const { khoa: { getKhoaTheoTaiKhoan }, baoCaoDaIn: { getTc16 }, } = useDispatch()

  useEffect(() => {
    getUtils({ name: "DoiTuongKcb" });
    getKhoaTheoTaiKhoan({})
  }, []);

  const [tienTamUngConLaiList] = useEnum(ENUM.TIEN_TAM_UNG_CON_LAI)

  console.log("concatString", concatString("Chonj", "Thanh q123", "Hoaf"));
  // concatString("Chonj", "Thanh q123", "Hoaf")
  const onCustomChange = (key, onChange) => e => {
    if (key === "dsTrangThai") {
      if (e === 40) onChange("dsTrangThai")([40, 50])
      else
        onChange("dsTrangThai")(e)
    }
  }

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <Row>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("baoCao.tuNgay")} <span className="red required">*</span>
              </label>
              <DatePicker
                // showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.tuThoiGian}
                onChange={onChange("tuThoiGian")}
                placeholder={t("baoCao.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.tuThoiGian && (
                <div className="error">{t("baoCao.chonTuNgay")}</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("baoCao.denNgay")} <span className="red required">*</span>
              </label>
              <DatePicker
                // showTime={{ defaultValue: moment().endOf("day") }}
                value={_state.denThoiGian}
                onChange={onChange("denThoiGian")}
                placeholder={t("baoCao.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.denThoiGian && (
                <div className="error">{t("baoCao.chonDenNgay")}</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.doiTuongNguoiBenh")}</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={concatString(t("common.chon"), t("baoCao.doiTuongNguoiBenh"))}
                data={[{ id: "", ten: t("common.tatCa") }, ...listDoiTuongKcb]}
                onChange={onChange("dsDoiTuongKcb", true)}
                value={_state.dsDoiTuongKcb}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.khoaNguoiBenh")}</label>
              <Select
                className="input-filter"
                placeholder={concatString(t("common.chon"), t("baoCao.khoaNguoiBenh"))}
                data={[{ id: "", ten: t("common.tatCa") }, ...listKhoaTheoTaiKhoan]}
                onChange={onChange("khoaNbId")}
                value={_state.khoaNbId}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Số tiền tạm ứng còn lại</label>
              <Select
                className="input-filter"
                placeholder={"Chọn khoa hiện tại"}
                data={[{ id: "", ten: t("common.tatCa") }, ...tienTamUngConLaiList]}
                onChange={onChange("tienTamUngConLai")}
                value={_state.tienTamUngConLai}
              />
            </div>
          </Col>
        </Row>
      </>

    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    dsDoiTuongKcb: _state.dsDoiTuongKcb,
    khoaNbId: _state.khoaNbId,
    tienTamUngConLai: _state.tienTamUngConLai,
  })

  const beforeOk =
    ({ _state, _beforeOk }) =>
      () => {
        return _beforeOk();
      };


  return (
    <Main>
      <BaseBaoCao
        title="TC16. Báo cáo tạm ứng - hoàn ứng của NB"
        renderFilter={renderFilter}
        getBc={getTc16}
        handleDataSearch={handleDataSearch}
        initState={{
          dsDoiTuongKcb: [""],
          khoaNbId: [""],
          dsToaNhaId: [""],
          dsThuNgan: [""],
          tienTamUngConLai: [""],
          dsTrangThai: [40, 50],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC16. Báo cáo tạm ứng - hoàn ứng của NB", link: "/bao-cao/tc16" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
    listAllKhoa: state.khoa.listAllKhoa || [],
    listToaNha: state.toaNha.listAllToaNha || [],
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    listAllPhuongThucThanhToan: state.phuongThucTT.listAllPhuongThucThanhToan || [],
  }),
  ({
    utils: { getUtils },
    baoCaoDaIn: { getTc16 },
    khoa: { getListAllKhoa },
    toaNha: { getListAllToaNha },
    nhanVien: { getListAllNhanVien },
    phuongThucTT: { getListAllPhuongThucThanhToan },
  }) => ({
    getUtils,
    getTc16,
    getListAllKhoa,
    getListAllToaNha,
    getListAllNhanVien,
    getListAllPhuongThucThanhToan
  })
)(Index);
