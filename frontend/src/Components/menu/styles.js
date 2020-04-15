import styled from 'styled-components';
import { ReactComponent as SvgLogo } from 'Assets/svg/menu/LOGO_MSrecepies.svg';

import { COLORS } from 'Components/commonStyles';
import { Link } from 'react-router-dom';
const colorFunc = props => (props.isActive ? COLORS.SELECT_COLOR : 'white');

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  height: 80px;
  width: 100%;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 4fr 1fr;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.1)
  );
`;

const Logo = styled(SvgLogo)`
  width: 100%;
  margin-left: 10px;
  height: auto;
  max-width: 150px;
  @media (max-width: 900px) {
    max-width: 100px;
  }
  @media (max-width: 500px) {
    max-width: 90px;
  }
  fill: white;
`;

export const Svg = styled.svg`
  display: none;
  width: auto;
  fill: ${colorFunc};
  height: 50px;
  @media (max-width: 900px) {
    display: block;
  }
  @media (max-width: 500px) {
    height: 30px;
  }
  &:hover {
    fill: ${COLORS.SELECT_COLOR};
  }
`;

const MenuContainer = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  user-select: none;
  -webkit-user-drag: none;
  color: ${colorFunc};
`;

const LoginButton = styled.button`
  color: white;
  background-color: transparent;
  width: min-content;
  height: 50px;
  min-width: 120px;
  padding: 10px 20px;
  border: 2px solid white;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const Label = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

export const s = {
  LoginButton,
  StyledLink,
  MenuContainer,
  Logo,
  HeaderContainer,
  Label,
  Svg,
};
