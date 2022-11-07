import React, { useMemo } from "react";
import moment from "moment";
import { Main, PatientInfoWrapper } from "./styled";
import { Row, Avatar, Tooltip, Col } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import Image from "components/Image";
import { UserOutlined } from "@ant-design/icons";
import { formatPhone } from "utils";

const ThongTinBenhNhan = (props) => {
  const { t } = useTranslation();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const age = thongTinBenhNhan?.tuoi ? ` - ${thongTinBenhNhan?.tuoi} tuổi` : "";

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find(
        (item) => item.id === thongTinBenhNhan?.gioiTinh
      ) || {}
    );
  }, [thongTinBenhNhan, listGioiTinh]);

  console.log("infoPatient", thongTinBenhNhan);

  return (
    <Main>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {thongTinBenhNhan?.anhDaiDien ? (
            <Image preview={false} src={thongTinBenhNhan?.anhDaiDien} />
          ) : (
            <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
          )}
        </div>
        <div className="patient-info">
          <div className="head">
            <div className="benhAn">
              {t("common.maBa")}: {thongTinBenhNhan?.maBenhAn}
            </div>
            <div className="name">
              <span>{thongTinBenhNhan?.tenNb}</span>
              {gioiTinh.ten && ` (${gioiTinh.ten})`}
            </div>
          </div>

          <div className="patient-information">
            <Row className="info-content">
              <Col span={12}>
                <table>
                  <tbody>
                    <tr>
                      <td>{t("common.ngaySinh")}:</td>
                      <td className="info">
                        {thongTinBenhNhan?.ngaySinh
                          ? `${moment(thongTinBenhNhan?.ngaySinh).format(
                              thongTinBenhNhan?.chiNamSinh
                                ? "YYYY"
                                : "DD/MM/YYYY"
                            )}`
                          : ""}
                        {age}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("common.diaChi")}:</td>
                      <td className="info">
                        <Tooltip
                          placement="topLeft"
                          title={thongTinBenhNhan?.diaChi}
                        >
                          {thongTinBenhNhan?.diaChi}
                        </Tooltip>
                      </td>
                    </tr>
                    <tr>
                      <td>{t("common.soGiayToTuyThan")}:</td>
                      <td className="info">
                        {thongTinBenhNhan?.maSoGiayToTuyThan}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("common.soDienThoai")}:</td>
                      <td className="info">
                        {formatPhone(thongTinBenhNhan?.soDienThoai)}
                      </td>
                    </tr>
                    <tr>
                      <td>{"TG vào viện"}:</td>
                      <td className="info">
                        {thongTinBenhNhan?.thoiGianVaoVien &&
                          moment(thongTinBenhNhan?.thoiGianVaoVien).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col span={12} style={{ paddingTop: 5 }}>
                <table>
                  <tbody>
                    <tr>
                      <td>{t("common.soBHYT")}:</td>
                      <td className="info">{thongTinBenhNhan?.maTheBhyt}</td>
                    </tr>
                    <tr>
                      <td>{t("common.giaTriThe")}:</td>
                      <td className="info">
                        {thongTinBenhNhan?.maTheBhyt && (
                          <>
                            {t("common.tu")}{" "}
                            {moment(thongTinBenhNhan?.tuNgayTheBhyt).format(
                              "DD/MM/YYYY"
                            )}{" "}
                            {t("common.den")}{" "}
                            {moment(thongTinBenhNhan?.denNgayTheBhyt).format(
                              "DD/MM/YYYY"
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("thuNgan.loaiKhamBh")}:</td>
                      <td className="info">
                        {thongTinBenhNhan?.dungTuyen && t("thuNgan.dungTuyen")}
                        {thongTinBenhNhan?.mucHuongTheBhyt &&
                          ` (${thongTinBenhNhan?.mucHuongTheBhyt}%)`}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("common.maHs")}:</td>
                      <td className="info">{thongTinBenhNhan?.maHoSo}</td>
                    </tr>
                    <tr>
                      <td>{t("common.maNb")}:</td>
                      <td className="info">{thongTinBenhNhan?.maNb}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </div>
      </PatientInfoWrapper>
    </Main>
  );
};

export default ThongTinBenhNhan;
