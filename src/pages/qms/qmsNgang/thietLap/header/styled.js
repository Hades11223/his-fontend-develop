import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 1920px;
  height: 155.79px;
  margin: -40.39px -40.39px 0;
  padding: 0 40.39px;
  box-sizing: border-box;
  background: #052A58;
  color: #ffffff;
  border-radius: 0px 0px 16px 16px;
  @media (max-width: 750px) {
    height: 105px;
    width: auto;
    margin: 0 -20px;
    padding: 0 20px;
  }
  .logo {
    cursor: pointer;
    border-right: 2px solid  #659efc;
    @media (max-width: 750px) {
      height: 105px;
      display: flex;
      align-items: center;
    }
    img {
      width: 237px;
      height: 84px;
      object-fit: contain;
    }
  }
  .title-header {
    height: 112.18px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    @media (max-width: 750px) {
      height: auto;
    }
    &__first {
      max-width: 570px;
      line-height: 57px;
      text-transform: uppercase;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: 800;
      font-size: 42px;
      @media (max-width: 750px) {
        font-size: 22.4396px;
        line-height: 27px;
        max-width: 270px;
      }
    }
    &__second {
      max-width: 600px;
      line-height: 56px;
      text-align: center;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 36px;
      @media (max-width: 750px) {
        font-size: 33.3388px;
        line-height: 39px;
        max-width: 300px;
      }
    }
  }

  .sub-logo {
    display: flex;
    width: 101.94px;
    height: 101.94px;
    align-items: center;
    justify-content: center;
    background: #082a55;
    border: 4.80848px solid #375a86;
    border-radius: 50%;
    margin-left: auto;
    &__icon {
      display: block;
      width: auto;
      height: 90%;
    }
    @media (max-width: 750px) {
      width: 67.96px;
      height: 67.96px;
      border: 3.20565px solid #375a86;
    }
  }
`;
