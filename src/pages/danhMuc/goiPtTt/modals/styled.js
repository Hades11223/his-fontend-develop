import styled from "styled-components";

export const ThemDvStyled = styled.div`
  padding: 10px;

  .header-search {
    padding-bottom: 20px;
    max-width: 300px;
  }

  .footer-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 16px;
    .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
  }
`;
