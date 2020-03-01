import styled, {css} from 'styled-components';
import Select from 'react-select';
import {ReactComponent as Products} from 'Assets/svg/Products_2.svg';
import {COLORS} from 'Components/commonStyles';

export const RelativeWrapper = styled.div`
  position: relative;
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin-bottom: 40px;
`;

export const AbsoluteWrapper = styled.div`
    position: absolute;
    width: 100%;
    z-index: 5;
    top: 0;
    background: transparent;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-height: 46px;
    ${props => props.open && 
    css`
        max-height: 300px;
        transition: max-height .3s ease-in;
    `}
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: ${COLORS.BACKGROUND_COLOR};
  box-shadow: 0 13px 6px -9px rgba(38, 38, 38, .08);
  border-radius: 6px;
  margin-top: 6px;
  padding: 10px;  
`;

export const FiltersRaw = styled.div`
  width: 100%;
  display: flex;
`;

export const StyledSelect = styled(Select)`
  margin-bottom: 10px;
`;

export const SvgProducts = styled(Products)`
    width: 38px;
    height: 38px;
    padding: 4px;
    background-color: white;
    border-radius: 4px 0 0 4px;
    min-width: 38px;
    fill: #ccc;
    border: 1px solid;
    border-color: hsl(0,0%,80%) transparent hsl(0,0%,80%) hsl(0,0%,80%);
`;