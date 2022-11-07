import React, { useRef, useEffect, useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const TextAreaStyled = styled.div`
  position: relative;
  textarea {
    padding-right: 4.5em;
  }
`;

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
  onSubmit,
  editTitle,
  updateTitle,
  ...nestedProps
}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    // onChange(e.target.value)
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <TextAreaStyled>
      {customTitle && <div style={{ marginBottom: '10px' }}>{customTitle}</div>}
      {viewMode ? (
        value
      ) : (
        <TextArea
          {...nestedProps}
          ref={inputRef}
          onChange={handleChange}
          placeholder={placeholder}
          autoSize={{ minRows, maxRows }}
          value={value}
          showCount
          disabled={!editMode}
          maxLength={maxLength || 750}
        />
      )}
      <div
        style={{
          position: 'absolute',
          right: 0,
          padding: '1em',
          top: '1.5em',
        }}
      >
        {!editMode && (
          <svg
            style={{ cursor: 'pointer', margin: '0.5em' }}
            onClick={() => {
              setEditMode(true);
            }}
            className="editable-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{editTitle}</title>
            <path
              d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
              fill="#1C75BC"
            />
          </svg>
        )}
        {editMode && (
          <svg
            style={{ cursor: 'pointer', margin: '0.5em' }}
            onClick={() => {
              onSubmit && onSubmit(value);
              setEditMode(false);
            }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{updateTitle}</title>
            <path
              d="M14 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V4L14 0ZM16 16H2V2H13.17L16 4.83V16ZM9 9C7.34 9 6 10.34 6 12C6 13.66 7.34 15 9 15C10.66 15 12 13.66 12 12C12 10.34 10.66 9 9 9ZM3 3H12V7H3V3Z"
              fill="#1C75BC"
            />
          </svg>
        )}
        {editMode && (
          <svg
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setValue(defaultValue);
              setEditMode(false);
            }}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{'Hủy'}</title>
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="#7A869A"
            />
          </svg>
        )}
      </div>
    </TextAreaStyled>
  );
};

export default InputArea;
