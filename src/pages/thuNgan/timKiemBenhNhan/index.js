import React, { useEffect, useRef } from "react";

import { Main, MainChart } from "./styled";
import { connect } from "react-redux";
import MainHeaderSearch from "./HeaderSearch";
import Chart from "assets/images/thuNgan/chart.png";
import NotifiSearch from "./notifiSearch";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const TimKiemBenhNhan = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  return (
    <Main>
      <MainHeaderSearch
        history={props.history}
        layerId={refLayerHotKey.current}
      />
      <NotifiSearch />
      <MainChart>
        <img src={Chart} alt="bieuDo" style={{ width: "100%" }} />
      </MainChart>
    </Main>
  );
};

export default TimKiemBenhNhan;
