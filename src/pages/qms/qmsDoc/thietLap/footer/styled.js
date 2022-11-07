import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1080px;
  height: 127px;
  align-items: center;
  position: absolute;
  bottom: 0;
  margin: -40.39px -40.39px 0;
  padding: 0 40.39px;
  background: #052a58;
border-radius: 16px 16px 0px 0px;
  .content{
    display:flex;
    width:100%;
    .left{
      display:flex;
      align-items: center;
      color: #FFFFFF;
      font-family: Nunito Sans;
font-style: normal;
font-weight: normal;
font-size: 36px;
line-height: 49px;
span{
  padding-left:15px;
}
  }
  .right{
    margin-left:auto;
  }
}
`;
