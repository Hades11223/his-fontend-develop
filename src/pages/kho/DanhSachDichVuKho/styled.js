import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const WrapButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
  .icon-more {
    svg {
      border-radius: 50%;
      width: 16px !important;
      :hover {
        background-color: #ccc;
      }
    }
  }
`;
