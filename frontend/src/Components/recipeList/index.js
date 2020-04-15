import React from 'react';
import { useSelector } from 'react-redux';
import { Empty, Spin } from 'antd';
import {
  selectRecipes,
  isRecipesLoading,
  isRecipesError,
  hasMoreRecipes,
} from 'Redux/ducks/recipes';

import InfiniteList from 'Components/InfiniteList';
import { LoadingDiv, RecipesContainer } from './styles';
import Recipe from 'Components/recipeCard';

export default function RecipeList({ setPageNumber }) {
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(isRecipesLoading);
  const isError = useSelector(isRecipesError);
  const hasMore = useSelector(hasMoreRecipes);

  const renderRecipe = (recipe, REF) => (
    <Recipe recipe={recipe} key={recipe._id} REF={REF} />
  );

  const renderLoading = () => (
    <LoadingDiv>
      <Spin size="large" />
    </LoadingDiv>
  );

  const renderError = () => <div>Ошибка загрузки</div>;
  const renderEmpty = () => <Empty />;

  return (
    <RecipesContainer>
      <InfiniteList
        elements={recipes}
        renderElement={renderRecipe}
        isLoading={isLoading}
        renderLoading={renderLoading}
        isError={isError}
        renderError={renderError}
        hasMore={hasMore}
        renderEmpty={renderEmpty}
        setPageNumber={setPageNumber}
      />
    </RecipesContainer>
  );
}
