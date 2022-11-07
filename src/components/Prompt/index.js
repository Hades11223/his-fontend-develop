import React, { useState, memo, useImperativeHandle, forwardRef } from "react";
import { usePrompt } from "hook";
import { useTranslation } from "react-i18next";
export const refUnCheckChangeFile = React.createRef({});
const Prompt = (props, ref) => {
  const { t } = useTranslation();
  const [check, setCheck] = useState(false);
  useImperativeHandle(ref, () => ({
    setCheckChangeForm,
  }));
  const setCheckChangeForm = () => {
    setCheck(true);
  };
  const unCheckChangeForm = () => {
    setCheck(false);
  };
  refUnCheckChangeFile.current = unCheckChangeForm;
  const PromptFn = usePrompt({
    when: check,
    message: t("editor.confirmSaveForm"),
  });
  return <PromptFn></PromptFn>;
};

export default memo(forwardRef(Prompt));
