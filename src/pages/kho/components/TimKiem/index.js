import { Col, Row, DatePicker } from "antd";
import IcClose from "assets/images/kho/icClose.png";
import IcDown from "assets/images/xetNghiem/icDown.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import React, { useEffect, useState } from "react";
import { Select, InputTimeout } from "components";
import { InputSearch, Main, SearchKho } from "./styled";
import cacheUtils from "utils/cache-utils";

const { RangePicker } = DatePicker;

const TimKiem = ({ filters = [], onSearch = () => {} }) => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useEffect(() => {
    cacheUtils.read("DATA_NHAP_KHO", "", null, false).then((s) => {
      setState({ loaiNhapXuat: s });
    });
  }, []);
  const getFilter = (item) => {
    if (item.component) {
      return <SearchKho>{item.component}</SearchKho>;
    }
    if (item.type === "input") {
      return (
        <InputSearch>
          <InputTimeout
            placeholder={item.placeholder}
            onChange={item.onChange || onChange(item.fieldName)}
          />
          <img src={IconSearch} alt="IconSearch" className="icon-search" />
        </InputSearch>
      );
    }
    if (item.type === "date") {
      return (
        <div className="date">
          <div className="label">{item.label}</div>
          <RangePicker
            placeholder={["Từ ngày", "đến ngày"]}
            onChange={onChangeDate(item.fieldName)}
          ></RangePicker>
        </div>
      );
    }
    if (item.type === "select") {
      return (
        <SearchKho>
          <Select
            className={item.className}
            suffixIcon={<img src={IcDown} alt="IcDown" className="ic-down" />}
            style={{ width: "100%" }}
            data={item.data}
            showSearch={item.showSearch}
            onChange={onChangeSelect(item.fieldName)}
            ten={item.nameSelect}
            mode={item.mode}
            placeholder={item.placeholder}
            allowClear={item.showTag}
            value={state?.loaiNhapXuat}
          />
        </SearchKho>
      );
    }
    return (
      <SearchKho>
        <Select
          className={item.className}
          suffixIcon={<img src={IcDown} alt="IcDown" className="ic-down" />}
          style={{ width: "100%" }}
          data={item.data}
          showSearch={item.showSearch}
          showArrow={item.showArrow}
          onChange={onChange(item.fieldName, item.showTag)}
          ten={item.nameSelect}
          mode={item.mode}
          value={item.value}
          placeholder={item.placeholder}
          allowClear={item.showTag}
        />
      </SearchKho>
    );
  };

  const onChange = (fieldName, showTag) => (e) => {
    if (showTag) {
      const selectItem = filters
        .find((item) => item.fieldName === fieldName)
        .data.find((item) => item.id === e);
      const newList = Object.assign([], state[fieldName]) || [];
      if (newList.includes(selectItem)) return null;
      newList.push(selectItem);
      setState({ [fieldName]: newList });
      onSearch({ [fieldName]: newList.map((item) => item.id) });
    } else {
      onSearch({ [fieldName]: e });
    }
  };

  const onChangeDate = (key) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD 00:00:00");
      value1 = e[1].format("YYYY-MM-DD 23:59:59");
    }
    onSearch({ [`tuThoiGian${key}`]: value, [`denThoiGian${key}`]: value1 });
  };

  const onChangeSelect = (key) => (e) => {
    setState({ [key]: e });
    cacheUtils.save("DATA_NHAP_KHO", "", e, false);
    if (e === 30) {
      onSearch({ [key]: e, dsTrangThai: [20, 30] });
    } else {
      onSearch({ [key]: e });
    }
  };

  const onRemove = (e, fieldName) => {
    const newListSelect = state[fieldName].filter((item) => item.id !== e.id);
    setState({ [fieldName]: newListSelect });
    onSearch({
      [fieldName]:
        newListSelect.length > 0 ? newListSelect.map((item) => item.id) : "",
    });
  };

  return (
    <Main>
      <Row>
        {filters.map((item, index) => (
          <Col key={index} flex={item.flex || "110px"}>
            {getFilter(item)}
          </Col>
        ))}
      </Row>
      <div className="array-store">
        {filters
          .filter((item) => item.showTag)
          .map((item, idx) =>
            (state[item.fieldName] || []).map((obj, index) => {
              return (
                <div className="item" key={`${index}_${idx}`}>
                  <span>
                    {item.nameSelect ? obj[item.nameSelect] : obj.ten}
                  </span>
                  <img
                    className="i-close"
                    src={IcClose}
                    alt="..."
                    onClick={() => onRemove(obj, item.fieldName)}
                  ></img>
                </div>
              );
            })
          )
          .reduce((acc, cur) => [...acc, ...cur], [])}
      </div>
    </Main>
  );
};

export default TimKiem;
