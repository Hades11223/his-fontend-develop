import styled from 'styled-components';
import { Row } from 'antd';

export const Main = styled(Row)`
    /* margin: 30px 30px 0px 15px; */
    background: #FFFFFF;
    margin-right: 30px;
    box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
    border-radius: 8px;
    height: ${props => (props.isThemMoi ? "663px": `685px`)};
    /* height: 100% */
`;