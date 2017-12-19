
import React from 'react';

const renderItems = (ary, open) => {
  console.log('[Rerender] Animation')
  return ary.map((item, i) => {
    const styles = Object.assign({}, item.props.style, {
      transition: `transform .7s, opacity .7s`,
      transitionDelay: `${i * 0.3}s`,
      transitionTimingFunction: 'ease-in-out, ease-in',
      transform: `translate(${open ? 0 : -100}%, 0)`,
      opacity: open ? 1 : 0
    });
    /* USE wrapper to control position. */
    return <div key={`ary-${i}`} style={styles}>{item}</div>;
    /* NOT using wrapper, modify directly. Must merge child style on your own */
    // return <item.type key={`ary-${i}`} {...item.props} style={styles}/>;
    // return React.cloneElement(item, { key: `ary-${i}`, style: styles });
  })
}

const FadeInWrapper = ({ children, open }) => {
  return (
    <div style={{ overflow: 'hidden', border: '1px solid lightgray', padding: 4 }}>
      {renderItems(children, open)}
    </div>
  );
}

export default FadeInWrapper;
