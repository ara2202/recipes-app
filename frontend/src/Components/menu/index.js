import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ReactComponent as SvgBooks } from 'Assets/svg/menu/MM_books.svg';
import { ReactComponent as SvgCollections } from 'Assets/svg/menu/MM_collections.svg';
import { ReactComponent as SvgContacts } from 'Assets/svg/menu/MM_contacts.svg';
import { ReactComponent as SvgProducts } from 'Assets/svg/menu/MM_products_DB.svg';
import { ReactComponent as SvgRecipes } from 'Assets/svg/menu/MM_recipes.svg';
import { ReactComponent as SvgLogin } from 'Assets/svg/menu/Login_mobile.svg';
import { s, Svg } from './styles';

const Menu = () => (
  <s.HeaderContainer>
    <s.Logo />

    <s.MenuContainer>
      <MenuLink
        to="/recipes"
        label="Рецепты"
        children={<Svg as={SvgRecipes} />}
      />
      <MenuLink
        to="/collections"
        label="Коллекции"
        children={<Svg as={SvgCollections} />}
      />
      <MenuLink
        to="#"
        label="База продуктов"
        children={<Svg as={SvgProducts} />}
      />
      <MenuLink to="#" label="Книги" children={<Svg as={SvgBooks} />} />
      <MenuLink to="#" label="Контакты" children={<Svg as={SvgContacts} />} />
    </s.MenuContainer>

    <s.LoginButton>Войти</s.LoginButton>
    <Svg as={SvgLogin} style={{ marginLeft: 'auto', marginRight: '20px' }} />
  </s.HeaderContainer>
);

export default Menu;

function MenuLink({ label, to, activeOnlyWhenExact, children }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  const isActive = !!match;
  return (
    <s.StyledLink isActive={isActive} to={to}>
      <s.Label>{label}</s.Label>
      {React.Children.map(children, child =>
        React.cloneElement(child, { isActive }),
      )}
    </s.StyledLink>
  );
}
