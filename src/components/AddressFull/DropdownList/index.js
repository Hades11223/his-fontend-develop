import React, { useState, useEffect, useRef } from "react";
import T from "prop-types";
import { Main } from "./styled";
const DropdownList = (props) => {
  const { listData, onClick, size, closeDropList, onFocus } = props;
  const refDropList = useRef();
  const [state, _setState] = useState({
    active: 0,
    page: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { active, page } = state;

  useEffect(() => {
    window.addEventListener("keyup", keyDownSelectItem);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keyup", keyDownSelectItem);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.active, state.pag, listData]);

  const keyDownSelectItem = (e) => {
    e.preventDefault();
    let itemTop = 0;
    if (e.keyCode === 40) {
      if (state.active + 1 < listData?.length) {
        itemTop =
          document.getElementById(`itemScroll${state.active}`) &&
          document.getElementById(`itemScroll${state.active}`).offsetTop + 31;
        const clientHeight = refDropList.current.clientHeight;
        if (parseInt(itemTop) > parseInt(clientHeight)) {
          refDropList.current.scrollTop = itemTop;
          setState({ page: page + 1 });
        }
        setState({ active: state.active + 1 });
      }
    }
    if (e.keyCode === 38) {
      const nextIndex = active > 0 ? active - 1 : active;
      itemTop =
        document.getElementById(`itemScroll${active}`) &&
        document.getElementById(`itemScroll${active}`).offsetTop - 31;
      refDropList.current.scrollTop = itemTop;
      setState({ active: nextIndex });
    }
    if (e.keyCode === 13) {
      onClick(listData[active]);
    }
  };
  const onScroll = (e) => {
    let element = e.target ? e.target : e;
    if (
      parseInt(element.scrollHeight) - parseInt(element.scrollTop) ===
      parseInt(element.clientHeight)
    ) {
      if (page * size < listData.length) {
        setState({ page: page + 1 });
      }
    }
  };
  const handleClickOutside = (event) => {
    if (refDropList.current && !refDropList.current.contains(event.target)) {
      closeDropList();
    }
  };
  return (
    <Main
      onFocus={onFocus}
      className="list-hospital popup-list mostly-customized-scrollbar display-lists"
      onScroll={onScroll}
      ref={refDropList}
    >
      {listData
        .filter((item, index) => index < page * size)
        .map((item, index) => {
          return (
            <li
              className={active === index ? "active-item" : ""}
              id={`itemScroll${index}`}
              key={index}
              onClick={() => onClick(item)}
            >
              {item.displayText}
            </li>
          );
        })}
    </Main>
  );
};

DropdownList.defaultProps = {
  listData: [],
  onClick: () => {},
};

DropdownList.propTypes = {
  listData: T.arrayOf(T.shape({})),
  onClick: T.func,
};

export default DropdownList;
