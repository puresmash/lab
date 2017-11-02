import React from 'react';

const EMPTY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'

const Image = ({ isActive, src, isPrefetch, isCached, ...others }) => {
  return (
    <section>
      { isPrefetch && !isCached &&
        <link rel="prefetch" href={src} />
      }
      <img {...others} src={isActive || isCached ? src : EMPTY} />
    </section>
  );
}

export default Image;
