import styled from 'styled-components';
import { ReactComponent as Stats } from 'Assets/svg/Stats.svg';
import { ReactComponent as Favorites } from 'Assets/svg/Favorites_color_2.svg';
import { ReactComponent as LeftSlider } from 'Assets/svg/left_slider.svg';
import { ReactComponent as RightSlider } from 'Assets/svg/right_slider.svg';
import { ReactComponent as SvgFridge } from 'Assets/svg/icon_fridge.svg';
import { ReactComponent as SvgFreezer } from 'Assets/svg/icon_frost.svg';
import { COLORS } from 'Components/commonStyles';

const PageContainer = styled.div`
  position: relative;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 3fr 7fr;
  grid-template-rows: min-content auto auto;
  grid-gap: 10px 60px;
  grid-template-areas:
    'header    header'
    'image      content'
    'footer     content';
  background-color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 26px;
  padding: 30px 15px 30px 30px;
  min-height: calc(100vh - 90px);
  @media (max-width: 750px) {
    padding: 30px 0 15px 15px;
  }
`;

const Header = styled.header`
  grid-area: header;
  display: grid;
  grid-template-columns: 380px auto 100px;
  max-height: 70px;
  align-items: center;
  padding-right: 15px;
  h1 {
    margin: 0;
  }
`;

const Rating = styled.div`
  justify-self: center;
  display: flex;
  color: #ccc;
  font-size: 18px;
  @media (max-width: 750px) {
    grid-column-start: 1;
  }
`;

const Votes = styled.div`
  margin-left: 9px;
`;

const AgeDiv = styled.div`
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

const ImageAndTags = styled.aside`
  position: relative;
  display: flex;
  grid-area: image;
  flex-direction: column;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  //align-items: center;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.1)
  );
  border-radius: 20px 20px 0 0;
  color: white;
  font-size: 12px;
  padding: 5px 12px;
`;

const StorageInfo = styled.div`
  width: 100%;
  display: flex;
`;

const Fridge = styled.div`
  width: 50%;
  display: flex;

  & svg {
    width: 50px;
    height: 50px;
  }
`;

const Freezer = styled.div`
  width: 50%;
  display: flex;

  & svg {
    width: 50px;
    height: 50px;
  }
`;

const Image = styled.figure`
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

const Tags = styled.div`
  align-self: end;
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 3px;
  font-size: 12px;
  background-color: ${props => props.color};
  color: ${props => props.textColor};
  border-radius: 10px;
  margin-top: 5px;
  :not(:last-child) {
    margin-right: 5px;
  }
`;

const Content = styled.article`
  grid-area: content;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 210px);
  overflow-y: scroll;
  padding-right: 15px;
  & p {
    white-space: pre-wrap;
    line-height: 20px;
  }
`;

const Close = styled.div`
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

const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: column;
`;

const SvgStats = styled(Stats)`
  width: 50px;
  height: 50px;
  fill: #2e3192;
  background: white;
  border-radius: 20px;
`;

const StatsButton = styled.div`
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

const SvgFavorites = styled(Favorites)`
  width: 30px;
  height: 30px;
  min-width: 20px;

  // @media (min-width: 620px) and (max-width: 680px) {
  //  width: 30px;
  //  height: 30px;
  //}
`;

const SvgLeftSlider = styled(LeftSlider)`
  width: 30px;
  height: 30px;
`;

const SvgRightSlider = styled(RightSlider)`
  width: 30px;
  height: 30px;
`;

const FavoritesButton = styled.div`
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

const RateDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-size: 16px;
`;

export default {
  PageContainer,
  AgeDiv,
  Header,
  Close,
  Content,
  Image,
  ImageAndTags,
  Rating,
  Tag,
  Tags,
  Votes,
  Footer,
  StatsButton,
  SvgStats,
  SvgLeftSlider,
  SvgRightSlider,
  FavoritesButton,
  SvgFavorites,
  RateDiv,
  Info,
  SvgFridge,
  SvgFreezer,
  StorageInfo,
  Freezer,
  Fridge,
};
