import styled from "styled-components";
export const Main = styled.div`
  .active-header {
    color : darkgreen !important;
  }
  .mn-sortable {
    cursor: pointer;
    .icon {
      display: flex;
      flex-direction: column;
      margin-left: 7px;
      img {
        &:last-child {
          padding-top: 3px;
        }
      }
    }
  }
`;
