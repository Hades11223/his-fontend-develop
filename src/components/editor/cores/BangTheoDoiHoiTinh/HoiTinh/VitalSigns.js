import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { cloneDeep, isEmpty } from "lodash";
import BackgroundCanvas from "../../BangTheoDoiBenhNhanHSTC/VitalSigns/components/BackgroundCanvas";
import BloodPressureCanvas from "../../BangTheoDoiBenhNhanHSTC/VitalSigns/components/BloodPressureCanvas";
import { SIZE } from "../../BangTheoDoiBenhNhanHSTC/VitalSigns/utils/vital-signs/constants";
import { RADIUS_POINTER } from "utils/vital-signs/constants";
import {
  calculatorPosition,
  drawValueBody,
} from "utils/vital-signs/canvas-utils";
import stringUtils from "mainam-react-native-string-utils";

function VitalSigns(
  {
    canvasWidth,
    canvasHeight,
    columnWidth,
    rangeBloodPressure,
    values = [],
    bonusSize = 0.5,
  },
  ref
) {
  const refCanvas = useRef(null);

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.height = canvasHeight;
    }
  }, [refCanvas.current]);

  useEffect(() => {
    if (values && refCanvas.current) {
      draw(values, true);
    }
  }, [values, refCanvas.current]);

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = canvasWidth;
      refCanvas.current.height = canvasHeight;
    }
    draw(values, true);
  }, [canvasWidth, canvasHeight]);

  useImperativeHandle(ref, () => ({
    redraw,
  }));

  const redraw = ({
    values,
    isCanvasBody,
    isLastColumn,
    clearFromIndex,
    index,
  }) => {
    let ctxBody;
    let newValue = cloneDeep(values);

    const lengthValues = newValue.length;
    if (isCanvasBody && refCanvas.current) {
      ctxBody = refCanvas.current.getContext("2d");

      if (lengthValues === 1) {
        ctxBody.clearRect(
          0,
          0,
          refCanvas.current.width,
          refCanvas.current.height
        );
      } else {
        const x = isLastColumn
          ? calculatorPosition(
              lengthValues - 2,
              columnWidth,
              SIZE.leftColumnWidth + columnWidth / 2
            )
          : calculatorPosition(
              index - 1,
              columnWidth,
              SIZE.leftColumnWidth +
                columnWidth / 2 -
                (index === 0 ? RADIUS_POINTER : 0) // first item + radius of point
            );
        const y = 0;
        const width =
          isLastColumn || (index === 0 && clearFromIndex === undefined) // nếu index ==0 và ko phải là đang xoá (clearFromIndex!== undefine) thì khoảng cách update lại chỉ là columnWidth + RADIUS_POINTER thôi
            ? //vì nếu là xoá thì phải xoá từ điểm đó về cuối
              columnWidth + RADIUS_POINTER
            : clearFromIndex !== undefined // nếu xóa cột thì width tính bằng (số cột - cột hiện tại) * với độ rộng cột + điểm pointer
            ? (lengthValues + 1 - clearFromIndex) * columnWidth + RADIUS_POINTER
            : columnWidth * 2 + RADIUS_POINTER;
        const height = refCanvas.current.height;
        ctxBody.clearRect(x, y, width, height);
      }
    }
    drawValues({
      ctxBody,
      values: newValue || values,
    });
  };

  const drawValues = ({ ctxBody, values }, isRedraw) => {
    if (!isRedraw) {
      let preMach, preNhiet;
      for (let index = 0; index < values.length; index++) {
        let item = values[index];
        try {
          if (ctxBody) {
            drawValueBody({
              ctx: ctxBody,
              item: { ...item, nhiet: item.nhietDo },
              values: values.map((item) => {
                const newItem = { ...item, nhiet: item.nhietDo };
                return newItem;
              }),
              index,
              columnWidth: columnWidth + bonusSize,
              headerHeight: SIZE.headerHeight,
              bottomHeight: 0,
              startValueMach: 20,
              startValueNhiet: 34,
              totalRow: 80,
              rowHeight: SIZE.rowHeight,
              preData: { mach: preMach, nhiet: preNhiet },
            });
          }
        } catch (error) {}
        if (item.mach) {
          preMach = index;
        }
        if (item.nhietDo) {
          preNhiet = index;
        }
      }
    } else {
      redraw({ values, isCanvasBody: true, clearFromIndex: 0, index: 0 });
    }
  };

  const draw = (values, redraw) => {
    if (refCanvas.current && !isEmpty(values)) {
      drawValues(
        {
          ctxBody: refCanvas.current.getContext("2d"),
          values,
        },
        redraw
      );
    }
  };

  return (
    <div
      style={{ position: "absolute", left: "-1px" }}
      id={stringUtils.guid()}
      className="canvas-vital-signs"
      data-width={columnWidth}
    >
      <BackgroundCanvas
        values={values}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <BloodPressureCanvas
        values={values}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        columnWidth={columnWidth + bonusSize}
        rangeBloodPressure={rangeBloodPressure}
        ref={refCanvas.currentBackground}
      />
      <canvas ref={refCanvas} />
    </div>
  );
}

export default forwardRef(VitalSigns);
