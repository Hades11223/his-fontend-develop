import { Col, Input, Row, Button, Checkbox, Popover, DatePicker } from "antd";
import React, { useRef } from "react";
import {
  Main,
  InputSearch,
  SearchKho,
  SearchDate,
  GlobalStyle,
  PopupWrapper,
} from "./styled";
import { debounce } from "lodash";
import IcFilter from "assets/svg/ic-filter.svg";
import IcSearch from "assets/svg/ic-search.svg";
import IcCalendar from "assets/svg/ic-calendar.svg";
import CustomPopover from "./CustomPopover/index";
import { Select, InputTimeout } from "components";
import DateDropdown from "pages/khamBenh/components/ModalDanhSachBN/DateDropdown";
import IcDown from "assets/images/xetNghiem/icDown.png";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  setQueryStringValue,
  setQueryStringValues,
} from "hook/useQueryString/queryString";

const BaseSearch = ({
  cacheData = {},
  dataInput,
  filter,
  title,
  titleRight,
  componentRight,
  ...props
}) => {
  const { t } = useTranslation();
  const refPopover = useRef(null);
  const refShowDate = useRef(null);

  const onShowPopover = () => {
    setTimeout(() => {
      if (refPopover.current) refPopover.current.show({ cacheData });
    }, 200);
  };
  const onChangeInput = (key, functionChangeInput) => (e) => {
    const value = e;
    if (value == "") {
      setQueryStringValue(key, "");
      functionChangeInput({ [key]: `${value}`.trim() });
    }
  };
  const handleSearchBN = debounce((key, value, functionChangeInput) => {
    let array = value.split("|");
    let obj = {
      [key]: array[4],
    };
    setQueryStringValue(key, array[4]);
    functionChangeInput(obj);
  }, 1000);
  const onKeyDown =
    ({
      key,
      isScanQR = false,
      functionChangeInput,
      keysFlexible,
      qrGetValue,
    }) =>
    (e) => {
      if (e?.key == "Enter") {
        let value = e.target ? e.target?.value : e;
        // if (!value) return;
        if (keysFlexible?.length > 0) {
          // kết hợp nhiều key
          let obj = {};
          keysFlexible.forEach((item) => {
            obj = { ...obj, [item.key]: "" };
          });
          if (isScanQR && value.startsWith("{")) {
            let keyCustom = keysFlexible?.find(
              (item) => item.key == qrGetValue
            )?.key;
            let str = value || "";
            let parseQr = JSON.parse(str);
            obj = {
              ...obj,
              [keyCustom]: parseQr?.[keyCustom],
            };
            setQueryStringValues(obj);
            functionChangeInput(obj);
            return null;
          }
          keysFlexible.find((item) => {
            if (
              (item.type == "string" && !/^[0-9]+$/.test(value)) ||
              (item.type == "number" && /^[0-9]+$/.test(value))
            ) {
              //search string
              obj = {
                ...obj,
                [item?.key]: value,
              };
            } else {
              //search number
              obj = {
                ...obj,
                [item?.key]: "",
              };
            }
          });
          setQueryStringValues(obj);
          functionChangeInput(obj);
          return null;
        }
        // search với 1 key
        if (isScanQR) {
          if (!/^[0-9]+$/.test(value)) {
            handleSearchBN(key, value, functionChangeInput);
            return;
          }
        }
        setQueryStringValue(key, `${value}`.trim());
        functionChangeInput({ [key]: `${value}`.trim() });
      }
    };
  const onChangeSelect = (inputInfo) => (e) => {
    setQueryStringValue(inputInfo.keyValueInput, e);
    inputInfo.functionChangeInput({
      [inputInfo.keyValueInput]: e,
    });
  };
  const onChangeDateRange = (inputInfo) => (rangeData) => {
    setQueryStringValues({
      [inputInfo.keyValueInput[0]]: rangeData?.[0],
      [inputInfo.keyValueInput[1]]: rangeData?.[1],
    });
    inputInfo.functionChangeInput({
      [inputInfo.keyValueInput[0]]: rangeData?.[0]?.format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      [inputInfo.keyValueInput[1]]: rangeData?.[1]?.format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    });
  };
  const onChangeSelectCheckBox = (inputInfo) => (e) => {
    inputInfo.functionChangeInput({
      [inputInfo.keyValueInput]: e,
    });
  };
  const onChangeDateOption = (inputInfo) => (e) => {
    if (inputInfo.keyValueInput?.length) {
      setQueryStringValues({
        [inputInfo.keyValueInput[0]]:
          e.key == "tatCa" ? "-" : e.tuThoiGianVaoVien,
        [inputInfo.keyValueInput[1]]:
          e.key == "tatCa" ? "-" : e.denThoiGianVaoVien,
      });
    }
    inputInfo.functionChangeInput(e);
  };
  // ---------------------------------------------------------------- render input
  const typeInput = (inputInfo) => {
    if (!inputInfo) return null;
    switch (inputInfo.type) {      
      case "dateOptions": {
        const valueDate = () => {
          const keyFrom = inputInfo.keyValueInput[0] || "selectedDateFrom";
          const keyTo = inputInfo.keyValueInput[1] || "selectedDateTo";
          if (
            inputInfo.state &&
            inputInfo.state[keyFrom] &&
            inputInfo.state[keyTo]
          ) {
            let from = inputInfo.state[keyFrom];
            let to = inputInfo.state[keyTo];

            var pattern = /^\d+$/; //check if milisecond
            if (pattern.test(from)) {
              from = moment(from.toDateObject());
            }
            if (pattern.test(to)) {
              to = moment(to.toDateObject());
            }

            return `${
              from.format ? from.format(inputInfo.format || "DD/MM/YYYY") : from
            } - ${
              to.format ? to.format(inputInfo.format || "DD/MM/YYYY") : to
            }`;
          }
          return t("common.tatCa");
        };
        inputInfo.keyValueInput = inputInfo.keyValueInput || [];
        return (
          <SearchDate className="date-option-2">
            <div>
              <div className="title-date">{inputInfo.title}</div>
              <DateDropdown
                keyFrom={inputInfo.keyValueInput[0]}
                keyTo={inputInfo.keyValueInput[1]}
                stateParent={inputInfo.state}
                setStateParent={inputInfo.setState}
                ref={refShowDate}
                onSelectedDate={onChangeDateOption(inputInfo)}
                customPosition={false}
                ignoreKeys={inputInfo.ignoreKeys}
              ></DateDropdown>
              <div
                className="input-filter"
                onClick={() => refShowDate.current.show()}
              >
                <input
                  className="filter"
                  placeholder={inputInfo.placeholder}
                  value={valueDate()}
                  onFocus={() => refShowDate.current.show()}
                />
              </div>
            </div>
            <IcCalendar />
          </SearchDate>
        );
      }
      case "select": {
        return (
          <SearchKho>
            <Select
              style={{ width: inputInfo.widthInput || "100%" }}
              placeholder={inputInfo.placeholder}
              autoFocus={inputInfo.autoFocus}
              defaultValue={inputInfo.defaultValue || null}
              allowClear={inputInfo.allowClear || null}
              data={inputInfo.listSelect}
              onChange={onChangeSelect(inputInfo)}
              value={cacheData[inputInfo.keyValueInput]}
            />
          </SearchKho>
        );
      }
      case "dateRange": {
        return (
          <InputSearch className="date-range-picker">
            <div className="range-picker-title">{inputInfo.title}</div>
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              placeholder={inputInfo.placeholder}
              autoFocus={inputInfo.autoFocus}
              defaultValue={inputInfo.defaultValue || null}
              data={inputInfo.listSelect}
              format={"DD/MM/YYYY HH:mm:ss"}
              showTime
              onChange={onChangeDateRange(inputInfo)}
            />
          </InputSearch>
        );
      }
      case "selectCheckbox": {
        return (
          <PopupWrapper>
            <Popover
              getPopupContainer={(node) => node.parentNode}
              placement="bottom"
              content={
                <Checkbox.Group
                  options={inputInfo.listSelect}
                  onChange={onChangeSelectCheckBox(inputInfo)}
                  value={inputInfo.value}
                />
              }
              trigger="click"
              overlayClassName="popup-kho"
            >
              <SearchKho>
                <Button className="button-select-checkbox">
                  <span> {inputInfo.title} </span>
                  <img src={IcDown} />
                </Button>
              </SearchKho>
            </Popover>
          </PopupWrapper>
        );
      }
      case "addition": {
        return inputInfo.component || <></>;
      }
      default: {
        return (
          <InputSearch>
            <InputTimeout
              placeholder={inputInfo.placeholder}
              autoFocus={inputInfo.autoFocus}
              type="search"
              onKeyDown={onKeyDown({
                key: inputInfo.keyValueInput,
                isScanQR: inputInfo.isScanQR,
                functionChangeInput: inputInfo.functionChangeInput,
                //key flexxible nên sử dụng chung với
                keysFlexible: inputInfo.keysFlexible,
                qrGetValue: inputInfo.qrGetValue,
              })}
              onChange={onChangeInput(
                inputInfo.keyValueInput,
                inputInfo.functionChangeInput
              )}
              value={
                cacheData[inputInfo.keyValueInput] ||
                inputInfo.keysFlexible?.reduce(
                  (a, b) => cacheData[b.key] || a,
                  null
                ) ||
                null
              }
              suffix={<IcSearch />}
            />

            {/* <img src={IcSearch} alt="IcSearch" className="icon-search" /> */}
          </InputSearch>
        );
      }
    }
  };
  const renderDataInput = () => {
    return (
      <>
        {dataInput?.map((inputInfo, index) => {
          return (
            <Col flex={inputInfo.widthInput} key={index + "-input-key"}>
              {typeInput(inputInfo)}
            </Col>
          );
        })}
      </>
    );
  };
  // ---------------------------------------------------------------- end render input
  return (
    <Main
      align="middle"
      id="base-search_component"
      className="base-search_component"
    >
      <GlobalStyle />
      {title && (
        <Row>
          <div className="title">
            <div className="left">{title}</div>
            <div className="right">{titleRight}</div>
          </div>
        </Row>
      )}
      <Row className="base-search-group-filter">
        <div className="header__left">
          {filter?.open && (
            <Col flex={filter?.width}>
              <CustomPopover ref={refPopover} {...filter}>
                <SearchKho>
                  <Button
                    className="filter"
                    onClick={() => filter.data?.length && onShowPopover()}
                  >
                    <IcFilter className="icon" />
                    <span>{filter.title || t("common.boLoc")}</span>
                  </Button>
                </SearchKho>
              </CustomPopover>
            </Col>
          )}
          {renderDataInput()}
        </div>
        {componentRight && (
          <div className="header__right">{componentRight}</div>
        )}
      </Row>
    </Main>
  );
};

export default BaseSearch;
