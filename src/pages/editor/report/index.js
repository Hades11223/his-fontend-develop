import React, { useEffect, useRef, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
// import PdfView from "components/PdfView";
// import HtmlView from "components/HtmlView";
import File from "./components/File";
import Toolbar from "./components/Toolbar";
import { Main } from "./styled";
import { getLayout, MODE } from "utils/editor-utils";
// import fileUtils from "utils/file-utils";
// import pdfUtils from "utils/pdf-utils";
import { checkComponentDisable } from "utils/editor-utils";
import { EMRProvider } from "../context/EMR";
import { useStore } from "hook";
const EditorPage = (props) => {
  const file = useStore("files.file", {});
  const auth = useStore("auth.auth", {});
  const refContextValue = useRef({
    isDisable: ({ itemProps, signStatus, props }) => {
      return checkComponentDisable(
        auth,
        null,
        itemProps,
        MODE.editing,
        signStatus,
        props
      );
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
  const { getBaoCaoByMaBaoCao, getTemplateBieuMau } = useDispatch().files;

  const [state, _setState] = useState({
    fileOnShow: {},
    zoomValue: 100,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refFile = useRef(null);
  const refForm = useRef(null);
  const { maBaoCao, id } = useParams();
  const { search } = useLocation();
  const layout = useMemo(() => getLayout(file?.cauHinh?.layoutType), [file]);
  const queries = useMemo(() => {
    const queries = {};
    search
      .substring("1")
      .split("&")
      .forEach((item) => {
        const arr = item.split("=");
        queries[arr[0]] = arr[1];
      });
    return queries;
  }, [search]);
  const getData = async (maBaoCao, queries) => {
    try {
      const baoCao = await getBaoCaoByMaBaoCao({ maBaoCao, id, queries });
      await getTemplateBieuMau({
        baoCaoId: baoCao?.id,
        api: baoCao.apiTemplate || baoCao?.api,
      });
    } catch (error) {}
  };
  useEffect(() => {
    if (maBaoCao) {
      getData(maBaoCao, queries);
    }
  }, [maBaoCao, queries]);
  useEffect(() => {
    refContextValue.current.auth = auth;
  }, [auth]);

  const eventMessage = (event = {}) => {
    if (event.data?.TYPE === "EDITOR-SIGNED") {
      onSaveData();
    }
  };

  useEffect(() => {
    window.addEventListener("message", eventMessage, false); //khi thay đổi fileOnShow thì thực hiện register lại event
    return () => {
      window.removeEventListener("message", eventMessage);
    };
  }, [file]);

  const onSaveData = () => {
    if (!refFile.current && file && file.sign && !file.editMode) {
      file.editMode = true;
    } else if (refFile.current) {
      return refFile.current.handleSubmit({ file, id, queries });
    }
  };

  const setZoomValue = (zoom) => {
    setState({
      zoomValue: zoom,
    });
  };
  return (
    <EMRProvider value={refContextValue.current}>
      <Main
        layoutType={file?.cauHinh?.layoutType || "default"}
        width={layout.width}
        height={layout.height}
        zoomValue={state.zoomValue}
      >
        <div className="layout-body">
          <Toolbar
            layoutType={
              // isCheckShowPdf()
              //   ? state?.pdfLayoutHorizontal
              // :
              file?.cauHinh?.layoutType || "default"
            } //truyền layout type vào để xác định khổ giấy khi nhấn in
            fileOnShow={file}
            onSaveData={onSaveData}
            // changeFileOnshow={changeFile}
            // patientDocument={params.patientDocument}
            zoomValue={state.zoomValue}
            setZoomValue={setZoomValue}
            // onChangeNameDocument={onChangeNameDocument}
          />
          <div className="layout-middle">
            <div className={"editing-contain"} id={"main-contain"}>
              <div className="editor-layout">
                <div className={"editing-box"} id="scrollBox" ref={refForm}>
                  <Spin spinning={false}>
                    <div
                      className={"form-content"}
                      data-type={state.fileOnShow?.type}
                    >
                      <File
                        ref={refFile}
                        config={file?.cauHinh || file?.config}
                      />
                    </div>
                  </Spin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </EMRProvider>
  );
};

export default EditorPage;
