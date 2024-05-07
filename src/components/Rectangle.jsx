function Rectangle(props) {
  const style = {
    width: props.width,
    height: props.height,
    background: "#F6F6F6",
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderRadius: props.borderRadius,
    margin: props.margin,
    border: props.border ? '3px solid #FFFFFF' : 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };
  

  return (
    <div className="rectangle" style={style}>
      {props.children}
    </div>
  );
}

Rectangle.defaultProps = {
  border: true // Default to true to maintain backward compatibility
};

export default Rectangle;