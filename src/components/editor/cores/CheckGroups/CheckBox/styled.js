import styled from 'styled-components';

const Main = styled('div')`
  display: flex;
  align-items: start;
  cursor: pointer;
  flex-direction: ${props => props.direction === 'ltr' ? 'row-reverse' : 'row'};
  
  & .check-box-contain {
    margin: 3px;
    width: 14px;
    height: 14px;
    border: solid 1px #000;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    line-height: 1;
    margin-top: 5px !important;    
    & span {
      pointer-events: none;
    }
  }
`;

export { Main };
