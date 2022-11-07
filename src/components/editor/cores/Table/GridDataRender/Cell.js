import React, { memo, useEffect, useMemo } from "react";
import T from "prop-types";
import render from "../render";

const Cell = ({
  col,
  mode,
  formChange,
  defaultValues,
  rowIndex,
  disabled,
  valuesHIS,
  fileConfig,
  fileTemplate,
}) => {
  useEffect(() => {}, [defaultValues]);
  const props = useMemo(() => {
    if (col.component == "date") {
      return {
        disabled,
        fieldName: `${rowIndex}_${col.colKey}`,
        line: 1,
        dateTimeFormat:
          col.component == "date"
            ? col.dateTimeFormat
              ? col.dateTimeFormat
              : "D/M/Y"
            : null,
      };
    } else {
      return {
        disabled,
        fieldName: `${rowIndex}_${col.colKey}`,
        line: 1,
      };
    }
  }, [col]);
  return (
    <td key={col.key} width={col.width - 4}>
      <div className={"td-contain"}>
        {render(col.component)({
          mode,
          formChange,
          form: defaultValues,
          blockWidth: col.width - 4,
          fromTableGrid: true,
          component: {
            width: col.width - 4,
            props: props,
          },
          valuesHIS, //[dataFromHis]
          fileConfig,
          fileTemplate: fileTemplate,
        })}
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
