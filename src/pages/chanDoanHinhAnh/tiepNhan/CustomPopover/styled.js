import styled from "styled-components";

export const ContentWrapper = styled("div")`
  width: ${(props) => (props.width ? `${props.width}px` : "600px")};
  .content-popover {
    .popover-btn-list {
      display: flex;
      justify-content: flex-end;
      button {
        height: auto;
        padding: 6px 32px;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        @media (max-width: 1366px) {
          padding: 4px 20px;
        }
      }
      &__cancel {
        margin-left: 18px;
        background: #ffffff;
        @media (max-width: 1366px) {
          margin-right: 0.5em;
        }
      }
      &__ok {
        background: #0762f7;
        color: white !important;
      }
    }
  }
`;
