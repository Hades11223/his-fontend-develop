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
        font-weight: 600;
        font-size: 16px;
        @media (max-width: 1366px) {
          padding: 4px 20px;
        }
      }
    }
  }
`;
