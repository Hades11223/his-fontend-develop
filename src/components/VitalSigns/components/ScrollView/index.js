import React, { useRef, useEffect } from "react";
import { useLayoutEffect } from "react";
import ScrollView from "react-custom-scrollbars-2";
export default ({ values, ...props }) => {
  const refScrollView = useRef(null);
  const refScrollViewDown = useRef(null);
  const refScrollViewStart = useRef(null);
  const refScrollViewLeft = useRef(null);
  useEffect(() => {
    refScrollViewDown.current = false;

    refScrollView.current.addEventListener("mousedown", scrollViewMouseDown);
    refScrollView.current.addEventListener("mouseleave", scrollViewMouseLeave);
    refScrollView.current.addEventListener("mouseup", scrollViewMouseLeave);
    refScrollView.current.addEventListener("mousemove", scrollViewMouseMove);
    return () => {
      refScrollView.current.removeEventListener(
        "mousedown",
        scrollViewMouseDown
      );
      refScrollView.current.removeEventListener(
        "mousedown",
        scrollViewMouseLeave
      );
      refScrollView.current.removeEventListener(
        "mouseup",
        scrollViewMouseLeave
      );
      refScrollView.current.removeEventListener(
        "mousemove",
        scrollViewMouseMove
      );
    };
  }, [refScrollView.current]);
  const scrollViewMouseDown = (e) => {
    refScrollViewDown.current = true;
    refScrollViewStart.current = e.pageX - refScrollView.current.offsetLeft;
    refScrollViewLeft.current = refScrollView.current.scrollLeft;
  };
  const scrollViewMouseLeave = (e) => {
    refScrollViewDown.current = false;
  };
  const scrollViewMouseMove = (e) => {
    if (!refScrollViewDown.current) return;
    e.preventDefault();
    const x = e.pageX - refScrollView.current.offsetLeft;
    const walk = x - refScrollViewStart.current; //scroll-fast
    refScrollView.current.scrollLeft = refScrollViewLeft.current - walk;
  };

  // useEffect(() => {
  //   if (!refScrollCanvas.current) {
  //     refScrollCanvas.current =
  //       document.getElementsByClassName("scroll-view")[0]?.childNodes[0];
  //     refScrollCanvas.current.style.overflowY = "hidden";
  //   }
  // }, []);
  return (
    <ScrollView
      style={{ height: props.height + 10, width: "100%", overflowY: "hidden" }}
      className="scroll-view"
    >
      <div style={{ overflowY: "hidden" }} ref={refScrollView} {...props}>
        {props.children}
      </div>
    </ScrollView>
  );
};
