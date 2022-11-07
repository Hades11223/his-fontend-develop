import React, { useRef, useEffect, useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const InputArea = ({
  customTitle,
  minRows = 3,
  maxRows,
  placeholder,
  onChange = () => {},
  defaultValue,
  viewMode = false,
  maxLength,
}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    let value = e.target.value || '';
    if (maxLength) {
      if (value.length > maxLength) {
        value = value.slice(0, maxLength);
      }
    }
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      {customTitle && <div style={{ marginBottom: '10px' }}>{customTitle}</div>}
      {viewMode ? (
        value
      ) : (
        <TextArea
          ref={inputRef}
          onChange={handleChange}
          placeholder={placeholder}
          autoSize={{ minRows, maxRows }}
          value={value}
          maxLength={maxLength}
        />
      )}
    </>
  );
};

export default InputArea;
