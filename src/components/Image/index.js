import React, { useState, useEffect, memo } from "react";
import { Main } from "./styled";
import fileUtils from "utils/file-utils";

export default memo((props) => {
  const [state, _setState] = useState({
    imageData: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { defaultImage, src } = props;
  useEffect(() => {
    if (src)
      fileUtils
        .getFromUrl({ url: fileUtils.absoluteFileUrl(src) })
        .then((s) => {
          var base64 = btoa(
            new Uint8Array(s).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          setState({
            imageData: "data:image/png;base64," + base64,
          });
        });
    else {
      setState({
        imageData: "",
      });
    }
  }, [src]);
  return (
    <Main
      {...props}
      src={state.imageData ? state.imageData : defaultImage}
    ></Main>
  );
});
