import styled from 'styled-components';

const Main = styled('div')`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  
  & .un-auth-mess {
    font-weight: 700;
    color: rgba(0, 0, 0, 0.6);
    font-size: 30px;
    display: inline-block;
    width: 400px;
    margin-left: 24px;
  }
`;

export { Main };
