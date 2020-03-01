import styled from 'styled-components';
import {ReactComponent as Stats} from 'Assets/svg/Stats.svg';
import {ReactComponent as Favorites} from 'Assets/svg/Favorites_color_2.svg';
import {COLORS} from 'Components/commonStyles';

export const PageContainer = styled.div`
    position: relative;
    max-width: 1000px;
    height: calc(100vh - 96px);
    display: grid;
    grid-template-columns: 3fr 7fr; 
    grid-template-rows: min-content auto auto;
    grid-gap: 10px 60px;
    grid-template-areas: 
      "header    header"
      "image      content"
      "footer     content";
    background-color: ${COLORS.BACKGROUND_COLOR};
    border-radius: 25.76px;
    padding: 30px; 
`;

export const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  max-height: 70px;
  align-items: center;
  h1 {
    margin: 0;
  }
`;

export const Rating = styled.div`
  justify-self: center;
  display: flex;
  color: #ccc;
  font-size: 18px;
`;

export const Votes = styled.div`
  margin-left: 9px;
`;

export const AgeDiv = styled.div`
    justify-self: end;
    width: 90px;
    height: 50px;
    background: ${props => props.color};
    color: ${props => props.textColor};
    font-weight: bold;
    font-size: 25px;
    padding: 6px;
    border-radius: 20px;
    text-align: center;
    //@media (max-width: 620px) {
    //  width: 100%;
    //  height: auto;
    //  font-size: 18px;
    //  padding: 6px;
    //}
`;

export const ImageAndTags = styled.aside`
  position: relative;
  display: flex;
  grid-area: image;
  flex-direction: column;
`;

export const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  //align-items: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1));
  border-radius: 20px 20px 0 0;
  color: white;
  font-size: 12px;
  padding: 5px 12px;
`;

export const Image = styled.figure`
  img {
    width: 100%;
    max-width: 273px;
    min-width: 80px;
    max-height: 181px;
    height: auto;
    object-fit: cover;
    margin: 10px auto 10px auto;
    border-radius: 20px;
  }
`;

export const Tags = styled.div`
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  //height: fit-content;
`;

export const Tag = styled.div`
  padding: 3px;
  font-size: 12px;
  background-color: #ccc;
  border-radius: 10px;
  margin-top: 5px;
  //height: fit-content;
  :not(:last-child) {
    margin-right: 5px;
  }
`;

export const Content = styled.article`
  grid-area: content;
  display: flex;
  flex-direction: column;
`;

export const IngredientsContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  h2 {
    margin-left: auto;
  }
`;

export const TextContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 100%;
`;

export const Text = styled.section`
  position: absolute;
  top: 35px; bottom: 0; left: 0; right: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
  p {
    white-space: pre-wrap;
    line-height: 20px;
  }
`;

export const Close = styled.div`
  position: absolute;
  background-color: ${COLORS.BACKGROUND_COLOR};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  right: -10px;
  :hover {
    background-color: #d2d2d2;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: column;  
`;

export const SvgStats = styled(Stats)`
    width: 50px;
    height: 50px;
    fill: #2e3192;
    background: white;
    border-radius: 20px;
`;

export const StatsButton = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  border-radius: 6px;
  padding: 5px;
  &:hover {
    box-shadow: 0 0 10px 5px white; 
    cursor: pointer;
  }
`;

export const SvgFavorites = styled(Favorites)`
   width: 30px;
   height: 30px;
   min-width: 20px;

  // @media (min-width: 620px) and (max-width: 680px) {
  //  width: 30px;
  //  height: 30px;
  //}
`;

export const FavoritesButton = styled.div`
  display: flex;
  background-color: #2e3192;
  color: white;
  align-items: center;
  border-radius: 6px;
  padding: 15px;
  &:hover {
    box-shadow: 0 0 10px 5px #3e41d6; 
    cursor: pointer;
  }
`;

export const RateDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #E6E6E6;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-size: 16px;
`;
