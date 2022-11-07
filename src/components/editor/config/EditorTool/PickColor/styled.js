import styled from 'styled-components';

const Main = styled('div')``;

const Color = styled('span')`
  width: 20px;
  height: 10px;
  background-color: ${props => props.color};
`;

const ColorItem = styled('div')`
  height: 14px;
  background-color: ${props => props.color};
  cursor: pointer;
  border: ${props => props.theme.border};
`;

const ColorContain = styled('div')`
  padding: 6px;
  background-color: #fff;
  border: ${props => props.theme.border};
  width: 120px;
`;

export { Main, Color, ColorItem, ColorContain };
