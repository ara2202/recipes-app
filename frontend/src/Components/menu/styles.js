import styled from 'styled-components';
import {ReactComponent as SvgLogo} from 'Assets/svg/Logo_mamas_sapiens_UPD.svg';
import {Link} from 'react-router-dom';
import {COLORS} from 'Components/commonStyles';

export const HeaderContainer = styled.header`
  height: 80px;
  width: 100%;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 4fr 1fr;
  align-items: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0 , 0.1));
`;

export const Logo = styled(SvgLogo)`
  width: 100%;
  margin-left: 10px;
  height: auto;
  max-width: 150px;
  min-width: 80px;
  fill: white;
`;

export const MenuContainer = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  
`;

export const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: ${COLORS.SELECT_COLOR};
  }
`;

export const LoginButton = styled.button`
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
`;

