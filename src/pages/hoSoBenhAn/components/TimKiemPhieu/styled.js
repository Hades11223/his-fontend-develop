import styled from "styled-components";
export const Main = styled.div`
  padding-bottom: 0 !important;
  height: 100%;
  width: 100%;
  padding: 20px 15px 36px;
  .title {
    display: flex;
    width: 100%;
    .btn_new {
      background: #049254;
      width: 139px;
      height: 36px;
      color: #ffffff;
      border-radius: 8px;
      margin-left: auto;
      align-items: center;
      display: flex;
      justify-content: center;
      button {
        height: auto;
        margin: 0 8px;
        border: 1px solid #049254;
        box-shadow: 0px 3px 0px #026138;
        font-weight: 600;
        font-size: 16px;
      }
      img {
        padding-left: 8.33%;
      }
    }
    label {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
    }
  }
  .array-store {
    display: flex;
    padding-top: 5px;

    .item {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.75),
          rgba(255, 255, 255, 0.75)
        ),
        #0762f7;
      border-radius: 3px;
      margin-right: 6px;
      min-width: 100px;
      padding: 0px 5px 0px 5px;
      display: flex;
      img {
        object-fit: contain;
        margin-left:auto;
      }
    }
  }
`;
export const SearchKho = styled.div`
  .filter {
    height: 40px;
    border-radius: 4px 0px 0px 4px;
    background: rgba(105, 120, 140, 0.1);
    width: 100%;
    span {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      padding-left: 10px;
      color: #2d3540;
    }
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    padding: 0px 11px !important;
  }
  .ant-select-selection-placeholder {
    height: 40px;
    align-items: center;
    display: flex;
    color: #2d3540;
    font-weight: bold;
    padding-top: 0px !important;
  }
  .ant-select-selector {
    .ant-select-selection-item {
      height: 40px;
      align-items: center;
      display: flex;
      color: #2d3540;
      font-weight: bold;
      padding-top: 0px !important;
    }
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
  border-radius: 0px 4px 4px 0px;

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
    &:hover, &:focus {
      box-shadow: none;
    } 
  }
`;

export const InputSearch2 = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #dfe1e6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-right: 36px;
  width: 100%;
  height: 40px;
  border-radius: 0px 4px 4px 0px;

  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    background: rgba(255, 255, 255, 0.1);
    height: 100%;
    border:none;
    
  }
  .ant-input-disabled {
    color: #2d3540 !important;
}
  .ic-down {
    margin: 10px;

  }
`;
