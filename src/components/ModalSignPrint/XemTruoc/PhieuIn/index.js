import React, { useState, forwardRef, useEffect, useMemo, useRef } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { Spin } from "antd";
import { isEmpty } from "lodash";
import usePhieu from "components/ModalSignPrint/usePhieu";
import { detectMob } from "utils";
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.min.js`;

const PhieuIn = ({ id, data = {}, mode }, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refUrlFileLocal = useRef(null);
  const { elementScrollingPdfKey } = useSelector((state) => state.phieuIn);
  const phieu = usePhieu(id);
  const { getDataDanhSachPhieu, updatePhieu, getThongTinPhieu } =
    useDispatch().phieuIn;

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
        if (!thongTinPhieu) {
          thongTinPhieu = await getThongTinPhieu({ phieu, ...data });
        }
        if (!state.urlFileLocal && !state.messageError) {
          if (thongTinPhieu && !thongTinPhieu.code) {
            let urlFileLocal = thongTinPhieu.urlFileLocal;
            if (!urlFileLocal)
              urlFileLocal = await getDataDanhSachPhieu({
                dsFile: thongTinPhieu.filePdf,
                mode: mode,
              });
            refUrlFileLocal.current = urlFileLocal;
            setState({
              urlFileLocal: urlFileLocal,
              pageNumber: 1,
              loading: false,
            });
            if (!phieu.data) {
              updatePhieu({ key: id, data: thongTinPhieu });
            }
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
  // console.log("state.urlFileLocal", state.urlFileLocal);
  const isFixSize = useMemo(() => {
    if (phieu?.ma == "P008") {
      //Vòng tay người bệnh
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
        state.urlFileLocal && ( // state.urlFileLocal là blob
          <Document
            className="docs"
            file={state.urlFileLocal}
            onLoadSuccess={onDocumentLoadSuccess}
            onDocumentComplete={onDocumentComplete}
            onPageComplete={onPageComplete}
            height={200}
          >
            {Array.apply(null, Array(state.numPages)).map((item, index) => {
              //SAKURA-11332 FE [Form phiếu - Chung] Lỗi: Hiển thị nội dung các phiếu bị mờ, vỡ nét
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
