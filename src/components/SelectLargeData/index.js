import React, { useMemo, useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import BenhVien from "./BenhVien";
import ChanDoan from "./ChanDoan";
const Option = Select.Option;
const SelectLargeData = React.memo(
  ({
    debounceTimeout = 300,
    dataSource,
    onGetTextSearch,
    onGetText,
    onGetId,
    maxItem,
    ...props
  }) => {
    const fetchOptions = async (text = "") => {
      const input = text.toLowerCase().createUniqueText();
      if (!input) return dataSource;
      return dataSource.filter((item) => {
        const text = onGetTextSearch(item);
        return (
          text //`${item?.ma} - ${item?.ten}`
            .toLowerCase()
            .createUniqueText()
            .indexOf(input) >= 0
        );
      });
      // .map((item) => ({
      //   label: `${item?.ma} - ${item?.ten}`,
      //   value: item?.id + "",
      // }));
    };

    const [state, _setState] = useState({
      data: [],
      open: false,
    });
    const setState = (data = {}) => {
      _setState((state) => {
        return { ...state, ...data };
      });
    };

    const fetchRef = React.useRef(0);
    const debounceFetcher = React.useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setState({ isFetch: true });
        fetchOptions(value).then((data) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          setState({ data: data || [], isFetch: false });
        });
      };

      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    const options = useMemo(() => {
      let data = state.data;
      if (!state.open) {
        if (Array.isArray(props.value)) {
          if (props.value?.length) {
            data = dataSource.filter((item) =>
              props.value.includes(onGetId(item))
            );
          } else data = [];
        } else {
          if (props.value) {
            data = dataSource.filter((item) => onGetId(item) == props.value);
          } else {
            data = [];
          }
        }
      } else {
        if (!data.length && fetchRef.current == 0) data = dataSource || [];
      }
      // if (!state.open && dataSource.length && props.value) {
      //     data= dataSource.filter(item=>{

      //     })
      // }

      // if (!data.length && fetchRef.current == 0) data = dataSource || [];
      return data.map((item, index) => {
        return (
          <Option key={index} value={onGetId(item)}>
            {onGetText(item)}
          </Option>
        );
      });
    }, [state.data, dataSource, state.open, props.value]);

    const handleDropdownVisibleChange = (open) => {
      setState({ open: open });
    };

    const onChange = (values, ...rest) => {
      if (Array.isArray(values) && maxItem && maxItem < values.length) {
        values = values.reverse().slice(0, maxItem).reverse();
      }
      props.onChange && props.onChange(values, ...rest);
    };

    return (
      <Select
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={state.fetching ? <Spin size="small" /> : null}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        {...props}
        onChange={onChange}
      >
        {options}
      </Select>
    );
  }
);
SelectLargeData.SelectBenhVien = BenhVien;
SelectLargeData.SelectChanDoan = ChanDoan;

export default SelectLargeData;
