import styled from "styled-components";

export const Main = styled.div`
  padding: 16px;
  .info-service {
    padding: 16px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    border-radius: 8px;
    .info {
      display: flex;
      .detail {
        font-weight: bold;
        padding: 0 5px;
      }
    }
  }
  .ant-select {
    min-width: 200px;
  }
  .tab-content {
    margin-top: 15px;
  }
`;
