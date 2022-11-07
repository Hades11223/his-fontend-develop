import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IcDrag from "assets/svg/ic-drag.svg";
import { Main } from "./styled";
const Index = (props) => {
  const { columns, onListSelectItem } = props;
  const [state, _setState] = useState({
    items: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  useEffect(() => {
    setState({
      items: columns,
    });
  }, [columns]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index
    );

    setState({
      items,
    });
    onListSelectItem(items);
  };
  const onChangeCheckBox = (key, index) => (e) => {
    state.items[index][key] = e.target.checked;
    setState({
      items: state.items,
    });
    onListSelectItem(state.items);
  };
  return (
    <Main>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {state?.items?.map((item, index) => (
                <Draggable
                  draggableId={item.columnName}
                  index={index}
                  key={item.columnName}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="item">
                        <Checkbox
                          checked={
                            columns
                              ?.filter((x) => x.show)
                              .map((item) => item.columnName)
                              ?.includes(item.columnName) || !columns.length
                              ? true
                              : false
                          }
                          onChange={onChangeCheckBox("show", index)}
                        ></Checkbox>
                        <span className="columns"> {item?.columnName}</span>
                        <IcDrag className="ic-drag" />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Main>
  );
};

export default Index;
