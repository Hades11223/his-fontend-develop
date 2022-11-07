import styled from "styled-components";

const Main = styled("div")`
  background-color: #fff;

  & .contenteditable {
    border: 1px solid #000;
    display: inline-flex;
    border-right: 0;
    width: ${props => props.size === 'large' ? '100%' : props.size === 'medium'? '50%': 'initial'};
    & .contenteditable-item {
      min-width: 25px;
      border-right: 1px solid #000;
      text-align: center;
      padding: 2px;
      min-height: 15px;
      line-height: 15px;
      width: ${props => props.size === 'auto' ? 'inherit': '100%'}
    }
  }

  & .barcode-container {
    width: 200px;
    height: 90px;

    & svg {
      width: 100%;
      height: 100%;
    }
  }

  & img {
    width: 120px;
  }
`;

export { Main };
