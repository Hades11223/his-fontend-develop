import React, { useState, forwardRef, useEffect, useMemo, useRef } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { Spin } from "antd";
import { isEmpty } from "lodash";
import { detectMob } from "utils";
import fileUtils from "utils/file-utils";
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.min.js`;

const PhieuIn = (
  { id, data = {}, mode, elementScrollingPdfKey, listPhieu },
  ref
) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refUrlFileLocal = useRef(null);

  const phieu = useMemo(() => {
    return listPhieu?.find((item) => item.key == id);
  }, [listPhieu, id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setState({
      numPages: numPages,
    });
  };
  const onDocumentComplete = (pages) => {
    setState({
      pageNumber: 1,
      numPages: pages,
    });
  };
  const onPageComplete = (page) => {
    setState({
      pageNumber: page,
    });
  };
  useEffect(() => {
    if (refUrlFileLocal.current === state?.urlFileLocal) return null;
    loadFile();
  }, [
    elementScrollingPdfKey,
    id,
    phieu,
    data,
    state.urlFileLocal,
    state.messageError,
  ]);
  const loadFile = async () => {
    if (
      elementScrollingPdfKey &&
      elementScrollingPdfKey == id &&
      phieu &&
      (!phieu.data || !state.urlFileLocal) &&
      !isEmpty(data) &&
      !state.messageError
    ) {
      try {
        let thongTinPhieu = phieu.data;
        setState({
          loading: true,
        });
        if (!state.urlFileLocal && !state.messageError) {
          if (thongTinPhieu) {
            let urlFileLocal = await fileUtils.getFromUrl({
              url: fileUtils.absoluteFileUrl(thongTinPhieu?.filePdf),
            });
            const blob = new Blob([new Uint8Array(urlFileLocal)], {
              type: "application/pdf",
            });
            urlFileLocal = window.URL.createObjectURL(blob);
            refUrlFileLocal.current = urlFileLocal;
            setState({
              urlFileLocal: urlFileLocal,
              pageNumber: 1,
              loading: false,
            });
          } else {
            setState({
              urlFileLocal: null,
              pageNumber: 1,
              loading: false,
              messageError: thongTinPhieu?.data?.message,
            });
          }
        }
      } catch (error) {
        setState({ loading: false });
      }
    }
  };

  useEffect(() => {
    if (state.urlFileLocal) {
      const ele = document.querySelector("#id" + id.replaceAll("-", ""));
      if (ele) {
        ele.style.height = "auto";
        ele.style.minHeight = "100%";
      }
    }
  }, [state.urlFileLocal]);
  const isFixSize = useMemo(() => {
    if (phieu?.ma == "P008") {
      //V??ng tay ng?????i b???nh
      return false;
    }
    return true;
  }, [phieu]);
  return (
    <Main className={isFixSize ? "fix-size" : ""}>
      {state.loading ? (
        <Spin spinning={true}></Spin>
      ) : state.messageError ? (
        <div className="error-message">{state.messageError}</div>
      ) : (
        state.urlFileLocal && ( // state.urlFileLocal l?? blob
          <Document
            className="docs"
            file={state.urlFileLocal}
            onLoadSuccess={onDocumentLoadSuccess}
            onDocumentComplete={onDocumentComplete}
            onPageComplete={onPageComplete}
            height={200}
          >
            {Array.apply(null, Array(state.numPages)).map((item, index) => {
              //SAKURA-11332 FE [Form phi???u - Chung] L???i: Hi???n th??? n???i dung c??c phi???u b??? m???, v??? n??t
              //https://github.com/wojtekmaj/react-pdf/issues/958
              return (
                <Page
                  pageNumber={index + 1}
                  key={index}
                  scale={isFixSize ? (detectMob() ? 2 : 5) : 1}
                />
              );
            })}
          </Document>
        )
      )}
    </Main>
  );
};

export default React.memo(forwardRef(PhieuIn));
