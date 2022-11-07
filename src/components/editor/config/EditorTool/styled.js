import styled from 'styled-components'

const Main = styled('div')`
  & .tool-item {
    margin-bottom: 12px;
  }
`;

const ColorPickMain = styled('div')`
  background-color: #fff;
`;

const ColorItem = styled('div')`
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.color};
  margin: 6px;
  border: solid 1px #dedede;
  cursor: pointer;

  &:hover {
    outline-color: ${(props) => props.color};
  }
`;

export { Main, ColorPickMain, ColorItem }
