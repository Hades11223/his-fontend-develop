import styled from "styled-components";

export const Main = styled.div`
  .row-actived {
    background: #c1f0db !important;
  }
  & .home-child {
    & > .ant-col {
      height: 100%;
    }
  }
`;
