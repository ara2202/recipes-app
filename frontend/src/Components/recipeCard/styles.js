import styled from 'styled-components';
import { ReactComponent as Stats } from 'Assets/svg/Stats.svg';
import { ReactComponent as Complexity } from 'Assets/svg/icon_complexity.svg';
import { ReactComponent as Time } from 'Assets/svg/icon_time.svg';
import { ReactComponent as Portions } from 'Assets/svg/icon_portions.svg';
import { ReactComponent as Favorites } from 'Assets/svg/Favorites_color_2.svg';
import { COLORS } from 'Components/commonStyles';

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 160px auto 90px;
  grid-gap: 20px;
  border: 2px solid transparent;
  border-radius: 26px;
  background: ${COLORS.BACKGROUND_COLOR};
  box-sizing: border-box;
  user-select: none;
  padding: 20px;
  @media (max-width: 620px) {
    grid-template-columns: auto 4fr 1fr;
    grid-gap: 10px;
    padding: 10px;
  }
  &:hover {
    box-shadow: 0 0 10px 5px ${COLORS.BACKGROUND_COLOR};
    cursor: pointer;
  }
  @media (max-width: 420px) {
    grid-gap: 5px;
    padding: 5px;
  }

  img {
    object-fit: cover;
    width: 160px;
    height: 176px;
    border-radius: 26.63px;
    @media (max-width: 620px) {
      width: 140px;
      height: 140px;
    }
    @media (max-width: 519px) {
      width: 110px;
      height: 110px;
    }
    @media (max-width: 459px) {
      width: 90px;
      height: 90px;
    }
  }
`;

export const RecipeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 2fr 5fr 2fr;
  width: auto;
  max-height: 176px;
  @media (max-width: 620px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

export const Header = styled.div`
  white-space: nowrap;
  overflow: hidden;
  overflow-clip: ellipse;
  font-style: italic;
  font-size: large;
  font-weight: bold;
  grid-column: 1 / 3;
  @media (max-width: 620px) {
    font-size: 16px;
  }
`;

export const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  @media (max-width: 620px) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const RecipeInfoRaw = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  overflow-clip: ellipse;
  svg {
    margin-right: 10px;
  }
  @media (max-width: 620px) {
    font-size: 12px;
    svg {
      margin-right: 5px;
    }
  }
`;

export const RateDiv = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 18px;
  @media (max-width: 620px) {
    font-size: 12px;
    order: 1;
    & .ant-rate-star:not(:last-child) {
      margin-right: 4px;
    }
  }
  @media (max-width: 459px) {
    & .ant-rate-star:not(:last-child) {
      margin-right: 1px;
    }
  }
`;

export const Votes = styled.div`
  margin-left: 9px;
  @media (max-width: 620px) {
    display: none;
  }
`;

export const RecipeIngredients = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  margin: 10px 0 0 10px;
  overflow: hidden;
  min-width: 185px;
  @media (max-width: 725px) {
    min-width: unset;
  }
  @media (max-width: 620px) {
    display: none;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const AgeDiv = styled.div`
  width: 90px;
  height: 50px;
  background: ${props => props.color};
  color: ${props => props.textColor};
  font-weight: bold;
  font-size: 25px;
  padding: 6px;
  border-radius: 20px;
  text-align: center;
  @media (max-width: 620px) {
    width: 100%;
    height: auto;
    font-size: 18px;
    padding: 6px;
  }
`;

export const SvgStats = styled(Stats)`
  width: 90px;
  height: 90px;
  fill: #2e3192;
  background: white;
  border-radius: 20px;
  &:hover {
    fill: ${COLORS.SELECT_COLOR};
    width: 93px;
    height: 93px;
  }
  @media (max-width: 620px) {
    width: 100%;
    height: auto;
  }
`;

export const ActionsContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: space-between;
  @media (max-width: 620px) {
    grid-row: 2 / 3;
  }
`;

export const SvgComplexity = styled(Complexity)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  fill: #cc9e13;
`;
export const SvgTime = SvgComplexity.withComponent(Time);
export const SvgPortions = SvgComplexity.withComponent(Portions);

export const FavoritesDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: #2e3192;
  align-items: center;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  justify-self: center;
  @media (min-width: 621px) and (max-width: 680px) {
    width: 40px;
    margin: auto;
  }
  @media (max-width: 519px) {
    padding: 0 5px;
  }
  @media (max-width: 459px) {
    flex: 1;
    margin-right: 10px;
  }
`;

export const ShowOver680px = styled.div`
  margin-left: 10px;
  ${FavoritesDiv}:hover & {
    color: ${COLORS.SELECT_COLOR};
  }
  @media (min-width: 621px) and (max-width: 680px) {
    display: none;
  }
  @media (max-width: 620px) {
    font-size: 12px;
    margin-left: 5px;
  }
  @media (max-width: 459px) {
    display: none;
  }
`;

export const SvgFavorites = styled(Favorites)`
  width: 20px;
  height: 20px;
  min-width: 20px;

  @media (min-width: 620px) and (max-width: 680px) {
    width: 30px;
    height: 30px;
  }
`;

export const s = {
  MainContainer,
  Votes,
  Header,
  AgeDiv,
  FavoritesDiv,
  SvgFavorites,
  SvgPortions,
  SvgTime,
  SvgComplexity,
  RecipeContainer,
  ActionsContainer,
  RateDiv,
  RecipeInfo,
  RecipeInfoRaw,
  RecipeIngredients,
  ShowOver680px,
  StatsContainer,
  SvgStats,
};
