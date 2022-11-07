import contentEditor from "./contentEditor";
import { fontSizes } from "components/editor/config/EditorTool/TextTool/constants";

export const bold = () => {
  if (contentEditor.Range.isWrappedWith("STRONG")) {
    contentEditor.Range.undo("STRONG");
  } else {
    const element = document.createElement("strong");
    contentEditor.Range.surround(element);
  }

  // document.execCommand("bold", false, "");
};

export const italic = () => {
  if (contentEditor.Range.isWrappedWith("EM")) {
    contentEditor.Range.undo("EM");
  } else {
    const element = document.createElement("EM");
    contentEditor.Range.surround(element);
  }

  // document.execCommand("italic", false, "");
};

export const underline = () => {
  if (contentEditor.Range.isWrappedWith("U")) {
    contentEditor.Range.undo("U");
  } else {
    const element = document.createElement("U");
    contentEditor.Range.surround(element);
  }

  // document.execCommand("underline", false, "");
};

export const strikeThrough = () => {
  document.execCommand("strikeThrough", false, "");
};

export const mark = (color) => {
  document.execCommand("backColor", false, color);
};

export const setFontSize = (fontSize) => {
  if (contentEditor.Range.isWrappedWith("FONT")) {
    contentEditor.Range.undo("FONT");
  }
  const element = document.createElement("FONT");
  let font = fontSize + "";
  if (font.indexOf("pt") == -1) {
    font = fontSizes[fontSize] + "pt";
  }
  element.style.fontSize = font;
  contentEditor.Range.surround(element);
  // document.execCommand("fontSize", false, fontSize);
};

export const setFontName = (fontName) => {
  document.execCommand("fontName", false, fontName);
};

export const justifyLeft = () => {
  document.execCommand("justifyLeft", false, "");
};

export const justifyRight = () => {
  document.execCommand("justifyRight", false, "");
};
export const justifyFull = () => {
  document.execCommand("justifyFull", false, "");
};
export const justifyCenter = () => {
  document.execCommand("justifyCenter", false, "");
};
export const foreColor = (value) => {
  document.execCommand("foreColor", false, value);
};
export const insertOrderedList = () => {
  document.execCommand("insertorderedlist");
};

export const handleShortKey = (e) => {
  if (e.ctrlKey) {
    switch (e.keyCode) {
      case 66:
        e.preventDefault();
        bold();
        break;
      case 73:
        e.preventDefault();
        italic();
        break;
      case 85:
        e.preventDefault();
        underline();
        break;
      default:
        break;
    }
  }
};
