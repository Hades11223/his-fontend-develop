import React, { useState, useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import QrCode from "./Bottom";
import { Wrapper } from "./styled";
import { ModalWarning } from "pages/qms/components/ModalWarning";
import Interval from "pages/qms/getInterval";
import { useStore } from "hook";

const KhamBenh = (props) => {
  let kioskId = window.location.search.getQueryStringHref("kioskId");
  const WarningRef = useRef();
  const {
    kiosk: { getById },
    qms: { getDsNguoiBenhTiepDon },
  } = useDispatch();
  const listNbTiepDon = useStore("qms.listNbTiepDon", []);
  const currentKiosk = useStore("kiosk.currentKiosk", {});

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getById(kioskId);
  }, []);

  useEffect(() => {
    if (currentKiosk?.quayTiepDonId) {
      getDsNguoiBenhTiepDon(currentKiosk.quayTiepDonId);
    }
  }, [currentKiosk.phongId]);

  useEffect(() => {
    setState({
      dsDangThucHien: listNbTiepDon?.dsDangThucHien,
      dsTiepTheo: listNbTiepDon?.dsTiepTheo,
      dsGoiNho: listNbTiepDon?.dsGoiNho,
    });
  }, [JSON.stringify(listNbTiepDon)]);

  Interval.UseInterval(getDsNguoiBenhTiepDon, currentKiosk?.quayTiepDonId);

  return (
    <Wrapper>
      <Header currentKiosk={currentKiosk} />
      <Body
        currentKiosk={currentKiosk}
        dsDangThucHien={state?.dsDangThucHien}
        dsTiepTheo={state?.dsTiepTheo}
        dsGoiNho={state?.dsGoiNho}
      />
      <QrCode />
      <ModalWarning ref={WarningRef} />
    </Wrapper>
  );
};

export default memo(KhamBenh);
