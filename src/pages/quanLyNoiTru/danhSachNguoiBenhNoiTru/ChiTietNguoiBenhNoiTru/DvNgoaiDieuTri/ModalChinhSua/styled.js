import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  padding: 16px 32px 32px 32px;
  font-size: 16px;

  .ant-col {
    padding: 5px;
  }

  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
  }
`;
