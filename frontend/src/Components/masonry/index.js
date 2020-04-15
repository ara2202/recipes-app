import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { Parent, Child } from './styles';

export default class Masonry extends Component {
  static propTypes = {
    theme: PropTypes.object,
    rowHeight: PropTypes.number,
    colWidth: PropTypes.number,
    columnGap: PropTypes.number,
  };

  static defaultProps = {
    // in pixels
    rowHeight: 20,
    colWidth: 200,
    columnGap: 30,
  };

  state = { spans: [] };
  ref = createRef();
  // sums up the heights of all child nodes for each grid item
  sumUp = (acc, node) => acc + node.scrollHeight;

  computeSpans = () => {
    const { rowHeight } = this.props;
    const spans = [];
    Array.from(this.ref.current.children).forEach(child => {
      const childHeight = Array.from(child.children).reduce(this.sumUp, 0);
      const span = Math.ceil(childHeight / rowHeight);
      spans.push(span + 1);
      child.style.height = span * rowHeight + `px`;
    });
    this.setState({ spans });
  };

  componentDidMount() {
    this.computeSpans();
    window.addEventListener('resize', this.computeSpans);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeSpans);
  }

  render() {
    return (
      <Parent ref={this.ref} {...this.props}>
        {this.props.children.map((child, i) => (
          <Child key={i} span={this.state.spans[i]}>
            {child}
          </Child>
        ))}
      </Parent>
    );
  }
}
