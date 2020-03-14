import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import {Logo, HeaderContainer, MenuContainer, LoginButton, StyledLink} from './styles';

const Menu = () => (
    <HeaderContainer>
        <Logo/>

        <MenuContainer>
            <MenuLink to='/recipes' label='Рецепты' />
            <MenuLink to='/collections' label='Коллекции' />
            <MenuLink label='База продуктов' />
            <MenuLink label='Книги' />
            <MenuLink label='Контакты' />
        </MenuContainer>

        <LoginButton>Войти</LoginButton>
    </HeaderContainer>
);

export default Menu;

function MenuLink({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return <StyledLink isActive={!!match} to={to}>{label}</StyledLink>;
}
