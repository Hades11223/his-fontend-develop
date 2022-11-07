import React, { useState, useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import Body from "./body";
import QrCode from "./qrCode";
import { Wrapper } from "./styled";
import { ModalWarning } from "pages/qms/components/ModalWarning";
import { message } from "antd";
import Interval from "pages/qms/getInterval";

const KhamBenh = (props) => {
  let kioskId = window.location.search.getQueryStringHref("kioskId");
  const WarningRef = useRef();
  const {
    qms: { listNbKham },
    nhanVien: { listNhanVien },
    phong: { listRoom = [], currentRoom = {} },
    khoa: { listKhoa },
    kiosk: { currentKiosk },
    chuyenKhoa: { currentChuyenKhoa },
  } = useSelector((state) => state);
  const {
    qms: { checkInKham, getDsNguoiBenhKhamQms },
    nhanVien: { getListNhanVienTongHop },
    phong: { getListPhong, getById },
    khoa: { getListKhoa },
    kiosk: { getById: getByIdKiosk },
    chuyenKhoa: { getById: getByIdChuyenKhoa },
  } = useDispatch();

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
      getDsNguoiBenhKhamQms(currentKiosk.phongId);
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
      checkInKham(params).then((s) => {
        if (s?.data?.khongThanhCong?.length) {
          WarningRef.current && WarningRef.current.show();
        } else {
          message.success("CheckIn dữ liệu thành công!");
        }
      });
      setState({ inputValue: "" });
    }
  };

  // const sendMessage = (msg) => {
  //   clientRef.current && clientRef.current.sendMessage("/topics/qms", msg);
  // };

  useEffect(() => {
    setState({
      dsDaXacNhan: listNbKham?.dsDaXacNhan,
      dsDangThucHien: listNbKham?.dsDangThucHien,
      dsTiepTheo: listNbKham?.dsTiepTheo,
      dsChoXacNhan: listNbKham?.dsChoXacNhan,
      dsGoiNho: listNbKham?.dsGoiNho,
    });
  }, [JSON.stringify(listNbKham)]);
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

  Interval.UseInterval(getDsNguoiBenhKhamQms, currentKiosk.phongId);

  return (
    <Wrapper>
      <Header
        tenPhong={listRoom.find((x) => x.id === currentKiosk.phongId)?.ten}
        tenKhoa={listKhoa.find((x) => x.id === currentKiosk.khoaId)?.ten}
        currentKiosk={currentKiosk}
        iconChuyenKhoa={currentChuyenKhoa?.logo}
        listNhanVien={listNhanVien}
      />
      <Body
        currentKiosk={currentKiosk}
        listNhanVien={listNhanVien}
        dsDaXacNhan={state?.dsDaXacNhan}
        dsDangThucHien={state?.dsDangThucHien}
        dsTiepTheo={state?.dsTiepTheo}
        dsChoXacNhan={state?.dsChoXacNhan}
        dsGoiNho={state?.dsGoiNho}
      />
      <QrCode onChangeQr={handleChangeQr} inputValue={state.inputValue} />
      {/* {webSocket} */}
      <ModalWarning ref={WarningRef} />
    </Wrapper>
  );
};

export default memo(KhamBenh);
