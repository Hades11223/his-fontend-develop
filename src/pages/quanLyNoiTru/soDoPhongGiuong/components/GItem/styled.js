import styled from "styled-components";

export const CardStyled = styled.div`
  border-radius: 8px;
  border: solid 1px rgba(23, 43, 77, 0.1);
  overflow: hidden;
  margin: 8px;
  width: 150px;
  height: 106px;

  .g-nb {
    padding-right: 5px;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.25),
        rgba(23, 43, 77, 0.25)
      ),
      #ffffff;
    height: 76px;

    .nb-ten {
      font-size: 12px;
      font-weight: 700;
      text-align: right;

      overflow-y: scroll;
      height: 100%;

      &::-webkit-scrollbar {
        display: none;
      }

      .text-1-line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }

  .g-nb-empty {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.9)
      ),
      #05c270;
    height: 76px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 14px;
    color: #049254;
    text-align: center;
    background: #c0f0db;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .g-nb-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;

    &-left {
      flex: 5;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .g-label {
        flex: 2;
        font-weight: 700;
        font-size: 16px;
        color: #172b4d;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .g-nb-sl {
        flex: 1;
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
          ),
          #0762f7;
        border-radius: 11px;
        height: 18px;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        padding: 0 5px;
        margin-left: 4px;
      }
    }

    &-right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .avatar-circle {
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #0762f7;
    }
  }
`;
