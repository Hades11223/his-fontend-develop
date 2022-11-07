import React from "react";
import { Main } from "./styled";
import FormInfo from "components/editor/config/FormInfo";

const Toolbar = (props) => {
  const { handleSubmit, setZoomValue, zoomValue } = props;

  return (
    <Main>
      <div className="toolbar">
        <FormInfo
          handleSubmit={handleSubmit}
          setZoomValue={setZoomValue}
          zoomValue={zoomValue}
        />
      </div>
    </Main>
  );
};

export default Toolbar;
