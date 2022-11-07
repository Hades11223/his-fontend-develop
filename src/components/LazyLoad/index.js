import React, { forwardRef, useEffect, useState } from "react";
import { isEmpty } from "lodash";
const LazyLoad = ({ component, getComponent, ...props }, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    lazyLoadComponent(component, "Component");
  }, []);

  const lazyLoadComponent = async (promise, name) => {
    const { default: Component, ...lz } = await promise;
    if (getComponent && !isEmpty(lz)) setState({ [name]: getComponent(lz) });
    else setState({ [name]: Component });
  };
  const { Component } = state;
  return Component ? <Component {...props} ref={ref} /> : null;
};

export default forwardRef(LazyLoad);
