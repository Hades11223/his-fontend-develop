import React from "react";
import { useSelector } from "react-redux";
import SelectLargeData from "../index";
const SelectBenhVien = (props) => {
  const { listAllBenhVien } = useSelector((state) => state.benhVien);

  const onGetText = (item) => {
    return `${item?.ma} - ${item?.ten}`;
  };
  const onGetTextSearch = (item) => {
    return `${item?.ma} - ${item?.ten}`;
  };
  const onGetId = (item) => {
    return item.id;
  };
  return (
    <SelectLargeData
      dataSource={listAllBenhVien}
      onGetText={onGetText}
      onGetTextSearch={onGetTextSearch}
      onGetId={onGetId}
      {...props}
    />
  );
};

export default React.memo(SelectBenhVien);
