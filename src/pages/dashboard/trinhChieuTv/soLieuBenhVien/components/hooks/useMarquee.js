import { useEffect, useState } from "react";
import { isElementOverflowingX } from "../../utils/helpers";

export default function useMarquee(
  queryString,
  maxLengthLabel = 0,
  delayRenderTime = 0,
  ...dependency
) {
  const [delaying, setDelaying] = useState(0);

  const excuteQuery = () => {
    const scrollingTextElements = document.querySelectorAll(queryString);
    [...(scrollingTextElements || [])].forEach((elem) => {
      if (
        (maxLengthLabel && elem.innerText?.length > maxLengthLabel) ||
        isElementOverflowingX(elem)
      ) {
        const marqueeElem = document.createElement("marquee");
        marqueeElem.truespeed = true;
        marqueeElem.scrolldelay = 10;
        marqueeElem.innerText = elem.innerText;
        elem.innerText = "";
        elem.appendChild(marqueeElem);
      }
    });
  };

  useEffect(() => {
    if (delayRenderTime > 0) {
      !delaying &&
        setTimeout(() => {
          excuteQuery();
          setDelaying(false);
        }, delayRenderTime);
      setDelaying(true);
    } else {
      excuteQuery();
    }
  }, [queryString, delayRenderTime, maxLengthLabel, ...dependency]);
}
