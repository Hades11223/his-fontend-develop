import { HOST } from "client/request";
import React, { useEffect } from "react";
import { decryptAES } from "utils";
import fileUtils from "utils/file-utils";
import { WrapperStyled } from "./styled";

const Html = (props) => {
  useEffect(() => {
    fileUtils
      .getFromUrl({
        url: `${HOST}/api/his/v1/files/${decryptAES(
          window.location.search.split("?")[1]
        )}`,
      })
      .then((res) => {
        const url = URL.createObjectURL(
          new Blob([res], {
            type: "application/pdf",
          })
        );
        document
          .getElementById("nh-id-iframe-hdsd")
          .setAttribute("src", url + "#download=0");
      });
  }, []);

  return (
    <WrapperStyled
      id="nh-id-iframe-hdsd"
      typeof="application/pdf"
    ></WrapperStyled>
  );
};

export default Html;
