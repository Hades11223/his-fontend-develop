import React, { useState, useRef, useEffect } from "react";
import { isArrayEqual } from "utils/vital-signs/helpers";
import { cloneDeep } from "lodash";
import { connect, useSelector } from "react-redux";
import {
  ModalChangeDate,
  ModalInput,
  InputValue,
  ModalSurgeryInformation,
  SurgeryDetail,
  ColumnState,
} from "../";
import { SIZE } from "utils/vital-signs/constants";
import { pointToValue } from "utils/vital-signs/canvas-utils";
import { message } from "antd";
import { Main } from "./styled";
import ModalSynthetic from "../ModalSynthetic";
export const refClickCanvas = React.createRef({});
const CanvasTouchable = (props, refs) => {
  const values = props.values;
  const refInputValue = useRef(null);
  const refChangeDate = useRef(null);
  const refModalInput = useRef(null);
  const refModalSurgeryInformation = useRef(null);
  const {
    danhSachNguoiBenhNoiTru: { infoPatient },
    auth: {
      auth: { authorities },
    },
    vitalSigns: { typeValue, isNotFirstClick, moreValueIds = [] },
    chiSoSong: { _listDataTongHop },
  } = useSelector((state) => state);

  const refModalSynthetic = useRef(null);
  const onChangeDate = (date, index) => {
    if (index == -1) index = 0;
    let values = cloneDeep(props.values);
    values[index].thoiGianThucHien = date;

    props.updateData({
      values,
    });
    props.onValueChange(values);
  };
  const onClickHeader = (index, isLastColumn) => {
    index = parseInt(index);
    if (
      (props.isEditing && index == props.currentCol) ||
      (!props.isEditing && isLastColumn)
    )
      refChangeDate.current.show(
        values[index]?.thoiGianThucHien?.toDateObject
          ? values[index].thoiGianThucHien.toDateObject()
          : values[index].thoiGianThucHien,
        index,
        (date) => {
          onChangeDate(date, index);
        }
      );
  };
  const getColFromEvent = (e) => {
    return Math.floor(
      (e.nativeEvent.layerX - SIZE.leftColumnWidth) / SIZE.columnWidth
    );
  };
  const checkIsClickInBodyCanvas = (e) => {
    const canvasHeight = props.height;

    return (
      e.nativeEvent.layerY > SIZE.headerHeight &&
      e.nativeEvent.layerY <=
        canvasHeight - SIZE.bottomHeight - props.moreValueIds.length * 50
    );
  };
  const checkIsClickInHeaderCanvas = (e) => {
    return e.nativeEvent.layerY < SIZE.headerHeight;
  };
  useEffect(() => {
    if (isNotFirstClick) {
      showModal({
        type:
          typeValue == 1 ? "nhipMach" : typeValue == 2 ? "nhietDo" : "huyetap",
        values: props.values,
        index: props.values.length - 1,
        isLastColumn: true,
        isEditing: false,
      });
    }
  }, [typeValue]);

  const onClickCanvas = (e) => {
    refClickCanvas.current = true;
    const canvasHeight = props.height;
    const isEditing = props.isEditing;
    const isDeleting = props.isDeleting;
    const values = props.values;
    const newValues = cloneDeep(values);
    if (
      !(
        e.nativeEvent.layerX <= SIZE.leftColumnWidth &&
        e.nativeEvent.layerY >= canvasHeight - 100 &&
        e.nativeEvent.layerY <= canvasHeight - 50
      )
    ) {
      const newIndex = getColFromEvent(e); //lấy vị trí cột từ event
      const isLastColumn = newIndex == values.length - 1; //check xem cột đó có phải là cột cuối cùng không (cột cuối cùng là cột tự trắng, tự thêm khi load)

      const isBody = checkIsClickInBodyCanvas(e);
      const isHeader = checkIsClickInHeaderCanvas(e);
      const isNormalState = !isEditing && !isDeleting;
      //set edit column
      if (isLastColumn) {
        if (isNormalState) {
          props.updateData({
            isEditing: false,
            allowEdit: false,
            currentCol: newIndex,
          });
        }
      } else if (values[newIndex] && !isDeleting && !isEditing) {
        props.updateData({
          allowEdit: true,
          currentCol: newIndex,
        });
      }
      if (props.currentCol === newIndex || isLastColumn) {
        if (isHeader) {
          onClickHeader(newIndex, isLastColumn);
        } else if (isBody) {
          if ((isEditing && !isLastColumn) || (isLastColumn && isNormalState)) {
            editBody(newIndex, e, newValues, isLastColumn, isEditing);
          }
          //Nếu đang ở chế độ xóa thì không cho phép nhấn vào màn hình
          // if (isDeleting && !isLastColumn) {
          //   if (type === 1) {
          //     newValues[newIndex].mach = 0;
          //   } else {
          //     newValues[newIndex].nhiet = 0;
          //   }
          // }
        } else {
          // footer
          let x =
            e.nativeEvent.layerY -
            (canvasHeight - SIZE.bottomHeight - props.moreValueIds.length * 50);
          if (x > SIZE.bottomHeight + props.moreValueIds.length * 50 - 100)
            return;
          let y = parseInt(x / 50);
          const listDataFooter = ["huyetap", "nhipTho", "canNang"];
          if (y > listDataFooter.length - 1) {
            if (
              ((isEditing || isDeleting) && !isLastColumn) ||
              (isLastColumn && isNormalState)
            ) {
              let i = y - listDataFooter.length;
              let _index = (
                newValues[newIndex].dsChiSoSongKhac || []
              ).findIndex((t) => t.chiSoSongId === props.moreValueIds[i]);
              let dsChiSoSongKhac = {
                chiSoSongId: props.moreValueIds[i],
                giaTri: "",
                tenChiSo: "",
              };
              if (_index !== -1)
                dsChiSoSongKhac = (newValues[newIndex].dsChiSoSongKhac || [])[
                  _index
                ];
              if (isDeleting && !isLastColumn) {
                if (_index >= 0) {
                  newValues[newIndex].dsChiSoSongKhac.splice(_index, 1);
                }
                props.updateData({
                  values: newValues,
                });
                props.onValueChange(newValues, { isCanvasFooter: true });
              } else if (refModalInput.current) {
                const chiSoSongId = _listDataTongHop.find(
                  (item) => item.id == dsChiSoSongKhac?.chiSoSongId
                );
                refModalInput.current.show(
                  {
                    value: dsChiSoSongKhac.giaTri,
                    type: 3,
                    keyboardType: "numeric",
                    chiSoSongId,
                  },
                  (value) => {
                    dsChiSoSongKhac.giaTri = value;
                    if (!newValues[newIndex].dsChiSoSongKhac)
                      newValues[newIndex].dsChiSoSongKhac = [];

                    if (!value === "") {
                      newValues[newIndex].dsChiSoSongKhac = newValues[
                        newIndex
                      ].dsChiSoSongKhac.filter(
                        (t) => t.dmChiSoId !== dsChiSoSongKhac.dmChiSoId
                      );
                    } else {
                      if (_index === -1)
                        newValues[newIndex].dsChiSoSongKhac.push(
                          dsChiSoSongKhac
                        );
                      else
                        newValues[newIndex].dsChiSoSongKhac[_index] =
                          dsChiSoSongKhac;
                    }
                    props.updateData({
                      values: newValues,
                    });
                    props.onValueChange(newValues, { isCanvasFooter: true });
                  },
                  {}
                );
              }
            }
          } else {
            const currentValueOfFooter = listDataFooter[y];
            if (isDeleting && !isLastColumn && currentValueOfFooter) {
              newValues[newIndex][currentValueOfFooter] = "";
            }
            if (
              (isEditing && !isLastColumn) ||
              (isLastColumn && isNormalState && refInputValue.current)
            ) {
              showModal({
                type: currentValueOfFooter,
                values: newValues,
                index: newIndex,
                isLastColumn,
                isEditing,
              });
              // if (refModalInput.current)
              //   refModalInput.current.show(
              //     {
              //       value: newValues[newIndex][currentValueOfFooter],
              //       type: y,
              //       keyboardType: "numeric",
              //     },
              //     onOK
              //   );
            }
          }
        }

        if (!isArrayEqual(values, newValues)) {
          props.updateData({
            values: newValues,
          });
          props.onValueChange(newValues, {
            isCanvasBody: isBody,
            isCanvasFooter: !isBody && isDeleting,
            isLastColumn: isLastColumn,
          });
        }
      }
    }
  };
  const showModal = ({
    x,
    y,
    type = "",
    values = {},
    index = 0,
    valuesCurrent = "",
    isLastColumn = true,
    isEditing = false,
  }) => {
    refModalSynthetic.current.show(
      x,
      y,
      {
        type,
        values,
        index,
        valuesCurrent,
        isLastColumn,
        isEditing,
      },
      props.onValueChange
    );
  };

  const editBody = (index, e, values, isLastColumn, isEditing) => {
    if (props.typeValue === 1) {
      const value = parseInt(
        pointToValue({
          point: e.nativeEvent.layerY,
          type: props.typeValue,
          rowHeight: SIZE.rowHeight,
          totalRow: 75,
          headerHeight: SIZE.headerHeight,
          bottomHeight: SIZE.bottomHeight,
        })
      );
      if (!values[index]) return;
      if (isLastColumn && !values[index]?.nhietDo && !values[index]?.mach) {
        const dataPrev = {
          ...values[index - 1],
          thoiGianThucHien: values[index].thoiGianThucHien,
        };
        values[index] = dataPrev;
      }
      if (
        values[index - 1]?.auToAddMach ||
        (!values[index - 1]?.mach && values[index - 2]?.mach)
      ) {
        values[index - 1].auToAddMach = true;
        values[index - 1].mach = (values[index - 2]?.mach + value) / 2;
        if (
          values[index + 1]?.auToAddMach ||
          (!values[index + 1]?.mach && values[index + 2]?.mach)
        ) {
          values[index + 1].auToAddMach = true;
          values[index + 1].mach = (values[index + 2]?.mach + value) / 2;
        }
      }
      values[index].mach = value;
      values[index].auToAddMach = false;
      showModal({
        x: e.nativeEvent.layerX,
        y: e.nativeEvent.layerY,
        type: "nhipMach",
        values,
        index,
        isLastColumn,
        isEditing,
      });
    } else {
      const value = Number(
        pointToValue({
          point: e.nativeEvent.layerY,
          type: props.typeValue,
          rowHeight: SIZE.rowHeight,
          totalRow: 75,
          headerHeight: SIZE.headerHeight,
          bottomHeight: SIZE.bottomHeight,
        }).toFixed(1)
      );
      if (
        values[index - 1]?.auToAddNhietDo ||
        (!values[index - 1]?.nhietDo && values[index - 2]?.nhietDo)
      ) {
        values[index - 1].auToAddNhietDo = true;
        values[index - 1].nhietDo = (values[index - 2]?.nhietDo + value) / 2;
        if (
          values[index + 1]?.auToAddNhietDo ||
          (!values[index + 1]?.nhietDo && values[index + 2]?.nhietDo)
        ) {
          values[index + 1].auToAddNhietDo = true;
          values[index + 1].nhietDo = (values[index + 2]?.nhietDo + value) / 2;
        }
      }
      values[index].nhietDo = value;
      values[index].auToAddNhietDo = false;
      showModal({
        x: e.nativeEvent.layerX,
        y: e.nativeEvent.layerY,
        type: "nhietDo",
        values,
        index,
        isLastColumn,
        isEditing,
      });
    }
  };

  const onOK = (valueInput, inputType) => {
    const values = props.values;
    const index =
      props.currentCol === -1 ? values.length - 1 : props.currentCol;

    // if (Number.isNaN(index) || !valueInput) {
    //   return;
    // }
    let item = values[index];
    let value = (valueInput || "").substr(0, Math.min(valueInput.length, 7));
    if (item) {
      switch (inputType) {
        case 0:
          item.huyetap = value;
          break;
        case 1:
          item.nhipTho = value;
          break;
        case 2:
          item.canNang = parseFloat(value);
          break;
        case 5:
          item.kyten = value;
          break;
        default:
          break;
      }
      props.updateData({
        values: [...values],
      });
      props.onValueChange(values, { isCanvasFooter: true });
    }
  };
  const onUpdateSurgery = (id) => {
    props.onAddSurgery(id);
  };

  return (
    <>
      <ColumnState />
      <InputValue ref={refInputValue} />
      <ModalChangeDate
        ref={refChangeDate}
        columnWidth={SIZE.columnWidth}
        marginLeft={SIZE.leftColumnWidth}
      />
      <Main width={props.width} height={props.height} onClick={onClickCanvas} />
      <ModalInput ref={refModalInput} />
      <SurgeryDetail
        onValueChange={props.onValueChange}
        onUpdateSurgery={onUpdateSurgery}
      />
      <ModalSynthetic ref={refModalSynthetic}></ModalSynthetic>
    </>
  );
};
CanvasTouchable.defaultProps = {
  onValueChange: () => {},
};

export default connect(
  (state) => {
    return {
      values: state.vitalSigns.values || [],
      moreValueIds: state.vitalSigns.moreValueIds || [],
      isEditing: state.vitalSigns.isEditing,
      typeValue: state.vitalSigns.typeValue,
      isDeleting: state.vitalSigns.isDeleting,
      currentCol: state.vitalSigns.currentCol,
      vitalSignsCategories: state.vitalSigns.vitalSignsCategories || [],
    };
  },
  ({ vitalSigns: { updateData, onUpdateSurgery } }) => ({
    updateData,
    onUpdateSurgery,
  })
)(CanvasTouchable);
