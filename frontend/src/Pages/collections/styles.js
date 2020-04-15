import styled from 'styled-components';
import { COLORS } from 'Components/commonStyles';

export const styles = {
  backgroundColor: COLORS.BACKGROUND_COLOR,
  borderRadius: '26px',
  padding: '20px',
};

const Wrapper = styled.div`
  background-color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 26px;
  padding: 20px;
`;

const Elem = styled.div`
  margin: 10px 0 0 20px;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Li = styled.li`
  margin: 0;
  padding: 10px 0 0 0;
  user-select: none;
  -webkit-user-drag: none;
  &:hover {
    color: ${COLORS.SELECT_COLOR};
    cursor: pointer;
  }
`;

const Span = styled.span`
  margin-right: auto;
  padding: 2px 7px;
  background-color: #cbcbcb;
  border-radius: 20px;
  ${Li}:hover & {
    color: white;
    background-color: ${COLORS.SELECT_COLOR};
  }
`;

export default {
  Wrapper,
  Elem,
  Ul,
  Li,
  Span,
};
