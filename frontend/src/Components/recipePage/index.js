import React, {useEffect} from 'react';
import history from 'Redux/history';
import {connect, useDispatch, useSelector} from 'react-redux';
import {selectRecipeById, fetchSingleRecipeAction} from 'Redux/ducks/recipes';
import {Rate, Carousel} from 'antd';
import './ant-styles.css';

import {getAgeColor, getTextColor} from 'Components/recipeCard';
import {fetchAllTags, selectTags} from 'Redux/ducks/tags';
import {
    fetchAllProductDisplayNames, stateSelector as selectProductDisplayNames
} from 'Redux/ducks/productDisplayNames';
import Ingredients from '../Ingredients';

import {
    PageContainer, AgeDiv, Header, Close, Content, Image, ImageAndTags,
    IngredientsContainer, Rating, Tag, Tags, Text, Votes, TextContainer, Footer,
    StatsButton, SvgStats, FavoritesButton, SvgFavorites, RateDiv, Info
} from './styles';

function RecipePage({recipe, id}) {
    const dispatch = useDispatch();
    const tagsInStore = useSelector(selectTags);
    const productDisplayNames = useSelector(selectProductDisplayNames);

    useEffect(()=> {
        if (!recipe) dispatch(fetchSingleRecipeAction(id));
        if (!tagsInStore.length) dispatch(fetchAllTags());
        if (!productDisplayNames.length) dispatch(fetchAllProductDisplayNames());
    },[recipe, dispatch, id]);

    console.log(recipe);

    const {recipeName, tags, time, complexity, recipeText, allowedAge, images, ingredients, _id} = recipe ? recipe : {};

    const color = getAgeColor(allowedAge);
    const textColor = getTextColor(color);
    const nextArrow = () => <div></div>;
    const prevArrow = () => <div></div>;


    return (
        <PageContainer>
            <Header>
                <h1>{recipeName}</h1>

                <Rating>
                    <Rate style={{color: 'red'}} />
                    <Votes>(0)</Votes>
                </Rating>

                <AgeDiv color={color} textColor={textColor}>
                    {allowedAge + 'm+'}
                </AgeDiv>
            </Header>

            <ImageAndTags>
                {images &&
                <Carousel style={{maxWidth: '273px'}} arrows nextArrow={nextArrow()} prevArrow={prevArrow()}>
                    {images.map(i =>
                        <Image>
                            <img key={i} src={i} alt="No img"/>
                        </Image>

                    )}
                </Carousel>
                }

                <Tags> {/*ToDo: переделать*/}
                {tags && tagsInStore &&
                    tags.map(tag => (
                        <Tag key={tag}>
                            {tagsInStore.find(i => i._id === tag) &&
                                tagsInStore.find(i => i._id === tag).tagName}
                        </Tag>
                    ))
                }
                </Tags>

                <Info>
                    <div>Сложность</div>
                    <div>Время</div>
                    <div>Количество</div>
                    <div>{complexity}</div>
                    <div>{time}</div>
                    <div>3 порции</div>
                </Info>
            </ImageAndTags>

            <Footer>
                <FavoritesButton>
                    <SvgFavorites/>
                    Добавить в мои рецепты
                </FavoritesButton>
                <RateDiv>
                    <div>Оценить</div>
                    <Rate style={{}}/>
                </RateDiv>
                <StatsButton>
                    <SvgStats/>
                    Анализ пищевой ценности
                </StatsButton>
            </Footer>

            <Content>
                <IngredientsContainer>
                    <h2>Ингредиенты</h2>
                    {ingredients && <Ingredients ingredients={ingredients}/>}
                </IngredientsContainer>

                <TextContainer>
                    <h2>Приготовление</h2>
                    <Text>
                        <p>{recipeText}</p>
                    </Text>
                </TextContainer>
            </Content>
            <Close onClick={() => history.push("/")}>
                X
            </Close>
        </PageContainer>
    );
}
//ToDo: переделать через хук ?
export default connect((state, ownProps) => ({
    recipe: selectRecipeById(state, ownProps.id)
}))(RecipePage);