import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Redux
import { fetchAllTags, selectTags } from 'Redux/ducks/tags';
import {
  fetchAllProductDisplayNames,
  stateSelector as selectProductDisplayNames,
} from 'Redux/ducks/productDisplayNames';
import {
  fetchOnPageLoadAction,
  fetchOnQueryChangeAction,
  fetchMoreRecipesAction,
  selectTotalCount,
} from 'Redux/ducks/recipes';

//Components
import FiltersDropDown from 'Components/filters';
import RecipeList from 'Components/recipeList';

//Styles

function MainRecipesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const productDisplayNames = useSelector(selectProductDisplayNames);
  const totalCount = useSelector(selectTotalCount);

  useEffect(() => {
    dispatch(fetchOnPageLoadAction(`limit=10&page=1`));
    if (!tags.length) dispatch(fetchAllTags());
    if (!productDisplayNames.length) dispatch(fetchAllProductDisplayNames());
  }, [dispatch]);

  useEffect(() => {
    if (pageNumber === 1) return;
    const queryString = `limit=10&page=${pageNumber}${query}`;
    dispatch(fetchMoreRecipesAction(queryString));
  }, [dispatch, pageNumber]);

  const onQueryChange = query => {
    const queryString = `limit=10&page=1${query}`;
    dispatch(fetchOnQueryChangeAction(queryString));
    setQuery(query);
    setPageNumber(1);
  };

  //ToDo: посмотреть можно ли оптимизировать кол-во рендеров
  //console.log('RENDERING');

  return (
    <>
      <FiltersDropDown
        onQueryChange={onQueryChange}
        options1={productDisplayNames}
        options2={tags}
        totalCount={totalCount}
      />

      <RecipeList setPageNumber={setPageNumber} />
    </>
  );
}

function areEqual(prevProps, nextProps) {
  console.log(prevProps);
  console.log(nextProps);
  return false;
}

export default React.memo(MainRecipesPage, areEqual);
