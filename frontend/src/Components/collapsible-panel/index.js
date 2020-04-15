import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Styles
import s from './styles.js';

CollapsiblePanel.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
};

export default function CollapsiblePanel(props) {
  const active =
    props.isActive !== undefined ? props.isActive : Boolean(props.children);
  const [isActive, setIsActive] = useState(active);
  const activeEl = useRef(null);
  useEffect(
    () =>
      activeEl?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
    [isActive],
  );

  const handleClick = e => {
    if (!props.children) return;
    const event = e.persist() || e;
    setIsActive(!isActive);
    activeEl.current = event?.target?.closest('.collapsible');
  };

  return (
    <s.CollapsiblePanel className="collapsible">
      <s.Header onClick={handleClick} isDisabled={!props.children}>
        <s.HeaderTitle isDisabled={!props.children}>
          {props.title}
        </s.HeaderTitle>
        {!!props.children && <s.SvgArrowDown isActive={isActive} />}
      </s.Header>
      <s.Body isActive={isActive}>{props.children}</s.Body>
    </s.CollapsiblePanel>
  );
}
