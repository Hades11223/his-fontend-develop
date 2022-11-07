import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Tabs } from "antd";
import { Button } from "components";
import { Main, Main1 } from "./styled";
import { CloseOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function MultiLevelTab(
  {
    listPanel,
    defaultActiveKey,
    onChange,
    isBoxTabs = false,
    layerIds,
    hiddenKhoaChiDinh,

    roleEdit = false, // default: not-allow edit
    onCancelBtn,
    onSaveBtn,
    isNotBorder = false,
    ...rest
  },
  ref
) {
  const [state, _setState] = useState({
    showKhoaChiDinh: !hiddenKhoaChiDinh,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const WrapperTabStyle = isBoxTabs ? Main1 : Main;

  useImperativeHandle(ref, () => ({
    setKhoaChiDinh: (showKhoaChiDinh) => {
      setState({ showKhoaChiDinh });
    },
  }));




  const _listPanel = useMemo(() => {
    return state.showKhoaChiDinh
      ? listPanel
      : listPanel.filter((i) => i.key !== "khoaChiDinh");
  }, [listPanel, state.showKhoaChiDinh]);

  return (
    <WrapperTabStyle className="multi-level-tab" isNotBorder={isNotBorder}>
      <Tabs
        defaultActiveKey={defaultActiveKey || "1"}
        onChange={onChange}
        {...rest}
      >
        {_listPanel.map((panel, index) => {
          let component = null;
          const layerId = layerIds && layerIds[index] ? layerIds[index] : null;

          if (typeof panel.render === "function") {
            component = panel.render({
              layerId: layerId,
              refTab: ref,
            });
          } else {
            const PanelComponent = panel.render;
            component = <PanelComponent
              layerId={layerId} refTab={ref} >
            </PanelComponent>;
          }

          return (
            <>
              <TabPane tab={panel.title || ""} key={panel.key || index + 1}>
                {component}
              </TabPane>
            </>
          );
        })}
      </Tabs>
      {roleEdit &&
        <div className="multi-bottom-btn">
          <div>
            {onCancelBtn && <Button
              type="default"
              onClick={onCancelBtn}
              rightIcon={<CloseOutlined />}
              iconHeight={15}
              minWidth={100}
            >
              {"Hủy"}
            </Button>}
            {onSaveBtn && <Button
              type="primary"
              onClick={onSaveBtn}
              rightIcon={
                <img
                  style={{ marginLeft: 6 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              }
              iconHeight={15}
              minWidth={100}
            >
              {"Lưu [F4]"}
            </Button>}
          </div>
        </div>
      }
    </WrapperTabStyle>
  );
}

export default forwardRef(MultiLevelTab);
