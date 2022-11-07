import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import {
  ModalStyled,
  ModalHeader,
  SubModalHeader,
  ModalContent,
  ModalFooter,
  ButtonBack,
  ButtonNext,
} from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ModalCheckout = (props, ref) => {
  const { t } = useTranslation();

  const {
    children,
    titleHeader,
    subTitleHeader,
    titleBtnBack = "common.quayLai",
    disabledBtnNext,
    titleBtnNext = "common.luu",
    onClickBack,
    onClickNext,
    width,
    borderButtonBack,
    disabledBtnBack,
    footer = null,
    closable = false,
    ...rest
  } = props;
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const refLayerHotKey = useRef(stringUtils.guid());

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsModalVisible(true);
    },
    close: () => {
      setIsModalVisible(false);
    },
  }));
  useEffect(() => {
    if (isModalVisible) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setIsModalVisible(false);
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              if (!disabledBtnNext && onClickNext) onClickNext();
            },
          },
        ],
      });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [isModalVisible]);
  const onCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <ModalStyled
      width={width}
      visible={isModalVisible}
      closable={closable}
      footer={footer}
      onCancel={onCancel}
      {...rest}
    >
      <ModalHeader className="modal-header">
        {typeof titleHeader == "string" ? t(titleHeader) : titleHeader}
        <SubModalHeader>{subTitleHeader}</SubModalHeader>
      </ModalHeader>
      <ModalContent className="modal-content">{props.children}</ModalContent>
      {!footer && (
        <ModalFooter className="modal-footer">
          <ButtonBack
            disabled={disabledBtnBack}
            borderButtonBack={borderButtonBack}
            onClick={onClickBack}
          >
            {typeof titleBtnBack == "string" ? t(titleBtnBack) : titleBtnBack}
          </ButtonBack>
          <ButtonNext disabled={disabledBtnNext} onClick={onClickNext}>
            {typeof titleBtnNext == "string" ? t(titleBtnNext) : titleBtnNext}
          </ButtonNext>
        </ModalFooter>
      )}
    </ModalStyled>
  );
};

export default forwardRef(ModalCheckout);
