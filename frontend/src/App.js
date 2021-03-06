import React from 'react';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';

//ToDo: это звиздец, убрать этот импорт
import 'antd/dist/antd.css';
import MainRecipesPage from 'Pages/main';
import RecipePage from 'Pages/recipe';
import CollectionsPage from 'Pages/collections';
import Menu from 'Components/menu';

const StyledBody = styled.main`
  background: linear-gradient(180deg, #27aae1 0%, #ff8dea 50%, #a844a1 100%)
    repeat fixed;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  return (
    <StyledBody>
      <Menu />

      <Switch>
        <Redirect from="/" exact to="/recipes" />
        <Redirect from="/recipes/" exact strict to="/recipes" />
        <Route path="/recipe/:id" children={<RenderRecipePage />} />
        <Route path="/recipes" exact component={MainRecipesPage} />
        <Route path="/collections" exact component={CollectionsPage} />
        <Route path="*" render={() => <h1>Not Found Page</h1>} />
      </Switch>
    </StyledBody>
  );
}

function RenderRecipePage() {
  let { id } = useParams();
  return <RecipePage id={id} />;
}
