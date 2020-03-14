import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Empty, Spin} from 'antd';

import Recipe from 'Components/recipeCard';
import InfiniteList from 'Components/InfiniteList';
import FiltersDropDown from 'Components/filters';

import {RecipesContainer, LoadingDiv} from './styles';
import {fetchAllTags, selectTags} from 'Redux/ducks/tags';
import {fetchAllProductDisplayNames,
    stateSelector as selectProductDisplayNames} from 'Redux/ducks/productDisplayNames';
import {fetchNewRecipesAction, fetchMoreRecipesAction,
    selectRecipes, isRecipesLoading, isRecipesError, hasMoreRecipes, selectTotalCount} from 'Redux/ducks/recipes';

const renderRecipe = (recipe, REF) => (
      <Recipe
        recipe={recipe}
        key = {recipe._id}
        REF={REF}
      />
);

const renderLoading = () => (
    <LoadingDiv>
        <Spin size="large"/>
    </LoadingDiv>
);

const renderError = () => <div>Ошибка загрузки</div>;
const renderEmpty = () => <Empty/>;

// ToDo: Страница рендерится по 3-4 раза, понять в чем причина, устранить
function MainRecipesPage(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const tags = useSelector(selectTags);
    const productDisplayNames = useSelector(selectProductDisplayNames);
    const recipes = useSelector(selectRecipes);
    const isLoading = useSelector(isRecipesLoading);
    const isError = useSelector(isRecipesError);
    const hasMore = useSelector(hasMoreRecipes);
    const totalCount = useSelector(selectTotalCount);

    useEffect(() => {
        dispatch(fetchAllTags());
        dispatch(fetchAllProductDisplayNames());
        dispatch(fetchNewRecipesAction(`limit=10&page=1`));
    }, [dispatch]);

    useEffect(() => {
        if (pageNumber === 1) return;
        const queryString = `limit=10&page=${pageNumber}${query}`;
        dispatch(fetchMoreRecipesAction(queryString));
    },[dispatch, pageNumber]);

    const onQueryChange = query => {
        const queryString = `limit=10&page=1${query}`;
        dispatch(fetchNewRecipesAction(queryString));
        setQuery(query);
        setPageNumber(1);
    };

    //ToDo : страница рендерится по 3-4 раза
    console.log('RENDERING');

    return (
        <>
            <div style={{color: 'white', fontStyle: 'italic', width: '100%', maxWidth: '700px'}}>Всего рецептов найдено: {totalCount}</div>
            <FiltersDropDown
                onQueryChange={onQueryChange}
                options1={productDisplayNames}
                options2={tags}
            />

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
        </>
    );
}

function areEqual(prevProps, nextProps) {
  console.log(prevProps);
  console.log(nextProps);
  return false;
}

export default React.memo(MainRecipesPage, areEqual);