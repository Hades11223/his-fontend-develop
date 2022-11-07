import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Main } from "./styled";
const Arrow = (props) => {
  const listLabels = useSelector((state) => state.nhanTheoDoi.listLabels || []);
  const label = useMemo(() => {
    try {
      return listLabels?.find((item) => item.id == props.value);
    } catch (error) {
      return null;
    }
  }, [listLabels, props.value]);
  return (
    <Main start={props.start} className={props.className} height={props.height}>
      <div className="arrow end" />
      <div className="line end"></div>
      <div className="text">{label?.kyHieu}</div>
      <div className="line start"></div>
      <div className="arrow start" />
    </Main>
  );
};

export default Arrow;
