import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1920px ;
  height: 1080px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: #F4F5F7;
  color: #082a55;
  & .full-srceen {
    position: absolute;
    left: 10px;
    i {
      margin: 3px;
    }
  }
  @media(max-width: 750px){
    width: 100%;
    height: 1280px;
    padding: 0 20px;
  }
`;
