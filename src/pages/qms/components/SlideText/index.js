import React, { useState, useRef, useEffect, memo } from "react";
import { Wrapper } from "./styled";

function SlideText({ children, ...rest }) {
  const [spanWidth, setSpanWidth] = useState(0);
  const [wrapWidth, setWrapWidth] = useState(0);
  const [duration, setDuration] = useState(0);
  const [nameAnimation, setNameAnimation] = useState("");
  const wrapRef = useRef();
  const spanRef = useRef();

  useEffect(() => {
    const wrapElm = wrapRef.current;
    const spanElm = spanRef.current;
    const wrapElmWidth = wrapElm.offsetWidth;
    const spanElmWidth = spanElm.offsetWidth;
    const ratio = spanElmWidth / wrapElmWidth;
    const duration = ratio > 1.5 ? ratio * 7 : 3;
    
    setDuration(duration);
    setWrapWidth(wrapElmWidth);
    setSpanWidth(spanElmWidth);
    setNameAnimation("slide-text" + spanElmWidth);
    if (spanElmWidth > wrapElmWidth) {
      spanElm.classList.add("animation");
    }
  }, [children]);

  return (
    <Wrapper
      {...rest}
      ref={wrapRef}
      spanWidth={spanWidth}
      wrapWidth={wrapWidth}
      duration={duration}
      nameAnimation={nameAnimation}
    >
      <span ref={spanRef}>{children}</span>
    </Wrapper>
  );
}

export default memo(SlideText);
