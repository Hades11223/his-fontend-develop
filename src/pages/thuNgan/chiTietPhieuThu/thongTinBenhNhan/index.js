import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Tooltip, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { formatPhone } from "utils";
import { PatientInfoWrapper } from "./styled";
import Image from "components/Image";
import ModalTrangThaiKham from "../ModalTrangThaiKham";
import { useTranslation } from "react-i18next";
import PopoverThongTinMienGiam from "../PopoverThongTinMienGiam";
import IconCheckThe from "assets/svg/thuNgan/iconCheckThe.svg";
import ModalCheckBaoHiem from "pages/tiepDon/components/ThongTinTiepDon/ModalCheckBaoHiem";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const ThongTinBenhNhan = () => {
  const { t } = useTranslation();
  const refModalCheckBaoHiem = useRef();
  const { nbDotDieuTriId } = useParams();
  const {
    nbDotDieuTri: { tongTienDieuTri, getById },
    nhanVien: { getListAllNhanVien },
    nbGoiDv: { getByNbThongTinId },
    tiepDon: { giamDinhThe },
  } = useDispatch();
  const { tienDieuTri, thongTinBenhNhan } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const { listNbGoiDv } = useSelector((state) => state.nbGoiDv);

  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listLoaiMienGiam] = useEnum(ENUM.LOAI_MIEN_GIAM);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);

  useEffect(() => {
    getListAllNhanVien({ size: "", page: "", active: true });
  }, []);

  useEffect(() => {
    if (nbDotDieuTriId) {
      getById(nbDotDieuTriId);
      tongTienDieuTri({ id: nbDotDieuTriId });
    }
  }, [nbDotDieuTriId]);

  useEffect(() => {
    if (thongTinBenhNhan?.nbThongTinId) {
      getByNbThongTinId({
        nbThongTinId: thongTinBenhNhan?.nbThongTinId,
      });
    }
  }, [thongTinBenhNhan?.nbThongTinId]);

  const gioiTinh =
    (listGioiTinh || []).find(
      (item) => item.id === thongTinBenhNhan?.gioiTinh
    ) || {};
  const age = thongTinBenhNhan.tuoi
    ? ` - ${thongTinBenhNhan?.tuoi} ${t("common.tuoi")}`
    : "";

  const onCheckThe = () => {
    let data = {
      hoTen: thongTinBenhNhan.tenNb,
      maThe: thongTinBenhNhan.maTheBhyt,
      ngaySinh: moment(thongTinBenhNhan?.ngaySinh).format("DD/MM/YYYY"),
    };
    giamDinhThe(data)
      .then((data) => {
        refModalCheckBaoHiem.current.show({
          show: true,
          data: data,
          hoTen: thongTinBenhNhan.tenNb,
          diaChi: thongTinBenhNhan.diaChi,
        });
      })
      .catch((e) => {});
  };

  const renderNbSuDungGoi = () => (
    <div className="flex">
      <div className="label">{"NB sử dụng gói"}:</div>
      <div className="info-goidv">
        {(listNbGoiDv || []).map((item, idx) => {
          return (
            <a
              href={`/goi-dich-vu/chi-tiet-nguoi-benh-su-dung-goi/${item.id}`}
              key={item.id}
              target={"_blank"}
            >
              {item.tenGoiDv}
              {idx + 1 < (listNbGoiDv || []).length && <span>, </span>}
            </a>
          );
        })}
      </div>
    </div>
  );

  const renderTTNb = () => (
    <Row className="info-content" gutter={12}>
      <Col xl={12} xxl={12} className="custom-col">
        <div className="flex">
          <div className="label">{t("common.ngaySinh")}:</div>
          <div className="info">
            {moment(thongTinBenhNhan?.ngaySinh).format(
              thongTinBenhNhan?.chiNamSinh ? "YYYY" : "DD/MM/YYYY"
            )}
          </div>
        </div>
        <div className="flex">
          <div className="label">{t("common.diaChi")}:</div>
          <div className="info">
            <Tooltip placement="topLeft" title={thongTinBenhNhan?.diaChi}>
              {thongTinBenhNhan?.diaChi}
            </Tooltip>
          </div>
        </div>
        {/* <div className="flex">
                <div className="w150">{t("common.soGiayToTuyThan")}:</div>
                <div className="info">
                  {thongTinBenhNhan?.maSoGiayToTuyThan}
                </div>
              </div> */}

        {thongTinBenhNhan?.doiTuongKcb != 1 && (
          <div className="flex">
            <div className="label">{"Khoa NB"}:</div>
            <div className="info">{thongTinBenhNhan?.tenKhoaNb || ""}</div>
          </div>
        )}
        {thongTinBenhNhan?.doiTuongKcb == 1 && (
          <div className="flex">
            <div className="label">{t("thuNgan.trangThaiKham")}:</div>
            <div className="info2">
              {(tienDieuTri?.dsTrangThaiKham || [])
                .map((item) => {
                  return (listTrangThaiDichVu || []).find(
                    (x) => x.id === item.trangThai
                  )?.ten;
                })
                .join(",")}
            </div>
            <ModalTrangThaiKham />
          </div>
        )}
        {thongTinBenhNhan?.doiTuongKcb != 1 && (
          <div className="flex">
            <div className="label">{"Trạng thái"}:</div>
            <div className="info">
              {listTrangThaiNb.find(
                (x) => x.id == thongTinBenhNhan?.trangThaiNb
              )?.ten || ""}
            </div>
          </div>
        )}
        {/* <div className="flex">
                <div className="w60">{t("common.sdt")}:</div>
                <div className="info">
                  {formatPhone(thongTinBenhNhan?.soDienThoai)}
                </div>
              </div> */}
        {/* <div className="flex">
                <div className="w60">{t("common.maHs")}:</div>
                <div className="info">{thongTinBenhNhan?.maHoSo}</div>
              </div> */}
        {/* <div className="flex">
                <div className="w60">{t("common.maNb")}:</div>
                <div className="info">{thongTinBenhNhan?.maNb}</div>
              </div> */}
        {thongTinBenhNhan?.doiTuongKcb != 1 && (
          <div className="flex">
            <div className="label">{"Thời gian ra viện"}:</div>
            <div className="info">
              <span className="info__highlight">
                {thongTinBenhNhan.thoiGianRaVien
                  ? moment(thongTinBenhNhan.thoiGianRaVien).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )
                  : ""}
              </span>
            </div>
          </div>
        )}
        <div className="flex">
          <div className="label">{t("danhMuc.chanDoanBenh")}:</div>
          <div className="info"></div>
        </div>
        <div className="flex">
          <div className="label">{t("khamBenh.chanDoan.chanDoanKemTheo")}:</div>
          <div className="info"></div>
        </div>
        {thongTinBenhNhan?.doiTuongKcb == 1 && renderNbSuDungGoi()}
      </Col>
      <Col xl={12} xxl={12} className="custom-col col-3">
        <div className="flex">
          <div className="label">{t("thuNgan.thoiGianVaoVien")}:</div>
          <div className="info">
            <span className="info__highlight">
              {moment(thongTinBenhNhan.thoiGianVaoVien).format(
                "DD/MM/YYYY HH:mm:ss"
              )}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="label">{t("common.soBHYT")}:</div>
          <div className="info" style={{ display: "flex" }}>
            {thongTinBenhNhan?.maTheBhyt && (
              <Tooltip title={t("thuNgan.kiemTraThongTinBhyt")}>
                <div className="check-the">
                  <IconCheckThe onClick={onCheckThe} />
                </div>
              </Tooltip>
            )}
            <span className="info__highlight">
              {thongTinBenhNhan?.maTheBhyt}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="label">{t("common.giaTriThe")}:</div>
          <div className="info">
            {thongTinBenhNhan?.maTheBhyt && (
              <span className="info__highlight">
                {t("common.tu")}{" "}
                {moment(thongTinBenhNhan.tuNgayTheBhyt).format("DD/MM/YYYY")}{" "}
                {t("common.den")}{" "}
                {moment(thongTinBenhNhan.denNgayTheBhyt).format("DD/MM/YYYY")}
              </span>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="label">{t("thuNgan.loaiKhamBh")}:</div>
          <div className="info">
            <span className="info__highlight">
              {thongTinBenhNhan?.dungTuyen && t("thuNgan.dungTuyen")}
              {thongTinBenhNhan?.mucHuongTheBhyt &&
                ` (${thongTinBenhNhan?.mucHuongTheBhyt}%)`}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="label">{t("thuNgan.loaiMg")}:</div>
          <div className="info2">
            <span className="info__highlight">
              {
                (listLoaiMienGiam || []).find(
                  (x) => x.id === thongTinBenhNhan?.loaiMienGiam
                )?.ten
              }
            </span>
          </div>
          <PopoverThongTinMienGiam />
        </div>
        {thongTinBenhNhan?.doiTuongKcb != 1 && renderNbSuDungGoi()}
      </Col>
    </Row>
  );

  return (
    <div>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {thongTinBenhNhan?.anhDaiDien ? (
            <Image
              height={80}
              preview={false}
              src={thongTinBenhNhan?.anhDaiDien}
            />
          ) : (
            <Avatar icon={<UserOutlined />} size={80} shape={"square"} />
          )}

          <div className="head">
            <div className="tenNb">{thongTinBenhNhan?.tenNb}</div>
            <div className="gioi-tinh">
              {gioiTinh.ten && `(${gioiTinh.ten}`}
              {age ? ` ${age})` : ")"}
            </div>
            <div className="ho-so">
              <div className="label">{t("common.maHoSo")}:</div>
              <div className="info">{thongTinBenhNhan?.maHoSo}</div>
            </div>
          </div>
        </div>
        <div className="patient-information">{renderTTNb()}</div>
      </PatientInfoWrapper>
      <ModalCheckBaoHiem ref={refModalCheckBaoHiem} isShowButtonOk={false} />
    </div>
  );
};

export default ThongTinBenhNhan;
