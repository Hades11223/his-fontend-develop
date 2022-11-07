import React, { createRef, useEffect, useState } from 'react';
import { Input, Row, Col } from 'antd';
import { customDebounce } from '@utils/helpers';
import { debounce } from 'lodash';

const InputText = ({
  customTitle,
  placeholder,
  onChange = () => {},
  defaultValue,
  disabled = false,
  withUnit = false,
  unit = '',
  viewMode = false,
  setRelated,
  setFieldKeys,
  form,
  type,
  setData,
  maxLength,
  className,
  autoComplete = 'off',
  textBold = false,
  useDebounce = false,
  onBlur = () => {},
}) => {
  const [_value, setValue] = useState(defaultValue);
  const inputRef = createRef();

  const handleChange = (e) => {
    let _value = e?.target?.value || inputRef.current?.input?.value;
    setValue(_value);
    onChange(_value);
    setRelated && setRelated(_value, setFieldKeys, form, setData);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Row>
      <Col xs={withUnit ? 21 : 24}>
        {customTitle && (
          <div style={{ marginBottom: '10px' }}>{customTitle}</div>
        )}
        {viewMode ? (
          <span style={textBold ? { fontWeight: 'bold' } : {}}>{_value}</span>
        ) : (
          <Input
            onChange={handleChange}
            ref={inputRef}
            placeholder={placeholder}
            value={_value}
            disabled={disabled}
            type={type}
            maxLength={maxLength}
            onBlur={onBlur}
            className={className}
            autoComplete={autoComplete}
          />
        )}
      </Col>
      {withUnit && (
        <Col xs={3} style={{ paddingLeft: '1em' }}>
          {unit || ''}
        </Col>
      )}
    </Row>
  );
};

export default InputText;
