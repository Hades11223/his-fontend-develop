import React, { useRef, forwardRef, useImperativeHandle } from "react";
import T from "prop-types";
import DOMPurify from "dompurify";
import { Main } from "./styled";

const TextEdit = forwardRef((props, ref) => {
  const {
    onChange,
    defaultValue,
    className,
    mode,
    textTransform,
    id,
    width,
    note,
    maxWidth,
  } = props;
  const mainRef = useRef(null);
  const textNode = useRef(null);

  useImperativeHandle(ref, () => ({
    node: mainRef.current,
    textNode: textNode.current,
  }));

  const emitChange = () => {
    onChange(textNode.current.innerHTML);
  };

  let style = { textTransform };
  if (width) style.width = width + "px";
  if (maxWidth) {
    style.maxWidth = maxWidth + "px";
  }
  const onMouseUp = () => {
    try {
      const selection = window.getSelection();
      if (selection) {
        // make sure it doesn't error if nothing is selected
        let style = window.getComputedStyle(
          selection.anchorNode.parentElement,
          null
        );
        let size = style.getPropertyValue("font-size");
        let fontFamily = style.getPropertyValue("font-family");
        let fontWeight = style.getPropertyValue("font-weight");
        let fontItalic = style.getPropertyValue("font-style");
        let fontUnderline = style.getPropertyValue("text-decoration");
        let textAlign = style.getPropertyValue("text-align");
        if (size.includes("px")) {
          size = size.replace("px", "");
          size = Math.round(Number((size * 3.0) / 4.0));
        } else if (size.inclues("pt")) {
          size = size.replace("pt", "");
        }
        window.postMessage(
          {
            TYPE: "EDITOR-SELECT-FONT",
            size,
            fontFamily,
            fontWeight,
            fontItalic,
            fontUnderline,
            textAlign,
          },
          window.location.origin
        );
      }
    } catch (error) {}
  };
  return (
    <Main ref={mainRef} className={className} onMouseUp={onMouseUp}>
      <div
        id={id}
        className={"edit-contain"}
        contentEditable={mode === "config"}
        suppressContentEditableWarning
        ref={textNode}
        onInput={emitChange}
        onBlur={emitChange}
        style={style}
        disabled
        title={note}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(defaultValue) }}
      />
    </Main>
  );
});

TextEdit.defaultProps = {
  className: "",
  defaultValue: "",
  mode: "",
  disabled: false,
  onChange: () => {},
};

TextEdit.propTypes = {
  onChange: T.func,
  disabled: T.bool,
  defaultValue: T.string,
  className: T.string,
  mode: T.string,
};

export default TextEdit;
