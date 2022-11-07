import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Tooltip, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PatientInfoWrapper } from "./styled";
import Image from "components/Image";
import { useTranslation } from "react-i18next";

const ThongTinNb = (props) => {
  const { t } = useTranslation();

  const { nbDotDieuTriId } = props;
  const {
    nbDotDieuTri: { tongTienDieuTri, getById },
    utils: { getUtils },
  } = useDispatch();
  const { tienDieuTri, thongTinBenhNhan } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const { listgioiTinh, listtrangThaiDichVu } = useSelector(
    (state) => state.utils
  );
  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);

  useEffect(() => {
    if (nbDotDieuTriId) {
      getById(nbDotDieuTriId);
      tongTienDieuTri({ id: nbDotDieuTriId });
    }
  }, [nbDotDieuTriId]);

  const gioiTinh =
    (listgioiTinh || []).find(
      (item) => item.id === thongTinBenhNhan?.gioiTinh
    ) || {};
  const age = thongTinBenhNhan.tuoi
    ? ` - ${thongTinBenhNhan?.tuoi} ${t("common.tuoi")}`
    : "";
  return (
    <div>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {thongTinBenhNhan?.anhDaiDien ? (
            <Image preview={false} src={thongTinBenhNhan?.anhDaiDien} />
          ) : (
            <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
          )}
        </div>

        <div className="patient-content">
          <div className="head">
            <div className="name">
              <span>Mã NB: BNS004</span> |{" "}
              <span>{thongTinBenhNhan?.tenNb}</span>{" "}
              {gioiTinh.ten && `(${gioiTinh.ten})`}
            </div>
          </div>

          <div className="patient-information">
            <Row className="info-content" gutter={12}>
              <Col xl={12} xxl={12}>
                <div className="flex">
                  <div className="w150">{t("common.ngaySinh")}:</div>
                  <div className="info">
                    {moment(thongTinBenhNhan?.ngaySinh).format(
                      thongTinBenhNhan?.chiNamSinh ? "YYYY" : "DD/MM/YYYY"
                    )}
                    {age}
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.diaChi")}:</div>
                  <div className="info">
                    <Tooltip
                      placement="topLeft"
                      title={thongTinBenhNhan?.diaChi}
                    >
                      {thongTinBenhNhan?.diaChi}
                    </Tooltip>
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.soGiayToTuyThan")}:</div>
                  <div className="info">
                    {thongTinBenhNhan?.maSoGiayToTuyThan}
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.soDienThoai")}:</div>
                  <div className="info">
                    {(tienDieuTri?.dsTrangThaiKham || [])
                      .map((item) => {
                        return (listtrangThaiDichVu || []).find(
                          (x) => x.id === item.trangThai
                        )?.ten;
                      })
                      .join(",")}
                  </div>
                </div>
              </Col>
              <Col xl={12} xxl={12}>
                <div className="flex">
                  <div className="w150">{"Mã HS"}:</div>
                  <div className="info">
                    <span className="info__highlight">
                      {moment(thongTinBenhNhan.thoiGianVaoVien).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.soBHYT")}:</div>
                  <div className="info">
                    <span className="info__highlight">
                      {thongTinBenhNhan?.maTheBhyt}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.giaTriThe")}:</div>
                  <div className="info">
                    {thongTinBenhNhan?.maTheBhyt && (
                      <span className="info__highlight">
                        {t("common.tu")}{" "}
                        {moment(thongTinBenhNhan.tuNgayTheBhyt).format(
                          "DD/MM/YYYY"
                        )}{" "}
                        {t("common.den")}{" "}
                        {moment(thongTinBenhNhan.denNgayTheBhyt).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("thuNgan.loaiKhamBh")}:</div>
                  <div className="info">
                    <span className="info__highlight">
                      {thongTinBenhNhan?.dungTuyen && t("thuNgan.dungTuyen")}
                      {thongTinBenhNhan?.mucHuongTheBhyt &&
                        ` (${thongTinBenhNhan?.mucHuongTheBhyt}%)`}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </PatientInfoWrapper>
    </div>
  );
};

export default ThongTinNb;
