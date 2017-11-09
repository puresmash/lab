import React from 'react';
import './ConsoleGUI.css';

const ConsoleGUI = ({ logs=[] }) => (
  <div className="console-gui">
    {logs.map((ele, i) => {
      const str = typeof ele ==='string' ? ele : JSON.stringify(ele);
      return (
        <span key={`msg-${i}`}>
          {str}
        </span>
      );
    })}
  </div>
)

export default ConsoleGUI;
