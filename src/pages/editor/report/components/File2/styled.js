import styled from 'styled-components';

const Main = styled('div')`
  font-family: "Times New Roman", sans-serif;
  font-size: ${props => props.fontSize}pt;
  max-width: ${props => props.width}px;
`;

export { Main };
