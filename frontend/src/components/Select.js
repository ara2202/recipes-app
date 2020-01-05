import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const children = [];

// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

children.push(<Option key="potato">potato</Option>);
children.push(<Option key="onion">onion</Option>);
children.push(<Option key="помидоры">помидоры</Option>);
children.push(<Option key="4">свекла</Option>);
children.push(<Option key="5">тыква</Option>);
children.push(<Option key="6">батат</Option>);
children.push(<Option key="7">морковь</Option>);
children.push(<Option key="8">перец</Option>);
children.push(<Option key="9">капуста</Option>);

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default () => (
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Выберите продукт"
    onChange={handleChange}
    suffixIcon="%"
  >
    {children}
  </Select>
);