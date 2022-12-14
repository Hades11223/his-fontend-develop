import React, { useState, useEffect, useRef, useMemo } from "react";
import { connect } from "react-redux";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import QrCode from "./qrCode";
import { Wrapper } from "./styled";
// import SockJsClient from "react-stomp";
import { HOST } from "client/request";
import { ModalWarning } from "pages/qms/components/ModalWarning";
import { message } from "antd";
import { useInterval } from "hook";
import Interval from "pages/qms/getInterval";

const ChanDoanHinhAnh = (props) => {
  const {
    checkInCLS,
    getDsNguoiBenhCLSQms,
    listNbCls,
    listNhanVien,
    getListNhanVienTongHop,
    listKhoa,
    listRoom,
    getListKhoa,
    getListPhong,
    getByIdKiosk,
    currentKiosk,
    auth,
    getByIdChuyenKhoa,
    getById,
    currentChuyenKhoa,
    currentRoom
  } = props;
  let kioskId = window.location.search.getQueryStringHref("kioskId");
  const clientRef = useRef();
  const WarningRef = useRef();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListNhanVienTongHop({});
    getListKhoa({});
    getListPhong({});
    getByIdKiosk(kioskId);
  }, []);
  useEffect(() => {
    if (currentKiosk.phongId) {
      getDsNguoiBenhCLSQms(currentKiosk.phongId);
      getById(currentKiosk.phongId);
    }
  }, [currentKiosk.phongId]);

  useEffect(() => {
    if (currentRoom.chuyenKhoaId) {
      getByIdChuyenKhoa(currentRoom.chuyenKhoaId);
    }
  }, [currentRoom.chuyenKhoaId]);

  const handleChangeQr = (e) => {
    const maHoSo = e.target.value ? e.target.value : "";
    const params = {
      maHoSo: maHoSo,
      phongThucHienId: currentKiosk.phongId ? currentKiosk.phongId : "",
    };

    setState({ inputValue: maHoSo });
    if (maHoSo.length === 10) {
      checkInCLS(params).then((s) => {
        if(s?.data?.khongThanhCong?.length) {
          WarningRef.current && WarningRef.current.show();
        } else {
          message.success("CheckIn d??? li???u th??nh c??ng!");
        }
      });
      setState({inputValue : ""})
    }
  };

  const sendMessage = (msg) => {
    clientRef.current && clientRef.current.sendMessage("/topics/qms", msg);
  };

  useEffect(() => {
    setState({
      dsDaXacNhan: listNbCls?.dsDaXacNhan,
      dsDangThucHien: listNbCls?.dsDangThucHien,
      dsTiepTheo: listNbCls?.dsTiepTheo,
      dsChoXacNhan: listNbCls?.dsChoXacNhan,
      dsGoiNho: listNbCls?.dsGoiNho,
    });
  }, [listNbCls]);
  // const webSocket = useMemo(() => {
  //   return (
  //     <SockJsClient
  //       url={`${HOST}/api/his/v1/ws/?access_token=${auth?.access_token}`}
  //       topics={[`/topic/qms.${currentKiosk.phongId}`]}
  //       onConnect={() => {
  //         console.log("connected");
  //       }}
  //       onDisconnect={() => {
  //         console.log("Disconnected");
  //       }}
  //       onMessage={(msg) => {
  //         setState({
  //           dsDaXacNhan: msg.dsDaXacNhan || [],
  //           dsDangThucHien: msg.dsDangThucHien || [],
  //           dsTiepTheo: msg.dsTiepTheo || [],
  //           dsChoXacNhan: msg.dsChoXacNhan || [],
  //           dsGoiNho: msg.dsGoiNho || [],
  //         });
  //       }}
  //       ref={(client) => {
  //         sendMessage(client);
  //       }}
  //       getRetryInterval={() => {
  //         return 30000;
  //       }}
  //     />
  //   );
  // }, [currentKiosk.phongId, auth]);

  Interval.UseInterval(getDsNguoiBenhCLSQms,currentKiosk.phongId);

  return (
    <Wrapper>
      <Header
        tenPhong={listRoom.find((x) => x.id == currentKiosk.phongId)?.ten}
        tenKhoa={listKhoa.find((x) => x.id == currentKiosk.khoaId)?.ten}
        currentKiosk={currentKiosk}
        iconChuyenKhoa={currentChuyenKhoa?.logo}
      />
      <Body
        currentKiosk={currentKiosk}
        listNhanVien={listNhanVien}
        dsDaXacNhan={state?.dsDaXacNhan}
        dsDangThucHien={state?.dsDangThucHien}
        dsTiepTheo={state?.dsTiepTheo}
        dsChoXacNhan={state?.dsChoXacNhan}
      />
      <Footer dsGoiNho={listNbCls?.dsGoiNho} />
      <QrCode onChangeQr={handleChangeQr} inputValue={state.inputValue} />
      {/* {webSocket} */}
      <ModalWarning ref={WarningRef} top={100}/>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  const {
    qms: { listNbCls },
    nhanVien: { listNhanVien },
    phong: { listRoom = [], currentRoom = {} },
    khoa: { listKhoa },
    kiosk: { currentKiosk },
    chuyenKhoa: { currentChuyenKhoa = {}},
  } = state;

  return {
    listNbCls,
    listNhanVien,
    listKhoa,
    listRoom,
    currentKiosk,
    auth: state.auth.auth,
    currentChuyenKhoa,
    currentRoom
  };
};
const mapDispatchToProps = ({
  qms: { checkInCLS, getDsNguoiBenhCLSQms },
  nhanVien: { getListNhanVienTongHop },
  phong: { getListPhong, getById },
  khoa: { getListKhoa },
  kiosk: { getById : getByIdKiosk },
  chuyenKhoa: { getById: getByIdChuyenKhoa },
}) => ({
  checkInCLS,
  getDsNguoiBenhCLSQms,
  getListNhanVienTongHop,
  getListPhong,
  getListKhoa,
  getByIdKiosk,
  getById,
  getByIdChuyenKhoa
});
export default connect(mapStateToProps, mapDispatchToProps)(ChanDoanHinhAnh);
