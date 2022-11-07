import { DatePicker, InputNumber } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import { Main, PopoverStyled, GlobalStyle, SearchDate } from "./styled";
import IcSearch from "assets/svg/ic-search.svg";
import moment from "moment";
import Calendar from "assets/images/kho/calendar.png";
import { Button, InputTimeout, Select } from "components";
import DateDropdown from "pages/khamBenh/components/ModalDanhSachBN/DateDropdown";
const { RangePicker } = DatePicker;

const CustomPopover = (
  { data, funcSearchData, funcRefreshData, children, ...props },
  ref
) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    let newState = {};
    data.forEach((item) => {
      if (["normal", "select", "number"].includes(item.type)) {
        if (item.defaultValue) {
          newState[item.key] = item.defaultValue;
        }
      }
      if (item.type === "dateRange") {
        if (item.defaultDate)
          newState = {
            ...newState,
            ...{
              [item.key[0]]: item.defaultDate[0].format("YYYY-MM-DD 00:00:00"),
              [item.key[1]]: item.defaultDate[1].format("YYYY-MM-DD 23:59:59"),
            },
          };
      }
    });
    setState(newState);
  }, [data]);

  useImperativeHandle(ref, () => ({
    show: ({ cacheData = {} } = {}) => {
      setState({ show: true, ...cacheData });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  const refShowDate = useRef(null);

  const onChange = (key) => (e) => {
    // debugger;
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else value = e;
    if ("" == value || null == value) {
      funcRefreshData && funcRefreshData();
    }
    setState({ [key]: value });
  };

  const onChangeDate = (key) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    if ("" == value) {
      funcRefreshData && funcRefreshData();
    }
    setState({ [`tu${key}`]: value, [`den${key}`]: value1 });
  };

  const onChangeDateRange = (key) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD 00:00:00");
      value1 = e[1].format("YYYY-MM-DD 23:59:59");
    }
    if ("" == value) {
      funcRefreshData && funcRefreshData();
    }
    setState({ [key[0]]: value, [key[1]]: value1 });
  };

  const onChangeDate1 = (key) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    if ("" == value) {
      funcRefreshData && funcRefreshData();
    }
    setState({ [key[0]]: value, [key[1]]: value1 });
  };

  const onKeyDown = (type) => (e) => {
    if (e?.key == "Enter") {
      const value = e.target ? e.target?.value : e;
      funcSearchData && funcSearchData({ [type]: `${value}`.trim() });
    }
  };

  const onSearchDocument = () => {
    const { show, ...rest } = state;
    funcSearchData &&
      funcSearchData({
        ...rest,
      });
    onCancel();
  };

  const getDefaultValue = (item) => {
    if (item.type == "date") {
      if (item.defaultDate && item.defaultDate[0] && item.defaultDate[1]) {
        return [
          moment(item.defaultDate[0].toDateObject(), "DD/MM/YYYY"),
          moment(item.defaultDate[1].toDateObject(), "DD/MM/YYYY"),
        ];
      }
    }
    return [null, moment(new Date(), "DD/MM/YYYY")];
  };

  const content = () => (
    <Main>
      <div className="content-popover">
        {data.map((item, index) => {
          switch (item.type) {
            case "normal": {
              return (
                <div className="date" style={item?.styleWrapper} key={index}>
                  <label>{item?.title}</label>
                  <InputTimeout
                    placeholder={item.placeholder}
                    bordered={item.bordered || false}
                    onChange={onChange(item.key)}
                    onKeyDown={onKeyDown(item.key)}
                    value={state?.[item?.key]}
                  ></InputTimeout>
                </div>
              );
            }

            case "number": {
              return (
                <div className="date" style={item?.styleWrapper} key={index}>
                  <label>{item?.title}</label>
                  <InputNumber
                    className="input-number"
                    placeholder={item.placeholder}
                    bordered={item.bordered || false}
                    onChange={onChange(item.key)}
                    value={state[item.key]}
                  ></InputNumber>
                </div>
              );
            }

            case "numberRange": {
              return (
                <div
                  className="number-range"
                  style={item?.styleWrapper}
                  key={index}
                >
                  <label>{item?.title}</label>
                  <div className="content">
                    <InputNumber
                      className="input-number"
                      type="number"
                      placeholder={item.placeholder[0]}
                      bordered={item.bordered || false}
                      onChange={onChange(item.key[0])}
                      value={state[item.key[0]]}
                    />
                    <span>-</span>
                    <InputNumber
                      className="input-number"
                      type="number"
                      placeholder={item.placeholder[1]}
                      bordered={item.bordered || false}
                      onChange={onChange(item.key[1])}
                      value={state[item.key[1]]}
                    />
                  </div>
                </div>
              );
            }

            case "date": {
              return (
                <div className="date" style={item?.styleWrapper} key={index}>
                  <div>
                    <label>{item?.title}</label>
                    <RangePicker
                      placeholder={item.placeholder} // ["Từ ngày", "đến ngày"]
                      bordered={item.placeholder}
                      defaultValue={getDefaultValue(item)}
                      format="DD / MM / YYYY"
                      onChange={onChangeDate(item.key)}
                    ></RangePicker>
                  </div>
                </div>
              );
            }
            case "dateRange": {
              return (
                <div className="date" style={item?.styleWrapper} key={index}>
                  <div>
                    <label>{item?.title}</label>
                    <RangePicker
                      placeholder={item.placeholder} // ["Từ ngày", "đến ngày"]
                      bordered={item.placeholder}
                      defaultValue={item.defaultDate}
                      format="DD / MM / YYYY"
                      onChange={onChangeDateRange(item.key)}
                    ></RangePicker>
                  </div>
                </div>
              );
            }
            case "date-1": {
              return (
                <div className="date-1" style={item?.styleWrapper} key={index}>
                  <label className="title">{item?.title}</label>
                  <RangePicker
                    value={
                      state?.[item?.key[0]] && state?.[item?.key[1]]
                        ? [
                            moment(state?.[item?.key[0]]),
                            moment(state?.[item?.key[1]]),
                          ]
                        : null
                    }
                    style={{ paddingTop: 0 }}
                    format="DD/MM/YYYY"
                    placeholder={item.placeholder} // ["Từ ngày", "đến ngày"]
                    bordered={false}
                    onChange={onChangeDate1(item?.key)}
                    suffixIcon={
                      <img
                        src={Calendar}
                        alt="..."
                        style={{ marginRight: 5 }}
                      />
                    }
                    separator={<div>-</div>}
                  ></RangePicker>
                </div>
              );
            }
            case "select": {
              return (
                <div className="select" style={item?.styleWrapper} key={index}>
                  <label>{item?.title}</label>
                  <Select
                    defaultValue={item.defaultValue}
                    // mode="multiple"
                    // value={state?.[item?.key]}
                    showArrow
                    placeholder={item?.placeholder}
                    bordered={false}
                    onChange={onChange(item?.key)}
                    data={item?.dataSelect}
                  ></Select>
                </div>
              );
            }
            case "dateOptions": {
              const valueDate = () => {
                if (
                  item?.state?.selectedDateFrom &&
                  item?.state?.selectedDateTo
                ) {
                  return `${item?.state?.selectedDateFrom?.format(
                    item.format || "DD/MM/YYYY"
                  )} - ${item?.state?.selectedDateTo?.format(
                    item.format || "DD/MM/YYYY"
                  )}`;
                }
                return null;
              };
              return (
                <SearchDate className="date-option-2" key={index}>
                  <div className="title-date">{item?.title}</div>
                  <DateDropdown
                    stateParent={item?.state}
                    setStateParent={item?.setState}
                    ref={refShowDate}
                    onSelectedDate={item?.functionChangeInput}
                    customPosition={false}
                  ></DateDropdown>
                  <div
                    className="input-filter"
                    onClick={() => refShowDate.current.show()}
                  >
                    <input
                      className="filter"
                      placeholder={item?.placeholder}
                      value={valueDate()}
                      onFocus={() => refShowDate.current.show()}
                    />
                    <img
                      src={Calendar}
                      alt="..."
                      style={{ position: "absolute", right: 5, top: 10 }}
                    />
                  </div>
                </SearchDate>
              );
            }
            default:
              return <></>;
          }
        })}
        <div className="bottom-action">
          <Button
            onClick={() => onSearchDocument()}
            type="primary"
            rightIcon={<IcSearch />}
            minWidth={100}
            iconHeight={15}
            height={30}
          >
            <span>Tìm</span>
          </Button>
        </div>
      </div>
    </Main>
  );
  return (
    <>
      <GlobalStyle />
      <PopoverStyled
        overlayClassName="popover-base-search"
        content={content}
        trigger="click"
        visible={state.show}
        placement="bottomLeft"
        onVisibleChange={() => onCancel()}
      >
        {children}
      </PopoverStyled>
    </>
  );
};

export default forwardRef(CustomPopover);
