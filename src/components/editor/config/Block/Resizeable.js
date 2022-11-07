import React, { useState, useEffect, useRef } from 'react';
import T from 'prop-types';
import { ResizeElm } from './styled';

const Resizeable = ({ resizeable, currentItemProps, nextItemProps, className, verticalLine }) => {
  const [pageX, setPageX] = useState(0);
  const [onFocus, setOnFocus] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [defaultWidth, setDefaultWidth] = useState(0);
  const [nextWidth, setNextWidth] = useState(0);
  const [nextItemWidth, setNextItemWidth] = useState(0);
  const element = useRef(null);
  const currentRef = useRef();

  useEffect(() => {
    currentRef.current = {
      currentWidth,
      nextWidth,
      pageX,
      onFocus,
      nextItemWidth,
      defaultWidth,
      currentItemProps,
      nextItemProps,
    };
  }, [currentWidth, nextWidth, pageX, onFocus, nextItemWidth, defaultWidth, currentItemProps, nextItemProps]);
  
  useEffect(() => {
    const node = element.current;
    if (node) {
      node.addEventListener('mousedown', handleMousedown);
      
      return () => {
        node.removeEventListener('mousedown', handleMousedown);
        document.removeEventListener('mouseup', handleMouseup);
      };
    }
    
  }, []);

  const handleMousedown = (e) => {
    document.addEventListener('mousemove', handleMousemove);
    document.addEventListener('mouseup', handleMouseup);
    verticalLine.current.showLine(e);
    setPageX(e.pageX);
    setOnFocus(true);
    setNextItemWidth(currentRef.current.nextItemProps.width);
    setDefaultWidth(currentRef.current.currentItemProps.width);
    setNextWidth(currentRef.current.nextItemProps.width);
    setCurrentWidth(currentRef.current.currentItemProps.width);
  };

  const handleMouseup = (e) => {
    e.preventDefault();
    verticalLine.current.hideLine(e);
    document.removeEventListener('mousemove', handleMousemove);
    document.removeEventListener('mouseup', handleMouseup);

    if (currentRef.current.onFocus) {
      resizeable(
        { ...currentRef.current.currentItemProps, width: currentRef.current.currentWidth },
        { ...currentRef.current.nextItemProps, width: currentRef.current.nextWidth },
      );
    }
    setOnFocus(false);
  };
  
  const handleMousemove = (e) => {
    e.preventDefault();
    const diffX = e.pageX - currentRef.current.pageX;
    const localWidth = currentRef.current.defaultWidth + diffX;
    const localNextWidth = currentRef.current.nextItemWidth ? currentRef.current.nextItemWidth - diffX : null;

    verticalLine.current.onMove(e);

    if (currentRef.current.onFocus) {
      setCurrentWidth(localWidth);
      setNextWidth(localNextWidth);
    }

  };

  return (
     <ResizeElm className={className} ref={element} />
  );
};


Resizeable.defaultProps = {
  className: '',
  currentItemProps: {},
  nextItemProps: {},
  resizeable: () => { },
};

Resizeable.propTypes = {
  className: T.string,
  currentItemProps: T.shape({}),
  nextItemProps: T.shape({}),
  resizeable: T.func,
};

export default Resizeable;
