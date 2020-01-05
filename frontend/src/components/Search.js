import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default () => (
    
    <Search placeholder="Поиск по ключевому слову" onSearch={value => console.log(value)} enterButton />
    
);