import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HotKey = (props) => {
  const onEvent = useDispatch().phimTat.onEvent;
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  const onKeyDown = (e) => {
    onEvent(e);
  };

  return null;
};
export default HotKey;
