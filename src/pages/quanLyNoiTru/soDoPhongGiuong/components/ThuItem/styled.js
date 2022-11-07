import styled from "styled-components";

export const Main = styled.div`
  width: 514px;
  height: 279px;

  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  background: #ffffff;
  border-radius: 8px;

  .thu-title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #172b4d;
    font-weight: 700;
    font-size: 14px;
  }

  .thu-content {
    overflow-y: scroll;
    height: 250px;
  }
`;
