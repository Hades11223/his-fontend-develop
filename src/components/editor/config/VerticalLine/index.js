import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  // useEffect,
} from "react";
import { Main } from "./styled";
// import { connect } from "react-redux";

const VerticalLine = forwardRef((props, ref) => {
  const [left, setLeft] = useState(0);
  const [showVerticalLine, setShowVerticalLine] = useState("none");
  // let isCollapse = document.getElementsByClassName("closed-sidebar").length;
  let marginLeft = 0;
  // props.windowWidth > 1250
  //   ? isCollapse
  //     ? 80
  //     : 280
  //   : props.windowWidth <= 991
  //   ? 0
  //   : 80;

  // useEffect(() => {
  // document.addEventListener('mousemove', onMove);
  //
  // return () => {
  // 	document.removeEventListener('mousemove', onMove);
  // }
  // }, []);

  const showLine = (e) => {
    setLeft(e.clientX - marginLeft);
    setShowVerticalLine("block");
  };
  const hideLine = () => {
    setShowVerticalLine("none");
  };

  const onMove = (e) => {
    setLeft(e.clientX - marginLeft);
  };

  useImperativeHandle(ref, () => ({
    showLine,
    hideLine,
    onMove,
  }));

  return <Main style={{ left: `${left}px`, display: showVerticalLine }} />;
});

VerticalLine.defaultProps = {};

VerticalLine.propTypes = {};

export default VerticalLine;
