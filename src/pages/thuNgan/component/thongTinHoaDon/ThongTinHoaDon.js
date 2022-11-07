import React, { useState } from "react";
import { Checkbox, Form, Input, Popover } from "antd";
import Button from "pages/kho/components/Button";
import { GlobalStyle, Main } from "./styled";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import IcPrint from "assets/svg/tiep-don/printIcon.svg";
import fileUtils from "utils/file-utils";
import Icon from "@ant-design/icons";
import { printJS } from "data-access/print-provider";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum } from "hook";

const ThongTinHoaDon = (props) => {
  const { t } = useTranslation();

  const {
    thongTinHoaDon,
    form,
    isChiTiet,
    handleSubmit,
    typeHoaDon,
    tongTien = 0,
    isNhieuNB = false,
  } = props;
  const [showHoaDonCty, setShowHoaDonCty] = useState(false);
  const allowXuatHoaDon = () => {
    setShowHoaDonCty(!showHoaDonCty);
  };
  const { price } = useSelector((state) => state.dsHoaDonDienTu);
  const {
    dsHoaDonDienTu: { getFileHoaDon, getBangKeKemHDDT, getBienBanDieuChinh },
  } = useDispatch();
  const [listTrangThaiHoaDon] = useEnum(ENUM.TRANG_THAI_HOA_DON);
  const onPrintHDDT = (type) => {
    switch (type) {
      case 1:
        getFileHoaDon({ id: thongTinHoaDon?.id }).then((s) => {
          const html =
            "<html>" +
            "<style>" +
            "@page { size: auto;  margin: 0mm; }" +
            "</style>" +
            "</body></html>";
          printJS({
            printable: s + html,
            type: "raw-html",
          });
        });
        break;
      case 2:
        getBangKeKemHDDT({ id: thongTinHoaDon?.id }).then((s) => {
          if (s) {
            fileUtils
              .getFromUrl({ url: fileUtils.absoluteFileUrl(s) })
              .then((s) => {
                const blob = new Blob([new Uint8Array(s)], {
                  type: "application/pdf",
                });
                const blobUrl = window.URL.createObjectURL(blob);
                printJS({
                  printable: blobUrl,
                  type: "pdf",
                });
              });
          }
        });
        break;
      case 3:
        getBienBanDieuChinh({ id: thongTinHoaDon?.id }).then((s) => {
          printJS({
            printable: s,
            type: "raw-html",
          });
        });
        break;
      default:
        break;
    }
  };
  const content = (
    <div>
      <p
        onClick={() => onPrintHDDT(1)}
        className="select-print"
        style={{ cursor: "pointer" }}
      >
        {t("thuNgan.inHoaDonDienTu")}
      </p>
      {isNhieuNB && (
        <p
          onClick={() => onPrintHDDT(2)}
          className="select-print"
          style={{ cursor: "pointer" }}
        >
          {t("thuNgan.inBangKeNhieuBenhNhan")}
        </p>
      )}

      <p
        onClick={() => onPrintHDDT(3)}
        className="select-print"
        style={{ cursor: "pointer" }}
      >
        {t("thuNgan.inBienBanDieuChinhGiam")}
      </p>
      <p
        // onClick={onPrintHDDT}
        className="select-print"
        style={{ cursor: "pointer" }}
      >
        {t("thuNgan.inBienBanDieuChinhDinhDanh")}
      </p>
    </div>
  );

  return (
    <Main typeHoaDon={typeHoaDon}>
      <GlobalStyle></GlobalStyle>
      <div className="patient">
        <h4 className="title bold">
          <span>{t("thuNgan.thongTinHoaDon")}</span>
          {checkRole([ROLES["THU_NGAN"].IN_HOA_DON]) && (
            <Popover placement="bottomRight" content={content} trigger="click">
              <Button
                type="primary"
                height={30}
                iconHeight={15}
                rightIcon={<Icon component={IcPrint}></Icon>}
              >
                {t("thuNgan.inGiayTo")}
              </Button>
            </Popover>
          )}
        </h4>
        {typeHoaDon !== 3 && (
          <>
            <div>
              {t("thuNgan.hoTenNb")}:{" "}
              <span className="bold">{thongTinHoaDon?.tenNb}</span>
            </div>
            <div>
              {t("thuNgan.diaChiNb")}:{" "}
              <span className="bold">
                {thongTinHoaDon?.diaChi || thongTinHoaDon?.nbDiaChi?.diaChi}
              </span>{" "}
            </div>
            <div>
              {t("common.maHoSo")}:{" "}
              <span className="bold">{thongTinHoaDon?.maHoSo}</span>
            </div>
          </>
        )}
      </div>

      {!isChiTiet ? (
        <div className="form-thong-tin">
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            initialValues={{ phatHanhHdCongTy: false }}
          >
            {typeHoaDon == 3 && (
              <>
                <Form.Item
                  label={t("thuNgan.hoTenNb")}
                  name="tenNguoiMuaHang"
                  rules={[
                    {
                      required: true,
                      message: t("thuNgan.vuiLongNhapHoTenNguoiBenh"),
                    },
                  ]}
                >
                  <Input
                    placeholder={`${t("thuNgan.xuatHoaDonChoNbNgay")} ${moment(
                      new Date()
                    ).format("DD/MM/YYYY")}`}
                  />
                </Form.Item>
                <Form.Item
                  label={t("thuNgan.diaChiNb")}
                  name="diaChi"
                  rules={[
                    {
                      required: true,
                      message: t("thuNgan.vuiLongNhapDiaChiNguoiBenh"),
                    },
                  ]}
                >
                  <Input placeholder={t("thuNgan.diaChiNguoiBenh")} />
                </Form.Item>
              </>
            )}
            <Form.Item
              label={t("thuNgan.emailHoaDonDienTu")}
              name="email"
              rules={[
                {
                  type: "email",
                  message: t("common.vuiLongNhapDungDinhDangDiaChiEmail"),
                },
              ]}
            >
              <Input placeholder={t("common.nhapEmail")} />
            </Form.Item>
            <Form.Item name="phatHanhHdCongTy">
              <Checkbox onChange={allowXuatHoaDon}>
                <span className="bold">{t("thuNgan.xuatHoaDonChoCongTy")}</span>
              </Checkbox>
            </Form.Item>
            {showHoaDonCty && (
              <>
                <Form.Item
                  label={t("thuNgan.tenCongTy")}
                  name="tenCongTy"
                  rules={[
                    {
                      required: showHoaDonCty ? true : false,
                      message: t("thuNgan.vuiLongNhapTenCongTy"),
                    },
                  ]}
                >
                  <Input placeholder={t("thuNgan.nhapTenCongTy")}></Input>
                </Form.Item>
                <Form.Item
                  label={t("thuNgan.diaChiCongTy")}
                  name="diaChiCongTy"
                  rules={[
                    {
                      required: showHoaDonCty ? true : false,
                      message: t("thuNgan.vuiLongNhapDiaChiCongTy"),
                    },
                  ]}
                >
                  <Input placeholder={t("common.nhapDiaChi")}></Input>
                </Form.Item>
                <Form.Item
                  label={t("thuNgan.maSoThueCongTy")}
                  name="mstCongTy"
                  rules={[
                    {
                      required: showHoaDonCty ? true : false,
                      message: t("thuNgan.vuiLongNhapMaSoThueCongTy"),
                    },
                  ]}
                >
                  <Input placeholder={t("thuNgan.nhapMaSoThue")}></Input>
                </Form.Item>
                <Form.Item
                  label={t("thuNgan.soTaiKhoanCongTy")}
                  name="stkCongTy"
                >
                  <Input placeholder={t("thuNgan.nhapSoTaiKhoan")}></Input>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      ) : (
        <div className="form-chi-tiet">
          <Checkbox
            style={{ margin: "10px 0" }}
            checked={thongTinHoaDon?.phatHanhHdCongTy}
          >
            <span className="bold">{t("thuNgan.xuatHoaDonChoCongTy")}</span>
          </Checkbox>
          {thongTinHoaDon?.phatHanhHdCongTy && (
            <>
              <div>
                <span>{t("thuNgan.tenCongTy")}:</span>
                <span className="bold"> {thongTinHoaDon?.tenCongTy}</span>
              </div>
              <div>
                <span>{t("thuNgan.diaChiCongTy")}:</span>
                <span className="bold"> {thongTinHoaDon?.diaChiCongTy}</span>
              </div>
              <div>
                <span>{t("thuNgan.mstCongTy")}:</span>
                <span className="bold"> {thongTinHoaDon?.mstCongTy}</span>
              </div>
              <div>
                <span>{t("thuNgan.stkCongTy")}:</span>
                <span className="bold"> {thongTinHoaDon?.stkCongTy}</span>
              </div>
            </>
          )}

          <div>
            <span>{t("thuNgan.hinhThucThanhToan")}:</span>
            <span className="bold"> {thongTinHoaDon?.hinhThucThanhToan}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span>{t("thuNgan.soHoaDon")}:</span>
            <span className="bold"> {thongTinHoaDon?.soHoaDon}</span>
          </div>
          <div>
            <span>{t("thuNgan.kyHieuHoaDon")}:</span>
            <span className="bold"> {thongTinHoaDon?.kyHieuHoaDon}</span>
          </div>
          <div>
            <span>{t("thuNgan.soHoaDonGoc")}:</span>
            <span className="bold"> {thongTinHoaDon?.soHoaDonGoc}</span>
          </div>
          <div>
            <span>{t("thuNgan.kyHieuHoaDonGoc")}:</span>
            <span className="bold"> {thongTinHoaDon?.kyHieuHoaDon}</span>
          </div>
          <div style={{ margin: "10px 0" }}>
            <span>{t("thuNgan.trangThaiHoaDon")}:</span>
            <span className="bold">
              {" "}
              {listTrangThaiHoaDon
                ? listTrangThaiHoaDon.find(
                    (item) => item.id == thongTinHoaDon?.trangThai
                  )?.ten
                : ""}
            </span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span>{t("thuNgan.nguoiXuatHoaDon")}:</span>
            <span className="bold"> {thongTinHoaDon?.tenNguoiPhatHanhHd}</span>
          </div>
          <div>
            <span>{t("thuNgan.ngayXuatHoaDon")}: </span>
            <span className="bold">
              {moment(thongTinHoaDon?.thoiGianPhatHanhHd).format(
                "YYYY/MM/DD HH:mm:ss"
              )}
            </span>
          </div>
          <div>
            <span>{t("thuNgan.ngayXoaHoaDon")}: </span>
            <span className="bold">
              {thongTinHoaDon?.thoiGianXoaHd &&
                moment(thongTinHoaDon?.thoiGianXoaHd).format(
                  "YYYY/MM/DD HH:mm:ss"
                )}
            </span>
          </div>
        </div>
      )}
      <div className="total-money">
        <div className="lable">{t("thuNgan.tongTienThanhToan")}</div>
        <div className="money">
          {typeHoaDon == 3 ? tongTien.formatPrice() : price?.formatPrice() || 0}
        </div>
      </div>
    </Main>
  );
};

export default ThongTinHoaDon;
