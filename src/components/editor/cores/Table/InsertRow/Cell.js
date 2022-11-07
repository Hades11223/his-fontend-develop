import React, { memo, useEffect } from "react";
import T from "prop-types";
import render from "../render";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Cell = ({
  col,
  mode,
  formChange,
  defaultValues,
  rowIndex,
  disabled,
  rowKey,
  addRow,
  row,
  ...props
}) => {
  useEffect(() => {}, [col]);

  return (
    <td key={col.key} width={col.width - 4}>
      <div className={"in-side-col"}>
        {!col.fixed && mode === "editing" && col.plusBtn && (
          <Button
            className={"plus-btn"}
            icon={<PlusOutlined />}
            type={"primary"}
            shape={"circle"}
            size={"small"}
            onClick={addRow(row)}
          />
        )}

        <div className={"td-contain"}>
          {render(col.component)({
            mode,
            formChange,
            form: defaultValues,
            blockWidth: col.width - 4,
            valuesHIS: props.valuesHIS, //[dataFromHis]
            fileConfig: props.fileConfig,
            fileTemplate: props.fileTemplate,
            component: {
              width: col.width - 4,
              props: {
                width: col.width - 4,
                disabled: disabled,
                fieldName: `${rowIndex}_${rowKey || ""}_${col.colKey}`,
              },
            },
          })}
        </div>
      </div>
    </td>
  );
};

Cell.defaultProps = {
  col: {},
  mode: "",
  formChange: {},
  defaultValues: {},
};

Cell.propTypes = {
  col: T.shape({}),
  mode: T.string,
  formChange: T.shape({}),
  defaultValues: T.shape({}),
  rowIndex: T.number,
};

export default memo(Cell);
