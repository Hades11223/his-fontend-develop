import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";

export const useBeforeUnload = ({ when, message }) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (when) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [when, message]);
};

const usePrompt = ({ when, message }) => {
  useBeforeUnload({ when, message });
  return () => <Prompt when={when} message={message} />;
};
export default usePrompt;
