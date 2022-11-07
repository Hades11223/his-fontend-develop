import React, { memo, forwardRef, useEffect, useState } from "react";
import { isEmpty, cloneDeep } from "lodash";
import { usePrevious } from "hook";
import { SIZE, BLOOD_PRESSURE } from "utils/vital-signs/constants";
import {
  drawText,
  handleBloodPressure,
  drawLeftColumnFooter,
  drawLeftColumnBloodPressure,
  drawLeftColumnBackground,
} from "utils/vital-signs/canvas-utils";
import { connect } from "react-redux";
const LeftColumnCanvas = memo(
  forwardRef(
    (
      {
        canvasWidth,
        values,
        canvasHeight,
        updateData,
        rangeBloodPressure,
        moreValueIds,
        vitalSignsCategories,
      },
      ref
    ) => {
      const [canvasBg, setCanvasBg] = useState(null);
      const preValues = usePrevious(values);
      const { leftColumnWidth } = SIZE;
      const sizeLeftItem = leftColumnWidth / 3;
      const bottomHeight = SIZE.bottomHeight + moreValueIds.length * 50;

      useEffect(() => {
        if (canvasBg) {
          canvasBg.height = canvasHeight;
          canvasBg.width = canvasWidth;
          const context2d = canvasBg.getContext("2d");
          context2d.clearRect(0, 0, canvasWidth, canvasHeight);
          context2d.beginPath();
          context2d.rect(0, 0, canvasWidth, canvasHeight);
          context2d.fillStyle = "#FFF";
          context2d.fill();

          drawBackground(canvasBg);
          drawLeftColumnBloodPressure(context2d, rangeBloodPressure);
        }
      }, [canvasWidth, canvasHeight, canvasBg, rangeBloodPressure]);

      useEffect(() => {
        if (!preValues || JSON.stringify(preValues) !== JSON.stringify(values))
          getRangeBloodPressure();
      }, [values]);

      const getRangeBloodPressure = () => {
        const cloneValues = cloneDeep(values);
        const indexOfLastItemHasValue =
          cloneValues.length -
          1 -
          cloneValues.reverse().findIndex((item) => !!item.huyetap);
        const newValue = handleBloodPressure(
          values[indexOfLastItemHasValue] &&
            values[indexOfLastItemHasValue].huyetap
        );

        const listShow =
          BLOOD_PRESSURE.find(
            (item) =>
              item.min <= newValue.huyetApTamTruong &&
              newValue.huyetApTamTruong <= item.max
          ) &&
          BLOOD_PRESSURE.find(
            (item) =>
              item.min <= newValue.huyetApTamTruong &&
              newValue.huyetApTamTruong <= item.max
          ).listShow;
        if (!isEmpty(listShow)) {
          updateData({
            rangeBloodPressure: listShow || [],
          });
        } else {
          updateData({
            rangeBloodPressure: BLOOD_PRESSURE[0].listShow,
          });
        }
      };

      const handleCanvas = (bgCanvas) => {
        if (!bgCanvas || canvasBg) {
          return;
        }
        setCanvasBg(bgCanvas);
        bgCanvas.width = canvasWidth;
        bgCanvas.height = canvasHeight;
      };

      const drawBackground = (bgCanvas) => {
        if (!bgCanvas) {
          return;
        }
        const context2d = bgCanvas.getContext("2d");
        drawLeftColumnBackground(
          context2d,
          canvasWidth,
          canvasHeight,
          sizeLeftItem,
          bottomHeight
        );
        drawHeader(context2d);
        drawLeftColumnFooter({
          ctx: context2d,
          moreValueIds: moreValueIds,
          vitalSignsCategories: vitalSignsCategories,
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight,
          bottomHeight: bottomHeight,
          isPrintMode: false,
        });
      };

      const drawHeader = (ctx) => {
        drawText(ctx, "Ngày/tháng", { x: 10, y: 20 });
        drawText(ctx, "Huyết", { x: 10, y: 50 });
        drawText(ctx, "áp", { x: 10, y: 70 });
        drawText(ctx, "Mạch", { x: sizeLeftItem + 5, y: 50 });
        drawText(ctx, "L/ph", { x: sizeLeftItem + 5, y: 70 });
        drawText(ctx, "Nhiệt", { x: sizeLeftItem * 2 + 5, y: 50 });
        drawText(ctx, "độ C", { x: sizeLeftItem * 2 + 5, y: 70 });
      };

      return <canvas ref={handleCanvas} style={styles.canvas} />;
    }
  )
);
const styles = {
  canvas: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 102,
  },
};
LeftColumnCanvas.displayName = "LeftColumnCanvas";

const mapDispatch = ({ vitalSigns: { updateData } }) => ({
  updateData,
});

export default connect((state) => {
  return {
    values: state.vitalSigns.values || [],
    moreValueIds: state.vitalSigns.moreValueIds || [],
    rangeBloodPressure: state.vitalSigns.rangeBloodPressure || [],
    vitalSignsCategories: state.chiSoSong._listDataTongHop,
  };
}, mapDispatch)(LeftColumnCanvas);
