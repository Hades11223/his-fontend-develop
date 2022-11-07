import React, { useRef, useEffect } from "react";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { LazyLoad } from "components";
import { SplitPanel } from "components";

const KeDichVuKham = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const {
    phimTat: { onAddLayer, onRemoveLayer },
  } = useDispatch();
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  return (
    <Main>
      <SplitPanel>
        <LazyLoad
          component={import("./LeftPanel")}
          layerId={refLayerHotKey.current}
          className="body"
        />
        <LazyLoad
          component={import("./RightPanel")}
          layerId={refLayerHotKey.current}
        />
      </SplitPanel>
    </Main>
  );
};

export default KeDichVuKham;
