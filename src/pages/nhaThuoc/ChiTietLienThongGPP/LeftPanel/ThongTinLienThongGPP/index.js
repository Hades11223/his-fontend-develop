import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import { Main } from "./styled";
import { Card } from "components";
import moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY";

const ThongTinLienThongGPP = ({ layerId, ...props }) => {
  const { chiTietLienThong } = props;
  const refThongTin = useRef();

  //redux
  const {
    utils: { listgioiTinh = [], listLoaiNhapXuat = [] },
  } = useSelector((state) => state);

  const {
    phimTat: { onRegisterHotkey },
    utils: { getUtils },
  } = useDispatch();

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refThongTin.current && refThongTin.current.focus();
          },
        },
      ],
    });

    getUtils({ name: "gioiTinh" });
    getUtils({ name: "LoaiNhapXuat" });
  }, []);

  const _diaChi = chiTietLienThong?.nbDotDieuTri?.nbDiaChi?.diaChi;
  const _gioiTinh =
    listgioiTinh.find((x) => x.id === chiTietLienThong?.nbDotDieuTri?.gioiTinh)
      ?.ten || "";
  const _ngayPhat = moment(chiTietLienThong?.ngayPhat).format(DATE_FORMAT);
  const _title =
    chiTietLienThong?.loaiNhapXuat === 120
      ? "Liên thông hóa đơn bán thuốc"
      : chiTietLienThong?.loaiNhapXuat === 10
      ? "Liên thông phiếu nhập"
      : "Liên thông phiếu xuất";
  const _ngayNhap = moment(chiTietLienThong?.ngayNhap).format(DATE_FORMAT);
  const _ngayXuat = moment(chiTietLienThong?.ngayXuat).format(DATE_FORMAT);
  const _loaiNhapXuat =
    listLoaiNhapXuat.find((x) => x.id === chiTietLienThong?.loaiNhapXuat)
      ?.ten || "";

  return (
    <Card>
      <Main>
        <div>
          <Row className="title-thongTin">
            <Col span={12}>
              <div className="title">{_title}</div>
            </Col>
            <Col span={6}>
              <div>
                <Row>
                  <div className="field-value">
                    Tên kho:&emsp;{chiTietLienThong?.tenKho}
                  </div>
                </Row>
              </div>
            </Col>
          </Row>

          {/* Hóa đơn bán thuốc */}
          {chiTietLienThong?.loaiNhapXuat === 120 && (
            <>
              <Row>
                <div className="field-value">
                  Người bệnh:&emsp;{chiTietLienThong?.maNb} -{" "}
                  <b>
                    {chiTietLienThong?.tenNb} ({_gioiTinh}) -{" "}
                    {chiTietLienThong?.nbDotDieuTri?.tuoi
                      ? `${chiTietLienThong?.nbDotDieuTri?.tuoi}T - `
                      : ""}
                    {_diaChi}
                  </b>
                </div>
              </Row>

              <Row>
                <Col span={9}>
                  <Row>
                    <div className="field-value">
                      Số phiếu:&emsp;<b>{chiTietLienThong?.soPhieu}</b>
                    </div>
                  </Row>
                </Col>

                <Col span={9}>
                  <Row>
                    <div className="field-value">
                      Ngày phát:&emsp;<b>{_ngayPhat}</b>
                    </div>
                  </Row>
                </Col>

                <Col span={6}>
                  <Row>
                    <div className="field-value">
                      Người phát:&emsp;<b>{chiTietLienThong?.nguoiPhat}</b>
                    </div>
                  </Row>
                </Col>
              </Row>
            </>
          )}

          {/* Phiếu xuất */}
          {(chiTietLienThong?.loaiNhapXuat === 40 ||
            chiTietLienThong?.loaiNhapXuat === 90) && (
            <Row>
              <Col span={8}>
                <Row>
                  <div className="field-value">
                    Số phiếu:&emsp;<b>{chiTietLienThong?.soPhieu}</b>
                  </div>
                </Row>

                <Row>
                  <div className="field-value">
                    Ngày xuất:&emsp;<b>{_ngayXuat}</b>
                  </div>
                </Row>
              </Col>

              <Col span={16}>
                <Row>
                  <div className="field-value">
                    Loại phiếu xuất:&emsp;<b>{_loaiNhapXuat}</b>
                  </div>
                </Row>

                <Row>
                  <div className="field-value">
                    Nhà cung cấp:&emsp;<b>{chiTietLienThong?.nhaCungCap}</b>
                  </div>
                </Row>
              </Col>
            </Row>
          )}

          {/* Phiếu nhập */}
          {chiTietLienThong?.loaiNhapXuat === 10 && (
            <Row>
              <Col span={8}>
                <Row>
                  <div className="field-value">
                    Số phiếu:&emsp;<b>{chiTietLienThong?.soPhieu}</b>
                  </div>
                </Row>

                <Row>
                  <div className="field-value">
                    Ngày nhập:&emsp;<b>{_ngayNhap}</b>
                  </div>
                </Row>
              </Col>

              <Col span={16}>
                <Row>
                  <div className="field-value">
                    Loại phiếu nhập:&emsp;<b>{_loaiNhapXuat}</b>
                  </div>
                </Row>

                <Row>
                  <div className="field-value">
                    Nhà cung cấp:&emsp;<b>{chiTietLienThong?.nhaCungCap}</b>
                  </div>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      </Main>
    </Card>
  );
};

export default memo(ThongTinLienThongGPP);
