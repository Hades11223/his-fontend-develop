import styled from "styled-components";

export const Main = styled.div``;

export const NbDivStyled = styled.div`
  margin: 10px;

  .nb-info {
    width: 100%;

    .ant-col {
      padding: 0 5px;
    }

    .ant-select {
      width: 100%;
      border-radius: 16px;
    }

    &-item {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

export const FilterDivStyled = styled.div`
  align-items: flex-end;
  margin: 10px;

  .item-select {
    padding: 0 5px;

    .ant-select {
      width: 100%;
    }
  }

  .item-date {
    padding: 0 5px;
  }

  .check-row {
    margin-top: 10px;
    display: flex;
    align-self: flex-end;
  }
`;
