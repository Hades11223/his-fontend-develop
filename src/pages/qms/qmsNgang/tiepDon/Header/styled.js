import styled from "styled-components";

export const StyledHeader = styled.div`
  background: #fff;
  padding-top: 20px;

  .content {
    float: right;
    line-height: 57px;
    text-transform: uppercase;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 42px;
    padding-right: 50px;
  }

  .header {
    width: 100%;
    display: flex;
    border-radius: 0px 16px 16px 0px;
    .logo {
      cursor: pointer;
      border-right: 2px solid #659efc;
      display: flex;
      align-items: center;

      img {
        width: 237px;
        height: 84px;
        object-fit: contain;
      }
    }
    .title-header {
      height: 112.18px;
      padding-left: 10px;
      color: #082a55;
      display: flex;
      flex-direction: column;

      &__first {
        line-height: 57px;
        text-transform: uppercase;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 800;
        font-size: 42px;
      }
      &__icon {
        width: auto;
        object-fit: contain;
        margin-left: 10px;
      }
      &__second {
        max-width: 600px;
        line-height: 56px;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
      }
    }
  }
`;
