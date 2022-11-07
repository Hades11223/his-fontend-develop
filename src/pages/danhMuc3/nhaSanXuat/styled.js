import styled from "styled-components";
import TabPanel from "components/MultiLevelTab/TabPanel";

export const Main = styled(TabPanel)`
  & .home-child {
    & > .ant-col {
      height: 100%;
      & .multi-level-tab {
        overflow: hidden;
        height: 100%;
      }
    }
  }
  & .edit-wrapper {
    overflow: hidden;
    & .children {
      overflow: auto;
    }
    & .button-bottom-modal {
      position: unset;
      justify-content: flex-end;
    }
  }
`;
export const LichSuThayDoiThongTinStyle = styled(TabPanel)`
  & .ant-picker-suffix {
    svg {
      display: none;
    }
  }
`;
