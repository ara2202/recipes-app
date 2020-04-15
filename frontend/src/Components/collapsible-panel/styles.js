import styled, { css } from 'styled-components';
import { ReactComponent as ArrowDown } from 'Assets/svg/arrow-down-thick.svg';

const CollapsiblePanel = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #ededed;
  &:last-child {
    border-bottom: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: ${props => (props.isDisabled ? 'unset' : 'pointer')};
  &:hover {
    & svg {
      fill: #27aae1;
    }
  }
`;

const HeaderTitle = styled.div`
  color: ${props => (props.isDisabled ? '#c4c4c4' : '#262626')};
  font-size: 18px;
  line-height: 1.56;
  margin-right: 10px;
  user-select: none;
`;

const Body = styled.div`
  overflow: hidden;
  max-height: ${props => (props.isActive ? '100%' : 0)};

  ${props =>
    props.isActive &&
    css`
      margin-top: 16px;
    `}
`;

const SvgArrowDown = styled(ArrowDown)`
  width: 14px;
  height: 8px;
  transition: transform 0.3s;
  fill: #7d7d7d;
  ${props =>
    props.isActive &&
    css`
      transform: rotate(180deg);
    `}
`;

export default {
  CollapsiblePanel,
  Header,
  HeaderTitle,
  Body,
  SvgArrowDown,
};
