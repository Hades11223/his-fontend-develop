import React from "react";
import PropTypes from "prop-types";
import Wrapper from "./Wrapper";

const LoadingIndicator = ({ isAbsolute, size }) => (
  <Wrapper isAbsolute={isAbsolute} size={size}>
    <div className="sk-circle">
      <div className="sk-circle1 sk-child" />
      <div className="sk-circle2 sk-child" />
      <div className="sk-circle3 sk-child" />
      <div className="sk-circle4 sk-child" />
      <div className="sk-circle5 sk-child" />
      <div className="sk-circle6 sk-child" />
      <div className="sk-circle7 sk-child" />
      <div className="sk-circle8 sk-child" />
      <div className="sk-circle9 sk-child" />
      <div className="sk-circle10 sk-child" />
      <div className="sk-circle11 sk-child" />
      <div className="sk-circle12 sk-child" />
    </div>
  </Wrapper>
);

LoadingIndicator.defaultProps = {
  isAbsolute: false,
};

LoadingIndicator.propTypes = {
  isAbsolute: PropTypes.bool,
  size: PropTypes.string,
};

export default LoadingIndicator;
