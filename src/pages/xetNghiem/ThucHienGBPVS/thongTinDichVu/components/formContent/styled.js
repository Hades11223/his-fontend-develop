import styled from "styled-components";

export const Main = styled.div`
  padding: 13px 16px;
  border-radius: 3px;
  .form-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .form-item {
      width: 30%;
      &--full-width {
        width: 100%;
      }
    }
  }
`;
