import React, { Component } from 'react';

const ScaleImage = ({ src, scale, x, y }) => (
  <div className="image" style={{
    backgroundImage: `url(${src})`,
    transform: `scale(${scale}) translate(${x/scale}px, ${y/scale}px)`
  }} />
);

export default ScaleImage;
