import React, {
  Fragment,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStyle, MainStyle } from "./styled";
import File from "./File";
import { A4 } from "constants/index";
import { EMRProvider } from "pages/editor/context/EMR";
import { useStore } from "hook";
import { pageType, pdfGenerator } from "utils/editor-utils";
import printProvider from "data-access/print-provider";
import printJS from "print-js";
import pdfUtils from "utils/pdf-utils";
const MultiFiles = ({ ListDataForm, ...props }) => {
  const url = new URL(window.location.href);
  const formsStr = url.searchParams.get("baoCaos") || "";
  const listBaoCao = formsStr.split("||");
  ListDataForm = useMemo(() => {
    return listBaoCao.map((item) => {
      const baoCao = JSON.parse(item);
      return baoCao;
    });
  }, [listBaoCao]);

  const {
    files: { getDataMultiForm },
  } = useDispatch();

  const refLayoutType = useRef(null);
  const refLayout = useRef(A4);
  const auth = useStore("auth.auth", {});
  const refContextValue = useRef({
    isDisable: ({ itemProps, signStatus, props }) => {
      return true;
    },
    fillDataToParams: (api = "") => {
      return api;
      // .replaceAll("{khoaId}", props.patient?.khoaId)
      // .replaceAll("{phongId}", props.patient?.phongId)
      // .replaceAll("{giuongId}", props.patient?.giuongId)
      // .replaceAll("{maNb}", props.patient?.maNb)
      // .replaceAll("{maHoSo}", props.patient?.maHoSo)
      // .replaceAll("{maBenhAn}", props.patient?.maBenhAn)
      // .replaceAll("{bacSyDieuTriId}", props.patient?.bacSyDieuTriId);
    },
  });
  const [state, _setState] = useState({
    fileOnShow: {},
    zoomValue: 100,
    dataFiles: [],
    layout: A4,
    showDown: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refForm = useRef(null);
  const ref = useRef();
  const refCheck = useRef();
  useEffect(() => {
    if (JSON.stringify(refCheck.current) !== JSON.stringify(ListDataForm)) {
      refCheck.current = ListDataForm;
      if (ListDataForm) {
        if (ref.current) {
          clearTimeout(ref.current);
        }
        ref.current = setTimeout(() => {
          getDataMultiForm({
            files: ListDataForm,
          }).then((s) => {
            setState({ dataFiles: s });
          });
        }, 1000);
      }
    }
  }, [ListDataForm]);
  useEffect(() => {
    if (state.dataFiles.length) {
      setTimeout(async () => {
        const { pdfUrls } = await pdfGenerator(pageType.A4.v, true);
        const html = pdfUrls.reduce((a, b) => {
          return a + b;
        }, "");
        let focuser = setInterval(() => {
          window.dispatchEvent(new Event("focus"));
        }, 500);
        printJS({
          printable: html,
          type: "raw-html",
          onPrintDialogClose: () => {
            window.close();
            clearInterval(focuser);
          },
        });
      }, 500);
    }
  }, [state.dataFiles]);
  return (
    <EMRProvider value={refContextValue.current}>
      <GlobalStyle></GlobalStyle>
      <MainStyle
        layoutType={refLayoutType.current || "default"}
        width={refLayout.current.width}
        height={refLayout.current.height}
        zoomValue={state.zoomValue}
      >
        <div className="layout-body">
          <div className="layout-middle">
            <div className={"editing-contain"} id={"main-contain"}>
              <div className="editor-layout">
                <div className={"editing-box"} id="scrollBox" ref={refForm}>
                  <div id="list-file">
                    {!!state.dataFiles.length &&
                      state.dataFiles.map((file, index) => {
                        if (file) return <File key={index} file={file} />;
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainStyle>
    </EMRProvider>
  );
};

export default memo(MultiFiles);
