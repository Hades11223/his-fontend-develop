import React from "react";
import { Main } from "./styled";

const TabPanel = ({ children, ...props }) => {
  return (
    <Main {...props} className="tab-panel">
      {children}
    </Main>
  );
};

export default TabPanel;
