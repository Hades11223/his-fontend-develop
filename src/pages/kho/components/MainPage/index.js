import React from "react";
import { Main } from "./styled";

const MainPage = ({ title, titleRight, children, ...props }) => {
  return (
    <Main className="main-page">
      <div className="header-page">
        <div className="title-category">{title}</div>
        {titleRight}
      </div>
      {children}
    </Main>
  );
};

export default MainPage;
