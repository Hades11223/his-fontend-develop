import styled from "styled-components";

export const Main = styled.div`
  padding: 20px;
  .date {
    display: flex;
    padding-top: 5px;
    .title {
      display: flex;
      flex: 1 0 auto;
      width: 150px;
    }
    .ant-picker {
      width: 100%;
    }
  }
  .title-error {
    font-size: small;
    font-style: italic;
    color: red;
  }
  .flex {
    display: flex;
  }

  .main-content {
    padding: 20px 0;

    &-right-bottom {
      padding-top: 20px;
    }
  }
`;
