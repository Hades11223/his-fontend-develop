import styled from "styled-components";
export const Main = styled.div`
  padding: 10px;
  height: 500px;
  display: flex;
  flex-direction: column;
  & .chon-goi {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    & .select-chon-goi {
      width: 300px;
    }
  }
  & .label {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin-right: 5px;
    margin-bottom: 5px;
    display: block;
    & .require {
      color: red;
    }
  }
  & .item-selected {
    & .ant-table-cell {
      background-color: #c1f0db !important;
    }
  }
`;

export const AddButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;
`;
