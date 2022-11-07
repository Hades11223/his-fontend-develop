import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "components/AuthWrapper";
import { Row, Col } from "antd";
import magnifyImg from "assets/images/kiosk/magnify.png";
import deleteImg from "assets/images/kiosk/delete.png";
import editImg from "assets/images/kiosk/edit.png";
import xacnhanImg from "assets/images/kiosk/xacnhan.png";
import addNewImg from "assets/images/kiosk/kham-bhyt.png";
import { KiosWrapper } from "../components";
import { MainWrapper } from "./styled";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const EnrollPhoneNumber = (props) => {
  const { step, uuTien, doiTuong } = useSelector((state) => state.kios);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const {
    information: { checkTrungThongTin },
    kios: { updateData, getNumber },
  } = useDispatch();

  const inputElement = useRef(null);
  const history = useHistory();
  const { type = "dienthoai" } = useParams();
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [isSearched, setSearch] = useState(false);

  const isNumber = (value) => {
    const regex = /^[0-9\b]+$/;
    return regex.test(value);
  };

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const formattedText = {
    dienthoai: {
      title: "Nhập số điện thoại",
      subtitle: "SĐT",
    },
    cmnd: {
      title: "Nhập số CMND",
      subtitle: "CMND",
    },
  };

  const onAddNew = () => {
    updateData({
      step: step + 1,
    });
    history.push("/kiosk/dang-ky-kham-benh");
  };

  const handleOnchange = (e) => {
    setNumber(e.target.value);
    setSearch(false);
  };

  const handleSearch = () => {
    setSearch(true);
    if (type === "dienthoai") {
      const invalidPhoneNumber = !number?.replaceAll(" ", "").isPhoneNumber();
      if (invalidPhoneNumber || !number) return;
    } else {
      if (!isNumber(number)) return;
    }

    const body =
      type === "dienthoai"
        ? { soDienThoai: number }
        : { maSoGiayToTuyThan: number };
    checkTrungThongTin(body).then((s) => {
      if (s?.code === 0 && s?.data?.length) {
        setData(s.data);
      } else {
        setData([]);
      }
    });
  };

  const onGetNumberSuccess = () => {
    history.push("/kiosk/lay-so");
  };

  const onEdit = (info) => () => {
    updateData({
      infoGetNumber: info,
      step: step + 1,
    });
    history.push("/kiosk/cap-nhat-thong-tin");
  };

  const handleClear = () => {
    setSearch(false);
    setNumber("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onGetNumber = (info) => () => {
    info.tinhThanhPho = null;
    info.quanHuyen = null;
    info.xaPhuong = null;
    updateData({
      infoGetNumber: info,
      step: step + 2,
    });
    getNumber({ callback: onGetNumberSuccess, ...info, uuTien, doiTuong });
  };
  const invalidPhoneNumber =
    type === "dienthoai" &&
    number &&
    !number.replaceAll(" ", "").isPhoneNumber();
  const invalidCMND =
    (type === "cmnd" && number && !isNumber(number)) ||
    (type === "cmnd" && number === "0");
  const showAddNew =
    (isSearched && number && !invalidPhoneNumber && type === "dienthoai") ||
    (isSearched && number && !invalidCMND && type === "cmnd");
  return (
    <KiosWrapper showBtnBack step={step}>
      <MainWrapper>
        <div className="header">
          <div className="title">{formattedText[type].title}</div>
          <div className="sub-title">
            (Lưu ý: Nên nhập {formattedText[type].subtitle} đã sử dụng trong các
            lần khám trước)
          </div>
        </div>
        <div className="btn-search">
          <input
            value={number}
            placeholder={formattedText[type].title}
            onChange={handleOnchange}
            onKeyDown={handleKeyDown}
            ref={inputElement}
          />
          {number && (
            <div className="delete-icon" onClick={handleClear}>
              <img src={deleteImg} alt="deleteImg" />
            </div>
          )}
          <div className="search-icon" onClick={handleSearch}>
            <img src={magnifyImg} alt="magnifyImg" />
          </div>
        </div>
        {isSearched && invalidPhoneNumber ? (
          <div className="error-msg">Số điện thoại sai định dạng!</div>
        ) : null}
        {isSearched && invalidCMND && (
          <div className="error-msg">Số CMND sai định dạng!</div>
        )}
        <div className="result">
          {isSearched && data?.length > 0 && (
            <div className="title">Vui lòng xác nhận thông tin</div>
          )}
          <div className="list">
            <div className="data-list">
              {data.map((record, idx) => {
                let diaChi = record.diaChi;
                if (!diaChi) {
                  if (record.xaPhuong) diaChi += `${record.xaPhuong}, `;
                  if (record.quanHuyen) diaChi += `${record.quanHuyen}, `;
                  if (record.tinhThanhPho) diaChi += `${record.tinhThanhPho}`;
                }
                const gender =
                  (listGioiTinh || []).find(
                    (item) => item.id === record.gioiTinh
                  ) || {};
                return (
                  <div className="card" key={`${idx}-${record.maHoSo}`}>
                    <Row>
                      <Col span={15}>
                        <div className="info">
                          <p className="name">
                            {record.tenNb} - {gender.ten}
                          </p>
                          <div className="sub-info">
                            <p>Sđt: {record.soDienThoai}</p>
                            <p>
                              Ngày sinh:{" "}
                              {record?.ngaySinh
                                ? moment(record.ngaySinh).format("DD/MM/YYYY")
                                : null}
                            </p>
                            <p>Địa chỉ: {diaChi}</p>
                          </div>
                        </div>
                      </Col>
                      <Col span={9}>
                        <div className="btn-action">
                          <AuthWrapper accessRoles={["kiosk_sua_ketQua"]}>
                            <div className="btn edit" onClick={onEdit(record)}>
                              <span>Sửa</span>{" "}
                              <img src={editImg} alt="editImg" />
                            </div>
                          </AuthWrapper>
                          <AuthWrapper accessRoles={["kiosk_xacNhan_ketQua"]}>
                            <div
                              className="btn confirm"
                              onClick={onGetNumber(record)}
                            >
                              <span>Xác nhận</span>{" "}
                              <img src={xacnhanImg} alt="xacnhanImg" />
                            </div>
                          </AuthWrapper>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
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

export default EnrollPhoneNumber;
