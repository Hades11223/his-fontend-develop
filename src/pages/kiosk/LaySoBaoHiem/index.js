import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import qrcodeImg from "assets/images/kiosk/qrcode.png";
import quetTheImg from "assets/images/kiosk/quet-the.png";
import arrowImg from "assets/images/kiosk/arrow.png";
import { KiosWrapper } from "../components";
import { hexToUtf8 } from "utils";
import { MainWrapper } from "./styled";

const LaySoBaoHiem = (props) => {
  const { step, uuTien, doiTuong } = useSelector((state) => state.kios);
  const { getNumber } = useDispatch().kios;

  const inputElement = useRef(null);
  const history = useHistory();
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
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const onGetNumberSuccess = () => {
    history.push("/kiosk/lay-so");
  };

  const searchMaThe = (value) => {
    const array = value.split("|");
    const day = array[2].split("/");
    const dateOfBirth = `${day[2]}/${day[1]}/${day[0]}`;
    const ten = hexToUtf8(array[1]);
    const data = {
      maTheBhyt: array[0],
      tenNb: ten,
      gioiTinh: parseInt(array[3]),
      ngaySinh: moment(dateOfBirth, "YYYY/MM/DD").format(),
      uuTien,
      doiTuong,
    };

    getNumber({ callback: onGetNumberSuccess, ...data });
  };

  const onSearchMaThe = (e) => {
    if (e.key === "Enter") {
      searchMaThe(state.maDinhDanh);
    }
  };

  const addInfo = () => {
    history.push("/kiosk/dang-ky-kham-benh");
  };
  return (
    <KiosWrapper showBtnBack step={step}>
      <MainWrapper>
        <div className="top">
          <div className="header">
            <div className="title">
              {doiTuong === 2 ? (
                <div className="title-tiepdon-bhyt">
                  <h4>
                    Xin mời đặt thẻ BHYT trước camera của thiết bị để Quét QR
                    Code!
                  </h4>
                </div>
              ) : (
                <div className="title-tiepdon">
                  <h4>Kiosk tiếp đón khám bệnh tự động</h4>
                </div>
              )}
              {doiTuong === 2 ? (
                <></>
              ) : (
                <div className="title-quetqr">
                  <h1>Vui lòng quét mã định danh</h1>
                </div>
              )}
            </div>
            <div className="qr">
              <input
                placeholder={doiTuong === 2 ? "Mã thẻ BHYT" : "Mã QR"}
                ref={inputElement}
                value={state.maDinhDanh}
                onKeyDown={onSearchMaThe}
                onChange={(e) => setState({ maDinhDanh: e.target.value })}
              />
              <div className="qr-icon">
                <img src={qrcodeImg} alt="magnifyImg" />
              </div>
            </div>
            <div>
              <span className="hoac">Hoặc</span>
            </div>
            <div className="action-button">
              <button className="btn" onClick={addInfo}>
                Cung cấp thông tin sau
              </button>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="wrapper">
            <div className="img">
              <img src={quetTheImg} alt="qrimageImg" />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-text">
            Xin mời đặt thẻ BHYT trước camera bên dưới!
          </div>
          <div className="image">
            <img src={arrowImg} alt="arrowImg" />
          </div>
        </div>
      </MainWrapper>
    </KiosWrapper>
  );
};

export default LaySoBaoHiem;
