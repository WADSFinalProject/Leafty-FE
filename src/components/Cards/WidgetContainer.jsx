import React from 'react';
import PropTypes from 'prop-types';
import './WidgetContainer.css';

const WidgetContainer = ({ children, padding = true, className, backgroundColor, round = "md", border = true, borderRadius }) => {
  return (
    <div className={`${className ? className : "flex flex-col container" } gap-1 rounded-${round} border-white shadow-lg ${padding ? 'p-2' : ''} ${border ? 'border-4' : ''}`} style={{ background: backgroundColor, borderRadius: borderRadius }}>
      {children}
    </div>
  );
};

WidgetContainer.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.bool,
  borderRadius: PropTypes.string, 
};

export default WidgetContainer;
