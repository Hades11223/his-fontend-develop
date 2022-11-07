import styled from "styled-components";

export const Card = styled.div`
  // height: 626px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(23, 43, 77, 0.05);
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .card-head {
    padding: 10px;
    border-bottom: 1px solid rgba(23, 43, 77, 0.1);
    .title {
      color: #172b4d;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
    }
  }
  .card-body {
    padding: 10px;
  }
`;
