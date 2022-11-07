import { Dropdown, Menu } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import InputTimeout from "components/InputTimeout";
import { isString } from "lodash";
import React, { useRef, useState } from "react";
import { ItemSelect } from "./styled";

const InputSearch = ({
  data = [],
  onChange = () => {},
  onChangeSelectAll = () => {},
  ...props
}) => {
  const [state, setState] = useState({});
  const [dataRender, setDataRender] = useState(data || []);
  const refSearch = useRef(null);

  const onSearch = (strSearch) => {
    setDataRender(
      data.filter((item) => {
        const str = ("(" + strSearch.toLowerCase() + ")")
          .split(" ")
          .join(")?(");
        return RegExp(str || "").test(item.ten.toLowerCase());
      })
    );
  };

  document.body.onmousedown = (e) => {
    if (
      (isString(e.target.className) ? e.target.className : "").indexOf(
        "popover-focus-item-select"
      ) === -1 &&
      (isString(e.target.className) ? e.target.className : "").indexOf(
        "ant-checkbox-input"
      ) === -1
    ) {
      setState({ ...state, visible: false });
    }
  };

  return (
    <Dropdown
      overlay={
        <Menu id="search-doc-ket-qua">
          <Menu.Item
            key={0}
            style={{
              padding: "0",
            }}
          >
            <ItemSelect className="item-title popover-focus-item-select">
              <div className="checkbox">
                <Checkbox
                  checked={data.every((item) => item.checked)}
                  onChange={(e) => onChangeSelectAll(e.target.checked)}
                />
              </div>
              <div className="name">Tất cả</div>
            </ItemSelect>
          </Menu.Item>
          <div style={{ height: "200px", overflowY: "auto" }}>
            {dataRender.map((item, index) => (
              <Menu.Item
                key={index + 1}
                style={{
                  padding: "0",
                  backgroundColor: item.checked
                    ? "#c1f0db"
                    : index % 2 === 0
                    ? "white"
                    : "#e8eaed",
                  cursor: "inherit",
                }}
              >
                <ItemSelect className="popover-focus-item-select">
                  <div className="checkbox popover-focus-item-select">
                    <Checkbox
                      className="popover-focus-item-select"
                      checked={item.checked}
                      onChange={(e) =>
                        onChange(
                          e.target.checked,
                          data.findIndex((element) => element.id === item.id)
                        )
                      }
                    />
                  </div>
                  <div className="name popover-focus-item-select">
                    {item.ten}
                  </div>
                </ItemSelect>
              </Menu.Item>
            ))}
          </div>
        </Menu>
      }
      visible={state.visible}
      overlayStyle={{ width: "400px", padding: "0" }}
    >
      <InputTimeout
        {...props}
        refs={refSearch}
        onChange={(e) => onSearch(e)}
        onFocus={() => {
          setState({ ...state, visible: true });
        }}
        style={{ border: "none" }}
      />
    </Dropdown>
  );
};

export default InputSearch;
