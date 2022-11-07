import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CountryPhoneInput, { ConfigProvider } from 'antd-country-phone-input';
// import en from 'world_countries_lists/data/en/world.json';
import en from './world.json';
import styled from 'styled-components';
// Usually you only need to import ConfigProvider & CSS once in App.js/App.tsx
// CSS order is important!
import 'antd/dist/antd.css';
import 'antd-country-phone-input/dist/index.css';

const PhoneStyled = styled.div`
  .ant-input-prefix {
    pointer-events: none;
  }
`;

const PhoneInput = ({
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
  onBlur = () => {},
}) => {
  const [_value, setValue] = useState({
    code: 84,
    phone: '',
    short: 'VN',
  });

  const handleChange = (data) => {
    let value = {
      ...data,
      phone: (data.phone || '').replace(/\D/g, ''),
    };
    setValue(value);
    onChange(`0${value.phone}`);
    setRelated && setRelated(`0${value.phone}`, setFieldKeys, form, setData);
  };
  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      phone: (defaultValue || '0').substring(1),
    }));
  }, [defaultValue]);

  return (
    <PhoneStyled>
      <Row>
        <Col xs={withUnit ? 21 : 24}>
          {customTitle && (
            <div style={{ marginBottom: '10px' }}>{customTitle}</div>
          )}
          {viewMode ? (
            `+${_value.code}${_value.phone}`
          ) : (
            <ConfigProvider locale={en}>
              <CountryPhoneInput
                onChange={handleChange}
                placeholder={placeholder}
                value={_value}
                disabled={disabled}
                type={type}
                maxLength={maxLength}
                onBlur={onBlur}
                className={className}
                autoComplete={autoComplete}
              />
            </ConfigProvider>
          )}
        </Col>
        {withUnit && (
          <Col xs={3} style={{ paddingLeft: '1em' }}>
            {unit || ''}
          </Col>
        )}
      </Row>
    </PhoneStyled>
  );
};

export default PhoneInput;
