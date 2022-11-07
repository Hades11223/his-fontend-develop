import React, { memo, forwardRef, useEffect, useState } from "react";
import { usePrevious } from "hook";
import { SIZE } from "../../utils/vital-signs/constants";
import { drawLine } from "utils/vital-signs/canvas-utils";

const BackgroundCanvas = memo(
  forwardRef(({ canvasWidth, values, canvasHeight }, ref) => {
    const [canvasBg, setCanvasBg] = useState(null);
    const prevValues = usePrevious(values, []);

    useEffect(() => {
      if (canvasBg) {
        canvasBg.height = canvasHeight;
        canvasBg.width = canvasWidth;
        drawBackground(canvasBg);
      }
    }, [canvasWidth, canvasHeight, canvasBg]);

    useEffect(() => {
      try {
        redrawDataDate();
      } catch (error) {}
    }, [values]);

    const redrawDataDate = () => {
      if (
        !prevValues ||
        !values ||
        JSON.stringify(
          prevValues.map((item) => ({
            date: item.date,
            nbPhauThuat: item.nbPhauThuat,
          }))
        ) !==
          JSON.stringify(
            values.map((item) => ({
              date: item.date,
              nbPhauThuat: item.nbPhauThuat,
            }))
          )
      ) {
        if (canvasBg) {
          const context2d = canvasBg.getContext("2d");
          context2d.clearRect(0, 0, canvasWidth, canvasHeight);
          drawBackground(canvasBg);
        }
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
      drawLineRow(context2d);
    };
    const drawLineRow = (ctx) => {
      for (
        let i = 0, j = 0;
        i < canvasHeight - SIZE.headerHeight;
        i = i + SIZE.rowHeight, j++
      ) {
        if (j % 10 === 0 && j != 0) {
          drawLine(
            ctx,
            { x: SIZE.leftColumnWidth, y: i + SIZE.headerHeight },
            { x: canvasWidth, y: i + SIZE.headerHeight },
            1.5
          );
        } else {
          if (j % 2 == 1) continue;
          drawLine(
            ctx,
            { x: SIZE.leftColumnWidth, y: i + SIZE.headerHeight },
            { x: canvasWidth, y: i + SIZE.headerHeight },
            0.5,
            [10, 2]
          );
        }
      }
    };

    return <canvas ref={handleCanvas} style={styles.canvas} />;
  })
);
const styles = {
  canvas: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
  },
};
BackgroundCanvas.displayName = "BackgroundCanvas";

export default BackgroundCanvas;
