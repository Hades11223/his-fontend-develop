import React, { useRef, useEffect } from "react";
import moment from "moment";
import { Tooltip, Avatar, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROLES } from "constants/index";
import { formatPhone } from "utils";
import { PatientInfoWrapper, Main } from "./styled";
import { Image, AuthWrapper } from "components";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ThongTinBenhNhan = ({
  thongTinBenhNhan = {},
  age,
  gioiTinh,
  onToggleModal,
  ...rest
}) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 27, //ESC
          onEvent: () => {
            onToggleModal && onToggleModal("hidden")();
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  return (
    <Main className={rest.className}>
      <Row className="info-partinent">
        <div className="info-partinent__index">BNS-0004</div>
        <div className="info-partinent__name">
          <span>{thongTinBenhNhan?.tenNb}</span>
          {gioiTinh.ten &&
            age &&
            ` (${gioiTinh.ten && `${gioiTinh.ten} - `} ${age})`}
        </div>
      </Row>
      <PatientInfoWrapper>
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].THONG_TIN_CA_NHAN]}>
          <div className="img-avatar">
            {thongTinBenhNhan?.anhDaiDien ? (
              <Image preview={false} src={thongTinBenhNhan?.anhDaiDien} />
            ) : (
              <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
            )}
          </div>
        </AuthWrapper>
        <div className="patient-information">
          <div className="info-content">
            <div className="custom-col">
              <table>
                <tbody>
                  <tr>
                    <td>{t("common.ngaySinh")}:</td>
                    <td className="info">
                      {thongTinBenhNhan?.ngaySinh
                        ? `${moment(thongTinBenhNhan?.ngaySinh).format(
                            "DD/MM/YYYY"
                          )} - `
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
                </tbody>
              </table>
            </div>
            <div className="custom-col col-2">
              <table>
                <tbody>
                  <tr>
                    <td>{t("common.sdt")}:</td>
                    <td className="info">
                      {formatPhone(thongTinBenhNhan?.soDienThoai)}
                    </td>
                  </tr>
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
                </tbody>
              </table>
            </div>
            <div className="custom-col">
              <table>
                <tbody>
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
            </div>
          </div>
        </div>
      </PatientInfoWrapper>
    </Main>
  );
};

export default ThongTinBenhNhan;
