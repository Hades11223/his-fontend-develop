import styled from "styled-components";

const Main = styled.div`
  position: relative;
  margin-top: 20px;
  & input {
    height: 40px;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #ddd;
    border-radius: 3px;
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    &:focus {
      border-color: #1985d9;
      background-color: #f7f7f7;
      outline: 0;
    }
  }
  & img {
    font-size: 10px;
    width: 20px;
    margin: 6px;
    top: 0;
    right: 0;
    position: absolute;
  }
`;

export { Main };
