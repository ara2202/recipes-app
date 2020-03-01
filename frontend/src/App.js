import React from 'react';
import {Switch, Route, Redirect, useParams} from 'react-router-dom';
import styled from 'styled-components';

//ToDo: это звиздец, убрать этот импорт
import "antd/dist/antd.css";
import MainRecipesPage from 'Pages/main';
import RecipePage from 'Components/recipePage';
import Menu from 'Components/menu';

const StyledBody = styled.div`
   //padding: 0 20px 20px 20px;
   background: linear-gradient(180deg, #27AAE1 0%, #FF8DEA 50%, #A844A1 100%) repeat fixed;
   min-height: 100vh;
   font-family: 'Roboto', sans-serif;
   display: flex;
   flex-direction: column;
   align-items: center;
   @media (max-width: 620px) {
    padding: 10px;
   }
   @media (max-width: 420px) {
    padding: 0;
   }
`;

function App() {
    return (
    <StyledBody>
        <Menu/>
        <Switch>
            <Redirect from="/" exact to="/recipes"/>
            <Redirect from='/recipes/' exact strict to='/recipes'/>
            <Route path="/recipe/:id" children={<RenderRecipePage/>} />
            <Route path='/recipes' exact component={MainRecipesPage}/>
            <Route path="*" render={() => <h1>Not Found Page</h1>}/>
        </Switch>
        {/*<RecipesPage/>*/}
    </StyledBody>
  );
}

function RenderRecipePage() {
    let {id} = useParams();
    return (<RecipePage id={id}/>);
}

export default App;
