import React from 'react';
import { Main } from './styled';
import { WarningOutlined } from '@ant-design/icons';
const UnAuth = () => {
  return (
    <Main>
      <WarningOutlined style={{ fontSize: 240, color: '#faad14' }} />
      <span className={'un-auth-mess'}>{'Bạn không được phép truy cập màn hình này!'}</span>
    </Main>
  )
};

export default UnAuth;
