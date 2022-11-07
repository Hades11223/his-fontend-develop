import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 210px;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 0 30.39px;
  .qr-box__content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 110px;
    @media (max-width: 750px) {
      font-size: 16.6667px;
      line-height: 27px;
      margin-left: 29px;
    }
    span {
      display: inline-block;
      font-size: 28px;
      line-height: 38px;
      padding-left: 25px;
      padding-top: 10px;
      @media (max-width: 750px) {
        width: auto;
      }
    }
    img{
      width: 120px;
      margin-left: 20px;
    }
  }
  
`;
