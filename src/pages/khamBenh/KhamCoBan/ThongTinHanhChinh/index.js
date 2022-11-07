import React from "react";
import { Col, Row, Avatar, Checkbox } from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import Image from "components/Image";
import { Title, Tags, HanhChinh } from "../styled";
import { DOI_TUONG } from "constants/index";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

function ThongTinHanhChinh(props) {
  let {
    tenNb,
    tenDanToc,
    ngaySinh,
    anhDaiDien,
    tuoi,
    tenQuanHuyen,
    soNha,
    tenTinhThanhPho,
    tenQuocGia,
    noiLamViec,
    gioiTinh,
    doiTuong,
    soDienThoai,
    tenNguoiBaoLanh,
    moiQuanHeNguoiBaoLanh,
    soDienThoaiNguoiBaoLanh,
    thoiGianVaoVien,
    cdNoiGioiThieu,
    lyDoDenKham,
    mucHuongTheBhyt,
    chiNamSinh,
    tenKhoaNb,
    khamSucKhoe,
    loaiDoiTuongKsk,
  } = useSelector((state) => state.khamBenh.infoNb || {});
  const { t } = useTranslation();
  const { innerWidth: width } = window;

  const [listGioiTinh] = useEnum("gioiTinh");
  const renderDoiTuong = () => {
    let target = "";
    let cl = "";

    if (doiTuong === DOI_TUONG.BAO_HIEM) {
      target = t("khamBenh.hanhChinh.BHYT");
      cl = "rgb(4, 146, 84)";
    } else {
      target = t("khamBenh.hanhChinh.khongBaoHiem");
      cl = "rgb(191, 152, 6)";
    }

    return (
      <Tags color="#e6f9f1" cl={cl}>
        {target}
        {doiTuong === DOI_TUONG.BAO_HIEM && ` (${mucHuongTheBhyt || 0}%)`}
      </Tags>
    );
  };
  return (
    <>
      <Title>I. {t("khamBenh.hanhChinh.title")}</Title>
      <HanhChinh>
        <div className="info-partient__left">
          {anhDaiDien ? (
            <>
              <Image
                preview={false}
                src={anhDaiDien}
                className="patient-avatar"
              />
            </>
          ) : (
            <Avatar
              icon={<UserOutlined />}
              size={width <= 1368 ? 150 : 220}
              shape={"square"}
            />
          )}
        </div>
        <div className="info-partient__right paddingLeft">
          <Row>
            <Col md={12}>
              <div className="info-profile">
                1. {t("khamBenh.hanhChinh.hoVaTen")}:<span>{tenNb}</span>
              </div>
              <div className="info-profile">
                2. {t("khamBenh.hanhChinh.ngaySinh")}:
                <span>
                  {ngaySinh
                    ? chiNamSinh
                      ? moment(ngaySinh).format("YYYY")
                      : moment(ngaySinh).format("DD/MM/YYYY")
                    : ""}
                  {tuoi && ` - ${tuoi} tuổi`}
                </span>
              </div>
              <div className="info-profile">
                3. {t("khamBenh.hanhChinh.gioiTinh")}:
                <span>
                  {listGioiTinh.find((item) => item.id === gioiTinh)?.ten}
                </span>
              </div>
              <div className="info-profile">
                4. {t("khamBenh.hanhChinh.soDienThoai")}:{" "}
                <span>{soDienThoai}</span>
              </div>
              <div className="info-profile">
                9. {t("khamBenh.hanhChinh.nguoiBaoLanh")}:
                <span>
                  {tenNguoiBaoLanh}
                  {(moiQuanHeNguoiBaoLanh || soDienThoaiNguoiBaoLanh) &&
                    ` (${moiQuanHeNguoiBaoLanh || ""}${
                      moiQuanHeNguoiBaoLanh && soDienThoaiNguoiBaoLanh
                        ? " - "
                        : ""
                    }${soDienThoaiNguoiBaoLanh || ""})`}
                </span>
              </div>
              <div className="info-profile">
                10. {t("khamBenh.hanhChinh.denKhamBenhLuc")}:
                <span>
                  {thoiGianVaoVien &&
                    moment(thoiGianVaoVien).format("HH:mm:ss DD/MM/YYYY")}
                </span>
              </div>
            </Col>
            <Col md={12}>
              <div className="info-profile">
                5. {t("khamBenh.hanhChinh.danToc")}: <span>{tenDanToc}</span>
              </div>
              <div className="info-profile">
                6. {t("khamBenh.hanhChinh.diaChi")}:
                <span>
                  {soNha && `${soNha} - `}
                  {tenQuanHuyen && `${tenQuanHuyen} - `}
                  {tenTinhThanhPho && `${tenTinhThanhPho} - `}
                  {tenQuocGia}
                </span>
              </div>
              <div className="info-profile">
                7. {t("khamBenh.hanhChinh.noiLamViec")}:{" "}
                <span>{noiLamViec}</span>
              </div>
              <div className="info-profile">
                8. {t("khamBenh.hanhChinh.doiTuong")}:
                <span>{renderDoiTuong()}</span>
              </div>
              <div className="info-profile">
                13. {t("khamBenh.hanhChinh.khoa")}:<span>{tenKhoaNb}</span>
              </div>
              {(khamSucKhoe || loaiDoiTuongKsk) && (
                <div className="info-profile checkbox-ksk">
                  <Checkbox checked={khamSucKhoe || loaiDoiTuongKsk}></Checkbox>
                  {t("khamBenh.hanhChinh.nguoiBenhKhamSucKhoe")}
                </div>
              )}
            </Col>
            <Col xs={24}>
              <div className="info-profile">
                11. {t("khamBenh.hanhChinh.chanDoanNoiGioiThieu")}:{" "}
                <span>{cdNoiGioiThieu}</span>
              </div>
              <div className="info-profile">
                12. {t("khamBenh.hanhChinh.lyDoDenKham")}:{" "}
                <span>{lyDoDenKham}</span>
              </div>
            </Col>
          </Row>
        </div>
      </HanhChinh>
    </>
  );
}

export default ThongTinHanhChinh;
