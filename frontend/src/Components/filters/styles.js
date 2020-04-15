import styled, { css } from 'styled-components';
import Select from 'react-select';
import { ReactComponent as Products } from 'Assets/svg/Products_2.svg';
import { COLORS } from 'Components/commonStyles';

const RelativeWrapper = styled.div`
  position: relative;
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin-bottom: 40px;
  @media (max-width: 900px) {
    height: 35px;
  }
  img {
    position: absolute;
    top: -40px;
    left: -107px;
    width: 1000px;
    height: auto;
    @media (max-width: 900px) {
      display: none;
    }
  }
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 5;
  top: 112px;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-height: 46px;
  @media (max-width: 900px) {
    top: 15px;
  }
  ${props =>
    props.open &&
    css`
      max-height: 300px;
      transition: max-height 0.3s ease-in;
    `}
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
`;

const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: ${COLORS.BACKGROUND_COLOR};
  box-shadow: 0 13px 6px -9px rgba(38, 38, 38, 0.08);
  border-radius: 6px;
  margin-top: 6px;
  padding: 10px;
`;
const Header = styled.div`
  font-weight: bold;
  user-select: none;
`;

const FiltersRaw = styled.div`
  width: 100%;
  display: flex;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 10px;
`;

const SvgProducts = styled(Products)`
  width: 38px;
  height: 38px;
  padding: 4px;
  background-color: white;
  border-radius: 4px 0 0 4px;
  min-width: 38px;
  fill: #ccc;
  border: 1px solid;
  border-color: hsl(0, 0%, 80%) transparent hsl(0, 0%, 80%) hsl(0, 0%, 80%);
`;

export const TotalInfo = styled.div`
  color: black;
  font-style: italic;
  width: 100%;
  max-width: 700px;
  user-select: none;
  position: absolute;
  top: 92px;
  @media (max-width: 900px) {
    top: -5px;
  }
`;

export const s = {
  RelativeWrapper,
  AbsoluteWrapper,
  SearchContainer,
  FiltersContainer,
  FiltersRaw,
  Header,
  StyledSelect,
  SvgProducts,
  TotalInfo,
};
