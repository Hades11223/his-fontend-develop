import React, { useMemo, useState } from "react";
import { Main } from "./styled";
import { Select } from "antd";
import { connect, useSelector, useDispatch } from "react-redux";
const { Option } = Select;
const SelectVitalSignCategory = (props) => {
  const {
    chiSoSong: { _listDataTongHop },
    vitalSigns: { moreValueIds = [] },
  } = useSelector((state) => state);
  const {
    vitalSigns: { updateData },
  } = useDispatch();
  const data = useMemo(() => {
    return (_listDataTongHop || []).filter(
      (item) => !moreValueIds.find((t) => t === item.id)
    );
  }, [moreValueIds, _listDataTongHop]);
  const onChange = (value) => {
    if (!props.isModal) {
      return;
    }
    if (value) {
      let values = JSON.parse(JSON.stringify(moreValueIds));
      if (values.indexOf((t) => t === value) === -1) {
        values.push(value);
      }
      updateData({
        moreValueIds: values,
      });
    }
  };

  return (
    <Main
      style={{
        top: props.top || 0,
        left: 5,
        width: props.width - 5,
        height: props.height,
        zIndex: 104,
      }}
    >
      <Select
        showSearch
        style={{ width: "100%", height: props.height }}
        placeholder="Thêm chỉ số"
        // optionFilterProp="children"
        onChange={onChange}
        value="Thêm chỉ số"
        filterOption={(input, option) => {
          return (
            (option.props.children + "")
              .toLowerCase()
              .createUniqueText()
              .indexOf(input?.toLowerCase().createUniqueText()) >= 0
          );
        }}
      >
        {data.map((item, index) => {
          return (
            <Option value={item.id} key={index}>
              {item.ten} ({item.donVi})
            </Option>
          );
        })}
      </Select>
    </Main>
  );
};
export default SelectVitalSignCategory;
