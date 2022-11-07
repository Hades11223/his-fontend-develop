import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const InputDate = ({
  onChange,
  disabled,
  defaultValue,
  viewMode = false,
  picker = 'date',
  showTime = true,
  valueFormat,
  showingFormat = 'HH:mm - DD/MM/YYYY',
  placeholder,
  disabledDate = (date) => false,
  setRelated,
  setFieldKeys,
  form,
  setData,
  options,
  useDateString,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (date) => {
    setValue(date);
    onChange(
      useDateString ? moment(date, showingFormat).format(valueFormat) : date,
    );
    setRelated && setRelated(date, setFieldKeys, form, setData, options);
  };

  if (viewMode) {
    return value ? moment(value).format(showingFormat) : '';
  }

  return (
    <DatePicker
      showToday={false}
      allowClear={false}
      onChange={handleChange}
      onSelect={handleChange}
      value={value ? moment(value) : ''}
      format={showingFormat}
      style={{ marginRight: '20px' }}
      showTime={showTime}
      picker={picker}
      disabled={disabled}
      placeholder={placeholder}
      disabledDate={disabledDate}
    />
  );
};

export default InputDate;
