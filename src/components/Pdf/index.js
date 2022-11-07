import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import { A4 } from "constants/index";
import fileUtils from "utils/file-utils";
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.min.js`;
const PdfView = (props) => {
  const { src } = props;
  const [state, _setState] = useState({
    pageNumber: 0,
    pages: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { pageNumber, pages } = state;
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
  useEffect(() => {
    fileUtils.getFromUrl({ url: fileUtils.absoluteFileUrl(src) }).then((s) => {
      const blob = new Blob([new Uint8Array(s)], {
        type: "application/pdf",
      });
      const blobUrl = window.URL.createObjectURL(blob);
      setState({
        blobUrl: blobUrl,
      });
    });
  }, [src]);

  return state.blobUrl ? (
    <Document
      file={state.blobUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={
        <Spin spinning>
          <div style={{ width: A4.width, height: 520 }} />
        </Spin>
      }
    >
      {pages.map((item, index) => (
        <React.Fragment key={index}>
          <Page
            height={props.height ? props.height : A4.height}
            width={props.width ? props.width : A4.width}
            pageNumber={item}
          />
          {/* <p style={{ textAlign: "center" }}>
            {item} / {pageNumber}
          </p> */}
        </React.Fragment>
      ))}
    </Document>
  ) : null;
};

export default PdfView;
