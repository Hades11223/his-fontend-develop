import React from "react";
import { Main, MainTabLeft, GlobalStyle } from "./styled";
import { Tabs as AntTab } from "antd";
const Tabs = ({ children, ...props }) => {
  return <Main {...props}>{children}</Main>;
};
const TabsLeft = ({ children, tabWidth, ...props }) => {
  return (
    <MainTabLeft
      {...props}
      tabPosition={"left"}
      tabwidth={tabWidth}
      popupClassName="tab-left-popup-style"
      className={"tab-left-style " + props.className}
    >
      <GlobalStyle />
      {children}
    </MainTabLeft>
  );
};
Tabs.TabPane = AntTab.TabPane;
Tabs.Left = TabsLeft;
export default Tabs;
