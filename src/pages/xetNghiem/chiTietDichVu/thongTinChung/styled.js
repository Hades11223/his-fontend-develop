import styled from "styled-components";

export const Main = styled.div`
  max-height: 200px;
  overflow: auto;
  padding: 20px 30px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  .info-row {
    font-weight: normal;
    font-size: 14px;
    &.space-bottom {
      margin-bottom: 20px;
    }
    .gutter-row {
      padding: 0 16px;
      &--bold {
        font-weight: bold;
      }
    }
  }
`;
