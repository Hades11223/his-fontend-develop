import React, { memo, forwardRef, useEffect, useState } from "react";
import { usePrevious } from "hook";
import { isEqual } from "lodash";
import { SIZE } from "utils/vital-signs/constants";
import { drawBodyBloodPressure } from "utils/vital-signs/canvas-utils";
import { connect } from "react-redux";

const StaticCanvas = memo(
  forwardRef(
    ({ canvasWidth, values, canvasHeight, rangeBloodPressure }, ref) => {
      const [canvasStatic, setCanvasStatic] = useState(null);
      const [bloodPressure, setBloodPressure] = useState([]);
      const prevRangeBloodPressure = usePrevious(rangeBloodPressure, []);

      useEffect(() => {
        if (canvasStatic) {
          if (canvasStatic.height !== canvasHeight)
            canvasStatic.height = canvasHeight;
          if (canvasStatic.width !== canvasWidth)
            canvasStatic.width = canvasWidth;
          drawValues();
        }
      }, [canvasWidth, canvasHeight]);

      useEffect(() => {
        if (
          canvasStatic &&
          (!isEqual(prevRangeBloodPressure, rangeBloodPressure) ||
            !isEqual(bloodPressure, handleListBloodPressure(values)))
        ) {
          canvasStatic
            .getContext("2d")
            .clearRect(0, 0, canvasWidth, canvasHeight);
          drawValues();
        }
      }, [rangeBloodPressure, canvasStatic, values]);

      const handleListBloodPressure = (data = []) => {
        const listBloodPressure = data.reduce((finalItem, item) => {
          finalItem.push(item.huyetap);
          return finalItem;
        }, []);
        setBloodPressure(listBloodPressure);
        return listBloodPressure;
      };

      const drawValue = (item, index) => {
        if (canvasStatic) {
          drawBodyBloodPressure({
            ctx: canvasStatic.getContext("2d"),
            item,
            huyetAp: item.huyetap,
            index,
            canvasHeight,
            bottomHeight: 0,
            headerHeight: 0,
            rangeBloodPressure,
            columnWidth: SIZE.columnWidth,
            bloodPressureHeight: 150,
            bottomRangeBloodPressure: 10,
            rowHeight: SIZE.rowHeight,
            totalRow: 75,
            leftColumnWidth: SIZE.leftColumnWidth,
          });
        }
      };

      const drawValues = () => {
        values.forEach((item, index) => {
          if (!item) {
            return;
          }
          try {
            drawValue(item, index);
          } catch (error) {}
        });
      };

      const handleCanvasStatic = (canvasSt) => {
        if (!canvasSt || canvasStatic) {
          return;
        }
        setCanvasStatic(canvasSt);
        canvasSt.width = canvasWidth;
        canvasSt.height = canvasHeight;
      };

      return <canvas ref={handleCanvasStatic} style={styles.canvasStatic} />;
    }
  )
);

const styles = {
  canvasStatic: {
    position: "absolute",
    left: 0,
    right: 0,
    top: SIZE.headerHeight,
    backgroundColor: "transparent",
  },
};
StaticCanvas.displayName = "StaticCanvas";

export default connect((state) => {
  return {
    values: state.vitalSigns.values || [],
    rangeBloodPressure: state.vitalSigns.rangeBloodPressure || [],
  };
})(StaticCanvas);
