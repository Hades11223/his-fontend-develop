import React, { useEffect, useState, useRef, useMemo } from "react";
import { Main } from "./styled";
import { PlusOutlined } from "@ant-design/icons";
const PlusButton = ({ onAddRow }) => {
  return (
    <Main
      className={"plus-btn"}
      icon={<PlusOutlined />}
      size={"small"}
      onClick={onAddRow}
    />
  );
};

export default PlusButton;
