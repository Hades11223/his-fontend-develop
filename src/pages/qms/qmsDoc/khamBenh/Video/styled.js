import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  margin-top: 20px;
  box-shadow: 0px 1.92339px 3.84678px rgba(0, 0, 0, 0.101081);
  background: #ffffff;
  border-radius: 15.3871px;
  .left {
    height: 421px;
    overflow: hidden;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: 800;
      font-size: 44.2458px;
      line-height: 60px;
      color: #049254;
    }
    ul {
        margin-left: 40px;
    }
    li {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 30px;
      line-height: 41px;
      list-style-type: initial;
      color: #172b4d;
    }
  }
  .right {
    height: 421px;
    overflow: hidden;
    margin-left: auto;
  }
`;
