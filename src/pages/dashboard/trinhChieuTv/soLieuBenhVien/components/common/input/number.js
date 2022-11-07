import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';

const InputText = ({
  customTitle,
  placeholder,
  onChange = () => {},
  defaultValue,
  viewMode = false,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
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
        <Input
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          type="number"
        />
      )}
    </>
  );
};

export default InputText;
