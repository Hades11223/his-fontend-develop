import React from "react";
import GroupTransparent from "./components/groups/Transparent";
import GroupPaging from "./components/groups/Paging";
import GroupNoPaging from "./components/groups/NoPaging";
import TwoCardMini from "./components/groups/TwoCardMini";
import CardInfoMini from "./components/cards/CardInfoMini/cardInfoMini";
import CardOutpatientInfoMini from "./components/cards/CardOutpatientInfoMini";
import CardInfo from "./components/cards/CardInfo";
import BoxInfo from "./components/cards/BoxInfo";
import CustomLineChart from "./components/charts/LineChart/LineChart";
import HorizontalBarChart from "./components/charts/HorizontalBarChart/HorizontalBarChart";
import CircleChart from "./components/charts/CircleChart/CircleChart";
import CustomTableCard from "./components/tables/table";
import MedicineTable from "./components/tables/MedicineTable";
import DarkBarChart from "./components/charts/DarkBarChart";
import moment from "moment";
import DepartmentConfig from "./components/popups/departmentConfig";
import CardFrame from "./components/groups/CardFrame";
import MultipleMiniCard from "./components/groups/MultipleMiniCard";
import CardWithCircleChart from "./components/cards/CardWithCircleChart";
import RevenueTable from "./components/tables/RevenueTable";
import TimeLineGroup from "./components/groups/TimeLineGroup";
import RevenueCard from "./components/cards/RevenueCard";
import DoupleTableCard from "./components/cards/DoupleTableCard";
import CircleChart2 from "./components/charts/CircleChart2/CircleChart2";
import PercentageChart from "./components/charts/PercentageChart/PercentageChart";

export const makeTwoCardMini = ({ cards, key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => (
      <TwoCardMini key={key} {...props}>
        {cards.map((card) => card.render(card))}
      </TwoCardMini>
    ),
  };
};

export const makeRevenueCard = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props, dataList) => (
      <RevenueCard key={key} {...props} dataList={dataList} />
    ),
  };
};

export const makeCardInfoMini = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => <CardInfoMini key={key} {...props} />,
  };
};

export const makeDoupleTableCard = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => <DoupleTableCard key={key} {...props} />,
  };
};

export const makeCardOutpatientInfoMini = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => <CardOutpatientInfoMini key={key} {...props} />,
  };
};

export const makeCardWithCircleChart = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => <CardWithCircleChart key={key} {...props} />,
  };
};

export const makeCardInfo = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => <CardInfo key={key} {...props} />,
  };
};

export const makeTableCard = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => <CustomTableCard key={key} {...props} />,
  };
};

export const makeRevenueTable = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: (props) => <RevenueTable key={key} {...props} />,
  };
};

export const makeLineChartCard = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <CustomLineChart
        {...props}
        key={key}
        data={(dataSource || []).map((item) => ({
          ...item,
          value: item.soLuong,
          name: moment(item.thoiGianVaoVien, "YYYY-MM-DD").format("DD/MM"),
        }))}
      ></CustomLineChart>
    ),
  };
};

export const makeVerticalBarChartCard = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <HorizontalBarChart
        {...props}
        key={key}
        data={dataSource}
      ></HorizontalBarChart>
    ),
  };
};

export const makePercentageChartCard = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <PercentageChart {...props} key={key} data={dataSource}></PercentageChart>
    ),
  };
};

export const makeCircleChartCard = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <CircleChart {...props} key={key} data={dataSource}></CircleChart>
    ),
  };
};

export const makeBoxInfo = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <BoxInfo {...props} key={key} dataSource={dataSource}></BoxInfo>
    ),
  };
};

export const makeCircleChartCard2 = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <CircleChart2 {...props} key={key} data={dataSource}></CircleChart2>
    ),
  };
};

export const makeDarkBarChart = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <DarkBarChart {...props} key={key} data={dataSource}></DarkBarChart>
    ),
  };
};

export const makeMedicineTable = ({ key, ...otherProps }) => {
  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <MedicineTable {...props} key={key} data={dataSource}></MedicineTable>
    ),
  };
};

export const makeGroupTransparent = ({ key, ...props }) => {
  return {
    ...props,
    render: ({ cards, renderChildren, ...data }) => {
      return (
        <GroupTransparent
          key={key}
          renderChildren={renderChildren ? renderChildren(cards) : null}
          {...data}
        >
          {cards.map((card) => card.render(card))}
        </GroupTransparent>
      );
    },
  };
};

export const makeMultipleCards = ({ key, ...props }) => {
  return {
    ...props,
    render: ({ ...data }) => {
      return <MultipleMiniCard key={key} {...data}></MultipleMiniCard>;
    },
  };
};

export const makeGroupPaging = ({ key, cards, ...props }) => {
  return {
    ...props,
    render: ({ ...data }) => {
      return <GroupPaging key={key} {...data}></GroupPaging>;
    },
  };
};

export const makeGroupNoPaging = ({ key, ...props }) => {
  return {
    ...props,
    render: ({ cards, ...data }) => {
      return <GroupNoPaging key={key} cards={cards} {...data}></GroupNoPaging>;
    },
  };
};

export const makePopup = (props) => {
  const { key, pType = "department", ...otherProps } = props;
  let RenderComponent = DepartmentConfig;

  switch (pType) {
    default:
      RenderComponent = DepartmentConfig;
      break;
  }

  return {
    ...otherProps,
    render: ({ dataSource, ...props }) => (
      <RenderComponent {...props} key={key} data={dataSource}></RenderComponent>
    ),
  };
};

export const makeCardFrame = ({ key, ...props }) => {
  return {
    ...props,
    render: ({ cards = [], ...data }) => {
      return <CardFrame key={key} cards={cards} {...data}></CardFrame>;
    },
  };
};

export const makeTimeLineCardGroups = ({ key, ...props }) => {
  return {
    ...props,
    render: (card, showingData) => {
      return (
        <TimeLineGroup
          {...props}
          key={key}
          dataList={showingData}
          {...card}
        ></TimeLineGroup>
      );
    },
  };
};

export const getSurgeryDepartmentCode = () => {
  switch (process.env.REACT_APP_HOSPITAL) {
    case "dhy":
    case "bve":
      return "K26";
    case "spaul":
      return "GM";
    default:
      return "GMHS";
  }
};
