import React, { useState, useEffect } from "react";
import MultiLevelTab from "components/MultiLevelTab";
import { Main } from "./styled";
import XML2 from "./XML2";
import XML3 from "./XML3";
import XML4 from "./XML4";
import XML5 from "./XML5";
const RightSide = ({ form2, form3, form4, form5, state, setState, id }) => {
  const listPanel = [
    {
      title: "XML2 - THUỐC",
      key: 2,
      render: () => {
        return <XML2 form2={form2} setState={setState} state={state} id={id} />;
      },
    },
    {
      key: 3,
      title: "XML3 - DVKT",
      render: () => {
        return <XML3 form3={form3} setState={setState} state={state} id={id} />;
      },
    },
    {
      key: 4,
      title: "XML4 - KẾT QUẢ",
      render: () => {
        return <XML4 form4={form4} setState={setState} state={state} id={id} />;
      },
    },
    {
      key: 5,
      title: "XML5 - DIỄN BIẾN",
      render: () => {
        return <XML5 form5={form5} setState={setState} state={state} id={id} />;
      },
    },
  ];
  return (
    <Main>
      <MultiLevelTab
        // defaultActiveKey={1}
        listPanel={listPanel}
        isBoxTabs={true}
        activeKey={state.activeKeyTab}
        onChange={(activeKeyTab) =>
          setState({ activeKeyTab, selectedRow: null })
        }
      ></MultiLevelTab>
    </Main>
  );
};

export default RightSide;
