import styled from "styled-components";

export const ItemSelect = styled.div`
  display: flex;
  .checkbox {
    border-right: 1px solid #ddd;
  }
  .checkbox,
  .name {
    padding: 5px 15px;
  }
  &.item-title {
    border-bottom: 1px solid #ddd;
  }
`;
