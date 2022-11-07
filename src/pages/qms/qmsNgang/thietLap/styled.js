import styled from "styled-components";
export const Main = styled.div``;

export const Wrapper = styled.div`
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  padding: 40.39px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: #f4f5f7;
  color: #082a55;
  & .full-srceen {
    position: absolute;
    left: 10px;
    i {
      margin: 3px;
    }
  }
  @media (max-width: 750px) {
    width: 100%;
    height: 1280px;
    padding: 0 20px;
  }
`;
