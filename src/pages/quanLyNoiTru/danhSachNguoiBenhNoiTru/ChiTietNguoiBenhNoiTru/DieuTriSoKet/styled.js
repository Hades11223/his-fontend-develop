import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  padding: 16px;
  .dieuTriSoKet {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    justify-content: center;
  }
  .image {
    display: flex;
    justify-content: center;
    img {
      margin-left: 10px;
    }
  }
  .title {
    display: flex;
    .right {
      margin-left: auto;
    }
  }
  .item {
    display: flex;
    overflow: hidden;
  }
`;
