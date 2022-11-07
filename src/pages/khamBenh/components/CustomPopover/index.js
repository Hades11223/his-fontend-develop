import React, { memo, useRef, useEffect } from "react";
import { Popover } from "antd";
import {Button} from "components";
import { ContentWrapper, GlobalStyled,Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const CustomPopover = ({
  icon,
  iconSvg,
  title,
  text = "",
  placement = "bottomRight",
  contentPopover = null,
  onSubmit,
  onCancel,
  visible = false,
  handleVisible,
  width,
  loadingBtn = false,
  isDisabledSubmitButton,
  mask = false,
  overlayInnerStyle,
  overlayClassName,
}) => {
  const { t, i18n } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  useEffect(() => {
    if (visible) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              onCancel();
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              if (!isDisabledSubmitButton) onSubmit();
            },
          },
        ],
      });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [visible]);

  const handleVisibleChange = (e) => {
    e.preventDefault();
    handleVisible(!visible);
  };

  const content = () => (
    <>
      {mask && (
        <div
          className={"mask"}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
          }}
        ></div>
      )}
      <ContentWrapper
        width={width}
        overlayClassName={overlayClassName ? true : false}
      >
        <div className="content-popover">
          {contentPopover}
          <div className="popover-btn-list">
            <Button type={"default"} onClick={onCancel} minWidth={100}>
              {t("common.huy")}
            </Button>
            <Button
              type={"primary"}
              disabled={isDisabledSubmitButton}
              loading={loadingBtn}
              onClick={onSubmit}
              minWidth={100}
            >
              {t("common.dongY")}
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );

  return (
    <Main onClick={(e) => e.stopPropagation()}>
      <GlobalStyled />
      <Popover
        overlayInnerStyle={overlayInnerStyle}
        content={content}
        title={title}
        trigger="click"
        visible={visible}
        placement={placement}
        overlayClassName={`${
          overlayClassName ? overlayClassName : "custom-popover"
        }`}
      >
        <span onClick={handleVisibleChange}>
          {iconSvg ? iconSvg : icon && <img src={icon} alt="icon" />}
          {text}
        </span>
      </Popover>
    </Main>
  );
};

export default memo(CustomPopover);
