import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "./config/Grid";
import { getLayout } from "utils/editor-utils";
import { fontSizes } from "components/editor/config/EditorTool/TextTool/constants";
import { Main, Content } from "./styled";
import VerticalLine from "components/editor/config/VerticalLine";
import { useStore } from "hook";

const DocumentConfig = forwardRef((props, ref) => {
  const { zoomValue } = props;
  const gridRef = useRef(null);
  const verticalLineRef = useRef(null);

  const formInfo = useStore("config.formInfo", {});
  const fontSize = useMemo(() => {
    const font = formInfo.fontSize;
    if (font) return fontSizes[font];
    return "12";
  }, [formInfo]);

  const configLines = useStore("config.lines", []);
  const configComponents = useStore("config.components", {});
  const {
    config: { updateComponents },
  } = useDispatch();

  const layoutType = useSelector((state) => state.config.formInfo?.layoutType);

  const layout = getLayout(layoutType);

  const handleCollect = () => {
    if (gridRef.current) {
      let collect = gridRef.current.collect();
      collect.components = collect.components.map((item) => {
        return item;
      });
      return collect;
    }

    return [];
  };

  useImperativeHandle(ref, () => ({
    collect: handleCollect,
  }));
  return (
    <Main fontSize={fontSize} layoutType={layoutType}>
      <div className="creation-contain">
        <VerticalLine ref={verticalLineRef} />

        <Content
          zoomValue={zoomValue}
          width={layout.width}
          height={layout.height}
          id="content"
        >
          <Grid
            level={1}
            verticalLine={verticalLineRef}
            ref={gridRef}
            width={layout.width}
            height={layout.height}
            lines={configLines}
            components={configComponents}
            updateComponents={updateComponents}
            mode={"config"}
            fontSize={fontSize}
            layoutType={layoutType}
            rowHeight={24}
            lineHeightText={1.5}
          />
        </Content>
      </div>
    </Main>
  );
});

export default DocumentConfig;
