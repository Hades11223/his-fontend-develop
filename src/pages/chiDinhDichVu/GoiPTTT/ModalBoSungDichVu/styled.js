import styled from "styled-components";

export const Main = styled.div`
  padding: 10px 20px;

  .info-content {
    .table-dv {
      padding-bottom: 10px;
    }

    .table-thuoc {
      padding-bottom: 10px;
    }
  }

  & .footer-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
    & .selected-item {
      flex: 1;
    }
  }
`;
