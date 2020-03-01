import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {stateSelector} from 'Redux/ducks/productDisplayNames';

const RecipeIngredientRaw = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  max-width: 600px;
  :after {
      content: '';
      background-image: radial-gradient(circle, currentcolor 1px, transparent 1px);
      background-position-y: bottom;
      background-size: 1ex 3px;
      background-repeat: repeat-x;
      height: 1.1em;
      flex-grow: 1;
      order: 2;
  }
`;

const Product = styled.span`
  overflow: hidden;
  overflow-clip: ellipse;
  padding-right: 5px;
  &:hover {
    overflow: visible;
  }
  order: 1;
`;

const Amount = styled.span`
  padding-left: 5px;
  white-space: nowrap;
  order: 3;
`;

function Ingredients({ingredients, displayNames, maxRows}) {
    return (
    <>
        {ingredients.map((i, index, arr) => {
            const displayName = displayNames && displayNames.find(dn => dn._id === i.displayName);
            if ((index < maxRows && arr.length <= maxRows)
                || (index < maxRows - 1 && arr.length > maxRows)
                || maxRows === undefined) {
            return (
                <RecipeIngredientRaw key={i._id}>
                    <Product>{i.showName || (displayName && displayName.displayName)}</Product>
                    <Amount>{i.displayAmount || `${i.amount} г`}</Amount>
                </RecipeIngredientRaw>
            )
            } else if (index === maxRows) {
                return (<div key={i._id} style={{fontStyle: 'italic'}}>и ещё...</div>)
            } else return null;
        })}
    </>);
}

export default connect(state => ({
    displayNames: stateSelector(state)
}))(Ingredients);