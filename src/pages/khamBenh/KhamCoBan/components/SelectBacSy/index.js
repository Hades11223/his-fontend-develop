import React, { useEffect, useState } from "react";
import Select from "components/Select";
import { useSelector } from "react-redux";
import { SelectGroup } from "../../styled";

const SelectBacSy = ({ onChangeBacSyValue, value }) => {
  const {
    nhanVien: { listAllNhanVien },
  } = useSelector((state) => state);

  const [localValue, setLocalValue] = useState(null);

  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  function onChange(e) {
    setLocalValue(e);
    onChangeBacSyValue(e);
  }

  return (
    <SelectGroup>
      <div className="select-box-chan-doan">
        <Select
          data={listAllNhanVien}
          style={{ width: "100%" }}
          onChange={onChange}
          value={localValue || null}
        />
      </div>
    </SelectGroup>
  );
};

export default SelectBacSy;
