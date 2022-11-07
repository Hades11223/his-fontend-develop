import styled from "styled-components";

const Main = styled.div`
  .btn-brush {
    display: flex;
    align-items: center;
    justify-content: center;
    &__icon {
      padding-right: 5px;
      border-right: 1px solid transparent;
      border-color: #d9d9d9;
    }
  }
`;

const LineBrush = styled.div`
  width: 15px;
  margin-left: 5px;
  border-top: ${(props) => props.size}px solid #00000f;
`;

export { Main, LineBrush };
