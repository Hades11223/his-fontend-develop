import styled from "styled-components";

export const TabPanel = styled.div`
  height: 100%;
  & .edit-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    & .children {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  .action-header {
    margin-bottom: 0px !important;
  }
`;
