import React from "react";
import { useSelector } from "react-redux";
import SelectLargeData from "../index";
const SelectChanDoan = (props) => {
  const listAllMaBenh = useSelector(
    (state) => state.maBenh.listAllMaBenh || []
  );

  const onGetText = (item) => {
    return `${item?.ma} - ${item?.ten}`;
  };
  const onGetTextSearch = (item) => {
    return `${item?.ma} - ${item?.ten}`;
  };
  const onGetId = (item) => {
    return item.id + "";
  };
  return (
    <SelectLargeData
      dataSource={listAllMaBenh}
      onGetText={onGetText}
      onGetTextSearch={onGetTextSearch}
      onGetId={onGetId}
      {...props}
    />
  );
};

export default React.memo(SelectChanDoan);
