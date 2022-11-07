import Styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 #root > div > div> div:nth-of-type(1),#myMarquee {
  display:none;
}
`;

export const HomePageStyled = Styled.div`
display:flex;
flex-direction:column;
min-height:100vh;
padding:16px;
& .dashboard__icon{
  width:64px;
  height: 64px;
}
& .dashboard__logo{
  cursor: pointer;
}

& .header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  height:80px;
  position:relative;

  &__left{
    width:64px;
    height:64px;
    border-radius:50%;
    overflow:hidden;
    & >img{
      width: 100%;
      height: 100%;
      cursor:pointer;
      object-fit:cover;
      display:block;
    }
  }
  &__middle{
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    width:400px;
    text-align:center;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
  }
  &__right{
    .header-icon {
      display:inline-flex;
          &.badge-status {
            position: relative;
            @media (max-width: 1365.98px) {
              width: 24px;
              height: 24px;
            }
            @media (min-width: 600px) and (max-width: 768px) {
              margin: 8px;
            }
          }
      }
    &__icon{
      width: 44px;
      height:44px;
      & >path{
        fill:#1AB69D;
      }
      cursor:pointer;
      &:nth-of-type(2){
        margin:0 16px;
      }
    }
  }
}

& .content__header{
  text-align:center;
  & >h1{
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 47px;
  text-transform: uppercase;
  color: #1AB69D;
  margin:0;
  margin-bottom:6px;
  }
  & >span
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #666666;
  }
}
& .content{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap:64px;
  margin-top:40px;
  padding:0 48px;
}
  & .card{
    position:relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    gap: 24px;
    background: #FFFFFF;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    cursor:pointer;
    height:210px;
    min-width:230px;
    &__title{
      text-align:center;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 19px;
      color: #223645;
      text-transform:uppercase;
      margin:auto;
    }
    &::after{
      position:absolute;
      content:"";
      top:100%;
      left:50%;
      width: 93%;
      height: 10px;
      background-color:rgba(255, 255, 255, 0.6);
      border-radius: 0px 0px 10px 10px;
      transform: translateX(-50%);
     }
  }
  & .footer{
    display:flex;
    justify-content:center;
    align-items:center;
    flex:1;
    >img{
      align-self:end;
    }
  }

   
`;

export const Card = Styled.div`
    background:${(props) => props.bg};
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    flex-shrink:0;
    & > img{
      width:64px;
      height:64px;
      display:block;
    }
`;
