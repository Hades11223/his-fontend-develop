import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Tooltip, Avatar, Row, Col, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { formatPhone } from "utils";
import { PatientInfoWrapper } from "./styled";
import Image from "components/Image";
import { useTranslation } from "react-i18next";
import { Button } from "components";
import ModalChinhSuaThongTin from "pages/tiepDon/TiepDon/ModalChinhSuaThongTin";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";

const ThongTinBenhNhan = () => {
  const { t } = useTranslation();
  const refModalChinhSuaThongTin = useRef(null);

  const  infoPatient  = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const {
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
    giaHanTheChuyenDoiTuong: { getDanhSachThe },
  } = useDispatch();

  const gioiTinh =
    (listgioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
    {};
  const age = infoPatient?.tuoi ? ` - ${infoPatient?.tuoi} tuổi` : "";

  const onChuyenDoiTuong = (isEdit) => {
    refModalChinhSuaThongTin.current &&
      refModalChinhSuaThongTin.current.show(
        { id: infoPatient.id, isEdit },
        () => {
          getDanhSachThe({ nbDotDieuTriId: infoPatient?.id });
          getNbNoiTruById(infoPatient?.id);
          message.success(t("common.daLuuDuLieu"));
        }
      );
  };
  return (
    <div>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {infoPatient?.anhDaiDien ? (
            <Image preview={false} src={infoPatient?.anhDaiDien} />
          ) : (
            <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
          )}
        </div>

        <div className="patient-content">
          <div className="head">
            <div className="benhAn">
              {t("common.maBa")}: {infoPatient?.maBenhAn}
            </div>
            <div className="name">
              <span>{infoPatient?.tenNb}</span>{" "}
              {gioiTinh.ten && `(${gioiTinh.ten})`}
            </div>
          </div>
          <div className="patient-information">
            <Row className="info-content" gutter={12}>
              <Col xl={8} xxl={10} className="custom-col">
                <div className="flex">
                  <div className="w150">{t("common.ngaySinh")}:</div>
                  <div className="info">
                    {moment(infoPatient?.ngaySinh).format(
                      infoPatient?.chiNamSinh ? "YYYY" : "DD/MM/YYYY"
                    )}
                    {age}
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.diaChi")}:</div>
                  <div className="info">
                    <Tooltip placement="topLeft" title={infoPatient?.diaChi}>
                      {infoPatient?.diaChi}
                    </Tooltip>
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.soGiayToTuyThan")}:</div>
                  <div className="info">{infoPatient?.maSoGiayToTuyThan}</div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.soDienThoai")}:</div>
                  <div className="info">
                    {formatPhone(infoPatient?.soDienThoai)}
                  </div>
                </div>
              </Col>
              <Col xl={8} xxl={6} className="custom-col">
                <div className="flex">
                  <div className="w150">{t("common.soBHYT")}:</div>
                  <div className="info">{infoPatient?.maTheBhyt}</div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.giaTriThe")}:</div>
                  <div className="info">
                    {infoPatient?.maTheBhyt && (
                      <span className="info__highlight">
                        {t("common.tu")}{" "}
                        {moment(infoPatient.tuNgayTheBhyt).format("DD/MM/YYYY")}{" "}
                        {t("common.den")}{" "}
                        {moment(infoPatient.denNgayTheBhyt).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.maHoSo")}:</div>
                  <div className="info">{infoPatient?.maHoSo}</div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.maNguoiBenh")}:</div>
                  <div className="info">{infoPatient?.maNb}</div>
                </div>
              </Col>
              <Col xl={8} xxl={8} className="custom-button">
                <Button type="primary" onClick={() => onChuyenDoiTuong(true)}>
                  {t("quanLyNoiTru.giaHanThe.chuyenDoiTuong")}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </PatientInfoWrapper>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} />
    </div>
  );
};

export default ThongTinBenhNhan;
