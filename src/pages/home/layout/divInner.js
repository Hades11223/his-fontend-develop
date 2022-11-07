import React, { useState, useEffect } from "react";
import { Tree, TreeNodes } from "../styled";
import MenuIcon from "assets/svg/menu/MenuIcon.svg";
import ExpandIcon1 from "assets/svg/home/expandIcon1.svg";
import ExpandIcon2 from "assets/svg/home/expandIcon2.svg";
import { capitalize } from "lodash";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function WrapperContentLeft(props) {
  const { t } = useTranslation();
  const { link, history, bg, homePage, title, icon, i18n } = props;
  const onClick = () => {
    if (homePage) {
      link && history.push(link);
      return setTimeout(() => {
        history.go();
      }, 300);
    } else {
      link && history.push(link);
    }
  };
  return (
    <div className="item" onClick={onClick}>
      <div className="item--bg">
        <img src={bg} alt="iSofh" />
      </div>
      <div className="item--content">
        <div>{i18n ? t(i18n) : title}</div>
        {!!icon && (
          <div className="item--icon">
            <img src={icon} alt="iSofh" />
          </div>
        )}
      </div>
    </div>
  );
}
function WrapperPanel(props) {
  const { title, description, link, icon } = props;
  return (
    <div className="item">
      <div className="item--icon">
        <img src={icon} alt="iSofh" />
      </div>
      <div className="item--content">
        <div className="item--title">{title}</div>
        <div className="item--description">{description}</div>
        {/* <a className="item--link" href={link || "#"}>
          Action link
        </a> */}
      </div>
    </div>
  );
}
const WrapperContentTree = ({ item, history, onSearch, ...props }) => {
  const [state, _setstate] = useState({ isExpand: false });
  const setState = (data = {}) => {
    _setstate((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const onChange = (type) => () => {
    setState({
      [type]: !state.isExpand,
    });
  };
  const navigateTo = (child) => () => {
    if (history) {
      history.push(`${child.link}`);
    }
  };

  useEffect(() => {
    if (onSearch) {
      setState({ isExpand: true });
    } else {
      setState({ isExpand: false });
    }
  }, [onSearch]);
  return (
    <Tree>
      <div className="meta d-flex pointer" onClick={onChange("isExpand")}>
        <div className="_icon">
          {state.isExpand ? <ExpandIcon1 /> : <ExpandIcon2 />}
        </div>
        <div className="_name">{item?.title}</div>
      </div>
      <div className="content">
        <TreeNodes isExpand={state.isExpand}>
          {(item?.children || [])
            .sort((a, b) =>
              a?.title?.toLowerCase().localeCompare(b?.title?.toLowerCase())
            )
            .map((child, index) => {
              const title = child?.capitalizeTitle
                ? capitalize(child?.title)
                : child?.title;
              return (
                <Link
                  to={child.link}
                  className="child d-flex pointer"
                  key={index}
                  onClick={navigateTo(child)}
                >
                  <div className="_icon">
                    <MenuIcon />
                  </div>
                  <div className="_name">{title}</div>
                </Link>
              );
            })}
        </TreeNodes>
      </div>
    </Tree>
  );
};
export { WrapperContentLeft, WrapperPanel, WrapperContentTree };
