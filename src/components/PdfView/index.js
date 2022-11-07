import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import { Main } from "./styled";
import { A4 } from "constants/index";
import fileUtils from "utils/file-utils";
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.min.js`;
const PdfView = (props) => {
  const { width, height, src } = props;
  const [state, _setState] = useState({
    pageNumber: 0,
    pages: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    fileUtils
      .getFromUrl({
        url: src,
      })
      .then((s) => {
        const blob = new Blob([new Uint8Array(s)], {
          type: "application/pdf",
        });
        const blobUrl = window.URL.createObjectURL(blob);
        setState({
          src: blobUrl,
        });
      })
      .catch((e) => {
        setState({ src: "" });
      });
  }, [src]);
  const onDocumentLoadSuccess = ({ numPages }) => {
    const list = [];

    for (let i = 1; i <= numPages; i += 1) {
      list.push(i);
    }
    setState({
      pages: list,
      pageNumber: numPages,
    });
  };

  return (
    <Main width={width} height={height}>
      {state.src && (
        <Document
          file={state.src}
          onLoadSuccess={onDocumentLoadSuccess}
          className={"customize-view-pdf"}
          loading={
            <Spin spinning>
              <div style={{ width: A4.width, height: 520 }} />
            </Spin>
          }
        >
          {state.pages.map((item, index) => (
            <React.Fragment key={index} >
              <Page height={1400}  pageNumber={item} />
              {/* <p style={{ textAlign: "center" }}>
                {item} / {state.pageNumber}
              </p> */}
            </React.Fragment>
          ))}
        </Document>
      )}
    </Main>
  );
};

export default PdfView;
