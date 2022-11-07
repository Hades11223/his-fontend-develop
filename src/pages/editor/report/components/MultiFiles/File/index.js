import React, { useMemo } from "react";
import { Main } from "./styled";
import { getLayout, MODE } from "utils/editor-utils";
import File2 from "../../File2";
const File = ({ file, ...props }) => {
  const layout = useMemo(() => {
    return getLayout(file?.baoCao?.cauHinh?.layoutType); //tính toán layout
  }, [file?.baoCao?.cauHinh?.layoutType]);
  return (
    <Main
      className={`form-content ${file.key || ""}`}
      data-type={file.file?.type}
      width={layout.width}
      data-layout-type={file?.baoCao?.cauHinh?.layoutType || "default"}
    >
      <File2
        file={file.baoCao}
        apiFields={file.template?.apiFields}
        fileTemplate={file.template?.fileTemplate}
        config={file?.config?.config || {}}
        fileData={file.fileData || {}}
        valueEMR={file.fileData || {}}
        isPreview={true}
        mode={MODE.editing}
      />
    </Main>
  );
};

export default File;
