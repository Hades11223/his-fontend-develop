import React, { forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { ButtonMain } from "./styled";

const Button = forwardRef(
  (
    {
      leftIcon,
      rightIcon,
      children,
      onClick,
      type,
      primary,
      minWidth,
      fit,
      iconHeight,
      height = 38,
      disabled,
      backgroundColor,
      borderColor,
      loading,
      buttonType,
      ...props
    },
    ref
  ) => {
    const onClickButton = (e) => {
      !disabled && !loading && onClick && onClick(e);
    };
    useImperativeHandle(ref, () => ({
      click: () => {
        if (!disabled && !loading) onClickButton(null);
      },
    }));
    return (
      <ButtonMain
        buttontype={buttonType}
        onClick={onClickButton}
        {...props}
        className={`${props.className || ""} ${
          type == "primary"
            ? "primary"
            : type == "success"
            ? "success"
            : type == "error"
            ? "error  "
            : type == "info"
            ? "info  "
            : ""
        }`}
        fitcontent={fit ? 1 : 0}
        minwidth={minWidth || 0}
        iconheight={iconHeight}
        height={height}
        disabled={disabled}
        backgroundcolor={backgroundColor}
        bordercolor={borderColor}
        loading={loading}
        
      >
        {leftIcon}
        <div className="button-content" name={props?.name}>
          {children}
        </div>
        {rightIcon}
      </ButtonMain>
    );
  }
);
Button.Text = ({ className, ...props }) => {
  return <Button className={"button-text " + className} {...props}></Button>;
};

Button.propTypes = {
  onClick: PropTypes.func,
  fit: PropTypes.bool,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
};
export default Button;
