import React, { memo } from "react";
import { Main } from "./styled";
const Header = ({
  title,
  children,
  rightInfo,
  titleMinWidth,
  noPadding,
  bottom,
  left,
}) => {
  return (
    <Main
      className="header"
      titleMinWidth={titleMinWidth}
      noPadding={noPadding}
      bottom={bottom}
      left={left}
    >
      <div className="title">{title}</div>
      <div className="content">{children}</div>
      <div className="more-info">{rightInfo}</div>
    </Main>
  );
};
export default memo(Header);
