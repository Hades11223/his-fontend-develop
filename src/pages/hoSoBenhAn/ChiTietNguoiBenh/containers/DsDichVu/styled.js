import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  & .main-table-wrapper {
    height: 100%;
  }
  & svg.icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
  & svg.icon-pdf {
    width: 20px;
    height: 20px;
  }

  .row-action {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
