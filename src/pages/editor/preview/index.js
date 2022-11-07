import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import File from "../report/components/File";
import Toolbar from "../report/components/Toolbar";
import { Main } from "../report/styled";
import { getLayout, MODE } from "utils/editor-utils";
import { useQueryString, useStore } from "hook";
import { checkComponentDisable } from "utils/editor-utils";
import { EMRProvider } from "../context/EMR";

const Files = (props) => {
  const file = useStore("files.file", {});
  const auth = useStore("auth.auth", {});
  const pathName = window.location.pathname;
  const isPreview = pathName.includes("preview");
  const [templateId] = useQueryString("templateId", "");

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
  const { getBaoCaoBaoCaoPreview, getTemplateBieuMau } = useDispatch().files;
  const [state, _setState] = useState({
    fileOnShow: {},
    zoomValue: 100,
    showDown: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refFile = useRef(null);
  const refForm = useRef(null);
  const { baoCaoId } = useParams();
  const layout = useMemo(() => getLayout(file?.cauHinh?.layoutType), [file]);

  // const onScroll = (e) => {
  //   let obj = e.target;
  //   const scrollTop = obj.scrollTop;
  //   const position = obj.scrollHeight - obj.offsetHeight - scrollTop;
  //   if (position < 70) {
  //     setState({
  //       showDown: false,
  //     });
  //   } else {
  //     setState({
  //       showDown: true,
  //     });
  //   }
  // };

  useEffect(() => {
    if (baoCaoId) {
      const getData = async (baoCaoId) => {
        try {
          const baoCao = await getBaoCaoBaoCaoPreview({ baoCaoId });
          await getTemplateBieuMau({
            baoCaoId,
            id: templateId,
            api: baoCao.apiTemplate || baoCao?.api,
          });
        } catch (error) {
          console.log(error);
        }
      };
      getData(baoCaoId);
    }
  }, []);

  const setZoomValue = useCallback((zoom) => {
    setState({
      zoomValue: zoom,
    });
  }, []);
  const onSaveData = useCallback(() => {
    if (refFile.current && !isPreview) {
      return refFile.current.handleSubmit({ file, isSaveTemplate: true });
    }
  }, [file]);
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
            layoutType={file?.cauHinh?.layoutType || "default"} //truyền layout type vào để xác định khổ giấy khi nhấn in
            fileOnShow={file}
            zoomValue={state.zoomValue}
            setZoomValue={setZoomValue}
            previewMode={true}
            onSaveData={onSaveData}
            isPreview={isPreview}
          />
          <div className="layout-middle">
            <div className={"editing-contain"} id={"main-contain"}>
              <div className="editor-layout">
                <div
                  className={"editing-box"}
                  id="scrollBox"
                  // onScroll={onScroll}
                  ref={refForm}
                >
                  <Spin
                    spinning={
                      false
                      // isFormDataLoading || isFileLoading || isListFilesLoading
                    }
                  >
                    <div
                      className={"form-content"}
                      data-type={state.fileOnShow?.type}
                    >
                      <File
                        ref={refFile}
                        config={file?.cauHinh || file?.config}
                        isPreview={isPreview}
                        isTemplate={!isPreview}
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

export default memo(Files);
