import styled from 'styled-components';

export const Main = styled.ul`
    background-color: #fff;
    position: absolute;
    width: 100%;
    border-radius: 3px;
    color: #333;
    z-index: 999;
    box-shadow: 0 0 1px #555;
    max-height: 150px;
    & li {
      padding: 5px 10px;
      cursor: pointer;
      padding-bottom: 5px;
      font-size: 14px;
    }
    & li:hover,
    li.active-item {
      background-color: #b4ec5159;
    }
    & li.active-item {
      background-color: #03a9f44f;
      color: #000;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
`;
