import styled from "styled-components";
export const Main = styled.div`
  max-height: calc(100vh - 460px);
  min-height: calc(100vh - 460px);
  overflow-y: scroll;
  .title {
    color: #172b4d;
    font-size: 16px;
    font-weight: bold;
  }

  .header-info-phieu,
  .main {
    border-bottom: 1px solid #f0f2f4;
    padding: 10px 0;
    p {
      color: #172b4d;
      font-weight: 600;
      span {
        font-weight: 700;
      }
    }
  }
  .footer {
    padding: 10px 0;
    p {
      color: #172b4d;
      font-weight: 600;
      span {
        font-weight: 700;
      }
    }
  }
`;
