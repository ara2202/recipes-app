import styled from 'styled-components';
import {COLORS} from 'Components/commonStyles';

export const RecipesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  @media (max-width: 1259px) {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 800px;
    min-width: 300px;
  }
  @media (max-width: 620px) {
    grid-gap: 10px;
  }
`;

export const LoadingDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 20px 0 0;
    border-radius: 20px;
    width: 600px;
    background: ${COLORS.BACKGROUND_COLOR};
`;