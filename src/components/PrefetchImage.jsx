import React, { Component } from 'react';
import _ from 'lodash';

const EMPTY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'

export default class PrefetchImage extends Component {
  props: {
    children: () => object,
    items: Array<string>,
    prefetchRange: Array<number>,
    activeIndex: number
  }
  state: {
    meta: object
  }
  constructor(props) {
    super(props);
    this.cached = [];
    this.state = {
      meta: this.getNewMeta(props)
    }
  }
  getNewMeta = (props) => {
    const { items, prefetchRange, activeIndex } = props;
    // set cached
    this.cached[activeIndex] = true;
    return items.map((src, i) => {
      const isActive = i === activeIndex;
      const isPrefetch = _.inRange(i, activeIndex + prefetchRange[0], activeIndex + prefetchRange[1]);
      const isCached = this.cached[i];
      return {
        prefetch: (isPrefetch && !isCached) ? <link rel="prefetch" href={src} /> : null,
        src: (isCached || isActive) ? src : EMPTY,
        isActive
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    const { items, prefetchRange, activeIndex } = this.props;

    // Handle Items Change
    if(items !== nextProps.items) {
      // clear cached array
      this.cached = [];
    }

    // Run Everytime
    const meta = this.getNewMeta(nextProps);
    this.setState({ meta });
  }
  render() {
    const renderedChildren = this.props.children(this.state.meta);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}
