import React, { memo, useEffect, useMemo, useRef } from "react";
import T from "prop-types";
import render from "../render";
import DeboundInput from "components/editor/config/DeboundInput";
import { cloneDeep } from "lodash";
import { Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
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
  data,
  index,
  itemProps,
  valuesRef,
  numberElement,
  handleAdd = () => {},
  handleDelete = () => {},
}) => {
  const onChange = (value) => (e) => {
    const res = value.split("_");
    const key = res[0];
    const index = res[1];
    const newData = cloneDeep(valuesRef.current);
    newData[index][key] = e;
    valuesRef.current = newData;
    formChange[itemProps.fieldName](valuesRef.current);
  };
  if (!data[index]) {
    return null;
  }
  let fieldName = "";
  if (itemProps?.fieldName) {
    fieldName = (itemProps?.fieldName || "").split("_")[1];
  }
  return (
    <td key={col.key} width={col.width - 4 || 200} className="column-ttba">
      {!disabled && (
        <div className="icon-action">
          {data.length <= numberElement && (
            <Button
              className="icon btn-edit"
              onClick={() => handleAdd(index)}
              icon={<PlusOutlined />}
            />
          )}
          <Button
            className="icon btn-edit"
            onClick={() => handleDelete(index)}
            icon={<CloseOutlined />}
          />
        </div>
      )}

      <span className="ten">
        <DeboundInput
          onChange={onChange(`ten_${index}`)}
          value={data[index]?.ten}
          type="multipleline"
          disabled={disabled}
          size={999999}
        ></DeboundInput>
        {/* {itemProps?.dauNganCach}{" "} */}
      </span>
      {/* {fieldName == "cls" ? (
        <DeboundInput
          onChange={onChange(`ketLuan_${index}`)}
          value={data[index]?.ketLuan || ""}
          type="multipleline"
          disabled={disabled}
        ></DeboundInput>
      ) : (
        <DeboundInput
          lineHeightText={1}
          fontSize={9}
          minHeight={11}
          value={data[index]?.ketQua}
          type="multipleline"
          onChange={onChange(`ketQua_${index}`)}
          disabled={disabled}
        ></DeboundInput>
      )} */}

      {/* <span className="don-vi-tinh">
        <DeboundInput
          onChange={onChange(`donViTinh_${index}`)}
          value={data[index]?.donViTinh}
          type="multipleline"
          disabled={disabled}
        ></DeboundInput>
      </span> */}
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
