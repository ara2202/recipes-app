import React from 'react';
import {useDispatch } from 'react-redux'
import {Rate} from 'antd';
import {push} from 'connected-react-router';
import {Link} from 'react-router-dom';

import {getAgeColor, getTextColor} from 'Components/commonStyles';
import Ingredients from 'Components/Ingredients';
import {s} from './styles';

export default function RecipeCard(props) {
    const {recipeName, totalTime, complexity, allowedAge, images, ingredients, _id} = props.recipe;
    const color = getAgeColor(allowedAge);
    const textColor = getTextColor(color);
    const dispatch = useDispatch();

    return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/recipe/${_id}`}>
        <s.MainContainer ref={props.REF}>
            <img src={images[0]} alt="No img :("/>

            <s.RecipeContainer>
                <s.Header>{recipeName}</s.Header>
                <s.RecipeInfo>
                    <s.RecipeInfoRaw>
                        <s.SvgComplexity/>
                        <div>{complexity}</div>
                    </s.RecipeInfoRaw>
                    <s.RecipeInfoRaw>
                        <s.SvgTime/>
                        <div>{totalTime ? `${totalTime} мин` : '-'}</div>
                    </s.RecipeInfoRaw>
                    <s.RecipeInfoRaw>
                        <s.SvgPortions/>
                        <div>12 порций</div>
                    </s.RecipeInfoRaw>
                </s.RecipeInfo>
                <s.RecipeIngredients>
                    <Ingredients ingredients={ingredients} maxRows={4}/>
                </s.RecipeIngredients>
                <s.ActionsContainer>
                    <s.RateDiv>
                        <Rate style={{color: 'red'}} />
                        <s.Votes>(0)</s.Votes>
                    </s.RateDiv>
                    <s.FavoritesDiv>
                        <s.SvgFavorites/>
                        <s.ShowOver680px>В избранное</s.ShowOver680px>
                    </s.FavoritesDiv>
                </s.ActionsContainer>
            </s.RecipeContainer>
            <s.StatsContainer>
                <s.AgeDiv color={color} textColor={textColor}>
                    {allowedAge + 'm+'}
                </s.AgeDiv>
                 <s.SvgStats onClick = {() => dispatch(push(`/OMGWTF`))}/>
            </s.StatsContainer>
        </s.MainContainer>
    </Link>
);
}