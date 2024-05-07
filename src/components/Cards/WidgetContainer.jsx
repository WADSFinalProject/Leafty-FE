import React from 'react';
import PropTypes from 'prop-types';
import './WidgetContainer.css';

const WidgetContainer = ({ children, padding = true, className }) => {
  return (
    <div className = {`${className ? className : "flex flex-col container" }  gap-1 rounded-md border-4 border-white shadow-lg ${padding ? 'p-2' : ''}`} style={{background: "background:radial-gradient(50%_50%_at_50%_50%,rgb(255,255,255)_0%,rgb(211.65,211.65,211.65)_100%)"}}>
      {children}
    </div>
  );
};

WidgetContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WidgetContainer;