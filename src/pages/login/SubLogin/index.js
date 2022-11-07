import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryString } from "hook";
import { Main } from "./styled";
import { HOST } from "client/request";
import { Button, Select } from "components";
import Input from "../Input";
const SubLogin = (props) => {
  const [taiKhoan, settaiKhoan] = useState("");
  const [matKhau, setmatKhau] = useState("");
  const [ngonNgu, setNgonNgu] = useState("vi");
  const [redirect] = useQueryString("redirect", "");
  const [username] = useQueryString("username", "");

  const auth = useSelector((state) => state.auth.auth);
  const benhVien = useSelector((state) => state.thietLap.benhVien);
  // const {width, height} = useSelector((state) => state.application);
  // useEffect(()=>{
  //   alert(`${width} - ${height}`);
  // },[width, height])

  const {
    auth: { onLogin },
    thietLap: { getBenhVien },
  } = useDispatch();

  useEffect(() => {
    if (auth?.id) window.location.href = "/";
    getBenhVien();
  }, []);
  const onHandleLogin = () => {
    onLogin({
      taiKhoan: taiKhoan.trim(),
      matKhau: matKhau?.toMd5(),
      ngonNgu: ngonNgu,
    }).then(() => {
      if (username) {
        if (taiKhoan == username) {
          if (props.history)
            props.history.replace(decodeURIComponent(redirect || "/"));
          else window.location.href = decodeURIComponent(redirect || "/");
        } else {
          if (props.history) props.history.replace(decodeURIComponent("/"));
          else window.location.href = decodeURIComponent("/");
        }
      } else {
        if (props.history)
          props.history.replace(decodeURIComponent(redirect || "/"));
        else window.location.href = decodeURIComponent(redirect || "/");
      }
    });
  };
  const onKeyDown = (e) => {
    if (e.nativeEvent.code == "Enter" || e.nativeEvent.code == "NumpadEnter") {
      taiKhoan &&
        taiKhoan.length &&
        matKhau &&
        matKhau.length &&
        onHandleLogin();
    }
  };
  return (
    <Main xs={24} lg={12} xl={12} className="content-left">
      <div className="login-body">
        <div className="head-login">
          <a href="#" className="logo-login">
            <img
              src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
              alt=""
              className="img-title"
            />
          </a>
          <h2 className="title-login">{benhVien?.ten}</h2>
        </div>
        <div className="login-inner">
          <div className="title-form-login">
            <h3>Hôm nay bạn thế nào?</h3>
            <h4>
              Vui lòng <b>Đăng nhập</b>
            </h4>
          </div>
          <Input
            icon={require("assets/images/login/icon_account.png")}
            onChange={(e) => settaiKhoan(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Tên tài khoản"
          />
          <Input
            icon={require("assets/images/login/icon_password.png")}
            autoComplete="off"
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => setmatKhau(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              marginTop: 10,
            }}
          >
            <span style={{ fontWeight: "bold" }}>Ngôn ngữ/ Language:</span>
            <Select
              clearIcon={null}
              allowClear={true}
              value={ngonNgu}
              style={{ minWidth: 200, marginLeft: 10 }}
              data={[
                { ten: "Tiếng Việt (Vietnamese)", id: "vi" },
                { ten: "Tiếng Anh (English)", id: "en" },
              ]}
              onChange={setNgonNgu}
            ></Select>
          </div>

          <div className="action">
            <Button
              type="primary"
              onClick={onHandleLogin}
              className="btn-login"
            >
              {"Đăng nhập"}
              <img
                className="img-login"
                src={require("assets/images/login/icon-arrow-login.png")}
                alt="..."
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="thuongHieu">
        <div className="thuongHieu-box-content">
          <span>Cung cấp bởi</span>
          <div className="box-image">
            <img
              className="img-product"
              src={`${HOST}/api/his/v1/files/${benhVien.logoThuongHieu}`}
              alt="..."
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default SubLogin;
