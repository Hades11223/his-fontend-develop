import styled from "styled-components";

export const HeaderWrapper = styled.div`
  /* display: flex;
  align-items: center;
  flex-direction: column; */
  .header-info {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    .collapse-arrow {
      transform: ${(props) => (props.isCollapsed ? "rotate(90deg)" : "unset")};
      transition: 0.3s;
    }
    &__name {
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
      margin: 0 2px 0 6px;
    }
    img {
      margin: 0 6px;
    }
  }
  & svg.icon {
    width: 22px;
    height: 22px;
  }
`;
