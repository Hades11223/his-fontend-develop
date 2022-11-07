import React, { useState, useEffect, useRef, useMemo } from "react";
import { cloneDeep, isEmpty } from "lodash";
import { connect, useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import { ModalConfirm } from "components/ModalConfirm";
import {
  SelectVitalSignCategory,
  ScrollView,
  ToolBar,
  BloodPressureCanvas,
  BackgroundCanvas,
  LeftColumnCanvas,
  ModalSurgeryInformation,
  CanvasTouchable,
} from "../";
import { SIZE, RADIUS_POINTER } from "utils/vital-signs/constants";
import {
  calculatorPosition,
  drawValueFooter,
  drawValueBody,
} from "utils/vital-signs/canvas-utils";
import { usePrevious } from "hook";
import { Main } from "./styled";
const initState = {
  canvasHeight: SIZE.rowHeight * 75 + SIZE.headerHeight + SIZE.bottomHeight,
  canvasWidth: SIZE.leftColumnWidth,
  currentValue: {},
};

function VitalSigns(props, refs) {
  const canvasHeight1 =
    SIZE.rowHeight * 75 +
    SIZE.headerHeight +
    SIZE.bottomHeight +
    props.moreValueIds.length * 50;
  const [state, _setState] = useState({
    ...initState,
    canvasHeight: canvasHeight1,
  });
  const { isEdit } = props;
  const maxWidth = useMemo(() => {
    return props.isModal
      ? window.screen.width > 1367
        ? 1800
        : 1250
      : window.screen.width < 1367
      ? 1150
      : 1600;
  }, [props.isModal]);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const values = props.values;
  const refModalSurgeryInformation = useRef(null);
  const refCanvas = useRef(null);
  const refCanvasFooter = useRef(null);
  const refDraw = useRef(null);
  const prevValues = usePrevious(values, []);

  useEffect(() => {
    const values = props.values || [];
    let canvasWidth = SIZE.leftColumnWidth + values.length * SIZE.columnWidth;
    setState({
      canvasWidth: Math.max(canvasWidth, maxWidth),
    });
    props.updateData({
      isEditing: false,
      isDeleting: false,
      currentCol: props.values.length - 1,
      allowEdit: false,
    });
  }, []);

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = state.canvasWidth;
      refCanvas.current.height =
        state.canvasHeight -
        (SIZE.bottomHeight + props.moreValueIds.length * 50);
    }
  }, [refCanvas.current]);

  useEffect(() => {
    if (refCanvasFooter.current) {
      refCanvasFooter.current.width = state.canvasWidth;
      refCanvasFooter.current.height =
        SIZE.bottomHeight + props.moreValueIds.length * 50;
    }
  }, [refCanvasFooter.current]);

  useEffect(() => {
    if (
      values &&
      values.length &&
      refCanvasFooter.current &&
      refCanvas.current &&
      !refDraw.current
    ) {
      refDraw.current = true;
      draw(values, true);
    }
  }, [values, props.moreValueIds, refCanvasFooter.current, refCanvas.current]);
  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = state.canvasWidth;
      refCanvas.current.height =
        state.canvasHeight -
        (SIZE.bottomHeight + props.moreValueIds.length * 50);
    }
    if (refCanvasFooter.current) {
      refCanvasFooter.current.width = state.canvasWidth;
      refCanvasFooter.current.height =
        SIZE.bottomHeight + props.moreValueIds.length * 50;
    }
    draw(values, true);
  }, [state.canvasWidth, state.canvasHeight]);

  useEffect(() => {
    if (prevValues.length !== props.values.length) {
      let canvasWidth =
        SIZE.leftColumnWidth + props.values.length * SIZE.columnWidth + 250;
      setState({
        canvasWidth: Math.max(canvasWidth, maxWidth),
      });
    }
  }, [props.values]);

  useEffect(() => {
    setState({
      canvasHeight:
        SIZE.rowHeight * 75 +
        SIZE.headerHeight +
        SIZE.bottomHeight +
        props.moreValueIds.length * 50,
    });
  }, [props.moreValueIds]);

  const redraw = ({
    values,
    isCanvasBody,
    isCanvasFooter,
    isLastColumn,
    isSurgery,
    clearFromIndex,
  }) => {
    let ctxBody, ctxFooter;
    let newValue = cloneDeep(values);
    const lengthValues = newValue.length;
    if (isCanvasBody) {
      ctxBody = refCanvas.current.getContext("2d");
      if (isSurgery) {
        ctxBody.clearRect(
          SIZE.columnWidth * props.currentCol + SIZE.leftColumnWidth,
          0,
          (SIZE.columnWidth + 1) * props.currentCol + SIZE.leftColumnWidth,
          refCanvas.current.height
        );
      } else {
        if (lengthValues === 1) {
          ctxBody.clearRect(
            0,
            0,
            refCanvas.current.width,
            refCanvas.current.height
          );
        } else {
          let x1, x2;
          x2 = isLastColumn
            ? calculatorPosition(
                lengthValues + 1,
                SIZE.columnWidth,
                SIZE.leftColumnWidth + SIZE.columnWidth / 2
              )
            : calculatorPosition(
                props.currentCol,
                SIZE.columnWidth,
                SIZE.leftColumnWidth +
                  SIZE.columnWidth / 2 -
                  (props.currentCol === 0 ? RADIUS_POINTER : 0) // first item + radius of point
              );
          x1 = isLastColumn
            ? calculatorPosition(
                lengthValues - 3,
                SIZE.columnWidth,
                SIZE.leftColumnWidth + SIZE.columnWidth / 2
              )
            : calculatorPosition(
                props.currentCol - 2,
                SIZE.columnWidth,
                SIZE.leftColumnWidth +
                  SIZE.columnWidth / 2 -
                  (props.currentCol === 0 ? RADIUS_POINTER : 0) // first item + radius of point
              );
          const x = isLastColumn
            ? calculatorPosition(
                lengthValues - 2,
                SIZE.columnWidth,
                SIZE.leftColumnWidth + SIZE.columnWidth / 2
              )
            : calculatorPosition(
                props.currentCol - 1,
                SIZE.columnWidth,
                SIZE.leftColumnWidth +
                  SIZE.columnWidth / 2 -
                  (props.currentCol === 0 ? RADIUS_POINTER : 0) // first item + radius of point
              );
          const y = 0;
          const width =
            isLastColumn ||
            (props.currentCol === 0 && clearFromIndex === undefined) // nếu index ==0 và ko phải là đang xoá (clearFromIndex!== undefine) thì khoảng cách update lại chỉ là SIZE.columnWidth + RADIUS_POINTER thôi
              ? //vì nếu là xoá thì phải xoá từ điểm đó về cuối
                SIZE.columnWidth + RADIUS_POINTER
              : clearFromIndex !== undefined // nếu xóa cột thì width tính bằng (số cột - cột hiện tại) * với độ rộng cột + điểm pointer
              ? (lengthValues + 1 - clearFromIndex) * SIZE.columnWidth +
                RADIUS_POINTER
              : SIZE.columnWidth * 2 + RADIUS_POINTER;
          const height = refCanvas.current.height;
          ctxBody.clearRect(x1, y, width, height);
          ctxBody.clearRect(x2, y, width, height);
          ctxBody.clearRect(x, y, width, height);
        }
      }
    }
    if (isCanvasFooter) {
      ctxFooter = refCanvasFooter.current.getContext("2d");
      ctxFooter.clearRect(
        0,
        0,
        refCanvasFooter.current.width,
        refCanvasFooter.current.height
      );
    }
    drawValues({
      ctxBody,
      ctxFooter,
      values: newValue || props.values,
    });
  };

  const drawValues = ({ ctxBody, ctxFooter, values }) => {
    values.forEach((item, index) => {
      try {
        if (ctxBody) {
          drawValueBody({
            ctx: ctxBody,
            item,
            values,
            index,
            columnWidth: SIZE.columnWidth,
            leftColumnWidth: SIZE.leftColumnWidth,
            headerHeight: SIZE.headerHeight,
            bottomHeight: SIZE.bottomHeight,
            totalRow: 75,
            rowHeight: SIZE.rowHeight,
            startValueMach: 30,
            startValueNhiet: 34.5,
          });
        }
        // start footer
        if (ctxFooter) {
          drawValueFooter(
            0,
            ctxFooter,
            index,
            item,
            values,
            props.moreValueIds
          );
        }
      } catch (error) {}
    });
  };

  const draw = (values, redraw) => {
    if (refCanvas.current && !isEmpty(values)) {
      drawValues(
        {
          ctxBody: refCanvas.current.getContext("2d"),
          ctxFooter: refCanvasFooter.current.getContext("2d"),
          values,
        },
        redraw
      );
    }
  };

  const onUpdate = (isDelete) => () => {
    try {
      const values = props.values;
      const day = new Date(values[props.currentCol].thoiGianThucHien);
      let thoiGianThucHien =
        day.getDate() +
        "/" +
        (day.getMonth() + 1) +
        " - " +
        day.getHours() +
        ":" +
        day.getMinutes();

      ModalConfirm({
        content: `Bạn có chắc muốn ${
          isDelete ? "xóa" : "sửa"
        } thông tin tại ngày ${thoiGianThucHien} không ?`,
        cancelButtonProps: { type: "danger", style: { width: 73 } },
        onOk: () => {
          if (isDelete)
            props
              .onDelete()
              .then((values) => {
                redraw({
                  values: values,
                  isCanvasBody: true,
                  isCanvasFooter: true,
                  clearFromIndex: props.currentCol,
                });
              })
              .catch((e) => {});
          else
            props.onUpdate().then((values) => {
              redraw({
                values: values,
                isCanvasBody: true,
                isCanvasFooter: true,
                isLastColumn: false,
              });
            });
        },
        onCancel: () => {},
      });
    } catch (error) {}
  };

  const onCancelUpdate = () => {
    props.onCancel();
    redraw({
      values: props.preValues,
      isCanvasBody: true,
      isCanvasFooter: true,
    });
  };
  useEffect(() => {
    return () => {
      props.updateData({
        isNotFirstClick: false,
      });
    };
  }, []);
  const onValueChange = (values, options) => {
    redraw({ values, ...options });
  };
  const onAddSurgery = (id) => {
    if (refModalSurgeryInformation.current)
      refModalSurgeryInformation.current.show(id, (values) => {
        if (values) redraw({ values, isCanvasBody: true });
      });
  };

  const { canvasWidth, canvasHeight } = state;
  const isDeleting = props.isDeleting;
  return (
    <Main height={canvasHeight} isModal={props.isModal}>
      <ToolBar
        onValueChange={onValueChange}
        onAddSurgery={onAddSurgery}
        isDeleting={isDeleting}
        onCancelUpdate={onCancelUpdate}
        onUpdate={onUpdate(false)}
        onDelete={onUpdate(true)}
        isModal={props.isModal}
        draw={draw}
        refCanvas={refCanvas.current}
        refCanvasFooter={refCanvasFooter.current}
        isEdit={isEdit}
      />
      <div className="vital-signs-body">
        <ScrollView className="scrollview-body" height={canvasHeight}>
          {/* canvas header, collumn */}
          <BackgroundCanvas
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
          <BloodPressureCanvas
            canvasWidth={canvasWidth}
            canvasHeight={
              canvasHeight -
              SIZE.bottomHeight -
              SIZE.headerHeight -
              props.moreValueIds.length * 50
            }
            ref={refCanvas.currentBackground}
          />
          <canvas ref={refCanvas} />
          <canvas ref={refCanvasFooter} />
          <ModalSurgeryInformation ref={refModalSurgeryInformation} />
          {props.isModal ? (
            <CanvasTouchable
              width={canvasWidth}
              height={canvasHeight}
              onValueChange={onValueChange}
              onAddSurgery={onAddSurgery}
            />
          ) : null}
        </ScrollView>
        <LeftColumnCanvas
          canvasWidth={SIZE.leftColumnWidth}
          canvasHeight={canvasHeight}
        />
        <SelectVitalSignCategory
          top={canvasHeight - 100}
          width={SIZE.leftColumnWidth}
          height={50}
          isModal={props.isModal}
        />
      </div>
    </Main>
  );
}

export default connect(
  (state) => {
    return {
      patient: state.vitalSigns.patient,
      values: state.vitalSigns.values || [],
      moreValueIds: state.vitalSigns.moreValueIds || [],
      isEditing: state.vitalSigns.isEditing,
      typeValue: state.vitalSigns.typeValue,
      isDeleting: state.vitalSigns.isDeleting,
      currentCol: state.vitalSigns.currentCol,
      preValues: state.vitalSigns.preValues,
    };
  },
  ({
    vitalSigns: {
      updateData,
      onUpdate,
      onCancel,
      getAllDoctor,
      onCreateSurgery,
      onDelete,
    },
  }) => ({
    updateData,
    onUpdate,
    onCancel,
    getAllDoctor,
    onCreateSurgery,
    onDelete,
  })
)(VitalSigns);
