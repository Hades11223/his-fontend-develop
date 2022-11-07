import styled from "styled-components";

export const TimeLineGroupStyled = styled.div`
  width: 100%;
  padding: calc(8 * 100vw / 3840);
  flex: 1;
  position: relative;
  border-top: 1px solid #333333;
  .time-line-group-content {
    background: #000e25;
    border-radius: calc(32 * 100vw / 3840);
    width: 100%;
    height: 100%;
    .time-line-items-wrap {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      .line-1,
      .line-2 {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: flex-start;
      }
      .line-1 {
        border-bottom: solid 1px #56ccf2;
      }
      .line-2 {
      }
    }
  }
`;
