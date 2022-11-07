import styled from "styled-components";
import { titleColor } from "../common/variables";

export const MainWrapper = styled("div")`
  overflow: auto;
  text-align: center;
  .header {
    margin: 60px auto;
    font-weight: 800;
    font-size: 40px;
    line-height: 55px;
    text-align: center;
    letter-spacing: 0.01em;
    color: ${titleColor};
  }
  .btn-action {
    margin-top: 125px;
    display: flex;
    flex-direction: column;
    div.btn-lg {
      margin: 30px auto;
    }
  }
  @media (max-width: 765px) {
    .header {
      margin: 0px;
      font-weight: 800;
      font-size: 14px;
    }
    .btn-action {
      margin-top: 15px;
      margin-bottom: 140px;
      display: flex;
      flex-direction: column;
      div.btn-lg {
        width: 100%;
        height: 50px;
        margin: 30px auto;
        padding: 20px;
        img {
          width: 20px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
`;
