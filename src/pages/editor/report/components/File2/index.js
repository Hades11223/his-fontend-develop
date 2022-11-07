import React, { forwardRef, useMemo } from "react";
import Grid from "components/editor/config/Grid";
import { fontSizes } from "components/editor/config/EditorTool/TextTool/constants";
import { Main } from "./styled";
import { MODE } from "utils/editor-utils";
import { getLayout } from "utils/editor-utils";

const File2 = forwardRef((props, ref) => {
  const { file = {}, fileDataHIS, mode, fileTemplate, config } = props;

  const fontSize = file?.config ? fontSizes[file.config.fontSize] : 12;

  const defaultData = useMemo(() => {
    return props.fileData || {};
    // debugger;
    // return !props.fileData?.patientDocument &&
    //   props.fileDataHIS?.patientDocument
    //   ? props.fileDataHIS
    //   : props.fileData || {};
  }, [
    props.fileData,
    // , props.fileDataHIS
  ]);

  const layoutType = useMemo(() => {
    if (!config) return "default";
    return config?.layoutType || "default";
  }, [config]);
  const layout = useMemo(() => {
    return getLayout(layoutType); //tính toán layout
  }, [layoutType]);

  return (
    <Main fontSize={fontSize} width={layout.width}>
      <Grid
        fileConfig={file}
        formChange={props.formChange}
        //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
        //values = valueEMR khi không nằm trong replication row
        valueEMR={defaultData}
        values={defaultData}
        valuesHIS={fileDataHIS}
        fileTemplate={fileTemplate}
        formId={file.id}
        lines={file.layout}
        components={file.components}
        mode={mode || MODE.editing}
        fontSize={fontSize}
        capKyDienTuHienTai={props.fileData?.capKyDienTuHienTai}
        layoutType={layoutType}
        level={1}
        rowHeight={24}
        lineHeightText={1.5}
      >
        {props.children}
      </Grid>
    </Main>
  );
});

export default File2;
