import styled from "styled-components";

export const Main = styled.div`
  padding: 13px 16px;
  .form-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .form-item {
      width: 30%;
      .input-center {
        text-align: center;
      }
      .input-left {
        color: red;
        font-size: 16px;
        text-align: left;
        font-weight: 900;
      }
      .input-right {
        color: red;
        font-size: 16px;
        text-align: right;
        font-weight: 900;
      }
    }
  }
`;
