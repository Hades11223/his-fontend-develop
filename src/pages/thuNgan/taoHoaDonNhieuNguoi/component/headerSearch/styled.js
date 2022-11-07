import styled from "styled-components";
export const Main = styled("div")`
  width: 100%;
  margin-bottom: 10px;
  & .ant-picker {
    width: 100%;
    height: 40px;
  }
  & .btn-search {
    margin-left: 10px;
  }
  & .btn-search,
  .btn-ok {
    color: #fff;
    padding: 20px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0762f7;
    border-radius: 8px;
    :hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.25),
          rgba(0, 0, 0, 0.25)
        ),
        #0762f7;
    }
    img {
      width: 20px;
      height: 20px;
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
`;
