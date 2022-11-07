import React, { memo, forwardRef, useEffect, useState } from "react";
import { usePrevious } from "hook";
import { SIZE } from "utils/vital-signs/constants";
import { drawLine, drawDate } from "utils/vital-signs/canvas-utils";
import { connect } from "react-redux";

const BackgroundCanvas = memo(
  forwardRef(({ canvasWidth, values, canvasHeight, moreValueIds }, ref) => {
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
            thoiGianThucHien: item.thoiGianThucHien,
            ptTtId: item.ptTtId,
          }))
        ) !==
          JSON.stringify(
            values.map((item) => ({
              thoiGianThucHien: item.thoiGianThucHien,
              ptTtId: item.ptTtId,
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
      drawLineColumn(context2d);
      // drawLeftColumn(context2d);
      drawHeader(context2d);
      drawFooter(context2d);
    };
    const drawLineRow = (ctx) => {
      for (
        let i = 0;
        i <
        canvasHeight -
          SIZE.bottomHeight -
          SIZE.headerHeight -
          moreValueIds.length * 50;
        i = i + SIZE.rowHeight
      ) {
        if (i % (SIZE.rowHeight * 10) === 0) {
          drawLine(
            ctx,
            { x: SIZE.leftColumnWidth, y: i + SIZE.headerHeight },
            { x: canvasWidth, y: i + SIZE.headerHeight },
            1.5
          );
        } else {
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

    const drawLineColumn = (ctx) => {
      for (let i = 0; i < values.length + 1; i++) {
        drawLine(
          ctx,
          { x: i * SIZE.columnWidth + SIZE.leftColumnWidth, y: 0 },
          {
            x: i * SIZE.columnWidth + SIZE.leftColumnWidth,
            y: canvasHeight,
          },
          0.5
        );
      }
      drawLine(
        ctx,
        { x: canvasWidth, y: 0 },
        {
          x: canvasWidth,
          y: canvasHeight,
        },
        0.5
      );
    };

    const drawFooter = (ctx) => {
      let x = (SIZE.bottomHeight + moreValueIds.length * 50) / 50;
      let bottom = SIZE.bottomHeight + moreValueIds.length * 50;
      for (let i = 0; i <= x; i++) {
        drawLine(
          ctx,
          {
            x: SIZE.leftColumnWidth,
            y: canvasHeight - bottom + i * 50,
          },
          {
            x: canvasWidth,
            y: canvasHeight - bottom + i * 50,
          },
          0.5,
          []
        );
      }
    };

    const drawHeader = (ctx) => {
      //line header 1
      drawLine(
        ctx,
        { x: SIZE.leftColumnWidth, y: 0 },
        { x: canvasWidth, y: 0 },
        1,
        []
      );
      //line header 2
      drawLine(
        ctx,
        { x: SIZE.leftColumnWidth, y: 30 },
        { x: canvasWidth, y: 30 },
        0.5,
        []
      );
      //line header 3
      drawLine(
        ctx,
        { x: SIZE.leftColumnWidth, y: 80 },
        { x: canvasWidth, y: 80 },
        0.5,
        []
      );
      drawDate(ctx, values);
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

export default connect((state) => {
  return {
    values: state.vitalSigns.values || [],
    moreValueIds: state.vitalSigns.moreValueIds || [],
  };
})(BackgroundCanvas);
