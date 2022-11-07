import React from "react";
import { Main } from "./style";

const CanvasTouchable = (props) => {
  const SIZE = {
    columnWidth: 36,
    leftColumnWidth: 0,
    headerHeight: 12,
    rowHeight: 4,
    bottomHeight: 0,
    canvasHeight: 445,
  };
  const getColFromEvent = (e) => {
    return Math.floor(
      (e.nativeEvent.layerX - SIZE.leftColumnWidth) / SIZE.columnWidth
    );
  };

  const onClickCanvas = (e) => {
    const canvasHeight = props.height;
    const values = props.values;
    if (
      !(
        e.nativeEvent.layerX <= SIZE.leftColumnWidth &&
        e.nativeEvent.layerY >= canvasHeight - 100 &&
        e.nativeEvent.layerY <= canvasHeight - 50
      )
    ) {
      const newIndex = getColFromEvent(e); //lấy vị trí cột từ event
      props.onValueChange(newIndex);
    }
  };
  return (
    <Main width={props.width} height={props.height} onClick={onClickCanvas} />
  );
};

CanvasTouchable.propTypes = {
  onValueChange: () => {},
};

export default CanvasTouchable;
