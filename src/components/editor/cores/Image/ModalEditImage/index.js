import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import { init, start, stroke, stop, undo, redo, clear, drawText } from "./draw";
import { Dropdown, Menu } from "antd";
import PickColor from "components/editor/config/EditorTool/PickColor";
import BrushSize from "components/editor/config/EditorTool/BrushSize";
import { fontSizes } from "components/editor/config/EditorTool/TextTool/constants";
import { useCamera } from "hook";
import {
  FontColorsOutlined,
  FileImageOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { ModalTemplate, Button } from "components";
import ModalAddText from "../ModalAddText";
import { cloneDeep } from "lodash";

const ModalEditImage = ({ footer, handleChangeImage, ...rest }, ref) => {
  const { t } = useTranslation();
  const { onShowCamera } = useCamera();
  const [state, _setState] = useState({
    open: false,
    imgSrc: null,
    initCanvas: { color: "#0000ff", lineWidth: 1 },
    canvasState: null,
    drawType: 1,
    size: 16,
    text: "text",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refImg = useRef();
  const refCanvas = useRef();
  const refCanvasState = useRef();
  const refModalAddText = useRef();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const refNumAddText = useRef(null);
  const refCanvasWrapper = useRef(null);
  const handleLoadImg = (e) => {
    const imgElm = e.currentTarget;
    const canvasElm = refCanvas.current;
    const ctx = canvasElm.getContext("2d");
    ctx.canvas.width = imgElm.width;
    ctx.canvas.height = imgElm.height;
    refCanvasWrapper.current.style.width = imgElm.width + "px";
    refCanvasWrapper.current.style.height = imgElm.height + "px";
    ctx.drawImage(imgElm, 0, 0, imgElm.width, imgElm.height);
    refCanvasState.current = canvasElm;
    setState({
      imageWidth: imgElm.width,
      //   canvasState: canvasElm,
    });
  };

  useEffect(() => {
    if (refCanvasState.current && state.initCanvas)
      init(refCanvasState.current, state.initCanvas);
  }, [state.initCanvas]);

  useEffect(() => {
    if (refCanvasState.current) {
      clear(refCanvasState.current, state.imgSrc);
    }
  }, [state.imgSrc, state.show]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const handleColorBrush = (color) => {
    let initCanvas = { ...state.initCanvas, color };
    setState({
      initCanvas,
    });
  };

  const handleClear = () => {
    clear(refCanvasState.current, state.imgSrc);
  };

  const handleChangeSize = (size) => {
    let initCanvas = { ...state.initCanvas, lineWidth: size };
    setState({
      initCanvas,
    });
  };

  const onOK = (ok) => () => {
    if (ok)
      if (refCallback.current) {
        refCallback.current(refCanvasState.current?.toDataURL("image/png"));
      }
    setState({ show: false });
  };

  const onTouchStart = (e) => {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    if (state.drawType != 1) {
      if (state.drawType == 4) {
        refNumAddText.current++;
        if (refNumAddText.current != 1) {
          undo(refCanvasState.current);
          let e2 = cloneDeep(e);
          setTimeout(
            (event) => {
              drawText(
                event,
                refCanvasState.current,
                state?.text,
                state?.size,
                state.initCanvas.color
              );
            },
            1,
            e2
          );
        } else {
          drawText(
            e,
            refCanvasState.current,
            state?.text,
            state?.size,
            state.initCanvas.color
          );
        }
      } else {
        drawText(
          e,
          refCanvasState.current,
          state.drawType == 2 ? "x" : "o",
          (state.initCanvas.lineWidth || 10) * 6,
          state.initCanvas.color
        );
      }
    } else {
      start(e, refCanvasState.current);
    }
  };
  const onTouchEnd = (e) => {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    if (state.drawType == 1) stop(e, refCanvasState.current);
  };
  const onTouchMove = (e) => {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    if (state.drawType == 1)
      stroke(e, refCanvasState.current, state.initCanvas.color);
  };

  const onChangeDrawType = (e) => {
    const initCanvas = state.initCanvas;
    if (e.key != 1 && state.drawType == 1) {
      initCanvas.lineWidth = 5;
    }
    setState({
      drawType: e.key,
      initCanvas,
    });
    if (e.key == 4) {
      onShowModal("addText");
    }
  };

  // const avatarLocal = state.imgSrc ? ` ${state.imgSrc}` : "";
  useImperativeHandle(ref, () => ({
    show: (data, callBack) => {
      setState({
        show: true,
        imgSrc: data.imgSrc,
        isSign: data?.isSign || false || "",
        initCanvas: !data?.isSign
          ? {
              color: "#0000ff",
              lineWidth: state.drawType == 1 ? 1 : state.initCanvas.lineWidth,
            }
          : { color: "#6161b1", lineWidth: 2 },
      });
      refCallback.current = callBack;
    },
  }));
  const onShowModal = (type) => () => {
    if (type == "camera") {
      onShowCamera(
        { title: t("common.chupAnh") },
        async (file, base64) => {
          return base64;
        },
        (image) => {
          setState({
            imgSrc: image,
          });
        }
      );
    } else {
      refModalAddText.current &&
        refModalAddText.current.show(
          {
            text: state.text,
            size: state.size,
          },
          (data) => {
            setState({
              drawType: 4,
              text: data?.text,
              size: fontSizes[+data.size],
            });
            refNumAddText.current = 0;
          }
        );
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      title={t("editor.chinhSuaAnh")}
      width={Math.max(520, state.imageWidth)}
      // closable={false}
      // maskClosable={false}
    >
      <Main>
        <div className="action-top">
          <Button height={30} minWidth={60} onClick={handleClear}>
            {t("editor.clear")}
          </Button>
          <Button
            height={30}
            minWidth={60}
            onClick={() => redo(refCanvasState.current)}
          >
            {t("editor.redo")}
          </Button>
          <Button
            height={30}
            minWidth={60}
            onClick={() => undo(refCanvasState.current)}
          >
            {t("editor.undo")}
          </Button>
          <Button
            height={30}
            minWidth={100}
            type="primary"
            onClick={onOK(true)}
            iconHeight={15}
            rightIcon={<SaveOutlined />}
          >
            {t("common.luu")}
          </Button>
        </div>
        <div className="image-canvas">
          <div className="canvas-wrapper" ref={refCanvasWrapper}>
            <img
              className="img"
              onLoad={handleLoadImg}
              src={state.imgSrc}
              ref={refImg}
              alt=""
            />
            <canvas
              className="canvas"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onTouchMove={onTouchMove}
              onTouchCancel={onTouchEnd}
              onMouseDown={onTouchStart}
              onMouseUp={onTouchEnd}
              onMouseMove={onTouchMove}
              onMouseOut={onTouchEnd}
              ref={refCanvas}
            ></canvas>
          </div>
        </div>
        <div className="action-bottom">
          {!state?.isSign && (
            <Button
              onClick={onShowModal("camera")}
              type="success"
              height={30}
              minWidth={100}
              rightIcon={<FileImageOutlined />}
              iconHeight={15}
            >
              {t("common.chupAnh")}
            </Button>
          )}
          <div className="option-edit-image">
            {state.drawType == 4 && (
              <Button
                onClick={onShowModal("addText")}
                type="success"
                height={30}
              >
                {t("editor.nhapChu")}
              </Button>
            )}
            <PickColor
              iconComponent={FontColorsOutlined}
              dataColor={state.initCanvas.color}
              changeColor={handleColorBrush}
            />
            <BrushSize
              onChangeSize={handleChangeSize}
              value={state.initCanvas.lineWidth}
            />
            <Dropdown.Button
              size={"small"}
              overlay={
                <Menu onClick={onChangeDrawType}>
                  <Menu.Item key="1">{t("editor.ve")}</Menu.Item>
                  <Menu.Item key="2">{t("editor.danhDauX")}</Menu.Item>
                  <Menu.Item key="3">{t("editor.danhDauO")}</Menu.Item>
                  <Menu.Item key="4">{t("editor.nhapChu")}</Menu.Item>
                </Menu>
              }
            >
              {state.drawType == 1
                ? t("editor.ve")
                : state.drawType == 2
                ? t("editor.danhDauX")
                : state.drawType == 3
                ? t("editor.danhDauO")
                : t("editor.nhapChu")}
            </Dropdown.Button>
          </div>
        </div>
      </Main>
      <ModalAddText ref={refModalAddText} />
    </ModalTemplate>
  );
};

export default forwardRef(ModalEditImage);
