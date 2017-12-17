
import React from 'react';

const renderItems = (ary, open) => {
  return ary.map((item, i) => {
    console.log(i)
    const styles = Object.assign({}, item.props.style, {
      transition: `transform .${(i + 1) * 3}s, opacity .${(i + 1) * 3}s`,
      transform: `translate(${open ? 0 : -100}%, 0)`,
      opacity: open ? 1 : 0
    });
    return <item.type key={`child-${i}`} {...item.props} style={styles}/>;
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
