import { Select } from "antd";
import React, { useState, useEffect, useRef, useMemo, memo } from "react";

const DEFAULT_SIZE = 20;
const DEFAULT_PARAM = { active: true };

const mapDataDefault = (i) => ({
  value: i.id,
  label: i.ten,
});

const SelectLoadMore = ({
  placeholder = "Tìm kiếm",
  value,
  onChange = () => {},
  className,
  mode,
  hasAll,
  limit = DEFAULT_SIZE,
  addParam = DEFAULT_PARAM,
  blurReset = false,
  addValue,
  disabled,
  refSelect,

  // bắt buộc
  api, // là 1 promise
  mapData = mapDataDefault,
  keySearch = "ten",
  ...rest
}) => {
  const refTimeoutSearch = useRef();
  const [state, _setState] = useState({
    param: { page: 0, size: limit },
    listData: [],
    fullLoad: false,
    loading: false,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const pre = hasAll ? [{ value: "", label: "Tất cả" }] : [];
  const addValueCustom = useMemo(() => {
    return Array.isArray(addValue) ? addValue : (addValue ? [addValue] : []);
  }, [addValue]);
  const listOption = addValueCustom?.length
    ? [
        ...addValueCustom,
        ...(state.listData.filter(
          (i) => addValueCustom.find((x) => x.value !== i.value)
        ) || []),
      ]
    : state.listData;
  const loadData = (data = {}, isReset) => {
    const param = {
      ...(isReset
        ? { page: 0, size: limit }
        : {
            ...state.param,
            page: state.param?.page + 1,
          }),
      ...data,
      ...(addParam || {}),
    };
    setState({
      param,
      loading: true,
      fullLoad: isReset ? false : state.fullLoad,
    });
    api(param)
      .then((res) => {
        if (res.data.length === 0) {
          // không có dữ liệu
          // if (param[keySearch] && param.page === 0) {
          //   // search không có dữ liệu
          //   setState({ fullLoad: true, listData: [] });
          // } else {
          //   // cuộn tới page cuối cùng
          // }
          res.pageNumber === 0
            ? setState({ fullLoad: true, listData: [] })
            : setState({ fullLoad: true });
          return;
        }
        setState({
          listData: isReset
            ? [...pre, ...res.data?.map(mapData)]
            : [...state.listData, ...res.data?.map(mapData)],
        });
      })
      .finally(() => {
        setState({ loading: false });
      });
  };

  const handleSearch = (data) => {
    if (refTimeoutSearch.current) {
      clearTimeout(refTimeoutSearch.current);
    }

    refTimeoutSearch.current = setTimeout(() => {
      loadData({ [keySearch]: data }, true);
    }, 500);
  };

  const onClear = () => {
    loadData({}, true);
  };

  useEffect(() => {
    // console.log("addParam", addParam)
    loadData({}, true);
  }, [addParam]);
  const handleChange = (value, item) => {
    // nếu xóa hết các lựa chọn thì load lại dữ liệu
    if (mode === "multiple" && value?.length === 0) {
      loadData({}, true);
    }
    onChange(value, item);
  };

  const onBlur = () => {
    // khi blur khỏi select và đang có giá trị search thì
    // sẽ load lại dữ liệu
    if (blurReset && state.param[keySearch]) {
      loadData({}, true);
    }
  };
  const onPopupScroll = (e) => {
    const { target } = e;
    if (
      target.scrollTop + target.offsetHeight > target.scrollHeight - 200 &&
      !state.loading &&
      !state.fullLoad
    ) {
      loadData();
    }
  };

  return (
    <Select
      placeholder={placeholder}
      options={listOption}
      onChange={handleChange}
      onPopupScroll={onPopupScroll}
      showSearch
      onBlur={onBlur}
      filterOption={false}
      onSearch={handleSearch}
      allowClear
      onClear={onClear}
      className={className}
      mode={mode}
      ref={refSelect}
      value={value}
      disabled={disabled}
      {...rest}
    />
  );
};

export default memo(SelectLoadMore);
