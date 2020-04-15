import React, { useEffect } from 'react';
import history from 'Redux/history';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectRecipeById, fetchSingleRecipeAction } from 'Redux/ducks/recipes';
import { Rate, Carousel } from 'antd';
import 'Pages/recipe/ant-styles.css';

import { getAgeColor, getTextColor } from 'Components/commonStyles';
import { fetchAllTags, selectTags } from 'Redux/ducks/tags';
import {
  fetchAllProductDisplayNames,
  stateSelector as selectProductDisplayNames,
} from 'Redux/ducks/productDisplayNames';
import Ingredients from 'Components/Ingredients';
import CollapsiblePanel from 'Components/collapsible-panel';

import s from './styles';

function RecipePage({ recipe, id }) {
  const dispatch = useDispatch();
  const tagsInStore = useSelector(selectTags);
  const productDisplayNames = useSelector(selectProductDisplayNames);
  useEffect(() => {
    if (!tagsInStore.length) dispatch(fetchAllTags());
    if (!productDisplayNames.length) dispatch(fetchAllProductDisplayNames());
  }, [dispatch]);

  useEffect(() => {
    if (!recipe) dispatch(fetchSingleRecipeAction(id));
  }, [recipe, dispatch, id]);

  const {
    recipeName,
    tags,
    time,
    complexity,
    recipeText,
    allowedAge,
    images,
    ingredients,
    optionalIngredients,
    author,
    originUrl,
    fridgeStorage,
    freezerStorage,
  } = recipe || {};

  const color = getAgeColor(allowedAge);
  const textColor = getTextColor(color);
  const nextArrow = () => <s.SvgRightSlider />;
  const prevArrow = () => <s.SvgLeftSlider />;

  return (
    <s.PageContainer>
      <s.Header>
        <h1>{recipeName}</h1>

        <s.Rating>
          <Rate style={{ color: 'red' }} />
          <s.Votes>(0)</s.Votes>
        </s.Rating>

        <s.AgeDiv color={color} textColor={textColor}>
          {allowedAge + 'm+'}
        </s.AgeDiv>
      </s.Header>

      <s.ImageAndTags>
        {images?.length && (
          <Carousel
            style={{ maxWidth: '273px' }}
            arrows
            nextArrow={nextArrow()}
            prevArrow={prevArrow()}>
            {images.map(i => (
              <s.Image key={i}>
                <img src={i} alt="No img" />
              </s.Image>
            ))}
          </Carousel>
        )}
        {!images?.length && <div>NO_IMG</div>}

        <s.Tags>
          {' '}
          {/*ToDo: переделать*/}
          {tags &&
            tagsInStore &&
            tags.map(tagId => {
              const tag = tagsInStore.find(i => i.id === tagId);
              const color = tag?.tagColor;
              const textColor = getTextColor(color);
              return (
                <s.Tag key={tagId} color={color} textColor={textColor}>
                  {tag?.tagName}
                </s.Tag>
              );
            })}
        </s.Tags>

        <s.Info>
          <div>Сложность</div>
          <div>Время</div>
          <div>Количество</div>
          <div>{complexity}</div>
          <div>{time}</div>
          <div>3 порции</div>
        </s.Info>
      </s.ImageAndTags>

      <s.Footer>
        <s.FavoritesButton>
          <s.SvgFavorites />
          Добавить в мои рецепты
        </s.FavoritesButton>
        <s.RateDiv>
          <div>Оценить</div>
          <Rate style={{}} />
        </s.RateDiv>
        <s.StatsButton>
          <s.SvgStats />
          Анализ пищевой ценности
        </s.StatsButton>
      </s.Footer>

      <s.Content>
        <CollapsiblePanel key="Ingredients" title="Ингредиенты">
          {ingredients && <Ingredients ingredients={ingredients} />}
        </CollapsiblePanel>
        <CollapsiblePanel key="More" title="а ещё вы можете добавить...">
          {optionalIngredients && (
            <Ingredients ingredients={optionalIngredients} />
          )}
        </CollapsiblePanel>

        <CollapsiblePanel key="receipt" title="Приготовление">
          <section>{recipeText}</section>
          <div className="recipeRaw">
            <div>Автор рецепта</div>
            <div>{author}</div>
          </div>

          <div className="recipeRaw">
            <div>Ссылка на оригинал</div>
            <div>{originUrl}</div>
          </div>
        </CollapsiblePanel>

        <CollapsiblePanel key="storage" title="Хранение">
          <s.StorageInfo>
            <s.Fridge>
              <s.SvgFridge />
              <div>
                <div>Хранение в холодильнике:</div>
                <div>{fridgeStorage}</div>
              </div>
            </s.Fridge>
            <s.Freezer>
              <s.SvgFreezer />
              <div>
                <div>Хранение в морозильной камере:</div>
                <div>{freezerStorage}</div>
              </div>
            </s.Freezer>
          </s.StorageInfo>
        </CollapsiblePanel>
      </s.Content>
      <s.Close onClick={() => history.push('/')}>X</s.Close>
    </s.PageContainer>
  );
}
//ToDo: переделать через хук ?
export default connect((state, ownProps) => ({
  recipe: selectRecipeById(state, ownProps.id),
}))(RecipePage);
