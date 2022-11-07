import React, { useState } from "react";
import T from "prop-types";
import { Dropdown, Menu, Button, message } from "antd";
import GenerateTable from "components/editor/cores/Table/Generate";
import { Main, GlobalStyle } from "./styled";
import list from "components/editor/cores";
import moment from "moment";
import { ImportOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { SnippetsOutlined } from "@ant-design/icons";
import { useStore } from "hook";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

const menu = (addItem, component, level, totalBlockInLine, t) => {
  const groups = (list.groups || []).map((group) => {
    return {
      group,
      children: [],
    };
  });
  const menus = Object.keys(list)
    .filter((key) => key != "groups")
    .reduce((a, b) => {
      list[b].key = b;
      if (!list[b].groupKey) {
        a.push(list[b]);
      } else {
        const group = groups.find(
          (item) => item.group.groupKey == list[b].groupKey
        );
        if (group) group.children.push(list[b]);
        else {
          a.push(list[b]);
        }
      }
      return a;
    }, []);

  return (
    <Menu
      items={[
        ...(component.key
          ? [
              {
                key: component.key,
                label: (
                  <a
                    onClick={addItem(
                      component.type,
                      component,
                      level,
                      totalBlockInLine
                    )}
                  >
                    <SnippetsOutlined />
                    <span className="component-name">
                      {t("editor.pasteComponent")}
                    </span>
                  </a>
                ),
              },
            ]
          : []),
        ...menus.map((component, index) => {
          return {
            key: component.key,
            label: (
              <a
                onClick={addItem(component.key, null, level, totalBlockInLine)}
              >
                {component.icon}
                <span className="component-name">{component.name}</span>
              </a>
            ),
          };
        }),
        ...groups.map((group, index) => {
          return {
            key: "groups_" + group.group.groupKey,
            label: (
              <a>
                {group.group.icon}
                <span className="component-name">{group.group.name}</span>
              </a>
            ),
            children: group.children.map((component, index) => {
              return {
                key: component.key,
                label: (
                  <a
                    onClick={addItem(
                      component.key,
                      null,
                      level,
                      totalBlockInLine
                    )}
                  >
                    {component.icon}
                    <span className="component-name">{component.name}</span>
                  </a>
                ),
              };
            }),
          };
        }),
      ]}
    />
  );
};

const Components = ({ block, level, totalBlockInLine, ...props }) => {
  const componentCopy = useStore("config.componentCopy");
  const {
    config: { onAddComponent },
  } = useDispatch();

  const { t } = useTranslation();
  const [showTableConfig, setShowTableConfig] = useState(false);
  const addItem = (key, info, level, totalBlockInLine) => () => {
    if (level == 1 && totalBlockInLine == 1 && key != "page") {
      message.warning(t("editor.hayBatDauVoiPageComponent"));
    }
    if (key === "table" && !info) {
      setShowTableConfig(true);
    } else if (block.key) {
      onAddComponent1(key, info);
    }
  };

  const onAddComponent1 = (key, info) => {
    const obj = {
      key: moment().valueOf(),
      oldKey: info?.key,
      lineKey: block.parent,
      parent: block.key,
      width: block.width,
      name: list[key].name,
      type: key,
      content: "",
      value: info?.value || "",
      props: info
        ? JSON.parse(JSON.stringify(info.props))
        : list[key].defaultProps,
    };
    onAddComponent(obj);
  };

  const addTable = (componentProps) => {
    const KEY = "table";

    const obj = {
      key: moment().valueOf(),
      lineKey: block.parent,
      parent: block.key,
      width: block.width,
      name: list[KEY].name,
      type: KEY,
      content: "",
      value: "",
      props: componentProps,
    };
    onAddComponent(obj);
  };

  const cancelGenerateTable = () => {
    setShowTableConfig(false);
  };
  const buttonWidth = Math.min(props.rowHeight || 24, 24);

  return (
    <Main rowHeight={buttonWidth}>
      <GlobalStyle />
      <Dropdown
        overlayClassName="component-dropdown"
        overlay={menu(addItem, componentCopy, level, totalBlockInLine, t)}
        trigger={["click"]}
      >
        <Button
          size={"small"}
          title={t("editor.chenCacThanhPhan")}
          className="btn-insert-component"
        >
          <ImportOutlined />
        </Button>
      </Dropdown>

      <GenerateTable
        visible={showTableConfig}
        close={cancelGenerateTable}
        onOke={addTable}
      />
    </Main>
  );
};
Components.defaultProps = {
  block: {},
};

Components.propTypes = {
  block: T.shape({}),
};
export default Components;
