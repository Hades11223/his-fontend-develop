import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import render from "./render";
import renderHtml from "react-render-html";
import { Popover } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
const ignoreClick = ["layout", "label"];

const EditingRender = ({
  item,
  itemProps,
  template,
  formId,
  formChange,
  mode,
  component,
  //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
  //values = valueEMR khi không nằm trong replication row
  valueEMR,
  values,
  valuesHIS,
  fileConfig,
  fileTemplate,
  capKyDienTuHienTai,
  level,
  layoutType,
  disable,
  children,
  ...props
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef();

  useEffect(() => {
    if (mode === "editing") {
      document.addEventListener("mousedown", hideDescription);
    }

    return () => {
      document.removeEventListener("mousedown", hideDescription);
    };
  }, []);

  const showDescription = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (
      !ignoreClick.includes(component.type) &&
      mode === "editing" &&
      evt.altKey
    ) {
      if (component.type === "table") {
        // if (itemProps["gridData"]) {
        setVisible(true);
        // }
      } else {
        setVisible(true);
      }
    }
  };

  const hideDescription = (event) => {
    if (
      mode === "editing"
      // &&
      // wrapRef &&
      // !wrapRef.current.contains(event.target)
    ) {
      setVisible(false);
    }
  };
  return (
    <Popover
      content={renderHtml(
        itemProps.description?.trim() || t("editor.chuaCoMoTa")
      )}
      title={
        <div>
          {t("editor.moTaVaHuongDanSuDung")}
          <a href={"###"} onClick={hideDescription}>
            <CloseOutlined />
          </a>
        </div>
      }
      visible={visible}
    >
      <Main
        style={{ width: item.width || "unset" }}
        onClick={showDescription}
        ref={wrapRef}
        data-type={"block"}
        data-level={level}
      >
        {children
          ? children
          : component.type &&
            render(component.type)({
              component,
              mode,
              blockWidth: item.width || wrapRef?.current?.clientWidth,
              block: item,
              //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
              //values = valueEMR khi không nằm trong replication row
              valueEMR: valueEMR,
              form: values,
              formChange,
              formId,
              valuesHIS, //[dataFromHis]
              fileTemplate,
              fileConfig: fileConfig,
              template,
              capKyDienTuHienTai,
              level: level + 1,
              layoutType,
              disable,
              rowHeight: props.rowHeight, //dùng trong tính năng set rowHeight của component page và layout
              lineHeightText: props.lineHeightText, //dùng trong tính năng set line height của văn bản
              fontSize: props.fontSize, //parrent font size
            })}
      </Main>
    </Popover>
  );
};

export default EditingRender;
