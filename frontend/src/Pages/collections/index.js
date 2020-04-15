import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTagsCollection,
  fetchTagsCollection,
} from 'Redux/ducks/tagsCollection';
import Masonry from 'Components/masonry';

import s, { styles } from './styles';
import {
  fetchMoreRecipesAction,
  fetchOnPageLoadAction,
} from 'Redux/ducks/recipes';
import RecipeList from 'Components/recipeList';

export default function CollectionsPage() {
  const dispatch = useDispatch();
  const tagsCollection = useSelector(selectTagsCollection);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [showRecipies, setShowRecipies] = useState(false);

  useEffect(() => {
    if (!tagsCollection) dispatch(fetchTagsCollection());
  });

  useEffect(() => {
    if (pageNumber === 1) return;
    const queryString = `limit=10&page=${pageNumber}${query}`;
    dispatch(fetchMoreRecipesAction(queryString));
  }, [dispatch, pageNumber]);

  const handleClick = id => () => {
    const queryString = `limit=10&page=1&tags=${id}`;
    dispatch(fetchOnPageLoadAction(queryString));
    setShowRecipies(true);
    setQuery(`&tags=${id}`);
  };

  const renderOneCollection = ({ tagCategory, tags }) => (
    <s.Elem key={tagCategory}>
      <h3>{tagCategory}</h3>
      <s.Ul>
        {tags.map(({ tagName, count, id }) => (
          <s.Li key={tagName} onClick={handleClick(id)}>
            {tagName} <s.Span>{count}</s.Span>
          </s.Li>
        ))}
      </s.Ul>
    </s.Elem>
  );

  return showRecipies ? (
    <RecipeList setPageNumber={setPageNumber} />
  ) : (
    <>
      <h1>Коллекции рецептов</h1>

      {tagsCollection && (
        <Masonry theme={styles}>
          {tagsCollection.map(i => renderOneCollection(i))}
        </Masonry>
      )}
    </>
  );
}
