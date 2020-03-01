import React from 'react';
import {Logo, HeaderContainer, MenuContainer, LoginButton, MenuLink} from './styles';


const Menu = () => (
    <HeaderContainer>
        <Logo/>

        <MenuContainer>
            <MenuLink to="/">Рецепты</MenuLink>
            <MenuLink>Коллекции</MenuLink>
            <MenuLink>База продуктов</MenuLink>
            <MenuLink>Книги</MenuLink>
            <MenuLink>Контакты</MenuLink>
        </MenuContainer>

        <LoginButton>Войти</LoginButton>
    </HeaderContainer>
);

export default Menu;
