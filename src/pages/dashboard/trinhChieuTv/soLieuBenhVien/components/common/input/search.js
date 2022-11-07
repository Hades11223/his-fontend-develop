import React, { useCallback, createRef } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { debounce } from 'lodash';

const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .ant-input-affix-wrapper.ant-input-affix-wrapper-lg {
    border-radius: 20px;
  }
  .ant-input-group-addon {
    display: none;
  }
`;

const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const InputSearch = ({
  placeholder,
  texts = {},
  size = 'large',
  onChange,
  label,
  width,
  maxLength,
  className,
}) => {
  const inputSearchRef = createRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChange = (e, data) => {
    onChange(inputSearchRef.current?.input?.value);
  };

  const debounceHandleChange = debounce(handleChange, 300);

  return (
    <SearchInputWrapper className={className}>
      {label && <div>{label}:&nbsp;</div>}
      <Input
        ref={inputSearchRef}
        maxLength={maxLength}
        placeholder={placeholder || texts.placeholder || 'Tìm kiếm'}
        size={size}
        prefix={prefix}
        style={{ width: width || 'auto' }}
        onChange={debounceHandleChange}
        onClick={handleClick}
      />
    </SearchInputWrapper>
  );
};

export default InputSearch;
