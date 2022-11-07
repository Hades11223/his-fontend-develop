import React, { useState } from "react";
import { StyleBody } from "./styled";
import TopContent from "./TopContent";
import MiddleContent from "./MiddleContent";
import { useStore } from "hook";

function Body() {
  const dataSearch = useStore("kiosk.dataSearch", {});
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onQuayTiepDon = (item) => {
    setState({ quayTiepDonId: item });
  };
  return (
    <StyleBody>
      <TopContent onQuayTiepDon={onQuayTiepDon} />
      {dataSearch.loaiQms && (state?.quayTiepDonId || dataSearch.phongId) && (
        <MiddleContent />
      )}
    </StyleBody>
  );
}

export default Body;
