import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { Main } from "./styled";

function MultiInput(props) {
  const { sizeRange, className } = props;
  const [snnValues, setValue] = useState({});

  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    if (value.length >= maxLength) {
      if (parseInt(fieldIndex, 10) < sizeRange.length) {
        const nextSibling = document.querySelector(
          `input[name=snn-${parseInt(fieldIndex, 10) + 1}]`
        );

        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }

    setValue({
      ...value,
      [`snn${fieldIndex}`]: value,
    });
  };

  return (
    <Main className={className}>
      <Input.Group>
        {sizeRange.map((size, index) => (
          <Input
            style={{ width: `${size * 9.5 + 22}px` }}
            maxLength={size}
            name={`snn-${index}`}
            onChange={handleChange}
          />
        ))}
      </Input.Group>
    </Main>
  );
}

MultiInput.propTypes = {
  sizeRange: PropTypes.arrayOf([PropTypes.number]).isRequired,
};

export default MultiInput;
