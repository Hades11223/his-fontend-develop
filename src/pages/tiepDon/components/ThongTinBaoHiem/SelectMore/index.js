import React, { memo, useMemo, useEffect, useState, useRef } from "react";
import InputTimeout from "components/InputTimeout";
import { areEqual, FixedSizeList as CustomVirtualizeList } from "react-window";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";

const SelectMore = ({
  disabled,
  placeholder = "Nhập thông tin",
  data,
  onChange,
  className,
  value,
  valueTen,
  placement = "top",
  ...props
}) => {
  const refTimeOut = useRef(null);
  const refId = useRef(stringUtils.guid().replaceAll("-", ""));
  const refSelectTime = useRef(new Date());
  const refSelect = useRef(null);
  const refVirtualizeList = useRef([]);
  const refActive = useRef(0);

  const [state, _setState] = useState({
    inputValue: "",
    focus: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const getText = (currentRow) => {
    if (props.renderText) {
      return props.renderText(currentRow);
    }
    if (!currentRow) return "";
    return valueTen && currentRow[`${valueTen}`]
      ? `${currentRow[`${valueTen}`]} - ` + currentRow?.ten
      : "" + currentRow?.ten;
  };
  const getId = (currentRow) => {
    if (props.getId) return props.getId(currentRow);
    return currentRow?.id;
  };

  const filteredData = useMemo(() => {
    const text = state.inputValue?.toLowerCase().createUniqueText();
    return (data || []).filter((item) => {
      if (getText(item).toLowerCase().createUniqueText().indexOf(text) != -1)
        return true;
    });
  }, [data, value, state.inputValue]);

  useEffect(() => {
    refSelect.current.addEventListener("click", onClickItem);
    return () => {
      refSelect.current &&
        refSelect.current.removeEventListener("click", onClickItem);
    };
  }, [filteredData]);
  useEffect(() => {
    const item = data.find((item) => getId(item) == value);
    setState({ inputValue: getText(item), id: value });
  }, [value, data]);

  const onClickItem = (e) => {
    if (e.target.classList.contains("list-item")) {
      refActive.current = e.target.dataset["index"];
      refSelectTime.current = new Date();
      selectItem(refActive.current);
    }
  };
  useEffect(() => {
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, []);
  const RowItems = memo(({ index, style }) => {
    const currentRow = filteredData[index];
    return (
      <span
        style={style}
        className={`list-item`}
        data-ten={getText(currentRow)}
        data-id={currentRow?.id}
        data-index={index}
        key={index}
        id={refId.current + "_" + index}
        title={
          valueTen && currentRow[`${valueTen}`]
            ? `${currentRow[`${valueTen}`]} - ` + currentRow?.ten
            : "" + currentRow?.ten
        }
      >
        {valueTen && currentRow[`${valueTen}`]
          ? `${currentRow[`${valueTen}`]} - `
          : ""}
        {currentRow?.ten}
      </span>
    );
  }, areEqual);

  const onFocus = (e) => {
    if (state.focus) {
      refSelectTime.current = null;
    }
    setState({ focus: true });
    refActive.current = 0;
  };
  const onBlur = (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
    }
    refTimeOut.current = setTimeout(() => {
      if (refSelectTime.current && new Date() - refSelectTime.current < 2000)
        return;
      setState({ focus: false });
      if (filteredData[0]?.id != value && onChange) {
        onChange(state.inputValue ? filteredData[0]?.id : null);
      }
    }, 500);
  };
  const onClick = (e) => {
    refSelectTime.current = null;
    e.preventDefault();
    e.stopPropagation();
    if (!state.focus) setState({ focus: true });
  };
  useEffect(() => {
    refActive.current = 0;
  }, [state.focus]);
  const onKeyDown = (e) => {
    try {
      if (!refSelect.current) return;
      // e.preventDefault();
      let propsIndex = refVirtualizeList.current?.props || {};
      let stateIndex = refVirtualizeList.current?.state || {};
      clearSelected();
      let itemRef, indexscroll, itemSize, location;

      switch (e.keyCode) {
        case 40:
        case 38:
          if (!state.focus) {
            setState({
              focus: true,
            });
            return;
          }
          if (e.keyCode == 40)
            refActive.current = Math.min(
              ++refActive.current,
              propsIndex?.itemCount
            );
          else {
            refActive.current = Math.max(--refActive.current, 0);
          }
          itemRef = document.getElementById(
            `${refId.current}_${refActive.current}`
          );
          if (itemRef) {
            focusRow(itemRef);
          } else {
            indexscroll = stateIndex?.scrollOffset;
            itemSize = propsIndex?.itemSize;
            location = Math.ceil(indexscroll / itemSize);
            refActive.current = Math.min(location, propsIndex?.itemCount);
            itemRef = document.getElementById(
              `${refId.current}_${refActive.current}`
            );
            focusRow(itemRef);
          }
          scrollToItem(refActive.current);
          break;
        case 13:
          if (
            refActive.current >= 0 &&
            refActive.current < filteredData.length
          ) {
            selectItem(refActive.current);
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clearSelected = () => {
    let listItem = refSelect.current.querySelectorAll(".list-item");
    for (let i = 0; i < listItem.length; i++) {
      listItem[i].style.backgroundColor = "#fff";
    }
  };
  const selectItem = (index) => {
    refSelectTime.current = new Date();
    const item = filteredData[index];
    const id = getId(item);
    if (id != state.id)
      if (onChange) {
        onChange(id);
      }
    setState({
      focus: false,
      value: id,
      inputValue: getText(item),
    });
  };
  const focusRow = (itemRef) => {
    if (itemRef) {
      itemRef.style.backgroundColor = "#ede7e7";
    }
  };
  const scrollToItem = (index) => {
    refVirtualizeList.current && refVirtualizeList.current.scrollToItem(index);
  };
  const height = useMemo(() => {
    return filteredData.length > 10 ? 250 : filteredData.length * 35;
  }, [filteredData]);
  return (
    <Main className="select-content" ref={refSelect} placement={placement}>
      <InputTimeout
        className={`select-more ${className ? className : ""}`}
        onChange={(value) => {
          // if (value?.length === 0) onChange("");
          setState({ inputValue: value });
        }}
        value={state.inputValue}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onClick={onClick}
        timeDelay={1}
      />

      {state.focus && !disabled ? (
        <div className="select-drop-list">
          <CustomVirtualizeList
            height={height}
            itemCount={filteredData.length}
            itemSize={35}
            ref={refVirtualizeList}
          >
            {RowItems}
          </CustomVirtualizeList>
        </div>
      ) : null}
    </Main>
  );
};

export default memo(SelectMore);
