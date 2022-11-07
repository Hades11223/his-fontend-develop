import styled from 'styled-components';

export const Main = styled('div')`
  & .in-side-col {
    position: relative;
    
    & .plus-btn {
      display: none;
      position: absolute;
      z-index: 1;
      left: -12px;
      bottom: -12px;
    }
  }
  
  & .in-side-col:hover {
    & .plus-btn {
      display: block;
    }
  }
`;
