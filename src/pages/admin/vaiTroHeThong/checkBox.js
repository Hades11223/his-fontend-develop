import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

const CheckBoxVt = (props) => {
  const {
    permision,
    values,
    onChangePermission,
    onChangeAllPermission,
    onChangeOnePermisson,
    key,
  } = props;
  const checked = useMemo(() => {
    const select = values.filter((item) => {
      return permision?.permision.some((per) => per.id == item);
    });
    if (select?.length >= permision?.permision?.length) {
      return true;
    } else {
      return false;
    }
  }, [values]);
  return (
    <div key={key}>
      <div className="list-func__title">
        <Checkbox
          checked={checked}
          value={permision.id}
          onChange={onChangeAllPermission}
        />{" "}
        <span>{permision.ten}</span>
      </div>
      <div className="list-func__content">
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={onChangePermission}
          value={values}
        >
          <div className="grid-container">
            {permision?.permision?.length &&
              permision.permision.map((per) => (
                <div className="grid-item" key={per.ten}>
                  <Checkbox onChange={onChangeOnePermisson} value={per.id}>
                    {per.ten}
                  </Checkbox>
                </div>
              ))}
          </div>
        </Checkbox.Group>
      </div>
    </div>
  );
};

export default CheckBoxVt;
