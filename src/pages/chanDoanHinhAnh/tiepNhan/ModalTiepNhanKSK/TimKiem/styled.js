import styled from "styled-components";

export const Main = styled.div`
  & .header__left {
    display: flex;
    gap: 7px;
  }
  .timKiem__title {
    font-size: 14px;
    text-align: left;
    font-weight: bold;
    line-height: 16px;
    color: #03317c;
    padding: 7px;
    margin: 0 !important;
  }
`;

export const InputSearch = styled.div`
  background: #ffffff;
  border: 1px solid #dfe1e6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-right: 36px;
  width: 100%;
  height: 40px;

  &:hover {
    box-shadow: 0px 0px 3px 1px #0762f761 !important;
  }

  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    height: 100%;

    &::placeholder {
      color: #69788c;
    }
  }
  .icon-search {
    margin: 10px;
    height: 15px;
  }
  .ant-input {
    &:hover,
    &:focus {
      box-shadow: none;
    }
  }
  &.date-range-picker {
    display: grid;
    .ant-picker-range {
      border: none !important;
      box-shadow: none !important;
      padding: 0 10px;
    }
    .range-picker-title {
      font-size: 14px;
      text-align: left;
      padding-left: 20px;
      font-weight: normal;
      height: 19px;
    }
    .ant-picker-range-separator {
      padding: 0 !important;
    }
    .ant-picker-input {
      input {
        padding: 0 5px !important;
      }
    }
    input {
      padding: 0;
    }
  }
`;
