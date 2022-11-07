import React from "react";
import Scroll, { scroller } from "react-scroll";
import { NavigationPage } from "../styled";
import IcDot from "assets/images/khamBenh/icDot.svg";
import { NavigationWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const Link = Scroll.Link;
function ThongTin({
  title,
  icon,
  dataChild,
  color,
  itemKey,
  padding,
  handleScroll,
}) {
  const { t } = useTranslation();

  const onActive = (key) => handleScroll(key);

  const onClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    scroller.scrollTo(itemKey, {
      duration: 500,
      smooth: "easeInOutQuint",
      containerId: "containerElement",
    });
    setTimeout(() => {
      onActive(itemKey);
    }, 500);
  };

  return (
    <NavigationWrapper>
      <Link
        activeClass="active"
        to={itemKey}
        spy={true}
        smooth={true}
        isDynamic={true}
        duration={250}
        containerId="containerElement"
        offset={-75}
        onSetActive={onActive}
      >
        <NavigationPage padding={padding} color={color} onClick={onClick}>
          {icon}
          <div className="content">
            <div className="content--title">{t(title)}</div>
            <div className="content--child">
              {dataChild.map((item, index) => {
                return (
                  <div className="content--item" key={`${index}-${item.title}`}>
                    <IcDot />
                    {t(item)}
                  </div>
                );
              })}
            </div>
          </div>
        </NavigationPage>
      </Link>
    </NavigationWrapper>
  );
}

export default ThongTin;
