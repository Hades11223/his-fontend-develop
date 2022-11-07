import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { Avatar, Col, Row } from "antd";
import { formatPhone } from "utils";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import Image from "components/Image";
import { useTranslation } from "react-i18next";
const ThongTinBenhNhan = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { maHoSo, soPhieu } = props;
  const { getThongTinBenhNhan } = dispatch.danhSachPhieuYeuCauHoan;

  useEffect(() => {
    getThongTinBenhNhan({ maHoSo, soPhieu }).then((s) => {
      setState({
        patient: s,
      });
    });
  }, [maHoSo, soPhieu]);

  return (
    <Main>
      <div className="image-patient">
        {state?.patient?.anhDaiDien ? (
          <Image preview={false} src={state?.patient?.anhDaiDien} />
        ) : (
          <Avatar icon={<UserOutlined />} size={120} shape={"square"} />
        )}
      </div>
      <div className="info-patient">
        <div className="name-patient">
          <span className="code">
            {t("common.maNb")} : <b>{state?.patient?.maNb}</b>
          </span>
          <span className="name">
            <b>{state?.patient?.tenNb}</b>
            <span className="gender">
              ({state?.patient?.gioiTinh === 1 ? "Nam" : "Nữ"})
            </span>
          </span>
        </div>
        <Row className="info-detail">
          <Col lg={{ span: 24 }} xl={{ span: 12 }}>
            <p>
              <span className="column-info">{t("common.ngaySinh")}:</span>
              <span className="text-info">{state?.patient?.ngaySinh2}</span>
            </p>
            <p>
              <span className="column-info">{t("common.diaChi")}:</span>
              <span className="text-info">{state?.patient?.diaChi}</span>
            </p>
            <p>
              <span className="column-info">
                {t("common.soGiayToTuyThan")}:
              </span>
              <span className="text-info">
                {state?.patient?.maSoGiayToTuyThan}
              </span>
            </p>
            <p>
              <span className="column-info">{t("common.sdt")}:</span>
              <span className="text-info">
                {formatPhone(state?.patient?.soDienThoai)}
              </span>
            </p>
          </Col>
          <Col lg={{ span: 24 }} xl={{ span: 12 }}>
            <p>
              <span className="column-info-2">{t("common.maHs")}:</span>
              <span className="text-info">{state?.patient?.maHoSo}</span>
            </p>
            <p>
              <span className="column-info-2">{t("common.soBHYT")}:</span>
              <span className="text-info">{state?.patient?.maTheBhyt}</span>
            </p>
            <p>
              <span className="column-info-2">{t("common.giaTriThe")}:</span>
              <span className="text-info">
                {t("common.tu")}
                {state?.patient?.tuNgayTheBhyt
                  ? moment(state?.patient?.tuNgayTheBhyt).format("DD/MM/YYYY")
                  : " "}
                {t("common.den")}
                {state?.patient?.denNgayTheBhyt
                  ? moment(state?.patient?.denNgayTheBhyt).format("DD/MM/YYYY")
                  : " "}
              </span>
            </p>
            <p>
              <span className="column-info-2">{t("common.loai")}:</span>
              <span className="text-info">
                <span>
                  {state?.patient?.dungTuyen && `${t("thuNgan.dungTuyen")} `}
                </span>
                <span style={{ color: "red" }}>
                  {state?.patient?.mucHuongTheBhyt &&
                    ` (${state?.patient?.mucHuongTheBhyt}%)`}
                </span>
              </span>
            </p>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default ThongTinBenhNhan;
