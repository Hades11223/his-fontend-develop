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

const ThongTinNguoiBenh = (props) => {
  const { t } = useTranslation();
  const { chiTietLuuTru } = useSelector((state) => state.dsLuuTruBa);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const { anhDaiDien, maBenhAn, tenNb, maNb } = chiTietLuuTru;

  const age = chiTietLuuTru?.tuoi ? ` - ${chiTietLuuTru?.tuoi} tuổi` : "";

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find(
        (item) => item.id === chiTietLuuTru?.gioiTinh
      ) || {}
    );
  }, [chiTietLuuTru, listGioiTinh]);

  console.log("infoPatient", chiTietLuuTru);

  return (
    <Main>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {anhDaiDien ? (
            <Image preview={false} src={anhDaiDien} />
          ) : (
            <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
          )}
        </div>
        <div className="patient-info">
          <div className="head">
            <div className="benhAn">
              {t("common.maBa")}: {maBenhAn}
            </div>
            <div className="name">
              <span>{tenNb}</span>
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
                        {chiTietLuuTru?.ngaySinh
                          ? `${moment(chiTietLuuTru?.ngaySinh).format(
                              chiTietLuuTru?.chiNamSinh ? "YYYY" : "DD/MM/YYYY"
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
                          title={chiTietLuuTru?.diaChi}
                        >
                          {chiTietLuuTru?.diaChi}
                        </Tooltip>
                      </td>
                    </tr>
                    <tr>
                      <td>{t("common.soGiayToTuyThan")}:</td>
                      <td className="info">
                        {chiTietLuuTru?.maSoGiayToTuyThan}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("common.soDienThoai")}:</td>
                      <td className="info">
                        {formatPhone(chiTietLuuTru?.soDienThoai)}
                      </td>
                    </tr>
                    <tr>
                      <td>{"TG vào viện"}:</td>
                      <td className="info">
                        {chiTietLuuTru?.thoiGianVaoVien &&
                          moment(chiTietLuuTru?.thoiGianVaoVien).format(
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
                      <td className="info">{chiTietLuuTru?.maTheBhyt}</td>
                    </tr>
                    <tr>
                      <td>{t("common.giaTriThe")}:</td>
                      <td className="info">
                        {chiTietLuuTru?.maTheBhyt && (
                          <>
                            {t("common.tu")}{" "}
                            {moment(chiTietLuuTru?.tuNgayTheBhyt).format(
                              "DD/MM/YYYY"
                            )}{" "}
                            {t("common.den")}{" "}
                            {moment(chiTietLuuTru?.denNgayTheBhyt).format(
                              "DD/MM/YYYY"
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("thuNgan.loaiKhamBh")}:</td>
                      <td className="info">
                        {chiTietLuuTru?.dungTuyen && t("thuNgan.dungTuyen")}
                        {chiTietLuuTru?.mucHuongTheBhyt &&
                          ` (${chiTietLuuTru?.mucHuongTheBhyt}%)`}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("common.maHs")}:</td>
                      <td className="info">{chiTietLuuTru?.maHoSo}</td>
                    </tr>
                    <tr>
                      <td>{t("common.maNb")}:</td>
                      <td className="info">{maNb}</td>
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

export default ThongTinNguoiBenh;
