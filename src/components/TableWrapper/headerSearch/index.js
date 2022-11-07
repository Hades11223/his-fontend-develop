import React from "react";
import HeaderSortable from "../HeaderSortable";
import imgSearch from "assets/images/template/icSearch.png";
import { Main } from "./styled";
const HeaderSearch = (props) => {
  const {
    title,
    dataSort,
    sort_key,
    onClickSort,
    require,
    style,
    noSearch,
    className = "d-flex justify-content-center",
    isTitleCenter = false,
  } = props;
  return (
    <Main className="custome-header">
      <HeaderSortable
        title={title}
        showSort={sort_key ? true : false}
        dataSort={dataSort}
        sort_key={sort_key}
        onClick={onClickSort}
        require={require}
        className={className + (isTitleCenter ? " center" : "")}
        style={style}
      />
      {noSearch && <div className="addition-box"></div>}
      {!!props.search && (
        <div className="addition-box">
          <div className="input-box">
            <img src={imgSearch} alt="imgSearch" />
            {props.search}
          </div>
        </div>
      )}
      {!!props.searchSelect && (
        <div className="addition-box">{props.searchSelect}</div>
      )}
      {!!props.searchDate && (
        <div className="addition-box">{props.searchDate}</div>
      )}
    </Main>
  );
};

export default HeaderSearch;
