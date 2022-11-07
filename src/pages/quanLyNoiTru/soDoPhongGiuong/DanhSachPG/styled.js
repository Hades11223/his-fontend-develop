import styled from "styled-components";

export const Main = styled.div`
  height: 800px;

  .list-pg {
    overflow: scroll;
    height: 650px;
  }

  .empty-list {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    flex-direction: column;
    align-items: center;

    .anticon {
      font-size: 100px;
      color: #838e9f;
    }
  }
`;
