import React, { useMemo, useRef, Fragment, useState, useEffect } from "react";
import { Input } from "antd";
import { Main } from "./styled";

const ReactInput = ({ size, value, disabled, letterCase, type, ...props }) => {
  const [state, _setState] = useState({
    codes: [],
    dots: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refCodeLength = useRef(0);
  const refInput = useRef([]);
  const arr = useMemo(() => {
    return Array(size || 2).fill();
  }, [size]);
  useEffect(() => {
    let currentCode = 0;
    const dots = [];
    const codes = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] == ".") {
        dots[currentCode] = ".";
      } else {
        codes[currentCode] = value[i];
        currentCode++;
      }
      if (currentCode >= size) break;
    }
    refCodeLength.current = codes.length;
    setState({
      codes,
      dots,
    });
  }, [value]);
  useEffect(() => {
    if(!disabled){
      let index = refCodeLength.current;
      if (index == size) index--;
      if (refInput.current?.length) {
        for (let i = 0; i < size; i++) {
          if (refInput.current[i]) {
            refInput.current[i].input.disabled = true;
          }
        }
        if (refInput.current[index]) {
          refInput.current[index].input.disabled = false;
          refInput.current[index].focus();
        }
      }
    }
  }, [state.codes, disabled]);
  const generateValue = (codes, dots) => {
    return codes
      .map((item, index) => {
        if (dots[index]) {
          return dots[index] + item;
        }
        return item;
      })
      .join("");
  };
  const onChangeInput = (codes, dots) => {
    if (props.onChangeInput) {
      props.onChangeInput(generateValue(codes, dots));
    }
  };
  const onChange = (index, isRemoveDot) => (e) => {
    let text = checkType(e.target.value);
    let dots = state.dots;
    if (isRemoveDot) {
      dots[index] = "";
      setState({
        dots: [...dots],
      });
      onChangeInput(state.codes, dots);
      return;
    }
    if (index == 0 && text == ".") return;
    if (state.dots[index] == "." && text == ".") return;
    let codes = state.codes;

    if (text == ".") {
      dots[index] = ".";
    } else {
      codes[index] = text;
    }
    refCodeLength.current = codes.length;
    setState({
      codes: [...codes],
      dots: [...dots],
    });
    onChangeInput(codes, dots);
    if (index < refInput.current.length - 1 && text && text != ".") {
      refInput.current[index + 1].input.disabled = false;
      refInput.current[index].input.disabled = true;
      refInput.current[index + 1].focus();
    }
  };
  const onKeyDown = (index) => (e) => {
    const dotIndex = state.dots[index];
    if (e.keyCode == 8 && !e.target.value && index > 0) {
      onChange(
        !dotIndex ? index - 1 : index,
        dotIndex && !state.codes[index]
      )({
        target: {
          value: "",
        },
      });
      if (!dotIndex) {
        refInput.current[index - 1].input.disabled = false;
        refInput.current[index].input.disabled = true;
        refInput.current[index - 1].focus();
      }
    }
  };
  const checkType = (text) => {
    let newText = "";
    switch (type) {
      case "Number":
        if (/[0-9.]/g.test(text)) {
          newText = text;
        }
        break;
      case "Strings":
        if (/[0-9a-zA-Z.]/g.test(text)) {
          newText = text;
        }
      default:
        break;
    }
    if (letterCase == "upper") {
      newText = newText.toUpperCase();
    } else {
      newText = newText.toLowerCase();
    }
    return newText;
  };

  return (
    <Main>
      {arr.map((item, index) => {
        return (
          <Fragment key={index}>
            {state.dots[index] && (
              <span className="dots"> {state.dots[index]}</span>
            )}
            <Input
              className={
                disabled ? "input-code" : "input-code input-code-disable"
              }
              style={{ width: `${100 / size}%` }}
              onKeyDown={onKeyDown(index)}
              maxLength={1}
              value={state.codes[index]}
              disabled={disabled}
              ref={(ref) => {
                refInput.current[index] = ref;
              }}
              onChange={onChange(index)}
            />
          </Fragment>
        );
      })}
    </Main>
  );
};

export default ReactInput;
