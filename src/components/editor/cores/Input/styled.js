import styled from 'styled-components';

const Main = styled('div')`
  & .img-view {
    border: dashed 1px rgba(0, 0, 0, 0.6);
    object-fit: contain;
    object-position: center;
  }
  
  & .input-component {
    min-width: 30px;
    border: solid 1px #000;
    outline: none;
    text-align: center;
  }
`;

export { Main };
