import styled from "styled-components";

export const GroupNoPagingStyled = styled.div`
  background: transparent;
  /* padding-right: 1rem;
  margin-left: 0.5em;
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : "1em"}; */
  /* padding-right: 0; */
  position: relative;
  height: 100%;
  .group-content {
    height: 100%;
    /* width: calc(100% - 1em); */
    /* background: ${({ transparent }) =>
      transparent ? "transparent" : `var(--background)!important`}; //#000E25 */
    background: #ffffff;
    /* border-radius: 0.83333333333vw; */
    border-radius: 6px;
    #doanh-thu-theo-khoa {
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }
  }
  div.title {
    font-size: 1.25vw;
    line-height: 1.69270833333vw;
  }
`;
