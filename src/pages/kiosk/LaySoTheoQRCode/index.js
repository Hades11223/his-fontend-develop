import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import IcQr from "assets/images/kiosk/icQr.png";
import { KiosWrapper } from "../components";
import { MainWrapper } from "./styled";
import { Row, Col } from "antd";
import AuthWrapper from "components/AuthWrapper";
import editImg from "assets/images/kiosk/edit.png";
import xacnhanImg from "assets/images/kiosk/xacnhan.png";
import addNewImg from "assets/images/kiosk/kham-bhyt.png";

const LaySoTheoQRCode = (props) => {
  const { step, data: dataPatient } = useSelector((state) => state.kios);
  const { listgioiTinh: listGioiTinh } = useSelector((state) => state.utils);
  const { updateData, getNumber, searchMaNbKiosk } = useDispatch().kios;
  const { getUtils } = useDispatch().utils;

  const inputElement = useRef(null);
  const history = useHistory();
  const [isSearched, setSearch] = useState(false);
  const [state, _setState] = useState({
    maDinhDanh: "",
  });

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  useEffect(() => {
    getUtils({ name: "gioiTinh" });
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const onGetNumberSuccess = () => {
    history.push("/kiosk/lay-so");
  };

  const searchMaThe = (value) => {
    let param = "";
    let check = value?.trim();
    if (check) {
      if (/^[0-9]+$/.test(check)) {
        param = { maNb: Number(check) };
      } else {
        let arr = value.split(",");
        let checkMaNb = arr.filter((el) => {
          let convertEl = el.includes("”") ? el.split("”") : el.split('"');
          return convertEl.some((et) => et === "maNb");
        });
        checkMaNb = (checkMaNb.length && checkMaNb[0]) || "";
        let paramRes = checkMaNb
          ? checkMaNb.includes("”")
            ? checkMaNb.split("”")
            : checkMaNb.split('"')
          : [];
        paramRes = paramRes.filter((et) => /^[0-9]+$/.test(et));
        if (paramRes.length) {
          param = { maNb: Number(paramRes[0]) };
        }
      }
    }
    setSearch(true);
    searchMaNbKiosk(param);
  };

  const onSearchMaThe = (e) => {
    if (e.key === "Enter") {
      searchMaThe(state.maDinhDanh);
    }
  };

  const onEdit = (info) => () => {
    updateData({
      infoGetNumber: info,
      step: step + 1,
    });
    history.push("/kiosk/cap-nhat-thong-tin");
  };

  const onAddNew = () => {
    updateData({
      step: step + 1,
    });
    history.push("/kiosk/dang-ky-kham-benh");
  };

  const onGetNumber = (info) => () => {
    info.tinhThanhPho = null;
    info.quanHuyen = null;
    info.xaPhuong = null;
    updateData({
      infoGetNumber: info,
      step: step + 2,
    });
    getNumber({ callback: onGetNumberSuccess, ...info });
  };
  const showAddNew = isSearched;

  const getDiaChi = (dataPatient) => {
    dataPatient = dataPatient?.nbDiaChi || {};
    let diaChi = dataPatient?.diaChi || "";
    if (!diaChi) {
      if (dataPatient.xaPhuong) diaChi += `${dataPatient.xaPhuong}, `;
      if (dataPatient.quanHuyen) diaChi += `${dataPatient.quanHuyen}, `;
      if (dataPatient.tinhThanhPho) diaChi += `${dataPatient.tinhThanhPho}`;
    }
    return diaChi;
  };

  return (
    <KiosWrapper showBtnBack step={step}>
      <MainWrapper>
        <div className="top">
          <div className="header">
            <div className="title">
              <div className="title-tiepdon">
                <h4>
                  Nhập “Mã người bệnh” hoặc Quét QR Code (đã có ở lần khám
                  trước)
                </h4>
              </div>
            </div>
            <div className="qr">
              <input
                placeholder="Mã người bệnh"
                ref={inputElement}
                value={state.maDinhDanh}
                onKeyDown={onSearchMaThe}
                onChange={(e) => setState({ maDinhDanh: e.target.value })}
              />
              <div className="qr-icon">
                <img src={IcQr} alt="magnifyImg" />
              </div>
            </div>
          </div>
        </div>
        <div className="result">
          {isSearched && dataPatient && (
            <div className="title">Vui lòng xác nhận thông tin</div>
          )}
          <div className="list">
            {isSearched && dataPatient && (
              <div className="data-list">
                <div className="card">
                  <Row>
                    <Col span={15}>
                      <div className="info">
                        <p className="name">
                          {dataPatient?.tenNb} -{" "}
                          {
                            (listGioiTinh || []).find(
                              (x) => x.id === dataPatient?.gioiTinh
                            )?.ten
                          }
                        </p>
                        <div className="sub-info">
                          <p>Sđt: {dataPatient?.soDienThoai}</p>
                          <p>
                            Ngày sinh:{" "}
                            {dataPatient?.ngaySinh
                              ? moment(dataPatient.ngaySinh).format(
                                  "DD/MM/YYYY"
                                )
                              : null}
                          </p>
                          <p>Địa chỉ: {getDiaChi(dataPatient)}</p>
                        </div>
                      </div>
                    </Col>
                    <Col span={9}>
                      <div className="btn-action">
                        <AuthWrapper accessRoles={["kiosk_sua_ketQua"]}>
                          <div
                            className="btn edit"
                            onClick={onEdit(dataPatient)}
                          >
                            <span>Sửa</span> <img src={editImg} alt="editImg" />
                          </div>
                        </AuthWrapper>
                        <AuthWrapper accessRoles={["kiosk_xacNhan_ketQua"]}>
                          <div
                            className="btn confirm"
                            onClick={onGetNumber(dataPatient)}
                          >
                            <span>Xác nhận</span>{" "}
                            <img src={xacnhanImg} alt="xacnhanImg" />
                          </div>
                        </AuthWrapper>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
            {showAddNew && (
              <AuthWrapper accessRoles={["kiosk_dangKy_thongTinMoi"]}>
                <div className="btn-add-new" onClick={onAddNew}>
                  <div className="img">
                    <img src={addNewImg} alt="addNewImg" />
                  </div>
                  <div className="text">
                    <div>Không có thông tin của tôi</div>
                    <span>(Tôi muốn đăng ký mới)</span>
                  </div>
                </div>
              </AuthWrapper>
            )}
          </div>
        </div>
      </MainWrapper>
    </KiosWrapper>
  );
};

export default LaySoTheoQRCode;
