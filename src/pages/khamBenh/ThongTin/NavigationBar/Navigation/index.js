import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import Scroll, { scroller } from "react-scroll";
import IcDot from "assets/images/khamBenh/icDot.svg";
import { NavigationWrapper, Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";

const Link = Scroll.Link;

const Navigation = (
  {
    title,
    icon,
    dataChild,
    color,
    onActive,
    itemKey,
    trangThai,
    onClickChild,
    layerId,
    activeKey,
  },
  ref
) => {
  const { t } = useTranslation();
  const refFunOnClick = useRef(null);
  // const refLink = useRef(null);
  // const activeKey = useSelector((state) => state.khamBenh.activeKey);
  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const infoNb = useStore("khamBenh.infoNb", {});
  const { khamSucKhoe, trangThaiKsk } = infoNb || {};
  const { onRegisterHotkey } = useDispatch().phimTat;

  const onSetActive = (key, element, onClick) => {
    if (itemKey != activeKey) {
      onActive(key, onClick);
    }
  };

  useImperativeHandle(ref, () => ({
    setActive: (active) => {
      // setTimeout(() => {
      //   if (refLink.current?.parentNode?.classList) {
      //     if (!active) refLink.current.parentNode.classList.remove("active");
      //     else refLink.current.parentNode.classList.add("active");
      //   }
      // }, 500);
    },
  }));
  useEffect(() => {
    let key = 119;
    switch (itemKey + "") {
      case "0":
        key = 119;
        break;
      case "1":
        key = 120;
        break;
      case "2":
        key = 121;
        break;
      case "3":
        key = 122;
        break;
      case "4":
        key = 123;
        break;
    }
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: key,
          onEvent: () => {
            refFunOnClick.current && refFunOnClick.current();
          },
        },
      ],
    });
  }, []);

  const onClick = (e) => {
    if (khamSucKhoe && trangThaiKsk == 10) return;
    if (!trangThaiKham || trangThaiKham < trangThai) return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onSetActive(itemKey, null, true);
  };
  refFunOnClick.current = onClick;

  return (
    <NavigationWrapper trangThai={trangThai} trangThaiKham={trangThaiKham}>
      <Main
        className={`nav-item ${activeKey == itemKey ? "active" : ""}`}
        color={color}
        onClick={onClick}
        itemKey={itemKey}
        activeKey={activeKey}
      >
        {icon}
        <div className="content">
          <div className="content--title">{title}</div>
          <div className="content--child">
            {dataChild.map((item, index) => {
              return (
                <div
                  className="content--item"
                  key={`${index}-${item.title}`}
                  onClick={() => onClickChild(item)}
                >
                  <IcDot />
                  {t(item.i18n)}
                </div>
              );
            })}
          </div>
        </div>
      </Main>
    </NavigationWrapper>
  );
};

export default forwardRef(Navigation);
