import React from "react";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { Main } from "./styled";

const InputSearch = ({ children, minHeight, ...props }, ref) => {
  return (
    <Main minheight={minHeight}>
      <div className="search-area">
        <img src={IconSearch} alt="IconSearch" className="icon-search" />
        {children}
      </div>
    </Main>
  );
};

export default InputSearch;
