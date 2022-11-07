import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const DetectInteractive = (props) => {
  const onInteractive = useDispatch().application.onInteractive;
  useEffect(() => {
    document.addEventListener("keydown", onEvent);
    document.addEventListener("mousemove", onEvent);
    document.addEventListener("scroll", onEvent);
    return () => {
      window.removeEventListener("keydown", onEvent);
      window.removeEventListener("mousemove", onEvent);
      window.removeEventListener("scroll", onEvent);
    };
  }, []);
  const onEvent = (e) => {
    onInteractive();
  };

  return null;
};
export default DetectInteractive;
