import styled from 'styled-components';

export const Parent = styled.div`
  width: 100%;
  max-width: ${props => props.colWidth * 4 + props.columnGap * 3}px;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${props => props.colWidth}px, 1fr)
  );
  grid-auto-rows: 10px;
  row-gap: 10px;
  column-gap: ${props => props.columnGap}px;
  ${props => props.theme}}
`;

export const Child = styled.div`
  grid-row: span ${props => props.span};
  height: max-content;
`;
