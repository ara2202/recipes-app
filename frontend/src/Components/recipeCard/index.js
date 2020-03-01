import React from 'react';
import chroma from 'chroma-js';
import {useDispatch } from 'react-redux'
import {Rate} from 'antd';
import {push} from 'connected-react-router';
import {Link} from 'react-router-dom';

import Ingredients from '../Ingredients';
import {MainContainer, Votes, Header, AgeDiv, FavoritesDiv, SvgFavorites, SvgPortions, SvgTime,
    SvgComplexity, RecipeContainer, ActionsContainer, RateDiv, RecipeInfo, RecipeInfoRaw,
    RecipeIngredients, ShowOver680px, StatsContainer, SvgStats} from './styles';

export const getAgeColor = age => {
   switch (true) {
       case age <  5: return '#f8bdc4';
       case age <  6: return '#e01a4f';
       case age <  7: return '#f6511d';
       case age <  8: return '#ffb400';
       case age <  9: return '#daff7d';
       case age < 10: return '#419d78';
       case age < 11: return '#15e6cd';
       case age < 12: return '#5fbff9';
       case age < 13: return '#016fb9';
       case age < 19: return '#631d76';
       case age < 25: return '#b288c0';
       case age < 37: return '#7c606b';
       default: return '#ccc';
   }
};

export const getTextColor = color => {
    return chroma(color).luminance() > 0.7? '#2e315c' : '#fff';
};

export default function RecipeCard(props) {
    const {recipeName, totalTime, complexity, allowedAge, images, ingredients, _id} = props.recipe;
    const color = getAgeColor(allowedAge);
    const textColor = getTextColor(color);
    const dispatch = useDispatch();

    return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/recipe/${_id}`}>
        <MainContainer ref={props.REF}>
            <img src={images[0]} alt="No img :("/>

            <RecipeContainer>
                <Header>{recipeName}</Header>
                <RecipeInfo>
                    <RecipeInfoRaw>
                        <SvgComplexity/>
                        <div>{complexity}</div>
                    </RecipeInfoRaw>
                    <RecipeInfoRaw>
                        <SvgTime/>
                        <div>{totalTime ? `${totalTime} мин` : '-'}</div>
                    </RecipeInfoRaw>
                    <RecipeInfoRaw>
                        <SvgPortions/>
                        <div>12 порций</div>
                    </RecipeInfoRaw>
                </RecipeInfo>
                <RecipeIngredients>
                    <Ingredients ingredients={ingredients} maxRows={4}/>
                </RecipeIngredients>
                <ActionsContainer>
                    <RateDiv>
                        <Rate style={{color: 'red'}} />
                        <Votes>(0)</Votes>
                    </RateDiv>
                    <FavoritesDiv>
                        <SvgFavorites/>
                        <ShowOver680px>В избранное</ShowOver680px>
                    </FavoritesDiv>
                </ActionsContainer>
            </RecipeContainer>
            <StatsContainer>
                <AgeDiv color={color} textColor={textColor}>
                    {allowedAge + 'm+'}
                </AgeDiv>
                 <SvgStats onClick = {() => dispatch(push(`/OMGWTF`))}/>
            </StatsContainer>
        </MainContainer>
    </Link>
);
}